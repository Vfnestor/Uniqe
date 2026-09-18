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

function getSecret() {
  const secret =
    process.env.UNIQE_AUTH_SECRET;

  if (!secret) {
    throw new Error(
      "UNIQE_AUTH_SECRET is not configured.",
    );
  }

  return secret;
}

function createSignature(
  payload: string,
) {
  return createHmac(
    "sha256",
    getSecret(),
  )
    .update(payload)
    .digest("base64url");
}

export function createAdminSession(
  role: AdminRole = "owner",
) {
  const payload: AdminSession = {
    role,
    createdAt: Date.now(),
    expiresAt:
      Date.now() +
      SESSION_DURATION,
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
      session.role !== "owner" &&
      session.role !== "staff" &&
      session.role !== "customer"
    ) {
      return null;
    }

    if (
      typeof session.expiresAt !==
      "number"
    ) {
      return null;
    }

    if (
      Date.now() >
      session.expiresAt
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
) {
  return Boolean(
    readAdminSession(token),
  );
}