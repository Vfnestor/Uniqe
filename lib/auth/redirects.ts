import type {
  AuthUserRole,
} from "./types";

export function getPostAuthRedirectPath(
  role: AuthUserRole | undefined,
): string {
  if (role === "owner") {
    return "/admin";
  }

  return "/my-u";
}

export function getLoginRedirectPath(
  pathname: string,
): string {
  const safePath =
    pathname.startsWith("/") &&
    !pathname.startsWith("//") &&
    !pathname.startsWith("/auth/")
      ? pathname
      : "/my-u";

  return `/auth/login?next=${encodeURIComponent(
    safePath,
  )}`;
}

export function getSafeNextPath(
  value: string | null,
  fallback = "/my-u",
): string {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.startsWith("/auth/")
  ) {
    return fallback;
  }

  return value;
}