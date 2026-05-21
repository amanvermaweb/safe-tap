import connect from '../../lib/db';
import BusModel from '../../models/Bus';
import { emitEvent } from '../realtime';

export interface UpdateLocationPayload {
  busId: string;
  location: { type: 'Point'; coordinates: [number, number] };
  speed?: number;
  driverId?: string;
}

export async function updateBusLocation(payload: UpdateLocationPayload) {
  await connect();

  const { busId, location, speed } = payload;

  const bus = await BusModel.findByIdAndUpdate(
    busId,
    { currentLocation: location, speed, lastLocationUpdate: new Date() },
    { new: true }
  ).lean();

  // Emit realtime location update
  emitEvent('busLocationUpdated', { busId, location, speed, updatedAt: new Date() });

  return bus;
}

export default { updateBusLocation };
