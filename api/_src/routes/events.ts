import express from 'express';
import UserEvent from '../models/UserEvent';
import { parse } from 'useragent';
import { authMiddleware, requireRole } from '../middleware/auth';

const router = express.Router();

// ── Helper: get real client IP (handles proxies) ──
function getClientIp(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'] as string;
  if (forwarded) {
    // take the first IP in the list (client IP)
    return forwarded.split(',').shift()?.trim() || '';
  }
  return req.ip || req.socket.remoteAddress || '';
}

// ── Helper: derive traffic source from referrer ──
function deriveTrafficSource(referrer?: string): string {
  if (!referrer) return 'Direct';
  try {
    const url = new URL(referrer);
    const host = url.hostname;
    if (host.includes('google')) return 'Google Search';
    if (host.includes('bing')) return 'Bing';
    if (host.includes('facebook')) return 'Facebook';
    if (host.includes('instagram')) return 'Instagram';
    if (host.includes('linkedin')) return 'LinkedIn';
    if (host.includes('twitter')) return 'X (Twitter)';
    if (host.includes('youtube')) return 'YouTube';
    if (host.includes('mail')) return 'Email campaign';
    return 'Referral website';
  } catch {
    return 'Direct';
  }
}

// ── Helper: IP‑based geolocation (skip for private/local IPs) ──
async function getGeoFromIP(ip: string): Promise<{ country?: string; region?: string; city?: string }> {
  // Skip geolocation for localhost or private IP ranges
  if (!ip || ip === '::1' || ip === '127.0.0.1' || 
      ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.16.')) {
    return {};
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,region,city`);
    const data = await res.json();
    return { country: data.country, region: data.region, city: data.city };
  } catch (_) {
    return {};
  }
}

// ── POST /api/events – receive a frontend tracking event ──
router.post('/', async (req, res) => {
  try {
    const {
      visitorId,
      sessionId,
      event,
      category,
      element,
      url,
      referrer,
      trafficSource,
      device,
      browser,
      os,
      country,
      region,
      city,
      postalCode,
      latitude,
      longitude,
      metadata,
      duration,
      status,
    } = req.body;

    // Capture real IP and User-Agent
    const ip = getClientIp(req);
    const userAgent = req.headers['user-agent'] || '';

    // Extract page (path) from the URL
    let page = '';
    try {
      const urlObj = new URL(url || referrer || '');
      page = urlObj.pathname;
    } catch (_) {
      page = url || '';
    }

    // Derive traffic source if not provided
    const derivedTrafficSource = trafficSource || deriveTrafficSource(referrer);

    // Parse user-agent for device, browser, OS if not sent from frontend
    const ua = parse(userAgent);
    const finalDevice = device || ua.device?.family || 'desktop';
    const finalBrowser = browser || ua.family || 'Unknown';
    const finalOs = os || ua.os?.family || 'Unknown';

    // Get geo from IP (only if not already provided)
    const geo = await getGeoFromIP(ip);
    const finalCountry = country || geo.country;
    const finalRegion = region || geo.region;
    const finalCity = city || geo.city;

    const eventDoc = new UserEvent({
      visitorId: visitorId || 'unknown',
      sessionId: sessionId || 'unknown',
      timestamp: new Date(),
      event,
      category,
      element,
      url,
      page,
      referrer: referrer || req.headers.referer || '',
      trafficSource: derivedTrafficSource,
      device: finalDevice,
      browser: finalBrowser,
      os: finalOs,
      country: finalCountry,
      region: finalRegion,
      city: finalCity,
      postalCode,
      latitude,
      longitude,
      ip,
      userAgent,
      metadata,
      duration,
      status,
    });

    await eventDoc.save();
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Error saving user event:', err);
    res.status(500).json({ error: 'Failed to log event' });
  }
});

// ── GET /api/events – admin only, paginated, with filters ──
router.get('/', authMiddleware, requireRole(['admin']), async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (req.query.event) {
      filter.event = req.query.event;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.pagePath) {
      filter.$or = [
        { page: { $regex: req.query.pagePath, $options: 'i' } },
        { url: { $regex: req.query.pagePath, $options: 'i' } }
      ];
    }
    if (req.query.startDate) {
      const start = new Date(req.query.startDate as string);
      if (!isNaN(start.getTime())) {
        filter.timestamp = { $gte: start };
      }
    }
    if (req.query.endDate) {
      const end = new Date(req.query.endDate as string);
      if (!isNaN(end.getTime())) {
        end.setHours(23, 59, 59, 999);
        filter.timestamp = { ...filter.timestamp, $lte: end };
      }
    }

    const [events, total] = await Promise.all([
      UserEvent.find(filter)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit),
      UserEvent.countDocuments(filter),
    ]);

    res.json({
      events,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('Failed to fetch events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

export default router;