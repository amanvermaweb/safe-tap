import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "./lib/auth/jwt";

type Role = "admin" | "teacher" | "parent";

type Session = {
  role: Role;
};

const roleRedirects: Record<Role, string> = {
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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth_session")?.value;

  if (isPublicPath(pathname)) {
    if (!token) {
      return NextResponse.next();
    }

    try {
      const session = await jwtVerify<Session>(token);

      if (pathname === "/" || pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
        return NextResponse.redirect(new URL(roleRedirects[session.role], request.url));
      }

      return NextResponse.next();
    } catch {
      return NextResponse.next();
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  try {
    const session = await jwtVerify<Session>(token);

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
  } catch {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};