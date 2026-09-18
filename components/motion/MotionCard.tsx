"use client";

import type { ReactNode } from "react";

import { Motion } from "./Motion";

type MotionCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function MotionCard({
  children,
  className = "",
  delay,
}: MotionCardProps) {
  return (
    <Motion
      animation="fade-up"
      delay={delay}
      className={`motion-card ${className}`.trim()}
    >
      {children}
    </Motion>
  );
}