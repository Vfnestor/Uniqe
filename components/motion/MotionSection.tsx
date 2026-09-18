"use client";

import type { ReactNode } from "react";

import { Motion } from "./Motion";

type MotionSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function MotionSection({
  children,
  className = "",
  delay,
}: MotionSectionProps) {
  return (
    <Motion
      as="section"
      animation="fade-up"
      delay={delay}
      className={`motion-section ${className}`.trim()}
    >
      {children}
    </Motion>
  );
}