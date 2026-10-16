"use client";

import type { MouseEvent } from "react";
import {
  Lightbulb,
  Code2,
  Users,
  Sprout,
  Handshake,
  type LucideIcon,
} from "lucide-react";

interface PhilosophyItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const philosophyItems: PhilosophyItem[] = [
  {
    title: "Keep it simple",
    description:
      "Elegant, maintainable solutions are always better than unnecessary complexity.",
    icon: Code2,
  },
  {
    title: "User-first mindset",
    description: "Technology should adapt to people, not the other way around.",
    icon: Users,
  },
  {
    title: "Continuous learning",
    description:
      "Growth comes from curiosity and learning something new every day.",
    icon: Sprout,
  },
  {
    title: "Collaboration over competition",
    description:
      "Great products are built through teamwork, trust, and shared knowledge.",
    icon: Handshake,
  },
];

// Updates CSS variables so the spotlight follows the cursor.
const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();

  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
};

const Philosophy = () => {
  return (
    <section className="relative bg-white transition-colors duration-300 dark:bg-[#050505]">
      <div className="mx-auto max-w-7xl border-t border-[#0E1525]/10 px-5 py-20 transition-colors duration-300 dark:border-white/10 sm:px-6 sm:py-24 md:px-10 md:py-30">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Left: heading and introduction */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Section Icon */}
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#15919B]/10 text-[#15919B] transition-colors duration-300 dark:bg-teal-400/10 dark:text-teal-300">
              <Lightbulb className="h-5 w-5" strokeWidth={1.75} />
            </div>

            {/* Heading */}
            <h2 className="mt-4 text-[28px] font-semibold leading-tight text-[#0F2E33] transition-colors duration-300 dark:text-white sm:text-[34px] lg:text-[40px]">
              My philosophy
            </h2>

            {/* Accent Line */}
            <div className="mt-4 flex items-start gap-1.5" aria-hidden="true">
              <span className="block h-[3px] w-[120px] rounded-sm bg-gradient-to-r from-[#8fc4dc] to-[#487081] dark:from-teal-300 dark:to-cyan-500" />
              <span className="block h-1.5 w-1.5 rounded-full bg-[#2a7fa3] dark:bg-teal-300" />
            </div>

            {/* Introduction */}
            <p className="mt-2 sm:mt-4 sm:text-base max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]">
              Great code is more than functionality — it reflects clarity,
              structure, and long-term maintainability. Every project is a
              chance to solve meaningful problems and build technology that
              improves people&apos;s lives.
            </p>

            <p className="mt-2 sm:mt-4 sm:text-base max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]">
              My goal is software that&apos;s reliable, intuitive, and impactful
              — delivered through simplicity, care, and thoughtful design.
            </p>
          </div>

          {/* Right: Philosophy Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {philosophyItems.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                onMouseMove={handleMouseMove}
                className="
                  group relative isolate overflow-hidden rounded-2xl
                  border border-[#0E1525]/15 bg-white p-6
                  transition-all duration-300
          hover:-translate-y-1 hover:border-[#15919B]
                  dark:border-white/10 dark:bg-slate-900/70
                  dark:hover:border-teal-400/70 cursor-pointer
                "
              >
                {/* Cursor-following spotlight */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute inset-0 -z-10
                    opacity-0 transition-opacity duration-300
                    group-hover:opacity-100
                  "
                  style={{
                    background:
                      "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(21,145,155,0.14), transparent 70%)",
                  }}
                />

                {/* Card Icon */}
                <div
                  className="
                    flex h-10 w-10 items-center justify-center rounded-lg
                    bg-[#15919B]/10 text-[#15919B]
                    transition-colors duration-300
                    group-hover:bg-[#15919B] group-hover:text-white
                    dark:bg-teal-400/10 dark:text-teal-300
                    dark:group-hover:bg-teal-400
                    dark:group-hover:text-slate-950
                  "
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
                </div>

                {/* Card Title */}
                <h3 className="relative mt-4 text-base font-semibold text-[#584e4e] transition-colors duration-300 dark:text-slate-100 sm:text-lg">
                  {title}
                </h3>

                {/* Card Description */}
                <p className="mt-2 text-[16px] leading-relaxed= text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
