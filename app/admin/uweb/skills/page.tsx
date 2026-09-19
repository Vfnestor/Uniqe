import "@/components/admin/uweb/uweb-admin.css";

import UWebAdminCatalog from "@/components/admin/uweb/UWebAdminCatalog";

import {
  getUWebAdminSkills,
} from "@/lib/uweb/admin-data";

export default function UWebAdminSkillsPage() {
  const skills =
    getUWebAdminSkills();

  return (
    <main className="uweb-admin-page">
      <UWebAdminCatalog
        title="مهارت‌ها"
        eyebrow="Skills"
        items={skills.map(
          (skill) => ({
            id: skill.id,
            name: skill.name,
            status: skill.status,
          }),
        )}
      />
    </main>
  );
}