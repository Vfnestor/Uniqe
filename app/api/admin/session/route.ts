import {
  NextResponse,
} from "next/server";

import {
  ADMIN_SESSION_COOKIE,
} from "@/lib/auth/admin-auth";

import {
  readAdminSession,
} from "@/lib/auth/admin-session";

export const runtime = "nodejs";

export async function GET() {
  try {
    const response =
      NextResponse.json({
        authenticated: false,
      });

    /*
     * We cannot read the request cookie
     * directly from NextResponse.
     *
     * Use Next.js cookies API below.
     */

    return response;
  } catch {
    return NextResponse.json(
      {
        authenticated: false,
      },
      {
        status: 500,
      },
    );
  }
}