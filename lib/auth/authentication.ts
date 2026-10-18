import {
  apiClient,
} from "@/lib/api/client";

import {
  apiEndpoints,
} from "@/lib/api/endpoints";

import type {
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