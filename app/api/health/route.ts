import { env } from "@/lib/config/env";
import { siteConfig } from "@/lib/config/site";
import { logger } from "@/lib/monitoring/logger";

export async function GET() {
  const response = {
    status: "ok",
    service: siteConfig.name,
    version: siteConfig.version,
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  };

  logger.info("Health check requested");

  return Response.json(response, {
    status: 200,
    headers: {
      "Cache-Control":
        "no-store, no-cache, must-revalidate",
    },
  });
}