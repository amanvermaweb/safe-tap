import { NextResponse } from 'next/server';
import { busLocationSchema } from '../../../../lib/validators/bus';
import { updateBusLocation } from '../../../../lib/services/gpsService';

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = busLocationSchema.parse(body);

  const updated = await updateBusLocation(parsed);

  return NextResponse.json({ ok: true, bus: updated });
}
