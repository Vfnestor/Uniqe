import Link from "next/link";

import type {
  MyUWebDashboardData,
} from "@/lib/my-u/types";

type Props = {
  data: MyUWebDashboardData;
};

export default function MyUWebOverview({
  data,
}: Props) {
  return (
    <section className="my-uweb-overview">
      <div className="my-uweb-overview-header">
        <div>
          <span className="section-eyebrow">
            My U / UWeb
          </span>

          <h1>
            مدیریت پروژه‌های UWeb
          </h1>

          <p>
            پروژه‌ها، قراردادها و فعالیت‌های
            UWeb خود را از یک نقطه مدیریت کنید.
          </p>
        </div>

        <Link
          href="/uweb/order"
          className="my-uweb-primary-action"
        >
          ایجاد پروژه جدید
          <span>←</span>
        </Link>
      </div>

      <div className="my-uweb-stat-grid">
        <div className="my-uweb-stat-card">
          <span>
            پروژه‌های فعال
          </span>

          <strong>
            {data.activeProjectsCount}
          </strong>

          <small>
            پروژه در حال پیگیری
          </small>
        </div>

        <div className="my-uweb-stat-card">
          <span>
            قراردادها
          </span>

          <strong>
            {data.contracts.length}
          </strong>

          <small>
            قرارداد مرتبط با UWeb
          </small>
        </div>

        <div className="my-uweb-stat-card">
          <span>
            قراردادهای در انتظار
          </span>

          <strong>
            {data.pendingContractsCount}
          </strong>

          <small>
            نیازمند اقدام
          </small>
        </div>

        <div className="my-uweb-stat-card">
          <span>
            پروژه‌های تکمیل‌شده
          </span>

          <strong>
            {data.completedProjectsCount}
          </strong>

          <small>
            پروژه تکمیل‌شده
          </small>
        </div>
      </div>
    </section>
  );
}