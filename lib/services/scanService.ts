import connect from '../../lib/db';
import mongoose from 'mongoose';
import StudentModel from '../../models/Student';
import BusModel from '../../models/Bus';
import ScanEventModel from '../../models/ScanEvent';
import AttendanceSessionModel from '../../models/AttendanceSession';
import { ScanType, TripType, StudentStatus } from '../../types';
import { createNotificationsForParents } from './notificationService';
import { emitEvent } from '../realtime';

export interface RFIDScanPayload {
  rfidTagId: string;
  busId: string; // scanner bus id
  scannerId?: string;
  location?: { type: 'Point'; coordinates: [number, number] };
  timestamp?: string; // ISO
}

function inferTripType(date = new Date()): TripType {
  const hour = date.getHours();
  return hour < 12 ? TripType.MORNING : TripType.AFTERNOON;
}

/**
 * Handle an RFID scan lifecycle.
 * Uses a MongoDB transaction to keep ScanEvent, Student and Bus consistent.
 */
export async function handleRfidScan(payload: RFIDScanPayload) {
  await connect();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { rfidTagId, busId, scannerId, location, timestamp } = payload;
    const scannedAt = timestamp ? new Date(timestamp) : new Date();
    const trip = inferTripType(scannedAt);

    // Find student by RFID
    const student = await StudentModel.findOne({ rfidTagId }).session(session);
    if (!student) {
      throw new Error(`Student with RFID ${rfidTagId} not found`);
    }

    // Load bus
    const bus = await BusModel.findById(busId).session(session);
    if (!bus) {
      throw new Error(`Bus ${busId} not found`);
    }

    // Determine scan type: simple heuristic based on student's isOnBus flag
    const isCurrentlyOnBus = !!student.isOnBus;
    const scanType = isCurrentlyOnBus ? ScanType.EXIT : ScanType.BOARD;

    // Create ScanEvent (history)
    const scanEvent = await ScanEventModel.create([
      {
        studentId: student._id,
        busId: bus._id,
        rfidTagId,
        type: scanType,
        trip,
        scannedAt,
        scannerId,
        location,
      },
    ], { session });

    // Update student record
    if (scanType === ScanType.BOARD) {
      student.isOnBus = true;
      student.currentBus = bus._id;
      student.lastScanAt = scannedAt;
      if (trip === TripType.MORNING) student.hasBoardedMorning = true;
      else student.hasBoardedAfternoon = true;
      // status to on_bus
      student.status = trip === TripType.MORNING ? StudentStatus.ON_BUS_TO_SCHOOL : StudentStatus.ON_BUS_TO_HOME;
      await student.save({ session });

      // Add to bus currentStudents if not present
      if (!bus.currentStudents.find((id) => id.toString() === student._id.toString())) {
        bus.currentStudents.push(student._id as any);
      }
    } else {
      // EXIT
      student.isOnBus = false;
      student.currentBus = undefined as any;
      student.lastScanAt = scannedAt;
      if (trip === TripType.MORNING) student.hasExitedMorning = true;
      else student.hasExitedAfternoon = true;
      // status to in_school or home depending on trip
      student.status = trip === TripType.MORNING ? StudentStatus.IN_SCHOOL : StudentStatus.HOME;
      await student.save({ session });

      // Remove from bus currentStudents
      bus.currentStudents = bus.currentStudents.filter((id) => id.toString() !== student._id.toString());
    }

    await bus.save({ session });

    // Update attendance session record (upsert)
    const dateKey = scannedAt.toISOString().slice(0, 10);
    const update: any = {};
    if (trip === TripType.MORNING) {
      if (scanType === ScanType.BOARD) update['morning.boarded'] = true;
      else update['morning.exited'] = true;
    } else {
      if (scanType === ScanType.BOARD) update['afternoon.boarded'] = true;
      else update['afternoon.exited'] = true;
    }

    await AttendanceSessionModel.findOneAndUpdate(
      { studentId: student._id, date: dateKey },
      { $set: update },
      { upsert: true, new: true, session }
    );

    // Create notifications for parents
    // If parents exist, create per-parent notifications
    // NOTE: createNotificationsForParents makes independent writes (not in this session) by design
    const parentIds = student.parentIds?.map((id) => id.toString()) || [];
    const notifTitle = scanType === ScanType.BOARD ? 'Student boarded the bus' : 'Student exited the bus';
    const notifMsg = `${student.fullName} ${scanType === ScanType.BOARD ? 'boarded' : 'exited'} bus ${bus.busNumber}`;
    // fire-and-forget (don't await to keep latency low), but callers can await if they want
    createNotificationsForParents(parentIds, student._id.toString(), scanType === ScanType.BOARD ? 'boarded_bus' as any : 'exited_school' as any, notifTitle, notifMsg).catch(console.error);

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Emit realtime events
    if (scanType === ScanType.BOARD) {
      emitEvent('studentBoarded', { studentId: student._id, busId: bus._id, scannedAt });
    } else {
      emitEvent('studentExited', { studentId: student._id, busId: bus._id, scannedAt });
    }

    return { scanEvent: scanEvent[0], student, bus };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
}

export default { handleRfidScan };
