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

type BackendTokens = {
  accessToken?: string;
  refreshToken?: string;
};

type BackendPayload = {
  success?: boolean;
  message?: string;
  user?: BackendUser;
  tokens?: BackendTokens;
  data?: {
    success?: boolean;
    user?: BackendUser;
    tokens?: BackendTokens;
  };
};

function cleanValue(
  value: string | undefined,
): string {
  return (value || "")
    .trim()
    .replace(/^["']|["']$/g, "");
}

function getBackendLoginUrl(): string | null {
  const configuredUrl = cleanValue(
    process.env.API_INTERNAL_URL ||
      process.env.NEXT_PUBLIC_API_URL,
  );

  if (!configuredUrl) {
    return null;
  }

  try {
    const url = new URL(configuredUrl);

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      return null;
    }

    url.search = "";
    url.hash = "";

    let pathname = url.pathname
      .replace(/\/+$/, "")
      .replace(/\/api\/v1\/auth\/admin\/login$/i, "")
      .replace(/\/auth\/admin\/login$/i, "")
      .replace(/\/api\/v1$/i, "")
      .replace(/\/+$/, "");

    url.pathname =
      `${pathname}/api/v1/auth/admin/login`;

    return url.toString();
  } catch {
    return null;
  }
}

function getPayload(
  body: BackendPayload,
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

function errorResponse(
  message: string,
  status: number,
) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

export async function POST(
  request: NextRequest,
) {
  try {
    let input: unknown;

    try {
      input = await request.json();
    } catch {
      return errorResponse(
        "بدنه درخواست معتبر نیست.",
        400,
      );
    }

    if (
      !input ||
      typeof input !== "object"
    ) {
      return errorResponse(
        "اطلاعات ورود معتبر نیست.",
        400,
      );
    }

    const body = input as {
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
      return errorResponse(
        "ایمیل یا رمز عبور معتبر نیست.",
        400,
      );
    }

    const backendUrl = getBackendLoginUrl();

    if (!backendUrl) {
      console.error(
        "[UNIQE ADMIN AUTH] Backend URL is missing or invalid.",
      );

      return errorResponse(
        "آدرس سرویس احراز هویت تنظیم نشده است.",
        503,
      );
    }

    const backendResponse = await fetch(
      backendUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    let backendBody: BackendPayload | null = null;

    try {
      backendBody =
        await backendResponse.json() as BackendPayload;
    } catch {
      backendBody = null;
    }

    if (
      !backendResponse.ok ||
      !backendBody
    ) {
      return errorResponse(
        "ایمیل یا رمز عبور مدیر صحیح نیست.",
        backendResponse.status === 429
          ? 429
          : 401,
      );
    }

    const payload = getPayload(backendBody);

    const user =
      payload.user || backendBody.user;

    const tokens =
      payload.tokens || backendBody.tokens;

    if (
      user?.role !== "ADMIN" &&
      user?.role !== "owner"
    ) {
      return errorResponse(
        "این حساب دسترسی مدیر ندارد.",
        403,
      );
    }

    /*
     * پاسخ بک‌اند باید هر دو توکن را داشته باشد.
     * توکن‌ها در پاسخ ارسالی به مرورگر قرار نمی‌گیرند.
     */
    if (
      typeof tokens?.accessToken !== "string" ||
      !tokens.accessToken ||
      typeof tokens?.refreshToken !== "string" ||
      !tokens.refreshToken
    ) {
      console.error(
        "[UNIQE ADMIN AUTH] Backend returned an incomplete token response.",
      );

      return errorResponse(
        "پاسخ احراز هویت سرور معتبر نیست.",
        502,
      );
    }

    const sessionToken =
      createAdminSession("owner");

    const response = NextResponse.json(
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
        process.env.NODE_ENV === "production",
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

    return errorResponse(
      "سرویس ورود موقتاً در دسترس نیست.",
      503,
    );
  }
}