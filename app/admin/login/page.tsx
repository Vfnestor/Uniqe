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

import "./login.css";

export default function AdminLoginPage() {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const {
    language,
  } = useLanguage();

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
      const response =
        await fetch(
          "/api/admin/login",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        setError(
          isRtl
            ? "ایمیل یا رمز عبور صحیح نیست."
            : "Invalid email or password.",
        );

        return;
      }

      if (data?.success) {
        const redirect =
          searchParams.get(
            "redirect",
          );

        router.replace(
          redirect &&
            redirect.startsWith(
              "/admin",
            )
            ? redirect
            : "/admin",
        );

        router.refresh();
      }
    } catch {
      setError(
        isRtl
          ? "خطایی در اتصال به سرور رخ داد."
          : "A server connection error occurred.",
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
                ? "پنل مدیریت"
                : "Admin Panel"}
            </span>
          </div>
        </div>

        <div className="admin-login-heading">
          <span>
            {isRtl
              ? "SECURE ACCESS"
              : "SECURE ACCESS"}
          </span>

          <h1>
            {isRtl
              ? "ورود به پنل مدیریت"
              : "Admin Sign In"}
          </h1>

          <p>
            {isRtl
              ? "برای دسترسی به مرکز کنترل Uniqe وارد شوید."
              : "Sign in to access the Uniqe central control center."}
          </p>
        </div>

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
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
                  ? "ایمیل مدیر"
                  : "Admin email"
              }
              autoComplete="username"
              required
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
                  ? "ورود به پنل"
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
              ? "اتصال امن • دسترسی فقط برای مدیر مجاز"
              : "Secure connection • Authorized administrators only"}
          </p>
        </div>

        <div className="admin-login-footer">
          Uniqe Ecosystem
          <span>
            •
          </span>
          Admin
        </div>
      </section>
    </main>
  );
}
