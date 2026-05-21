import mongoose, { Schema, Document } from 'mongoose';
import { ScanType, TripType } from '../types';

export interface IScanEvent extends Document {
  studentId: mongoose.Types.ObjectId;
  busId: mongoose.Types.ObjectId;
  rfidTagId: string;
  type: ScanType;
  trip: TripType;
  scannedAt: Date;
  scannerId?: string;
  location?: { type: 'Point'; coordinates: [number, number] };
  createdAt: Date;
  updatedAt: Date;
}

const ScanEventSchema = new Schema<IScanEvent>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    busId: { type: Schema.Types.ObjectId, ref: 'Bus', required: true, index: true },
    rfidTagId: { type: String, required: true },
    type: { type: String, enum: Object.values(ScanType), required: true },
    trip: { type: String, enum: Object.values(TripType), required: true },
    scannedAt: { type: Date, required: true },
    scannerId: { type: String },
    location: {
      type: { type: String, enum: ['Point'] },
      coordinates: { type: [Number] },
    },
  },
  { timestamps: true }
);

ScanEventSchema.index({ location: '2dsphere' });

export default (mongoose.models.ScanEvent as mongoose.Model<IScanEvent>) || mongoose.model<IScanEvent>('ScanEvent', ScanEventSchema);
