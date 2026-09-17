import "@/components/admin/admin.css";

import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Uniqe Admin",
  description:
    "Central administration panel for the Uniqe ecosystem.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}
