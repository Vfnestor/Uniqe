export type AuthUserRole =
  | "user"
  | "owner";

export type AuthUserStatus =
  | "active"
  | "inactive"
  | "suspended";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AuthUserRole;
  status: AuthUserStatus;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthSession = {
  user: AuthUser;
  authenticated: boolean;
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

export type AuthRegisterResult =
  AuthLoginResult;

export type AuthResult = {
  user: AuthUser;
  tokens: AuthTokens;
};

export type AdminLoginResult = {
  success: boolean;
  role?: "owner";
  message?: string;
};

export type AuthContextValue = {
  state: AuthState;

  login: (
    email: string,
    password: string,
  ) => Promise<AuthLoginResult>;

  loginAdmin: (
    email: string,
    password: string,
  ) => Promise<AdminLoginResult>;

  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<AuthRegisterResult>;

  logout: () => Promise<void>;
};