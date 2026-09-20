"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { demoUser } from "@/lib/auth/demo-data";
import {
  getStoredAuthState,
  setStoredAuthState,
} from "@/lib/auth/auth-storage";

import type {
  AuthContextValue,
  AuthState,
} from "@/lib/auth/types";

const AuthContext =
  createContext<AuthContextValue | undefined>(
    undefined,
  );

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    status: "loading",
    user: null,
    session: null,
  });

  useEffect(() => {
    const authenticated = getStoredAuthState();

    if (authenticated) {
      setState({
        status: "authenticated",
        user: demoUser,
        session: {
          user: demoUser,
          authenticated: true,
        },
      });
    } else {
      setState({
        status: "unauthenticated",
        user: null,
        session: null,
      });
    }
  }, []);

  async function login(): Promise<void> {
    setStoredAuthState(true);

    setState({
      status: "authenticated",
      user: demoUser,
      session: {
        user: demoUser,
        authenticated: true,
      },
    });
  }

  async function logout(): Promise<void> {
    setStoredAuthState(false);

    setState({
      status: "unauthenticated",
      user: null,
      session: null,
    });
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      state,
      login,
      logout,
    }),
    [state],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider.",
    );
  }

  return context;
}