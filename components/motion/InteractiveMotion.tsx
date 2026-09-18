"use client";

import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

type InteractiveMotionProps = {
  children: ReactNode;
  className?: string;
  variant?: "lift" | "scale" | "press" | "glow";
  as?: "div" | "button" | "article" | "a";
} & Omit<HTMLAttributes<HTMLElement>, "children"> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export default function InteractiveMotion({
  children,
  className = "",
  variant = "press",
  as = "div",
  ...props
}: InteractiveMotionProps) {
  const Component = as;

  return (
    <Component
      className={`animate-${variant} motion-interactive ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}