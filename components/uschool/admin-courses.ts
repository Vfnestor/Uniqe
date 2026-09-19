export type USchoolSession = {
  id: string;
  title: string;
  releaseDay: number;
  durationMinutes: number;
  youtubeUrl: string;
  aparatUrl: string;
  text: string;
  imageUrl: string;
};

export type USchoolClass = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  tags: string[];

  imageUrl: string;

  youtubeUrl: string;
  aparatUrl: string;

  totalDurationMinutes: number;
  sessionCount: number;

  minAge: number;
  maxAge: number | null;

  price: number;
  currency: "USD";

  status: "draft" | "published" | "inactive";
  featured: boolean;

  sessions: USchoolSession[];
};

export const uschoolAdminClasses: USchoolClass[] = [
  {
    id: "uschool-ai-foundations",
    title: "AI Foundations",
    slug: "ai-foundations",
    shortDescription:
      "A practical introduction to artificial intelligence and modern AI concepts.",
    description:
      "Learn the foundations of artificial intelligence through a structured daily learning experience. The class introduces AI concepts, machine learning, prompts, models and practical use cases.",
    category: "Technology",
    tags: ["AI", "Technology", "Beginner"],

    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",

    youtubeUrl: "https://www.youtube.com/",
    aparatUrl: "https://www.aparat.com/",

    totalDurationMinutes: 240,
    sessionCount: 4,

    minAge: 16,
    maxAge: null,

    price: 1,
    currency: "USD",

    status: "published",
    featured: true,

    sessions: [
      {
        id: "ai-foundations-1",
        title: "What is Artificial Intelligence?",
        releaseDay: 1,
        durationMinutes: 60,
        youtubeUrl: "https://www.youtube.com/",
        aparatUrl: "https://www.aparat.com/",
        text: "Introduction to AI and its major concepts.",
        imageUrl: "",
      },
      {
        id: "ai-foundations-2",
        title: "Machine Learning Basics",
        releaseDay: 2,
        durationMinutes: 60,
        youtubeUrl: "https://www.youtube.com/",
        aparatUrl: "https://www.aparat.com/",
        text: "Understanding machine learning at a practical level.",
        imageUrl: "",
      },
      {
        id: "ai-foundations-3",
        title: "Working With AI Models",
        releaseDay: 3,
        durationMinutes: 60,
        youtubeUrl: "https://www.youtube.com/",
        aparatUrl: "https://www.aparat.com/",
        text: "How modern AI models process information.",
        imageUrl: "",
      },
      {
        id: "ai-foundations-4",
        title: "Practical AI",
        releaseDay: 4,
        durationMinutes: 60,
        youtubeUrl: "https://www.youtube.com/",
        aparatUrl: "https://www.aparat.com/",
        text: "Putting the concepts together through practical examples.",
        imageUrl: "",
      },
    ],
  },

  {
    id: "uschool-digital-skills",
    title: "Digital Skills for the Modern World",
    slug: "digital-skills",
    shortDescription:
      "Build essential digital skills for study, work and everyday life.",
    description:
      "A structured introduction to digital tools, online research, productivity, digital safety and modern work habits.",
    category: "Digital Skills",
    tags: ["Digital", "Productivity", "Skills"],

    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",

    youtubeUrl: "https://www.youtube.com/",
    aparatUrl: "https://www.aparat.com/",

    totalDurationMinutes: 180,
    sessionCount: 3,

    minAge: 12,
    maxAge: 18,

    price: 1,
    currency: "USD",

    status: "published",
    featured: false,

    sessions: [
      {
        id: "digital-skills-1",
        title: "Digital Productivity",
        releaseDay: 1,
        durationMinutes: 60,
        youtubeUrl: "https://www.youtube.com/",
        aparatUrl: "https://www.aparat.com/",
        text: "Learn how to organize digital work and study.",
        imageUrl: "",
      },
      {
        id: "digital-skills-2",
        title: "Research and Information",
        releaseDay: 2,
        durationMinutes: 60,
        youtubeUrl: "https://www.youtube.com/",
        aparatUrl: "https://www.aparat.com/",
        text: "Learn how to find and evaluate information online.",
        imageUrl: "",
      },
      {
        id: "digital-skills-3",
        title: "Digital Safety",
        releaseDay: 3,
        durationMinutes: 60,
        youtubeUrl: "https://www.youtube.com/",
        aparatUrl: "https://www.aparat.com/",
        text: "Basic principles of online privacy and digital safety.",
        imageUrl: "",
      },
    ],
  },
];

export function getUSchoolClass(id: string) {
  return uschoolAdminClasses.find(
    (item) => item.id === id,
  );
}