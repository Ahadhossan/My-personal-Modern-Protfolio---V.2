// import { useRef } from "react";
// import AboutImage from "../../assets/About.jpeg";
// import SectionEyebrow from "../../common/SectionEyebrow";
// import { ArrowUpRight } from "lucide-react";
// import { FaGithub } from "react-icons/fa6";

// const MAX_TILT = 14; // degrees: 8 = subtle, 20 = dramatic

// /* ---------- Tilt card (follows the mouse) ---------- */
// const TiltCard = ({ src, alt }: { src: string; alt: string }) => {
//   const cardRef = useRef<HTMLDivElement>(null);

//   const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
//     if (e.pointerType === "touch") return;
//     const el = cardRef.current;
//     if (!el) return;

//     const rect = el.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / rect.width; // 0 to 1
//     const y = (e.clientY - rect.top) / rect.height; // 0 to 1

//     el.style.setProperty("--ry", `${(x - 0.5) * MAX_TILT * 2}deg`);
//     el.style.setProperty("--rx", `${(0.5 - y) * MAX_TILT * 2}deg`);
//     el.style.setProperty("--gx", `${x * 100}%`);
//     el.style.setProperty("--gy", `${y * 100}%`);
//   };

//   const handleLeave = () => {
//     const el = cardRef.current;
//     if (!el) return;
//     el.style.setProperty("--rx", "0deg");
//     el.style.setProperty("--ry", "0deg");
//   };

//   return (
//     <div className="[perspective:1000px]">
//       <div
//         ref={cardRef}
//         onPointerMove={handleMove}
//         onPointerLeave={handleLeave}
//         className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#151B27]
//           ring-1 ring-white/10 shadow-[0_16px_40px_-12px_rgba(42,127,163,0.35)]
//           transition-[transform,box-shadow] duration-200 ease-out will-change-transform
//           [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]
//           hover:scale-[1.03]
//           motion-reduce:transform-none motion-reduce:transition-none cursor-pointer"
//       >
//         <img
//           src={src}
//           alt={alt}
//           loading="lazy"
//           draggable={false}
//           className="h-full w-full select-none object-cover grayscale
//             transition-[filter] duration-500 group-hover:grayscale-0"
//         />

//         {/* Glare that follows the cursor */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300
//             group-hover:opacity-100
//             bg-[radial-gradient(circle_at_var(--gx,50%)_var(--gy,50%),rgba(255,255,255,0.25),transparent_55%)]"
//         />
//       </div>
//     </div>
//   );
// };

// /* ---------- About section ---------- */
// const About = () => {
//   return (
//     <section
//       id="about"
//       className="mx-auto mt-0 max-w-7xl border-t border-white/10 px-5 py-20  sm:px-6 sm:py-24 md:px-10 md:py-30 relative bg-white transition-colors duration-300 dark:bg-[#050505]"
//     >
//       {/* Eyebrow */}
//       <div className="mb-4 flex items-center gap-3 md:mb-6">
//         <SectionEyebrow label="About Me" />
//       </div>

