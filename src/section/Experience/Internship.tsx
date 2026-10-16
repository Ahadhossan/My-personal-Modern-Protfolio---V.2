import React, { useEffect, useRef, useState } from "react";
import { MapPin, CalendarDays } from "lucide-react";

interface Job {
  role: string;
  company: string;
  location: string;
  duration: string;
  current?: boolean;
  points: string[];
}

const jobs: Job[] = [
  {
    role: "Industrial Attachment – Professional Web Development Specialist (PWDS)",
    company: "People N Tech Limited",
    location: "Dhaka, Bangladesh · On-site",
    duration: "Oct 2022 – Jan 2023",
    points: [
      "Gained practical experience in frontend and backend web development.",
      "Worked with HTML, CSS, JavaScript, PHP, and MySQL on real-world development projects.",
      "Practiced responsive web development and database-driven application development.",
      "Collaborated with team members using Agile development practices and Git-based version control.",
    ],
  },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Reveals its children once the element scrolls into view, then stops
 * observing. Respects prefers-reduced-motion by skipping the animation.
 */
const useInView = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

/**
 * Scroll-linked timeline progress.
 * - `active`   : the reading line (60% down the viewport) has reached the node
 * - `progress` : 0 -> 1, how much of the connecting line the reading line passed
 * Reduced-motion users get the finished state straight away.
 */
const useTimelineProgress = () => {
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const nodeRef = useRef<HTMLSpanElement | null>(null);
  const [state, setState] = useState(() => {
    const done = prefersReducedMotion();
    return { progress: done ? 1 : 0, active: done };
  });

  useEffect(() => {
    if (prefersReducedMotion()) {
      setState({ progress: 1, active: true });
      return;
    }

    let raf = 0;

    const update = () => {
      raf = 0;
      const readY = window.innerHeight * 0.6;

      const active = nodeRef.current
        ? nodeRef.current.getBoundingClientRect().top <= readY
        : false;

      let progress = active ? 1 : 0;
      if (lineRef.current) {
        const rect = lineRef.current.getBoundingClientRect();
        progress = Math.min(1, Math.max(0, (readY - rect.top) / rect.height));
      }

      setState((prev) =>
        prev.active === active && Math.abs(prev.progress - progress) < 0.002
          ? prev
          : { progress, active },
      );
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { lineRef, nodeRef, ...state };
};

const revealClass = (visible: boolean) =>
  `transition-all duration-700 ease-out motion-reduce:transition-none ${
    visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
  }`;

const revealStyle = (visible: boolean, delay: number): React.CSSProperties => ({
  transitionDelay: visible ? `${delay}ms` : "0ms",
});

/*
  Palette
  light accent #2a7fa3  ->  dark accent #5bb8e0 (brighter, reads on dark bg)
*/
const TimelineItem: React.FC<{ job: Job; index: number; isLast: boolean }> = ({
  job,
  index,
  isLast,
}) => {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const { lineRef, nodeRef, progress, active } = useTimelineProgress();

  return (
    <div
      ref={ref}
      style={revealStyle(isVisible, index * 120)}
      className={`group relative grid grid-cols-[auto_1fr] gap-x-3 pb-8 last:pb-0 sm:gap-x-8 sm:pb-12 ${revealClass(
        isVisible,
      )}`}
    >
      {/* Connecting line: faint track + fill that draws while scrolling */}
      {!isLast && (
        <span
          ref={lineRef}
          aria-hidden="true"
          className="absolute -bottom-5 left-1.5 top-8 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-[#42464e]/15 dark:bg-white/15 sm:-bottom-6 sm:top-9"
        >
          <span
            className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-[#2a7fa3] to-[#8fc4dc] transition-transform duration-150 ease-out will-change-transform motion-reduce:transition-none dark:from-[#5bb8e0] dark:to-[#2a7fa3]"
            style={{ transform: `scaleY(${progress})` }}
          />
        </span>
      )}

      {/* Node */}
      <div className="flex flex-col items-center pt-5 sm:pt-6">
        <span
          ref={nodeRef}
          className={`relative z-10 flex h-3 w-3 items-center justify-center rounded-full border-2 transition-all duration-500 motion-reduce:transition-none ${
            active
              ? "scale-125 border-[#2a7fa3] bg-[#2a7fa3] shadow-[0_0_0_4px_rgba(42,127,163,0.18)] dark:border-[#5bb8e0] dark:bg-[#5bb8e0] dark:shadow-[0_0_0_4px_rgba(91,184,224,0.2)]"
              : "scale-100 border-[#42464e]/30 bg-white dark:border-white/25 dark:bg-slate-900"
          }`}
        >
          {job.current && (
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#2a7fa3]/70 motion-reduce:hidden dark:bg-[#5bb8e0]/70" />
          )}
        </span>
      </div>

      {/* Content */}
      <div
        className="relative min-w-0 overflow-hidden rounded-xl border border-[#42464e]/40 bg-white/70 px-4 py-4 shadow-[0_8px_24px_-12px_rgba(14,21,37,0.15)] backdrop-blur-sm
  transition-all duration-300
   group-hover:bg-[#2a7fa3]/[0.06] group-hover:shadow-[0_16px_40px_-12px_rgba(42,127,163,0.35)]
  dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]
 dark:group-hover:bg-[#5bb8e0]/10 dark:group-hover:shadow-[0_16px_40px_-12px_rgba(91,184,224,0.25)]
  sm:px-6 sm:py-5 [@media(hover:hover)]:group-hover:-translate-y-0.5 hover:border-[#15919B]
                  dark:border-white/10 dark:bg-slate-900/70
                  dark:hover:border-teal-400/70 cursor-pointer"
      >
        {/* Bottom accent border that draws left -> right on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#2a7fa3] to-[#8fc4dc] transition-transform duration-500 ease-out group-hover:scale-x-100 dark:from-[#5bb8e0] dark:to-[#2a7fa3]"
        />

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="flex items-center gap-1.5 font-space text-xs font-medium tracking-wide text-[#42464e] dark:text-slate-300">
            <CalendarDays
              size={14}
              className="text-[#2a7fa3] dark:text-[#5bb8e0]"
            />
            {job.duration}
          </span>
          {job.current && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2a7fa3]/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#2a7fa3] dark:bg-[#5bb8e0]/15 dark:text-[#5bb8e0]">
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              Current
            </span>
          )}
        </div>

        <h3 className="mt-2 font-space text-lg font-semibold text-[#584e4e] transition-colors duration-300 group-hover:text-[#2a7fa3] dark:text-slate-100 dark:group-hover:text-[#5bb8e0] sm:text-xl">
          {job.role}
        </h3>
        <p className="mt-1 text-sm font-medium text-[#2a7fa3] dark:text-[#5bb8e0]">
          {job.company}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#8C93A0] dark:text-slate-400 sm:text-sm">
          <MapPin size={14} />
          {job.location}
        </p>

        <ul className="mt-4 space-y-2.5">
          {job.points.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-slate-300 sm:text-base"
            >
              <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#2a7fa3]/80 dark:bg-[#5bb8e0]/80" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Internship = () => {
  const { ref } = useInView<HTMLDivElement>();

  return (
    <section
      id="internship"
      aria-labelledby="internship-heading"
      className="mx-auto max-w-7xl border-t border-[#42464e]/10  dark:border-white/10 px-5 py-20  sm:px-6 sm:py-24 md:px-10 md:py-30"
    >
      {/* Header */}
      <div
        ref={ref}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <h2
          id="internship-heading"
          className="text-[28px] font-semibold leading-tight text-[#0F2E33] transition-colors duration-300 dark:text-white sm:text-[34px] lg:text-[40px]"
        >
          Internship
        </h2>
        <div className="mt-2 mb-0 flex items-center justify-center gap-1.5">
          <i className="block h-[3px] w-[90px] rounded-sm bg-gradient-to-r from-[#8fc4dc] to-[#487081] dark:from-[#5bb8e0] dark:to-[#2a7fa3]" />
          <b className="h-1.5 w-1.5 rounded-full bg-[#2a7fa3] dark:bg-[#5bb8e0]" />
        </div>
        <p className="mt-2 max-w-lg text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:mt-4 sm:text-[17px]">
          Hands-on industrial attachment where I built real-world web projects
          using frontend and backend technologies in an Agile team.
        </p>
      </div>

      {/* Timeline */}
      <div className="mx-auto mt-10 max-w-7xl md:mt-14">
        {jobs.map((job, index) => (
          <TimelineItem
            key={`${job.role}-${job.company}`}
            job={job}
            index={index}
            isLast={index === jobs.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default Internship;
