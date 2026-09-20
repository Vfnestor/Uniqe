"use client";

import Link from "next/link";

import {
  useState,
} from "react";

import {
  addUAppsOrder,
  createUAppsOrder,
  type UAppsOrderPlatform,
  type UAppsOrderType,
} from "@/lib/uapps/order-storage";

const typeOptions: {
  value: UAppsOrderType;
  label: string;
}[] = [
  {
    value: "new-app",
    label: "ساخت اپلیکیشن جدید",
  },
  {
    value: "existing-app",
    label: "توسعه اپلیکیشن موجود",
  },
  {
    value: "conversion",
    label: "تبدیل وب‌سایت به اپ",
  },
  {
    value: "custom",
    label: "پروژه اختصاصی",
  },
];

const platformOptions: {
  value: UAppsOrderPlatform;
  label: string;
}[] = [
  {
    value: "web",
    label: "Web",
  },
  {
    value: "android",
    label: "Android",
  },
  {
    value: "ios",
    label: "iOS",
  },
  {
    value: "android-ios",
    label: "Android + iOS",
  },
  {
    value: "multi",
    label: "چند پلتفرمی",
  },
];

const budgetOptions = [
  "فعلاً مشخص نیست",
  "کمتر از ۵۰ میلیون تومان",
  "۵۰ تا ۱۰۰ میلیون تومان",
  "۱۰۰ تا ۲۵۰ میلیون تومان",
  "بیشتر از ۲۵۰ میلیون تومان",
];

const timelineOptions = [
  "فوری",
  "کمتر از ۱ ماه",
  "۱ تا ۳ ماه",
  "۳ تا ۶ ماه",
  "فعلاً مشخص نیست",
];

