"use client";

import { useEffect, useState, type SVGProps } from "react";
import { Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { motion, useReducedMotion, type Variants } from "framer-motion";

type SvgProps = SVGProps<SVGSVGElement>;

const Gem = (p: SvgProps) => (
  <svg viewBox="0 0 320 240" fill="none" {...p}>
    <defs>
      <linearGradient id="gem-a" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5eead4" />
        <stop offset="1" stopColor="#0891b2" />
      </linearGradient>
      <linearGradient id="gem-b" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0e7490" />
        <stop offset="1" stopColor="#1e2a5a" />
      </linearGradient>
      <radialGradient id="gem-glow" cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="#22d3ee" stopOpacity=".35" />
        <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="165" cy="215" rx="70" ry="8" fill="url(#gem-glow)" />
    <ellipse
      cx="160"
      cy="120"
      rx="150"
      ry="55"
      transform="rotate(-18 160 120)"
      stroke="#22d3ee"
      strokeOpacity=".7"
    />
    <path d="M160 30 110 110l50 80 50-80-50-80Z" fill="url(#gem-b)" />
    <path d="M160 30 110 110l50 22V30Z" fill="url(#gem-a)" />
    <path d="M160 30v102l50-22-50-80Z" fill="#0e9bb5" opacity=".8" />
    <path d="M110 110l50 22 50-22-50 80-50-80Z" fill="#1e3a8a" opacity=".85" />
    <circle cx="272" cy="87" r="4.5" fill="#22d3ee" />
  </svg>
);

/* ---------- Data ---------- */
const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mdahadhossain/",
    icon: <FaLinkedin className="h-5 w-5 text-sky-400" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/Ahadhossan",
    icon: <FaGithub className="h-5 w-5" />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/8801322959861",
    icon: <FaWhatsapp className="h-5 w-5 text-emerald-400" />,
  },
];

const footerItems: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const footerContent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

const socialIcon: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -18 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
};

// Live local time (client only, so there is no hydration mismatch)
const useLocalTime = (timeZone: string) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone,
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date());

    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
};

