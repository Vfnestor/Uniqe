import type {
  UWebContract,
  UWebContractPartyRole,
  UWebContractStatus,
  UWebContractType,
} from "./types";

export const UWEB_CONTRACT_VERSION = "1.0";

export const UWEB_PROFESSIONAL_AGREEMENT_TITLE =
  "UWeb Professional Agreement";

export const UWEB_THREE_PARTY_AGREEMENT_TITLE =
  "UWeb Three-Party Project Agreement";

export function createContractDraft(input: {
  id: string;
  projectId: string;

  type: UWebContractType;

  clientId: string;
  professionalId: string;
  ownerId: string;

  content: string;

  createdAt: string;
}): UWebContract {
  const roles: Array<
    [UWebContractPartyRole, string]
  > =
    input.type ===
    "professional_agreement"
      ? [
          [
            "professional",
            input.professionalId,
          ],
        ]
      : [
          [
            "client",
            input.clientId,
          ],
          [
            "professional",
            input.professionalId,
          ],
          [
            "owner",
            input.ownerId,
          ],
        ];

  const parties =
    roles.map(
      ([role, userId], index) => ({
        id: `${input.id}-party-${index + 1}`,

        contractId: input.id,

        userId,
        role,

        status:
          "pending" as const,
      }),
    );

  return {
    id: input.id,

    projectId:
      input.projectId,

    type: input.type,

    version:
      UWEB_CONTRACT_VERSION,

    title:
      input.type ===
      "professional_agreement"
        ? UWEB_PROFESSIONAL_AGREEMENT_TITLE
        : UWEB_THREE_PARTY_AGREEMENT_TITLE,

    content:
      input.content,

    status:
      "pending_signatures" satisfies UWebContractStatus,

    parties,

    createdAt:
      input.createdAt,

    updatedAt:
      input.createdAt,
  };
}

export function isContractFullySigned(
  contract: UWebContract,
): boolean {
  return (
    contract.parties.length > 0 &&
    contract.parties.every(
      (party) =>
        party.status === "signed",
    )
  );
}

export function getContractStatus(
  contract: UWebContract,
): UWebContractStatus {
  if (
    isContractFullySigned(contract)
  ) {
    return "signed";
  }

  const signedCount =
    contract.parties.filter(
      (party) =>
        party.status === "signed",
    ).length;

  if (signedCount > 0) {
    return "partially_signed";
  }

  return "pending_signatures";
}