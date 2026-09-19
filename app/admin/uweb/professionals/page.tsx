import "@/components/admin/uweb/uweb-admin.css";

import UWebAdminProfessionals from "@/components/admin/uweb/UWebAdminProfessionals";

import {
  getUWebAdminProfessionals,
} from "@/lib/uweb/admin-data";

export default function UWebAdminProfessionalsPage() {
  const professionals =
    getUWebAdminProfessionals();

  return (
    <main className="uweb-admin-page">
      <UWebAdminProfessionals
        professionals={
          professionals
        }
      />
    </main>
  );
}