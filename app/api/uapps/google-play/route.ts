import {
  mapGooglePlayApp,
  searchGooglePlay,
} from "@/lib/uapps/google-play";

export async function GET(
  request: Request,
) {
  try {
    const url =
      new URL(request.url);

    const query =
      url.searchParams.get(
        "q",
      )?.trim() || "";

    if (!query) {
      return Response.json(
        {
          success: false,
          results: [],
          message:
            "عبارت جستجو را وارد کنید.",
        },
        {
          status: 400,
        },
      );
    }

    const apps =
      await searchGooglePlay(
        query,
      );

    const results =
      apps.map(
        mapGooglePlayApp,
      );

    return Response.json({
      success: true,
      source: "google-play",
      query,
      results,
    });
  } catch {
    return Response.json(
      {
        success: false,
        results: [],
        message:
          "دریافت اطلاعات از Google Play انجام نشد.",
      },
      {
        status: 502,
      },
    );
  }
}