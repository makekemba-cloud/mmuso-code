import express from 'express';
import Review from '../models/Review';
import Notification from '../models/Notification';

const router = express.Router();

// GET /api/reviews – public, returns only visible (not hidden)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ isHidden: false })
      .sort({ createdAt: -1 })
      .limit(50); // optional limit
    res.json(reviews);
  } catch (err) {
    console.error('Failed to fetch reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// POST /api/reviews
router.post('/', async (req, res) => {
  try {
    const { name, email, rating, comment, project, location } = req.body;
    if (!name || !rating || !comment) {
      return res.status(400).json({ error: 'Name, rating and comment are required' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const ip = req.ip || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    const review = new Review({
      name: name.trim(),
      email: email?.trim(),
      rating,
      comment: comment.trim(),
      project: project?.trim() || undefined,
      location: location?.trim() || undefined,
      ip,
      userAgent,
    });
    await review.save();
    // Create notification for admins
await Notification.create({
  type: 'review',
  title: 'New Review Submitted',
  message: `${review.name} left a ${review.rating}★ review: "${review.comment.substring(0, 60)}${review.comment.length > 60 ? '...' : ''}"`,
  link: '/admin/reviews',
});

res.status(201).json({ success: true, review });
  } catch (err) {
    console.error('Failed to submit review:', err);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

export default router;