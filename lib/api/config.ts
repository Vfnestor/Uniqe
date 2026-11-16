function normalizeApiBaseUrl(
  configuredUrl: string | undefined,
): string {
  const value = configuredUrl?.trim();

  if (!value) {
    return "/api/v1";
  }

  const withoutTrailingSlashes =
    value.replace(/\/+$/, "");

  if (
    withoutTrailingSlashes.startsWith("/")
  ) {
    const normalizedPath =
      withoutTrailingSlashes.replace(
        /\/api\/v1$/i,
        "",
      );

    return `${normalizedPath}/api/v1`
      .replace(/\/+/g, "/");
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(
      withoutTrailingSlashes,
    );
  } catch {
    throw new Error(
      "NEXT_PUBLIC_API_URL must be a valid absolute URL or a path starting with /.",
    );
  }

  if (
    parsedUrl.protocol !== "https:" &&
    parsedUrl.protocol !== "http:"
  ) {
    throw new Error(
      "NEXT_PUBLIC_API_URL must use HTTP or HTTPS.",
    );
  }

  parsedUrl.search = "";
  parsedUrl.hash = "";

  const pathname =
    parsedUrl.pathname
      .replace(/\/api\/v1$/i, "")
      .replace(/\/+$/, "");

  parsedUrl.pathname =
    `${pathname}/api/v1`
      .replace(/\/+/g, "/");

  return parsedUrl.toString().replace(/\/+$/, "");
}

export const apiConfig = {
  baseUrl: normalizeApiBaseUrl(
    process.env.NEXT_PUBLIC_API_URL,
  ),

  timeout: 10000,

  version: "v1",
} as const;