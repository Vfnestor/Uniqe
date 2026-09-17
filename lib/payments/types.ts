export type CryptoCurrency =
  | "usdt"
  | "btc"
  | "eth"
  | "ltc"
  | "bnb";

export type PaymentProvider =
  | "nowpayments";

export type PaymentStatus =
  | "waiting"
  | "confirming"
  | "confirmed"
  | "failed"
  | "expired";

export type CreateCryptoPaymentInput = {
  orderId: string;
  priceAmount: number;
  priceCurrency: string;
  payCurrency: CryptoCurrency;
  orderDescription?: string;
  customerEmail?: string;
};

export type CryptoPaymentResult = {
  success: boolean;
  provider: PaymentProvider;
  paymentId?: string;
  invoiceId?: string;
  paymentUrl?: string;
  payAddress?: string;
  payAmount?: number;
  payCurrency?: string;
  status?: PaymentStatus;
  expiresAt?: string;
  error?: string;
};