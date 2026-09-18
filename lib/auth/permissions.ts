export type AdminRole =
  | "owner"
  | "staff"
  | "customer";

export type AdminPermission =
  | "admin.access"

  | "ushop.view"
  | "ushop.manage"
  | "ushop.orders"

  | "uschool.view"
  | "uschool.manage"

  | "uweb.view"
  | "uweb.manage"

  | "uapps.view"
  | "uapps.manage"

  | "ucore.view"
  | "ucore.manage"

  | "lab.view"
  | "lab.manage"

  | "users.view"
  | "users.manage"

  | "content.view"
  | "content.manage"

  | "media.view"
  | "media.manage"

  | "notifications.view"
  | "notifications.manage"

  | "analytics.view"

  | "settings.view"
  | "settings.manage";

const OWNER_PERMISSIONS:
  readonly AdminPermission[] = [
    "admin.access",

    "ushop.view",
    "ushop.manage",
    "ushop.orders",

    "uschool.view",
    "uschool.manage",

    "uweb.view",
    "uweb.manage",

    "uapps.view",
    "uapps.manage",

    "ucore.view",
    "ucore.manage",

    "lab.view",
    "lab.manage",

    "users.view",
    "users.manage",

    "content.view",
    "content.manage",

    "media.view",
    "media.manage",

    "notifications.view",
    "notifications.manage",

    "analytics.view",

    "settings.view",
    "settings.manage",
  ];

const STAFF_PERMISSIONS:
  readonly AdminPermission[] = [
    "admin.access",

    "ushop.view",
    "ushop.manage",
    "ushop.orders",

    "uschool.view",
    "uschool.manage",

    "uweb.view",
    "uweb.manage",

    "uapps.view",
    "uapps.manage",

    "ucore.view",
    "ucore.manage",

    "lab.view",
    "lab.manage",

    "users.view",

    "content.view",
    "content.manage",

    "media.view",
    "media.manage",

    "notifications.view",
    "notifications.manage",

    "analytics.view",
  ];

const CUSTOMER_PERMISSIONS:
  readonly AdminPermission[] = [];

export const ROLE_PERMISSIONS: Record<
  AdminRole,
  readonly AdminPermission[]
> = {
  owner: OWNER_PERMISSIONS,
  staff: STAFF_PERMISSIONS,
  customer:
    CUSTOMER_PERMISSIONS,
};

export function hasPermission(
  role: AdminRole,
  permission: AdminPermission,
) {
  return ROLE_PERMISSIONS[
    role
  ].includes(permission);
}

export function hasAnyPermission(
  role: AdminRole,
  permissions: AdminPermission[],
) {
  return permissions.some(
    (permission) =>
      hasPermission(
        role,
        permission,
      ),
  );
}

export function hasAllPermissions(
  role: AdminRole,
  permissions: AdminPermission[],
) {
  return permissions.every(
    (permission) =>
      hasPermission(
        role,
        permission,
      ),
  );
}

export function isAdminRole(
  role: AdminRole,
) {
  return (
    role === "owner" ||
    role === "staff"
  );
}

export function getRoleLabel(
  role: AdminRole,
) {
  const labels: Record<
    AdminRole,
    {
      en: string;
      fa: string;
    }
  > = {
    owner: {
      en: "Owner",
      fa: "مالک",
    },

    staff: {
      en: "Staff",
      fa: "کارمند",
    },

    customer: {
      en: "Customer",
      fa: "کاربر",
    },
  };

  return labels[role];
}