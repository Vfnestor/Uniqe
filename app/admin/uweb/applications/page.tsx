import "@/components/admin/uweb/uweb-admin.css";

import UWebAdminApplications from "@/components/admin/uweb/UWebAdminApplications";

import {
  getUWebAdminApplications,
} from "@/lib/uweb/admin-data";

export default function UWebAdminApplicationsPage() {
  const applications =
    getUWebAdminApplications();

  return (
    <main className="uweb-admin-page">
      <UWebAdminApplications
        applications={
          applications
        }
      />
    </main>
  );
}