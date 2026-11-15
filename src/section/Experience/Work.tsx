import React, { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

import { Briefcase, MapPin, CalendarDays } from "lucide-react";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";

import SectionEyebrow from "../../common/SectionEyebrow";
import { jobs } from "../../Data/Work";
import type { Job } from "../../Data/Work";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Variants ---------- */

const still: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -30 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 14 },
  },
};

const wordMask: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.75, ease: EASE } },
};

const barVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
};

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 500, damping: 14, delay: 0.5 },
  },
};

const itemVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const nodeWrapVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 16 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 44, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

const pointsList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const pointItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

const bulletDot: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 14 },
  },
};

/* ---------- Connecting Line ---------- */

const TimelineLine: React.FC<{ reduceMotion: boolean }> = ({
  reduceMotion,
}) => {
  const lineRef = useRef<HTMLSpanElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.6", "end 0.6"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  return (
    <span
      ref={lineRef}
      aria-hidden="true"
      className="absolute -bottom-5 left-1.5 top-8 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-[#42464e]/15 dark:bg-white/15 sm:-bottom-6 sm:top-9"
    >
      <motion.span
        style={{ scaleY: reduceMotion ? 1 : scaleY, originY: 0 }}
        className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2a7fa3] to-[#8fc4dc] will-change-transform dark:from-[#5bb8e0] dark:to-[#2a7fa3]"
      />
    </span>
  );
};

/* ---------- Timeline Node ---------- */

const TimelineNode: React.FC<{
  current?: boolean;
  reduceMotion: boolean;
}> = ({ current, reduceMotion }) => {
  const nodeRef = useRef<HTMLSpanElement | null>(null);
  const [active, setActive] = useState(reduceMotion);

  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["start 0.6", "end 0.6"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduceMotion) setActive(v > 0);
  });

  useEffect(() => {
    if (reduceMotion) {
      setActive(true);
    } else {
      setActive(scrollYProgress.get() > 0);
    }
  }, [reduceMotion, scrollYProgress]);

  return (
    <motion.span
      ref={nodeRef}
      animate={{ scale: active ? 1.25 : 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 16 }}
      className={`relative z-10 flex h-3 w-3 items-center justify-center rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-500 motion-reduce:transition-none ${
        active
          ? "border-[#2a7fa3] bg-[#2a7fa3] shadow-[0_0_0_4px_rgba(42,127,163,0.18)] dark:border-[#5bb8e0] dark:bg-[#5bb8e0] dark:shadow-[0_0_0_4px_rgba(91,184,224,0.2)]"
          : "border-[#42464e]/30 bg-white dark:border-white/25 dark:bg-slate-900"
      }`}
    >
      {active && !reduceMotion && (
        <motion.span
          aria-hidden="true"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute h-3 w-3 rounded-full border border-[#2a7fa3] dark:border-[#5bb8e0]"
        />
      )}

      {current && (
        <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#2a7fa3]/70 motion-reduce:hidden dark:bg-[#5bb8e0]/70" />
      )}
    </motion.span>
  );
};

/* ---------- Timeline Item ---------- */

