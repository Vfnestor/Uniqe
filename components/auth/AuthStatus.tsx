"use client";

import { useAuth } from "./AuthProvider";

export default function AuthStatus() {
  const { state, login, logout } = useAuth();

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
        <p>وارد حساب کاربری نشده‌اید.</p>

        <button
          type="button"
          onClick={() => {
            void login();
          }}
        >
          ورود آزمایشی
        </button>
      </div>
    );
  }

  return (
    <div>
      <p>
        وارد شده به عنوان:{" "}
        <strong>{state.user?.name}</strong>
      </p>

      <p>
        {state.user?.email}
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