import { GraduationCap, BookOpen, School, type LucideIcon } from "lucide-react";

export interface EducationStep {
  year: string;
  degree: string;
  field: string;
  institute: string;
  tag: string;
  icon: LucideIcon;
  height: string;
  featured?: boolean;
}

export const educationSteps: EducationStep[] = [
  {
    year: "2017",
    degree: "Secondary School Certificate (SSC)",
    field: "Science",
    institute: "Hajigonj Amin Memorial High School",
    tag: "Secondary education",
    icon: School,
    height: "lg:min-h-[280px]",
  },
  {
    year: "2019",
    degree: "Higher Secondary Certificate (HSC)",
    field: "Science",
    institute: "Hajigonj Model Govt. College",
    tag: "Higher secondary",
    icon: BookOpen,
    height: "lg:min-h-[340px]",
  },
  {
    year: "2022",
    degree: "Diploma in Engineering",
    field: "Computer Technology (CMT)",
    institute: "Chandpur Polytechnic Institute",
    tag: "Where tech began",
    icon: GraduationCap,
    height: "lg:min-h-[400px]",
    featured: true,
  },
];
