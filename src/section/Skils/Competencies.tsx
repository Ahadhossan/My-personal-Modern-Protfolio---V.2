import React, { useState } from "react";
import type { PointerEvent } from "react";

import { ChevronDown } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

import { competencies, type Competency } from "../../Data/competencies";

const INITIAL_COUNT = 6;

const GRID_CLASSES =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Variants ---------- */

// Reduced-motion fallback: everything is simply visible
const still: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const eyebrowBarVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.75, ease: EASE } },
};

const headingVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 44, scale: 0.96, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE },
  },
};

/* ---------- Card ---------- */

interface CardProps {
  item: Competency;
  number: number;
  reduceMotion: boolean;
}

const CompetencyCard: React.FC<CardProps> = ({
  item,
  number,
  reduceMotion,
}) => {
  const Icon = item.icon;

  // Pointer position inside the card (0 → 1) drives a gentle 3D tilt
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // Pixel position drives the cursor spotlight
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), spring);

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mx}px ${my}px, rgba(21,145,155,0.14), transparent 70%)`;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mx.set(x);
    my.set(y);
    px.set(x / rect.width);
    py.set(y / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      variants={reduceMotion ? still : cardVariants}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 900 }
      }
      className="group/card relative h-full"
    >
      {/* Number Tab */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-6 -right-4 z-10 flex h-11 min-w-11 translate-x-[-12px] items-center justify-center rounded-xl bg-[#15919B] px-3 font-space text-sm font-bold text-white opacity-0 shadow-lg shadow-teal-900/20 transition-all duration-300 ease-out group-hover/card:translate-x-0 group-hover/card:opacity-100 sm:h-12 sm:min-w-12 sm:text-base"
      >
        {String(number).padStart(2, "0")}
      </span>

      {/* Card */}
      <div className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-[#0E1525]/15 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#15919B] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-20px_rgba(21,145,155,0.3)] dark:border-white/10 dark:bg-slate-900 dark:hover:border-[#15919B] dark:hover:shadow-[0_24px_48px_-20px_rgba(21,145,155,0.2)] sm:p-6">
        {/* Cursor spotlight */}
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {/* Icon */}
        <div className="relative flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#15919B]/10 text-[#15919B] transition-[background-color,color,transform] duration-500 ease-in-out group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#15919B] group-hover:text-white dark:bg-[#15919B]/15 dark:text-[#42c5ce] dark:group-hover:bg-[#15919B] dark:group-hover:text-white">
            <Icon size={22} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>

        {/* Title */}
        <h3 className="relative mt-4 text-base font-semibold text-[#584e4e] transition-colors duration-300 dark:text-slate-100 sm:text-lg">
          {item.title}
        </h3>

        {/* Description */}
        <p className="relative mt-2 text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]">
          {item.description}
        </p>

        {/* Bottom Accent */}
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#15919B] transition-all duration-500 ease-out group-hover:w-full" />
      </div>
    </motion.div>
  );
};

/* ---------- Section ---------- */

const HEADING_WORDS = "CORE COMPETENCIES".split(" ");

const Competencies: React.FC = () => {
  const reduceMotion = Boolean(useReducedMotion());
  const [showAll, setShowAll] = useState<boolean>(false);

  const total = competencies.length;
  const hasMore = total > INITIAL_COUNT;

  const initialItems = competencies.slice(0, INITIAL_COUNT);
  const extraItems = competencies.slice(INITIAL_COUNT);

  const shown = showAll ? total : Math.min(INITIAL_COUNT, total);

  return (
    <section
      id="competencies"
      className="relative border-t border-black/10 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-[#050505]"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-30">
        {/* Header: eyebrow, then heading words */}
        <motion.div
          variants={reduceMotion ? still : headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3 sm:mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-1.5">
              <motion.i
                variants={reduceMotion ? still : eyebrowBarVariants}
                style={{ originX: 0 }}
                className="block h-[3px] w-[70px] rounded-sm bg-gradient-to-r from-[#8fc4dc] to-[#487081]"
              />
            </div>

            <motion.span
              variants={reduceMotion ? still : fadeRight}
              className="font-space text-[10px] uppercase tracking-[0.2em] text-black transition-colors duration-300 dark:text-slate-400 sm:text-xs sm:tracking-[0.25em]"
            >
              Skills & Expertise
            </motion.span>
          </div>

          {/* Heading */}
          <motion.h2
            aria-label="CORE COMPETENCIES"
            variants={reduceMotion ? still : headingVariants}
            className="text-[28px] font-semibold leading-tight text-[#0F2E33] transition-colors duration-300 dark:text-white sm:text-[34px] lg:text-[40px]"
          >
            {HEADING_WORDS.map((word) => (
              <span
                key={word}
                aria-hidden="true"
                className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom"
              >
                <motion.span
                  variants={reduceMotion ? still : wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
        </motion.div>

        <div id="competencies-list" className="mt-8 sm:mt-10">
          {/* Initial Cards */}
          <motion.div
            variants={reduceMotion ? still : gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            className={GRID_CLASSES}
          >
            {initialItems.map((item, index) => (
              <CompetencyCard
                key={item.title}
                item={item}
                number={index + 1}
                reduceMotion={reduceMotion}
              />
            ))}
          </motion.div>

          {/* Extra Cards: height expands, cards stagger in */}
          {hasMore && (
            <AnimatePresence initial={false}>
              {showAll && (
                <motion.div
                  key="extra-cards"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
                  className="-mx-5 overflow-hidden px-5 sm:-mx-6 sm:px-6"
                >
                  <div className="pb-6 pt-4 sm:pt-5">
                    <motion.div
                      variants={
                        reduceMotion
                          ? still
                          : {
                              hidden: {},
                              visible: {
                                transition: {
                                  staggerChildren: 0.09,
                                  delayChildren: 0.2,
                                },
                              },
                            }
                      }
                      initial="hidden"
                      animate="visible"
                      className={GRID_CLASSES}
                    >
                      {extraItems.map((item, index) => (
                        <CompetencyCard
                          key={item.title}
                          item={item}
                          number={INITIAL_COUNT + index + 1}
                          reduceMotion={reduceMotion}
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Show More / Less */}
        {hasMore && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: EASE }}
            className={`flex flex-col items-center gap-3 transition-[margin] duration-700 ease-in-out ${
              showAll ? "mt-2" : "mt-8 sm:mt-10"
            }`}
          >
            {/* Count text: "Showing 6 of 15", number slides when it changes */}
            <p
              aria-live="polite"
              className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"
            >
              Showing
              <span className="relative inline-flex min-w-[1.5ch] justify-center overflow-hidden font-semibold tabular-nums text-[#0F2E33] dark:text-white">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={shown}
                    initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={reduceMotion ? undefined : { y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="inline-block"
                  >
                    {shown}
                  </motion.span>
                </AnimatePresence>
              </span>
              of {total} competencies
            </p>

            {/* Progress track fills as more cards are shown */}
            <div
              aria-hidden="true"
              className="h-1 w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
            >
              <motion.div
                initial={false}
                animate={{ width: `${(shown / total) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="h-full rounded-full bg-gradient-to-r from-[#15919B] to-[#2a7fa3]"
              />
            </div>

            <motion.button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              aria-controls="competencies-list"
              whileHover={reduceMotion ? undefined : { y: -3, scale: 1.04 }}
              whileTap={reduceMotion ? undefined : { scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-[#15919B] px-6 py-2.5 text-sm font-medium text-[#0F2E33] transition-colors duration-300 hover:bg-[#15919B] hover:text-white dark:border-[#15919B]/70 dark:text-slate-200 dark:hover:bg-[#15919B] dark:hover:text-white"
            >
              {/* Label swaps with a short slide */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={showAll ? "less" : "more"}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.16 }}
                >
                  {showAll ? "Show Less" : `Show ${total - INITIAL_COUNT} More`}
                </motion.span>
              </AnimatePresence>

              <motion.span
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="inline-flex"
              >
                <ChevronDown
                  className="h-3.5 w-3.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Competencies;
