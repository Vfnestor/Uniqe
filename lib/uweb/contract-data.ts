import type {
  UWebContract,
  UWebContractParty,
  UWebProject,
} from "./types";

import {
  demoProfessionals,
} from "./mock-data";

import {
  getUWebOpportunity,
} from "./opportunity-data";

import {
  UWEB_CONTRACT_VERSION,
  createContractDraft,
} from "./contracts";

export type UWebContractView = {
  contract: UWebContract;
  project: UWebProject;
};

const demoClientId = "demo-client";

const demoOwnerId = "uniqe-owner";

const professionalId =
  demoProfessionals[0]?.userId ??
  "professional-demo-01";

function buildParties(
  contractId: string,
): UWebContractParty[] {
  return [
    {
      id: `${contractId}-client`,
      contractId,
      userId: demoClientId,
      role: "client",
      status: "pending",
    },
    {
      id: `${contractId}-professional`,
      contractId,
      userId: professionalId,
      role: "professional",
      status: "pending",
    },
    {
      id: `${contractId}-owner`,
      contractId,
      userId: demoOwnerId,
      role: "owner",
      status: "pending",
    },
  ];
}

function buildContract(
  project: UWebProject,
): UWebContract {
  const contractId =
    `uweb-contract-${project.id}`;

  const baseContract =
    createContractDraft({
      id: contractId,
      projectId: project.id,
      type:
        "three_party_project_agreement",
      clientId: demoClientId,
      professionalId,
      ownerId: demoOwnerId,
      content:
        "قرارداد سه‌طرفه پروژه UWeb.",
      createdAt:
        "2026-09-19T10:00:00.000Z",
    });

  return {
    ...baseContract,

    id: contractId,

    version:
      UWEB_CONTRACT_VERSION,

    parties:
      buildParties(contractId),

    createdAt:
      "2026-09-19T10:00:00.000Z",

    updatedAt:
      "2026-09-19T10:00:00.000Z",
  };
}

export function getUWebContract(
  id: string,
): UWebContractView | undefined {
  const opportunity =
    getUWebOpportunity(id);

  if (!opportunity) {
    return undefined;
  }

  const project =
    opportunity.project;

  return {
    contract:
      buildContract(project),

    project,
  };
}

export function signUWebContractParty(
  contract: UWebContract,
  userId: string,
): UWebContract {
  return {
    ...contract,

    parties: contract.parties.map(
      (party) =>
        party.userId === userId
          ? {
              ...party,
              status: "signed",
              signedAt:
                new Date().toISOString(),
            }
          : party,
    ),

    updatedAt:
      new Date().toISOString(),
  };
}