import { NotificationType, ScanType, TripType, UserRole } from '../types';

// Allow a default local MongoDB URI for convenience when MONGODB_URI is not set.
if (!process.env.MONGODB_URI) {
  // Development default. Change as appropriate for your environment.
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/safe-tap-dev';
}

async function clearCollections(models: any[]) {
  await Promise.all(models.map((m) => m.deleteMany({})));
}

async function seed() {
  // Import after ensuring MONGODB_URI is set so lib/db.ts doesn't throw.
  const { default: connect } = await import('../lib/db');
  const UserModel = (await import('../models/User')).default;
  const StudentModel = (await import('../models/Student')).default;
  const BusModel = (await import('../models/Bus')).default;
  const StopModel = (await import('../models/Stop')).default;
  const RouteModel = (await import('../models/Route')).default;
  const ScanEventModel = (await import('../models/ScanEvent')).default;
  const NotificationModel = (await import('../models/Notification')).default;
  const AttendanceSessionModel = (await import('../models/AttendanceSession')).default;

  await connect();

  console.log('Clearing existing collections (development only)');
  await clearCollections([UserModel, StudentModel, BusModel, StopModel, RouteModel, ScanEventModel, NotificationModel, AttendanceSessionModel]);

  console.log('Creating stops');
  const stops = await StopModel.insertMany([
    { stopName: 'North Gate', location: { type: 'Point', coordinates: [77.5946, 12.9716] } },
    { stopName: 'Main St & 3rd', location: { type: 'Point', coordinates: [77.5950, 12.9700] } },
    { stopName: 'Parkside', location: { type: 'Point', coordinates: [77.5960, 12.9690] } },
  ]);

  console.log('Creating route');
  const route = await RouteModel.create({
    routeName: 'Route A - North Loop',
    stops: stops.map((s: any, i: number) => ({ stopId: s._id, order: i + 1, expectedArrivalTime: `07:3${i}` })),
  });

  console.log('Creating bus');
  const bus = await BusModel.create({ busNumber: 'BUS-101', vehicleNumber: 'KA-01-AB-1234', capacity: 40, routeId: route._id, currentStudents: [] });

  console.log('Creating users (admin, driver, teacher, parents)');
  const admin = await UserModel.create({ role: UserRole.ADMIN, fullName: 'Admin User', email: 'admin@school.org' });
  const driver = await UserModel.create({ role: UserRole.DRIVER, fullName: 'Ravi Driver', email: 'ravi.driver@school.org', assignedBus: bus._id });
  const teacher = await UserModel.create({ role: UserRole.TEACHER, fullName: 'Priya Teacher', email: 'priya.teacher@school.org' });

  const parentA = await UserModel.create({ role: UserRole.PARENT, fullName: 'Parent One', email: 'parent.one@example.com' });
  const parentB = await UserModel.create({ role: UserRole.PARENT, fullName: 'Parent Two', email: 'parent.two@example.com' });

  console.log('Creating students');
  const student1 = await StudentModel.create({
    admissionNumber: 'S1001',
    fullName: 'Amit Kumar',
    grade: '5',
    section: 'A',
    rfidTagId: 'RFID-1001',
    assignedBus: bus._id,
    parentIds: [parentA._id],
    pickupStop: stops[0]._id,
    dropStop: stops[2]._id,
  });

  const student2 = await StudentModel.create({
    admissionNumber: 'S1002',
    fullName: 'Neha Singh',
    grade: '5',
    section: 'A',
    rfidTagId: 'RFID-1002',
    assignedBus: bus._id,
    parentIds: [parentB._id],
    pickupStop: stops[1]._id,
    dropStop: stops[2]._id,
  });

  // update bus currentStudents
  bus.currentStudents = [student1._id, student2._id];
  await bus.save();

  console.log('Creating sample attendance sessions and a scan event');
  const today = new Date().toISOString().slice(0, 10);
  await AttendanceSessionModel.create({ studentId: student1._id, date: today, morning: { boarded: true, exited: false }, afternoon: { boarded: false, exited: false } });

  await ScanEventModel.create({ studentId: student1._id, busId: bus._id, rfidTagId: student1.rfidTagId, type: ScanType.BOARD, trip: TripType.MORNING, scannedAt: new Date(), scannerId: 'scanner-1', location: { type: 'Point', coordinates: [77.5946, 12.9716] } });

  console.log('Creating initial notifications');
  await NotificationModel.create({ userId: parentA._id, studentId: student1._id, type: NotificationType.BOARDED, title: 'Amit boarded the bus', message: 'Amit Kumar has boarded BUS-101' });

  console.log('Seed complete');
  process.exit(0);
}

seed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Seed failed', err);
  process.exit(1);
});
