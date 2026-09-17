import type { UShopProduct } from "@/components/ushop/products";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "unpaid"
  | "pending"
  | "paid"
  | "failed";

export type OrderCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type OrderShipping = {
  country: string;
  city: string;
  address: string;
  postalCode: string;
};

export type OrderItem = {
  productId: string;
  slug: string;
  name: string;
  nameFa: string;
  quantity: number;
  unitPrice: number;
  currency: string;
  fulfillment: UShopProduct["fulfillment"];
};

export type UShopOrder = {
  id: string;
  createdAt: string;

  customer: OrderCustomer;
  shipping: OrderShipping;

  items: OrderItem[];

  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;

  currency: string;

  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;

  discountCode?: string;
};

export const ORDER_KEY = "uniqe-order";

export const ORDER_STATUS_LABELS: Record<
  OrderStatus,
  {
    en: string;
    fa: string;
  }
> = {
  pending: {
    en: "Pending",
    fa: "در انتظار",
  },
  confirmed: {
    en: "Confirmed",
    fa: "تأیید شده",
  },
  processing: {
    en: "Processing",
    fa: "در حال پردازش",
  },
  completed: {
    en: "Completed",
    fa: "تکمیل شده",
  },
  cancelled: {
    en: "Cancelled",
    fa: "لغو شده",
  },
};

export const PAYMENT_STATUS_LABELS: Record<
  PaymentStatus,
  {
    en: string;
    fa: string;
  }
> = {
  unpaid: {
    en: "Unpaid",
    fa: "پرداخت نشده",
  },
  pending: {
    en: "Payment Pending",
    fa: "در انتظار پرداخت",
  },
  paid: {
    en: "Paid",
    fa: "پرداخت شده",
  },
  failed: {
    en: "Payment Failed",
    fa: "پرداخت ناموفق",
  },
};

export function createOrderId() {
  const timestamp = Date.now()
    .toString(36)
    .toUpperCase();

  const random = Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase();

  return `UQ-${timestamp}-${random}`;
}

export function saveOrder(order: UShopOrder) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    ORDER_KEY,
    JSON.stringify(order),
  );

  window.dispatchEvent(
    new Event("uniqe-order-updated"),
  );
}

export function readOrder(): UShopOrder | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw =
      window.localStorage.getItem(
        ORDER_KEY,
      );

    if (!raw) {
      return null;
    }

    const parsed: unknown =
      JSON.parse(raw);

    if (
      !parsed ||
      typeof parsed !== "object"
    ) {
      return null;
    }

    return parsed as UShopOrder;
  } catch {
    return null;
  }
}