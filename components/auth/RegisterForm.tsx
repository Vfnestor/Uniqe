"use client";

import { FormEvent, useState } from "react";

import Button from "@/components/ui/Button";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    /*
     * Registration backend will be connected
     * in the future.
     */

    console.log("Uniqe registration", {
      name,
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
          Create your space
        </span>

        <h2>
          Join
          <br />
          <span>Uniqe.</span>
        </h2>

        <p>
          Create the foundation of your personal
          experience across the Uniqe ecosystem.
        </p>
      </div>

      <div className="auth-field">
        <label htmlFor="register-name">
          Name
        </label>

        <input
          id="register-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
        />
      </div>

      <div className="auth-field">
        <label htmlFor="register-email">
          Email
        </label>

        <input
          id="register-email"
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
        <label htmlFor="register-password">
          Password
        </label>

        <input
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
        />
      </div>

      <Button type="submit">
        Create account
      </Button>

      <p className="auth-form-note">
        Account creation will become functional
        when the authentication backend is connected.
      </p>
    </form>
  );
}