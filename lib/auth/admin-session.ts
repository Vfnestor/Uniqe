import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

import type {
  AdminRole,
} from "@/lib/auth/permissions";

const SESSION_DURATION =
  1000 * 60 * 60 * 24;

export type AdminSession = {
  role: AdminRole;
  createdAt: number;
  expiresAt: number;
};

function getSecret(): string {
  const secret =
    process.env.UNIQE_AUTH_SECRET;

  if (
    !secret ||
    secret.length < 32
  ) {
    throw new Error(
      "UNIQE_AUTH_SECRET must contain at least 32 characters.",
    );
  }

  return secret;
}

function createSignature(
  payload: string,
): string {
  return createHmac(
    "sha256",
    getSecret(),
  )
    .update(payload)
    .digest("base64url");
}

export function createAdminSession(
  role: AdminRole = "owner",
): string {
  if (role !== "owner") {
    throw new Error(
      "Only the owner role can create an administrator session.",
    );
  }

  const now = Date.now();

  const payload: AdminSession = {
    role,
    createdAt: now,
    expiresAt:
      now + SESSION_DURATION,
  };

  const encoded =
    Buffer.from(
      JSON.stringify(payload),
    ).toString("base64url");

  const signature =
    createSignature(encoded);

  return `${encoded}.${signature}`;
}

export function readAdminSession(
  token: string | undefined,
): AdminSession | null {
  if (!token) {
    return null;
  }

  const parts =
    token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [
    encoded,
    signature,
  ] = parts;

  try {
    const expected =
      createSignature(encoded);

    const actualBuffer =
      Buffer.from(
        signature,
        "utf8",
      );

    const expectedBuffer =
      Buffer.from(
        expected,
        "utf8",
      );

    if (
      actualBuffer.length !==
      expectedBuffer.length
    ) {
      return null;
    }

    if (
      !timingSafeEqual(
        actualBuffer,
        expectedBuffer,
      )
    ) {
      return null;
    }

    const session =
      JSON.parse(
        Buffer.from(
          encoded,
          "base64url",
        ).toString("utf8"),
      ) as AdminSession;

    if (
      session.role !== "owner" ||
      typeof session.createdAt !== "number" ||
      typeof session.expiresAt !== "number"
    ) {
      return null;
    }

    const now = Date.now();

    if (
      session.expiresAt <= now ||
      session.createdAt > now ||
      session.expiresAt -
        session.createdAt !==
        SESSION_DURATION
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function verifyAdminSession(
  token: string | undefined,
): boolean {
  return (
    readAdminSession(token) !== null
  );
}