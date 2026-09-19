import "@/components/uschool/uschool-class.css";

import USchoolClassPage from "@/components/uschool/USchoolClassPage";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ClassPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <main className="uschool-class-page">
      <USchoolClassPage classId={id} />
    </main>
  );
}