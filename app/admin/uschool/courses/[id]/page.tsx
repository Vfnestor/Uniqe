import Link from "next/link";
import { notFound } from "next/navigation";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminUSchoolClassForm from "@/components/admin/AdminUSchoolClassForm";
import {
  getUSchoolClass,
} from "@/components/uschool/admin-courses";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditUSchoolClassPage({
  params,
}: Props) {
  const { id } = await params;

  const course = getUSchoolClass(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="admin-module-page">
      <AdminPageHeader
        eyebrow="USCHOOL / CLASSES / EDIT"
        title={course.title}
        description="Edit the class content, schedule, access rules and pricing."
        actions={
          <Link
            href="/admin/uschool/courses"
            className="admin-button admin-button-secondary"
          >
            ← Back to Classes
          </Link>
        }
      />

      <AdminUSchoolClassForm
        mode="edit"
        initialData={{
          title: course.title,
          slug: course.slug,
          shortDescription:
            course.shortDescription,
          description: course.description,
          category: course.category,
          tags: course.tags.join(", "),
          imageUrl: course.imageUrl,
          youtubeUrl: course.youtubeUrl,
          aparatUrl: course.aparatUrl,
          totalDurationMinutes:
            course.totalDurationMinutes,
          sessionCount: course.sessionCount,
          minAge: course.minAge,
          maxAge: course.maxAge,
          price: course.price,
          status: course.status,
          featured: course.featured,
        }}
      />
    </div>
  );
}