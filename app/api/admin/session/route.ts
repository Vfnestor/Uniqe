import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  ADMIN_SESSION_COOKIE,
} from "@/lib/auth/admin-auth";

import {
  readAdminSession,
} from "@/lib/auth/admin-session";

export const runtime = "nodejs";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
) {
  const token =
    request.cookies.get(
      ADMIN_SESSION_COOKIE,
    )?.value;

  const session =
    readAdminSession(token);

  if (
    !session ||
    session.role !== "owner"
  ) {
    return NextResponse.json(
      {
        authenticated: false,
      },
      {
        status: 401,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  return NextResponse.json(
    {
      authenticated: true,
      role: "owner",
      expiresAt: session.expiresAt,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}