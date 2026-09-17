import type {
  CreateCryptoPaymentInput,
  CryptoPaymentResult,
} from "@/lib/payments/types";

const NOWPAYMENTS_API_URL =
  "https://api.nowpayments.io/v1";

function getApiKey() {
  const key =
    process.env.NOWPAYMENTS_API_KEY;

  if (!key) {
    throw new Error(
      "NOWPAYMENTS_API_KEY is not configured.",
    );
  }

  return key;
}

function getIpnSecret() {
  return process.env.NOWPAYMENTS_IPN_SECRET || "";
}

export async function createNowPaymentsPayment(
  input: CreateCryptoPaymentInput,
): Promise<CryptoPaymentResult> {
  try {
    const apiKey = getApiKey();

    const response = await fetch(
      `${NOWPAYMENTS_API_URL}/payment`,
      {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          price_amount:
            input.priceAmount,

          price_currency:
            input.priceCurrency.toLowerCase(),

          pay_currency:
            input.payCurrency.toLowerCase(),

          order_id:
            input.orderId,

          order_description:
            input.orderDescription ||
            `Uniqe UShop Order ${input.orderId}`,

          ipn_callback_url:
            getIpnCallbackUrl(),

          success_url:
            getSuccessUrl(input.orderId),

          cancel_url:
            getCancelUrl(input.orderId),

          is_fixed_rate: false,

          is_fee_paid_by_user: false,
        }),
        cache: "no-store",
      },
    );

    const data =
      (await response.json()) as Record<
        string,
        unknown
      >;

    if (!response.ok) {
      return {
        success: false,
        provider: "nowpayments",
        error:
          typeof data.message ===
          "string"
            ? data.message
            : "NOWPayments payment creation failed.",
      };
    }

    return {
      success: true,

      provider: "nowpayments",

      paymentId:
        typeof data.payment_id ===
        "string" ||
        typeof data.payment_id ===
        "number"
          ? String(
              data.payment_id,
            )
          : undefined,

      invoiceId:
        typeof data.invoice_id ===
        "string" ||
        typeof data.invoice_id ===
        "number"
          ? String(
              data.invoice_id,
            )
          : undefined,

      paymentUrl:
        typeof data.invoice_url ===
        "string"
          ? data.invoice_url
          : undefined,

      payAddress:
        typeof data.pay_address ===
        "string"
          ? data.pay_address
          : undefined,

      payAmount:
        typeof data.pay_amount ===
        "number"
          ? data.pay_amount
          : undefined,

      payCurrency:
        typeof data.pay_currency ===
        "string"
          ? data.pay_currency
          : undefined,

      status:
        typeof data.payment_status ===
        "string"
          ? normalizePaymentStatus(
              data.payment_status,
            )
          : "waiting",

      expiresAt:
        typeof data.expiration_estimate_date ===
        "string"
          ? data.expiration_estimate_date
          : undefined,
    };
  } catch (error) {
    return {
      success: false,
      provider: "nowpayments",
      error:
        error instanceof Error
          ? error.message
          : "Unknown payment error.",
    };
  }
}

function normalizePaymentStatus(
  status: string,
) {
  switch (status) {
    case "waiting":
    case "waiting_payment":
      return "waiting" as const;

    case "confirming":
    case "sending":
      return "confirming" as const;

    case "finished":
    case "confirmed":
      return "confirmed" as const;

    case "failed":
    case "refunded":
      return "failed" as const;

    case "expired":
      return "expired" as const;

    default:
      return "waiting" as const;
  }
}

function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not configured.",
    );
  }

  return siteUrl.replace(
    /\/$/,
    "",
  );
}

function getIpnCallbackUrl() {
  return `${getSiteUrl()}/api/payments/nowpayments/ipn`;
}

function getSuccessUrl(
  orderId: string,
) {
  return `${getSiteUrl()}/ushop/payment/success?order=${encodeURIComponent(
    orderId,
  )}`;
}

function getCancelUrl(
  orderId: string,
) {
  return `${getSiteUrl()}/ushop/payment?order=${encodeURIComponent(
    orderId,
  )}&cancelled=1`;
}