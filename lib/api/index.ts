export {
  apiClient,
  ApiError,
} from "./client";

export {
  apiConfig,
} from "./config";

export {
  apiEndpoints,
} from "./endpoints";

export {
  getAccount,
  updateProfile,
  updatePreferences,
} from "./account";

export type {
  AccountUser,
  AccountProfile,
  AccountPreferences,
  AccountResponse,
  UpdateProfileInput,
  UpdatePreferencesInput,
} from "./account";

export {
  getActivity,
} from "./activity";

export type {
  ActivityRecord,
  ActivityResponse,
} from "./activity";

export {
  getFavorites,
  createFavorite,
  deleteFavorite,
} from "./favorites";

export type {
  FavoriteRecord,
  FavoriteCategory,
  CreateFavoriteInput,
} from "./favorites";

export {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  mapNotification,
} from "./notifications";

export type {
  NotificationRecord,
  NotificationItemData,
  NotificationCategory,
} from "./notifications";

export {
  searchUniqe,
} from "./search";

export type {
  SearchResult,
  SearchResponse,
  SearchResultType,
  SearchOptions,
} from "./search";

export type {
  ApiResponse,
  ApiErrorBody,
  ApiRequestOptions,
} from "./types";