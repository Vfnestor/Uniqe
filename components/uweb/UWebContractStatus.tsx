import type {
  UWebContractStatus,
} from "@/lib/uweb/types";

type Props = {
  status: UWebContractStatus;
};

const labels: Record<
  UWebContractStatus,
  string
> = {
  draft: "پیش‌نویس",
  pending_signatures:
    "در انتظار امضا",
  partially_signed:
    "بخشی از امضاها تکمیل شده",
  signed:
    "قرارداد امضا شده",
  void:
    "باطل شده",
};

export default function UWebContractStatus({
  status,
}: Props) {
  return (
    <span
      className={`uweb-contract-status uweb-contract-status-${status}`}
    >
      <span className="uweb-contract-status-dot" />

      {labels[status]}
    </span>
  );
}
