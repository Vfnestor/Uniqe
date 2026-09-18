import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  createAdminSession,
} from "@/lib/auth/admin-auth";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
) {
  try {
    const body =
      await request.json();

    const email =
      typeof body?.email === "string"
        ? body.email.trim()
        : "";

    const password =
      typeof body?.password === "string"
        ? body.password
        : "";

    const adminEmail =
      process.env.UNIQE_ADMIN_EMAIL;

    const adminPassword =
      process.env.UNIQE_ADMIN_PASSWORD;

    if (
      !adminEmail ||
      !adminPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Admin authentication is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    if (
      email !== adminEmail ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid email or password.",
        },
        {
          status: 401,
        },
      );
    }

    const session =
      createAdminSession();

    const response =
      NextResponse.json({
        success: true,
      });

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: session,
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge:
        60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Invalid request.",
      },
      {
        status: 400,
      },
    );
  }
}