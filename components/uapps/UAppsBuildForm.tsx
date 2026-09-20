"use client";

import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  addStoredUserApp,
  createStoredUserApp,
  type CreateUserAppInput,
} from "@/lib/uapps/user-app-storage";

const categories = [
  "ابزار و کاربردی",
  "مالی و مدیریت",
  "بهره‌وری",
  "آموزش",
  "کسب‌وکار",
  "سلامت",
  "سرگرمی",
  "شبکه اجتماعی",
  "طراحی",
  "هوش مصنوعی",
  "موسیقی",
  "سایر",
];

const platforms = [
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
    value: "windows",
    label: "Windows",
  },
  {
    value: "macos",
    label: "macOS",
  },
  {
    value: "linux",
    label: "Linux",
  },
  {
    value: "multi",
    label: "چند پلتفرمی",
  },
] as const;

const types = [
  {
    value: "web-app",
    label: "نرم‌افزار تحت وب",
  },
  {
    value: "installable",
    label: "قابل نصب",
  },
  {
    value: "hybrid",
    label: "ترکیبی",
  },
] as const;

const accents = [
  "blue",
  "purple",
  "green",
  "orange",
  "black",
  "pink",
  "red",
] as const;

type FormState = {
  name: string;
  description: string;
  category: string;
  platform: string;
  type: string;
  icon: string;
  cover: string;
  accent: string;
  href: string;
  version: string;
};

const initialForm: FormState = {
  name: "",
  description: "",
  category: "",
  platform: "web",
  type: "web-app",
  icon: "◈",
  cover: "",
  accent: "blue",
  href: "",
  version: "1.0.0",
};

