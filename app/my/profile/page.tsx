"use client";

import {
  useEffect,
  useState,
} from "react";

import Container from "@/components/ui/Container";
import MyUNavigation from "@/components/my/MyUNavigation";

import {
  getStoredUserProfile,
  normalizeSheba,
  saveStoredUserProfile,
  validateSheba,
  validateUsername,
  type UserProfile,
} from "@/lib/my-u/profile";

import "@/components/my/my-u.css";
import "@/components/my/my-u-core.css";
import "./profile.css";

const navigation = [
  {
    id: "overview",
    title: "نمای کلی",
    href: "/my",
    icon: "⌂",
  },
  {
    id: "uweb",
    title: "UWeb",
    href: "/my-uweb",
    icon: "🌐",
  },
  {
    id: "projects",
    title: "پروژه‌های من",
    href: "/my/projects",
    icon: "▣",
  },
  {
    id: "contracts",
    title: "قراردادهای من",
    href: "/my/contracts",
    icon: "▤",
  },
  {
    id: "orders",
    title: "سفارش‌های من",
    href: "/my/orders",
    icon: "◫",
  },
  {
    id: "notifications",
    title: "اعلان‌ها",
    href: "/my/notifications",
    icon: "◉",
  },
  {
    id: "favorites",
    title: "علاقه‌مندی‌ها",
    href: "/my/favorites",
    icon: "♡",
  },
  {
    id: "settings",
    title: "تنظیمات",
    href: "/my/settings",
    icon: "⚙",
  },
] as const;

const demoTakenUsernames = [
  "admin",
  "uniqe",
  "user",
  "test",
  "vahid",
];

