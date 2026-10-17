import { useEffect, useRef, useState, type CSSProperties } from "react";

const careerTargets: string[] = [
  "Frontend Developer",
  "React.js Developer",
  "Next.js Developer",
  "Web Developer",
  "Junior Software Engineer",
  "Junior Frontend Engineer",
  "UI & UX Developer",
  "Software Support Engineer",
  "Product Support Engineer",
];

const firstRow = careerTargets.slice(0, 4);
const secondRow = careerTargets.slice(4);

// Number of times each row is repeated. The animation moves by
// -(100 / COPIES)% so the loop is seamless.
const COPIES = 4;

// How long the heading stays on screen before it moves away (ms)
const HEADING_DURATION = 1000;

type MarqueeRowProps = {
  items: string[];
  reverse?: boolean;
  duration?: number;
};

function MarqueeRow({
  items,
  reverse = false,
  duration = 36,
}: MarqueeRowProps) {
  const repeatedItems = Array.from({ length: COPIES }).flatMap(() => items);

  return (
    <div className="career-marquee w-full overflow-hidden">
      <div
        className="career-marquee-track flex w-max items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {repeatedItems.map((career, index) => (
          <div
            key={`${career}-${index}`}
            aria-hidden={index >= items.length ? true : undefined}
            className="career-item group flex shrink-0 items-center gap-6 px-5 py-3 sm:gap-8 sm:px-7 lg:gap-10 lg:px-9"
          >
            <span className="career-outline inline-block whitespace-nowrap text-[clamp(1.25rem,3.1vw,3.4rem)] font-black uppercase leading-none tracking-[-0.045em] transition-transform duration-500 ease-out group-hover:scale-[1.04]">
              {career}
            </span>

            <span
              aria-hidden="true"
              className="career-diamond h-3 w-3 shrink-0 rotate-45 sm:h-4 sm:w-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

type HeadingWordProps = {
  text: string;
  startIndex: number;
  gradient?: boolean;
};

/** Splits a word into letters so each one can animate with a stagger. */
function HeadingWord({ text, startIndex, gradient = false }: HeadingWordProps) {
  const chars = Array.from(text);

  return (
    <span className="inline-flex" aria-hidden="true">
      {chars.map((char, i) => {
        const style = {
          "--i": startIndex + i,
          ...(gradient
            ? {
                backgroundImage: "linear-gradient(90deg, #15919B, #2a7fa3)",
                backgroundSize: `${chars.length * 100}% 100%`,
                backgroundPosition: `${
                  chars.length > 1 ? (i / (chars.length - 1)) * 100 : 0
                }% 0`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }
            : {}),
        } as CSSProperties;

        return (
          <span key={i} className="career-char" style={style}>
            {char}
          </span>
        );
      })}
    </span>
  );
}

type Phase = "idle" | "intro" | "done";

const CareerTarget = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;

    // Reduced motion: skip the intro, show the rows directly
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("intro");
          timer = setTimeout(() => setPhase("done"), HEADING_DURATION);
          observer.disconnect(); // run only once
        }
      },
      { threshold: 0.45 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="career-target"
      aria-labelledby="career-target-heading"
      className="career-target-section relative isolate overflow-hidden bg-white py-12 text-slate-950 dark:bg-[#050505] dark:text-white sm:px-6 sm:py-24 md:px-10 md:py-30"
    >
      {/* <div
        aria-hidden="true"
        className="mx-auto border-t border-[#0E1525]/10 transition-colors duration-300 dark:border-white/10"
      /> */}
      <div ref={stageRef} data-phase={phase} className="career-stage relative">
        {/* Intro heading: reveals first, then moves away */}
        <div className="career-heading pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center">
          <h2
            id="career-target-heading"
            className="flex flex-wrap justify-center gap-x-[0.28em] text-[clamp(1.25rem,6vw,5rem)] font-bold leading-tight tracking-tight text-[#0F2E33] dark:text-white"
          >
            <span className="sr-only">My Career Target</span>
            <HeadingWord text="My" startIndex={0} />
            <HeadingWord text="Career" startIndex={2} />
            <HeadingWord text="Target" startIndex={8} gradient />
          </h2>

          {/* <span
            aria-hidden="true"
            className="career-heading-line mt-4 block h-[3px] rounded-full bg-gradient-to-r from-[#2a7fa3] to-[#6366f1]"
          /> */}
        </div>

        {/* Animated career rows (MarqueeRow design unchanged) */}
        <div className="relative flex flex-col gap-5 sm:gap-7">
          <div
            className="career-reveal"
            style={{ "--d": "0ms" } as CSSProperties}
          >
            <MarqueeRow items={firstRow} duration={36} />
          </div>
          <div
            className="career-reveal"
            style={{ "--d": "150ms" } as CSSProperties}
          >
            <MarqueeRow items={secondRow} reverse duration={32} />
          </div>
        </div>
      </div>

      {/* <div
        aria-hidden="true"
        className="mx-auto border-t border-[#0E1525]/10 transition-colors duration-300 dark:border-white/10 mt-12"
      /> */}

      <style>{`
        /* ---------- Heading intro ---------- */
        .career-heading {
          opacity: 0;
          transform: translateY(0) scale(1);
          filter: blur(0);
          will-change: transform, opacity, filter;
        }

        .career-stage[data-phase="intro"] .career-heading {
          opacity: 1;
        }

        /* Heading moves away */
        .career-stage[data-phase="done"] .career-heading {
          opacity: 0;
          transform: translateY(-48px) scale(0.92);
          filter: blur(12px);
          transition:
            opacity 700ms ease,
            transform 800ms cubic-bezier(0.65, 0, 0.35, 1),
            filter 700ms ease;
        }

        .career-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(0.6em) rotateX(-80deg);
          transform-origin: 50% 100%;
          filter: blur(8px);
          white-space: pre;
        }

        .career-stage[data-phase="intro"] .career-char,
        .career-stage[data-phase="done"] .career-char {
          animation: career-char-in 750ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: calc(var(--i) * 45ms);
        }

        @keyframes career-char-in {
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
            filter: blur(0);
          }
        }

        .career-heading-line {
          width: 0;
          opacity: 0;
        }

        .career-stage[data-phase="intro"] .career-heading-line,
        .career-stage[data-phase="done"] .career-heading-line {
          animation: career-line-in 900ms cubic-bezier(0.65, 0, 0.35, 1) 600ms forwards;
        }

        @keyframes career-line-in {
          to {
            width: clamp(80px, 12vw, 140px);
            opacity: 1;
          }
        }

        /* ---------- Marquee rows reveal ---------- */
        .career-reveal {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
          filter: blur(8px);
          will-change: transform, opacity, filter;
        }

        .career-stage[data-phase="done"] .career-reveal {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
          transition:
            opacity 900ms ease,
            transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1),
            filter 800ms ease;
          transition-delay: calc(250ms + var(--d, 0ms));
        }

        /* ---------- Marquee (unchanged) ---------- */
        .career-marquee {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
        }

        .career-marquee-track {
          width: max-content;
          animation-name: career-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        @keyframes career-scroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-25%, 0, 0);
          }
        }

        .career-outline {
          color: transparent;
          -webkit-text-stroke: 1px #94a3b8;
        }

        .dark .career-outline {
          -webkit-text-stroke-color: #52677f;
        }

        /* Light mode gradient hover */
        .career-item:hover .career-outline {
          background: linear-gradient(
            90deg,
            #0284c7,
            #4f46e5,
            #9333ea,
            #0284c7
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke-color: transparent;
          animation: career-gradient 2s linear infinite;
          text-shadow: none;
          filter: drop-shadow(0 0 10px rgb(99 102 241 / 25%));
        }

        /* Dark mode neon hover */
        .dark .career-item:hover .career-outline {
          background: linear-gradient(
            90deg,
            #22d3ee,
            #3b82f6,
            #c084fc,
            #22d3ee
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke-color: transparent;
          animation: career-gradient 2s linear infinite;
          filter: drop-shadow(0 0 9px rgb(34 211 238 / 30%));
        }

        .career-diamond {
          background: linear-gradient(
            135deg,
            #38bdf8,
            #6366f1 55%,
            #a855f7
          );
          box-shadow: 0 0 12px rgb(99 102 241 / 25%);
          transition: box-shadow 350ms ease;
        }

        .career-item:hover .career-diamond {
          box-shadow:
            0 0 12px rgb(56 189 248 / 65%),
            0 0 25px rgb(168 85 247 / 35%);
          animation: diamond-pulse 1.2s ease-in-out infinite alternate;
        }

        @keyframes career-gradient {
          from {
            background-position: 0% center;
          }

          to {
            background-position: 200% center;
          }
        }

        @keyframes diamond-pulse {
          from {
            transform: rotate(45deg) scale(1);
          }

          to {
            transform: rotate(225deg) scale(1.2);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .career-heading {
            display: none;
          }

          .career-reveal {
            opacity: 1;
            transform: none;
            filter: none;
          }

          .career-marquee {
            -webkit-mask-image: none;
            mask-image: none;
          }

          .career-marquee-track {
            animation: none !important;
            transform: none !important;
            width: 100%;
            flex-wrap: wrap;
            justify-content: center;
          }

          .career-item[aria-hidden="true"] {
            display: none;
          }

          .career-item:hover .career-outline,
          .career-item:hover .career-diamond {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CareerTarget;