export default function UAppsOrderForm() {
  const [
    title,
    setTitle,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    type,
    setType,
  ] = useState<UAppsOrderType>(
    "new-app",
  );

  const [
    platform,
    setPlatform,
  ] = useState<UAppsOrderPlatform>(
    "android",
  );

  const [
    features,
    setFeatures,
  ] = useState("");

  const [
    budget,
    setBudget,
  ] = useState(
    budgetOptions[0],
  );

  const [
    timeline,
    setTimeline,
  ] = useState(
    timelineOptions[0],
  );

  const [
    error,
    setError,
  ] = useState("");

  const [
    submittedOrderNumber,
    setSubmittedOrderNumber,
  ] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");

    if (!title.trim()) {
      setError(
        "نام پروژه را وارد کنید.",
      );
      return;
    }

    if (!description.trim()) {
      setError(
        "توضیحات پروژه را وارد کنید.",
      );
      return;
    }

    const selectedType =
      typeOptions.find(
        (item) =>
          item.value === type,
      );

    const selectedPlatform =
      platformOptions.find(
        (item) =>
          item.value === platform,
      );

    const featureList =
      features
        .split("\n")
        .map((item) =>
          item.trim(),
        )
        .filter(Boolean);

    const order =
      createUAppsOrder({
        title,
        description,
        type,
        typeLabel:
          selectedType?.label ||
          "پروژه اختصاصی",
        platform,
        platformLabel:
          selectedPlatform?.label ||
          "Android",
        features:
          featureList,
        budget,
        timeline,
      });

    addUAppsOrder(order);

    setSubmittedOrderNumber(
      order.orderNumber,
    );
  }

  if (submittedOrderNumber) {
    return (
      <main className="uapps-order-page">
        <div className="uapps-order-container">
          <section className="uapps-order-success">
            <div className="uapps-order-success-icon">
              ✓
            </div>

            <span className="uapps-eyebrow">
              ORDER CREATED
            </span>

            <h1>
              سفارش شما ثبت شد
            </h1>

            <p>
              سفارش شما با موفقیت ثبت شده
              و برای بررسی اولیه Uniqe
              ارسال شد.
            </p>

            <div className="uapps-order-number">
              <span>
                شماره سفارش
              </span>

              <strong dir="ltr">
                {submittedOrderNumber}
              </strong>
            </div>

            <div className="uapps-order-success-actions">
              <Link
                href="/uapps/orders"
                className="uapps-order-primary-button"
              >
                مشاهده سفارش‌های من
                <span>
                  ←
                </span>
              </Link>

              <Link
                href="/uapps"
                className="uapps-order-secondary-button"
              >
                بازگشت به UApps
              </Link>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="uapps-order-page">
      <div className="uapps-order-container">
        <div className="uapps-order-topbar">
          <Link
            href="/uapps"
            className="uapps-back-link"
          >
            ← بازگشت به UApps
          </Link>

          <Link
            href="/uapps/orders"
            className="uapps-order-topbar-link"
          >
            سفارش‌های من
          </Link>
        </div>

        <section className="uapps-order-hero">
          <span className="uapps-eyebrow">
            UAPPS ORDER
          </span>

          <h1>
            سفارش ساخت نرم‌افزار
          </h1>

          <p>
            نیاز نرم‌افزاری خودت را برای
            Uniqe توضیح بده تا درخواستت
            بررسی و برای مراحل بعدی آماده شود.
          </p>
        </section>

        <form
          className="uapps-order-form"
          onSubmit={handleSubmit}
        >
          <section className="uapps-order-card">
            <div className="uapps-order-card-header">
              <div>
                <span>
                  01
                </span>

                <h2>
                  اطلاعات پروژه
                </h2>
              </div>
            </div>

            <div className="uapps-order-grid">
              <label className="uapps-order-field uapps-order-field-wide">
                <span>
                  نام پروژه
                </span>

                <input
                  value={title}
                  onChange={(event) =>
                    setTitle(
                      event.target.value,
                    )
                  }
                  placeholder="مثلاً فروشگاه آنلاین من"
                />
              </label>

              <label className="uapps-order-field">
                <span>
                  نوع سفارش
                </span>

                <select
                  value={type}
                  onChange={(event) =>
                    setType(
                      event.target
                        .value as UAppsOrderType,
                    )
                  }
                >
                  {typeOptions.map(
                    (option) => (
                      <option
                        key={
                          option.value
                        }
                        value={
                          option.value
                        }
                      >
                        {option.label}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <label className="uapps-order-field">
                <span>
                  پلتفرم
                </span>

                <select
                  value={platform}
                  onChange={(event) =>
                    setPlatform(
                      event.target
                        .value as UAppsOrderPlatform,
                    )
                  }
                >
                  {platformOptions.map(
                    (option) => (
                      <option
                        key={
                          option.value
                        }
                        value={
                          option.value
                        }
                      >
                        {option.label}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <label className="uapps-order-field uapps-order-field-wide">
                <span>
                  توضیحات پروژه
                </span>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target
                        .value,
                    )
                  }
                  placeholder="توضیح بده این نرم‌افزار قرار است چه کاری انجام دهد..."
                  rows={6}
                />
              </label>
            </div>
          </section>

          <section className="uapps-order-card">
            <div className="uapps-order-card-header">
              <div>
                <span>
                  02
                </span>

                <h2>
                  امکانات موردنیاز
                </h2>
              </div>
            </div>

            <label className="uapps-order-field">
              <span>
                هر قابلیت را در یک خط وارد کنید
              </span>

              <textarea
                value={features}
                onChange={(event) =>
                  setFeatures(
                    event.target.value,
                  )
                }
                placeholder={
                  "ورود کاربران\nپرداخت آنلاین\nپنل مدیریت\nاعلان‌ها"
                }
                rows={7}
              />
            </label>
          </section>

          <section className="uapps-order-card">
            <div className="uapps-order-card-header">
              <div>
                <span>
                  03
                </span>

                <h2>
                  بودجه و زمان‌بندی
                </h2>
              </div>
            </div>

            <div className="uapps-order-grid">
              <label className="uapps-order-field">
                <span>
                  بودجه تقریبی
                </span>

                <select
                  value={budget}
                  onChange={(event) =>
                    setBudget(
                      event.target
                        .value,
                    )
                  }
                >
                  {budgetOptions.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <label className="uapps-order-field">
                <span>
                  زمان موردنظر
                </span>

                <select
                  value={timeline}
                  onChange={(event) =>
                    setTimeline(
                      event.target
                        .value,
                    )
                  }
                >
                  {timelineOptions.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ),
                  )}
                </select>
              </label>
            </div>
          </section>

          {error && (
            <div className="uapps-order-error">
              {error}
            </div>
          )}

          <div className="uapps-order-submit-row">
            <div>
              <strong>
                بعد از ثبت سفارش چه اتفاقی می‌افتد؟
              </strong>

              <span>
                درخواست بررسی می‌شود و وضعیت
                آن در بخش سفارش‌های من قابل مشاهده
                خواهد بود.
              </span>
            </div>

            <button
              type="submit"
              className="uapps-order-submit-button"
            >
              ثبت سفارش
              <span>
                ←
              </span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}