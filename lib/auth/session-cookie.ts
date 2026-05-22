export type SessionRole = "admin" | "teacher" | "parent";

export interface SessionCookieData {
  id: string;
  email: string;
  role: SessionRole;
  name: string;
}

type SessionCookieInput = Omit<SessionCookieData, "role"> & {
  role: string;
};

const sessionRoles = new Set<SessionRole>(["admin", "teacher", "parent"]);

function isSessionRole(role: string): role is SessionRole {
  return sessionRoles.has(role as SessionRole);
}

export function encodeSessionCookie(session: SessionCookieInput): string {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}

export function decodeSessionCookie(value: string): SessionCookieData | null {
  try {
    const decoded = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as Record<
      string,
      unknown
    >;

    if (
      typeof decoded.id !== "string" ||
      typeof decoded.email !== "string" ||
      typeof decoded.role !== "string" ||
      typeof decoded.name !== "string" ||
      !isSessionRole(decoded.role)
    ) {
      return null;
    }

    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      name: decoded.name,
    };
  } catch {
    return null;
  }
}
