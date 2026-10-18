"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import NotificationsHero from "@/components/notifications/NotificationsHero";
import NotificationsSummary from "@/components/notifications/NotificationsSummary";
import NotificationsFilters from "@/components/notifications/NotificationsFilters";
import NotificationsList from "@/components/notifications/NotificationsList";
import NotificationsEmpty from "@/components/notifications/NotificationsEmpty";
import NotificationsCTA from "@/components/notifications/NotificationsCTA";

import type {
  NotificationItemData,
} from "@/lib/api/notifications";

import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/lib/api/notifications";

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] =
    useState("all");

  const [items, setItems] =
    useState<NotificationItemData[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [pendingIds, setPendingIds] =
    useState<string[]>([]);

  const [isMarkingAllRead, setIsMarkingAllRead] =
    useState(false);

  const loadNotifications = useCallback(
    async (showLoading = true) => {
      if (showLoading) {
        setLoading(true);
      }

      setError(null);

      try {
        const result = await getNotifications();

        setItems(result);
      } catch {
        setError(
          "Unable to load notifications. Please check your connection and sign-in status.",
        );
      } finally {
        if (showLoading) {
          setLoading(false);
        }
      }
    },
    [],
  );

  useEffect(() => {
    void loadNotifications();
  }, [loadNotifications]);

  const unreadCount = useMemo(
    () =>
      items.filter(
        (notification) => !notification.read,
      ).length,
    [items],
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") {
      return items;
    }

    if (activeFilter === "unread") {
      return items.filter(
        (notification) => !notification.read,
      );
    }

    return items.filter(
      (notification) =>
        notification.category === activeFilter,
    );
  }, [activeFilter, items]);

  const markAsRead = useCallback(
    async (id: string) => {
      const notification = items.find(
        (item) => item.id === id,
      );

      if (
        !notification ||
        notification.read ||
        pendingIds.includes(id) ||
        isMarkingAllRead
      ) {
        return;
      }

      setPendingIds((current) => [
        ...current,
        id,
      ]);

      setError(null);

      try {
        await markNotificationAsRead(id);

        setItems((current) =>
          current.map((item) =>
            item.id === id
              ? {
                  ...item,
                  read: true,
                }
              : item,
          ),
        );
      } catch {
        setError(
          "The notification status could not be saved. Please try again.",
        );
      } finally {
        setPendingIds((current) =>
          current.filter(
            (pendingId) => pendingId !== id,
          ),
        );
      }
    },
    [
      items,
      pendingIds,
      isMarkingAllRead,
    ],
  );

  const markAllAsRead = useCallback(
    async () => {
      if (
        unreadCount === 0 ||
        isMarkingAllRead ||
        pendingIds.length > 0
      ) {
        return;
      }

      setIsMarkingAllRead(true);
      setError(null);

      try {
        await markAllNotificationsAsRead();

        setItems((current) =>
          current.map((item) => ({
            ...item,
            read: true,
          })),
        );
      } catch {
        setError(
          "Unable to mark all notifications as read. Please try again.",
        );
      } finally {
        setIsMarkingAllRead(false);
      }
    },
    [
      unreadCount,
      isMarkingAllRead,
      pendingIds.length,
    ],
  );

  return (
    <main className="notifications-page">
      <NotificationsHero />

      <NotificationsSummary
        total={items.length}
        unread={unreadCount}
        isMarkingAllRead={isMarkingAllRead}
        onMarkAllRead={markAllAsRead}
      />

      <section className="notifications-content section">
        <div className="container">
          <div className="notifications-content-header">
            <div>
              <span className="section-eyebrow">
                Notification Center
              </span>

              <h2 className="notifications-content-title">
                Your updates
              </h2>
            </div>

            <NotificationsFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              unreadCount={unreadCount}
            />
          </div>

          {loading && (
            <p role="status">
              Loading your notifications...
            </p>
          )}

          {error && (
            <div
              className="notifications-feedback notifications-feedback-error"
              role="alert"
            >
              <p>{error}</p>

              <button
                type="button"
                onClick={() => void loadNotifications()}
                disabled={loading}
              >
                {loading ? "Loading..." : "Try again"}
              </button>
            </div>
          )}

          {!loading && (
            <>
              <NotificationsList
                notifications={filteredNotifications}
                onRead={(id) => void markAsRead(id)}
                pendingIds={pendingIds}
              />

              {filteredNotifications.length === 0 && (
                <NotificationsEmpty
                  filter={activeFilter}
                />
              )}
            </>
          )}

          {(pendingIds.length > 0 ||
            isMarkingAllRead) && (
            <p role="status">
              Saving notification status...
            </p>
          )}
        </div>
      </section>

      <NotificationsCTA />
    </main>
  );
}