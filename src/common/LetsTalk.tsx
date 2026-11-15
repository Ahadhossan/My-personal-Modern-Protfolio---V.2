"use client";

import { useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode, SVGProps } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";

/* ---------- Your links (edit these) ---------- */
const EMAIL = "ahadm3016@gmail.com";
const GITHUB_URL = "https://github.com/"; // TODO: your profile
const LINKEDIN_URL = "https://www.linkedin.com/"; // TODO: your profile
const FACEBOOK_URL = "https://www.facebook.com/"; // TODO: your profile
const INSTAGRAM_URL = "https://www.instagram.com/"; // TODO: your profile
const X_URL = "https://x.com/"; // TODO: your profile

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Brand icons (inline SVG, no extra dependency) ---------- */
type IconProps = SVGProps<SVGSVGElement>;

const GitHubIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);
const LinkedInIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.5 9h3v10.5h-3V9Zm1.5-5a1.75 1.75 0 1 1 0 3.5A1.75 1.75 0 0 1 6 4Zm3.5 5h2.9v1.4h.05c.4-.8 1.4-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8v6h-3v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8v5.4h-3V9Z" />
  </svg>
);
const FacebookIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);
const InstagramIcon = (p: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const XIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/* ---------- Data ---------- */
interface Social {
  label: string;
  href: string;
  icon: ReactNode;
  color: string; // brand color used on hover + ripple
  round: string; // shape: circle or squircle
  size: string; // desktop size
  pos: string; // desktop floating position
  depth: number; // mouse-parallax strength (+/- = direction)
  amp: string; // float height
}

const iconCls = "h-[45%] w-[45%]";

// Left and right sides each form a gentle "(" / ")" curve:
// the middle icon is the biggest and sits furthest out.
const socials: Social[] = [
  {
    label: "GitHub",
    href: GITHUB_URL,
    icon: <GitHubIcon className={iconCls} />,
    color: "#333333",
    round: "rounded-full",
    size: "h-14 w-14",
    pos: "left-[12%] top-[10%] xl:left-[18%]",
    depth: 22,
    amp: "-10px",
  },
  {
    label: "LinkedIn",
    href: LINKEDIN_URL,
    icon: <LinkedInIcon className={iconCls} />,
    color: "#0a66c2",
    round: "rounded-2xl",
    size: "h-16 w-16",
    pos: "left-[4%] top-[27%] xl:left-[12%]",
    depth: -34,
    amp: "-12px",
  },
  {
    label: "Facebook",
    href: FACEBOOK_URL,
    icon: <FacebookIcon className={iconCls} />,
    color: "#1877f2",
    round: "rounded-full",
    size: "h-12 w-12",
    pos: "left-[11%] top-[47%] xl:left-[17%]",
    depth: 18,
    amp: "-8px",
  },
  {
    label: "Email",
    href: `mailto:${EMAIL}`,
    icon: <Mail className={iconCls} strokeWidth={1.8} />,
    color: "#15919B",
    round: "rounded-full",
    size: "h-12 w-12",
    pos: "right-[13%] top-[9%] xl:right-[19%]",
    depth: -20,
    amp: "-8px",
  },
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: <InstagramIcon className={iconCls} />,
    color: "#d6249f",
    round: "rounded-2xl",
    size: "h-16 w-16",
    pos: "right-[4%] top-[26%] xl:right-[10%]",
    depth: 34,
    amp: "-12px",
  },
  {
    label: "X (Twitter)",
    href: X_URL,
    icon: <XIcon className="h-[40%] w-[40%]" />,
    color: "#1f2937",
    round: "rounded-full",
    size: "h-14 w-14",
    pos: "right-[11%] top-[46%] xl:right-[17%]",
    depth: -24,
    amp: "-10px",
  },
];

// Tiny twinkling dots scattered around the icons (desktop only)
const sparkles = [
  { pos: "left-[24%] top-[6%]", size: "h-1.5 w-1.5", delay: "0s" },
  { pos: "left-[2.5%] top-[45%]", size: "h-1 w-1", delay: "1.2s" },
  { pos: "left-[22%] top-[60%]", size: "h-1 w-1", delay: "2.1s" },
  { pos: "right-[24%] top-[5%]", size: "h-1 w-1", delay: "0.7s" },
  { pos: "right-[2.5%] top-[46%]", size: "h-1.5 w-1.5", delay: "1.8s" },
  { pos: "right-[21%] top-[62%]", size: "h-1 w-1", delay: "0.3s" },
];

/* ---------- Variants ---------- */

// Reduced-motion fallback: everything is simply visible
const still: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const headingVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

// Each heading line slides up from behind a mask
const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE, delay: 0.35 },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.5 },
  },
};

// Floating icons pop in one after another (custom = index)
const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -25 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 14,
      delay: 0.45 + i * 0.1,
    },
  }),
};

const mobileIconVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 16,
      delay: 0.6 + i * 0.08,
    },
  }),
};

const orbitVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.4, ease: EASE, delay: 0.2 },
  },
};

