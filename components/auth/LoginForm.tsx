"use client";

import { FormEvent, useState } from "react";

import Button from "@/components/ui/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    /*
     * Authentication backend will be connected
     * in the future.
     *
     * For now this form only represents the
     * authentication architecture.
     */

    console.log("Uniqe login", {
      email,
      password,
    });
  }

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
    >
      <div className="auth-form-header">
        <span className="auth-form-eyebrow">
          Welcome back
        </span>

        <h2>
          Sign in to
          <br />
          <span>My U.</span>
        </h2>

        <p>
          Access your personal Uniqe space and
          connected experiences.
        </p>
      </div>

      <div className="auth-field">
        <label htmlFor="login-email">
          Email
        </label>

        <input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />
      </div>

      <div className="auth-field">
        <div className="auth-field-row">
          <label htmlFor="login-password">
            Password
          </label>

          <span className="auth-field-hint">
            Future recovery
          </span>
        </div>

        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />
      </div>

      <Button type="submit">
        Sign in
      </Button>

      <p className="auth-form-note">
        Authentication is currently being prepared
        for the next Uniqe architecture layer.
      </p>
    </form>
  );
}