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
  GraduationCap,
  Globe,
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
import SectionEyebrow from "../../common/SectionEyebrow";

type Skill = { name: string; icon: LucideIcon };
type Category = { title: string; icon: LucideIcon; skills: Skill[] };

const categories: Category[] = [
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

function SkillChip({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <li className="group/chip inline-flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 text-xs text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-teal-600 hover:text-white hover:ring-teal-600 sm:gap-2.5 sm:px-3.5 sm:py-2 sm:text-sm dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-teal-600 dark:hover:text-white dark:hover:ring-teal-600">
      <Icon
        className="size-4 shrink-0 text-teal-600 transition-colors group-hover/chip:text-white sm:size-[18px]"
        strokeWidth={2}
        aria-hidden="true"
      />
      {skill.name}
    </li>
  );
}

export default function Skills() {
  return (
    <main className="w-full bg-white transition-colors duration-300 dark:bg-[#050505]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-16 px-5 py-20  sm:px-6 sm:py-24 md:px-10 md:py-30">
        {/* Header */}
        <header className="flex max-w-3xl flex-col gap-4 sm:gap-5">
          <span className="text-sm tracking-wider text-teal-600">
            <SectionEyebrow label="Tech Stack & Tools" />
          </span>
          <h1
            className="text-[28px] font-semibold leading-tight
          text-[#0F2E33] transition-colors duration-300
          dark:text-white
          sm:text-[34px] lg:text-[40px]"
          >
            Tools I use to build for the web.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-[#8C93A0] sm:text-base">
            From pixel-perfect interfaces to databases and deployment, here is
            the stack I work with every day.
          </p>
        </header>

        {/* Skill cards */}
        <section className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {categories.map((category, index) => (
            <article
              key={category.title}
              className="group relative flex min-w-0 flex-col gap-5 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 border-[#15919B]/50 hover:shadow-xl hover:shadow-teal-900/10 sm:p-6 lg:p-7 cursor-pointer dark:border-slate-700/80 dark:bg-slate-900
          dark:hover:border-[#15919B]/60
          dark:hover:shadow-[0_12px_35px_rgba(0,0,0,0.3)]"
            >
              {/* big faded number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-4
            font-space text-3xl font-bold text-black/[0.05]
            transition-colors duration-300
            group-hover:text-black/10
            dark:text-white/[0.08]
            dark:group-hover:text-white/[0.14]
            sm:text-4xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* icon tile + title */}
              <div className="relative flex items-center gap-3 sm:gap-4">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl
            bg-[#15919B]/10 text-[#15919B]

            transition-[background-color,color,transform]
            duration-500 ease-in-out

            group-hover:bg-[#15919B] group-hover:text-white

            dark:bg-[#15919B]/15 dark:text-[#42c5ce]
            dark:group-hover:bg-[#15919B]
            dark:group-hover:text-white"
                >
                  <category.icon
                    className="size-5 sm:size-6"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0">
                  <h2
                    className="text-base font-semibold
            text-[#584e4e] transition-colors duration-300
            dark:text-slate-100
            sm:text-lg"
                  >
                    {category.title}
                  </h2>
                  <p
                    className="text-[13px] leading-relaxed
            text-gray-600 transition-colors duration-300
            dark:text-slate-400
            sm:text-[15px]"
                  >
                    {category.skills.length}{" "}
                    {category.skills.length === 1 ? "skill" : "skills"}
                  </p>
                </div>
              </div>

              <ul className="relative flex flex-wrap gap-2 sm:gap-2.5">
                {category.skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </ul>

              {/* Bottom hover accent */}
              <span
                className="
            absolute bottom-0 left-0 h-[3px] w-0
            bg-[#15919B] transition-all duration-300
            group-hover:w-full
          "
              />
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
