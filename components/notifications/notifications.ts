export const notificationFilters = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "unread",
    label: "Unread",
  },
  {
    id: "system",
    label: "System",
  },
  {
    id: "uapps",
    label: "UApps",
  },
  {
    id: "uweb",
    label: "UWeb",
  },
  {
    id: "ushop",
    label: "UShop",
  },
  {
    id: "uschool",
    label: "USchool",
  },
  {
    id: "ucore",
    label: "UCore",
  },
  {
    id: "lab",
    label: "LAB",
  },
] as const;

export type NotificationFilterId =
  (typeof notificationFilters)[number]["id"];