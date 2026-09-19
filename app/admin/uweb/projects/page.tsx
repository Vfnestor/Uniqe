import "@/components/admin/uweb/uweb-admin.css";

import UWebAdminProjects from "@/components/admin/uweb/UWebAdminProjects";

import {
  getUWebAdminProjects,
} from "@/lib/uweb/admin-data";

export default function UWebAdminProjectsPage() {
  const projects =
    getUWebAdminProjects();

  return (
    <main className="uweb-admin-page">
      <UWebAdminProjects
        projects={projects}
      />
    </main>
  );
}