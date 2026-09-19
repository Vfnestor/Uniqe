import "@/components/admin/uweb/uweb-admin.css";

import UWebAdminClients from "@/components/admin/uweb/UWebAdminClients";

import {
  getUWebAdminClients,
} from "@/lib/uweb/admin-data";

export default function UWebAdminClientsPage() {
  const clients =
    getUWebAdminClients();

  return (
    <main className="uweb-admin-page">
      <UWebAdminClients
        clients={clients}
      />
    </main>
  );
}