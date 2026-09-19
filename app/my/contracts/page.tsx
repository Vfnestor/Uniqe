import Link from "next/link";

import "@/components/my/my-uweb.css";

import Container from "@/components/ui/Container";

import {
  getMyUWebContracts,
} from "@/lib/my-u/my-uweb-data";

import type {
  MyUContractSummary,
} from "@/lib/my-u/types";

export default function MyContractsPage() {
  const contracts: MyUContractSummary[] =
    getMyUWebContracts();

  return (
    <main className="my-uweb-page">
      <Container>
        <div className="my-uweb-breadcrumb">
          <Link href="/my-uweb">
            My U
          </Link>

          <span>←</span>

          <span>
            قراردادهای من
          </span>
        </div>

        <section className="my-uweb-panel">
          <div className="my-uweb-panel-header">
            <div>
              <span className="section-eyebrow">
                My U / Contracts
              </span>

              <h2>
                قراردادهای من
              </h2>
            </div>
          </div>

          {contracts.length === 0 ? (
            <div className="my-uweb-empty">
              هنوز قراردادی برای نمایش وجود ندارد.
            </div>
          ) : (
            <div className="my-uweb-contract-list">
              {contracts.map(
                (contract: MyUContractSummary) => (
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
      </Container>
    </main>
  );
}