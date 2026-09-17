import { apiConfig } from "./config";

import type {
  ApiErrorBody,
  ApiRequestOptions,
} from "./types";

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(
    message: string,
    status = 0,
    code?: string,
    details?: unknown
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function buildUrl(path: string): string {
  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  const baseUrl =
    apiConfig.baseUrl.replace(/\/$/, "");

  const normalizedPath =
    path.startsWith("/")
      ? path
      : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}

function serializeBody(
  body: unknown
): BodyInit | undefined {
  if (
    body === undefined ||
    body === null
  ) {
    return undefined;
  }

  if (
    typeof body === "string" ||
    body instanceof FormData ||
    body instanceof Blob ||
    body instanceof URLSearchParams
  ) {
    return body;
  }

  if (body instanceof ArrayBuffer) {
    return new Uint8Array(body);
  }

  return JSON.stringify(body);
}

async function request<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const {
    timeout = apiConfig.timeout,
    body,
    ...requestInit
  } = options;

  const controller =
    new AbortController();

  const timeoutId = setTimeout(
    () => controller.abort(),
    timeout
  );

  const headers = new Headers(
    requestInit.headers
  );

  headers.set(
    "Accept",
    "application/json"
  );

  const serializedBody =
    serializeBody(body);

  if (
    serializedBody !== undefined &&
    !(body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  const fetchOptions: RequestInit = {
    ...requestInit,
    headers,
    body: serializedBody,
    signal: controller.signal,
  };

  let response: Response;

  try {
    response = await fetch(
      buildUrl(path),
      fetchOptions
    );
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw new ApiError(
        "API request timed out."
      );
    }

    throw new ApiError(
      "Unable to connect to the API."
    );
  } finally {
    clearTimeout(timeoutId);
  }

  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  let responseData: unknown = null;

  if (response.status !== 204) {
    if (
      contentType.includes(
        "application/json"
      )
    ) {
      try {
        responseData =
          await response.json();
      } catch {
        responseData = null;
      }
    } else {
      try {
        responseData =
          await response.text();
      } catch {
        responseData = null;
      }
    }
  }

  if (!response.ok) {
    const errorBody =
      responseData as
        | ApiErrorBody
        | null;

    throw new ApiError(
      errorBody?.message ||
        "API request failed.",
      response.status,
      errorBody?.code,
      errorBody?.details
    );
  }

  return responseData as T;
}

function withBody(
  body?: unknown,
  options: ApiRequestOptions = {}
): ApiRequestOptions {
  return {
    ...options,
    body,
  };
}

export const apiClient = {
  request,

  get<T>(
    path: string,
    options: ApiRequestOptions = {}
  ) {
    return request<T>(
      path,
      {
        ...options,
        method: "GET",
      }
    );
  },

  post<T>(
    path: string,
    body?: unknown,
    options: ApiRequestOptions = {}
  ) {
    return request<T>(
      path,
      withBody(body, {
        ...options,
        method: "POST",
      })
    );
  },

  put<T>(
    path: string,
    body?: unknown,
    options: ApiRequestOptions = {}
  ) {
    return request<T>(
      path,
      withBody(body, {
        ...options,
        method: "PUT",
      })
    );
  },

  patch<T>(
    path: string,
    body?: unknown,
    options: ApiRequestOptions = {}
  ) {
    return request<T>(
      path,
      withBody(body, {
        ...options,
        method: "PATCH",
      })
    );
  },

  delete<T>(
    path: string,
    options: ApiRequestOptions = {}
  ) {
    return request<T>(
      path,
      {
        ...options,
        method: "DELETE",
      }
    );
  },
};