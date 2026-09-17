import crypto from "node:crypto";

export const dynamic =
  "force-dynamic";

function getIpnSecret() {
  return (
    process.env.NOWPAYMENTS_IPN_SECRET ||
    ""
  );
}

function verifySignature(
  rawBody: string,
  signature: string,
) {
  const secret =
    getIpnSecret();

  if (!secret) {
    return false;
  }

  const hmac =
    crypto
      .createHmac(
        "sha512",
        secret,
      )
      .update(rawBody)
      .digest("hex");

  const received =
    signature.trim();

  if (
    hmac.length !==
    received.length
  ) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(hmac),
    Buffer.from(received),
  );
}

export async function POST(
  request: Request,
) {
  try {
    const rawBody =
      await request.text();

    const signature =
      request.headers.get(
        "x-nowpayments-sig",
      );

    if (!signature) {
      return Response.json(
        {
          success: false,
          error:
            "Missing IPN signature.",
        },
        {
          status: 401,
        },
      );
    }

    const valid =
      verifySignature(
        rawBody,
        signature,
      );

    if (!valid) {
      return Response.json(
        {
          success: false,
          error:
            "Invalid IPN signature.",
        },
        {
          status: 401,
        },
      );
    }

    const data =
      JSON.parse(
        rawBody,
      ) as Record<
        string,
        unknown
      >;

    const paymentId =
      data.payment_id;

    const orderId =
      data.order_id;

    const paymentStatus =
      data.payment_status;

    console.log(
      "NOWPayments IPN received:",
      {
        paymentId,
        orderId,
        paymentStatus,
      },
    );

    /*
     * مرحله بعد:
     *
     * 1. پیدا کردن Order
     * 2. اعتبارسنجی مبلغ
     * 3. اعتبارسنجی currency
     * 4. جلوگیری از پردازش دوباره
     * 5. تغییر paymentStatus
     * 6. تغییر orderStatus
     * 7. ذخیره در Database
     */

    return Response.json(
      {
        success: true,
        received: true,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "NOWPayments IPN error:",
      error,
    );

    return Response.json(
      {
        success: false,
        error:
          "Invalid IPN payload.",
      },
      {
        status: 400,
      },
    );
  }
}