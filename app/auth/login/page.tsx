import "@/components/auth/auth.css";

import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Uniqe / Authentication"
      title={
        <>
          Welcome
          <br />
          back.
        </>
      }
      description="Sign in to access your personal space inside the Uniqe ecosystem."
    >
      <LoginForm />
    </AuthShell>
  );
}