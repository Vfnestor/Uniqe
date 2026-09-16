export type CourseCategory =
  | "technology"
  | "business"
  | "creative"
  | "foundation";

export type CourseStatus =
  | "available"
  | "development"
  | "coming-soon";

export type USchoolCourse = {
  id: string;
  name: string;
  category: CourseCategory;
  categoryLabel: string;
  description: string;
  status: CourseStatus;
  statusLabel: string;
  href: string;
  number: string;
  icon: string;
  featured?: boolean;
};

export const uschoolCourses: USchoolCourse[] = [
  {
    id: "technology",
    name: "Technology",
    category: "technology",
    categoryLabel: "Technology",
    description:
      "Learning paths focused on software, digital technology and the skills needed to build modern products.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    href: "/uschool",
    number: "01",
    icon: "◇",
    featured: true,
  },
  {
    id: "business",
    name: "Business",
    category: "business",
    categoryLabel: "Business",
    description:
      "Practical learning experiences exploring business, entrepreneurship, strategy and digital growth.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    href: "/uschool",
    number: "02",
    icon: "↗",
    featured: true,
  },
  {
    id: "creative",
    name: "Creative",
    category: "creative",
    categoryLabel: "Creative",
    description:
      "Courses and learning experiences for design, creativity, digital media and creative problem solving.",
    status: "coming-soon",
    statusLabel: "Coming Soon",
    href: "/uschool",
    number: "03",
    icon: "✦",
  },
  {
    id: "uschool-foundation",
    name: "USchool Foundation",
    category: "foundation",
    categoryLabel: "Foundation",
    description:
      "The foundation layer for organizing learning experiences, educational resources and future USchool programs.",
    status: "development",
    statusLabel: "In Development",
    href: "/uschool",
    number: "04",
    icon: "□",
  },
];