"use client";

import { useCallback, useEffect, useState } from "react";

import "@/components/my-u/my-u.css";

import MyUHero from "@/components/my-u/MyUHero";
import MyUOverview from "@/components/my-u/MyUOverview";
import MyUActivity from "@/components/my-u/MyUActivity";
import MyUCTA from "@/components/my-u/MyUCTA";

import {
  myUQuickActions,
  myUServices,
  type MyUActivity as MyUActivityItem,
} from "@/components/my-u/dashboard";

import { getActivity } from "@/lib/api/activity";

export default function MyUPage() {
  const [activities, setActivities] = useState<
    MyUActivityItem[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadActivity = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getActivity(20);

      setActivities(
        response.items.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          time: formatActivityTime(item.createdAt),
          icon: item.icon,
          href: item.href,
        })),
      );
    } catch {
      setActivities([]);
      setError(
        "دریافت فعالیت‌های حساب کاربری ناموفق بود. اتصال به سرور را بررسی کنید.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadActivity();
  }, [loadActivity]);

  return (
    <main className="my-u-page">
      <MyUHero />

      <MyUOverview
        services={myUServices}
        actions={myUQuickActions}
      />

      <MyUActivity
        activities={activities}
        isLoading={isLoading}
        error={error}
        onRetry={loadActivity}
      />

      <MyUCTA />
    </main>
  );
}

function formatActivityTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Time unavailable";
  }

  const elapsed = Math.max(
    0,
    Date.now() - date.getTime(),
  );

  const minutes = Math.floor(elapsed / 60_000);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 30) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  return date.toLocaleDateString();
}