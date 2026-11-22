// import React, { useEffect, useState } from "react";

// const SectionEyebrow: React.FC<{ label: string }> = ({ label }) => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const id = requestAnimationFrame(() => setIsVisible(true));
//     return () => cancelAnimationFrame(id);
//   }, []);

//   return (
//     <div
//       className={`mb-10 flex items-center gap-3 transition-all duration-700 ease-out md:mb-14 ${
//         isVisible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
//       }`}
//     >
//       <span className="inline-flex items-center gap-2 rounded-full border border-[#2a7fa3]/30 bg-[#2a7fa3]/10 px-4 py-1.5 dark:border-[#5bb8e0]/40 dark:bg-[#5bb8e0]/10">
//         <span className="relative flex h-1.5 w-1.5">
//           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2a7fa3]/60 dark:bg-[#5bb8e0]/60" />
//           <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2a7fa3] dark:bg-[#5bb8e0]" />
//         </span>
//         <span className="font-space text-xs uppercase tracking-[0.25em] text-[#2a7fa3] dark:text-[#94c6db]">
//           {label}
//         </span>
//       </span>
//     </div>
//   );
// };

// export default SectionEyebrow;

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// Reduced-motion fallback: everything is simply visible
const still: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const wrapperVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// The pill slides in from the left with a small spring
const pillVariants: Variants = {
  hidden: { opacity: 0, x: -18, scale: 0.92 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

const dotVariants: Variants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 500, damping: 14, delay: 0.2 },
  },
};

// Label letters slide up from behind a mask, one after another
const labelVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.25 } },
};

const letterVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.5, ease: EASE } },
};

// A soft shine keeps passing across the pill
const shineVariants: Variants = {
  hidden: { left: "-40%", opacity: 0 },
  visible: {
    left: ["-40%", "140%"],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 1.4,
      ease: "easeInOut",
      delay: 1.4,
      repeat: Infinity,
      repeatDelay: 5,
    },
  },
};

const SectionEyebrow: React.FC<{ label: string }> = ({ label }) => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.div
      variants={reduceMotion ? still : wrapperVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className="mb-10 flex items-center gap-3 md:mb-14"
    >
      <motion.span
        variants={reduceMotion ? still : pillVariants}
        whileHover={reduceMotion ? undefined : { y: -2 }}
        className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#2a7fa3]/30 bg-[#2a7fa3]/10 px-4 py-1.5 transition-colors duration-300 hover:border-[#2a7fa3]/60 dark:border-[#5bb8e0]/40 dark:bg-[#5bb8e0]/10 dark:hover:border-[#5bb8e0]/70"
      >
        {/* Shine */}
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            variants={shineVariants}
            className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/20"
          />
        )}

        {/* Pulsing dot */}
        <motion.span
          variants={reduceMotion ? still : dotVariants}
          className="relative flex h-1.5 w-1.5"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#2a7fa3]/60 motion-safe:animate-ping dark:bg-[#5bb8e0]/60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2a7fa3] dark:bg-[#5bb8e0]" />
        </motion.span>

        {/* Label, letter by letter */}
        <motion.span
          aria-label={label}
          variants={reduceMotion ? still : labelVariants}
          className="relative flex font-space text-xs uppercase tracking-[0.25em] text-[#2a7fa3] dark:text-[#94c6db]"
        >
          {label.split("").map((char, i) => (
            <span
              key={`${char}-${i}`}
              aria-hidden="true"
              className="inline-block overflow-hidden"
            >
              <motion.span
                variants={reduceMotion ? still : letterVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </motion.span>
    </motion.div>
  );
};

export default SectionEyebrow;
