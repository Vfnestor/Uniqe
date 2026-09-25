import type {
  AuthTokens,
  AuthUser,
} from "./types";

const AUTH_STORAGE_KEY =
  "uniqe-auth-session";

export type StoredAuthSession = {
  authenticated: boolean;
  user: AuthUser;
  tokens: AuthTokens;
};

export function getStoredAuthSession():
  | StoredAuthSession
  | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  try {
    const value =
      localStorage.getItem(
        AUTH_STORAGE_KEY,
      );

    if (!value) {
      return null;
    }

    return JSON.parse(
      value,
    ) as StoredAuthSession;
  } catch {
    return null;
  }
}

export function setStoredAuthSession(
  session: StoredAuthSession,
): void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(session),
  );
}

export function updateStoredTokens(
  tokens: AuthTokens,
): void {
  const session =
    getStoredAuthSession();

  if (!session) {
    return;
  }

  setStoredAuthSession({
    ...session,
    tokens,
  });
}

export function clearStoredAuthSession(): void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  localStorage.removeItem(
    AUTH_STORAGE_KEY,
  );
}

export function getAccessToken():
  | string
  | null {
  return (
    getStoredAuthSession()
      ?.tokens.accessToken ??
    null
  );
}

export function getRefreshToken():
  | string
  | null {
  return (
    getStoredAuthSession()
      ?.tokens.refreshToken ??
    null
  );
}