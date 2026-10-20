"use client";

import {
  useState,
  type FormEvent,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  useLanguage,
} from "@/components/i18n/LanguageProvider";

import {
  useAuth,
} from "@/components/auth/AuthProvider";

import "./login.css";

export default function AdminLoginPage() {
  const router = useRouter();

  const {
    language,
  } = useLanguage();

  const {
    loginAdmin,
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

    if (loading) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result =
        await loginAdmin(
          email,
          password,
        );

      if (
        !result.success ||
        result.role !== "owner"
      ) {
        setError(
          result.message ||
            (
              isRtl
                ? "حساب مدیر معتبر نیست یا اطلاعات ورود اشتباه است."
                : "Invalid administrator credentials."
            ),
        );

        return;
      }

      const searchParams =
        new URLSearchParams(
          window.location.search,
        );

      const requestedRedirect =
        searchParams.get("redirect");

      const safeRedirect =
        requestedRedirect &&
        requestedRedirect.startsWith("/admin/") &&
        !requestedRedirect.startsWith("//")
          ? requestedRedirect
          : requestedRedirect === "/admin"
            ? "/admin"
            : "/admin";

      router.replace(
        safeRedirect,
      );

      router.refresh();
    } catch {
      setError(
        isRtl
          ? "خطایی هنگام ورود رخ داد. دوباره تلاش کنید."
          : "An error occurred during sign-in. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="admin-login-page"
      dir={isRtl ? "rtl" : "ltr"}
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
            <strong>Uniqe</strong>

            <span>
              {isRtl
                ? "ورود امن مدیر"
                : "Secure Administrator Access"}
            </span>
          </div>
        </div>

        <div className="admin-login-heading">
          <span>
            SECURE ADMIN ACCESS
          </span>

          <h1>
            {isRtl
              ? "ورود به پنل مدیریت"
              : "Administrator Sign In"}
          </h1>

          <p>
            {isRtl
              ? "برای ورود، از حساب مدیریتی ثبت‌شده در سیستم استفاده کنید."
              : "Sign in using an authorized administrator account."}
          </p>
        </div>

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >
          <label>
            <span>
              {isRtl ? "ایمیل" : "Email"}
            </span>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder={
                isRtl
                  ? "ایمیل مدیر"
                  : "Administrator email"
              }
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
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
              name="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
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
            <div
              className="admin-login-error"
              role="alert"
              aria-live="polite"
            >
              <span>!</span>

              <p>{error}</p>
            </div>
          ) : null}

          <button
            type="submit"
            className="admin-login-submit"
            disabled={
              loading ||
              !email.trim() ||
              !password
            }
          >
            <span>
              {loading
                ? isRtl
                  ? "در حال بررسی..."
                  : "Verifying..."
                : isRtl
                  ? "ورود امن"
                  : "Sign In Securely"}
            </span>

            <b>→</b>
          </button>
        </form>

        <div className="admin-login-security">
          <span>✓</span>

          <p>
            {isRtl
              ? "دسترسی مدیریتی فقط پس از تأیید سرور مجاز است."
              : "Administrator access is verified by the server."}
          </p>
        </div>

        <div className="admin-login-footer">
          Uniqe Ecosystem
          <span>•</span>
          Admin Authentication
        </div>
      </section>
    </main>
  );
}