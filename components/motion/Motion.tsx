"use client";

import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type MotionAnimation =
  | "fade-in"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-in"
  | "hover-lift"
  | "hover-scale"
  | "press"
  | "glow"
  | "shimmer"
  | "pulse"
  | "float";

type MotionProps = {
  children: ReactNode;
  animation?: MotionAnimation;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "span" | "li";
} & Omit<HTMLAttributes<HTMLElement>, "children">;

export function Motion({
  children,
  animation = "fade-up",
  delay,
  className = "",
  as = "div",
  style,
  ...props
}: MotionProps) {
  const Component = as;

  const motionStyle: CSSProperties = {
    ...style,
    ...(delay !== undefined
      ? {
          animationDelay: `${delay}ms`,
        }
      : {}),
  };

  return (
    <Component
      className={`animate-${animation} ${className}`.trim()}
      style={motionStyle}
      {...props}
    >
      {children}
    </Component>
  );
}

type MotionGroupProps = {
  children: ReactNode;
  animation?: Exclude<
    MotionAnimation,
    | "hover-lift"
    | "hover-scale"
    | "press"
    | "glow"
    | "shimmer"
    | "pulse"
    | "float"
  >;
  className?: string;
  as?: "div" | "section" | "article" | "ul" | "ol";
};

export function MotionGroup({
  children,
  animation = "fade-up",
  className = "",
  as = "div",
}: MotionGroupProps) {
  const Component = as;

  return (
    <Component
      className={`animation-group motion-group motion-group-${animation} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}