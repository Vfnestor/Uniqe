export type AuthUserRole =
  | "user"
  | "professional"
  | "admin";

export type AuthUserStatus =
  | "active"
  | "suspended"
  | "pending";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AuthUserRole;
  status: AuthUserStatus;
  avatar?: string;
  createdAt: string;
};

export type AuthSession = {
  user: AuthUser;
  authenticated: boolean;
  expiresAt?: string;
};

export type AuthState = {
  status:
    | "loading"
    | "authenticated"
    | "unauthenticated";

  user: AuthUser | null;
  session: AuthSession | null;
};

export type AuthContextValue = {
  state: AuthState;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};