import Link from "next/link";

import type {
  UWebAdminStats,
} from "@/lib/uweb/admin-data";

type Props = {
  stats: UWebAdminStats;
};

export default function UWebAdminOverview({
  stats,
}: Props) {
  return (
    <>
      <section className="uweb-admin-hero">
        <div>
          <span className="section-eyebrow">
            UWeb / Owner
          </span>

          <h1>
            مدیریت UWeb
          </h1>

          <p>
            مرکز مدیریت پروژه‌ها، متخصصان،
            مشتریان، درخواست‌ها و قراردادهای
            UWeb.
          </p>
        </div>

        <Link
          href="/uweb/order"
          className="uweb-admin-action"
        >
          ایجاد پروژه
          <span>←</span>
        </Link>
      </section>

      <section className="uweb-admin-stat-grid">
        <div className="uweb-admin-stat">
          <span>پروژه‌ها</span>
          <strong>{stats.projects}</strong>
        </div>

        <div className="uweb-admin-stat">
          <span>پروژه‌های فعال</span>
          <strong>
            {stats.activeProjects}
          </strong>
        </div>

        <div className="uweb-admin-stat">
          <span>متخصصان</span>
          <strong>
            {stats.professionals}
          </strong>
        </div>

        <div className="uweb-admin-stat">
          <span>مشتریان</span>
          <strong>
            {stats.clients}
          </strong>
        </div>

        <div className="uweb-admin-stat">
          <span>درخواست‌ها</span>
          <strong>
            {stats.applications}
          </strong>
        </div>

        <div className="uweb-admin-stat">
          <span>قراردادها</span>
          <strong>
            {stats.contracts}
          </strong>
        </div>

        <div className="uweb-admin-stat">
          <span>قراردادهای در انتظار</span>
          <strong>
            {stats.pendingContracts}
          </strong>
        </div>
      </section>
    </>
  );
}