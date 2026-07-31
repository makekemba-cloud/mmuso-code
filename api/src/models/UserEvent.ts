// api/src/models/UserEvent.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUserEvent extends Document {
  // Identity
  visitorId: string;
  sessionId: string;
  timestamp: Date;

  // Event details
  event: string;
  category: string;
  element?: string;
  url: string;
  page?: string;
  referrer?: string;

  // Traffic source
  trafficSource?: string;

  // Device & browser
  device?: string;
  browser?: string;
  os?: string;

  // Location
  country?: string;
  region?: string;
  city?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;

  // ---- NEW ----
  ip?: string;
  userAgent?: string;

  // Extra data
  metadata?: Record<string, any>;
  duration?: number;
  status?: string;
}

const UserEventSchema = new Schema<IUserEvent>({
  visitorId: { type: String, required: true },
  sessionId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  event: { type: String, required: true },
  category: { type: String, required: true },
  element: { type: String },
  url: { type: String, required: true },
  page: { type: String },
  referrer: { type: String },
  trafficSource: { type: String },
  device: { type: String },
  browser: { type: String },
  os: { type: String },
  country: { type: String },
  region: { type: String },
  city: { type: String },
  postalCode: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  ip: { type: String },          // <--- added
  userAgent: { type: String },    // <--- added
  metadata: { type: Schema.Types.Mixed },
  duration: { type: Number },
  status: { type: String },
});

// Indexes
UserEventSchema.index({ visitorId: 1, timestamp: -1 });
UserEventSchema.index({ event: 1, category: 1 });
UserEventSchema.index({ url: 1 });
UserEventSchema.index({ ip: 1 });
UserEventSchema.index({ userAgent: 1 });

export default mongoose.model<IUserEvent>('UserEvent', UserEventSchema);