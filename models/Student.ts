import mongoose, { Schema, Document } from 'mongoose';
import { StudentStatus, ObjectId } from '../types';

export interface IStudent extends Document {
  admissionNumber: string;
  fullName: string;
  grade: string;
  section?: string;
  profileImage?: string;
  rfidTagId: string;
  assignedBus?: ObjectId;
  parentIds: ObjectId[];
  pickupStop?: ObjectId;
  dropStop?: ObjectId;
  status: StudentStatus;
  currentBus?: ObjectId;
  lastScanAt?: Date;
  hasBoardedMorning?: boolean;
  hasExitedMorning?: boolean;
  hasBoardedAfternoon?: boolean;
  hasExitedAfternoon?: boolean;
  isOnBus?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    admissionNumber: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true },
    grade: { type: String, required: true },
    section: { type: String },
    profileImage: { type: String },
    rfidTagId: { type: String, required: true, unique: true, index: true },
    assignedBus: { type: Schema.Types.ObjectId, ref: 'Bus' },
    parentIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    pickupStop: { type: Schema.Types.ObjectId, ref: 'Stop' },
    dropStop: { type: Schema.Types.ObjectId, ref: 'Stop' },
    status: { type: String, enum: Object.values(StudentStatus), default: StudentStatus.HOME },
    currentBus: { type: Schema.Types.ObjectId, ref: 'Bus' },
    lastScanAt: { type: Date },
    hasBoardedMorning: { type: Boolean, default: false },
    hasExitedMorning: { type: Boolean, default: false },
    hasBoardedAfternoon: { type: Boolean, default: false },
    hasExitedAfternoon: { type: Boolean, default: false },
    isOnBus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default (mongoose.models.Student as mongoose.Model<IStudent>) || mongoose.model<IStudent>('Student', StudentSchema);
