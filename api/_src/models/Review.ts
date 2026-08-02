import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  name: string;
  email?: string;
  rating: number;
  comment: string;
  project?: string;        // optional – project/website name
  location?: string;       // optional – client location
  isHidden: boolean;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true },
  project: { type: String, trim: true },
  location: { type: String, trim: true },
  isHidden: { type: Boolean, default: false },
  ip: { type: String },
  userAgent: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReview>('Review', ReviewSchema);