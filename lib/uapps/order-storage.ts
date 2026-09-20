export type UAppsOrderStatus =
  | "pending-review"
  | "reviewing"
  | "quoted"
  | "approved"
  | "in-progress"
  | "completed"
  | "cancelled";

export type UAppsOrderPlatform =
  | "web"
  | "android"
  | "ios"
  | "android-ios"
  | "multi";

export type UAppsOrderType =
  | "new-app"
  | "existing-app"
  | "conversion"
  | "custom";

export type UAppsOrder = {
  id: string;
  orderNumber: string;
  title: string;
  description: string;
  type: UAppsOrderType;
  typeLabel: string;
  platform: UAppsOrderPlatform;
  platformLabel: string;
  features: string[];
  budget: string;
  timeline: string;
  status: UAppsOrderStatus;
  statusLabel: string;
  createdAt: string;
  updatedAt: string;
  reviewNote?: string;
  ownerNote?: string;
};

export type CreateUAppsOrderInput = {
  title: string;
  description: string;
  type: UAppsOrderType;
  typeLabel: string;
  platform: UAppsOrderPlatform;
  platformLabel: string;
  features: string[];
  budget: string;
  timeline: string;
};

export const UAPPS_ORDERS_STORAGE_KEY =
  "uniqe-uapps-orders";

export const UAPPS_ORDERS_UPDATED_EVENT =
  "uniqe-uapps-orders-updated";

function isBrowser() {
  return typeof window !== "undefined";
}

function createOrderId() {
  return `uapps-order-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

function createOrderNumber() {
  const timestamp =
    Date.now()
      .toString()
      .slice(-8);

  const random =
    Math.floor(
      100 +
        Math.random() * 900,
    );

  return `UA-${timestamp}-${random}`;
}

function isUAppsOrder(
  value: unknown,
): value is UAppsOrder {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return false;
  }

  const order =
    value as Partial<UAppsOrder>;

  return (
    typeof order.id === "string" &&
    typeof order.orderNumber ===
      "string" &&
    typeof order.title ===
      "string" &&
    typeof order.description ===
      "string" &&
    typeof order.status ===
      "string"
  );
}

export function getStoredUAppsOrders(): UAppsOrder[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const raw =
      window.localStorage.getItem(
        UAPPS_ORDERS_STORAGE_KEY,
      );

    if (!raw) {
      return [];
    }

    const parsed =
      JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      isUAppsOrder,
    );
  } catch {
    return [];
  }
}

export function saveStoredUAppsOrders(
  orders: UAppsOrder[],
) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(
    UAPPS_ORDERS_STORAGE_KEY,
    JSON.stringify(orders),
  );

  window.dispatchEvent(
    new CustomEvent(
      UAPPS_ORDERS_UPDATED_EVENT,
    ),
  );
}

export function createUAppsOrder(
  input: CreateUAppsOrderInput,
): UAppsOrder {
  const now =
    new Date().toISOString();

  return {
    id: createOrderId(),
    orderNumber:
      createOrderNumber(),
    title:
      input.title.trim(),
    description:
      input.description.trim(),
    type: input.type,
    typeLabel:
      input.typeLabel,
    platform:
      input.platform,
    platformLabel:
      input.platformLabel,
    features:
      input.features
        .map((item) =>
          item.trim(),
        )
        .filter(Boolean),
    budget:
      input.budget.trim(),
    timeline:
      input.timeline.trim(),
    status:
      "pending-review",
    statusLabel:
      "در انتظار بررسی",
    createdAt: now,
    updatedAt: now,
  };
}

export function addUAppsOrder(
  order: UAppsOrder,
) {
  const orders =
    getStoredUAppsOrders();

  saveStoredUAppsOrders([
    order,
    ...orders,
  ]);

  return order;
}

export function updateUAppsOrder(
  id: string,
  updates: Partial<UAppsOrder>,
) {
  const orders =
    getStoredUAppsOrders();

  const updated =
    orders.map((order) => {
      if (order.id !== id) {
        return order;
      }

      return {
        ...order,
        ...updates,
        updatedAt:
          new Date().toISOString(),
      };
    });

  saveStoredUAppsOrders(
    updated,
  );

  return updated.find(
    (order) =>
      order.id === id,
  );
}

export function deleteUAppsOrder(
  id: string,
) {
  const orders =
    getStoredUAppsOrders();

  saveStoredUAppsOrders(
    orders.filter(
      (order) =>
        order.id !== id,
    ),
  );
}