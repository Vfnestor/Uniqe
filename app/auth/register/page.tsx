import "@/components/auth/auth.css";

import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

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
      <RegisterForm />
    </AuthShell>
  );
}