import { requireRole } from "@/lib/auth/protect";
import { AttendancePage } from "@/components/teachers/attendance-page";

export default async function TeachersAttendancePage() {
  const session = await requireRole(["teacher"]);
  return <AttendancePage userName={session.name} />;
}