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