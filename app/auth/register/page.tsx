import "@/components/auth/auth.css";

import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Uniqe / Authentication"
      title={
        <>
          Create
          <br />
          your space.
        </>
      }
      description="Create the foundation for your future identity and experiences across Uniqe."
    >
      <RegisterForm />
    </AuthShell>
  );
}