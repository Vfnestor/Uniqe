export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type AuthSession = {
  user: AuthUser;
  expiresAt: string;
};

export type AuthState = {
  authenticated: boolean;
  user: AuthUser | null;
  session: AuthSession | null;
};