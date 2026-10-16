"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import { FolderKanban, Building2, BadgeCheck } from "lucide-react";

interface StatItem {
  title: string;
  hint: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
}

const stats: StatItem[] = [
  {
    title: "Projects Completed",
    hint: "Web, mobile and dashboards",
    value: 90,
    suffix: "+",
    icon: FolderKanban,
  },
  {
    title: "Company Projects",
    hint: "Shipped with real teams",
    value: 3,
    suffix: "+",
    icon: Building2,
  },
  {
    title: "Years of Experience",
    hint: "Building for the web",
    value: 2,
    suffix: "+",
    icon: BadgeCheck,
  },
];

const Counter: React.FC<{ value: number; suffix: string }> = ({
  value,
  suffix,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (reduce) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });

    return () => controls.stop();
  }, [isInView, value, reduce]);

  return (
    <div
      ref={ref}
      className="flex items-baseline gap-1 text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl"
    >
      <span
        className="
          bg-gradient-to-b from-slate-900 to-slate-600
          bg-clip-text text-transparent
          transition-all duration-300
          hover:-translate-y-1
          dark:from-white dark:to-slate-400
        "
      >
        {display}
      </span>

      <span
        className="
          text-3xl text-[#15919B] sm:text-4xl
          transition-colors duration-500 ease-in-out
        "
      >
        {suffix}
      </span>
    </div>
  );
};

const StatCard: React.FC<{ item: StatItem; index: number }> = ({
  item,
  index,
}) => {
  const Icon = item.icon;

  // Cursor spotlight effect
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      onMouseMove={onMove}
      className="
        group relative isolate cursor-pointer overflow-hidden rounded-3xl
        border border-slate-200 bg-white p-6
        shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_40px_-20px_rgba(15,23,42,0.15)]

        transition-all duration-300
          hover:-translate-y-1 hover:border-[#15919B]/40
        hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-20px_rgba(21,145,155,0.3)]

        dark:border-slate-700/70 dark:bg-slate-900
        dark:shadow-[0_12px_35px_-20px_rgba(0,0,0,0.6)]
        dark:hover:border-[#15919B]/60
        dark:hover:shadow-[0_24px_48px_-20px_rgba(21,145,155,0.2)]
        sm:p-8
      "
    >
      {/* Cursor Spotlight */}
      <div
        className="
          pointer-events-none absolute -inset-px -z-10
          opacity-0 transition-opacity duration-300 ease-in-out
          group-hover:opacity-100
        "
        style={{
          background:
            "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(21,145,155,0.19), transparent 70%)",
        }}
      />

      {/* Icon */}
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

      {/* Animated Counter */}
      <div className="mt-8">
        <Counter value={item.value} suffix={item.suffix} />
      </div>
      {/* Text */}
      <h3
        className="mt-4 text-base font-semibold
            text-[#584e4e] transition-colors duration-300
            dark:text-slate-100
            sm:text-lg
          "
      >
        {item.title}
      </h3>

      <p className="mt-2 text-[16px] leading-relaxed= text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]">
        {item.hint}
      </p>
    </motion.div>
  );
};

const StatsSection: React.FC = () => {
  return (
    <section
      className="
        border-t border-black/10 dark:border-slate-800 relative bg-white transition-colors duration-300 dark:bg-[#050505] 
      "
    >
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-3 mx-auto max-w-7xl
        px-5 py-14 sm:px-6 sm:py-24 md:px-10 md:py-30

        transition-[background-color,border-color,color]
        duration-500 ease-in-out "
      >
        {stats.map((item, index) => (
          <StatCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
