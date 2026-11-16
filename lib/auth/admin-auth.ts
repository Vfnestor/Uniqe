import {
  createAdminSession as createSession,
  readAdminSession,
} from "@/lib/auth/admin-session";

export const ADMIN_SESSION_COOKIE =
  "uniqe-admin-session";

export function createAdminSession(): string {
  return createSession("owner");
}

export function verifyAdminSession(
  token: string | undefined,
): boolean {
  return readAdminSession(token) !== null;
}

export {
  readAdminSession,
};