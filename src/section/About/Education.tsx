"use client";

import type { MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  School,
  MapPin,
  type LucideIcon,
} from "lucide-react";

/**
 * Fonts:
 * display: Bricolage Grotesque
 * body: Hanken Grotesk
 * space: Keep this font key defined if used elsewhere in your project.
 */

interface Step {
  year: string;
  degree: string;
  field: string;
  institute: string;
  tag: string;
  icon: LucideIcon;
  height: string;
  featured?: boolean;
}

const STEPS: Step[] = [
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

// Updates CSS variables so the spotlight follows the cursor.
const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();

  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
};

function CapIllustration({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="mx-auto w-full max-w-[200px] sm:max-w-[260px] lg:ml-auto lg:mr-0 lg:max-w-[340px]"
      initial={reduce ? false : { opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        viewBox="0 8 340 206"
        className="block h-auto w-full overflow-visible"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M138 128v28c0 14 28 24 62 24s62-10 62-24v-28l-62 20z"
          fill="#1b2740"
        />

        <polygon points="200,84 322,120 200,156 78,120" fill="#0E1525" />

        <polygon
          points="200,84 322,120 200,126 78,120"
          fill="#fff"
          fillOpacity="0.08"
        />

        <circle cx="200" cy="120" r="6" fill="#2a7fa3" />

        <path
          d="M200 120 L298 128 V172"
          fill="none"
          stroke="#F2B544"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path d="M291 170h14l4 30h-22z" fill="#F2B544" />

        <g
          fill="#2a7fa3"
          fontFamily="Caveat, 'Comic Sans MS', cursive"
          fontSize="24"
        >
          <text x="14" y="34" transform="rotate(-6 14 34)">
            Learning builds
          </text>
          <text x="24" y="60" transform="rotate(-6 24 60)">
            a better tomorrow
          </text>
        </g>

        <path
          d="M44 84 C 34 116, 56 138, 90 142"
          fill="none"
          stroke="#2a7fa3"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M80 133 L91 142 L78 149"
          fill="none"
          stroke="#2a7fa3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

export default function Education() {
  const reduce = useReducedMotion();

  return (
    <section
      id="education"
      className="relative isolate overflow-hidden bg-white text-[#0E1525] transition-colors duration-300 dark:bg-[#050505] dark:text-slate-100"
    >
      <div className="mx-auto max-w-7xl border-t border-[#0E1525]/10 transition-colors duration-300 dark:border-white/10 px-5 py-20  sm:px-6 sm:py-24 md:px-10 md:py-30">
        {/* Heading + illustration */}
        <div className="mb-8 grid items-center gap-5 sm:mb-12 lg:mb-14 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-[28px] font-semibold leading-tight text-[#0F2E33] transition-colors duration-300 dark:text-white sm:text-[34px] lg:text-[40px]">
              My Education
            </h2>

            <div className="mt-4 flex items-start gap-1.5" aria-hidden="true">
              <span className="block h-[3px] w-[160px] rounded-sm bg-gradient-to-r from-[#8fc4dc] to-[#487081]" />
              <span className="block h-1.5 w-1.5 rounded-full bg-[#2a7fa3]" />
            </div>

            <p className="mt-2 max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:mt-4 sm:text-[17px]">
              Three steps, each built on the last: from school science to a
              diploma in computer technology, the base of my career in tech.
            </p>
          </div>

          <CapIllustration reduce={!!reduce} />
        </div>

        {/* Responsive layout: 1 column → 2 columns → staircase */}
        <ol className="grid items-end gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 cursor-pointer">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const f = !!s.featured;

            return (
              <motion.li
                key={s.year}
                onMouseMove={handleMouseMove}
                initial={reduce ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative isolate flex min-w-0 flex-col justify-between gap-6 overflow-hidden rounded-2xl border p-5 transition-all duration-500 hover:-translate-y-1 sm:p-6 lg:gap-8 ${s.height}
                  ${i === 2 ? "sm:col-span-2 lg:col-span-1" : ""}
                  ${
                    f
                      ? "border-[#2a7fa3]/40 bg-gradient-to-br from-[#102632] via-[#0b1722] to-[#080d14] text-white shadow-[0_16px_45px_-15px_rgba(42,127,163,0.28)] hover:border-[#38bdf8]/60 hover:shadow-[0_20px_55px_-15px_rgba(42,127,163,0.38)]"
                      : "border-[#0E1525]/10 bg-white text-[#0E1525] shadow-[0_8px_24px_-12px_rgba(14,21,37,0.15)] hover:border-[#15919B]/60 hover:shadow-[0_16px_40px_-12px_rgba(42,127,163,0.25)] dark:border-white/[0.09] dark:bg-gradient-to-br dark:from-[#111c27] dark:via-[#0b121b] dark:to-[#090d13] dark:text-slate-100 dark:shadow-[0_10px_35px_-18px_rgba(0,0,0,0.8)] dark:hover:border-[#38bdf8]/45 dark:hover:shadow-[0_18px_45px_-15px_rgba(42,127,163,0.2)]"
                  }`}
              >
                {/* Cursor-following spotlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: f
                      ? "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(42,127,163,0.35), transparent 70%)"
                      : "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(21,145,155,0.19), transparent 70%)",
                  }}
                />

                {/* Accent glow */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-14 -top-14 size-44 rounded-full blur-3xl transition-opacity duration-500 ${
                    f
                      ? "bg-[#2a7fa3]/35 group-hover:bg-[#38bdf8]/30"
                      : "bg-[#2a7fa3]/10 group-hover:bg-[#2a7fa3]/20 dark:bg-[#2a7fa3]/15 dark:group-hover:bg-[#38bdf8]/20"
                  }`}
                />

                {/* Year + icon */}
                <div className="relative flex items-start justify-between gap-3">
                  <span
                    className={`font-display text-5xl font-extrabold leading-none tracking-[-0.05em] transition-colors duration-300 sm:text-6xl ${
                      f
                        ? "text-white group-hover:text-[#7dd3fc]"
                        : "text-[#0E1525] group-hover:text-[#2a7fa3] dark:text-slate-100 dark:group-hover:text-[#7dd3fc]"
                    }`}
                  >
                    {s.year}
                  </span>

                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 group-hover:text-white ${
                      f
                        ? "bg-[#38bdf8]/15 text-[#7dd3fc] group-hover:bg-[#15919B]"
                        : "bg-[#15919B]/10 text-[#15919B] group-hover:bg-[#15919B] dark:bg-[#38bdf8]/10 dark:text-[#7dd3fc] dark:group-hover:bg-[#15919B]"
                    }`}
                  >
                    <Icon
                      className="size-5 sm:size-[22px]"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </span>
                </div>

                {/* Education details */}
                <div className="relative space-y-3">
                  <p
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      f
                        ? "border border-white/10 bg-white/10 text-[#F2B544]"
                        : "border border-[#2a7fa3]/10 bg-[#2a7fa3]/10 text-[#2a7fa3] dark:border-[#38bdf8]/15 dark:bg-[#38bdf8]/10 dark:text-[#7dd3fc]"
                    }`}
                  >
                    {s.tag}
                  </p>

                  <h3
                    className={`font-display text-lg font-bold leading-tight tracking-[-0.02em] transition-colors duration-300 sm:text-xl ${
                      f ? "text-white" : "text-[#584e4e] dark:text-slate-100"
                    }`}
                  >
                    {s.degree}
                  </h3>

                  <p
                    className={`text-sm transition-colors duration-300 sm:text-base ${
                      f
                        ? "text-white/70"
                        : "text-[#0E1525]/70 dark:text-slate-400"
                    }`}
                  >
                    {s.field}
                  </p>

                  <p
                    className={`flex items-start gap-2 border-t pt-3 text-sm font-medium transition-colors duration-300 ${
                      f
                        ? "border-white/15 text-slate-200"
                        : "border-[#0E1525]/10 text-[#0E1525]/80 dark:border-white/10 dark:text-slate-300"
                    }`}
                  >
                    <MapPin
                      className={`mt-0.5 size-4 flex-none ${
                        f
                          ? "text-[#F2B544]"
                          : "text-[#2a7fa3] dark:text-[#7dd3fc]"
                      }`}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />

                    <span className="min-w-0 break-words">{s.institute}</span>
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
