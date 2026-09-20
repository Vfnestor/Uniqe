import Link from "next/link";

import "@/components/auth/auth.css";
import AuthShell from "@/components/auth/AuthShell";

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Uniqe / Registration"
      title={
        <>
          Create
          <br />
          your account.
        </>
      }
      description="برای استفاده از سرویس‌های Uniqe حساب کاربری خود را ایجاد کنید."
    >
      <form
        className="auth-form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="auth-form-header">
          <span className="auth-form-eyebrow">
            USER ACCOUNT
          </span>

          <h2>
            Join
            <br />
            <span>Uniqe.</span>
          </h2>

          <p>
            ثبت‌نام عمومی برای حساب
            کاربری Uniqe.
          </p>
        </div>

        <div className="auth-field">
          <label htmlFor="register-name">
            نام و نام خانوادگی
          </label>

          <input
            id="register-name"
            name="name"
            type="text"
            placeholder="نام شما"
            autoComplete="name"
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="register-email">
            ایمیل
          </label>

          <input
            id="register-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="register-password">
            رمز عبور
          </label>

          <input
            id="register-password"
            name="password"
            type="password"
            placeholder="رمز عبور"
            autoComplete="new-password"
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="register-password-confirm">
            تکرار رمز عبور
          </label>

          <input
            id="register-password-confirm"
            name="passwordConfirm"
            type="password"
            placeholder="تکرار رمز عبور"
            autoComplete="new-password"
            required
          />
        </div>

        <button
          type="submit"
          className="button"
        >
          ایجاد حساب
        </button>

        <div className="auth-form-links">
          <span>
            قبلاً حساب دارید؟
          </span>

          <Link href="/auth/login">
            ورود
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}