"use client";

import type { ReactNode } from "react";

import { MotionGroup } from "./Motion";

type StaggerAnimation =
  | "fade-in"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-in";

type StaggerGroupProps = {
  children: ReactNode;
  animation?: StaggerAnimation;
  className?: string;
  delay?: number;
  step?: number;
};

export default function StaggerGroup({
  children,
  animation = "fade-up",
  className = "",
  delay = 60,
  step = 60,
}: StaggerGroupProps) {
  return (
    <MotionGroup
      animation={animation}
      className={`stagger-group stagger-delay-${delay} stagger-step-${step} ${className}`.trim()}
    >
      {children}
    </MotionGroup>
  );
}