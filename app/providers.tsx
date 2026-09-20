"use client";

import type { ReactNode } from "react";

import AuthProvider from "@/components/auth/AuthProvider";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({
  children,
}: ProvidersProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}