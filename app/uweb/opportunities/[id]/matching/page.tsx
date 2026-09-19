import { notFound } from "next/navigation";

import "@/components/uweb/uweb-matching.css";

import UWebMatchingResults from "@/components/uweb/UWebMatchingResults";

import {
  getUWebMatchingResults,
} from "@/lib/uweb/matching-data";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UWebMatchingPage({
  params,
}: PageProps) {
  const { id } = await params;

  const data =
    getUWebMatchingResults(id);

  if (!data) {
    notFound();
  }

  return (
    <main className="uweb-page">
      <UWebMatchingResults
        project={data.project}
        matches={data.professionals}
      />
    </main>
  );
}