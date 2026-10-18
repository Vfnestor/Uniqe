"use client";

import {
  useEffect,
  type ReactNode,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "./AuthProvider";

import type {
  AuthUserRole,
} from "@/lib/auth/types";

import {
  getLoginRedirectPath,
} from "@/lib/auth/redirects";

type RequireAuthProps = {
  children: ReactNode;
  allowedRoles?: AuthUserRole[];
};

export default function RequireAuth({
  children,
  allowedRoles = ["user"],
}: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    state,
  } = useAuth();

  const authenticated =
    state.status === "authenticated" &&
    !!state.user;

  const roleAllowed =
    authenticated &&
    state.user !== null &&
    allowedRoles.includes(
      state.user.role,
    );

  useEffect(() => {
    if (state.status === "loading") {
      return;
    }

    if (!authenticated) {
      router.replace(
        getLoginRedirectPath(
          pathname || "/my-u",
        ),
      );

      return;
    }

    if (!roleAllowed) {
      if (state.user?.role === "owner") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    }
  }, [
    authenticated,
    pathname,
    roleAllowed,
    router,
    state.status,
    state.user,
  ]);

  if (state.status === "loading") {
    return (
      <main
        className="auth-access-state"
        dir="rtl"
        aria-live="polite"
      >
        <div>
          <span
            className="auth-access-spinner"
            aria-hidden="true"
          />

          <p>
            در حال بررسی وضعیت حساب کاربری...
          </p>
        </div>
      </main>
    );
  }

  if (!authenticated || !roleAllowed) {
    return (
      <main
        className="auth-access-state"
        dir="rtl"
        aria-live="polite"
      >
        <div>
          <p>
            در حال انتقال به صفحه مناسب...
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}