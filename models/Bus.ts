import mongoose, { Schema, Document } from 'mongoose';
import { BusStatus, ObjectId, GeoPoint } from '../types';

export interface IBus extends Document {
  busNumber: string;
  vehicleNumber?: string;
  capacity?: number;
  driverId?: ObjectId;
  routeId?: ObjectId;
  currentStudents: ObjectId[];
  currentLocation?: GeoPoint;
  speed?: number;
  lastLocationUpdate?: Date;
  status: BusStatus;
  createdAt: Date;
  updatedAt: Date;
}

const BusSchema = new Schema<IBus>(
  {
    busNumber: { type: String, required: true, unique: true, index: true },
    vehicleNumber: { type: String },
    capacity: { type: Number, default: 0 },
    driverId: { type: Schema.Types.ObjectId, ref: 'User' },
    routeId: { type: Schema.Types.ObjectId, ref: 'Route' },
    currentStudents: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    currentLocation: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },
    },
    speed: { type: Number },
    lastLocationUpdate: { type: Date },
    status: { type: String, enum: Object.values(BusStatus), default: BusStatus.IDLE },
  },
  { timestamps: true }
);

// 2dsphere index for geospatial queries
BusSchema.index({ currentLocation: '2dsphere' });

export default (mongoose.models.Bus as mongoose.Model<IBus>) || mongoose.model<IBus>('Bus', BusSchema);
