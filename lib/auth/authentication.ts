import {
  apiClient,
} from "@/lib/api/client";

import {
  apiEndpoints,
} from "@/lib/api/endpoints";

import type {
  AdminLoginResult,
  AuthLoginResult,
  AuthRegisterResult,
  AuthResult,
} from "./types";

import {
  setStoredAuthSession,
} from "./auth-storage";

import {
  getPostAuthRedirectPath,
} from "./redirects";

function getErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (
    error instanceof Error &&
    error.message.trim()
  ) {
    return error.message;
  }

  return fallback;
}

function saveAuthentication(
  response: AuthResult,
): AuthLoginResult {
  const user = response?.user;
  const tokens = response?.tokens;

  if (
    !user ||
    typeof user.id !== "string" ||
    typeof user.email !== "string" ||
    !tokens?.accessToken ||
    !tokens?.refreshToken
  ) {
    return {
      success: false,
      message:
        "پاسخ احراز هویت از سرور معتبر نیست.",
    };
  }

  setStoredAuthSession({
    authenticated: true,
    user,
    tokens,
  });

  return {
    success: true,
    user,
    role: user.role,
    redirectTo:
      getPostAuthRedirectPath(
        user.role,
      ),
  };
}

/**
 * ورود عادی کاربر.
 *
 * نقش کاربر از پاسخ بک‌اند دریافت می‌شود.
 */
export async function authenticate(
  email: string,
  password: string,
): Promise<AuthLoginResult> {
  try {
    const response =
      await apiClient.post<AuthResult>(
        apiEndpoints.auth.login,
        {
          email:
            email.trim().toLowerCase(),
          password,
        },
      );

    return saveAuthentication(
      response,
    );
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(
        error,
        "ورود ناموفق بود. دوباره تلاش کنید.",
      ),
    };
  }
}

/**
 * ورود اختصاصی مدیر.
 *
 * درخواست به مسیر داخلی Next.js فرستاده می‌شود.
 * بررسی نقش ADMIN در بک‌اند انجام می‌شود.
 * اطلاعات نشست مدیریتی در کوکی HttpOnly قرار می‌گیرد.
 */
export async function authenticateAdmin(
  email: string,
  password: string,
): Promise<AdminLoginResult> {
  try {
    const response = await fetch(
      "/api/admin/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        credentials: "same-origin",

        cache: "no-store",

        body: JSON.stringify({
          email:
            email.trim().toLowerCase(),
          password,
        }),
      },
    );

    let result:
      | {
          success?: boolean;
          role?: string;
          message?: string;
        }
      | null = null;

    try {
      result = await response.json();
    } catch {
      result = null;
    }

    if (
      !response.ok ||
      result?.success !== true ||
      result?.role !== "owner"
    ) {
      return {
        success: false,
        message:
          result?.message ||
          "ورود مدیر ناموفق بود.",
      };
    }

    return {
      success: true,
      role: "owner",
    };
  } catch {
    return {
      success: false,
      message:
        "ارتباط با سرور برقرار نشد. دوباره تلاش کنید.",
    };
  }
}

/**
 * ثبت‌نام کاربر عادی.
 *
 * نقش و سطح دسترسی توسط بک‌اند تعیین می‌شود.
 */
export async function registerAccount(
  name: string,
  email: string,
  password: string,
): Promise<AuthRegisterResult> {
  try {
    const response =
      await apiClient.post<AuthResult>(
        apiEndpoints.auth.register,
        {
          name: name.trim(),

          email:
            email.trim().toLowerCase(),

          password,
        },
      );

    return saveAuthentication(
      response,
    );
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(
        error,
        "ثبت‌نام ناموفق بود. دوباره تلاش کنید.",
      ),
    };
  }
}