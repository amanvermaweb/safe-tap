import { requireRole } from "@/lib/auth/protect";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default async function AdminPage() {
  const session = await requireRole(["admin"]);
  return <AdminDashboard userName={session.name} />;
}
