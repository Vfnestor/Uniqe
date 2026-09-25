"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  apiClient,
} from "@/lib/api/client";

import {
  apiEndpoints,
} from "@/lib/api/endpoints";

import {
  authenticate,
} from "@/lib/auth/authentication";

import {
  clearStoredAuthSession,
  getRefreshToken,
  getStoredAuthSession,
  setStoredAuthSession,
  updateStoredTokens,
} from "@/lib/auth/auth-storage";

import type {
  AuthContextValue,
  AuthLoginResult,
  AuthSession,
  AuthState,
  AuthTokens,
  AuthUser,
} from "@/lib/auth/types";

const AuthContext =
  createContext<
    AuthContextValue | undefined
  >(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

type SessionResponse = {
  authenticated: true;
  user: AuthUser;
};

type RefreshResponse = {
  user: AuthUser;
  tokens: AuthTokens;
};

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const [state, setState] =
    useState<AuthState>({
      status: "loading",
      user: null,
      session: null,
    });

  useEffect(() => {
    async function restoreSession() {
      const stored =
        getStoredAuthSession();

      if (
        !stored?.authenticated ||
        !stored.tokens
      ) {
        setState({
          status:
            "unauthenticated",
          user: null,
          session: null,
        });

        return;
      }

      try {
        const response =
          await apiClient.get<SessionResponse>(
            apiEndpoints.auth.session,
          );

        const session: AuthSession = {
          authenticated:
            true,
          user:
            response.user,
        };

        setState({
          status:
            "authenticated",
          user:
            response.user,
          session,
        });
      } catch {
        const refreshToken =
          getRefreshToken();

        if (!refreshToken) {
          clearStoredAuthSession();

          setState({
            status:
              "unauthenticated",
            user: null,
            session: null,
          });

          return;
        }

        try {
          const response =
            await apiClient.post<RefreshResponse>(
              apiEndpoints.auth.refresh,
              {
                refreshToken,
              },
            );

          updateStoredTokens(
            response.tokens,
          );

          setStoredAuthSession({
            authenticated: true,
            user:
              response.user,
            tokens:
              response.tokens,
          });

          const session: AuthSession = {
            authenticated:
              true,
            user:
              response.user,
          };

          setState({
            status:
              "authenticated",
            user:
              response.user,
            session,
          });
        } catch {
          clearStoredAuthSession();

          setState({
            status:
              "unauthenticated",
            user: null,
            session: null,
          });
        }
      }
    }

    void restoreSession();
  }, []);

  async function login(
    email: string,
    password: string,
  ): Promise<AuthLoginResult> {
    const result =
      await authenticate(
        email,
        password,
      );

    if (!result.success) {
      return result;
    }

    if (result.user) {
      const session: AuthSession = {
        authenticated:
          true,
        user:
          result.user,
      };

      setState({
        status:
          "authenticated",
        user:
          result.user,
        session,
      });
    }

    return result;
  }

  async function logout(): Promise<void> {
    const refreshToken =
      getRefreshToken();

    if (refreshToken) {
      try {
        await apiClient.post(
          apiEndpoints.auth.logout,
          {
            refreshToken,
          },
        );
      } catch {
        return;
      }
    }

    clearStoredAuthSession();

    setState({
      status:
        "unauthenticated",
      user: null,
      session: null,
    });
  }

  const value =
    useMemo<AuthContextValue>(
      () => ({
        state,
        login,
        logout,
      }),
      [state],
    );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context =
    useContext(
      AuthContext,
    );

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider.",
    );
  }

  return context;
}