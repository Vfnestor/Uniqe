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
  authenticate,
} from "@/lib/auth/authentication";

import {
  clearStoredAuthSession,
  getStoredAuthSession,
  setStoredAuthSession,
} from "@/lib/auth/auth-storage";

import type {
  AuthContextValue,
  AuthLoginResult,
  AuthState,
} from "@/lib/auth/types";

const AuthContext =
  createContext<
    AuthContextValue | undefined
  >(undefined);

type AuthProviderProps = {
  children: ReactNode;
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
    const stored =
      getStoredAuthSession();

    if (
      stored?.authenticated &&
      stored.user
    ) {
      const user = {
        ...stored.user,
        status: "active" as const,
        createdAt:
          new Date().toISOString(),
      };

      setState({
        status: "authenticated",
        user,
        session: {
          user,
          authenticated: true,
        },
      });

      return;
    }

    setState({
      status: "unauthenticated",
      user: null,
      session: null,
    });
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

    /*
     * Owner uses the existing
     * secure Admin session.
     *
     * We do not overwrite it
     * with localStorage.
     */

    if (
      result.role === "owner"
    ) {
      return result;
    }

    if (
      result.user
    ) {
      const user = {
        ...result.user,
        status: "active" as const,
        createdAt:
          new Date().toISOString(),
      };

      setStoredAuthSession({
        authenticated: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });

      setState({
        status: "authenticated",
        user,
        session: {
          user,
          authenticated: true,
        },
      });
    }

    return result;
  }

  async function logout(): Promise<void> {
    clearStoredAuthSession();

    setState({
      status: "unauthenticated",
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

export function useAuth():
  AuthContextValue {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider.",
    );
  }

  return context;
}