export default function MyProfilePage() {
  const [profile, setProfile] =
    useState<UserProfile>(
      getStoredUserProfile(),
    );

  const [usernameStatus, setUsernameStatus] =
    useState<
      "idle" | "invalid" | "available" | "taken"
    >("idle");

  const [shebaStatus, setShebaStatus] =
    useState<
      "idle" | "valid" | "invalid"
    >("idle");

  const [saveMessage, setSaveMessage] =
    useState("");

  useEffect(() => {
    const stored =
      getStoredUserProfile();

    setProfile(stored);

    if (stored.username) {
      checkUsername(
        stored.username,
      );
    }

    if (stored.sheba) {
      checkSheba(
        stored.sheba,
      );
    }
  }, []);

  function updateProfile(
    field: keyof UserProfile,
    value: string,
  ) {
    setProfile(
      (current) => ({
        ...current,
        [field]: value,
      }),
    );

    setSaveMessage("");
  }

  function checkUsername(
    value: string,
  ) {
    const username =
      value.trim().toLowerCase();

    if (!validateUsername(username)) {
      setUsernameStatus("invalid");
      return;
    }

    if (
      demoTakenUsernames.includes(
        username,
      )
    ) {
      setUsernameStatus("taken");
      return;
    }

    setUsernameStatus("available");
  }

  function checkSheba(
    value: string,
  ) {
    const normalized =
      normalizeSheba(value);

    if (!normalized) {
      setShebaStatus("idle");
      return;
    }

    setShebaStatus(
      validateSheba(normalized)
        ? "valid"
        : "invalid",
    );
  }

  function handleAvatarChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/",
      )
    ) {
      return;
    }

    if (
      file.size >
      2 * 1024 * 1024
    ) {
      setSaveMessage(
        "حجم عکس باید کمتر از ۲ مگابایت باشد.",
      );

      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      updateProfile(
        "avatar",
        String(reader.result),
      );
    };

    reader.readAsDataURL(file);
  }

  function handleSave() {
    const username =
      profile.username
        .trim()
        .toLowerCase();

    if (
      username &&
      !validateUsername(username)
    ) {
      setUsernameStatus("invalid");

      setSaveMessage(
        "نام کاربری معتبر نیست.",
      );

      return;
    }

    if (
      username &&
      demoTakenUsernames.includes(
        username,
      )
    ) {
      setUsernameStatus("taken");

      setSaveMessage(
        "این نام کاربری قبلاً استفاده شده است.",
      );

      return;
    }

    if (
      profile.sheba &&
      !validateSheba(
        profile.sheba,
      )
    ) {
      setShebaStatus("invalid");

      setSaveMessage(
        "شماره شبا معتبر نیست.",
      );

      return;
    }

    const nextProfile = {
      ...profile,
      username,
      sheba:
        normalizeSheba(
          profile.sheba,
        ),
    };

    saveStoredUserProfile(
      nextProfile,
    );

    setProfile(
      nextProfile,
    );

    setSaveMessage(
      "اطلاعات پروفایل با موفقیت ذخیره شد.",
    );
  }

  const fullName =
    `${profile.firstName} ${profile.lastName}`
      .trim();

  return (
    <main className="my-u-profile-page">
      <Container>
        <div className="my-u-profile-layout">
          <MyUNavigation
            items={navigation}
          />

          <section className="my-u-profile-main">
            <header className="my-u-profile-header">
              <span className="section-eyebrow">
                PROFILE
              </span>

              <h1>
                پروفایل کاربری
              </h1>

              <p>
                اطلاعات حساب و مشخصات شخصی خود را
                مدیریت کنید.
              </p>
            </header>

            <section className="my-u-profile-card">
              <div className="my-u-profile-card-avatar">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="تصویر پروفایل"
                  />
                ) : (
                  <span>
                    {fullName
                      ? fullName
                          .charAt(0)
                          .toUpperCase()
                      : "U"}
                  </span>
                )}
              </div>

              <div className="my-u-profile-card-info">
                <strong>
                  {fullName ||
                    "کاربر Uniqe"}
                </strong>

                <span>
                  {profile.username
                    ? `@${profile.username}`
                    : "نام کاربری ثبت نشده"}
                </span>

                <small>
                  {profile.email ||
                    "ایمیل ثبت نشده"}
                </small>
              </div>
            </section>

            <section className="my-u-profile-form-card">
              <div className="my-u-profile-section-title">
                <h2>
                  اطلاعات شخصی
                </h2>

                <p>
                  اطلاعات زیر در پروفایل شما
                  نمایش داده می‌شوند.
                </p>
              </div>

              <div className="my-u-profile-avatar-editor">
                <div className="my-u-profile-editor-avatar">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="تصویر پروفایل"
                    />
                  ) : (
                    <span>
                      {fullName
                        ? fullName
                            .charAt(0)
                            .toUpperCase()
                        : "U"}
                    </span>
                  )}
                </div>

                <label className="my-u-profile-upload">
                  تغییر عکس پروفایل

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleAvatarChange
                    }
                  />
                </label>

                <small>
                  حداکثر حجم ۲ مگابایت
                </small>
              </div>

              <div className="my-u-profile-grid">
                <label>
                  <span>
                    نام
                  </span>

                  <input
                    value={
                      profile.firstName
                    }
                    onChange={(event) =>
                      updateProfile(
                        "firstName",
                        event.target.value,
                      )
                    }
                    placeholder="نام"
                  />
                </label>

                <label>
                  <span>
                    نام خانوادگی
                  </span>

                  <input
                    value={
                      profile.lastName
                    }
                    onChange={(event) =>
                      updateProfile(
                        "lastName",
                        event.target.value,
                      )
                    }
                    placeholder="نام خانوادگی"
                  />
                </label>

                <label>
                  <span>
                    جنسیت
                  </span>

                  <select
                    value={
                      profile.gender
                    }
                    onChange={(event) =>
                      updateProfile(
                        "gender",
                        event.target.value,
                      )
                    }
                  >
                    <option value="unspecified">
                      نامشخص
                    </option>

                    <option value="male">
                      مرد
                    </option>

                    <option value="female">
                      زن
                    </option>
                  </select>
                </label>

                <label>
                  <span>
                    شماره تلفن
                  </span>

                  <input
                    dir="ltr"
                    value={
                      profile.phone
                    }
                    onChange={(event) =>
                      updateProfile(
                        "phone",
                        event.target.value,
                      )
                    }
                    placeholder="09xxxxxxxxx"
                  />
                </label>

                <label className="my-u-profile-field-wide">
                  <span>
                    ایمیل
                  </span>

                  <input
                    dir="ltr"
                    type="email"
                    value={
                      profile.email
                    }
                    onChange={(event) =>
                      updateProfile(
                        "email",
                        event.target.value,
                      )
                    }
                    placeholder="example@email.com"
                  />
                </label>

                <label className="my-u-profile-field-wide">
                  <span>
                    نام کاربری
                  </span>

                  <input
                    dir="ltr"
                    value={
                      profile.username
                    }
                    onChange={(event) => {
                      const value =
                        event.target.value;

                      updateProfile(
                        "username",
                        value,
                      );

                      checkUsername(
                        value,
                      );
                    }}
                    placeholder="username"
                  />

                  {usernameStatus ===
                    "available" && (
                    <small className="my-u-profile-success">
                      ✓ این نام کاربری قابل استفاده است.
                    </small>
                  )}

                  {usernameStatus ===
                    "taken" && (
                    <small className="my-u-profile-error">
                      × این نام کاربری قبلاً استفاده شده است.
                    </small>
                  )}

                  {usernameStatus ===
                    "invalid" && (
                    <small className="my-u-profile-error">
                      فقط حروف انگلیسی، اعداد و _ از ۳ تا ۳۰ کاراکتر.
                    </small>
                  )}
                </label>
              </div>
            </section>

            <section className="my-u-profile-form-card">
              <div className="my-u-profile-section-title">
                <h2>
                  دستگاه مورد استفاده
                </h2>

                <p>
                  دستگاه اصلی مورد استفاده برای
                  ورود به Uniqe را مشخص کنید.
                </p>
              </div>

              <div className="my-u-profile-grid">
                <label>
                  <span>
                    نوع دستگاه
                  </span>

                  <select
                    value={
                      profile.deviceType
                    }
                    onChange={(event) =>
                      updateProfile(
                        "deviceType",
                        event.target.value,
                      )
                    }
                  >
                    <option value="mobile">
                      موبایل
                    </option>

                    <option value="laptop">
                      لپ‌تاپ
                    </option>

                    <option value="tablet">
                      تبلت
                    </option>

                    <option value="desktop">
                      کامپیوتر
                    </option>

                    <option value="other">
                      سایر
                    </option>
                  </select>
                </label>

                <label>
                  <span>
                    برند
                  </span>

                  <input
                    value={
                      profile.deviceBrand
                    }
                    onChange={(event) =>
                      updateProfile(
                        "deviceBrand",
                        event.target.value,
                      )
                    }
                    placeholder="مثلاً Xiaomi یا ASUS"
                  />
                </label>

                <label className="my-u-profile-field-wide">
                  <span>
                    مدل دستگاه
                  </span>

                  <input
                    value={
                      profile.deviceModel
                    }
                    onChange={(event) =>
                      updateProfile(
                        "deviceModel",
                        event.target.value,
                      )
                    }
                    placeholder="مثلاً Redmi Note 13 Pro"
                  />
                </label>
              </div>
            </section>

            <section className="my-u-profile-form-card">
              <div className="my-u-profile-section-title">
                <h2>
                  اطلاعات بانکی
                </h2>

                <p>
                  شماره شبای خود را وارد کنید.
                  مالکیت حساب بانکی بررسی نمی‌شود.
                </p>
              </div>

              <label className="my-u-profile-sheba-field">
                <span>
                  شماره شبا
                </span>

                <input
                  dir="ltr"
                  value={
                    profile.sheba
                  }
                  onChange={(event) => {
                    const value =
                      normalizeSheba(
                        event.target.value,
                      );

                    updateProfile(
                      "sheba",
                      value,
                    );

                    checkSheba(
                      value,
                    );
                  }}
                  placeholder="IRxxxxxxxxxxxxxxxxxxxxxxxx"
                  maxLength={26}
                />

                {shebaStatus ===
                  "valid" && (
                  <small className="my-u-profile-success">
                    ✓ شماره شبا معتبر است.
                  </small>
                )}

                {shebaStatus ===
                  "invalid" && (
                  <small className="my-u-profile-error">
                    × شماره شبا معتبر نیست.
                  </small>
                )}
              </label>
            </section>

            <div className="my-u-profile-actions">
              <button
                type="button"
                className="my-u-profile-save-button"
                onClick={
                  handleSave
                }
              >
                ذخیره تغییرات
              </button>

              {saveMessage && (
                <span
                  className={
                    saveMessage.includes(
                      "موفقیت",
                    )
                      ? "my-u-profile-save-message my-u-profile-success"
                      : "my-u-profile-save-message my-u-profile-error"
                  }
                >
                  {saveMessage}
                </span>
              )}
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}