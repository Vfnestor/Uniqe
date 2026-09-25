export type ApiResponse<T> = {
  success: boolean;
  data: T;
  timestamp: string;
};

export type ApiErrorBody = {
  success?: boolean;
  statusCode?: number;
  message: string;
  code?: string;
  details?: unknown;
  path?: string;
  timestamp?: string;
};

export type ApiRequestOptions = Omit<
  RequestInit,
  "body"
> & {
  body?: unknown;
  timeout?: number;
};