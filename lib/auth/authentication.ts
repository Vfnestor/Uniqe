import type {
  AuthLoginResult,
  AuthUserRole,
} from "./types";

function getRedirectPath(
  role: AuthUserRole,
) {
  switch (role) {
    case "owner":
      return "/admin";

    case "user":
      return "/my";

    case "seller":
      return "/seller";

    case "teacher":
      return "/teacher";

    case "professional":
      return "/professional";

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

  /*
   * =========================================================
   * OWNER
   * =========================================================
   *
   * Owner authentication continues to use
   * the existing Admin authentication system.
   *
   * We intentionally do not modify the Admin
   * login page or Admin session implementation.
   */

  try {
    const adminResponse =
      await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email:
              normalizedEmail,
            password,
          }),
        },
      );

    if (adminResponse.ok) {
      const data =
        await adminResponse.json();

      if (
        data?.success &&
        data?.role === "owner"
      ) {
        return {
          success: true,
          role: "owner",
          redirectTo: "/admin",
        };
      }
    }
  } catch {
    /*
     * If Admin authentication is unavailable,
     * continue with normal user authentication.
     */
  }

  /*
   * =========================================================
   * DEMO USER
   * =========================================================
   *
   * Temporary authentication layer.
   *
   * This will later be replaced with the
   * real user authentication API/database.
   */

  if (
    normalizedEmail ===
      "user@uniqe.local" &&
    password === "uniqe-demo"
  ) {
    const user = {
      id: "user-demo-01",
      name: "کاربر نمونه",
      email: normalizedEmail,
      role: "user" as const,
    };

    return {
      success: true,
      role: "user",
      user,
      redirectTo:
        getRedirectPath("user"),
    };
  }

  return {
    success: false,
    message:
      "ایمیل یا رمز عبور صحیح نیست.",
  };
}