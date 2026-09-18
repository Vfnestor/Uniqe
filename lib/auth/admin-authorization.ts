import {
  cookies,
} from "next/headers";

import {
  ADMIN_SESSION_COOKIE,
} from "@/lib/auth/admin-auth";

import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  type AdminPermission,
} from "@/lib/auth/permissions";

import {
  readAdminSession,
} from "@/lib/auth/admin-session";

export async function getAdminSession() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      ADMIN_SESSION_COOKIE,
    )?.value;

  return readAdminSession(
    token,
  );
}

export async function isAdminAuthenticated() {
  const session =
    await getAdminSession();

  return Boolean(
    session &&
      session.role !==
        "customer",
  );
}

export async function can(
  permission: AdminPermission,
) {
  const session =
    await getAdminSession();

  if (!session) {
    return false;
  }

  return hasPermission(
    session.role,
    permission,
  );
}

export async function canAny(
  permissions: AdminPermission[],
) {
  const session =
    await getAdminSession();

  if (!session) {
    return false;
  }

  return hasAnyPermission(
    session.role,
    permissions,
  );
}

export async function canAll(
  permissions: AdminPermission[],
) {
  const session =
    await getAdminSession();

  if (!session) {
    return false;
  }

  return hasAllPermissions(
    session.role,
    permissions,
  );
}