import { Request, Response, NextFunction } from 'express';
import ActivityLog from '../models/ActivityLog';
import { parse } from 'useragent';
import crypto from 'crypto';

// ── Helper: get real client IP (handles proxies) ──
function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'] as string;
  if (forwarded) {
    // take the first IP in the list (client IP)
    return forwarded.split(',').shift()?.trim() || '';
  }
  return req.ip || req.socket.remoteAddress || '';
}

// ── Session ID (could be improved with cookie-parser) ──
function getSessionId(req: Request): string {
  // For now, generate per request; you can store in a cookie
  return crypto.randomUUID();
}

// ── Sanitise request body ──
function sanitiseBody(body: any): string {
  if (!body) return '';
  const safe = { ...body };
  if (safe.password) safe.password = '***';
  if (safe.confirmPassword) safe.confirmPassword = '***';
  if (safe.creditCard) safe.creditCard = '***';
  return JSON.stringify(safe).slice(0, 2000);
}

// ── IP‑based geolocation (skip private/local IPs) ──
async function getGeo(ip: string): Promise<{ country?: string; region?: string; city?: string }> {
  // Skip geolocation for localhost or private IP ranges
  if (!ip || ip === '::1' || ip === '127.0.0.1' || 
      ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.16.')) {
    return {};
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,region,city`);
    const data = await res.json();
    return { country: data.country, region: data.region, city: data.city };
  } catch {
    return {};
  }
}

// ── Middleware ──
export const logActivity = async (req: Request, res: Response, next: NextFunction) => {
  // Skip admin routes (or remove to log them too)
  if (req.path.startsWith('/api/admin')) return next();

  const start = Date.now();
  let statusCode: number | undefined;
  let responseTime: number | undefined;

  // Override res.send to capture status and timing
  const originalSend = res.send;
  res.send = function (body) {
    statusCode = res.statusCode;
    responseTime = Date.now() - start;
    return originalSend.call(this, body);
  };

  // After response finishes, log asynchronously
  res.on('finish', async () => {
    try {
      const ua = parse(req.headers['user-agent'] || '');
      const ip = getClientIp(req);  // ← use real IP
      const sessionId = getSessionId(req);
      const userId = (req as any).user?.id;

      const geo = await getGeo(ip);

      await ActivityLog.create({
        ip,
        userAgent: req.headers['user-agent'] || 'unknown',
        page: req.originalUrl,
        method: req.method,
        timestamp: new Date(),
        referrer: req.headers.referer || req.headers.referrer,
        statusCode,
        responseTime,
        query: req.query ? JSON.stringify(req.query) : '',
        body: sanitiseBody(req.body),
        browser: ua.family,
        os: ua.os?.family,
        device: ua.device?.family === 'Other' ? 'desktop' : ua.device?.family?.toLowerCase(),
        country: geo.country,
        region: geo.region,
        city: geo.city,
        userId,
        sessionId,
      });
    } catch (err) {
      console.error('Activity log failed:', err);
    }
  });

  next();
};