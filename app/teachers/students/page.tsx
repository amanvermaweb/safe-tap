import { requireRole } from "@/lib/auth/protect";
import { StudentsPage } from "@/components/teachers/students-page";

export default async function TeachersStudentsPage() {
  const session = await requireRole(["teacher"]);
  return <StudentsPage userName={session.name} />;
}