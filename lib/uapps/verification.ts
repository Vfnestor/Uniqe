import type {
  UApp,
} from "@/lib/uapps/types";

export type UAppVerificationStatus =
  | "official"
  | "verified"
  | "unverified";

export type UAppVerification = {
  status: UAppVerificationStatus;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
};

export function getUAppVerification(
  app: UApp,
): UAppVerification {
  if (app.official) {
    return {
      status: "official",
      label: "رسمی Uniqe",
      shortLabel: "رسمی",
      description:
        "این نرم‌افزار محصول رسمی اکوسیستم Uniqe است.",
      icon: "✓",
    };
  }

  if (app.verified) {
    return {
      status: "verified",
      label: "تأیید شده",
      shortLabel: "تأیید شده",
      description:
        "این نرم‌افزار توسط Uniqe بررسی و تأیید شده است.",
      icon: "✓",
    };
  }

  return {
    status: "unverified",
    label: "تأیید نشده",
    shortLabel: "تأیید نشده",
    description:
      "این نرم‌افزار هنوز توسط Uniqe تأیید نشده است.",
    icon: "!",
  };
}

export function isUAppVerified(
  app: UApp,
): boolean {
  return (
    app.official === true ||
    app.verified === true
  );
}

export function isUAppOfficial(
  app: UApp,
): boolean {
  return app.official === true;
}

export function isUAppUserVerified(
  app: UApp,
): boolean {
  return (
    app.source === "user" &&
    app.verified === true &&
    app.official !== true
  );
}

export function getVerifiedUApps(
  apps: UApp[],
): UApp[] {
  return apps.filter(
    (app) =>
      isUAppVerified(app),
  );
}

export function getOfficialUApps(
  apps: UApp[],
): UApp[] {
  return apps.filter(
    (app) =>
      isUAppOfficial(app),
  );
}

export function getUserVerifiedUApps(
  apps: UApp[],
): UApp[] {
  return apps.filter(
    (app) =>
      isUAppUserVerified(app),
  );
}

export function getUnverifiedUApps(
  apps: UApp[],
): UApp[] {
  return apps.filter(
    (app) =>
      !isUAppVerified(app),
  );
}

export function sortUAppsByVerification(
  apps: UApp[],
): UApp[] {
  return [...apps].sort(
    (a, b) => {
      const priority = {
        official: 0,
        verified: 1,
        unverified: 2,
      };

      const aStatus =
        getUAppVerification(a)
          .status;

      const bStatus =
        getUAppVerification(b)
          .status;

      return (
        priority[aStatus] -
        priority[bStatus]
      );
    },
  );
}