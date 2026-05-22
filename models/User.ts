import mongoose, { Schema, Document } from 'mongoose';
import { UserRole, ObjectId } from '../types';

export interface IUser extends Document {
  role: UserRole;
  fullName: string;
  email: string;
  phone?: string;
  profileImage?: string;
  children: ObjectId[]; // student refs for parents
  assignedBus?: ObjectId; // for drivers
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    role: { type: String, enum: Object.values(UserRole), required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, index: true },
    phone: { type: String },
    profileImage: { type: String },
    children: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    assignedBus: { type: Schema.Types.ObjectId, ref: 'Bus' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