const TimelineItem: React.FC<{
  job: Job;
  isLast: boolean;
  reduceMotion: boolean;
}> = ({ job, isLast, reduceMotion }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgba(42,127,163,0.12), transparent 70%)`;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;

    const rect = e.currentTarget.getBoundingClientRect();

    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      variants={reduceMotion ? still : itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="group relative grid grid-cols-[auto_1fr] gap-x-3 pb-8 last:pb-0 sm:gap-x-8 sm:pb-12"
    >
      {!isLast && <TimelineLine reduceMotion={reduceMotion} />}

      <motion.div
        variants={reduceMotion ? still : nodeWrapVariants}
        className="flex flex-col items-center pt-5 sm:pt-6"
      >
        <TimelineNode current={job.current} reduceMotion={reduceMotion} />
      </motion.div>

      <motion.div
        variants={reduceMotion ? still : cardVariants}
        onPointerMove={handleMove}
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -4,
                transition: { type: "spring", stiffness: 320, damping: 22 },
              }
        }
        className="relative min-w-0 cursor-pointer overflow-hidden rounded-xl border border-[#42464e]/40 bg-white/70 px-4 py-4 shadow-[0_8px_24px_-12px_rgba(14,21,37,0.15)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#15919B] group-hover:shadow-[0_16px_40px_-12px_rgba(42,127,163,0.35)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] sm:px-6 sm:py-5"
      >
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#2a7fa3] to-[#8fc4dc] transition-transform duration-500 ease-out group-hover:scale-x-100 dark:from-[#5bb8e0] dark:to-[#2a7fa3]"
        />

        <motion.div
          variants={reduceMotion ? still : cardItem}
          className="relative flex flex-wrap items-center gap-x-3 gap-y-1"
        >
          <span className="flex items-center gap-1.5 font-space text-xs font-medium tracking-wide text-[#42464e] dark:text-slate-300">
            <CalendarDays
              size={14}
              className="text-[#2a7fa3] dark:text-[#5bb8e0]"
            />
            {job.duration}
          </span>

          {job.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a7fa3]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#2a7fa3] dark:bg-[#5bb8e0]/15 dark:text-[#5bb8e0]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-current opacity-75 motion-safe:animate-ping" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-current" />
              </span>
              Current
            </span>
          )}
        </motion.div>

        <motion.h3
          variants={reduceMotion ? still : cardItem}
          className="relative mt-2 font-space text-lg font-semibold text-[#584e4e] transition-colors duration-300 group-hover:text-[#2a7fa3] dark:text-slate-100 dark:group-hover:text-[#5bb8e0] sm:text-xl"
        >
          {job.role}
        </motion.h3>

        <motion.p
          variants={reduceMotion ? still : cardItem}
          className="relative mt-1 text-sm font-medium text-[#2a7fa3] dark:text-[#5bb8e0]"
        >
          {job.company}
        </motion.p>

        <motion.p
          variants={reduceMotion ? still : cardItem}
          className="relative mt-1 flex items-center gap-1.5 text-xs text-[#8C93A0] dark:text-slate-400 sm:text-sm"
        >
          <MapPin size={14} />
          {job.location}
        </motion.p>

        <motion.ul
          variants={reduceMotion ? still : pointsList}
          className="relative mt-4 space-y-2.5"
        >
          {job.points.map((point, i) => (
            <motion.li
              key={i}
              variants={reduceMotion ? still : pointItem}
              className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-slate-300 sm:text-base"
            >
              <motion.span
                variants={reduceMotion ? still : bulletDot}
                className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#2a7fa3]/80 dark:bg-[#5bb8e0]/80"
              />
              <span>{point}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

/* ---------- Work Section ---------- */

const Work: React.FC = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="relative isolate w-full  bg-white px-5 py-20 transition-colors duration-300 dark:bg-[#050505] sm:px-6 sm:py-24 md:px-10 md:py-30"
    >
      {/* Full-width background; constrained inner content */}
      <div className="mx-auto w-full max-w-7xl">
        {/* Eyebrow */}
        <div className="mb-4 flex items-center gap-3 md:mb-6">
          <SectionEyebrow label="My Career Journey" />
        </div>

        {/* Header */}
        <motion.div
          variants={reduceMotion ? still : headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <h2
            id="work-heading"
            className="flex items-center gap-3 font-space text-2xl font-semibold tracking-tight text-[#0F2E33] transition-colors duration-300 dark:text-white sm:text-3xl md:text-4xl"
          >
            <motion.span
              variants={reduceMotion ? still : iconVariants}
              className="flex items-center justify-center text-[#2a7fa3] dark:text-[#5bb8e0]"
            >
              <Briefcase size={30} aria-hidden="true" />
            </motion.span>

            <span className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                variants={reduceMotion ? still : wordMask}
                className="inline-block"
              >
                Work
              </motion.span>
            </span>
          </h2>

          <div className="mt-2 mb-0 flex items-center justify-center gap-1.5">
            <motion.i
              variants={reduceMotion ? still : barVariants}
              style={{ originX: 0 }}
              className="block h-[3px] w-[90px] rounded-sm bg-gradient-to-r from-[#8fc4dc] to-[#487081] dark:from-[#5bb8e0] dark:to-[#2a7fa3]"
            />

            <motion.b
              variants={reduceMotion ? still : dotVariants}
              className="h-1.5 w-1.5 rounded-full bg-[#2a7fa3] dark:bg-[#5bb8e0]"
            />
          </div>

          <motion.p
            variants={reduceMotion ? still : fadeUp}
            className="mt-2 max-w-lg text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:mt-4 sm:text-[17px]"
          >
            I have worked in software development, digital marketing, and
            product support across different industries and technologies.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="mx-auto mt-10 max-w-7xl md:mt-14">
          {jobs.map((job, index) => (
            <TimelineItem
              key={`${job.role}-${job.company}`}
              job={job}
              isLast={index === jobs.length - 1}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
