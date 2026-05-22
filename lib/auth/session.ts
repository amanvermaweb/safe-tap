import { cookies } from "next/headers";
import { decodeSessionCookie, encodeSessionCookie } from "@/lib/auth/session-cookie";

export interface SessionData {
  id: string;
  email: string;
  role: string;
  name: string;
}

const SESSION_COOKIE = "auth_session";
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export async function createSession(user: SessionData): Promise<string> {
  const session = encodeSessionCookie(user);
  const cookieStore = await cookies();
  
  cookieStore.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_EXPIRY / 1000
  });

  return session;
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return decodeSessionCookie(token);
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete({
    name: SESSION_COOKIE,
    path: "/"
  });
}
