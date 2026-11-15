import type { LucideIcon } from "lucide-react";

import {
  Activity,
  Atom,
  BookOpen,
  Braces,
  Clapperboard,
  Cloud,
  Code,
  Component,
  Cpu,
  Database,
  FileCode,
  FileText,
  Flame,
  GitBranch,
  GitMerge,
  Globe,
  GraduationCap,
  Hammer,
  Image as ImageIcon,
  KeyRound,
  Layers,
  Layout,
  LayoutGrid,
  ListChecks,
  MousePointer2,
  Network,
  Package,
  Palette,
  PenTool,
  RefreshCw,
  Rocket,
  Server,
  Smartphone,
  SquareCheckBig,
  Table,
  Terminal,
  Wind,
  Zap,
} from "lucide-react";

export type Skill = {
  name: string;
  icon: LucideIcon;
};

export type Category = {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
};

export const categories: Category[] = [
  {
    title: "Languages & Frameworks",
    icon: Code,
    skills: [
      { name: "HTML5", icon: FileCode },
      { name: "CSS3", icon: Palette },
      { name: "JavaScript", icon: Braces },
      { name: "TypeScript", icon: Code },
      { name: "React.js", icon: Atom },
      { name: "Next.js", icon: Layers },
      { name: "jQuery", icon: MousePointer2 },
      { name: "PHP", icon: Server },
    ],
  },
  {
    title: "UI & Styling",
    icon: Palette,
    skills: [
      { name: "Tailwind CSS", icon: Wind },
      { name: "Bootstrap", icon: LayoutGrid },
      { name: "SASS", icon: Palette },
      { name: "Flexbox", icon: Layout },
      { name: "CSS Grid", icon: Table },
      { name: "Material UI", icon: Component },
      { name: "Framer Motion", icon: Clapperboard },
      { name: "Responsive Design", icon: Smartphone },
    ],
  },
  {
    title: "State Management & Backend",
    icon: Database,
    skills: [
      { name: "Redux Toolkit", icon: RefreshCw },
      { name: "Firebase", icon: Flame },
      { name: "Clerk", icon: KeyRound },
      { name: "MySQL", icon: Database },
    ],
  },
  {
    title: "Database & Tools",
    icon: Server,
    skills: [
      { name: "MySQL", icon: Database },
      { name: "phpMyAdmin", icon: Table },
      { name: "Laragon", icon: Cpu },
      { name: "XAMPP", icon: Server },
    ],
  },
  {
    title: "Version Control & DevOps",
    icon: GitBranch,
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "GitHub", icon: GitMerge },
      { name: "NPM", icon: Package },
      { name: "Yarn", icon: Package },
      { name: "Jenkins", icon: Hammer },
    ],
  },
  {
    title: "Deployment",
    icon: Rocket,
    skills: [
      { name: "Vercel", icon: Rocket },
      { name: "Netlify", icon: Zap },
      { name: "Firebase", icon: Flame },
      { name: "GitHub Pages", icon: Globe },
      { name: "InfinityFree", icon: Cloud },
    ],
  },
  {
    title: "Development Tools",
    icon: Terminal,
    skills: [
      { name: "VS Code", icon: Code },
      { name: "Cursor", icon: MousePointer2 },
      { name: "PyCharm", icon: Terminal },
    ],
  },
  {
    title: "Project & Collaboration",
    icon: ListChecks,
    skills: [
      { name: "Jira", icon: ListChecks },
      { name: "Confluence", icon: BookOpen },
      { name: "ClickUp", icon: SquareCheckBig },
      { name: "Figma", icon: PenTool },
      { name: "Canva", icon: ImageIcon },
      { name: "LMS", icon: GraduationCap },
      { name: "Tailscale", icon: Network },
      { name: "Wiki.js", icon: FileText },
    ],
  },
  {
    title: "Analytics",
    icon: Activity,
    skills: [{ name: "Google Analytics", icon: Activity }],
  },
];
