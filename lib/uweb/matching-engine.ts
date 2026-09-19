import type {
  UWebExperienceLevel,
  UWebProfessionalProfile,
  UWebProject,
} from "./types";

export type UWebMatchingBreakdown = {
  requiredSkillsScore: number;
  preferredSkillsScore: number;
  platformScore: number;
  experienceScore: number;
  availabilityScore: number;
  totalScore: number;
};

export type UWebProfessionalMatch = {
  professional: UWebProfessionalProfile;

  score: number;

  matchedRequiredSkills: string[];
  missingRequiredSkills: string[];
  matchedPreferredSkills: string[];

  platformMatch: boolean;
  experienceMatch: boolean;
  availabilityMatch: boolean;

  breakdown: UWebMatchingBreakdown;
};

const WEIGHTS = {
  requiredSkills: 50,
  preferredSkills: 10,
  platform: 15,
  experience: 15,
  availability: 10,
};

const EXPERIENCE_RANK: Record<
  UWebExperienceLevel,
  number
> = {
  beginner: 1,
  intermediate: 2,
  professional: 3,
  expert: 4,
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function calculateSkillScore(
  project: UWebProject,
  professional: UWebProfessionalProfile,
) {
  const required = project.requiredSkills.filter(
    (skill) => skill.priority === "required",
  );

  const preferred = project.requiredSkills.filter(
    (skill) => skill.priority === "preferred",
  );

  const matchedRequiredSkills =
    required
      .filter((skill) =>
        professional.skillIds.includes(
          skill.skillId,
        ),
      )
      .map((skill) => skill.skillId);

  const missingRequiredSkills =
    required
      .filter(
        (skill) =>
          !professional.skillIds.includes(
            skill.skillId,
          ),
      )
      .map((skill) => skill.skillId);

  const matchedPreferredSkills =
    preferred
      .filter((skill) =>
        professional.skillIds.includes(
          skill.skillId,
        ),
      )
      .map((skill) => skill.skillId);

  const requiredScore =
    required.length === 0
      ? 100
      : (matchedRequiredSkills.length /
          required.length) *
        100;

  const preferredScore =
    preferred.length === 0
      ? 100
      : (matchedPreferredSkills.length /
          preferred.length) *
        100;

  return {
    requiredScore,
    preferredScore,
    matchedRequiredSkills,
    missingRequiredSkills,
    matchedPreferredSkills,
  };
}

function calculatePlatformScore(
  project: UWebProject,
  professional: UWebProfessionalProfile,
) {
  if (project.platform === "unknown") {
    return {
      match: true,
      score: 100,
    };
  }

  const match =
    professional.platforms.includes(
      project.platform,
    );

  return {
    match,
    score: match ? 100 : 0,
  };
}

function calculateExperienceScore(
  project: UWebProject,
  professional: UWebProfessionalProfile,
) {
  const requiredLevels =
    project.requiredSkills.map(
      (skill) =>
        EXPERIENCE_RANK[
          skill.requiredLevel
        ],
    );

  if (requiredLevels.length === 0) {
    return {
      match: true,
      score: 100,
    };
  }

  const requiredLevel = Math.max(
    ...requiredLevels,
  );

  const professionalLevel =
    EXPERIENCE_RANK[
      professional.experienceLevel
    ];

  const match =
    professionalLevel >= requiredLevel;

  if (match) {
    return {
      match: true,
      score: 100,
    };
  }

  const difference =
    requiredLevel - professionalLevel;

  return {
    match: false,
    score:
      difference === 1
        ? 50
        : 0,
  };
}

function calculateAvailabilityScore(
  professional: UWebProfessionalProfile,
) {
  if (
    professional.availability ===
    "available"
  ) {
    return {
      match: true,
      score: 100,
    };
  }

  if (
    professional.availability === "busy"
  ) {
    return {
      match: false,
      score: 40,
    };
  }

  return {
    match: false,
    score: 0,
  };
}

export function calculateUWebProfessionalMatch(
  project: UWebProject,
  professional: UWebProfessionalProfile,
): UWebProfessionalMatch {
  const skills = calculateSkillScore(
    project,
    professional,
  );

  const platform =
    calculatePlatformScore(
      project,
      professional,
    );

  const experience =
    calculateExperienceScore(
      project,
      professional,
    );

  const availability =
    calculateAvailabilityScore(
      professional,
    );

  const requiredSkillsScore =
    (skills.requiredScore / 100) *
    WEIGHTS.requiredSkills;

  const preferredSkillsScore =
    (skills.preferredScore / 100) *
    WEIGHTS.preferredSkills;

  const platformScore =
    (platform.score / 100) *
    WEIGHTS.platform;

  const experienceScore =
    (experience.score / 100) *
    WEIGHTS.experience;

  const availabilityScore =
    (availability.score / 100) *
    WEIGHTS.availability;

  const totalScore = clamp(
    Math.round(
      requiredSkillsScore +
        preferredSkillsScore +
        platformScore +
        experienceScore +
        availabilityScore,
    ),
  );

  return {
    professional,

    score: totalScore,

    matchedRequiredSkills:
      skills.matchedRequiredSkills,

    missingRequiredSkills:
      skills.missingRequiredSkills,

    matchedPreferredSkills:
      skills.matchedPreferredSkills,

    platformMatch:
      platform.match,

    experienceMatch:
      experience.match,

    availabilityMatch:
      availability.match,

    breakdown: {
      requiredSkillsScore: Math.round(
        requiredSkillsScore,
      ),
      preferredSkillsScore: Math.round(
        preferredSkillsScore,
      ),
      platformScore: Math.round(
        platformScore,
      ),
      experienceScore: Math.round(
        experienceScore,
      ),
      availabilityScore: Math.round(
        availabilityScore,
      ),
      totalScore,
    },
  };
}

export function rankUWebProfessionals(
  project: UWebProject,
  professionals: UWebProfessionalProfile[],
): UWebProfessionalMatch[] {
  return professionals
    .filter(
      (professional) =>
        professional.status ===
        "active",
    )
    .map((professional) =>
      calculateUWebProfessionalMatch(
        project,
        professional,
      ),
    )
    .sort(
      (a, b) =>
        b.score - a.score,
    );
}