import express from 'express';
import Review from '../models/Review';
import { authMiddleware, requireRole } from '../middleware/auth';

const router = express.Router();

router.use(authMiddleware);
router.use(requireRole(['admin']));

// GET /api/admin/reviews – paginated, with filters
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (req.query.name) {
      filter.name = { $regex: req.query.name, $options: 'i' };
    }
    if (req.query.rating) {
      filter.rating = parseInt(req.query.rating as string);
    }
    if (req.query.isHidden !== undefined) {
      filter.isHidden = req.query.isHidden === 'true';
    }

    const [reviews, total] = await Promise.all([
      Review.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Review.countDocuments(filter),
    ]);

    res.json({ reviews, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('Failed to fetch admin reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// PATCH /api/admin/reviews/:id – toggle hidden status
router.patch('/:id', async (req, res) => {
  try {
    const { isHidden } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isHidden },
      { new: true }
    );
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    console.error('Failed to update review:', err);
    res.status(500).json({ error: 'Failed to update review' });
  }
});

// DELETE /api/admin/reviews/:id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Review.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Review not found' });
    res.json({ success: true });
  } catch (err) {
    console.error('Failed to delete review:', err);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});

// GET /api/admin/reviews/stats – returns total count and average rating
// GET /api/admin/reviews/stats
router.get('/stats', async (req, res) => {
  try {
    const filter: any = {};
    const visibleOnly = req.query.visible === 'true';
    if (visibleOnly) {
      filter.isHidden = false;
    }

    const total = await Review.countDocuments(filter);
    const avgResult = await Review.aggregate([
      { $match: filter },
      { $group: { _id: null, avg: { $avg: '$rating' } } }
    ]);
    const average = avgResult.length ? avgResult[0].avg : 0;

    res.json({ total, average });
  } catch (err) {
    console.error('Failed to fetch review stats:', err);
    res.status(500).json({ error: 'Failed to fetch review stats' });
  }
});

// GET /api/admin/reviews/stats/breakdown
router.get('/stats/breakdown', async (req, res) => {
  try {
    const all = await Review.aggregate([
      { $group: { _id: null, total: { $sum: 1 }, avg: { $avg: '$rating' } } }
    ]);
    const visible = await Review.aggregate([
      { $match: { isHidden: false } },
      { $group: { _id: null, total: { $sum: 1 }, avg: { $avg: '$rating' } } }
    ]);
    const hidden = await Review.aggregate([
      { $match: { isHidden: true } },
      { $group: { _id: null, total: { $sum: 1 }, avg: { $avg: '$rating' } } }
    ]);

    res.json({
      all: { total: all[0]?.total || 0, average: all[0]?.avg || 0 },
      visible: { total: visible[0]?.total || 0, average: visible[0]?.avg || 0 },
      hidden: { total: hidden[0]?.total || 0, average: hidden[0]?.avg || 0 },
    });
  } catch (err) {
    console.error('Failed to fetch review breakdown:', err);
    res.status(500).json({ error: 'Failed to fetch review breakdown' });
  }
});

export default router;