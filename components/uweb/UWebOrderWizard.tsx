"use client";

import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import type {
  UWebPlatform,
  UWebProjectType,
  UWebWebsiteType,
} from "@/lib/uweb/types";

type WizardData = {
  projectType: UWebProjectType | "";
  websiteType: UWebWebsiteType | "";
  purpose: string;
  platform: UWebPlatform | "";
  features: string[];
  design: string[];
  content: string;
  budgetMin: string;
  budgetMax: string;
  duration: string;
  title: string;
  description: string;
};

type Option = {
  value: string;
  label: string;
  description?: string;
};

const steps = [
  { id: 1, title: "Type", label: "نوع پروژه" },
  { id: 2, title: "Website", label: "نوع وب‌سایت" },
  { id: 3, title: "Purpose", label: "هدف" },
  { id: 4, title: "Platform", label: "پلتفرم" },
  { id: 5, title: "Features", label: "قابلیت‌ها" },
  { id: 6, title: "Design", label: "طراحی" },
  { id: 7, title: "Content", label: "محتوا" },
  { id: 8, title: "Budget", label: "بودجه" },
  { id: 9, title: "Details", label: "جزئیات" },
  { id: 10, title: "Review", label: "بازبینی" },
];

const projectTypes: Option[] = [
  {
    value: "new_website",
    label: "وب‌سایت جدید",
    description: "ساخت یک وب‌سایت از ابتدا",
  },
  {
    value: "redesign",
    label: "بازطراحی",
    description: "بهبود یا بازسازی وب‌سایت موجود",
  },
  {
    value: "web_app",
    label: "وب‌اپلیکیشن",
    description: "ساخت یک محصول یا سیستم تحت وب",
  },
  {
    value: "landing_page",
    label: "Landing Page",
    description: "صفحه فرود برای معرفی یا کمپین",
  },
  {
    value: "custom",
    label: "پروژه سفارشی",
    description: "برای نیازهای خاص و غیرمعمول",
  },
];

const websiteTypes: Option[] = [
  {
    value: "corporate",
    label: "شرکتی",
    description: "معرفی شرکت، خدمات و برند",
  },
  {
    value: "ecommerce",
    label: "فروشگاهی",
    description: "فروش محصولات یا خدمات آنلاین",
  },
  {
    value: "blog",
    label: "وبلاگ / مجله",
    description: "انتشار محتوا و مقالات",
  },
  {
    value: "portfolio",
    label: "Portfolio",
    description: "نمایش نمونه‌کار و توانمندی‌ها",
  },
  {
    value: "portal",
    label: "پرتال / پلتفرم",
    description: "سیستم چندبخشی با کاربران و امکانات مختلف",
  },
  {
    value: "custom",
    label: "سفارشی",
    description: "نوعی که در گزینه‌های بالا نیست",
  },
];

const purposes = [
  "معرفی برند",
  "افزایش فروش",
  "فروش آنلاین",
  "جذب مشتری",
  "ارائه خدمات",
  "آموزش آنلاین",
  "ساخت جامعه کاربری",
  "اتوماسیون کسب‌وکار",
  "ارائه یک سرویس دیجیتال",
  "سایر",
];

const platforms: Option[] = [
  {
    value: "wordpress",
    label: "WordPress",
    description: "مناسب برای بسیاری از سایت‌های محتوایی و فروشگاهی",
  },
  {
    value: "nextjs",
    label: "Next.js",
    description: "مناسب برای محصولات و تجربه‌های وب مدرن",
  },
  {
    value: "custom",
    label: "Custom",
    description: "پلتفرم یا معماری اختصاصی",
  },
];

const features = [
  "فروشگاه آنلاین",
  "درگاه پرداخت",
  "سبد خرید",
  "پنل کاربری",
  "ثبت‌نام و ورود",
  "سیستم جستجو",
  "وبلاگ",
  "SEO",
  "چندزبانه",
  "داشبورد مدیریتی",
  "اعلان‌ها",
  "رزرو / نوبت‌دهی",
  "اشتراک",
  "API",
  "سیستم پیام‌رسانی",
];

const designs = [
  "مدرن",
  "مینیمال",
  "حرفه‌ای / شرکتی",
  "لوکس",
  "تیره",
  "روشن",
  "Responsive",
  "UI/UX اختصاصی",
  "طراحی بر اساس برند موجود",
];

const contentOptions = [
  "محتوا آماده است",
  "بخشی از محتوا آماده است",
  "نیاز به تولید محتوا دارم",
  "هنوز مشخص نیست",
];

const initialData: WizardData = {
  projectType: "",
  websiteType: "",
  purpose: "",
  platform: "",
  features: [],
  design: [],
  content: "",
  budgetMin: "",
  budgetMax: "",
  duration: "",
  title: "",
  description: "",
};

