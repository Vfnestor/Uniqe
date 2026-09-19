"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function USchoolCTA() {
  const {
    language,
  } = useLanguage();

  const text =
    language === "fa"
      ? {
          eyebrow: "یادگیری با Uniqe",
          titleFirst: "دانش بیشتر.",
          titleSecond: "امکان‌های بیشتر.",
          description:
            "USchool برای رشد طراحی شده است. مسیرهای یادگیری، منابع آموزشی و تجربه‌های کاربردی می‌توانند به‌مرور بخشی از اکوسیستم شوند.",
          lab: "مشاهده LAB",
          back: "بازگشت به Uniqe",
        }
      : {
          eyebrow: "Learn with Uniqe",
          titleFirst: "More knowledge.",
          titleSecond: "More possibilities.",
          description:
            "USchool is designed to grow. Learning paths, educational resources and practical experiences can become part of the ecosystem over time.",
          lab: "Explore LAB",
          back: "Back to Uniqe",
        };

  return (
    <section className="uschool-cta section">
      <Container>
        <Reveal animation="scale">
          <div className="uschool-cta-card">
            <div className="uschool-cta-mark">
              U
            </div>

            <div className="uschool-cta-content">
              <span className="section-eyebrow">
                {text.eyebrow}
              </span>

              <h2>
                {text.titleFirst}
                <br />
                {text.titleSecond}
              </h2>

              <p>
                {text.description}
              </p>

              <div className="uschool-cta-actions">
                <Button href="/lab">
                  {text.lab}
                </Button>

                <Button
                  href="/"
                  variant="secondary"
                >
                  {text.back}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}