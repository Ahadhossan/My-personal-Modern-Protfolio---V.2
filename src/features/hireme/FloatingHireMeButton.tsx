import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Briefcase, UserRound, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface FloatingHireMeButtonProps {
  onHireMe: () => void;
}

const FloatingHireMeButton = ({ onHireMe }: FloatingHireMeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const isOnWorkWithMe = pathname.startsWith("/workwithme");

  // Show the floating button only after scrolling.

  // Close dropdown when clicking outside or pressing Escape.
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Close dropdown when navigating to another page.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleHireMe = () => {
    setIsOpen(false);
    onHireMe();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="floating-contact"
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.75, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.75, y: 20 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 22,
        }}
        className="fixed bottom-6 right-5 z-[9999] sm:bottom-8 sm:right-8"
      >
        {/* Back to Home button on Work With Me page */}
        {isOnWorkWithMe ? (
          <Link
            to="/"
            aria-label="Back to home"
            className="group flex h-14 items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-4 text-sm font-semibold text-slate-800 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900/95 dark:text-white"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to Home</span>
          </Link>
        ) : (
          <>
            {/* Dropdown menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                    scale: 0.95,
                    transformOrigin: "bottom right",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                  }}
                  transition={{ duration: 0.18 }}
                  role="menu"
                  aria-label="Contact options"
                  className="absolute bottom-[calc(100%+16px)] right-0 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95"
                >
                  {/* Dropdown heading */}
                  {/* <div className="flex items-center justify-between px-3 py-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Let's Connect
                      </p>

                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                        className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                      >
                        <X size={15} />
                      </button>
                    </div> */}

                  {/* Hire Me */}
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleHireMe}
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-blue-500/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
                      <UserRound size={19} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                        Hire Me
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
                        Discuss a project or role
                      </span>
                    </span>

                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-slate-400"
                    />
                  </button>

                  {/* Work With Me */}
                  <Link
                    to="/workwithme"
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:bg-violet-500/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
                      <Briefcase size={19} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                        Work With Me
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
                        Explore work preferences
                      </span>
                    </span>

                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-slate-400"
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Modern circular floating button */}
            <motion.button
              type="button"
              onClick={() => setIsOpen((previous) => !previous)}
              aria-label={
                isOpen ? "Close contact options" : "Open contact options"
              }
              aria-expanded={isOpen}
              aria-haspopup="menu"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 18,
              }}
              className="group relative flex h-[68px] w-[68px] items-center justify-center rounded-full border border-[#2a7fa3]/30bg-gradient-to-br from-[#2a7fa3] via-indigo-600 to-violet-600 border-[#2a7fa3]/30
          bg-[#2a7fa3]  text-white shadow-[0_8px_30px_rgba(79,70,229,0.35)] outline-none transition-shadow duration-300 hover:shadow-[0_10px_40px_rgba(99,102,241,0.55)] focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-4 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 sm:h-[76px] sm:w-[76px]"
            >
              {/* Animated dashed ring */}
              <motion.span
                aria-hidden="true"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="pointer-events-none absolute -inset-1 rounded-full border border-dashed border-indigo-400/70"
              />

              {/* Glow effect */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full bg-white/10 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Main icon */}
              <span
                className={`relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-inner backdrop-blur-sm transition-transform duration-300 sm:h-14 sm:w-14 ${
                  isOpen ? "rotate-90" : "group-hover:-rotate-6"
                }`}
              >
                {isOpen ? (
                  <X size={24} strokeWidth={2} />
                ) : (
                  <Briefcase size={24} strokeWidth={1.8} />
                )}
              </span>

              {/* Availability indicator */}
              {!isOpen && (
                <span className="absolute right-1 top-1 h-3.5 w-3.5 rounded-full border-[2.5px] border-indigo-600 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.65)] sm:right-1.5 sm:top-1.5" />
              )}

              {/* Hover tooltip */}
              <span className="pointer-events-none absolute right-[calc(100%+14px)] whitespace-nowrap rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                {isOpen ? "Close menu" : "Let's Connect"}
              </span>
            </motion.button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingHireMeButton;
