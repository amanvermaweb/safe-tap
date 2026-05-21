import { NextResponse } from 'next/server';
import { rfidScanSchema } from '../../../../lib/validators/rfid';
import { handleRfidScan } from '../../../../lib/services/scanService';

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = rfidScanSchema.parse(body);

  const result = await handleRfidScan(parsed);

  return NextResponse.json({ ok: true, result });
}
