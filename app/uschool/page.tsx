import "@/components/uschool/uschool.css";

import USchoolHero from "@/components/uschool/USchoolHero";
import CoursesGrid from "@/components/uschool/CoursesGrid";
import USchoolCTA from "@/components/uschool/USchoolCTA";

import { uschoolCourses } from "@/components/uschool/courses";

export default function USchoolPage() {
  return (
    <main className="uschool-page">
      <USchoolHero />
      <CoursesGrid courses={uschoolCourses} />
      <USchoolCTA />
    </main>
  );
}