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

export async function GET(
  request: NextRequest,
) {
  try {
    const token =
      request.cookies.get(
        ADMIN_SESSION_COOKIE,
      )?.value;

    const session =
      readAdminSession(token);

    if (!session) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.json({
      authenticated: true,
      role: session.role,
      expiresAt:
        session.expiresAt,
    });
  } catch (error) {
    console.error(
      "[UNIQE AUTH] Session check failed.",
      error,
    );

    return NextResponse.json(
      {
        authenticated: false,
      },
      {
        status: 401,
      },
    );
  }
}