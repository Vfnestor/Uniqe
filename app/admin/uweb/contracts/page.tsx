import "@/components/admin/uweb/uweb-admin.css";

import UWebAdminContracts from "@/components/admin/uweb/UWebAdminContracts";

import {
  getUWebAdminContracts,
} from "@/lib/uweb/admin-data";

export default function UWebAdminContractsPage() {
  const contracts =
    getUWebAdminContracts();

  return (
    <main className="uweb-admin-page">
      <UWebAdminContracts
        contracts={contracts}
      />
    </main>
  );
}