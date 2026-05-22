import { requireRole } from "@/lib/auth/protect";
import { ParentsDashboard } from "@/components/parents/parents-dashboard";

export default async function ParentsPage() {
  await requireRole(["parent"]);
  return <ParentsDashboard />;
}
