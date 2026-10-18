import type {
  ReactNode,
} from "react";

import RequireAuth from "@/components/auth/RequireAuth";

export default function MyLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <RequireAuth allowedRoles={["user"]}>
      {children}
    </RequireAuth>
  );
}