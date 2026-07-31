import { Request, Response, NextFunction } from 'express';
import ActivityLog from '../models/ActivityLog';
import { parse } from 'useragent';
import crypto from 'crypto';

function getSessionId(req: Request): string {
  // If you use cookie-parser, you could read from req.cookies
  // For now, generate per request (or you can store in a cookie)
  return crypto.randomUUID();
}

function sanitiseBody(body: any): string {
  if (!body) return '';
  const safe = { ...body };
  if (safe.password) safe.password = '***';
  if (safe.confirmPassword) safe.confirmPassword = '***';
  if (safe.creditCard) safe.creditCard = '***';
  return JSON.stringify(safe).slice(0, 2000);
}

async function getGeo(ip: string): Promise<{ country?: string; region?: string; city?: string }> {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,region,city`);
    const data = await res.json();
    return { country: data.country, region: data.region, city: data.city };
  } catch {
    return {};
  }
}

export const logActivity = async (req: Request, res: Response, next: NextFunction) => {
  // Skip admin routes (or remove to log them too)
  if (req.path.startsWith('/api/admin')) return next();

  const start = Date.now();
  let statusCode: number | undefined;
  let responseTime: number | undefined;

  // Override res.send – capture status and timing, then call original
  const originalSend = res.send;
  res.send = function (body) {
    statusCode = res.statusCode;
    responseTime = Date.now() - start;
    // Must return the result of originalSend
    return originalSend.call(this, body);
  };

  // After response finishes, log asynchronously
  res.on('finish', async () => {
    try {
      const ua = parse(req.headers['user-agent'] || '');
      const ip = req.ip || req.socket.remoteAddress || '';
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