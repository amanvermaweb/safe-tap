import { NextResponse } from 'next/server';
import connect from '../../../lib/db';
import NotificationModel from '../../../models/Notification';

export async function GET(req: Request) {
  await connect();

  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');
  const limit = Number(url.searchParams.get('limit') || '50');

  const query: any = {};
  if (userId) query.userId = userId;

  const notifications = await NotificationModel.find(query).sort({ createdAt: -1 }).limit(limit).lean();

  return NextResponse.json({ ok: true, notifications });
}
