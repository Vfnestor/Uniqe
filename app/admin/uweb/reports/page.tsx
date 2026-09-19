import "@/components/admin/uweb/uweb-admin.css";

import UWebAdminReports from "@/components/admin/uweb/UWebAdminReports";

import {
  getUWebAdminStats,
} from "@/lib/uweb/admin-data";

export default function UWebAdminReportsPage() {
  const stats =
    getUWebAdminStats();

  return (
    <main className="uweb-admin-page">
      <UWebAdminReports
        stats={stats}
      />
    </main>
  );
}