export default function UAppsBuildForm() {
  const [form, setForm] =
    useState<FormState>(
      initialForm,
    );

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [savedId, setSavedId] =
    useState("");

  useEffect(() => {
    const draft =
      window.localStorage.getItem(
        "uniqe-uapps-build-draft",
      );

    if (!draft) {
      return;
    }

    try {
      const parsed =
        JSON.parse(draft);

      setForm({
        ...initialForm,
        ...parsed,
      });
    } catch {
      window.localStorage.removeItem(
        "uniqe-uapps-build-draft",
      );
    }
  }, []);

  function update(
    key: keyof FormState,
    value: string,
  ) {
    setForm(
      (current) => ({
        ...current,
        [key]: value,
      }),
    );

    setError("");
    setSuccess(false);
  }

  function saveDraft() {
    window.localStorage.setItem(
      "uniqe-uapps-build-draft",
      JSON.stringify(form),
    );

    setSuccess(true);
    setError("");
  }

  function validate() {
    if (
      form.name.trim().length <
      2
    ) {
      return "نام نرم‌افزار باید حداقل ۲ کاراکتر باشد.";
    }

    if (
      form.name.trim().length >
      80
    ) {
      return "نام نرم‌افزار نباید بیشتر از ۸۰ کاراکتر باشد.";
    }

    if (
      form.description.trim()
        .length < 20
    ) {
      return "توضیحات نرم‌افزار باید حداقل ۲۰ کاراکتر باشد.";
    }

    if (
      form.description.trim()
        .length > 500
    ) {
      return "توضیحات نرم‌افزار نباید بیشتر از ۵۰۰ کاراکتر باشد.";
    }

    if (!form.category) {
      return "دسته‌بندی نرم‌افزار را انتخاب کنید.";
    }

    if (!form.href.trim()) {
      return "لینک نرم‌افزار را وارد کنید.";
    }

    try {
      const url =
        new URL(
          form.href.trim(),
        );

      if (
        ![
          "http:",
          "https:",
        ].includes(url.protocol)
      ) {
        return "لینک باید با http یا https شروع شود.";
      }
    } catch {
      return "لینک نرم‌افزار معتبر نیست.";
    }

    if (
      form.version.trim()
        .length > 30
    ) {
      return "نسخه نرم‌افزار بیش از حد طولانی است.";
    }

    return "";
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const validationError =
      validate();

    if (validationError) {
      setError(
        validationError,
      );
      return;
    }

    const platform =
      platforms.find(
        (item) =>
          item.value ===
          form.platform,
      );

    const type =
      types.find(
        (item) =>
          item.value ===
          form.type,
      );

    if (!platform || !type) {
      setError(
        "اطلاعات پلتفرم یا نوع نرم‌افزار معتبر نیست.",
      );
      return;
    }

    const input: CreateUserAppInput = {
      name: form.name,
      description:
        form.description,
      category:
        form.category,
      platform:
        form.platform as CreateUserAppInput["platform"],
      platformLabel:
        platform.label,
      type:
        form.type as CreateUserAppInput["type"],
      typeLabel:
        type.label,
      icon: form.icon,
      cover: form.cover,
      accent:
        form.accent as CreateUserAppInput["accent"],
      href: form.href,
      version: form.version,
    };

    const app =
      createStoredUserApp(
        input,
      );

    addStoredUserApp(app);

    window.localStorage.removeItem(
      "uniqe-uapps-build-draft",
    );

    setSavedId(app.id);
    setSuccess(true);
    setError("");
  }

  return (
    <main className="uapps-build-page">
      <div className="uapps-build-container">
        <div className="uapps-build-topbar">
          <Link
            href="/uapps"
            className="uapps-back-link"
          >
            ← بازگشت به UApps
          </Link>

          <Link
            href="/uapps/my-apps"
            className="uapps-build-my-apps-link"
          >
            نرم‌افزارهای من
          </Link>
        </div>

        <section className="uapps-build-hero">
          <span className="uapps-eyebrow">
            BUILD / SUBMIT
          </span>

          <h1>
            نرم‌افزار خودت را به UApps اضافه کن
          </h1>

          <p>
            اطلاعات نرم‌افزار را وارد کن. ابتدا
            می‌توانی آن را به‌صورت پیش‌نویس ذخیره
            کنی و بعد برای بررسی Uniqe ارسال کنی.
          </p>
        </section>

        <form
          className="uapps-build-form"
          onSubmit={
            handleSubmit
          }
        >
          <section className="uapps-build-card">
            <div className="uapps-build-card-header">
              <div>
                <span>
                  01
                </span>

                <h2>
                  اطلاعات اصلی
                </h2>
              </div>

              <p>
                اطلاعاتی که کاربران در صفحه UApps
                خواهند دید.
              </p>
            </div>

            <div className="uapps-build-grid">
              <label className="uapps-build-field uapps-build-field-wide">
                <span>
                  نام نرم‌افزار
                </span>

                <input
                  value={form.name}
                  onChange={(event) =>
                    update(
                      "name",
                      event.target.value,
                    )
                  }
                  placeholder="مثلاً Smart Finance"
                  maxLength={80}
                />
              </label>

              <label className="uapps-build-field uapps-build-field-wide">
                <span>
                  توضیحات
                </span>

                <textarea
                  value={
                    form.description
                  }
                  onChange={(event) =>
                    update(
                      "description",
                      event.target.value,
                    )
                  }
                  placeholder="توضیح کوتاه و واضح درباره نرم‌افزار..."
                  rows={5}
                  maxLength={500}
                />

                <small>
                  {form.description.length}/500
                </small>
              </label>

              <label className="uapps-build-field">
                <span>
                  دسته‌بندی
                </span>

                <select
                  value={
                    form.category
                  }
                  onChange={(event) =>
                    update(
                      "category",
                      event.target.value,
                    )
                  }
                >
                  <option value="">
                    انتخاب دسته‌بندی
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <label className="uapps-build-field">
                <span>
                  نسخه
                </span>

                <input
                  value={
                    form.version
                  }
                  onChange={(event) =>
                    update(
                      "version",
                      event.target.value,
                    )
                  }
                  placeholder="1.0.0"
                  maxLength={30}
                  dir="ltr"
                />
              </label>
            </div>
          </section>

          <section className="uapps-build-card">
            <div className="uapps-build-card-header">
              <div>
                <span>
                  02
                </span>

                <h2>
                  پلتفرم و نوع
                </h2>
              </div>

              <p>
                مشخص کن نرم‌افزار روی چه محیطی اجرا
                می‌شود.
              </p>
            </div>

            <div className="uapps-build-option-group">
              <span>
                پلتفرم
              </span>

              <div className="uapps-build-options">
                {platforms.map(
                  (platform) => (
                    <button
                      key={
                        platform.value
                      }
                      type="button"
                      className={
                        form.platform ===
                        platform.value
                          ? "uapps-build-option is-active"
                          : "uapps-build-option"
                      }
                      onClick={() =>
                        update(
                          "platform",
                          platform.value,
                        )
                      }
                    >
                      {
                        platform.label
                      }
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="uapps-build-option-group">
              <span>
                نوع نرم‌افزار
              </span>

              <div className="uapps-build-options">
                {types.map(
                  (type) => (
                    <button
                      key={
                        type.value
                      }
                      type="button"
                      className={
                        form.type ===
                        type.value
                          ? "uapps-build-option is-active"
                          : "uapps-build-option"
                      }
                      onClick={() =>
                        update(
                          "type",
                          type.value,
                        )
                      }
                    >
                      {
                        type.label
                      }
                    </button>
                  ),
                )}
              </div>
            </div>
          </section>

          <section className="uapps-build-card">
            <div className="uapps-build-card-header">
              <div>
                <span>
                  03
                </span>

                <h2>
                  ظاهر و دسترسی
                </h2>
              </div>

              <p>
                مشخصات ظاهری و آدرس نرم‌افزار.
              </p>
            </div>

            <div className="uapps-build-grid">
              <label className="uapps-build-field">
                <span>
                  آیکون
                </span>

                <input
                  value={form.icon}
                  onChange={(event) =>
                    update(
                      "icon",
                      event.target.value,
                    )
                  }
                  placeholder="◈"
                  maxLength={4}
                />
              </label>

              <div className="uapps-build-field">
                <span>
                  رنگ اصلی
                </span>

                <div className="uapps-build-accent-options">
                  {accents.map(
                    (accent) => (
                      <button
                        key={accent}
                        type="button"
                        aria-label={
                          accent
                        }
                        className={`uapps-build-accent uapps-build-accent-${accent} ${
                          form.accent ===
                          accent
                            ? "is-active"
                            : ""
                        }`}
                        onClick={() =>
                          update(
                            "accent",
                            accent,
                          )
                        }
                      />
                    ),
                  )}
                </div>
              </div>

              <label className="uapps-build-field uapps-build-field-wide">
                <span>
                  لینک نرم‌افزار
                </span>

                <input
                  value={form.href}
                  onChange={(event) =>
                    update(
                      "href",
                      event.target.value,
                    )
                  }
                  placeholder="https://example.com"
                  dir="ltr"
                />
              </label>

              <label className="uapps-build-field uapps-build-field-wide">
                <span>
                  لینک تصویر کاور
                  <small>
                    اختیاری
                  </small>
                </span>

                <input
                  value={form.cover}
                  onChange={(event) =>
                    update(
                      "cover",
                      event.target.value,
                    )
                  }
                  placeholder="https://example.com/cover.jpg"
                  dir="ltr"
                />
              </label>
            </div>
          </section>

          {error && (
            <div className="uapps-build-message uapps-build-message-error">
              {error}
            </div>
          )}

          {success && (
            <div className="uapps-build-message uapps-build-message-success">
              {savedId
                ? "نرم‌افزار با موفقیت به‌صورت پیش‌نویس ذخیره شد."
                : "پیش‌نویس با موفقیت ذخیره شد."}
            </div>
          )}

          <div className="uapps-build-actions">
            <button
              type="button"
              className="uapps-build-secondary-button"
              onClick={
                saveDraft
              }
            >
              ذخیره پیش‌نویس
            </button>

            <button
              type="submit"
              className="uapps-build-primary-button"
            >
              ساخت نرم‌افزار
              <span>
                →
              </span>
            </button>
          </div>

          {savedId && (
            <div className="uapps-build-next-step">
              <div>
                <strong>
                  نرم‌افزار ساخته شد
                </strong>

                <span>
                  حالا می‌توانی آن را در بخش نرم‌افزارهای
                  من برای بررسی ارسال کنی.
                </span>
              </div>

              <Link
                href="/uapps/my-apps"
                className="uapps-build-review-link"
              >
                مدیریت نرم‌افزار
                <span>
                  ←
                </span>
              </Link>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}