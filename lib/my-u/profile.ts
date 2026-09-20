export type UserGender =
  | "male"
  | "female"
  | "unspecified";

export type UserDeviceType =
  | "mobile"
  | "laptop"
  | "tablet"
  | "desktop"
  | "other";

export type UserProfile = {
  firstName: string;
  lastName: string;
  gender: UserGender;
  username: string;
  avatar?: string;
  phone: string;
  email: string;
  deviceType: UserDeviceType;
  deviceBrand: string;
  deviceModel: string;
  sheba: string;
};

export const USER_PROFILE_STORAGE_KEY =
  "uniqe-user-profile";

export const DEFAULT_USER_PROFILE: UserProfile = {
  firstName: "",
  lastName: "",
  gender: "unspecified",
  username: "",
  avatar: "",
  phone: "",
  email: "",
  deviceType: "mobile",
  deviceBrand: "",
  deviceModel: "",
  sheba: "",
};

export function getStoredUserProfile(): UserProfile {
  if (typeof window === "undefined") {
    return DEFAULT_USER_PROFILE;
  }

  try {
    const stored =
      window.localStorage.getItem(
        USER_PROFILE_STORAGE_KEY,
      );

    if (!stored) {
      return DEFAULT_USER_PROFILE;
    }

    const parsed = JSON.parse(stored);

    return {
      ...DEFAULT_USER_PROFILE,
      ...parsed,
    };
  } catch {
    return DEFAULT_USER_PROFILE;
  }
}

export function saveStoredUserProfile(
  profile: UserProfile,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    USER_PROFILE_STORAGE_KEY,
    JSON.stringify(profile),
  );
}

export function normalizeSheba(
  value: string,
): string {
  return value
    .replace(/\s+/g, "")
    .toUpperCase();
}

export function validateSheba(
  value: string,
): boolean {
  const sheba = normalizeSheba(value);

  if (!/^IR\d{24}$/.test(sheba)) {
    return false;
  }

  const rearranged =
    sheba.slice(4) +
    "1827" +
    sheba.slice(2, 4);

  let remainder = 0;

  for (
    let index = 0;
    index < rearranged.length;
    index += 1
  ) {
    remainder =
      (remainder * 10 +
        Number(rearranged[index])) %
      97;
  }

  return remainder === 1;
}

export function validateUsername(
  username: string,
): boolean {
  return /^[a-zA-Z0-9_]{3,30}$/.test(
    username.trim(),
  );
}