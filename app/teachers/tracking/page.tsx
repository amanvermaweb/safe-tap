import { requireRole } from "@/lib/auth/protect";
import { TrackingPage } from "@/components/teachers/tracking-page";

export default async function TeachersTrackingPage() {
  const session = await requireRole(["teacher"]);
  return <TrackingPage userName={session.name} />;
}