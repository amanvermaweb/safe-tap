import { requireRole } from "@/lib/auth/protect";
import { ParentsLiveTrackPage } from "@/components/parents/live-track-page";

export default async function ParentsLiveTrackRoutePage() {
  const session = await requireRole(["parent"]);
  return <ParentsLiveTrackPage userName={session.name} />;
}