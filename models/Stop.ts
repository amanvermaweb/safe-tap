import mongoose, { Schema, Document } from 'mongoose';
import { GeoPoint } from '../types';

export interface IStop extends Document {
  stopName: string;
  location: GeoPoint;
  createdAt: Date;
  updatedAt: Date;
}

const StopSchema = new Schema<IStop>(
  {
    stopName: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
  },
  { timestamps: true }
);

StopSchema.index({ location: '2dsphere' });

export default (mongoose.models.Stop as mongoose.Model<IStop>) || mongoose.model<IStop>('Stop', StopSchema);