//       <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
//         {/* Text content */}
//         <div className="order-2 md:order-1">
//           <h2 className=" text-[28px] font-semibold leading-tight text-[#0F2E33] transition-colors duration-300 dark:text-white sm:text-[34px] lg:text-[40px]">
//             Passion fuels purpose.
//           </h2>
//           <div className="mt-4 mb-0 flex items-start justify-start gap-1.5">
//             <i className="block h-[3px] w-[220px] rounded-sm bg-gradient-to-r from-[#8fc4dc] to-[#487081]" />
//             <b className="h-1.5 w-1.5 rounded-full bg-[#2a7fa3]" />
//           </div>
//           <p className="mt-4 sm:mt-6 sm:text-base max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]">
//             Hi, I'm{" "}
//             <span className="text-[#194356] dark:text-[#94c6db]">
//               Md. Ahad Hossain
//             </span>{" "}
//             — Results-driven Web Developer with 2+ years of professional
//             experience building modern, responsive, and scalable web
//             applications using React.js, Next.js, TypeScript, JavaScript, and
//             Tailwind CSS. Experienced in frontend development, responsive UI
//             implementation, state management, software troubleshooting, product
//             support, and cross-functional collaboration.
//           </p>
//           <p className="mt-4 sm:mt-6 sm:text-base max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]">
//             Currently working as a
//             <span className="text-[#194356] dark:text-[#94c6db]">
//               Product Excellence Engineer
//             </span>
//             at Cubix Technology Ltd., supporting HMS/PMS products, analyzing
//             software queries, collaborating with development teams, conducting
//             client training, and contributing to product quality and user
//             experience improvements.
//           </p>
//           <p className="mt-4 sm:mt-6 sm:text-base max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]">
//             Previously worked as a Junior Web Developer at Imranslab, developing
//             responsive web applications and collaborating with remote teams
//             using modern development and project-management tools. Strong
//             understanding of the software development lifecycle, Agile
//             practices, Git-based workflows, and production deployment.
//           </p>
//           {/* CTA */}
//           <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
//             {/* GitHub Profile */}
//             <a
//               href="https://github.com/Ahadhossan"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Visit my GitHub profile"
//               className="group relative inline-flex items-center justify-center gap-3
//       overflow-hidden rounded-full border border-slate-300 bg-white px-5 py-3.5
//       text-sm font-semibold text-slate-800 shadow-sm
//       transition-all duration-300
//       hover:-translate-y-0.5 hover:border-[#2a7fa3]
//       hover:bg-slate-50 hover:shadow-lg hover:shadow-[#2a7fa3]/10
//       active:translate-y-0
//       focus-visible:outline-none focus-visible:ring-2
//       focus-visible:ring-[#2a7fa3] focus-visible:ring-offset-2
//       dark:border-slate-700 dark:bg-slate-900 dark:text-white
//       dark:hover:border-[#2a7fa3] dark:hover:bg-slate-800
//       dark:focus-visible:ring-offset-slate-950 sm:w-auto sm:py-4"
//             >
//               <FaGithub
//                 aria-hidden="true"
//                 className="h-5 w-5 transition-transform duration-300
//         group-hover:rotate-[-8deg] group-hover:scale-110"
//               />

//               <span>GitHub Profile</span>

//               <ArrowUpRight
//                 aria-hidden="true"
//                 className="h-4 w-4 text-slate-400 transition-all duration-300
//         group-hover:-translate-y-0.5 group-hover:translate-x-0.5
//         group-hover:text-[#2a7fa3]"
//               />
//             </a>

//             {/* View Projects */}
//             <a
//               href="/projects"
//               className="group relative inline-flex items-center justify-center gap-3
//       overflow-hidden rounded-full bg-gradient-to-r from-[#1E5470] to-[#2a7fa3]
//       px-5 py-3.5 text-sm font-semibold text-white
//       shadow-lg shadow-[#2a7fa3]/20
//       transition-all duration-300
//       hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2a7fa3]/35
//       active:translate-y-0
//       focus-visible:outline-none focus-visible:ring-2
//       focus-visible:ring-[#2a7fa3] focus-visible:ring-offset-2
//       dark:focus-visible:ring-offset-slate-950 sm:w-auto sm:py-4"
//             >
//               <span
//                 aria-hidden="true"
//                 className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12
//         bg-gradient-to-r from-transparent via-white/20 to-transparent
//         transition-transform duration-700 ease-out
//         group-hover:translate-x-full"
//               />

//               <span className="relative">View Projects</span>

//               <ArrowUpRight
//                 aria-hidden="true"
//                 className="relative h-4 w-4 transition-transform duration-300
//         group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
//               />
//             </a>
//           </div>
//         </div>

//         {/* Image */}
//         <div className="order-1 md:order-2">
//           <div className="relative isolate mx-auto max-w-xs md:max-w-lg">
//             {/* soft glow behind image */}
//             <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-white/5 via-transparent to-white/5 blur-2xl" />

//             <TiltCard src={AboutImage} alt="Md. Ahad Hossain" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;

import { useRef } from "react";
import type { FC, PointerEvent, ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import AboutImage from "../../assets/About.jpeg";
import SectionEyebrow from "../../common/SectionEyebrow";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const MAX_TILT = 14; // degrees: 8 = subtle, 20 = dramatic

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Variants ---------- */

// Reduced-motion fallback: everything is simply visible
const still: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const textVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const wordMask: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

const headingVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

const barVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
};

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 500, damping: 14, delay: 0.6 },
  },
};

const ctaRowVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

const underlineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: EASE, delay: 0.5 },
  },
};

const cornerVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE, delay: 0.7 },
  },
};

