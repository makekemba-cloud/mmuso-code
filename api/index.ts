import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './_src/config/db';
import { logActivity } from './_src/middleware/activityLogger';
import adminAuthRoutes from './_src/routes/auth';   // make sure the file exists as auth.ts
import projectRoutes from './_src/routes/projects';
import statsRoutes from './_src/routes/stats';
import contactRoutes from './_src/routes/contact';
import userRoutes from './_src/routes/users';
import eventRoutes from './_src/routes/events';

// Connect to MongoDB
connectDB();

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());
app.use(logActivity);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin/stats', statsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/events', eventRoutes);

// 404 handler (no path parameter)
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;