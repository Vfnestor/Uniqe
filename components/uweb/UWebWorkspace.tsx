import Link from "next/link";

import Container from "@/components/ui/Container";

import type {
  UWebWorkspaceData,
} from "@/lib/uweb/workspace-data";

import UWebWorkspaceOverview from "./UWebWorkspaceOverview";
import UWebWorkspaceRequirements from "./UWebWorkspaceRequirements";
import UWebWorkspaceMilestones from "./UWebWorkspaceMilestones";
import UWebWorkspaceDeliveries from "./UWebWorkspaceDeliveries";
import UWebWorkspaceActivity from "./UWebWorkspaceActivity";

type Props = {
  data: UWebWorkspaceData;
};

export default function UWebWorkspace({
  data,
}: Props) {
  const {
    project,
    milestones,
    deliveries,
    revisions,
    activities,
    filesCount,
    messagesCount,
  } = data;

  return (
    <section className="uweb-workspace-page">
      <Container>
        <div className="uweb-workspace-breadcrumb">
          <Link href="/uweb/projects">
            پروژه‌ها
          </Link>

          <span>←</span>

          <span>
            {project.projectNumber}
          </span>
        </div>

        <UWebWorkspaceOverview
          project={project}
          milestonesCount={
            milestones.length
          }
          deliveriesCount={
            deliveries.length
          }
          revisionsCount={
            revisions.length
          }
        />

        <div className="uweb-workspace-layout">
          <main>
            <UWebWorkspaceRequirements
              project={project}
            />

            <UWebWorkspaceMilestones
              milestones={milestones}
            />

            <UWebWorkspaceDeliveries
              deliveries={deliveries}
              revisions={revisions}
            />

            <UWebWorkspaceActivity
              activities={activities}
            />
          </main>

          <aside className="uweb-workspace-sidebar">
            <div className="uweb-workspace-sidebar-card">
              <span>
                فایل‌ها
              </span>

              <strong>
                {filesCount}
              </strong>

              <p>
                فایل پیوست‌شده به پروژه
              </p>
            </div>

            <div className="uweb-workspace-sidebar-card">
              <span>
                پیام‌ها
              </span>

              <strong>
                {messagesCount}
              </strong>

              <p>
                پیام ثبت‌شده
              </p>
            </div>

            <Link
              href={`/uweb/contracts/${project.id}`}
              className="uweb-workspace-sidebar-link"
            >
              مشاهده قرارداد
              <span>←</span>
            </Link>

            <Link
              href={`/uweb/opportunities/${project.id}`}
              className="uweb-workspace-sidebar-link"
            >
              مشاهده فرصت پروژه
              <span>←</span>
            </Link>
          </aside>
        </div>
      </Container>
    </section>
  );
}