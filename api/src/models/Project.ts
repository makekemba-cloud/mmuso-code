import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  underDevelopment?: boolean;
  inProduction?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  techStack: [{ type: String }],
  liveUrl: { type: String },
  githubUrl: { type: String },
  underDevelopment: { type: Boolean, default: false },
  inProduction: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);