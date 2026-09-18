import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE =
  "uniqe-admin-session";

const SESSION_DURATION =
  1000 * 60 * 60 * 24;

export const ADMIN_SESSION_COOKIE =
  SESSION_COOKIE;

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

export function createAdminSession() {
  const payload = JSON.stringify({
    role: "owner",
    createdAt: Date.now(),
    expiresAt:
      Date.now() +
      SESSION_DURATION,
  });

  const encoded =
    Buffer.from(payload).toString(
      "base64url",
    );

  const signature =
    createSignature(encoded);

  return `${encoded}.${signature}`;
}

export function verifyAdminSession(
  token: string | undefined,
) {
  if (!token) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return false;
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
      return false;
    }

    if (
      !timingSafeEqual(
        actualBuffer,
        expectedBuffer,
      )
    ) {
      return false;
    }

    const payload = JSON.parse(
      Buffer.from(
        encoded,
        "base64url",
      ).toString("utf8"),
    );

    if (
      payload?.role !== "owner"
    ) {
      return false;
    }

    if (
      typeof payload?.expiresAt !==
      "number"
    ) {
      return false;
    }

    if (
      Date.now() >
      payload.expiresAt
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}