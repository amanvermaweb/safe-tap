import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }
  return session;
}

export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth();
  if (!allowedRoles.includes(session.role)) {
    redirect("/");
  }
  return session;
}
