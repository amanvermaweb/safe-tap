import { requireRole } from "@/lib/auth/protect";
import { TeachersDashboard } from "@/components/teachers/teachers-dashboard";

export default async function TeachersPage() {
  await requireRole(["teacher"]);
  return <TeachersDashboard />;
}
