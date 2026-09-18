import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSession,
} from "@/lib/auth/admin-auth";

export function proxy(
  request: NextRequest,
) {
  const pathname =
    request.nextUrl.pathname;

  const isAdminRoute =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  const isLoginRoute =
    pathname === "/admin/login";

  if (
    !isAdminRoute ||
    isLoginRoute
  ) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get(
      ADMIN_SESSION_COOKIE,
    )?.value;

  const authenticated =
    verifyAdminSession(token);

  if (authenticated) {
    return NextResponse.next();
  }

  const loginUrl =
    new URL(
      "/admin/login",
      request.url,
    );

  loginUrl.searchParams.set(
    "redirect",
    pathname,
  );

  return NextResponse.redirect(
    loginUrl,
  );
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};