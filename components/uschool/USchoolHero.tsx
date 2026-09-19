"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { useLanguage } from "@/components/i18n/LanguageProvider";

export default function USchoolHero() {
  const {
    language,
  } = useLanguage();

  const text =
    language === "fa"
      ? {
          eyebrow: "Uniqe / USchool",
          titleFirst: "یاد بگیر",
          titleSecond: "برای",
          titleHighlight: "امکان‌ها.",
          description:
            "USchool لایه آموزشی Uniqe است؛ بستری در حال رشد برای دانش، مهارت، یادگیری کاربردی و کشف مداوم.",
          explore: "مشاهده USchool",
          lab: "ورود به LAB",
          learn: "یادگیری",
          build: "ساختن",
          grow: "رشد",
        }
      : {
          eyebrow: "Uniqe / USchool",
          titleFirst: "Learn",
          titleSecond: "for",
          titleHighlight: "possibility.",
          description:
            "USchool is the learning layer of Uniqe — a growing educational foundation for knowledge, skills, practical learning and continuous discovery.",
          explore: "Explore USchool",
          lab: "Visit LAB",
          learn: "LEARN",
          build: "BUILD",
          grow: "GROW",
        };

  return (
    <section className="uschool-hero">
      <Container>
        <div className="uschool-hero-grid">
          <div className="uschool-hero-content">
            <Reveal animation="fade">
              <span className="section-eyebrow">
                {text.eyebrow}
              </span>
            </Reveal>

            <Reveal
              animation="up"
              delay={100}
            >
              <h1 className="uschool-hero-title">
                {text.titleFirst}
                <br />
                {text.titleSecond}{" "}
                <span>
                  {text.titleHighlight}
                </span>
              </h1>
            </Reveal>

            <Reveal
              animation="up"
              delay={180}
            >
              <p className="uschool-hero-description">
                {text.description}
              </p>
            </Reveal>

            <Reveal
              animation="up"
              delay={260}
            >
              <div className="uschool-hero-actions">
                <Button href="#courses">
                  {text.explore}
                </Button>

                <Button
                  href="/lab"
                  variant="secondary"
                >
                  {text.lab}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal
            animation="scale"
            delay={180}
          >
            <div className="uschool-hero-visual">
              <div className="uschool-hero-grid-lines" />

              <div className="uschool-hero-orbit orbit-one" />
              <div className="uschool-hero-orbit orbit-two" />
              <div className="uschool-hero-orbit orbit-three" />

              <div className="uschool-hero-core">
                <span>U</span>
              </div>

              <div className="uschool-hero-node node-one">
                ◇
              </div>

              <div className="uschool-hero-node node-two">
                □
              </div>

              <div className="uschool-hero-node node-three">
                ✦
              </div>

              <div className="uschool-hero-label label-one">
                {text.learn}
              </div>

              <div className="uschool-hero-label label-two">
                {text.build}
              </div>

              <div className="uschool-hero-label label-three">
                {text.grow}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}