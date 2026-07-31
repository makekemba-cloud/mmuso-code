import { Router } from 'express';
import multer from 'multer';
import Project from '../models/Project';
import { authMiddleware, requireRole } from '../middleware/auth';
import cloudinary from '../config/cloudinary';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// ── GET all (public) ──
router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: 1 });
  res.json(projects);
});

// ── All routes below require authentication ──
router.use(authMiddleware);

// ── Upload image to Cloudinary ──
router.post('/upload', requireRole(['admin', 'editor']), upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'mmusocode/projects',
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
          transformation: [{ width: 800, crop: 'limit' }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file!.buffer);
    });

    res.json({ url: (result as any).secure_url });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// ── CRUD routes ──
router.post('/', requireRole(['admin', 'editor']), async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
});

router.put('/:id', requireRole(['admin', 'editor']), async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

router.delete('/:id', requireRole(['admin']), async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;