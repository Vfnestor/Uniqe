import type {
  UApp,
} from "@/lib/uapps/types";

type GooglePlayResult = {
  id: string;
  name: string;
  description: string;
  category: string;
  developer: string;
  icon: string;
  href: string;
};

const GOOGLE_PLAY_SEARCH_URL =
  "https://play.google.com/store/search";

function extractJsonValue(
  source: string,
  key: string,
): string {
  const pattern = new RegExp(
    `"${key}"\\s*:\\s*"([^"]*)"`,
  );

  const match = source.match(pattern);

  if (!match) {
    return "";
  }

  return match[1]
    .replace(/\\u003d/g, "=")
    .replace(/\\u0026/g, "&")
    .replace(/\\"/g, '"');
}

export async function searchGooglePlay(
  query: string,
): Promise<GooglePlayResult[]> {
  const normalizedQuery =
    query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const url =
    `${GOOGLE_PLAY_SEARCH_URL}?q=` +
    encodeURIComponent(normalizedQuery) +
    "&c=apps&hl=en";

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Google Play request failed: ${response.status}`,
    );
  }

  const html =
    await response.text();

  const results: GooglePlayResult[] = [];
  const seen = new Set<string>();

  const packagePattern =
    /\/store\/apps\/details\?id=([a-zA-Z0-9._-]+)/g;

  let match:
    | RegExpExecArray
    | null;

  while (
    (match =
      packagePattern.exec(html)) !== null
  ) {
    const packageId = match[1];

    if (seen.has(packageId)) {
      continue;
    }

    seen.add(packageId);

    const start =
      Math.max(
        0,
        match.index - 3000,
      );

    const end =
      Math.min(
        html.length,
        match.index + 5000,
      );

    const section =
      html.slice(start, end);

    const name =
      extractJsonValue(
        section,
        "name",
      );

    const icon =
      extractJsonValue(
        section,
        "image",
      );

    if (!name) {
      continue;
    }

    results.push({
      id: packageId,
      name,
      description:
        "اپلیکیشن موجود در Google Play",
      category:
        "اپلیکیشن",
      developer:
        "Google Play",
      icon:
        icon ||
        "https://www.gstatic.com/android/market_images/web/favicon_v2.ico",
      href:
        `https://play.google.com/store/apps/details?id=${packageId}`,
    });

    if (results.length >= 10) {
      break;
    }
  }

  return results;
}

export function mapGooglePlayApp(
  app: GooglePlayResult,
): UApp {
  return {
    id: `google-play-${app.id}`,
    name: app.name,
    description: app.description,
    category: app.category,
    source: "google-play",
    sourceLabel: "Google Play",
    platform: "android",
    platformLabel: "Android",
    type: "installable",
    typeLabel: "Android App",
    status: "available",
    statusLabel: "فعال",
    icon: "GP",
    cover: app.icon,
    accent: "green",
    href: app.href,
    verified: false,
  };
}