import { env } from "@/lib/config/env";

type LogLevel =
  | "info"
  | "warn"
  | "error"
  | "debug";

type LogContext =
  Record<string, unknown>;

function writeLog(
  level: LogLevel,
  message: string,
  context?: LogContext
) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    environment: env.nodeEnv,
    message,
    ...(context
      ? { context }
      : {}),
  };

  if (level === "error") {
    console.error(payload);
    return;
  }

  if (level === "warn") {
    console.warn(payload);
    return;
  }

  if (level === "debug") {
    console.debug(payload);
    return;
  }

  console.info(payload);
}

export const logger = {
  info(
    message: string,
    context?: LogContext
  ) {
    writeLog(
      "info",
      message,
      context
    );
  },

  warn(
    message: string,
    context?: LogContext
  ) {
    writeLog(
      "warn",
      message,
      context
    );
  },

  error(
    message: string,
    context?: LogContext
  ) {
    writeLog(
      "error",
      message,
      context
    );
  },

  debug(
    message: string,
    context?: LogContext
  ) {
    if (env.nodeEnv !== "production") {
      writeLog(
        "debug",
        message,
        context
      );
    }
  },
};