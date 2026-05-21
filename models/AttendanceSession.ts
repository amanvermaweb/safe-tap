import mongoose, { Schema, Document } from 'mongoose';

export interface ISessionDay {
  boarded: boolean;
  exited: boolean;
}

export interface IAttendanceSession extends Document {
  studentId: mongoose.Types.ObjectId;
  date: string; // YYYY-MM-DD
  morning: ISessionDay;
  afternoon: ISessionDay;
  createdAt: Date;
  updatedAt: Date;
}

const SessionDaySchema = new Schema<ISessionDay>(
  {
    boarded: { type: Boolean, default: false },
    exited: { type: Boolean, default: false },
  },
  { _id: false }
);

const AttendanceSchema = new Schema<IAttendanceSession>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    date: { type: String, required: true, index: true },
    morning: { type: SessionDaySchema, default: () => ({}) },
    afternoon: { type: SessionDaySchema, default: () => ({}) },
  },
  { timestamps: true }
);

AttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export default (mongoose.models.AttendanceSession as mongoose.Model<IAttendanceSession>) || mongoose.model<IAttendanceSession>('AttendanceSession', AttendanceSchema);
