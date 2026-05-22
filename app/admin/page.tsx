import { requireRole } from "@/lib/auth/protect";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default async function AdminPage() {
  await requireRole(["admin"]);
  return <AdminDashboard />;
}
