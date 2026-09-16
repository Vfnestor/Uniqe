export type ActivityType =
  | "explore"
  | "visit"
  | "project"
  | "system";

export type ActivityItem = {
  id: string;
  type: ActivityType;
  typeLabel: string;
  title: string;
  description: string;
  time: string;
  source: string;
  href: string;
  icon: string;
};

export const activityItems: ActivityItem[] = [
  {
    id: "activity-01",
    type: "explore",
    typeLabel: "Explore",
    title: "Explored UApps",
    description:
      "Visited the UApps application hub and explored available applications.",
    time: "Recently",
    source: "UApps",
    href: "/uapps",
    icon: "◈",
  },
  {
    id: "activity-02",
    type: "explore",
    typeLabel: "Explore",
    title: "Explored UWeb",
    description:
      "Visited the UWeb hub and discovered digital projects.",
    time: "Recently",
    source: "UWeb",
    href: "/uweb",
    icon: "◇",
  },
  {
    id: "activity-03",
    type: "visit",
    typeLabel: "Visit",
    title: "Visited UShop",
    description:
      "Explored the future commerce layer of the Uniqe ecosystem.",
    time: "Recently",
    source: "UShop",
    href: "/ushop",
    icon: "□",
  },
  {
    id: "activity-04",
    type: "visit",
    typeLabel: "Visit",
    title: "Visited USchool",
    description:
      "Explored future learning paths and educational experiences.",
    time: "Recently",
    source: "USchool",
    href: "/uschool",
    icon: "✦",
  },
  {
    id: "activity-05",
    type: "explore",
    typeLabel: "Explore",
    title: "Explored LAB",
    description:
      "Visited the experimental layer of Uniqe.",
    time: "Recently",
    source: "LAB",
    href: "/lab",
    icon: "✧",
  },
  {
    id: "activity-06",
    type: "system",
    typeLabel: "System",
    title: "Opened My U",
    description:
      "Accessed your personal space inside the Uniqe ecosystem.",
    time: "Recently",
    source: "My U",
    href: "/my-u",
    icon: "U",
  },
];

export const activityFilters = [
  {
    id: "all",
    label: "All Activity",
  },
  {
    id: "explore",
    label: "Explore",
  },
  {
    id: "visit",
    label: "Visits",
  },
  {
    id: "project",
    label: "Projects",
  },
  {
    id: "system",
    label: "System",
  },
] as const;