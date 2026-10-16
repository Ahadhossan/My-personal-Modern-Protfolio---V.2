import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Download,
  Eye,
  X,
  ExternalLink,
  Code2,
  Terminal,
  Braces,
  GitBranch,
  Database,
  FileCode,
  Cpu,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import heroBg from "../../assets/hero.png";

/* =========================================================
   CONTENT ANIMATION
========================================================= */

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   FLOATING CODE ICONS
========================================================= */

type FloatItem = {
  icon?: LucideIcon;
  glyph?: string;
  pos: string;
  depth: number;
  delay: string;
  size?: number;
  hideOnMobile?: boolean;
};

const floaters: FloatItem[] = [
  {
    icon: Code2,
    pos: "top-[14%] left-[8%]",
    depth: 28,
    delay: "0s",
    size: 30,
  },
  {
    glyph: "</>",
    pos: "top-[24%] right-[10%]",
    depth: 22,
    delay: "-2s",
  },
  {
    icon: Terminal,
    pos: "bottom-[24%] left-[6%]",
    depth: 34,
    delay: "-4s",
    size: 28,
  },
  {
    icon: Braces,
    pos: "bottom-[16%] right-[12%]",
    depth: 26,
    delay: "-1s",
    size: 30,
  },
  {
    icon: GitBranch,
    pos: "top-[56%] right-[4%]",
    depth: 38,
    delay: "-3s",
    size: 24,
    hideOnMobile: true,
  },
  {
    icon: Database,
    pos: "top-[8%] left-[38%]",
    depth: 18,
    delay: "-5s",
    size: 22,
    hideOnMobile: true,
  },
  {
    icon: FileCode,
    pos: "bottom-[8%] left-[34%]",
    depth: 20,
    delay: "-2.5s",
    size: 24,
    hideOnMobile: true,
  },
  {
    glyph: "{ }",
    pos: "top-[44%] left-[3%]",
    depth: 30,
    delay: "-6s",
    hideOnMobile: true,
  },
  {
    glyph: "=>",
    pos: "bottom-[38%] right-[24%]",
    depth: 24,
    delay: "-3.5s",
    hideOnMobile: true,
  },
  {
    icon: Cpu,
    pos: "top-[10%] right-[30%]",
    depth: 16,
    delay: "-1.5s",
    size: 22,
    hideOnMobile: true,
  },
];

/* =========================================================
   ANIMATED BACKGROUND
========================================================= */

const AnimatedBackground: React.FC = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 overflow-hidden"
  >
    {/* Dark overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/60 to-black/90" />

    {/* Background grid */}
    <div className="absolute inset-0 opacity-[0.07] animate-grid-drift motion-reduce:animate-none [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

    {/* Cursor reactive grid */}
    <div className="absolute inset-0 opacity-[var(--mo)] transition-opacity duration-500 [background-image:linear-gradient(rgba(42,127,163,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(42,127,163,0.55)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(180px_circle_at_var(--mx)_var(--my),black,transparent)] [-webkit-mask-image:radial-gradient(180px_circle_at_var(--mx)_var(--my),black,transparent)]" />

    {/* Aurora blob 1 */}
    <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#2a7fa3]/30 blur-3xl animate-blob motion-reduce:animate-none sm:h-96 sm:w-96" />

    {/* Aurora blob 2 */}
    <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#1E5470]/40 blur-3xl animate-blob motion-reduce:animate-none [animation-delay:-5s] sm:h-[28rem] sm:w-[26rem]" />

    {/* Aurora blob 3 */}
    <div className="absolute top-1/3 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl animate-blob motion-reduce:animate-none [animation-delay:-9s] sm:h-72 sm:w-72" />

    {/* Cursor spotlight */}
    <div className="absolute inset-0 opacity-[var(--mo)] transition-opacity duration-500 [background:radial-gradient(420px_circle_at_var(--mx)_var(--my),rgba(42,127,163,0.22),transparent_65%)]" />

    {/* Light beam */}
    <div className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent animate-beam motion-reduce:animate-none" />

    {/* Floating icons */}
    {floaters.map((f, i) => {
      const Icon = f.icon;
      return (
        <div
          key={i}
          className={`
            absolute
            ${f.pos}
            ${f.hideOnMobile ? "hidden md:block" : ""}
            transition-transform
            duration-300
            ease-out
            will-change-transform
          `}
          style={{
            transform: `
              translate3d(
                calc(var(--px) * ${f.depth}px),
                calc(var(--py) * ${f.depth}px),
                0
              )
            `,
          }}
        >
          <div
            className="animate-float motion-reduce:animate-none text-[#2a7fa3]/70"
            style={{
              animationDelay: f.delay,
            }}
          >
            {Icon ? (
              <Icon size={f.size ?? 26} strokeWidth={1.5} />
            ) : (
              <span className="font-mono text-xl font-semibold text-white/40">
                {f.glyph}
              </span>
            )}
          </div>
        </div>
      );
    })}

    {/* Bottom fade */}
    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
  </div>
);

