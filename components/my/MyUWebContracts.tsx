import Link from "next/link";

import type {
  MyUContractSummary,
} from "@/lib/my-u/types";

type Props = {
  contracts: MyUContractSummary[];
};

export default function MyUWebContracts({
  contracts,
}: Props) {
  return (
    <section className="my-uweb-panel">
      <div className="my-uweb-panel-header">
        <div>
          <span className="section-eyebrow">
            Contracts
          </span>

          <h2>
            قراردادهای من
          </h2>
        </div>

        <Link
          href="/my/contracts"
          className="my-uweb-panel-link"
        >
          مشاهده همه
          <span>←</span>
        </Link>
      </div>

      {contracts.length === 0 ? (
        <div className="my-uweb-empty">
          هنوز قراردادی برای نمایش وجود ندارد.
        </div>
      ) : (
        <div className="my-uweb-contract-list">
          {contracts.map(
            (contract) => (
              <Link
                key={contract.id}
                href={contract.href}
                className="my-uweb-contract-item"
              >
                <div>
                  <span className="my-uweb-project-number">
                    {contract.projectNumber}
                  </span>

                  <h3>
                    {contract.title}
                  </h3>

                  <p>
                    {contract.typeLabel}
                  </p>
                </div>

                <span className="my-uweb-status my-uweb-status-signed">
                  {contract.statusLabel}
                </span>
              </Link>
            ),
          )}
        </div>
      )}
    </section>
  );
}