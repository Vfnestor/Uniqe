"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";

import type {
  UWebOpportunity,
} from "@/lib/uweb/opportunity-data";

export default function UWebApplyProject({
  opportunity,
}: {
  opportunity: UWebOpportunity;
}) {
  const [submitted, setSubmitted] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [duration, setDuration] =
    useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="uweb-apply-card uweb-apply-success">
        <span className="section-eyebrow">
          Application
        </span>

        <div className="uweb-apply-success-mark">
          ✓
        </div>

        <h2>
          درخواست شما ثبت شد
        </h2>

        <p>
          در این نسخه، درخواست فقط به
          صورت نمایشی ثبت شده است.
          اتصال واقعی به سیستم درخواست‌ها
          در مرحله Backend انجام خواهد شد.
        </p>

        <Button
          href="/uweb/opportunities"
          variant="secondary"
        >
          بازگشت به فرصت‌ها
        </Button>
      </div>
    );
  }

  return (
    <form
      className="uweb-apply-card"
      onSubmit={handleSubmit}
    >
      <span className="section-eyebrow">
        Apply Project
      </span>

      <h2>
        درخواست همکاری
      </h2>

      <p>
        اگر مهارت و شرایط این پروژه با
        تخصص شما هماهنگ است، درخواست
        خود را ارسال کنید.
      </p>

      <label>
        پیام به کارفرما

        <textarea
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          placeholder="توضیح کوتاهی درباره تجربه و نحوه اجرای پروژه بنویسید..."
          rows={5}
          required
        />
      </label>

      <label>
        قیمت پیشنهادی

        <input
          value={price}
          onChange={(event) =>
            setPrice(event.target.value)
          }
          type="number"
          min="0"
          placeholder="مثلاً 1800"
          required
        />
      </label>

      <label>
        مدت پیشنهادی اجرا

        <input
          value={duration}
          onChange={(event) =>
            setDuration(event.target.value)
          }
          type="number"
          min="1"
          placeholder="مثلاً 30 روز"
          required
        />
      </label>

      <div className="uweb-apply-notice">
        <strong>
          توجه
        </strong>

        <span>
          ارسال واقعی درخواست و قرارداد
          در مراحل بعدی UWeb به سیستم
          Backend متصل خواهد شد.
        </span>
      </div>

      <button
        type="submit"
        className="button button-primary uweb-apply-submit"
      >
        ارسال درخواست
      </button>
    </form>
  );
}