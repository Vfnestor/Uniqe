import "@/components/my/my-u.css";
import "@/components/my/my-u-core.css";

import MyUCoreLayout from "@/components/my/MyUCoreLayout";
import MyUNotifications from "@/components/my/MyUNotifications";

import {
  getMyUNotifications,
} from "@/lib/my-u/core-data";

export default function MyNotificationsPage() {
  const notifications =
    getMyUNotifications();

  return (
    <MyUCoreLayout
      eyebrow="MY U / NOTIFICATIONS"
      title="اعلان‌های من"
      description="وضعیت پروژه‌ها، سفارش‌ها، قراردادها و سایر فعالیت‌های مهم حساب شما."
      active="notifications"
    >
      <MyUNotifications
        notifications={
          notifications
        }
      />
    </MyUCoreLayout>
  );
}