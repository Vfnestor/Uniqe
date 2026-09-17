import {
  createNowPaymentsPayment,
} from "@/lib/payments/nowpayments";

import type {
  CryptoCurrency,
} from "@/lib/payments/types";

export const dynamic =
  "force-dynamic";

export async function POST(
  request: Request,
) {
  try {
    const body =
      await request.json();

    const orderId =
      typeof body.orderId ===
      "string"
        ? body.orderId.trim()
        : "";

    const priceAmount =
      typeof body.priceAmount ===
      "number"
        ? body.priceAmount
        : Number(
            body.priceAmount,
          );

    const priceCurrency =
      typeof body.priceCurrency ===
      "string"
        ? body.priceCurrency
            .trim()
            .toLowerCase()
        : "usd";

    const payCurrency =
      typeof body.payCurrency ===
      "string"
        ? body.payCurrency
            .trim()
            .toLowerCase()
        : "";

    const customerEmail =
      typeof body.customerEmail ===
      "string"
        ? body.customerEmail.trim()
        : undefined;

    if (!orderId) {
      return Response.json(
        {
          success: false,
          error:
            "Order ID is required.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !Number.isFinite(
        priceAmount,
      ) ||
      priceAmount <= 0
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Invalid payment amount.",
        },
        {
          status: 400,
        },
      );
    }

    const allowedCurrencies: CryptoCurrency[] =
      [
        "usdt",
        "btc",
        "eth",
        "ltc",
        "bnb",
      ];

    if (
      !allowedCurrencies.includes(
        payCurrency as CryptoCurrency,
      )
    ) {
      return Response.json(
        {
          success: false,
          error:
            "Unsupported cryptocurrency.",
        },
        {
          status: 400,
        },
      );
    }

    const result =
      await createNowPaymentsPayment(
        {
          orderId,
          priceAmount,
          priceCurrency,
          payCurrency:
            payCurrency as CryptoCurrency,
          customerEmail,
          orderDescription:
            `Uniqe UShop Order ${orderId}`,
        },
      );

    if (!result.success) {
      return Response.json(
        result,
        {
          status: 502,
        },
      );
    }

    return Response.json(
      result,
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "Crypto payment API error:",
      error,
    );

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Internal payment error.",
      },
      {
        status: 500,
      },
    );
  }
}