/* ---------- Animated top border (replaces the static border-t) ---------- */
const AnimatedBorder: FC<{ reduceMotion: boolean }> = ({ reduceMotion }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const on = reduceMotion || inView;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
    >
      {/* Faint static track */}
      <span className="absolute inset-x-0 top-0 h-px bg-black/10 dark:bg-white/10" />

      {/* Glowing line that draws left to right and fades toward the end */}
      <motion.span
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        animate={{ scaleX: on ? 1 : 0 }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{ originX: 0 }}
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#15919B] via-[#2a7fa3]/70 to-transparent shadow-[0_0_12px_rgba(21,145,155,0.6)]"
      />

      {!reduceMotion && (
        <>
          {/* Glowing head that leads the line */}
          <motion.span
            initial={{ left: "0%", opacity: 0 }}
            animate={
              on
                ? { left: "100%", opacity: [0, 1, 1, 0] }
                : { left: "0%", opacity: 0 }
            }
            transition={{
              duration: 1.4,
              ease: EASE,
              opacity: { duration: 1.4, times: [0, 0.1, 0.85, 1] },
            }}
            style={{ y: "-50%" }}
            className="absolute top-0 -ml-[3px] h-1.5 w-1.5 rounded-full bg-[#15919B] shadow-[0_0_10px_3px_rgba(21,145,155,0.7)]"
          />

          {/* Shine that keeps passing along the line */}
          <motion.span
            initial={{ left: "-10%", opacity: 0 }}
            animate={
              on
                ? { left: ["-10%", "100%"], opacity: [0, 1, 1, 0] }
                : { left: "-10%", opacity: 0 }
            }
            transition={{
              duration: 2.4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 4,
              delay: 1.8,
            }}
            className="absolute top-0 -ml-12 h-px w-24 bg-gradient-to-r from-transparent via-[#15919B] to-transparent"
          />
        </>
      )}
    </div>
  );
};

