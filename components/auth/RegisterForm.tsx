"use client";

import {
  useState,
  type FormEvent,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  useAuth,
} from "./AuthProvider";

import RegistrationFeedback from "./RegistrationFeedback";

import RegistrationFormFields, {
  type RegistrationFields,
} from "./RegistrationFormFields";

import {
  validateRegistration,
} from "@/lib/auth/registration-validation";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    state,
  } = useAuth();

  const [values, setValues] =
    useState<RegistrationFields>({
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  function updateField(
    field: keyof RegistrationFields,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    const validationError =
      validateRegistration(values);

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const result = await register(
        values.name.trim(),
        values.email.trim().toLowerCase(),
        values.password,
      );

      if (!result.success) {
        setError(
          result.message ||
            "ثبت‌نام انجام نشد. اطلاعات را بررسی کنید.",
        );
        return;
      }

      setValues({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });

      router.replace(
        result.redirectTo || "/my-u",
      );

      router.refresh();
    } catch {
      setError(
        "ارتباط با سرور ناموفق بود. لطفاً دوباره تلاش کنید.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (state.status === "authenticated") {
    return (
      <div className="auth-form">
        <div className="auth-form-header">
          <span className="auth-form-eyebrow">
            UNIQE / ACCOUNT
          </span>

          <h2>
            You are
            <br />
            <span>signed in.</span>
          </h2>

          <p>
            شما هم‌اکنون وارد حساب کاربری خود
            شده‌اید.
          </p>
        </div>

        <button
          type="button"
          className="button"
          onClick={() =>
            router.replace(
              state.user?.role === "owner"
                ? "/admin"
                : "/my-u",
            )
          }
        >
          ورود به فضای کاربری
        </button>
      </div>
    );
  }

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="auth-form-header">
        <span className="auth-form-eyebrow">
          UNIQE / REGISTRATION
        </span>

        <h2>
          Join
          <br />
          <span>Uniqe.</span>
        </h2>

        <p>
          اطلاعات خود را وارد کنید تا حساب
          کاربری شما در اکوسیستم Uniqe ایجاد شود.
        </p>
      </div>

      <RegistrationFormFields
        values={values}
        disabled={loading}
        onChange={updateField}
      />

      <RegistrationFeedback
        message={error}
        type="error"
      />

      <button
        type="submit"
        className="button"
        disabled={loading}
      >
        {loading
          ? "در حال ایجاد حساب..."
          : "ایجاد حساب کاربری"}
      </button>

      <p className="auth-form-note">
        حساب شما پس از تأیید موفق سرور ایجاد می‌شود.
      </p>

      <div className="auth-form-links">
        <span>
          قبلاً حساب دارید؟
        </span>

        <Link href="/auth/login">
          ورود
        </Link>
      </div>
    </form>
  );
}