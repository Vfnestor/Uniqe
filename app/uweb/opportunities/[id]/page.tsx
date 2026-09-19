import { notFound } from "next/navigation";

import "@/components/uweb/uweb-opportunities.css";

import UWebOpportunityDetails from "@/components/uweb/UWebOpportunityDetails";

import {
  getUWebOpportunity,
} from "@/lib/uweb/opportunity-data";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UWebOpportunityPage({
  params,
}: PageProps) {
  const { id } = await params;

  const opportunity =
    getUWebOpportunity(id);

  if (!opportunity) {
    notFound();
  }

  return (
    <main className="uweb-page">
      <UWebOpportunityDetails
        opportunity={opportunity}
      />
    </main>
  );
}