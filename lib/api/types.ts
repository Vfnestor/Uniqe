export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiErrorBody = {
  message: string;
  code?: string;
  details?: unknown;
};

export type ApiRequestOptions = RequestInit & {
  timeout?: number;
};