export const apiEndpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    session: "/auth/session",
    logout: "/auth/logout",
  },

  user: {
    me: "/users/me",
    profile: "/users/me/profile",
  },

  activity: {
    list: "/activity",
  },

  notifications: {
    list: "/notifications",
    read: "/notifications/read",
  },

  favorites: {
    list: "/favorites",
    create: "/favorites",
    remove: "/favorites",
  },

  search: {
    query: "/search",
  },
} as const;