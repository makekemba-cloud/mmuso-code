import express from 'express';
import ActivityLog from '../models/ActivityLog';
import Project from '../models/Project';
import { authMiddleware, requireRole } from '../middleware/auth';

const router = express.Router();

// All stats routes require authentication AND admin role
router.use(authMiddleware);
router.use(requireRole(['admin']));

// Total visits, unique IPs, etc.
router.get('/dashboard', async (req, res) => {
  const totalVisits = await ActivityLog.countDocuments();
  const uniqueIPs = await ActivityLog.distinct('ip');
  const projectsCount = await Project.countDocuments();

  res.json({
    totalVisits,
    uniqueVisitors: uniqueIPs.length,
    projectsCount,
  });
});

// Paginated activity log
// GET /api/admin/stats/activities
router.get('/activities', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // ── Build filter object ──
    const filter: any = {};

    // Method filter
    if (req.query.method) {
      filter.method = req.query.method;
    }

    // Status code filter (exact match)
    if (req.query.statusCode) {
      const code = parseInt(req.query.statusCode as string);
      if (!isNaN(code)) filter.statusCode = code;
    }

    // Page path (partial match, case-insensitive)
    if (req.query.pagePath) {
      filter.page = { $regex: req.query.pagePath, $options: 'i' };
    }

    // Date range
    if (req.query.startDate) {
      const start = new Date(req.query.startDate as string);
      if (!isNaN(start.getTime())) {
        filter.timestamp = { $gte: start };
      }
    }
    if (req.query.endDate) {
      const end = new Date(req.query.endDate as string);
      if (!isNaN(end.getTime())) {
        // Set to end of day
        end.setHours(23, 59, 59, 999);
        filter.timestamp = { ...filter.timestamp, $lte: end };
      }
    }

    const [activities, total] = await Promise.all([
      ActivityLog.find(filter)
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit),
      ActivityLog.countDocuments(filter),
    ]);

    res.json({
      activities,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('Failed to fetch activities:', err);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

export default router;