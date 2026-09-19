"use client";

import Link from "next/link";

import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminUSchoolClassForm from "@/components/admin/AdminUSchoolClassForm";

export default function NewUSchoolClassPage() {
  return (
    <div className="admin-module-page">
      <AdminPageHeader
        eyebrow="USCHOOL / CLASSES / NEW"
        title="Add Class"
        description="Create a new USchool class with videos, daily sessions, pricing and age restrictions."
        actions={
          <Link
            href="/admin/uschool/courses"
            className="admin-button admin-button-secondary"
          >
            ← Back to Classes
          </Link>
        }
      />

      <AdminUSchoolClassForm />
    </div>
  );
}