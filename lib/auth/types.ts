export type AuthUserRole =
  | "user"
  | "owner"
  | "seller"
  | "teacher"
  | "professional";

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

export type AuthLoginResult = {
  success: boolean;
  role?: AuthUserRole;
  user?: AuthUser;
  redirectTo?: string;
  message?: string;
};

export type AuthContextValue = {
  state: AuthState;
  login: (
    email: string,
    password: string,
  ) => Promise<AuthLoginResult>;
  logout: () => Promise<void>;
};