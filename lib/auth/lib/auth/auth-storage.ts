const AUTH_STORAGE_KEY =
  "uniqe-auth-session";

export type StoredAuthSession = {
  authenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role:
      | "user"
      | "owner"
      | "seller"
      | "teacher"
      | "professional";
  };
};

export function getStoredAuthSession():
  | StoredAuthSession
  | null {
  if (typeof window === "undefined") {
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
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(session),
    );
  } catch {
    // Storage may be unavailable.
  }
}

export function clearStoredAuthSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(
      AUTH_STORAGE_KEY,
    );
  } catch {
    // Storage may be unavailable.
  }
}