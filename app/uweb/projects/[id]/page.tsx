import "@/components/uweb/uweb.css";

import { notFound } from "next/navigation";
import UWebProjectDetails from "@/components/uweb/UWebProjectDetails";
import { demoProjects } from "@/lib/uweb/mock-data";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UWebProjectDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const project = demoProjects.find(
    (item) => item.id === id,
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="uweb-page">
      <UWebProjectDetails project={project} />
    </main>
  );
}