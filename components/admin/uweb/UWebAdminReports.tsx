import type {
  UWebAdminStats,
} from "@/lib/uweb/admin-data";

type Props = {
  stats: UWebAdminStats;
};

export default function UWebAdminReports({
  stats,
}: Props) {
  const conversionRate =
    stats.projects > 0
      ? Math.round(
          (stats.contracts /
            stats.projects) *
            100,
        )
      : 0;

  return (
    <section className="uweb-admin-panel">
      <div className="uweb-admin-panel-header">
        <div>
          <span className="section-eyebrow">
            Reports
          </span>

          <h2>
            گزارش UWeb
          </h2>
        </div>
      </div>

      <div className="uweb-admin-report-grid">
        <div>
          <span>
            نرخ تبدیل پروژه به قرارداد
          </span>

          <strong>
            {conversionRate}%
          </strong>
        </div>

        <div>
          <span>
            تعداد متخصصان فعال
          </span>

          <strong>
            {stats.professionals}
          </strong>
        </div>

        <div>
          <span>
            درخواست‌های جاری
          </span>

          <strong>
            {stats.applications}
          </strong>
        </div>

        <div>
          <span>
            قراردادهای در انتظار
          </span>

          <strong>
            {stats.pendingContracts}
          </strong>
        </div>
      </div>

      <div className="uweb-admin-report-note">
        این گزارش در نسخه فعلی بر اساس
        داده‌های Demo تولید می‌شود. در آینده
        به Analytics و Database واقعی متصل
        خواهد شد.
      </div>
    </section>
  );
}
