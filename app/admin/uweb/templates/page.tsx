import "@/components/admin/uweb/uweb-admin.css";

import UWebAdminCatalog from "@/components/admin/uweb/UWebAdminCatalog";

import {
  getUWebAdminTemplates,
} from "@/lib/uweb/admin-data";

export default function UWebAdminTemplatesPage() {
  const templates =
    getUWebAdminTemplates();

  return (
    <main className="uweb-admin-page">
      <UWebAdminCatalog
        title="قالب‌های پروژه"
        eyebrow="Templates"
        items={templates}
      />
    </main>
  );
}