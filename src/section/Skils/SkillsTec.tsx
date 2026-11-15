// import type { LucideIcon } from "lucide-react";
// import {
//   Activity,
//   Atom,
//   BookOpen,
//   Braces,
//   Clapperboard,
//   Cloud,
//   Code,
//   Component,
//   Cpu,
//   Database,
//   FileCode,
//   FileText,
//   Flame,
//   GitBranch,
//   GitMerge,
//   GraduationCap,
//   Globe,
//   Hammer,
//   Image as ImageIcon,
//   KeyRound,
//   Layers,
//   Layout,
//   LayoutGrid,
//   ListChecks,
//   MousePointer2,
//   Network,
//   Package,
//   Palette,
//   PenTool,
//   RefreshCw,
//   Rocket,
//   Server,
//   Smartphone,
//   SquareCheckBig,
//   Table,
//   Terminal,
//   Wind,
//   Zap,
// } from "lucide-react";
// import SectionEyebrow from "../../common/SectionEyebrow";

// type Skill = { name: string; icon: LucideIcon };
// type Category = { title: string; icon: LucideIcon; skills: Skill[] };

// const categories: Category[] = [
//   {
//     title: "Languages & Frameworks",
//     icon: Code,
//     skills: [
//       { name: "HTML5", icon: FileCode },
//       { name: "CSS3", icon: Palette },
//       { name: "JavaScript", icon: Braces },
//       { name: "TypeScript", icon: Code },
//       { name: "React.js", icon: Atom },
//       { name: "Next.js", icon: Layers },
//       { name: "jQuery", icon: MousePointer2 },
//       { name: "PHP", icon: Server },
//     ],
//   },
//   {
//     title: "UI & Styling",
//     icon: Palette,
//     skills: [
//       { name: "Tailwind CSS", icon: Wind },
//       { name: "Bootstrap", icon: LayoutGrid },
//       { name: "SASS", icon: Palette },
//       { name: "Flexbox", icon: Layout },
//       { name: "CSS Grid", icon: Table },
//       { name: "Material UI", icon: Component },
//       { name: "Framer Motion", icon: Clapperboard },
//       { name: "Responsive Design", icon: Smartphone },
//     ],
//   },
//   {
//     title: "State Management & Backend",
//     icon: Database,
//     skills: [
//       { name: "Redux Toolkit", icon: RefreshCw },
//       { name: "Firebase", icon: Flame },
//       { name: "Clerk", icon: KeyRound },
//       { name: "MySQL", icon: Database },
//     ],
//   },
//   {
//     title: "Database & Tools",
//     icon: Server,
//     skills: [
//       { name: "MySQL", icon: Database },
//       { name: "phpMyAdmin", icon: Table },
//       { name: "Laragon", icon: Cpu },
//       { name: "XAMPP", icon: Server },
//     ],
//   },
//   {
//     title: "Version Control & DevOps",
//     icon: GitBranch,
//     skills: [
//       { name: "Git", icon: GitBranch },
//       { name: "GitHub", icon: GitMerge },
//       { name: "NPM", icon: Package },
//       { name: "Yarn", icon: Package },
//       { name: "Jenkins", icon: Hammer },
//     ],
//   },
//   {
//     title: "Deployment",
//     icon: Rocket,
//     skills: [
//       { name: "Vercel", icon: Rocket },
//       { name: "Netlify", icon: Zap },
//       { name: "Firebase", icon: Flame },
//       { name: "GitHub Pages", icon: Globe },
//       { name: "InfinityFree", icon: Cloud },
//     ],
//   },
//   {
//     title: "Development Tools",
//     icon: Terminal,
//     skills: [
//       { name: "VS Code", icon: Code },
//       { name: "Cursor", icon: MousePointer2 },
//       { name: "PyCharm", icon: Terminal },
//     ],
//   },
//   {
//     title: "Project & Collaboration",
//     icon: ListChecks,
//     skills: [
//       { name: "Jira", icon: ListChecks },
//       { name: "Confluence", icon: BookOpen },
//       { name: "ClickUp", icon: SquareCheckBig },
//       { name: "Figma", icon: PenTool },
//       { name: "Canva", icon: ImageIcon },
//       { name: "LMS", icon: GraduationCap },
//       { name: "Tailscale", icon: Network },
//       { name: "Wiki.js", icon: FileText },
//     ],
//   },
//   {
//     title: "Analytics",
//     icon: Activity,
//     skills: [{ name: "Google Analytics", icon: Activity }],
//   },
// ];

