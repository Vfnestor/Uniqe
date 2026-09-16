export type ExperimentCategory =
  | "prototype"
  | "research"
  | "technology"
  | "concept";

export type ExperimentStatus =
  | "active"
  | "development"
  | "concept";

export type LabExperiment = {
  id: string;
  name: string;
  category: ExperimentCategory;
  categoryLabel: string;
  description: string;
  status: ExperimentStatus;
  statusLabel: string;
  href: string;
  number: string;
  icon: string;
  featured?: boolean;
};

export const labExperiments: LabExperiment[] = [
  {
    id: "future-interface",
    name: "Future Interface",
    category: "prototype",
    categoryLabel: "Prototype",
    description:
      "Experimental interface concepts exploring new ways of interacting with digital products and experiences.",
    status: "active",
    statusLabel: "Active",
    href: "/lab",
    number: "01",
    icon: "◈",
    featured: true,
  },
  {
    id: "ai-experiments",
    name: "AI Experiments",
    category: "research",
    categoryLabel: "Research",
    description:
      "Explorations around artificial intelligence, intelligent systems and new possibilities for digital products.",
    status: "development",
    statusLabel: "In Development",
    href: "/lab",
    number: "02",
    icon: "◇",
    featured: true,
  },
  {
    id: "new-technology",
    name: "New Technology",
    category: "technology",
    categoryLabel: "Technology",
    description:
      "Experimental work investigating emerging technologies and how they can become useful parts of Uniqe.",
    status: "concept",
    statusLabel: "Concept",
    href: "/lab",
    number: "03",
    icon: "↗",
  },
  {
    id: "open-concepts",
    name: "Open Concepts",
    category: "concept",
    categoryLabel: "Concept",
    description:
      "A space for early ideas, unconventional concepts and experiments that may evolve into future Uniqe projects.",
    status: "concept",
    statusLabel: "Concept",
    href: "/lab",
    number: "04",
    icon: "✦",
  },
];