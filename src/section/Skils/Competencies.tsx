import React, { useState } from "react";
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
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

interface Competency {
  title: string;
  description: string;
  icon: LucideIcon;
}

const competencies: Competency[] = [
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

// Prothome koyta card dekhabe (2 ar 3 column dutoi te fit hoy)
const INITIAL_COUNT = 6;

const GRID_CLASSES =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3";

interface CardProps {
  item: Competency;
  number: number;
  /** Extra card er jonno: show/hide control kore */
  forceVisible?: boolean;
  /** Stagger delay (ms), shudhu show howar shomoy apply hoy */
  staggerDelay?: number;
}

const CompetencyCard: React.FC<CardProps> = ({
  item,
  number,
  forceVisible,
  staggerDelay = 0,
}) => {
  const Icon = item.icon;
  const animated = forceVisible !== undefined;
  const visible = animated ? forceVisible : true;

  return (
    // Outer wrapper: shudhu reveal animation (card er hover transition er shathe conflict hoy na)
    <div
      style={
        animated
          ? { transitionDelay: visible ? `${staggerDelay}ms` : "0ms" }
          : undefined
      }
      className={
        animated
          ? `transition-all duration-700 ease-out motion-reduce:transition-none ${
              visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`
          : undefined
      }
    >
      <div
        className="group relative h-full overflow-hidden rounded-2xl
          border border-black/10 bg-white p-5
          transition-all duration-300
          hover:-translate-y-1 hover:border-[#15919B]/50
          hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          dark:border-slate-700/80 dark:bg-slate-900
          dark:hover:border-[#15919B]/60
          dark:hover:shadow-[0_12px_35px_rgba(0,0,0,0.3)]
          sm:p-6 cursor-pointer"
      >
        {/* top accent line */}
        <span
          className="pointer-events-none absolute right-4 top-4
            font-space text-3xl font-bold text-black/[0.05]
            transition-colors duration-300
            group-hover:text-black/10
            dark:text-white/[0.08]
            dark:group-hover:text-white/[0.14]
            sm:text-4xl"
        >
          {String(number).padStart(2, "0")}
        </span>

        <div className="flex items-start justify-between">
          <div
            className="
            flex h-11 w-11 items-center justify-center rounded-xl
            bg-[#15919B]/10 text-[#15919B]

            transition-[background-color,color,transform]
            duration-500 ease-in-out

            group-hover:bg-[#15919B] group-hover:text-white

            dark:bg-[#15919B]/15 dark:text-[#42c5ce]
            dark:group-hover:bg-[#15919B]
            dark:group-hover:text-white
          "
          >
            <Icon size={22} strokeWidth={2} />
          </div>
        </div>

        <h3 className="relative mt-4 text-base font-semibold text-[#584e4e] transition-colors duration-300 dark:text-slate-100 sm:text-lg">
          {item.title}
        </h3>

        <p className="relative mt-2 text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]">
          {item.description}
        </p>

        {/* Bottom hover accent */}
        <span
          className="
            absolute bottom-0 left-0 h-[3px] w-0
            bg-[#15919B] transition-all duration-300
            group-hover:w-full
          "
        />
      </div>
    </div>
  );
};

const Competencies: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const hasMore = competencies.length > INITIAL_COUNT;
  const initialItems = competencies.slice(0, INITIAL_COUNT);
  const extraItems = competencies.slice(INITIAL_COUNT);

  return (
    <section
      id="competencies"
      className="relative bg-white transition-colors duration-300 dark:bg-[#050505]"
    >
      <div className="mx-auto max-w-7xl px-5 py-20  sm:px-6 sm:py-24 md:px-10 md:py-30 dark:border-slate-800 border-black/10 border-t">
        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-3 sm:mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-1.5">
            <i
              className="
              block h-[3px] w-[70px] rounded-sm
              bg-gradient-to-r from-[#8fc4dc] to-[#487081]
            "
            />
          </div>

          <span
            className="
            font-space text-[10px] uppercase tracking-[0.2em]
            text-black transition-colors duration-300
            dark:text-slate-400
            sm:text-xs sm:tracking-[0.25em]
          "
          >
            Skills & Expertise
          </span>
        </div>

        <h2
          className="text-[28px] font-semibold leading-tight
          text-[#0F2E33] transition-colors duration-300
          dark:text-white
          sm:text-[34px] lg:text-[40px]"
        >
          CORE COMPETENCIES
        </h2>

        <div id="competencies-list" className="mt-8 sm:mt-10">
          {/* Initial cards */}
          <div className={GRID_CLASSES}>
            {initialItems.map((item, index) => (
              <CompetencyCard key={item.title} item={item} number={index + 1} />
            ))}
          </div>

          {/* Extra cards: height expand + fade/slide-up stagger */}
          {hasMore && (
            <div
              aria-hidden={!showAll}
              className={`grid transition-[grid-template-rows] duration-700 ease-in-out motion-reduce:transition-none ${
                showAll ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              {/* -mx/px: hover shadow side e clip hoy na */}
              <div className="-mx-3 min-h-0 overflow-hidden px-3">
                {/* pt: gap, pb: bottom shadow er jonno jayga */}
                <div className="pb-6 pt-4 sm:pt-5">
                  <div className={GRID_CLASSES}>
                    {extraItems.map((item, i) => (
                      <CompetencyCard
                        key={item.title}
                        item={item}
                        number={INITIAL_COUNT + i + 1}
                        forceVisible={showAll}
                        staggerDelay={200 + i * 90}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Show more / less toggle */}
        {hasMore && (
          <div
            className={`flex justify-center transition-[margin] duration-700 ease-in-out ${
              showAll ? "mt-2" : "mt-8 sm:mt-10"
            }`}
          >
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              aria-controls="competencies-list"
              className="group inline-flex items-center gap-2 rounded-full
              border-2 border-[#15919B] px-6 py-2.5
              text-sm font-medium text-[#0F2E33]
              transition-all duration-300
              hover:bg-[#15919B] hover:text-white
              active:scale-[0.97]
              dark:border-[#15919B]/70
              dark:text-slate-200
              dark:hover:bg-[#15919B]
              dark:hover:text-white"
            >
              {showAll
                ? "Show Less"
                : `Show ${competencies.length - INITIAL_COUNT} More`}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  showAll ? "rotate-180" : ""
                }`}
                strokeWidth={2}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Competencies;