function OptionCard({
  option,
  selected,
  onClick,
}: {
  option: Option;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`uweb-wizard-option ${
        selected ? "uweb-wizard-option-selected" : ""
      }`}
      onClick={onClick}
    >
      <span className="uweb-wizard-option-indicator" />
      <span className="uweb-wizard-option-content">
        <strong>{option.label}</strong>
        {option.description && <small>{option.description}</small>}
      </span>
    </button>
  );
}

function ChoiceCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`uweb-wizard-choice ${
        selected ? "uweb-wizard-choice-selected" : ""
      }`}
      onClick={onClick}
    >
      <span className="uweb-wizard-choice-check">
        {selected ? "✓" : ""}
      </span>
      <span>{label}</span>
    </button>
  );
}

export default function UWebOrderWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<WizardData>(initialData);
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(
    () => ((currentStep - 1) / (steps.length - 1)) * 100,
    [currentStep],
  );

  const update = <K extends keyof WizardData>(
    key: K,
    value: WizardData[K],
  ) => {
    setData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const toggleArrayValue = (
    key: "features" | "design",
    value: string,
  ) => {
    setData((previous) => {
      const current = previous[key];

      return {
        ...previous,
        [key]: current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return Boolean(data.projectType);
      case 2:
        return Boolean(data.websiteType);
      case 3:
        return Boolean(data.purpose);
      case 4:
        return Boolean(data.platform);
      case 5:
        return data.features.length > 0;
      case 6:
        return data.design.length > 0;
      case 7:
        return Boolean(data.content);
      case 8:
        return (
          Boolean(data.budgetMin) &&
          Boolean(data.budgetMax) &&
          Boolean(data.duration)
        );
      case 9:
        return Boolean(data.title.trim() && data.description.trim());
      default:
        return true;
    }
  };

  const goNext = () => {
    if (!validateStep()) {
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, steps.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = (step: number) => {
    if (step < currentStep) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submitProject = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="uweb-wizard-page">
        <Container>
          <div className="uweb-wizard-success">
            <Reveal animation="scale">
              <div className="uweb-wizard-success-mark">✓</div>
            </Reveal>

            <Reveal animation="up" delay={100}>
              <span className="section-eyebrow">Project prepared</span>
              <h1>پروژه شما آماده ارسال است.</h1>
              <p>
                مشخصات پروژه در این مرحله به‌صورت محلی آماده شده است. در مراحل
                بعدی، همین ساختار به API و سیستم پروژه UWeb متصل خواهد شد.
              </p>
            </Reveal>

            <Reveal animation="up" delay={180}>
              <div className="uweb-wizard-success-summary">
                <div>
                  <span>عنوان پروژه</span>
                  <strong>{data.title}</strong>
                </div>
                <div>
                  <span>پلتفرم</span>
                  <strong>{data.platform}</strong>
                </div>
                <div>
                  <span>بودجه</span>
                  <strong>
                    {data.budgetMin} — {data.budgetMax}
                  </strong>
                </div>
              </div>
            </Reveal>

            <Reveal animation="up" delay={260}>
              <Button href="/uweb">بازگشت به UWeb</Button>
            </Reveal>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="uweb-wizard-page">
      <Container>
        <Reveal animation="up">
          <div className="uweb-wizard-header">
            <span className="section-eyebrow">Uniqe / UWeb</span>
            <h1>پروژه وب خود را تعریف کنید.</h1>
            <p>
              چند مرحله کوتاه را تکمیل کنید تا نیازمندی‌های پروژه شما به یک
              مشخصات ساختاریافته تبدیل شود.
            </p>
          </div>
        </Reveal>

        <div className="uweb-wizard">
          <aside className="uweb-wizard-sidebar">
            <div className="uweb-wizard-progress">
              <div
                className="uweb-wizard-progress-fill"
                style={{ height: `${progress}%` }}
              />
            </div>

            <div className="uweb-wizard-steps">
              {steps.map((step) => {
                const active = step.id === currentStep;
                const completed = step.id < currentStep;

                return (
                  <button
                    type="button"
                    key={step.id}
                    className={`uweb-wizard-step ${
                      active ? "active" : ""
                    } ${completed ? "completed" : ""}`}
                    onClick={() => goToStep(step.id)}
                    disabled={step.id > currentStep}
                  >
                    <span className="uweb-wizard-step-number">
                      {completed ? "✓" : String(step.id).padStart(2, "0")}
                    </span>
                    <span>
                      <small>{step.title}</small>
                      <strong>{step.label}</strong>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="uweb-wizard-main">
            <div className="uweb-wizard-mobile-progress">
              <div>
                <span>
                  مرحله {currentStep} از {steps.length}
                </span>
                <strong>{steps[currentStep - 1].label}</strong>
              </div>
              <div className="uweb-wizard-mobile-bar">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="uweb-wizard-content">
              {currentStep === 1 && (
                <Reveal animation="up">
                  <div className="uweb-wizard-section">
                    <span className="section-eyebrow">Step 01</span>
                    <h2>چه نوع پروژه‌ای می‌خواهید؟</h2>
                    <p>نقطه شروع پروژه خود را انتخاب کنید.</p>

                    <div className="uweb-wizard-option-grid">
                      {projectTypes.map((option) => (
                        <OptionCard
                          key={option.value}
                          option={option}
                          selected={data.projectType === option.value}
                          onClick={() =>
                            update(
                              "projectType",
                              option.value as UWebProjectType,
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {currentStep === 2 && (
                <Reveal animation="up">
                  <div className="uweb-wizard-section">
                    <span className="section-eyebrow">Step 02</span>
                    <h2>چه نوع وب‌سایتی نیاز دارید؟</h2>
                    <p>ساختار اصلی تجربه وب خود را مشخص کنید.</p>

                    <div className="uweb-wizard-option-grid">
                      {websiteTypes.map((option) => (
                        <OptionCard
                          key={option.value}
                          option={option}
                          selected={data.websiteType === option.value}
                          onClick={() =>
                            update(
                              "websiteType",
                              option.value as UWebWebsiteType,
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {currentStep === 3 && (
                <Reveal animation="up">
                  <div className="uweb-wizard-section">
                    <span className="section-eyebrow">Step 03</span>
                    <h2>هدف اصلی پروژه چیست؟</h2>
                    <p>مهم‌ترین نتیجه‌ای که از این پروژه انتظار دارید را انتخاب کنید.</p>

                    <div className="uweb-wizard-choice-grid">
                      {purposes.map((purpose) => (
                        <ChoiceCard
                          key={purpose}
                          label={purpose}
                          selected={data.purpose === purpose}
                          onClick={() => update("purpose", purpose)}
                        />
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {currentStep === 4 && (
                <Reveal animation="up">
                  <div className="uweb-wizard-section">
                    <span className="section-eyebrow">Step 04</span>
                    <h2>پلتفرم موردنظر شما چیست؟</h2>
                    <p>
                      اگر مطمئن نیستید، گزینه‌ای را انتخاب کنید که به نیاز شما
                      نزدیک‌تر است.
                    </p>

                    <div className="uweb-wizard-option-grid">
                      {platforms.map((option) => (
                        <OptionCard
                          key={option.value}
                          option={option}
                          selected={data.platform === option.value}
                          onClick={() =>
                            update(
                              "platform",
                              option.value as UWebPlatform,
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {currentStep === 5 && (
                <Reveal animation="up">
                  <div className="uweb-wizard-section">
                    <span className="section-eyebrow">Step 05</span>
                    <h2>چه قابلیت‌هایی نیاز دارید؟</h2>
                    <p>هر تعداد قابلیتی که برای پروژه لازم است انتخاب کنید.</p>

                    <div className="uweb-wizard-choice-grid">
                      {features.map((feature) => (
                        <ChoiceCard
                          key={feature}
                          label={feature}
                          selected={data.features.includes(feature)}
                          onClick={() =>
                            toggleArrayValue("features", feature)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {currentStep === 6 && (
                <Reveal animation="up">
                  <div className="uweb-wizard-section">
                    <span className="section-eyebrow">Step 06</span>
                    <h2>سبک طراحی را مشخص کنید.</h2>
                    <p>سبک‌ها و ویژگی‌های بصری موردنظر خود را انتخاب کنید.</p>

                    <div className="uweb-wizard-choice-grid">
                      {designs.map((item) => (
                        <ChoiceCard
                          key={item}
                          label={item}
                          selected={data.design.includes(item)}
                          onClick={() => toggleArrayValue("design", item)}
                        />
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {currentStep === 7 && (
                <Reveal animation="up">
                  <div className="uweb-wizard-section">
                    <span className="section-eyebrow">Step 07</span>
                    <h2>وضعیت محتوای پروژه چگونه است؟</h2>
                    <p>مشخص کنید محتوای موردنیاز پروژه در چه وضعیتی قرار دارد.</p>

                    <div className="uweb-wizard-option-grid">
                      {contentOptions.map((option) => (
                        <OptionCard
                          key={option}
                          option={{
                            value: option,
                            label: option,
                          }}
                          selected={data.content === option}
                          onClick={() => update("content", option)}
                        />
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}

              {currentStep === 8 && (
                <Reveal animation="up">
                  <div className="uweb-wizard-section">
                    <span className="section-eyebrow">Step 08</span>
                    <h2>بودجه و زمان‌بندی</h2>
                    <p>
                      محدوده تقریبی بودجه و زمان موردنظر خود را مشخص کنید.
                    </p>

                    <div className="uweb-wizard-form-grid">
                      <label>
                        <span>حداقل بودجه</span>
                        <input
                          type="number"
                          min="0"
                          value={data.budgetMin}
                          onChange={(event) =>
                            update("budgetMin", event.target.value)
                          }
                          placeholder="مثلاً 1000"
                        />
                      </label>

                      <label>
                        <span>حداکثر بودجه</span>
                        <input
                          type="number"
                          min="0"
                          value={data.budgetMax}
                          onChange={(event) =>
                            update("budgetMax", event.target.value)
                          }
                          placeholder="مثلاً 3000"
                        />
                      </label>

                      <label className="uweb-wizard-field-full">
                        <span>مدت زمان موردنظر</span>
                        <input
                          type="text"
                          value={data.duration}
                          onChange={(event) =>
                            update("duration", event.target.value)
                          }
                          placeholder="مثلاً 30 روز"
                        />
                      </label>
                    </div>
                  </div>
                </Reveal>
              )}

              {currentStep === 9 && (
                <Reveal animation="up">
                  <div className="uweb-wizard-section">
                    <span className="section-eyebrow">Step 09</span>
                    <h2>جزئیات پروژه را بنویسید.</h2>
                    <p>
                      اطلاعاتی که به حرفه‌ای‌ها کمک می‌کند پروژه را بهتر درک
                      کنند وارد کنید.
                    </p>

                    <div className="uweb-wizard-form-grid">
                      <label className="uweb-wizard-field-full">
                        <span>عنوان پروژه</span>
                        <input
                          type="text"
                          value={data.title}
                          onChange={(event) =>
                            update("title", event.target.value)
                          }
                          placeholder="مثلاً طراحی فروشگاه اینترنتی"
                        />
                      </label>

                      <label className="uweb-wizard-field-full">
                        <span>توضیحات پروژه</span>
                        <textarea
                          value={data.description}
                          onChange={(event) =>
                            update("description", event.target.value)
                          }
                          placeholder="نیازمندی‌ها، ایده، شرایط فعلی و هر نکته مهم دیگر را توضیح دهید..."
                          rows={8}
                        />
                      </label>
                    </div>
                  </div>
                </Reveal>
              )}

              {currentStep === 10 && (
                <Reveal animation="up">
                  <div className="uweb-wizard-section">
                    <span className="section-eyebrow">Step 10</span>
                    <h2>پروژه خود را بررسی کنید.</h2>
                    <p>
                      قبل از ارسال، اطلاعات واردشده را بررسی کنید.
                    </p>

                    <div className="uweb-review">
                      <div className="uweb-review-item">
                        <span>نوع پروژه</span>
                        <strong>{data.projectType}</strong>
                      </div>

                      <div className="uweb-review-item">
                        <span>نوع وب‌سایت</span>
                        <strong>{data.websiteType}</strong>
                      </div>

                      <div className="uweb-review-item">
                        <span>هدف</span>
                        <strong>{data.purpose}</strong>
                      </div>

                      <div className="uweb-review-item">
                        <span>پلتفرم</span>
                        <strong>{data.platform}</strong>
                      </div>

                      <div className="uweb-review-item">
                        <span>قابلیت‌ها</span>
                        <strong>{data.features.join("، ")}</strong>
                      </div>

                      <div className="uweb-review-item">
                        <span>طراحی</span>
                        <strong>{data.design.join("، ")}</strong>
                      </div>

                      <div className="uweb-review-item">
                        <span>محتوا</span>
                        <strong>{data.content}</strong>
                      </div>

                      <div className="uweb-review-item">
                        <span>بودجه</span>
                        <strong>
                          {data.budgetMin} — {data.budgetMax}
                        </strong>
                      </div>

                      <div className="uweb-review-item">
                        <span>مدت زمان</span>
                        <strong>{data.duration}</strong>
                      </div>

                      <div className="uweb-review-item uweb-review-item-full">
                        <span>عنوان</span>
                        <strong>{data.title}</strong>
                      </div>

                      <div className="uweb-review-item uweb-review-item-full">
                        <span>توضیحات</span>
                        <p>{data.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            <div className="uweb-wizard-actions">
              <button
                type="button"
                className="uweb-wizard-back"
                onClick={goBack}
                disabled={currentStep === 1}
              >
                ← بازگشت
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  className="uweb-wizard-next"
                  onClick={goNext}
                >
                  مرحله بعد →
                </button>
              ) : (
                <button
                  type="button"
                  className="uweb-wizard-submit"
                  onClick={submitProject}
                >
                  آماده‌سازی پروژه
                </button>
              )}
            </div>

            {!validateStep() && currentStep < 10 && (
              <p className="uweb-wizard-validation">
                برای ادامه، اطلاعات این مرحله را کامل کنید.
              </p>
            )}
          </main>
        </div>
      </Container>
    </section>
  );
}