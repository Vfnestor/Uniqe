"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  useAuth,
} from "./AuthProvider";

export default function AuthStatus() {
  const {
    state,
    logout,
  } = useAuth();

  const [loggingOut, setLoggingOut] =
    useState(false);

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  }

  if (state.status === "loading") {
    return (
      <div
        dir="rtl"
        aria-live="polite"
      >
        در حال بررسی وضعیت حساب...
      </div>
    );
  }

  if (state.status === "unauthenticated") {
    return (
      <div dir="rtl">
        <p>
          وارد حساب کاربری نشده‌اید.
        </p>

        <Link href="/auth/login">
          ورود به حساب
        </Link>
      </div>
    );
  }

  const isOwner =
    state.user?.role === "owner";

  return (
    <section dir="rtl">
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
          {isOwner ? "مالک" : "کاربر"}
        </strong>
      </p>

      <p>
        وضعیت حساب:{" "}
        <strong>
          {state.user?.status === "active"
            ? "فعال"
            : state.user?.status === "suspended"
              ? "تعلیق‌شده"
              : "غیرفعال"}
        </strong>
      </p>

      <div>
        <Link
          href={isOwner ? "/admin" : "/my-u"}
        >
          ورود به فضای کاربری
        </Link>
      </div>

      <button
        type="button"
        onClick={() => {
          void handleLogout();
        }}
        disabled={loggingOut}
      >
        {loggingOut
          ? "در حال خروج..."
          : "خروج"}
      </button>
    </section>
  );
}