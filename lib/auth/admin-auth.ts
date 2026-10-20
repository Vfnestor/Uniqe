import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

export const ADMIN_SESSION_COOKIE =
  "uniqe-admin-session";

const SESSION_DURATION =
  1000 * 60 * 60 * 24;

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

export function createAdminSession(): string {
  const now = Date.now();

  const payload = JSON.stringify({
    role: "owner",
    createdAt: now,
    expiresAt:
      now + SESSION_DURATION,
  });

  const encoded =
    Buffer.from(payload)
      .toString("base64url");

  const signature =
    createSignature(encoded);

  return `${encoded}.${signature}`;
}

export function verifyAdminSession(
  token: string | undefined,
): boolean {
  if (!token) {
    return false;
  }

  const parts =
    token.split(".");

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

    const payload =
      JSON.parse(
        Buffer.from(
          encoded,
          "base64url",
        ).toString("utf8"),
      );

    if (
      payload?.role !== "owner" ||
      typeof payload?.createdAt !== "number" ||
      typeof payload?.expiresAt !== "number"
    ) {
      return false;
    }

    const now = Date.now();

    if (
      payload.expiresAt <= now ||
      payload.createdAt > now ||
      payload.expiresAt -
        payload.createdAt !==
        SESSION_DURATION
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}