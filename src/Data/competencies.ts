import type { LucideIcon } from "lucide-react";

import {
  Code2,
  Atom,
  Braces,
  MonitorSmartphone,
  Blocks,
  RefreshCw,
  Plug,
  Database,
  Wrench,
  Building2,
  GraduationCap,
  Bug,
  KanbanSquare,
  GitBranch,
  Palette,
} from "lucide-react";

export interface Competency {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const competencies: Competency[] = [
  {
    title: "Frontend Web Development",
    description:
      "Building fast, accessible interfaces from design files to production-ready code.",
    icon: Code2,
  },
  {
    title: "React.js & Next.js Development",
    description:
      "Shipping performant apps with React and Next.js, from routing to server-side rendering.",
    icon: Atom,
  },
  {
    title: "TypeScript Development",
    description:
      "Writing strictly typed code that catches bugs early and scales with the codebase.",
    icon: Braces,
  },
  {
    title: "Responsive & Cross-Browser UI Development",
    description:
      "Ensuring layouts look and behave consistently across devices, screens, and browsers.",
    icon: MonitorSmartphone,
  },
  {
    title: "Component-Based Architecture",
    description:
      "Designing reusable, composable components that keep large UIs maintainable.",
    icon: Blocks,
  },
  {
    title: "State Management with Redux Toolkit",
    description:
      "Structuring predictable, scalable application state with Redux Toolkit and RTK Query.",
    icon: RefreshCw,
  },
  {
    title: "REST/API Integration",
    description:
      "Connecting frontends to REST APIs with clean data fetching and error handling.",
    icon: Plug,
  },
  {
    title: "Database Management",
    description:
      "Modeling, querying, and maintaining databases that support reliable application data.",
    icon: Database,
  },
  {
    title: "Software Troubleshooting & Technical Support",
    description:
      "Diagnosing issues quickly and resolving them with minimal disruption to users.",
    icon: Wrench,
  },
  {
    title: "HMS/PMS Product Support",
    description:
      "Supporting hotel and property management system products for day-to-day client operations.",
    icon: Building2,
  },
  {
    title: "Client Training & Technical Guidance",
    description:
      "Onboarding clients and walking teams through features with clear, patient guidance.",
    icon: GraduationCap,
  },
  {
    title: "Bug Analysis & Product Improvement",
    description:
      "Tracing bugs to their root cause and turning fixes into lasting product improvements.",
    icon: Bug,
  },
  {
    title: "Agile/Scrum Collaboration",
    description:
      "Working within sprints, standups, and backlogs to ship consistently as a team.",
    icon: KanbanSquare,
  },
  {
    title: "Git & GitHub Workflows",
    description:
      "Managing branches, pull requests, and code reviews for clean collaborative history.",
    icon: GitBranch,
  },
  {
    title: "UI/UX Implementation",
    description:
      "Turning design mockups into pixel-accurate, usable interfaces.",
    icon: Palette,
  },
];