/* =========================================================
   HERO COMPONENT
========================================================= */
const Hero: React.FC = () => {
  const [openPdf, setOpenPdf] = useState(false);
  const [isClickable, setIsClickable] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  /* =======================================================
     MOUSE TRACKING
  ======================================================= */
  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;

    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const target = e.target as HTMLElement;

    /*
      Buttons, links and scroll cue:
      - Native cursor-pointer
      - Custom ring disappears
      - No cursor scaling animation
    */
    const clickable = target.closest("button, a, [role='button']");

    setIsClickable(Boolean(clickable));

    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;

    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);

    el.style.setProperty("--px", String(px));
    el.style.setProperty("--py", String(py));

    el.style.setProperty("--mo", clickable ? "0" : "1");

    /*
      Keep cursor scale fixed.

      No circle/ring animation on buttons.
    */
    el.style.setProperty("--cs", "1");
  };

  const handleLeave = () => {
    const el = sectionRef.current;

    if (!el) return;

    setIsClickable(false);

    el.style.setProperty("--mo", "0");
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
    el.style.setProperty("--cs", "1");
  };

  /* =======================================================
     PDF MODAL
  ======================================================= */

  useEffect(() => {
    if (!openPdf) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPdf(false);
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openPdf]);

  /* =======================================================
     BUTTON BASE STYLE
  ======================================================= */

  const btnBase =
    "group relative inline-flex min-h-[48px] items-center justify-center " +
    "gap-2 overflow-hidden rounded-full px-6 py-3 " +
    "text-sm font-semibold transition-all duration-300 " +
    "focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-[#2a7fa3] focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-black sm:px-7 sm:py-3.5";

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative flex min-h-[720px] w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat px-4 py-20 text-white sm:min-h-[820px] sm:px-6 sm:py-24 lg:min-h-[110dvh] lg:px-10 lg:py-16
      ${openPdf ? "" : "cursor-none"}
      `}
      style={
        {
          backgroundImage: `url(${heroBg})`,
          "--mx": "50%",
          "--my": "40%",
          "--px": 0,
          "--py": 0,
          "--mo": 0,
          "--cs": 1,
        } as React.CSSProperties
      }
    >
      <AnimatedBackground />

      {/* ===================================================
          CUSTOM CURSOR

          Visible on normal background.
          Hidden completely over buttons/links.
      =================================================== */}
      {!openPdf && !isClickable && (
        <>
          {/* Outer cursor */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-[100] flex h-9 w-9 items-center justify-center rounded-full border border-[#2a7fa3] bg-[#2a7fa3]/10 opacity-[var(--mo)] transition-opacity duration-150 ease-out [@media(pointer:coarse)]:hidden motion-reduce:hidden [transform:translate3d(calc(var(--mx)_-_50%),calc(var(--my)_-_50%),0)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          </div>

          {/* Center dot */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-[101] h-1.5 w-1.5 rounded-full bg-white opacity-[var(--mo)] [@media(pointer:coarse)]:hidden motion-reduce:hidden [transform:translate3d(calc(var(--mx)_-_50%),calc(var(--my)_-_50%),0)]"
          />
        </>
      )}

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}
      <motion.div
        className="relative z-10 flex w-full max-w-5xl cursor-auto flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Status */}
        <motion.span
          variants={item}
          className="mb-5 inline-flex max-w-full cursor-default items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-center text-[11px] text-gray-300 backdrop-blur-sm sm:mb-6 sm:px-4 sm:text-sm"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for new opportunities
        </motion.span>

        {/* Greeting */}
        <motion.h1
          variants={item}
          className="cursor-default text-3xl font-bold leading-tight tracking-tight xs:text-4xl sm:text-5xl md:text-6xl"
        >
          Hello, I'm <span className="text-[#2a7fa3]">Ahad</span>{" "}
          <span className="inline-block origin-[70%_70%] animate-wave motion-reduce:animate-none">
            👋
          </span>
        </motion.h1>

        {/* Terminal */}
        <motion.div
          variants={item}
          className="mt-6 w-full max-w-md cursor-default overflow-hidden rounded-xl border border-white/10 bg-black/40 text-left shadow-xl shadow-black/30 backdrop-blur-md sm:mt-7"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />

            <span className="ml-2 font-mono text-[10px] text-gray-400 sm:text-[11px]">
              ~/portfolio
            </span>
          </div>

          {/* Terminal body */}
          <div className="px-3 py-3 font-mono text-xs sm:px-4 sm:py-3 sm:text-base">
            <p className="text-gray-500">
              <span className="text-[#2a7fa3]">$</span> whoami
            </p>

            <p className="mt-1 min-h-[1.75rem] overflow-hidden whitespace-nowrap text-gray-100 ">
              <span className="text-[#2a7fa3]">&gt;</span>{" "}
              <span className="font-semibold">
                <Typewriter
                  words={[
                    "Web Developer",
                    "UI Designer",
                    "Product Excellence Engineer",
                  ]}
                  loop
                  cursor
                  cursorStyle="▋"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </p>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="mt-5 max-w-md cursor-default px-2 text-sm leading-relaxed text-gray-400 sm:mt-6 sm:px-0 sm:text-base"
        >
          I build modern, scalable and beautiful web applications with clean UI,
          smooth UX, and performance-focused architectures.
        </motion.p>

        {/* =================================================
            BUTTONS
        ================================================= */}
        <motion.div
          variants={item}
          className=" mt-7 flex w-full max-w-sm flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 "
        >
          {" "}
          {/* View Resume */}{" "}
          <motion.button
            type="button"
            onClick={() => setOpenPdf(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={` ${btnBase} w-full cursor-pointer border border-[#2a7fa3] bg-white text-black hover:text-white sm:w-auto `}
          >
            {" "}
            <span
              aria-hidden="true"
              className=" absolute inset-0 bg-[#2a7fa3] opacity-0 transition-opacity duration-300 group-hover:opacity-100 "
            />{" "}
            <Eye
              size={16}
              className=" relative z-10 transition-transform duration-300 group-hover:scale-110 "
            />{" "}
            <span className="relative z-10">View Resume</span>{" "}
          </motion.button>{" "}
          {/* Download */}{" "}
          <motion.a
            href="/resume.pdf"
            download="Ahad Resume.pdf"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={` ${btnBase} w-full cursor-pointer bg-gradient-to-r from-[#1E5470] to-[#2a7fa3] shadow-lg shadow-[#2a7fa3]/20 hover:shadow-xl hover:shadow-[#2a7fa3]/40 sm:w-auto `}
          >
            {" "}
            <span
              aria-hidden="true"
              className=" absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full "
            />{" "}
            <span className="relative z-10">Download</span>{" "}
            <Download
              size={16}
              className=" relative z-10 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:scale-110 "
            />{" "}
          </motion.a>{" "}
        </motion.div>
      </motion.div>

      {/* ===================================================
          IMPROVED SCROLL CUE
      =================================================== */}
      <motion.div className="mt-10">
        <motion.button
          type="button"
          aria-label="Scroll down"
          onClick={() => {
            window.scrollTo({
              top: sectionRef.current?.offsetHeight ?? 0,
              behavior: "smooth",
            });
          }}
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.4,
            duration: 0.6,
          }}
          className="group absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 rounded-full px-3 py-2 text-white/50 transition-all duration-300 hover:text-white sm:bottom-6"
        >
          {/* Mouse / Scroll Capsule */}
          <span className="relative flex h-10 w-6 items-start justify-center rounded-full border border-white/25 bg-white/[0.03] p-1 backdrop-blur-sm transition-all duration-300 group-hover:border-[#2a7fa3]/70 group-hover:bg-[#2a7fa3]/10 group-hover:shadow-[0_0_20px_rgba(42,127,163,0.2)]">
            {/* Animated wheel */}
            <motion.span
              className="h-2 w-1 rounded-full bg-white/70 group-hover:bg-[#2a7fa3]"
              animate={{
                y: [0, 10, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>

          {/* Label */}
          <span className="hidden text-[9px] font-medium uppercase tracking-[0.22em] text-white/40 transition-colors duration-300 group-hover:text-white/70 sm:block ">
            Scroll
          </span>

          {/* Small arrow */}
          <motion.span
            animate={{
              y: [0, 3, 0],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="-mt-1 text-white/40 transition-colors duration-300 group-hover:text-[#2a7fa3]"
          >
            <ChevronDown size={13} strokeWidth={1.8} />
          </motion.span>
        </motion.button>
      </motion.div>

      {/* ===================================================
          PDF MODAL
      =================================================== */}
      <AnimatePresence>
        {openPdf && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            className="fixed inset-0 z-[999] flex cursor-auto items-center justify-center bg-black/80 px-2 py-4 backdrop-blur-sm sm:px-4"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setOpenPdf(false)}
          >
            <motion.div
              className="relative h-[92dvh] w-full overflow-hidden rounded-lg bg-white shadow-2xl sm:h-[90dvh] sm:max-w-4xl sm:rounded-xl"
              initial={{
                scale: 0.9,
                y: 30,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                y: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                y: 30,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal controls */}
              <div className="absolute right-2 top-2 z-10 flex gap-2 sm:right-3 sm:top-3">
                {/* Open PDF */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open resume in a new tab"
                  className="cursor-pointer rounded-full bg-black/80 p-2 text-white transition-colors hover:bg-black"
                >
                  <ExternalLink size={18} />
                </a>

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setOpenPdf(false)}
                  aria-label="Close resume preview"
                  className="cursor-pointer rounded-full bg-black/80 p-2 text-white transition-colors hover:bg-black"
                >
                  <X size={18} />
                </button>
              </div>

              {/* PDF */}
              <iframe
                src="/resume.pdf"
                className="h-full w-full"
                title="Resume PDF"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
