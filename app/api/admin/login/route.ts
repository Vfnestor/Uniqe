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

export const dynamic = "force-dynamic";

type BackendUser = {
  id?: string;
  email?: string;
  role?: string;
};

type BackendLoginResponse = {
  success?: boolean;
  message?: string;

  data?: {
    success?: boolean;
    user?: BackendUser;
    tokens?: {
      accessToken?: string;
      refreshToken?: string;
    };
  };

  user?: BackendUser;

  tokens?: {
    accessToken?: string;
    refreshToken?: string;
  };
};

function cleanEnvironmentValue(
  value: string | undefined,
): string {
  if (!value) {
    return "";
  }

  return value
    .trim()
    .replace(/^["']|["']$/g, "");
}

/**
 * آدرس بک‌اند ممکن است با /api/v1 یا بدون آن
 * در متغیر محیطی تنظیم شده باشد.
 */
function getBackendLoginUrl(): string | null {
  const configuredUrl =
    cleanEnvironmentValue(
      process.env.API_INTERNAL_URL ||
      process.env.NEXT_PUBLIC_API_URL,
    );

  if (
    !configuredUrl ||
    configuredUrl.startsWith("/")
  ) {
    return null;
  }

  try {
    const url =
      new URL(configuredUrl);

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      return null;
    }

    url.search = "";
    url.hash = "";

    let pathname =
      url.pathname.replace(/\/+$/, "");

    pathname =
      pathname.replace(
        /\/api\/v1$/i,
        "",
      );

    pathname =
      pathname.replace(
        /\/auth\/admin\/login$/i,
        "",
      );

    url.pathname =
      `${pathname}/api/v1/auth/admin/login`
        .replace(/\/+/g, "/");

    return url.toString();
  } catch {
    return null;
  }
}

function getBackendPayload(
  body: BackendLoginResponse,
) {
  if (
    body &&
    typeof body === "object" &&
    body.data &&
    typeof body.data === "object"
  ) {
    return body.data;
  }

  return body;
}

export async function POST(
  request: NextRequest,
) {
  try {
    let requestBody: unknown;

    try {
      requestBody =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        {
          status: 400,
        },
      );
    }

    const body =
      requestBody as {
        email?: unknown;
        password?: unknown;
      };

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (
      !email ||
      !password ||
      email.length > 254 ||
      password.length > 1024
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ایمیل یا رمز عبور معتبر نیست.",
        },
        {
          status: 400,
        },
      );
    }

    const backendLoginUrl =
      getBackendLoginUrl();

    if (!backendLoginUrl) {
      console.error(
        "[UNIQE ADMIN AUTH] Backend URL is not configured.",
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "ارتباط با سرویس احراز هویت تنظیم نشده است.",
        },
        {
          status: 503,
        },
      );
    }

    const backendResponse =
      await fetch(
        backendLoginUrl,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          cache: "no-store",

          signal:
            AbortSignal.timeout(10000),

          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

    let backendBody:
      BackendLoginResponse | null = null;

    try {
      backendBody =
        await backendResponse.json();
    } catch {
      backendBody = null;
    }

    if (
      !backendResponse.ok ||
      !backendBody
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ایمیل یا رمز عبور مدیر صحیح نیست.",
        },
        {
          status:
            backendResponse.status === 429
              ? 429
              : 401,
        },
      );
    }

    const payload =
      getBackendPayload(
        backendBody,
      );

    const user =
      payload.user ||
      backendBody.user;

    /*
     * نقش فقط از پاسخ بک‌اند معتبر پذیرفته می‌شود.
     * نقش ارسال‌شده از مرورگر قابل اعتماد نیست.
     */
    if (
      user?.role !== "owner" &&
      user?.role !== "ADMIN"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "این حساب دسترسی مدیر ندارد.",
        },
        {
          status: 403,
        },
      );
    }

    /*
     * توکن نشست مدیریتی فقط روی سرور ساخته می‌شود.
     */
    const sessionToken =
      createAdminSession("owner");

    const response =
      NextResponse.json(
        {
          success: true,
          role: "owner",
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,

      value: sessionToken,

      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite: "lax",

      path: "/",

      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error(
      "[UNIQE ADMIN AUTH] Login failed.",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "سرویس ورود موقتاً در دسترس نیست.",
      },
      {
        status: 503,
      },
    );
  }
}