import Link from "next/link";

import Container from "@/components/ui/Container";

import type {
  MyUWebDashboardData,
} from "@/lib/my-u/types";

import MyUWebOverview from "./MyUWebOverview";
import MyUWebProjects from "./MyUWebProjects";
import MyUWebContracts from "./MyUWebContracts";
import MyUWebActivity from "./MyUWebActivity";

type Props = {
  data: MyUWebDashboardData;
};

export default function MyUWeb({
  data,
}: Props) {
  return (
    <main className="my-uweb-page">
      <Container>
        <div className="my-uweb-breadcrumb">
          <Link href="/uweb">
            UWeb
          </Link>

          <span>←</span>

          <span>
            My U
          </span>
        </div>

        <MyUWebOverview
          data={data}
        />

        <div className="my-uweb-content-grid">
          <div className="my-uweb-main-column">
            <MyUWebProjects
              projects={data.projects}
            />

            <MyUWebContracts
              contracts={data.contracts}
            />
          </div>

          <aside className="my-uweb-side-column">
            <div className="my-uweb-navigation">
              <span className="section-eyebrow">
                My U
              </span>

              <h3>
                UWeb
              </h3>

              <Link
                href="/my-uweb"
                className="my-uweb-navigation-active"
              >
                نمای کلی UWeb
              </Link>

              <Link href="/my/projects">
                پروژه‌های من
              </Link>

              <Link href="/my/contracts">
                قراردادهای من
              </Link>

              <Link href="/my/notifications">
                اعلان‌ها
              </Link>
            </div>

            <div className="my-uweb-help-card">
              <span>
                نیاز به پروژه جدید دارید؟
              </span>

              <p>
                مشخصات پروژه خود را در UWeb
                ثبت کنید تا فرآیند شروع شود.
              </p>

              <Link href="/uweb/order">
                شروع پروژه
                <span>←</span>
              </Link>
            </div>
          </aside>
        </div>

        <MyUWebActivity
          activities={data.activities}
        />
      </Container>
    </main>
  );
}