// function SkillChip({ skill }: { skill: Skill }) {
//   const Icon = skill.icon;
//   return (
//     <li className="group/chip inline-flex items-center gap-2 rounded-3xl bg-slate-50 px-3 py-1.5 text-xs text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-teal-600 hover:text-white hover:ring-teal-600 sm:gap-2.5 sm:px-3.5 sm:py-2 sm:text-sm dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-teal-600 dark:hover:text-white dark:hover:ring-teal-600">
//       <Icon
//         className="size-4 shrink-0 text-teal-600 transition-colors group-hover/chip:text-white sm:size-[18px]"
//         strokeWidth={2}
//         aria-hidden="true"
//       />
//       {skill.name}
//     </li>
//   );
// }

// const Skills = () => {
//   return (
//     <main className="w-full bg-white transition-colors duration-300 dark:bg-[#050505]">
//       <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-16 px-5 py-20  sm:px-6 sm:py-24 md:px-10 md:py-30">
//         {/* Header */}
//         <header className="flex max-w-3xl flex-col gap-4 sm:gap-5">
//           <span className="text-sm tracking-wider text-teal-600">
//             <SectionEyebrow label="Tech Stack & Tools" />
//           </span>
//           <h1
//             className="text-[28px] font-semibold leading-tight
//           text-[#0F2E33] transition-colors duration-300
//           dark:text-white
//           sm:text-[34px] lg:text-[40px]"
//           >
//             Tools I use to build for the web.
//           </h1>
//           <p className="max-w-md text-sm leading-relaxed text-[#8C93A0] sm:text-base">
//             From pixel-perfect interfaces to databases and deployment, here is
//             the stack I work with every day.
//           </p>
//         </header>

//         {/* Skill cards */}
//         <section className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
//           {categories.map((category, index) => (
//             <div key={category.title} className="group/card relative">
//               {/* Number tab: sits outside the card, slides out on hover */}
//               <span
//                 aria-hidden="true"
//                 className="pointer-events-none absolute top-6 -right-4 z-10 flex h-11 min-w-11 items-center justify-center
//                 rounded-xl bg-[#15919B] px-3 font-space text-sm font-bold text-white
//                 shadow-lg shadow-teal-900/20
//                 translate-x-[-12px] opacity-0
//                 transition-all duration-300 ease-out
//                 group-hover/card:translate-x-0 group-hover/card:opacity-100
//                 sm:-right-5 sm:h-12 sm:min-w-12 sm:text-base"
//               >
//                 {String(index + 1).padStart(2, "0")}
//               </span>

//               <article
//                 className="group relative flex h-full min-w-0 flex-col gap-5 overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 border-[#0E1525]/15 hover:border-[#15919B] sm:p-6 lg:p-7 cursor-pointer dark:border-white/10 dark:bg-slate-900
//                 dark:hover:border-[#15919B]
//                 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-20px_rgba(21,145,155,0.3)] dark:hover:shadow-[0_24px_48px_-20px_rgba(21,145,155,0.2)]"
//               >
//                 {/* icon tile + title */}
//                 <div className="relative flex items-center gap-3 sm:gap-4">
//                   <span
//                     className="flex h-11 w-11 items-center justify-center rounded-xl
//                     bg-[#15919B]/10 text-[#15919B]
//                     transition-[background-color,color,transform]
//                     duration-500 ease-in-out
//                     group-hover:bg-[#15919B] group-hover:text-white
//                     dark:bg-[#15919B]/15 dark:text-[#42c5ce]
//                     dark:group-hover:bg-[#15919B]
//                     dark:group-hover:text-white"
//                   >
//                     <category.icon
//                       className="size-5 sm:size-6"
//                       strokeWidth={2}
//                       aria-hidden="true"
//                     />
//                   </span>
//                   <div className="min-w-0">
//                     <h2
//                       className="text-base font-semibold
//                       text-[#584e4e] transition-colors duration-300
//                       dark:text-slate-100
//                       sm:text-lg"
//                     >
//                       {category.title}
//                     </h2>
//                     <p
//                       className="text-[13px] leading-relaxed
//                       text-gray-600 transition-colors duration-300
//                       dark:text-slate-400
//                       sm:text-[15px]"
//                     >
//                       {category.skills.length}{" "}
//                       {category.skills.length === 1 ? "skill" : "skills"}
//                     </p>
//                   </div>
//                 </div>

