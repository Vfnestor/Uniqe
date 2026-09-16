"use client";

import type {
  CSSProperties,
  ReactNode,
} from "react";

type RevealAnimation =
  | "fade"
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale";

type RevealProps = {
  children: ReactNode;
  animation?: RevealAnimation;
  delay?: number;
  className?: string;
};

export default function Reveal({
  children,
  animation = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const animationClass =
    animation === "fade"
      ? "animate-fade-in"
      : animation === "up"
        ? "animate-fade-up"
        : animation === "down"
          ? "animate-fade-down"
          : animation === "left"
            ? "animate-fade-left"
            : animation === "right"
              ? "animate-fade-right"
              : "animate-scale-in";

  const style: CSSProperties = {
    animationDelay:
      delay > 0
        ? `${delay}ms`
        : undefined,
  };

  const classes = [
    animationClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      style={style}
    >
      {children}
    </div>
  );
}