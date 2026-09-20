const AUTH_STORAGE_KEY = "uniqe-authenticated";

export function getStoredAuthState(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function setStoredAuthState(
  authenticated: boolean,
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    if (authenticated) {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    // Storage may be unavailable.
  }
}

export function clearStoredAuthState(): void {
  setStoredAuthState(false);
}