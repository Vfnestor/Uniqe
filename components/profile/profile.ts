export type ProfilePreference = {
  id: string;
  name: string;
  description: string;
  value: string;
  icon: string;
};

export type ProfileStat = {
  id: string;
  label: string;
  value: string;
};

export const profileStats: ProfileStat[] = [
  {
    id: "joined",
    label: "Member since",
    value: "2026",
  },
  {
    id: "activity",
    label: "Activity",
    value: "03",
  },
  {
    id: "services",
    label: "Connected layers",
    value: "04",
  },
];

export const profilePreferences: ProfilePreference[] = [
  {
    id: "theme",
    name: "Appearance",
    description:
      "Control how the Uniqe interface looks.",
    value: "System",
    icon: "◐",
  },
  {
    id: "language",
    name: "Language",
    description:
      "Choose the language used across Uniqe.",
    value: "English",
    icon: "文",
  },
  {
    id: "notifications",
    name: "Notifications",
    description:
      "Manage future notifications and updates.",
    value: "Enabled",
    icon: "◇",
  },
];