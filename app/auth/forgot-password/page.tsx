import Link from "next/link";

import "@/components/auth/auth.css";
import AuthShell from "@/components/auth/AuthShell";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Uniqe / Account Recovery"
      title={
        <>
          Recover
          <br />
          your account.
        </>
      }
      description="اگر رمز عبور خود را فراموش کرده‌اید، از این بخش بازیابی حساب را شروع کنید."
    >
      <form
        className="auth-form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="auth-form-header">
          <span className="auth-form-eyebrow">
            PASSWORD RECOVERY
          </span>

          <h2>
            Forgot
            <br />
            <span>password?</span>
          </h2>

          <p>
            ایمیل حساب خود را وارد کنید
            تا فرآیند بازیابی آغاز شود.
          </p>
        </div>

        <div className="auth-field">
          <label htmlFor="forgot-email">
            ایمیل
          </label>

          <input
            id="forgot-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <button
          type="submit"
          className="button"
        >
          ادامه بازیابی
        </button>

        <div className="auth-form-links">
          <span>
            رمز عبور را به یاد آوردید؟
          </span>

          <Link href="/auth/login">
            بازگشت به ورود
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}