import type {
  UWebPlatform,
  UWebProfessionalProfile,
  UWebProject,
  UWebSkill,
} from "./types";

export type UWebMatchResult = {
  professional: UWebProfessionalProfile;

  requiredSkills: number;
  matchedSkills: number;

  platformMatch: boolean;
  availabilityMatch: boolean;

  score: number;
};

function skillWeight(
  priority:
    UWebProject["requiredSkills"][number]["priority"],
) {
  return priority === "required" ? 2 : 1;
}

export function calculateProfessionalMatch(
  project: UWebProject,
  professional: UWebProfessionalProfile,
): UWebMatchResult {
  const requiredSkills =
    project.requiredSkills.length;

  const matchedSkills =
    project.requiredSkills.reduce(
      (count, requirement) => {
        return (
          count +
          (professional.skillIds.includes(
            requirement.skillId,
          )
            ? 1
            : 0)
        );
      },
      0,
    );

  const totalSkillWeight =
    project.requiredSkills.reduce(
      (total, requirement) =>
        total +
        skillWeight(requirement.priority),
      0,
    );

  const matchedSkillWeight =
    project.requiredSkills.reduce(
      (total, requirement) => {
        if (
          !professional.skillIds.includes(
            requirement.skillId,
          )
        ) {
          return total;
        }

        return (
          total +
          skillWeight(requirement.priority)
        );
      },
      0,
    );

  const skillScore =
    totalSkillWeight === 0
      ? 0
      : (matchedSkillWeight /
          totalSkillWeight) *
        70;

  const platformMatch =
    project.platform === "unknown" ||
    project.platform === "custom" ||
    professional.platforms.includes(
      project.platform,
    );

  const platformScore =
    platformMatch ? 20 : 0;

  const availabilityMatch =
    professional.availability ===
    "available";

  const availabilityScore =
    availabilityMatch ? 10 : 0;

  return {
    professional,

    requiredSkills,
    matchedSkills,

    platformMatch,
    availabilityMatch,

    score: Math.round(
      skillScore +
        platformScore +
        availabilityScore,
    ),
  };
}

export function rankProfessionals(
  project: UWebProject,
  professionals: UWebProfessionalProfile[],
): UWebMatchResult[] {
  return professionals
    .filter(
      (professional) =>
        professional.status === "active",
    )
    .map((professional) =>
      calculateProfessionalMatch(
        project,
        professional,
      ),
    )
    .sort(
      (a, b) =>
        b.score - a.score,
    );
}

export function getMatchingSkills(
  project: UWebProject,
  skills: UWebSkill[],
): UWebSkill[] {
  const ids = new Set(
    project.requiredSkills.map(
      (skill) => skill.skillId,
    ),
  );

  return skills.filter(
    (skill) => ids.has(skill.id),
  );
}

export function isSupportedPlatform(
  platform: UWebPlatform,
  supportedPlatforms: UWebPlatform[],
): boolean {
  return (
    platform === "unknown" ||
    supportedPlatforms.includes(
      platform,
    )
  );
}