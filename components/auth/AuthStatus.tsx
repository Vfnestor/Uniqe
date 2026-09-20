"use client";

import Link from "next/link";

import { useAuth } from "./AuthProvider";

export default function AuthStatus() {
  const { state, logout } = useAuth();

  if (state.status === "loading") {
    return (
      <div>
        در حال بررسی وضعیت حساب...
      </div>
    );
  }

  if (state.status === "unauthenticated") {
    return (
      <div>
        <p>
          وارد حساب کاربری نشده‌اید.
        </p>

        <Link href="/auth/login">
          ورود به حساب
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p>
        وارد شده به عنوان:{" "}
        <strong>
          {state.user?.name}
        </strong>
      </p>

      <p>
        {state.user?.email}
      </p>

      <p>
        نقش:{" "}
        <strong>
          {state.user?.role}
        </strong>
      </p>

      <button
        type="button"
        onClick={() => {
          void logout();
        }}
      >
        خروج
      </button>
    </div>
  );
}