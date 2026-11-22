// import { useEffect, useState } from "react";
// import { ArrowUp } from "lucide-react";

// const SCROLL_THRESHOLD = 300;

// interface ScrollProgressProps {
//   isHidden?: boolean;
// }

// const ScrollProgress = ({ isHidden = false }: ScrollProgressProps) => {
//   const [progress, setProgress] = useState(0);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     let ticking = false;
//     let animationFrameId: number | null = null;

//     const updateProgress = () => {
//       const scrollTop = window.scrollY;

//       const scrollableHeight =
//         document.documentElement.scrollHeight - window.innerHeight;

//       const percentage =
//         scrollableHeight > 0
//           ? Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100))
//           : 0;

//       setProgress(Math.round(percentage));
//       setVisible(scrollTop > SCROLL_THRESHOLD);

//       ticking = false;
//       animationFrameId = null;
//     };

//     const handleScroll = () => {
//       if (!ticking) {
//         ticking = true;
//         animationFrameId = window.requestAnimationFrame(updateProgress);
//       }
//     };

//     updateProgress();

//     window.addEventListener("scroll", handleScroll, {
//       passive: true,
//     });

//     window.addEventListener("resize", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleScroll);

//       if (animationFrameId !== null) {
//         window.cancelAnimationFrame(animationFrameId);
//       }
//     };
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div
//       aria-label={`Page scroll progress: ${progress}%`}
//       aria-hidden={isHidden}
//       className={`
//         fixed right-5 top-1/2 z-[60]
//         flex -translate-y-1/2 flex-col
//         items-center gap-3
//         transition-all duration-300 ease-out
//         max-sm:right-2
//         ${
//           visible && !isHidden
//             ? "translate-x-0 opacity-100"
//             : "pointer-events-none translate-x-4 opacity-0"
//         }
//       `}
//     >
//       {/* Percentage */}
//       <span
//         className="
//           min-w-[38px] text-center
//           font-mono text-[11px] font-semibold
//           tracking-tight text-[#2a7fa3]
//           dark:text-[#87c9e6]
//         "
//       >
//         {String(progress).padStart(2, "0")}%
//       </span>

//       {/* Vertical progress track */}
//       <div
//         className="
//           relative h-20 w-[3px] overflow-hidden
//           rounded-full bg-slate-300/60
//           dark:bg-white/15
//         "
//         role="progressbar"
//         aria-label="Page scroll progress"
//         aria-valuemin={0}
//         aria-valuemax={100}
//         aria-valuenow={progress}
//       >
//         <div
//           className="
//             absolute left-0 top-0 w-full
//             rounded-full bg-gradient-to-b
//             from-[#87c9e6] to-[#2a7fa3]
//             transition-[height] duration-150
//           "
//           style={{ height: `${progress}%` }}
//         />
//       </div>

//       {/* Back to top */}
//       <button
//         type="button"
//         onClick={scrollToTop}
//         aria-label="Back to top"
//         title="Back to top"
//         tabIndex={isHidden ? -1 : 0}
//         className="
//           group flex h-10 w-10 items-center
//           justify-center rounded-full
//           border border-[#2a7fa3]/30
//           bg-white/90 text-[#2a7fa3]
//           shadow-md shadow-slate-900/5
//           backdrop-blur-xl
//           transition-all duration-300
//           hover:-translate-y-1 hover:scale-105
//           hover:border-[#2a7fa3]
//           hover:bg-[#2a7fa3] hover:text-white
//           focus-visible:outline-none
//           focus-visible:ring-2
//           focus-visible:ring-[#2a7fa3]
//           dark:border-[#87c9e6]/25
//           dark:bg-slate-900/90
//           dark:text-[#87c9e6]
//           dark:hover:bg-[#2a7fa3]
//           dark:hover:text-white
//         "
//       >
//         <ArrowUp
//           size={18}
//           strokeWidth={2}
//           className="
//             transition-transform duration-300
//             group-hover:-translate-y-0.5
//           "
//         />
//       </button>
//     </div>
//   );
// };

