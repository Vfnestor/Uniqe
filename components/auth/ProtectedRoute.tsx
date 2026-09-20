"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "./AuthProvider";

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { state } = useAuth();

  useEffect(() => {
    if (state.status === "unauthenticated") {
      router.replace("/login");
    }
  }, [router, state.status]);

  if (state.status === "loading") {
    return (
      <main
        style={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          padding: "40px 20px",
        }}
      >
        <p>در حال بررسی حساب کاربری...</p>
      </main>
    );
  }

  if (state.status === "unauthenticated") {
    return null;
  }

  return <>{children}</>;
}