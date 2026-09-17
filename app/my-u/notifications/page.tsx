"use client";

import { useMemo, useState } from "react";

import NotificationsHero from "@/components/notifications/NotificationsHero";
import NotificationsSummary from "@/components/notifications/NotificationsSummary";
import NotificationsFilters from "@/components/notifications/NotificationsFilters";
import NotificationsList from "@/components/notifications/NotificationsList";
import NotificationsEmpty from "@/components/notifications/NotificationsEmpty";
import NotificationsCTA from "@/components/notifications/NotificationsCTA";

import {
  notificationItems,
} from "@/components/notifications/notifications";

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] =
    useState("all");

  const [items, setItems] =
    useState(notificationItems);

  const unreadCount = useMemo(
    () =>
      items.filter(
        (notification) => !notification.read
      ).length,
    [items]
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") {
      return items;
    }

    return items.filter(
      (notification) =>
        notification.category === activeFilter
    );
  }, [activeFilter, items]);

  const markAsRead = (id: string) => {
    setItems((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

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

          <NotificationsList
            notifications={filteredNotifications}
            onRead={markAsRead}
          />

          {filteredNotifications.length === 0 && (
            <NotificationsEmpty
              filter={activeFilter}
            />
          )}
        </div>
      </section>

      <NotificationsCTA />
    </main>
  );
}