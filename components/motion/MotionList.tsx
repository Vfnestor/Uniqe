"use client";

import type { ReactNode } from "react";

import { MotionGroup } from "./Motion";

type MotionListProps = {
  children: ReactNode;
  className?: string;
};

export default function MotionList({
  children,
  className = "",
}: MotionListProps) {
  return (
    <MotionGroup
      animation="fade-up"
      as="div"
      className={`motion-list ${className}`.trim()}
    >
      {children}
    </MotionGroup>
  );
}