/* ---------- Icon-only social button ---------- */
const SocialButton = ({
  s,
  size,
  rippleDelay,
  reduceMotion,
}: {
  s: Social;
  size: string;
  rippleDelay: string;
  reduceMotion: boolean;
}) => {
  const external = !s.href.startsWith("mailto:");
  const [active, setActive] = useState(false);

  return (
    <span className={`relative block ${size}`}>
      <motion.a
        href={s.href}
        aria-label={s.label}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        style={{ "--c": s.color } as CSSProperties}
        onHoverStart={() => setActive(true)}
        onHoverEnd={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        whileHover={reduceMotion ? undefined : { scale: 1.18, rotate: -8 }}
        whileTap={reduceMotion ? undefined : { scale: 0.88 }}
        transition={{ type: "spring", stiffness: 420, damping: 16 }}
        className={`lt-social relative flex h-full w-full items-center justify-center border border-black/10 bg-white text-neutral-700 backdrop-blur dark:border-white/10 dark:bg-black/10 dark:text-white/80 ${s.round}`}
      >
        {/* soft ripple ring (border only, no shadow) */}
        <span
          aria-hidden
          className={`lt-ripple pointer-events-none absolute inset-0 ${s.round}`}
          style={{ animationDelay: rippleDelay }}
        />
        {s.icon}
      </motion.a>

      {/* Name tooltip (desktop hover / keyboard focus) */}
      <AnimatePresence>
        {active && (
          <motion.span
            aria-hidden
            initial={reduceMotion ? false : { opacity: 0, y: 6, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 4, x: "-50%" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none absolute -top-9 left-1/2 z-20 hidden whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-white dark:text-slate-900 lg:block"
          >
            {s.label}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

/* ---------- Floating icon: entrance -> mouse parallax -> float -> hover ---------- */
const FloatingSocial = ({
  s,
  index,
  mx,
  my,
  reduceMotion,
}: {
  s: Social;
  index: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  reduceMotion: boolean;
}) => {
  const spring = { stiffness: 110, damping: 18, mass: 0.7 };
  const x = useSpring(
    useTransform(mx, (v) => v * s.depth),
    spring,
  );
  const y = useSpring(
    useTransform(my, (v) => v * s.depth),
    spring,
  );

  return (
    <motion.div
      custom={index}
      variants={reduceMotion ? still : iconVariants}
      className={`absolute z-10 hidden lg:block ${s.pos}`}
    >
      <motion.div style={reduceMotion ? undefined : { x, y }}>
        <div
          className="lt-float"
          style={
            {
              "--d": `${5 + (index % 3)}s`,
              "--delay": `${index * 0.5}s`,
              "--amp": s.amp,
            } as CSSProperties
          }
        >
          <SocialButton
            s={s}
            size={s.size}
            rippleDelay={`${index * 0.6}s`}
            reduceMotion={reduceMotion}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ---------- Component ---------- */
const LetsTalk = () => {
  const reduceMotion = Boolean(useReducedMotion());

  // Mouse parallax: motion values (spring-smoothed per icon), no re-render
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const handleMove = (e: PointerEvent<HTMLElement>) => {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="isolate overflow-hidden px-5 py-16 text-neutral-900 relative bg-white transition-colors duration-300 dark:bg-[#050505] dark:text-white sm:px-6 sm:py-24 md:px-10 md:py-30 mx-auto border-t border-[#0E1525]/10 dark:border-white/10"
    >
      {/* Looping CSS animations (float, ripple, dash, twinkle) */}
      <style>{`
        @keyframes lt-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(var(--amp, -10px)); }
        }
        .lt-float {
          animation: lt-float var(--d, 6s) ease-in-out var(--delay, 0s) infinite;
        }

        .lt-social {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          transition: background-color 0.3s ease, border-color 0.3s ease,
                      color 0.3s ease;
        }
        .lt-social:hover,
        .lt-social:focus-visible {
          background-color: var(--c) !important;
          border-color: var(--c) !important;
          color: #fff !important;
        }
        .lt-social:focus-visible {
          outline: 2px solid var(--c);
          outline-offset: 3px;
        }

        /* ripple ring */
        @keyframes lt-ripple {
          0%   { transform: scale(1);   opacity: 0.55; }
          70%  { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        .lt-ripple {
          border: 1.5px solid var(--c);
          opacity: 0;
          animation: lt-ripple 3.6s ease-out infinite;
        }
        .lt-social:hover .lt-ripple,
        .lt-social:focus-visible .lt-ripple { animation-play-state: paused; opacity: 0; }

        /* dashed orbit that slowly flows */
        @keyframes lt-dash { to { stroke-dashoffset: -280; } }
        .lt-dash { animation: lt-dash 28s linear infinite; }
        .lt-dash-rev { animation: lt-dash 34s linear infinite reverse; }

        /* twinkle dots */
        @keyframes lt-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.6); }
          50%      { opacity: 1;    transform: scale(1.25); }
        }
        .lt-twinkle { animation: lt-twinkle 3.4s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .lt-float, .lt-ripple, .lt-dash, .lt-dash-rev, .lt-twinkle { animation: none; }
          .lt-social { transition: none; }
        }
      `}</style>

      {/* Grid background (fades out toward the edges) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.12] dark:opacity-[0.08] bg-[linear-gradient(#2a7fa3_1px,transparent_1px),linear-gradient(90deg,#2a7fa3_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      {/* Center glow (slow breathing) */}
      <motion.div
        aria-hidden
        style={{ x: "-50%" }}
        animate={
          reduceMotion
            ? undefined
            : { scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/3 -z-10 h-105 w-105 rounded-full bg-[#2a7fa3]/25 blur-[120px] dark:bg-[#2a7fa3]/35 sm:h-140 sm:w-140"
      />

      {/* Dashed orbit arcs that fade in, then slowly flow (desktop only) */}
      <motion.svg
        aria-hidden
        variants={reduceMotion ? still : orbitVariants}
        viewBox="0 0 280 420"
        fill="none"
        className="pointer-events-none absolute -left-24 top-[8%] -z-10 hidden h-[420px] w-[280px] text-[#2a7fa3] lg:block"
      >
        <ellipse
          cx="140"
          cy="210"
          rx="139"
          ry="209"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.2"
          strokeDasharray="4 10"
          className="lt-dash"
        />
      </motion.svg>
      <motion.svg
        aria-hidden
        variants={reduceMotion ? still : orbitVariants}
        viewBox="0 0 280 400"
        fill="none"
        className="pointer-events-none absolute -right-28 top-[18%] -z-10 hidden h-[400px] w-[280px] text-[#2a7fa3] lg:block"
      >
        <ellipse
          cx="140"
          cy="200"
          rx="139"
          ry="199"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.2"
          strokeDasharray="4 10"
          className="lt-dash-rev"
        />
      </motion.svg>

      {/* Twinkling dots (desktop only) */}
      {sparkles.map((d, i) => (
        <span
          key={i}
          aria-hidden
          className={`lt-twinkle pointer-events-none absolute hidden rounded-full bg-[#2a7fa3] lg:block ${d.pos} ${d.size}`}
          style={{ animationDelay: d.delay }}
        />
      ))}

      {/* Floating social icons around the heading (desktop only) */}
      {socials.map((s, i) => (
        <FloatingSocial
          key={s.label}
          s={s}
          index={i}
          mx={mx}
          my={my}
          reduceMotion={reduceMotion}
        />
      ))}

      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="text-left sm:text-center">
          <motion.h2
            variants={reduceMotion ? still : headingVariants}
            className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
          >
            <span className="block overflow-hidden pb-1.5">
              <motion.span
                variants={reduceMotion ? still : lineVariants}
                className="block"
              >
                Let&apos;s Build Something
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1.5">
              <motion.span
                variants={reduceMotion ? still : lineVariants}
                className="block bg-gradient-to-r from-[#15919B] to-[#2a7fa3] bg-clip-text text-transparent dark:from-teal-300 dark:to-[#4aa3c7]"
              >
                Great Together.
              </motion.span>
            </span>
          </motion.h2>

          <motion.p
            variants={reduceMotion ? still : fadeUp}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-white/70 sm:text-base lg:text-lg"
          >
            Have a project, idea, or opportunity in mind?
            <br className="hidden sm:block" /> Let&apos;s turn it into something
            meaningful, modern &amp; scalable.
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          variants={reduceMotion ? still : ctaVariants}
          className="mt-8 flex sm:justify-center"
        >
          <motion.div
            whileHover={reduceMotion ? undefined : { y: -3, scale: 1.03 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="relative w-full sm:w-auto"
          >
            {/* Pulsing halo behind the button */}
            {!reduceMotion && (
              <motion.span
                aria-hidden
                animate={{ opacity: [0.35, 0, 0.35], scale: [1, 1.18, 1] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#2a7fa3]/40 blur-lg"
              />
            )}

            <Link
              to="contact"
              className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#15919B] to-[#2a7fa3] px-9 py-3.5 text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2a7fa3] sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
            >
              {/* Shine sweep */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%] motion-reduce:hidden"
              />
              <span className="relative">Let&apos;s Talk</span>
              <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile + tablet: icons in a wave (every 2nd one sits lower).
            Desktop uses the floating ones above. */}
        <div className="mx-auto mt-10 grid max-w-sm grid-cols-6 gap-2.5 pb-6 sm:max-w-md sm:gap-4 lg:hidden">
          {socials.map((s, i) => (
            <div key={s.label} className="even:mt-5 sm:even:mt-6">
              <motion.div
                custom={i}
                variants={reduceMotion ? still : mobileIconVariants}
              >
                <div
                  className="lt-float"
                  style={
                    {
                      "--d": `${5 + (i % 3)}s`,
                      "--delay": `${i * 0.4}s`,
                      "--amp": "-8px",
                    } as CSSProperties
                  }
                >
                  <SocialButton
                    s={s}
                    size="aspect-square w-full"
                    rippleDelay={`${i * 0.5}s`}
                    reduceMotion={reduceMotion}
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default LetsTalk;
