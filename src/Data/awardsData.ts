import img1 from "../assets/beautiful-office-space-cartoon-style.jpg";

export type AwardItem = {
  id: string;
  year: string;
  title: string;
  organization: string;
  image?: {
    src: string;
    alt: string;
  };
  description?: string;
};

export const awardsData: AwardItem[] = [
  {
    id: "award-1",
    year: "2026",
    title: "Award Title",
    organization: "Awarding Organization",
    description: "Add a short description of this achievement.",
    image: {
      src: img1,
      alt: "React - The Complete Guide certificate from Udemy",
    },
  },
  {
    id: "award-2",
    year: "2025",
    title: "Recognition Title",
    organization: "Recognition Organization",
    description: "Add a short description of this recognition.",
    // image: { src: "/awards/award-2.webp", alt: "Recognition certificate" },
  },
  {
    id: "award-3",
    year: "2025",
    title: "Achievement Title",
    organization: "Awarding Organization",
    description: "Add a short description of this achievement.",
    // image: { src: "/awards/award-3.webp", alt: "Award image" },
  },
  {
    id: "award-4",
    year: "2024",
    title: "Another Achievement",
    organization: "Awarding Organization",
    description: "Add a short description of this achievement.",
    // image: { src: "/awards/award-4.webp", alt: "Award image" },
  },
  {
    id: "award-5",
    year: "2024",
    title: "Another Achievement",
    organization: "Awarding Organization",
    description: "Add a short description of this achievement.",
    // image: { src: "/awards/award-5.webp", alt: "Award image" },
  },
];

export default awardsData;
