import { notFound } from "next/navigation";

import "@/components/uweb/uweb-workspace.css";

import UWebWorkspace from "@/components/uweb/UWebWorkspace";

import {
  getUWebWorkspace,
} from "@/lib/uweb/workspace-data";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UWebWorkspacePage({
  params,
}: PageProps) {
  const { id } = await params;

  const data =
    getUWebWorkspace(id);

  if (!data) {
    notFound();
  }

  return (
    <main className="uweb-page">
      <UWebWorkspace
        data={data}
      />
    </main>
  );
}