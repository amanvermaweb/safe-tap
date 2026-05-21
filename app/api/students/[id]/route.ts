import { NextResponse } from 'next/server';
import connect from '../../../../../lib/db';
import StudentModel from '../../../../../models/Student';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await connect();

  const student = await StudentModel.findById(id).populate('parentIds', 'fullName email phone profileImage').lean();
  if (!student) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  return NextResponse.json({ ok: true, student });
}
