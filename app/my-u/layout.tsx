import type {
  ReactNode,
} from "react";

import RequireAuth from "@/components/auth/RequireAuth";

export default function MyULayout({
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