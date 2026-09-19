import {
  demoProfessionals,
  demoSkills,
} from "./mock-data";

import {
  getUWebOpportunity,
} from "./opportunity-data";

import {
  rankUWebProfessionals,
} from "./matching-engine";

export function getUWebMatchingResults(
  opportunityId: string,
) {
  const opportunity =
    getUWebOpportunity(
      opportunityId,
    );

  if (!opportunity) {
    return undefined;
  }

  const results =
    rankUWebProfessionals(
      opportunity.project,
      demoProfessionals,
    );

  return {
    opportunity,
    project: opportunity.project,
    professionals: results,
    skills: demoSkills,
  };
}