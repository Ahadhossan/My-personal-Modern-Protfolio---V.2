"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode, SVGProps } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";

/* ---------- Your links (edit these) ---------- */
const EMAIL = "ahadm3016@gmail.com";
const GITHUB_URL = "https://github.com/"; // TODO: your profile
const LINKEDIN_URL = "https://www.linkedin.com/"; // TODO: your profile
const FACEBOOK_URL = "https://www.facebook.com/"; // TODO: your profile
const INSTAGRAM_URL = "https://www.instagram.com/"; // TODO: your profile
const X_URL = "https://x.com/"; // TODO: your profile

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
    pos: "left-[12%] top-[8%] xl:left-[18%]",
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

/* ---------- Scroll reveal hook ---------- */
const useInView = <T extends HTMLElement>(threshold = 0.2) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // animate only once
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

const reveal = (inView: boolean) =>
  `transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
    inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
  }`;

/* ---------- Icon-only social button (no text, no shadow) ---------- */
const SocialButton = ({
  s,
  size,
  rippleDelay,
}: {
  s: Social;
  size: string;
  rippleDelay: string;
}) => {
  const external = !s.href.startsWith("mailto:");
  return (
    <a
      href={s.href}
      aria-label={s.label}
      title={s.label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      style={{ "--c": s.color } as CSSProperties}
      className={`lt-social relative flex items-center justify-center border border-black/10 bg-white/70 text-neutral-700 backdrop-blur dark:border-white/10 dark:bg-white/[0.05] dark:text-white/80 ${s.round} ${size}`}
    >
      {/* soft ripple ring (border only, no shadow) */}
      <span
        aria-hidden
        className={`lt-ripple pointer-events-none absolute inset-0 ${s.round}`}
        style={{ animationDelay: rippleDelay }}
      />
      {s.icon}
    </a>
  );
};

/* ---------- Component ---------- */
const LetsTalk = () => {
  const { ref, inView } = useInView<HTMLElement>(0.25);

  // Mouse parallax: only sets CSS variables, so no re-render happens
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mx",
      ((e.clientX - r.left) / r.width - 0.5).toFixed(3),
    );
    e.currentTarget.style.setProperty(
      "--my",
      ((e.clientY - r.top) / r.height - 0.5).toFixed(3),
    );
  };
  const handleLeave = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--mx", "0");
    e.currentTarget.style.setProperty("--my", "0");
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="isolate overflow-hidden px-5 py-16 text-neutral-900 relative bg-white transition-colors duration-300 dark:bg-[#050505] dark:text-white sm:px-6 sm:py-24 md:px-10 md:py-30"
    >
      {/* Custom CSS (plain CSS so hover works on every device) */}
      <style>{`
        @keyframes lt-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(var(--amp, -10px)); }
        }
        .lt-float {
          animation: lt-float var(--d, 6s) ease-in-out var(--delay, 0s) infinite;
        }

        /* mouse parallax layer */
        .lt-par {
          transform: translate3d(
            calc(var(--mx, 0) * var(--depth, 20) * 1px),
            calc(var(--my, 0) * var(--depth, 20) * 1px),
            0
          );
          transition: transform 0.35s ease-out;
        }

        .lt-social {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
          transition: transform 0.3s ease, background-color 0.3s ease,
                      border-color 0.3s ease, color 0.3s ease;
        }
        .lt-social:hover,
        .lt-social:focus-visible {
          background-color: var(--c) !important;
          border-color: var(--c) !important;
          color: #fff !important;
          transform: scale(1.18) rotate(-8deg);
        }
        .lt-social:focus-visible {
          outline: 2px solid var(--c);
          outline-offset: 3px;
        }
        .lt-social:active { transform: scale(0.92); }

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
          .lt-par { transform: none; transition: none; }
          .lt-social, .lt-social:hover, .lt-social:focus-visible, .lt-social:active {
            transition: none;
            transform: none;
          }
        }
      `}</style>

      {/* Grid background (fades out toward the edges) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.12] dark:opacity-[0.08] [background-image:linear-gradient(#2a7fa3_1px,transparent_1px),linear-gradient(90deg,#2a7fa3_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      {/* Center glow (slow breathing) */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#2a7fa3]/25 blur-[120px] motion-safe:animate-pulse dark:bg-[#2a7fa3]/35 sm:h-[560px] sm:w-[560px]"
        style={{ animationDuration: "6s" }}
      />

      {/* Dashed orbit arcs that slowly flow (desktop only) */}
      <svg
        aria-hidden
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
      </svg>
      <svg
        aria-hidden
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
      </svg>

      {/* Twinkling dots (desktop only) */}
      {sparkles.map((d, i) => (
        <span
          key={i}
          aria-hidden
          className={`lt-twinkle pointer-events-none absolute hidden rounded-full bg-[#2a7fa3] lg:block ${d.pos} ${d.size}`}
          style={{ animationDelay: d.delay }}
        />
      ))}

      {/* Floating social icons around the heading (desktop only)
          layers: entrance -> mouse parallax -> float -> hover */}
      {socials.map((s, i) => (
        <div
          key={s.label}
          className={`absolute z-10 hidden transition-all duration-700 ease-out motion-reduce:transition-none lg:block ${s.pos} ${
            inView ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
          style={{ transitionDelay: inView ? `${200 + i * 120}ms` : "0ms" }}
        >
          <div
            className="lt-par"
            style={{ "--depth": s.depth } as CSSProperties}
          >
            <div
              className="lt-float"
              style={
                {
                  "--d": `${5 + (i % 3)}s`,
                  "--delay": `${i * 0.5}s`,
                  "--amp": s.amp,
                } as CSSProperties
              }
            >
              <SocialButton s={s} size={s.size} rippleDelay={`${i * 0.6}s`} />
            </div>
          </div>
        </div>
      ))}

      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className={`text-left sm:text-center ${reveal(inView)}`}>
          <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            Let&apos;s Build Something
            <br />
            <span className="bg-gradient-to-r from-[#15919B] to-[#2a7fa3] bg-clip-text text-transparent dark:from-teal-300 dark:to-[#4aa3c7]">
              Great Together.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-white/70 sm:text-base lg:text-lg">
            Have a project, idea, or opportunity in mind?
            <br className="hidden sm:block" /> Let&apos;s turn it into something
            meaningful, modern &amp; scalable.
          </p>
        </div>

        {/* CTA */}
        <div
          className={`mt-8 flex sm:justify-center ${reveal(inView)}`}
          style={{ transitionDelay: inView ? "200ms" : "0ms" }}
        >
          <Link
            to="contact"
            className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#15919B] to-[#2a7fa3] px-9 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2a7fa3] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-auto sm:px-10 sm:py-4 sm:text-lg"
          >
            {/* Shine sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]"
            />
            <span className="relative">Let&apos;s Talk</span>
            <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>

        {/* Mobile + tablet: icons in a wave (every 2nd one sits lower).
            Desktop uses the floating ones above. */}
        <div className="mx-auto mt-10 grid max-w-sm grid-cols-6 gap-2.5 pb-6 sm:max-w-md sm:gap-4 lg:hidden">
          {socials.map((s, i) => (
            <div key={s.label} className="even:mt-5 sm:even:mt-6">
              <div
                className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
                  inView
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-6 scale-75 opacity-0"
                }`}
                style={{
                  transitionDelay: inView ? `${400 + i * 100}ms` : "0ms",
                }}
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
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LetsTalk;
