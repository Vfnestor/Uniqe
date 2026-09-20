import { searchAppStore } from "@/lib/uapps/app-store";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query =
      url.searchParams.get("q")?.trim() || "";

    if (!query) {
      return Response.json(
        {
          success: false,
          results: [],
          message: "عبارت جستجو را وارد کنید.",
        },
        {
          status: 400,
        },
      );
    }

    const results = await searchAppStore(query);

    return Response.json({
      success: true,
      source: "app-store",
      query,
      results,
    });
  } catch {
    return Response.json(
      {
        success: false,
        results: [],
        message:
          "دریافت نتایج App Store انجام نشد.",
      },
      {
        status: 502,
      },
    );
  }
}