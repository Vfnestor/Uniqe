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

  useEffect(() => {
    let active = true;

    async function loadNotifications() {
      try {
        setLoading(true);
        setError(null);

        const result = await getNotifications();

        if (active) {
          setItems(result);
        }
      } catch {
        if (active) {
          setError(
            "Unable to load notifications. Please sign in and try again.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadNotifications();

    return () => {
      active = false;
    };
  }, []);

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
        pendingIds.includes(id)
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
          "The notification status could not be saved.",
        );
      } finally {
        setPendingIds((current) =>
          current.filter(
            (pendingId) => pendingId !== id,
          ),
        );
      }
    },
    [items, pendingIds],
  );

  return (
    <main className="notifications-page">
      <NotificationsHero />

      <NotificationsSummary
        total={items.length}
        unread={unreadCount}
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
            />
          </div>

          {loading && (
            <p role="status">
              Loading your notifications...
            </p>
          )}

          {error && (
            <p role="alert">
              {error}
            </p>
          )}

          {!loading && (
            <>
              <NotificationsList
                notifications={filteredNotifications}
                onRead={markAsRead}
              />

              {filteredNotifications.length === 0 && (
                <NotificationsEmpty
                  filter={activeFilter}
                />
              )}
            </>
          )}

          {pendingIds.length > 0 && (
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