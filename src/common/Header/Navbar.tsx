// import { Link } from "react-router-dom";
// import DesktopMenu from "./DesktopMenu";
// import MobMenu from "./MobMenu";
// import ThemeToggle from "../ThemeToggle";
// import { Menus } from "../../Data/utils";

// const Navbar = () => {
//   return (
//     <header
//       className="
//         fixed left-0 right-0 top-0 z-50
//         flex h-16 items-center
//         border-b border-gray-200
//         bg-white/95 text-[15px]
//         shadow-lg backdrop-blur-xl
//         transition-colors duration-300
//         dark:border-slate-700
//         dark:bg-black
//         dark:shadow-black/75
//       "
//     >
//       <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-2 sm:px-5 py-2 sm:py-5">
//         {/* Logo */}
//         <Link
//           to="/home"
//           aria-label="Ahad.Dev home"
//           className="inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400"
//         >
//           <span className="text-1xl font-bold tracking-[0.12em] text-slate-900 dark:text-white sm:text-2xl">
//             AHAD<span className="text-teal-400">.DEV</span>
//           </span>
//         </Link>

//         {/* Desktop Menu */}
//         <ul className="hidden items-center gap-x-4 lg:flex">
//           {Menus.map((menu, index) => (
//             <DesktopMenu menu={menu} key={index} />
//           ))}
//         </ul>

//         {/* Right Section */}
//         <div className="flex shrink-0 items-center gap-x-3 sm:gap-x-4">
//           <ThemeToggle />

//           <div>
//             <Link
//               to="/contact"
//               className="
//               group relative flex items-center justify-center
//               overflow-hidden rounded-full
//               bg-gradient-to-r from-[#1E5470] to-[#2a7fa3]
//               px-4 py-2.5 text-sm font-semibold text-white
//               shadow-lg transition-all duration-300
//               hover:scale-105 hover:shadow-xl
//               active:scale-95
//               sm:px-6 sm:py-3 sm:text-base
//             "
//             >
//               <span
//                 aria-hidden="true"
//                 className="
//                 pointer-events-none absolute inset-0
//                 -translate-x-full skew-x-12
//                 bg-gradient-to-r from-transparent
//                 via-white/25 to-transparent
//                 transition-transform duration-700 ease-out
//                 group-hover:translate-x-full
//               "
//               />
//               <span className="relative z-10">Contact</span>
//             </Link>
//           </div>

//           {/* Mobile Menu */}
//           <div className="lg:hidden">
//             <MobMenu Menus={Menus} />
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import DesktopMenu from "./DesktopMenu";
import MobMenu from "./MobMenu";
import ThemeToggle from "../ThemeToggle";
import { Menus } from "../../Data/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

// Logo letters slide up from behind a mask
const logoVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
};

const letterVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.6, ease: EASE } },
};

const Navbar = () => {
  const reduceMotion = Boolean(useReducedMotion());

  // Hide on scroll down, show on scroll up
  const [hidden, setHidden] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const delta = latest - previous;

    if (latest < 120) {
      setHidden(false); // always visible near the top
    } else if (delta > 4) {
      setHidden(true); // scrolling down
    } else if (delta < -4) {
      setHidden(false); // scrolling up
    }
  });

  return (
    <motion.header
      // Slides in on first load, then hides / shows with the scroll direction
      initial={reduceMotion ? false : { y: "-100%" }}
      animate={{ y: hidden && !reduceMotion ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: EASE }}
      // Keyboard users tabbing into the header should always see it
      onFocusCapture={() => setHidden(false)}
      className="
        fixed left-0 right-0 top-0 z-50
        flex h-16 items-center
        border-b border-gray-200
        bg-white/95 text-[15px]
        shadow-lg backdrop-blur-xl
        transition-colors duration-300
        dark:border-slate-700
        dark:bg-black
        dark:shadow-black/75
      "
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-2 sm:px-5 py-2 sm:py-5">
        {/* Logo */}
        <Link
          to="/home"
          aria-label="Ahad.Dev home"
          className="inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400"
        >
          <motion.span
            aria-hidden="true"
            variants={reduceMotion ? undefined : logoVariants}
            initial="hidden"
            animate="visible"
            whileHover={reduceMotion ? undefined : { x: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex overflow-hidden pb-0.5 text-1xl font-bold tracking-[0.12em] text-slate-900 dark:text-white sm:text-2xl"
          >
            {"AHAD".split("").map((ch, i) => (
              <motion.span
                key={`a-${i}`}
                variants={reduceMotion ? undefined : letterVariants}
                className="inline-block"
              >
                {ch}
              </motion.span>
            ))}
            {".DEV".split("").map((ch, i) => (
              <motion.span
                key={`d-${i}`}
                variants={reduceMotion ? undefined : letterVariants}
                className="inline-block text-teal-400"
              >
                {ch}
              </motion.span>
            ))}
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <motion.ul
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
          className="hidden items-center gap-x-4 lg:flex"
        >
          {Menus.map((menu, index) => (
            <DesktopMenu menu={menu} key={index} />
          ))}
        </motion.ul>

        {/* Right Section */}
        <div className="flex shrink-0 items-center gap-x-3 sm:gap-x-4">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
              delay: 0.45,
            }}
          >
            <ThemeToggle />
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 18,
              delay: 0.5,
            }}
          >
            <Link
              to="/contact"
              className="
              group relative flex items-center justify-center
              overflow-hidden rounded-full
              bg-gradient-to-r from-[#1E5470] to-[#2a7fa3]
              px-4 py-2.5 text-sm font-semibold text-white
              shadow-lg transition-shadow duration-300
              hover:shadow-xl
              sm:px-6 sm:py-3 sm:text-base
            "
            >
              <span
                aria-hidden="true"
                className="
                pointer-events-none absolute inset-0
                -translate-x-full skew-x-12
                bg-gradient-to-r from-transparent
                via-white/25 to-transparent
                transition-transform duration-700 ease-out
                group-hover:translate-x-full
                motion-reduce:hidden
              "
              />
              <span className="relative z-10">Contact</span>
            </Link>
          </motion.div>

          {/* Mobile Menu */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.55 }}
            className="lg:hidden"
          >
            <MobMenu Menus={Menus} />
          </motion.div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
