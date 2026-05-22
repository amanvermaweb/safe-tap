import { cookies } from "next/headers";
import { jwtVerify, jwtSign } from "./jwt";

export interface SessionData {
  id: string;
  email: string;
  role: string;
  name: string;
}

const SESSION_COOKIE = "auth_session";
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export async function createSession(user: SessionData): Promise<string> {
  const token = await jwtSign(user);
  const cookieStore = await cookies();
  
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_EXPIRY / 1000
  });

  return token;
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const session = await jwtVerify<SessionData>(token);
    return session;
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
