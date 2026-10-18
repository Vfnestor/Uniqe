"use client";

import type {
  ChangeEvent,
} from "react";

import RegistrationPasswordHint from "./RegistrationPasswordHint";

export type RegistrationFields = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type RegistrationFormFieldsProps = {
  values: RegistrationFields;
  disabled: boolean;
  onChange: (
    field: keyof RegistrationFields,
    value: string,
  ) => void;
};

export default function RegistrationFormFields({
  values,
  disabled,
  onChange,
}: RegistrationFormFieldsProps) {
  function handleChange(
    field: keyof RegistrationFields,
  ) {
    return (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      onChange(field, event.target.value);
    };
  }

  return (
    <>
      <div className="auth-field">
        <label htmlFor="register-name">
          نام و نام خانوادگی
        </label>

        <input
          id="register-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="نام شما"
          minLength={2}
          maxLength={100}
          value={values.name}
          onChange={handleChange("name")}
          disabled={disabled}
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
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={254}
          value={values.email}
          onChange={handleChange("email")}
          disabled={disabled}
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
          autoComplete="new-password"
          placeholder="حداقل ۸ نویسه"
          minLength={8}
          maxLength={128}
          value={values.password}
          onChange={handleChange("password")}
          disabled={disabled}
          required
        />

        <RegistrationPasswordHint
          passwordLength={values.password.length}
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
          autoComplete="new-password"
          placeholder="رمز عبور را دوباره وارد کنید"
          minLength={8}
          maxLength={128}
          value={values.passwordConfirm}
          onChange={handleChange("passwordConfirm")}
          disabled={disabled}
          required
        />
      </div>
    </>
  );
}