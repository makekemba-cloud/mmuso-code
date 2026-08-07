import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  type: 'review' | 'contact' | 'system' | 'user';
  title: string;
  message: string;
  link?: string;          // e.g., `/admin/reviews`
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  type: { type: String, enum: ['review', 'contact', 'system', 'user'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  link: { type: String },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<INotification>('Notification', NotificationSchema);