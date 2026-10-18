"use client";

import {
  useState,
  type FormEvent,
} from "react";

import Link from "next/link";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  useAuth,
} from "./AuthProvider";

import {
  getSafeNextPath,
} from "@/lib/auth/redirects";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    state,
    login,
  } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    if (!email.trim()) {
      setError(
        "لطفاً ایمیل خود را وارد کنید.",
      );
      return;
    }

    if (!password) {
      setError(
        "لطفاً رمز عبور خود را وارد کنید.",
      );
      return;
    }

    setLoading(true);

    try {
      const result = await login(
        email,
        password,
      );

      if (!result.success) {
        setError(
          result.message ||
            "ایمیل یا رمز عبور صحیح نیست.",
        );
        return;
      }

      const requestedPath =
        getSafeNextPath(
          searchParams.get("next"),
          result.redirectTo || "/my-u",
        );

      router.replace(requestedPath);
      router.refresh();
    } catch {
      setError(
        "خطایی در ورود رخ داد. لطفاً دوباره تلاش کنید.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (state.status === "loading") {
    return (
      <div className="auth-form">
        <div className="auth-form-header">
          <span className="auth-form-eyebrow">
            UNIQE
          </span>

          <h2>
            Checking
            <br />
            session.
          </h2>

          <p>
            در حال بررسی وضعیت حساب کاربری...
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
    >
      <div className="auth-form-header">
        <span className="auth-form-eyebrow">
          UNIQE / AUTHENTICATION
        </span>

        <h2>
          Sign in to
          <br />
          <span>Uniqe.</span>
        </h2>

        <p>
          با یک حساب کاربری به فضای اختصاصی
          خود در اکوسیستم Uniqe وارد شوید.
        </p>
      </div>

      <div className="auth-field">
        <label htmlFor="login-email">
          ایمیل
        </label>

        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          disabled={loading}
          required
        />
      </div>

      <div className="auth-field">
        <div className="auth-field-row">
          <label htmlFor="login-password">
            رمز عبور
          </label>

          <Link
            href="/auth/forgot-password"
            className="auth-field-hint"
          >
            فراموشی رمز عبور
          </Link>
        </div>

        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="رمز عبور"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          disabled={loading}
          required
        />
      </div>

      {error && (
        <div
          className="auth-form-error"
          role="alert"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        className="button"
        disabled={loading}
      >
        {loading
          ? "در حال ورود..."
          : "ورود به Uniqe"}
      </button>

      <div className="auth-form-links">
        <span>
          حساب کاربری ندارید؟
        </span>

        <Link href="/auth/register">
          ساخت حساب کاربری
        </Link>
      </div>

      <p className="auth-form-note">
        پس از ورود، مقصد شما بر اساس نقش
        حساب و مسیر درخواستی تعیین می‌شود.
      </p>
    </form>
  );
}