// export default ScrollProgress;

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const SCROLL_THRESHOLD = 300;

interface ScrollProgressProps {
  isHidden?: boolean;
}

const ScrollProgress = ({ isHidden = false }: ScrollProgressProps) => {
  const reduceMotion = Boolean(useReducedMotion());

  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0); // whole number, for screen readers

  // Progress lives in motion values: the bar and the number update without
  // re-rendering React on every scroll event.
  const { scrollY, scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });
  const progress = reduceMotion ? scrollYProgress : smooth;

  // "07%" text and the glowing dot at the end of the fill
  const label = useTransform(
    progress,
    (v) =>
      `${String(Math.round(Math.min(1, Math.max(0, v)) * 100)).padStart(2, "0")}%`,
  );
  const dotTop = useTransform(progress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > SCROLL_THRESHOLD);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPercent(Math.round(Math.min(1, Math.max(0, latest)) * 100));
  });

  // Correct the starting state (e.g. page reloaded mid-scroll)
  useEffect(() => {
    setVisible(window.scrollY > SCROLL_THRESHOLD);
    setPercent(
      Math.round(Math.min(1, Math.max(0, scrollYProgress.get())) * 100),
    );
  }, [scrollYProgress]);

  // Arrow "launches" upward when the button is pressed
  const arrow = useAnimationControls();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });

    if (!reduceMotion) {
      arrow.start({
        y: [0, -22, 22, 0],
        opacity: [1, 0, 0, 1],
        transition: {
          duration: 0.6,
          times: [0, 0.4, 0.5, 1],
          ease: "easeInOut",
        },
      });
    }
  };

  const show = visible && !isHidden;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="scroll-progress"
          role="group"
          aria-label={`Page scroll progress: ${percent}%`}
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: 28 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          style={{ y: "-50%" }}
          className="
            fixed right-5 top-1/2 z-[60]
            flex flex-col items-center gap-3
            max-sm:right-2
          "
        >
          {/* Percentage */}
          <motion.span
            className="
              min-w-[38px] text-center
              font-mono text-[11px] font-semibold tabular-nums
              tracking-tight text-[#2a7fa3]
              dark:text-[#87c9e6]
            "
          >
            {label}
          </motion.span>

          {/* Vertical progress track */}
          <div
            className="relative h-20 w-[3px] rounded-full bg-slate-300/60 dark:bg-white/15"
            role="progressbar"
            aria-label="Page scroll progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
          >
            {/* Fill grows downward from the top */}
            <motion.div
              style={{ scaleY: progress, originY: 0 }}
              className="
                absolute inset-0 rounded-full bg-gradient-to-b
                from-[#87c9e6] to-[#2a7fa3]
              "
            />

            {/* Glowing dot riding the end of the fill */}
            <motion.span
              aria-hidden="true"
              style={{ top: dotTop, x: "-50%", y: "-50%" }}
              className="
                absolute left-1/2 h-2 w-2 rounded-full bg-[#2a7fa3]
                shadow-[0_0_8px_2px_rgba(42,127,163,0.6)]
                dark:bg-[#87c9e6] dark:shadow-[0_0_8px_2px_rgba(135,201,230,0.55)]
              "
            />
          </div>

          {/* Back to top */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            whileHover={reduceMotion ? undefined : { y: -4, scale: 1.08 }}
            whileTap={reduceMotion ? undefined : { scale: 0.85 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="
              group flex h-10 w-10 items-center
              justify-center overflow-hidden rounded-full
              border border-[#2a7fa3]/30
              bg-white/90 text-[#2a7fa3]
              shadow-md shadow-slate-900/5
              backdrop-blur-xl
              transition-colors duration-300
              hover:border-[#2a7fa3]
              hover:bg-[#2a7fa3] hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#2a7fa3]
              dark:border-[#87c9e6]/25
              dark:bg-slate-900/90
              dark:text-[#87c9e6]
              dark:hover:bg-[#2a7fa3]
              dark:hover:text-white
            "
          >
            <motion.span animate={arrow} className="flex">
              <ArrowUp
                size={18}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollProgress;