//                 <ul className="relative flex flex-wrap gap-2 sm:gap-2.5">
//                   {category.skills.map((skill) => (
//                     <SkillChip key={skill.name} skill={skill} />
//                   ))}
//                 </ul>

//                 {/* Bottom hover accent */}
//                 <span
//                   className="absolute bottom-0 left-0 h-[1px] w-0
//                   bg-[#15919B] transition-all duration-300
//                   group-hover:w-full"
//                 />
//               </article>
//             </div>
//           ))}
//         </section>
//       </div>
//     </main>
//   );
// };

// export default Skills;

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";

import SectionEyebrow from "../../common/SectionEyebrow";
import { categories, type Skill } from "../../Data/skill";

const EASE = [0.22, 1, 0.36, 1] as const; // smooth "expo-out" feel

/* ------------------------------------------------------------------ */
/* Variants                                                            */
/* ------------------------------------------------------------------ */

// Reduced-motion fallback: everything is simply visible
const still: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const headerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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

// Headline: each word slides up from behind a mask
const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.75, ease: EASE } },
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

// Chips are staggered by their parent card (starts after the card appears)
const chipListVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.3 } },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 22 },
  },
};

/* ------------------------------------------------------------------ */
/* Skill chip                                                          */
/* ------------------------------------------------------------------ */

