"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";

import type {
  UWebContract,
} from "@/lib/uweb/types";

type Props = {
  contract: UWebContract;
};

export default function UWebContractSignature({
  contract,
}: Props) {
  const [signed, setSigned] =
    useState(false);

  const currentUserId =
    "professional-demo-01";

  const currentParty =
    contract.parties.find(
      (party) =>
        party.userId ===
        currentUserId,
    );

  if (!currentParty) {
    return null;
  }

  const alreadySigned =
    signed ||
    currentParty.status ===
      "signed";

  return (
    <section className="uweb-contract-signature">
      <div className="uweb-contract-section-heading">
        <span className="section-eyebrow">
          Digital Signature
        </span>

        <h2>
          امضای قرارداد
        </h2>

        <p>
          در نسخه فعلی این بخش به‌صورت
          آزمایشی اجرا می‌شود. سیستم امضای
          حقوقی و احراز هویت واقعی در
          زیرساخت نهایی اضافه خواهد شد.
        </p>
      </div>

      <div
        className={
          alreadySigned
            ? "uweb-contract-signature-box signed"
            : "uweb-contract-signature-box"
        }
      >
        {alreadySigned ? (
          <>
            <div className="uweb-contract-signature-icon">
              ✓
            </div>

            <div>
              <strong>
                قرارداد توسط شما امضا شده است
              </strong>

              <span>
                وضعیت امضای شما ثبت شد.
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="uweb-contract-signature-copy">
              <strong>
                آماده امضای قرارداد هستید؟
              </strong>

              <span>
                با تأیید، امضای آزمایشی شما
                در این نسخه ثبت می‌شود.
              </span>
            </div>

            <Button
              onClick={() =>
                setSigned(true)
              }
            >
              امضای قرارداد
            </Button>
          </>
        )}
      </div>
    </section>
  );
}