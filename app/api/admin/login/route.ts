import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  ADMIN_SESSION_COOKIE,
} from "@/lib/auth/admin-auth";

import {
  createAdminSession,
} from "@/lib/auth/admin-session";

export const runtime = "nodejs";

function cleanEnvironmentValue(
  value: string | undefined,
) {
  if (!value) {
    return "";
  }

  return value
    .trim()
    .replace(/^["']|["']$/g, "");
}

export async function POST(
  request: NextRequest,
) {
  try {
    const body =
      await request.json();

    const email =
      typeof body?.email ===
      "string"
        ? body.email
            .trim()
            .toLowerCase()
        : "";

    const password =
      typeof body?.password ===
      "string"
        ? body.password
        : "";

    const adminEmail =
      cleanEnvironmentValue(
        process.env
          .UNIQE_ADMIN_EMAIL,
      ).toLowerCase();

    const adminPassword =
      cleanEnvironmentValue(
        process.env
          .UNIQE_ADMIN_PASSWORD,
      );

    const authSecret =
      cleanEnvironmentValue(
        process.env
          .UNIQE_AUTH_SECRET,
      );

    if (
      !adminEmail ||
      !adminPassword ||
      !authSecret
    ) {
      console.error(
        "[UNIQE AUTH] Authentication environment variables are incomplete.",
        {
          hasEmail:
            Boolean(adminEmail),

          hasPassword:
            Boolean(adminPassword),

          hasAuthSecret:
            Boolean(authSecret),
        },
      );

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

    const emailMatches =
      email === adminEmail;

    const passwordMatches =
      password === adminPassword;

    if (
      !emailMatches ||
      !passwordMatches
    ) {
      console.warn(
        "[UNIQE AUTH] Login rejected.",
        {
          emailMatches,
          passwordMatches,
        },
      );

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

    /*
     * Current admin account is the
     * ecosystem owner.
     *
     * Later this role will come
     * from the database.
     */

    const session =
      createAdminSession(
        "owner",
      );

    const response =
      NextResponse.json({
        success: true,

        role: "owner",
      });

    response.cookies.set({
      name:
        ADMIN_SESSION_COOKIE,

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

    console.log(
      "[UNIQE AUTH] Admin login successful.",
    );

    return response;
  } catch (error) {
    console.error(
      "[UNIQE AUTH] Login request failed.",
      error,
    );

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