function SkillChip({
  skill,
  reduceMotion,
}: {
  skill: Skill;
  reduceMotion: boolean;
}) {
  const Icon = skill.icon;

  return (
    <motion.li
      variants={reduceMotion ? still : chipVariants}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              scale: 1.06,
              transition: { type: "spring", stiffness: 420, damping: 16 },
            }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      className="group/chip inline-flex cursor-default items-center gap-2 rounded-3xl bg-slate-50 px-3 py-1.5 text-xs text-slate-700 ring-1 ring-slate-200 transition-colors duration-300 hover:bg-teal-600 hover:text-white hover:ring-teal-600 sm:gap-2.5 sm:px-3.5 sm:py-2 sm:text-sm dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:bg-teal-600 dark:hover:text-white dark:hover:ring-teal-600"
    >
      <Icon
        className="size-4 shrink-0 text-teal-600 transition-all duration-300 group-hover/chip:rotate-[14deg] group-hover/chip:text-white sm:size-[18px]"
        strokeWidth={2}
        aria-hidden="true"
      />

      <span>{skill.name}</span>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* Card wrapper: 3D tilt + cursor spotlight                            */
/* ------------------------------------------------------------------ */

function TiltCard({
  children,
  reduceMotion,
  index,
}: {
  children: ReactNode;
  reduceMotion: boolean;
  index: number;
}) {
  // normalised pointer position inside the card (0 → 1)
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  // pixel position for the spotlight
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const spring = { stiffness: 180, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), spring);

  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mx}px ${my}px, rgba(21,145,155,0.16), transparent 70%)`;

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
      className="group/card relative min-w-0"
    >
      {/* Number Tab */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-6 z-10 flex h-11 min-w-11 translate-x-[-12px] items-center justify-center rounded-xl bg-[#15919B] px-3 font-space text-sm font-bold text-white opacity-0 shadow-lg shadow-teal-900/20 transition-all duration-300 ease-out group-hover/card:translate-x-0 group-hover/card:opacity-100 sm:-right-5 sm:h-12 sm:min-w-12 sm:text-base"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>

      <article className="group relative flex h-full min-w-0 cursor-pointer flex-col gap-5 overflow-hidden rounded-2xl border border-[#0E1525]/15 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#15919B] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-20px_rgba(21,145,155,0.3)] sm:p-6 lg:p-7 dark:border-white/10 dark:bg-slate-900 dark:hover:border-[#15919B] dark:hover:shadow-[0_24px_48px_-20px_rgba(21,145,155,0.2)]">
        {/* Cursor spotlight */}
        {!reduceMotion && (
          <motion.span
            aria-hidden="true"
            style={{ background: spotlight }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {children}

        {/* Bottom Hover Accent */}
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#15919B] transition-all duration-500 ease-out group-hover:w-full" />
      </article>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

const HEADLINE = "Tools I use to build for the web.".split(" ");

const Skills = () => {
  const prefersReduced = useReducedMotion();
  const reduceMotion = Boolean(prefersReduced);

  return (
    <main className="w-full overflow-hidden bg-white transition-colors duration-300 dark:bg-[#050505]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-20 sm:gap-12 sm:px-6 sm:py-24 md:gap-14 md:px-10 md:py-30 lg:gap-16">
        {/* Header */}
        <motion.header
          variants={reduceMotion ? still : headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex max-w-3xl flex-col gap-4 sm:gap-5"
        >
          <motion.span
            variants={reduceMotion ? still : fadeUp}
            className="text-sm tracking-wider text-teal-600"
          >
            <SectionEyebrow label="Tech Stack & Tools" />
          </motion.span>

          <h1
            aria-label="Tools I use to build for the web."
            className="flex flex-wrap gap-x-[0.28em] text-[28px] font-semibold leading-tight text-[#0F2E33] transition-colors duration-300 dark:text-white sm:text-[34px] lg:text-[40px]"
          >
            {HEADLINE.map((word, i) => (
              <span
                key={`${word}-${i}`}
                aria-hidden="true"
                className="inline-block overflow-hidden pb-1 align-bottom"
              >
                <motion.span
                  variants={reduceMotion ? still : wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Accent line that draws itself */}
          <motion.span
            aria-hidden="true"
            variants={
              reduceMotion
                ? still
                : {
                    hidden: { scaleX: 0 },
                    visible: {
                      scaleX: 1,
                      transition: { duration: 0.9, ease: EASE },
                    },
                  }
            }
            style={{ originX: 0 }}
            className="h-[2px] w-16 rounded-full bg-[#15919B]"
          />

          <motion.p
            variants={reduceMotion ? still : fadeUp}
            className="max-w-md text-sm leading-relaxed text-[#8C93A0] sm:text-base"
          >
            From pixel-perfect interfaces to databases and deployment, here is
            the stack I work with every day.
          </motion.p>
        </motion.header>

        {/* Skill Cards */}
        <motion.section
          variants={reduceMotion ? still : gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {categories.map((category, index) => {
            const CategoryIcon = category.icon;

            return (
              <TiltCard
                key={category.title}
                index={index}
                reduceMotion={reduceMotion}
              >
                {/* Category Header */}
                <div className="relative flex items-center gap-3 sm:gap-4">
                  <motion.span
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 1.12,
                            transition: {
                              type: "spring",
                              stiffness: 300,
                              damping: 12,
                            },
                          }
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#15919B]/10 text-[#15919B] transition-colors duration-500 ease-in-out group-hover:rotate-[-5deg] group-hover:bg-[#15919B] group-hover:text-white dark:bg-[#15919B]/15 dark:text-[#42c5ce] dark:group-hover:bg-[#15919B] dark:group-hover:text-white"
                  >
                    <CategoryIcon
                      className="size-5 sm:size-6"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </motion.span>

                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-[#584e4e] transition-colors duration-300 dark:text-slate-100 sm:text-lg">
                      {category.title}
                    </h2>

                    <p className="text-[13px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[15px]">
                      {category.skills.length}{" "}
                      {category.skills.length === 1 ? "skill" : "skills"}
                    </p>
                  </div>
                </div>

                {/* Skill List: chips stagger in after their card appears */}
                <motion.ul
                  variants={reduceMotion ? still : chipListVariants}
                  className="relative flex flex-wrap gap-2 sm:gap-2.5"
                >
                  {category.skills.map((skill) => (
                    <SkillChip
                      key={`${category.title}-${skill.name}`}
                      skill={skill}
                      reduceMotion={reduceMotion}
                    />
                  ))}
                </motion.ul>
              </TiltCard>
            );
          })}
        </motion.section>
      </div>
    </main>
  );
};

export default Skills;
