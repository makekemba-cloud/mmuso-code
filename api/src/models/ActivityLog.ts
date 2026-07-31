import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  // Basic (already present)
  ip: string;
  userAgent: string;
  page: string;              // API endpoint path (e.g., '/api/contact')
  method: string;            // HTTP method
  timestamp: Date;

  // Extended (new)
  referrer?: string;          // HTTP Referrer header
  statusCode?: number;        // Response status (200, 404, 500, etc.)
  responseTime?: number;      // Response time in milliseconds
  query?: string;             // Query string (sanitised)
  body?: string;              // Request body (sanitised, truncated)

  // Parsed User‑Agent
  browser?: string;
  os?: string;
  device?: string;            // 'desktop', 'mobile', 'tablet'

  // Geo‑location (IP‑based)
  country?: string;
  region?: string;
  city?: string;

  // Identity
  userId?: string;            // If the user is authenticated
  sessionId?: string;         // From cookie or generated
}

const ActivityLogSchema = new Schema<IActivityLog>({
  ip: { type: String, required: true },
  userAgent: { type: String, required: true },
  page: { type: String, required: true },
  method: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },

  // New fields
  referrer: { type: String },
  statusCode: { type: Number },
  responseTime: { type: Number },
  query: { type: String },
  body: { type: String },
  browser: { type: String },
  os: { type: String },
  device: { type: String },
  country: { type: String },
  region: { type: String },
  city: { type: String },
  userId: { type: String },
  sessionId: { type: String },
});

// Indexes
ActivityLogSchema.index({ timestamp: -1 });
ActivityLogSchema.index({ page: 1 });
ActivityLogSchema.index({ userId: 1 });
ActivityLogSchema.index({ sessionId: 1 });

export default mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);