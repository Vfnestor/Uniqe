export const apiConfig = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL || "/api/v1",

  timeout: 10000,

  version: "v1",
} as const;