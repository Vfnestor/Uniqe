export const apiEndpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    session: "/auth/session",
    logout: "/auth/logout",
  },

  user: {
    me: "/users/me",
    profile: "/users/me/profile",
    preferences: "/users/me/preferences",
  },

  activity: {
    list: "/activity",
  },

  notifications: {
    list: "/notifications",

    read: "/notifications/read",

    readOne: (id: string) =>
      `/notifications/${encodeURIComponent(id)}/read`,
  },

  favorites: {
    list: "/favorites",

    create: "/favorites",

    remove: (targetId: string) =>
      `/favorites/${encodeURIComponent(targetId)}`,
  },

  search: {
    query: "/search",
  },
} as const;
