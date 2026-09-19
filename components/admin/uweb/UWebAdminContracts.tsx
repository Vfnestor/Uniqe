import Link from "next/link";

import type {
  UWebAdminContract,
} from "@/lib/uweb/admin-data";

type Props = {
  contracts: UWebAdminContract[];
};

export default function UWebAdminContracts({
  contracts,
}: Props) {
  return (
    <section className="uweb-admin-panel">
      <div className="uweb-admin-panel-header">
        <div>
          <span className="section-eyebrow">
            Contracts
          </span>

          <h2>
            قراردادها
          </h2>
        </div>

        <Link
          href="/admin/uweb/contracts"
          className="uweb-admin-text-link"
        >
          همه قراردادها
          <span>←</span>
        </Link>
      </div>

      <div className="uweb-admin-list">
        {contracts.map(
          (contract) => (
            <Link
              key={contract.id}
              href={`/uweb/contracts/${contract.projectId}`}
              className="uweb-admin-list-item uweb-admin-link-item"
            >
              <div>
                <span className="uweb-admin-muted">
                  {contract.projectNumber}
                </span>

                <h3>
                  {contract.projectTitle}
                </h3>

                <p>
                  {contract.type}
                </p>
              </div>

              <div className="uweb-admin-list-side">
                <span className="uweb-admin-badge">
                  {contract.status}
                </span>

                <small>
                  {contract.professionalName}
                </small>
              </div>
            </Link>
          ),
        )}
      </div>
    </section>
  );
}