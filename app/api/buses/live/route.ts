import { NextResponse } from 'next/server';
import connect from '../../../../lib/db';
import BusModel from '../../../../models/Bus';

export async function GET() {
  await connect();

  // Return currently active buses with location and status
  const buses = await BusModel.find({}, { busNumber: 1, currentLocation: 1, status: 1, driverId: 1, currentStudents: 1 }).lean();

  return NextResponse.json({ ok: true, buses });
}
