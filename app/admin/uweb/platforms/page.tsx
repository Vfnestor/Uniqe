import "@/components/admin/uweb/uweb-admin.css";

import UWebAdminCatalog from "@/components/admin/uweb/UWebAdminCatalog";

import {
  getUWebAdminPlatforms,
} from "@/lib/uweb/admin-data";

export default function UWebAdminPlatformsPage() {
  const platforms =
    getUWebAdminPlatforms();

  return (
    <main className="uweb-admin-page">
      <UWebAdminCatalog
        title="پلتفرم‌ها"
        eyebrow="Platforms"
        items={platforms}
      />
    </main>
  );
}