/* ---------- Highlighted name / role with a drawing underline ---------- */
const Highlight: FC<{ children: ReactNode; reduceMotion: boolean }> = ({
  children,
  reduceMotion,
}) => (
  <span className="relative inline-block text-[#194356] dark:text-[#94c6db]">
    {children}
    <motion.span
      aria-hidden="true"
      variants={reduceMotion ? still : underlineVariants}
      style={{ originX: 0 }}
      className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-[#2a7fa3] to-transparent dark:from-[#5bb8e0]"
    />
  </span>
);

/* ---------- Tilt card (follows the mouse, spring-smoothed) ---------- */
const TiltCard = ({
  src,
  alt,
  reduceMotion,
}: {
  src: string;
  alt: string;
  reduceMotion: boolean;
}) => {
  // Pointer position inside the card (0 → 1)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 170, damping: 18, mass: 0.6 };
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]),
    spring,
  );
  const rotateX = useSpring(
    useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]),
    spring,
  );

  // Glare follows the cursor
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.25), transparent 55%)`;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType === "touch") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 1000 }
      }
      className="group relative aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-2xl bg-[#151B27] shadow-[0_16px_40px_-12px_rgba(42,127,163,0.35)] ring-1 ring-white/10"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable={false}
        className="h-full w-full select-none object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
      />

      {/* Glare that follows the cursor */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
};

/* ---------- Corner bracket that draws itself ---------- */
const Corner: FC<{ className: string; d: string; reduceMotion: boolean }> = ({
  className,
  d,
  reduceMotion,
}) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 56 56"
    fill="none"
    className={`pointer-events-none absolute h-14 w-14 ${className}`}
  >
    <motion.path
      d={d}
      stroke="#15919B"
      strokeWidth={2}
      strokeLinecap="round"
      variants={reduceMotion ? still : cornerVariants}
    />
  </svg>
);

/* ---------- About section ---------- */
const About = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="about"
      className="relative isolate w-full bg-white transition-colors duration-300 dark:bg-[#050505]"
    >
      {/* Full-width background with centered content */}
      <div className="relative mx-auto mt-0 w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-30">
        {/* Top border: glowing line draws itself, then a shine keeps passing */}
        <AnimatedBorder reduceMotion={reduceMotion} />

        {/* Eyebrow */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-4 flex items-center gap-3 md:mb-6"
        >
          <SectionEyebrow label="About Me" />
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
          {/* Text content */}
          <motion.div
            variants={reduceMotion ? still : textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="order-2 md:order-1"
          >
            <motion.h2
              aria-label="Passion fuels purpose."
              variants={reduceMotion ? still : headingVariants}
              className="text-[28px] font-semibold leading-tight text-[#0F2E33] transition-colors duration-300 dark:text-white sm:text-[34px] lg:text-[40px]"
            >
              {["Passion", "fuels", "purpose."].map((word) => (
                <span
                  key={word}
                  aria-hidden="true"
                  className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom"
                >
                  <motion.span
                    variants={reduceMotion ? still : wordMask}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            {/* Accent bar draws itself, dot pops in */}
            <div className="mt-4 mb-0 flex items-start justify-start gap-1.5">
              <motion.i
                variants={reduceMotion ? still : barVariants}
                style={{ originX: 0 }}
                className="block h-[3px] w-[220px] rounded-sm bg-gradient-to-r from-[#8fc4dc] to-[#487081]"
              />
              <motion.b
                variants={reduceMotion ? still : dotVariants}
                className="h-1.5 w-1.5 rounded-full bg-[#2a7fa3]"
              />
            </div>

            <motion.p
              variants={reduceMotion ? still : fadeUp}
              className="mt-4 max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:mt-6 sm:text-[17px]"
            >
              Hi, I&apos;m{" "}
              <Highlight reduceMotion={reduceMotion}>
                Md. Ahad Hossain
              </Highlight>{" "}
              — Results-driven Web Developer with 2+ years of professional
              experience building modern, responsive, and scalable web
              applications using React.js, Next.js, TypeScript, JavaScript, and
              Tailwind CSS. Experienced in frontend development, responsive UI
              implementation, state management, software troubleshooting,
              product support, and cross-functional collaboration.
            </motion.p>

            <motion.p
              variants={reduceMotion ? still : fadeUp}
              className="mt-4 max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:mt-6 sm:text-[17px]"
            >
              Currently working as a{" "}
              <Highlight reduceMotion={reduceMotion}>
                Product Excellence Engineer
              </Highlight>{" "}
              at Cubix Technology Ltd., supporting HMS/PMS products, analyzing
              software queries, collaborating with development teams, conducting
              client training, and contributing to product quality and user
              experience improvements.
            </motion.p>

            <motion.p
              variants={reduceMotion ? still : fadeUp}
              className="mt-4 max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:mt-6 sm:text-[17px]"
            >
              Previously worked as a Junior Web Developer at Imranslab,
              developing responsive web applications and collaborating with
              remote teams using modern development and project-management
              tools. Strong understanding of the software development lifecycle,
              Agile practices, Git-based workflows, and production deployment.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={reduceMotion ? still : ctaRowVariants}
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
            >
              {/* GitHub Profile */}
              <motion.a
                href="https://github.com/Ahadhossan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my GitHub profile"
                variants={reduceMotion ? still : ctaVariants}
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-[#2a7fa3] hover:bg-slate-50 hover:shadow-lg hover:shadow-[#2a7fa3]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7fa3] focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-[#2a7fa3] dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950 sm:w-auto sm:py-4"
              >
                <FaGithub
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110"
                />

                <span>GitHub Profile</span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2a7fa3]"
                />
              </motion.a>

              {/* View Projects */}
              <motion.a
                href="/projects"
                variants={reduceMotion ? still : ctaVariants}
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#1E5470] to-[#2a7fa3] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2a7fa3]/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-[#2a7fa3]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a7fa3] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 sm:w-auto sm:py-4"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full motion-reduce:hidden"
                />

                <span className="relative">View Projects</span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.94, filter: "blur(10px)" },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 1, ease: EASE, delay: 0.15 },
              },
            }}
            className="order-1 md:order-2"
          >
            <div className="relative isolate mx-auto max-w-xs md:max-w-lg">
              {/* soft glow behind image (slow breathing) */}
              <motion.div
                aria-hidden="true"
                animate={
                  reduceMotion
                    ? undefined
                    : { opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-white/5 via-transparent to-white/5 blur-2xl"
              />

              {/* Corner brackets that draw themselves */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
              >
                <Corner
                  reduceMotion={reduceMotion}
                  d="M2 54 V2 H54"
                  className="-left-3 -top-3"
                />
                <Corner
                  reduceMotion={reduceMotion}
                  d="M54 2 V54 H2"
                  className="-bottom-3 -right-3"
                />
              </motion.div>

              {/* Gentle float, then tilt on top of it */}
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <TiltCard
                  src={AboutImage}
                  alt="Md. Ahad Hossain"
                  reduceMotion={reduceMotion}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
