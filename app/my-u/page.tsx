"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

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

import {
  getAccount,
  type AccountResponse,
} from "@/lib/api/account";

import {
  getActivity,
} from "@/lib/api/activity";

export default function MyUPage() {
  const [account, setAccount] =
    useState<AccountResponse | null>(null);

  const [isAccountLoading, setIsAccountLoading] =
    useState(true);

  const [accountError, setAccountError] =
    useState<string | null>(null);

  const [activities, setActivities] =
    useState<MyUActivityItem[]>([]);

  const [isActivityLoading, setIsActivityLoading] =
    useState(true);

  const [activityError, setActivityError] =
    useState<string | null>(null);

  const loadAccount = useCallback(async () => {
    setIsAccountLoading(true);
    setAccountError(null);

    try {
      const response = await getAccount();
      setAccount(response);
    } catch {
      setAccount(null);
      setAccountError(
        "دریافت اطلاعات حساب ناموفق بود. اتصال به سرور و وضعیت ورود را بررسی کنید.",
      );
    } finally {
      setIsAccountLoading(false);
    }
  }, []);

  const loadActivity = useCallback(async () => {
    setIsActivityLoading(true);
    setActivityError(null);

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
      setActivityError(
        "دریافت فعالیت‌های حساب کاربری ناموفق بود. اتصال به سرور را بررسی کنید.",
      );
    } finally {
      setIsActivityLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAccount();
    void loadActivity();
  }, [loadAccount, loadActivity]);

  return (
    <main className="my-u-page">
      <MyUHero />

      <MyUOverview
        services={myUServices}
        actions={myUQuickActions}
        account={account}
        isAccountLoading={isAccountLoading}
        accountError={accountError}
        onRetryAccount={loadAccount}
      />

      <MyUActivity
        activities={activities}
        isLoading={isActivityLoading}
        error={activityError}
        onRetry={loadActivity}
      />

      <MyUCTA />
    </main>
  );
}

function formatActivityTime(
  value: string,
): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Time unavailable";
  }

  const elapsed = Math.max(
    0,
    Date.now() - date.getTime(),
  );

  const minutes = Math.floor(
    elapsed / 60_000,
  );

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