/* ---------- Component ---------- */
const Footer = () => {
  const time = useLocalTime("Asia/Dhaka");
  const reduceMotion = useReducedMotion();

  return (
    <motion.footer
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={footerContent}
      className="relative isolate overflow-hidden bg-[#070d18] text-slate-200"
    >
      {/* Background glows */}
      <div
        aria-hidden
        className="absolute -left-32 -top-32 -z-10 h-[300px] w-[360px] rounded-full bg-blue-900/40 blur-[100px] sm:-left-40 sm:-top-40 sm:h-[400px] sm:w-[500px] sm:blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 -z-10 h-[260px] w-[300px] rounded-full bg-teal-500/15 blur-[100px] sm:-right-32 sm:-top-32 sm:h-[360px] sm:w-[420px] sm:blur-[120px]"
      />

      {/* Decorative waves */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute bottom-16 left-0 -z-10 hidden h-40 w-40 text-teal-400/60 lg:block"
      >
        <path
          d="M0 40c40 20 50 90 100 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <motion.div
        className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20"
        variants={footerContent}
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Brand */}
          <motion.div variants={footerItems}>
            <motion.a
              href="#"
              variants={footerItems}
              whileHover={reduceMotion ? undefined : { x: 2 }}
              className="inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400"
            >
              <span className="text-2xl font-bold tracking-[0.12em] text-white sm:text-3xl">
                AHAD<span className="text-teal-400">.DEV</span>
              </span>
            </motion.a>

            <motion.p
              variants={footerItems}
              className="mt-5 max-w-md text-sm leading-7 text-gray-400 sm:text-[15px]"
            >
              Frontend Developer <span className="mx-2 text-teal-400">•</span>{" "}
              Product Excellence Engineer
              <br className="hidden sm:block" /> HMS/PMS Specialist
            </motion.p>

            <div className="mt-4 mb-0 flex items-start justify-start gap-1.5">
              <i className="block h-[3px] w-[170px] rounded-sm bg-gradient-to-r from-[#8fc4dc] to-[#487081]" />
              <b className="h-1.5 w-1.5 rounded-full bg-[#2a7fa3]" />
            </div>

            {/* <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400 sm:text-[15px]">
              Building modern web experiences with clean code, creative design
              and a focus on real user needs.
            </p> */}

            <motion.ul
              variants={footerContent}
              className="mt-6 flex flex-wrap gap-3"
            >
              {socials.map((s) => (
                <motion.li key={s.label} variants={footerItems}>
                  <motion.a
                    href={s.href}
                    aria-label={s.label}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    variants={footerItems}
                    whileHover={
                      reduceMotion ? undefined : { y: -3, scale: 1.04 }
                    }
                    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition hover:border-teal-400/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400 sm:h-12 sm:w-12"
                  >
                    <motion.span
                      variants={socialIcon}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : { rotate: [0, -5, 5, 0], scale: 1.08 }
                      }
                      transition={{ duration: 0.35 }}
                      className="flex"
                    >
                      {s.icon}
                    </motion.span>
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Keep exploring */}
          <motion.div
            variants={footerItems}
            className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between lg:justify-end lg:gap-12"
          >
            <div>
              <motion.p
                variants={footerItems}
                className="text-xs uppercase tracking-[0.3em] text-slate-400 sm:text-sm"
              >
                Keep Exploring
              </motion.p>
              <motion.h3
                variants={footerItems}
                className="mt-4 text-3xl font-medium leading-tight text-white sm:mt-5 sm:text-4xl"
              >
                Better ideas.
                <br />
                <span className="text-teal-400">Bigger</span> impact.
              </motion.h3>
              <div className="mt-4 mb-0 flex items-start justify-start gap-1.5">
                <i className="block h-[3px] w-[170px] rounded-sm bg-gradient-to-r from-[#8fc4dc] to-[#487081]" />
                <b className="h-1.5 w-1.5 rounded-full bg-[#2a7fa3]" />
              </div>
              <motion.p
                variants={footerItems}
                className="mt-5 text-2xl italic text-slate-300 sm:mt-6 sm:text-3xl"
                style={{
                  fontFamily: "'Mrs Saint Delafield', 'Segoe Script', cursive",
                }}
              >
                Ahad Hossain
              </motion.p>
            </div>
            <Gem
              aria-hidden
              className="mx-auto aspect-[4/3] h-36 w-auto shrink-0 sm:mx-0 sm:h-44 lg:h-52"
            />
          </motion.div>
        </div>

        {/* Bottom bar:
            mobile/tablet -> stacked + centered
            desktop (lg)  -> copyright | local time | built with me */}
        <motion.div
          variants={footerItems}
          className="mt-12 grid gap-4 border-t border-white/10 pt-6 text-center text-xs text-gray-400 sm:mt-14 sm:text-sm lg:grid-cols-[1fr_auto_1fr] lg:items-center"
        >
          <motion.p
            variants={footerItems}
            className="flex items-center justify-center gap-3 lg:justify-self-start lg:text-left"
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-teal-400" />
            &copy; 2026 Md. Ahad Hossain. All rights reserved.
          </motion.p>

          {/* Local time + response time */}
          <div className="flex max-w-full flex-col items-center gap-1 justify-self-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-slate-300 sm:flex-row sm:gap-3 sm:rounded-full sm:py-2">
            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Bangladesh
              <span className="inline-block min-w-[4.5rem] text-center font-semibold tabular-nums text-white">
                {time || "--:--"}
              </span>
              (GMT+6)
            </span>
            <span aria-hidden className="hidden text-white/20 sm:inline">
              |
            </span>
            <span>Usually replies within 24 hours</span>
          </div>

          <motion.p
            variants={footerItems}
            className="flex items-center justify-center gap-2 lg:justify-self-end"
          >
            <Heart className="h-4 w-4 fill-teal-400 text-teal-400" />
            Built with Me
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
