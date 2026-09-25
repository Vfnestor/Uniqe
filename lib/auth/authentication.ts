import {
  apiClient,
} from "@/lib/api/client";

import {
  apiEndpoints,
} from "@/lib/api/endpoints";

import type {
  AuthLoginResult,
  AuthResult,
} from "./types";

import {
  setStoredAuthSession,
} from "./auth-storage";

function getRedirectPath(
  role: AuthLoginResult["role"],
) {
  switch (role) {
    case "owner":
      return "/admin";

    case "user":
      return "/my";

    default:
      return "/my";
  }
}

export async function authenticate(
  email: string,
  password: string,
): Promise<AuthLoginResult> {
  const normalizedEmail =
    email.trim().toLowerCase();

  try {
    const response =
      await apiClient.post<AuthResult>(
        apiEndpoints.auth.login,
        {
          email:
            normalizedEmail,
          password,
        },
      );

    const user =
      response.user;

    if (
      !user ||
      !response.tokens?.accessToken ||
      !response.tokens?.refreshToken
    ) {
      return {
        success: false,
        message:
          "Invalid authentication response.",
      };
    }

    setStoredAuthSession({
      authenticated: true,
      user,
      tokens:
        response.tokens,
    });

    return {
      success: true,
      role: user.role,
      user,
      redirectTo:
        getRedirectPath(
          user.role,
        ),
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Invalid email or password.";

    return {
      success: false,
      message,
    };
  }
}