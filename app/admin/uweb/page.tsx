import "@/components/admin/uweb/uweb-admin.css";

import UWebAdminOverview from "@/components/admin/uweb/UWebAdminOverview";
import UWebAdminProjects from "@/components/admin/uweb/UWebAdminProjects";
import UWebAdminApplications from "@/components/admin/uweb/UWebAdminApplications";
import UWebAdminProfessionals from "@/components/admin/uweb/UWebAdminProfessionals";
import UWebAdminContracts from "@/components/admin/uweb/UWebAdminContracts";

import {
  getUWebAdminStats,
  getUWebAdminProjects,
  getUWebAdminApplications,
  getUWebAdminProfessionals,
  getUWebAdminContracts,
} from "@/lib/uweb/admin-data";

export default function UWebAdminPage() {
  const stats =
    getUWebAdminStats();

  const projects =
    getUWebAdminProjects();

  const applications =
    getUWebAdminApplications();

  const professionals =
    getUWebAdminProfessionals();

  const contracts =
    getUWebAdminContracts();

  return (
    <main className="uweb-admin-page">
      <UWebAdminOverview
        stats={stats}
      />

      <UWebAdminProjects
        projects={projects}
      />

      <UWebAdminApplications
        applications={applications}
      />

      <UWebAdminProfessionals
        professionals={
          professionals
        }
      />

      <UWebAdminContracts
        contracts={contracts}
      />
    </main>
  );
}