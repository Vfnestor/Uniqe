import type {
  UWebContractParty,
} from "@/lib/uweb/types";

type Props = {
  parties: UWebContractParty[];
};

const roleLabels: Record<
  UWebContractParty["role"],
  string
> = {
  client: "کارفرما",
  professional: "متخصص اجرا",
  owner: "مدیریت UWeb",
};

export default function UWebContractParties({
  parties,
}: Props) {
  return (
    <section className="uweb-contract-parties">
      <div className="uweb-contract-section-heading">
        <span className="section-eyebrow">
          Contract Parties
        </span>

        <h2>
          طرف‌های قرارداد
        </h2>
      </div>

      <div className="uweb-contract-party-list">
        {parties.map((party) => (
          <div
            key={party.id}
            className="uweb-contract-party"
          >
            <div className="uweb-contract-party-avatar">
              {party.role === "client"
                ? "C"
                : party.role ===
                    "professional"
                  ? "P"
                  : "U"}
            </div>

            <div className="uweb-contract-party-info">
              <strong>
                {roleLabels[party.role]}
              </strong>

              <span>
                {party.userId}
              </span>
            </div>

            <div
              className={
                party.status === "signed"
                  ? "uweb-contract-party-signed"
                  : "uweb-contract-party-pending"
              }
            >
              {party.status === "signed"
                ? "✓ امضا شده"
                : "در انتظار امضا"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}