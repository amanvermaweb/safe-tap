import { NextRequest, NextResponse } from "next/server";
import { decodeSessionCookie, type SessionRole } from "./lib/auth/session-cookie";

const roleRedirects: Record<SessionRole, string> = {
  admin: "/admin",
  teacher: "/teachers",
  parent: "/parents",
};

function isPublicPath(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/sign-in" ||
    pathname.startsWith("/sign-in/") ||
    pathname === "/sign-up" ||
    pathname.startsWith("/sign-up/")
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = decodeSessionCookie(request.cookies.get("auth_session")?.value ?? "");

  if (isPublicPath(pathname)) {
    if (!session) {
      return NextResponse.next();
    }

    if (pathname === "/" || pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
      return NextResponse.redirect(new URL(roleRedirects[session.role], request.url));
    }

    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (pathname.startsWith("/admin") && session.role !== "admin") {
    return NextResponse.redirect(new URL(roleRedirects[session.role], request.url));
  }

  if (pathname.startsWith("/teachers") && session.role !== "teacher") {
    return NextResponse.redirect(new URL(roleRedirects[session.role], request.url));
  }

  if (pathname.startsWith("/parents") && session.role !== "parent") {
    return NextResponse.redirect(new URL(roleRedirects[session.role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
