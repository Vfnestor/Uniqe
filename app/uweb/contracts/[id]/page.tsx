import { notFound } from "next/navigation";

import "@/components/uweb/uweb-contracts.css";

import UWebContractViewer from "@/components/uweb/UWebContractViewer";

import {
  getUWebContract,
} from "@/lib/uweb/contract-data";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UWebContractPage({
  params,
}: PageProps) {
  const { id } = await params;

  const data =
    getUWebContract(id);

  if (!data) {
    notFound();
  }

  return (
    <main className="uweb-page">
      <UWebContractViewer
        contract={data.contract}
        project={data.project}
      />
    </main>
  );
}
