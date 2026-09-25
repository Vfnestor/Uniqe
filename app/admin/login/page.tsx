"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  useLanguage,
} from "@/components/i18n/LanguageProvider";

import {
  useAuth,
} from "@/components/auth/AuthProvider";

import "./login.css";

export default function AdminLoginPage() {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const {
    language,
  } = useLanguage();

  const {
    login,
  } = useAuth();

  const isRtl =
    language === "fa";

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result =
        await login(
          email,
          password,
        );

      if (!result.success) {
        setError(
          result.message ||
            (
              isRtl
                ? "ایمیل یا رمز عبور صحیح نیست."
                : "Invalid email or password."
            ),
        );

        return;
      }

      const redirect =
        searchParams.get(
          "redirect",
        );

      if (
        result.role ===
        "owner"
      ) {
        router.replace(
          redirect &&
            redirect.startsWith(
              "/admin",
            )
            ? redirect
            : "/admin",
        );

        router.refresh();

        return;
      }

      router.replace(
        result.redirectTo ||
          "/my",
      );

      router.refresh();
    } catch {
      setError(
        isRtl
          ? "خطایی در ورود رخ داد. دوباره تلاش کنید."
          : "A login error occurred. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="admin-login-page"
      dir={
        isRtl
          ? "rtl"
          : "ltr"
      }
    >
      <div className="admin-login-background">
        <span />
        <span />
        <span />
      </div>

      <section className="admin-login-card">
        <div className="admin-login-brand">
          <div className="admin-login-mark">
            U
          </div>

          <div>
            <strong>
              Uniqe
            </strong>

            <span>
              {isRtl
                ? "ورود به Uniqe"
                : "Uniqe Authentication"}
            </span>
          </div>
        </div>

        <div className="admin-login-heading">
          <span>
            SECURE ACCESS
          </span>

          <h1>
            {isRtl
              ? "ورود به Uniqe"
              : "Sign In to Uniqe"}
          </h1>

          <p>
            {isRtl
              ? "با حساب کاربری خود وارد اکوسیستم Uniqe شوید."
              : "Sign in to access your Uniqe account."}
          </p>
        </div>

        <form
          className="admin-login-form"
          onSubmit={
            handleSubmit
          }
        >
          <label>
            <span>
              {isRtl
                ? "ایمیل"
                : "Email"}
            </span>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value,
                )
              }
              placeholder={
                isRtl
                  ? "ایمیل"
                  : "Email"
              }
              autoComplete="username"
              required
              disabled={loading}
            />
          </label>

          <label>
            <span>
              {isRtl
                ? "رمز عبور"
                : "Password"}
            </span>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value,
                )
              }
              placeholder={
                isRtl
                  ? "رمز عبور"
                  : "Password"
              }
              autoComplete="current-password"
              required
              disabled={loading}
            />
          </label>

          {error ? (
            <div className="admin-login-error">
              <span>
                !
              </span>

              <p>
                {error}
              </p>
            </div>
          ) : null}

          <button
            type="submit"
            className="admin-login-submit"
            disabled={loading}
          >
            <span>
              {loading
                ? isRtl
                  ? "در حال ورود..."
                  : "Signing in..."
                : isRtl
                  ? "ورود"
                  : "Sign In"}
            </span>

            <b>
              →
            </b>
          </button>
        </form>

        <div className="admin-login-security">
          <span>
            ✓
          </span>

          <p>
            {isRtl
              ? "اتصال امن • سیستم تشخیص خودکار نقش کاربر"
              : "Secure connection • Automatic role detection"}
          </p>
        </div>

        <div className="admin-login-footer">
          Uniqe Ecosystem
          <span>
            •
          </span>
          Authentication
        </div>
      </section>
    </main>
  );
}