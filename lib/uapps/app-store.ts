import type { UApp } from "@/lib/uapps/types";

type AppleAppResult = {
  trackId?: number;
  trackName?: string;
  description?: string;
  primaryGenreName?: string;
  artistName?: string;
  sellerName?: string;
  artworkUrl100?: string;
  artworkUrl512?: string;
  trackViewUrl?: string;
  version?: string;
  averageUserRating?: number;
  formattedPrice?: string;
};

export async function searchAppStore(
  query: string,
): Promise<UApp[]> {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const params = new URLSearchParams({
    term: normalizedQuery,
    country: "us",
    entity: "software",
    limit: "20",
    lang: "en_us",
  });

  const response = await fetch(
    `https://itunes.apple.com/search?${params.toString()}`,
    {
      headers: {
        Accept: "application/json",
        "User-Agent": "Uniqe-UApps/1.0",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `App Store request failed: ${response.status}`,
    );
  }

  const data = (await response.json()) as {
    results?: AppleAppResult[];
  };

  return (data.results || [])
    .filter(
      (item) =>
        item.trackId &&
        item.trackName &&
        item.trackViewUrl,
    )
    .map((item) => ({
      id: `app-store-${item.trackId}`,
      name: item.trackName || "Unknown App",
      description:
        item.description ||
        "اپلیکیشن موجود در App Store",
      category:
        item.primaryGenreName ||
        "اپلیکیشن",
      source: "app-store",
      sourceLabel: "App Store",
      platform: "ios",
      platformLabel: "iOS",
      type: "installable",
      typeLabel: "iOS App",
      status: "available",
      statusLabel: "فعال",
      icon: "AS",
      cover:
        item.artworkUrl512 ||
        item.artworkUrl100 ||
        undefined,
      accent: "black",
      href: item.trackViewUrl || "#",
      verified: false,
      version: item.version,
      releaseLabel:
        item.formattedPrice ||
        "App Store",
    }));
}