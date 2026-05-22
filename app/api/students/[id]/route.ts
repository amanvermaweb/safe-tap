import { NextRequest, NextResponse } from 'next/server';
import connect from '../../../../lib/db';
import StudentModel from '../../../../models/Student';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connect();

  const student = await StudentModel.findById(id).populate('parentIds', 'fullName email phone profileImage').lean();
  if (!student) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  return NextResponse.json({ ok: true, student });
}
