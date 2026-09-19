import "@/components/my/my-u.css";
import "@/components/my/my-u-core.css";

import MyUCoreLayout from "@/components/my/MyUCoreLayout";
import MyUSettings from "@/components/my/MyUSettings";

import {
  getMyUSettings,
} from "@/lib/my-u/core-data";

export default function MySettingsPage() {
  const settings =
    getMyUSettings();

  return (
    <MyUCoreLayout
      eyebrow="MY U / SETTINGS"
      title="تنظیمات"
      description="تنظیمات عمومی حساب و نحوه دریافت اعلان‌های My U را مدیریت کنید."
      active="settings"
    >
      <MyUSettings
        settings={settings}
      />
    </MyUCoreLayout>
  );
}