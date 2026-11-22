

"use client";

import { useEffect, useState, type SVGProps } from "react";
import { Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

type SvgProps = SVGProps<SVGSVGElement>;

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Gem Illustration ---------- */

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

/* ---------- Social Links ---------- */

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

/* ---------- Animation Variants ---------- */

const still: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const footerContent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const footerItems: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

const logoVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const letterVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.6,
      ease: EASE,
    },
  },
};

const headingVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

const barVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
};

const dotVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 14,
      delay: 0.7,
    },
  },
};

const socialIcon: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
    rotate: -24,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 16,
    },
  },
};

const signatureVariants: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0)",
    opacity: 0.4,
  },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      delay: 0.25,
    },
  },
};

const gemVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    rotate: -8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
      delay: 0.2,
    },
  },
};

const lineDrawVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.1,
      ease: EASE,
    },
  },
};

const waveVariants: Variants = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
      delay: 0.4,
    },
  },
};

/* ---------- Visitor Location + Local Time ---------- */

const useVisitorInfo = () => {
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("Detecting location...");
  const [gmt, setGmt] = useState("");

  useEffect(() => {
    let active = true;

    // Detect visitor's local time and timezone
    const updateTime = () => {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const now = new Date();

      const localTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone,
      }).format(now);

      const offset = new Intl.DateTimeFormat("en-US", {
        timeZone,
        timeZoneName: "shortOffset",
      })
        .formatToParts(now)
        .find((part) => part.type === "timeZoneName")?.value;

      if (active) {
        setTime(localTime);
        setGmt(offset || "GMT");
      }
    };

    updateTime();

    const timer = window.setInterval(updateTime, 15000);

    // Detect actual device location
    if (!navigator.geolocation) {
      setPlace("Location unavailable");

      return () => {
        active = false;
        window.clearInterval(timer);
      };
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
          );

          if (!response.ok) {
            throw new Error("Location lookup failed");
          }

          const data = await response.json();

          const city =
            data.city ||
            data.locality ||
            data.localityInfo?.administrative?.[0]?.name ||
            "";

          const country = data.countryName || "";

          const location = [city, country].filter(Boolean).join(", ");

          if (active) {
            setPlace(location || "Location unavailable");
          }
        } catch (error) {
          console.error("Reverse geocoding error:", error);

          if (active) {
            setPlace("Location unavailable");
          }
        }
      },
      (error) => {
        console.warn("Geolocation error:", error.message);

        if (active) {
          setPlace("Location permission needed");
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 600000,
      },
    );

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return { time, place, gmt };
};

/* ---------- Small Components ---------- */

const AccentBar = ({ reduceMotion }: { reduceMotion: boolean }) => (
  <div className="mt-4 mb-0 flex items-start justify-start gap-1.5">
    <motion.i
      variants={reduceMotion ? still : barVariants}
      style={{ originX: 0 }}
      className="block h-[3px] w-[170px] rounded-sm bg-gradient-to-r from-[#8fc4dc] to-[#487081]"
    />

    <motion.b
      variants={reduceMotion ? still : dotVariants}
      className="h-1.5 w-1.5 rounded-full bg-[#2a7fa3]"
    />
  </div>
);

const Mask = ({ children }: { children: React.ReactNode }) => (
  <span className="block overflow-hidden pb-1">{children}</span>
);

/* ---------- Footer Component ---------- */

const Footer = () => {
  const { time, place, gmt } = useVisitorInfo();

  const reduceMotion = Boolean(useReducedMotion());

  const item = reduceMotion ? still : footerItems;

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.12,
      }}
      variants={reduceMotion ? still : footerContent}
      className="relative isolate overflow-hidden bg-[#070d18] text-slate-200"
    >
      {/* Background Glows */}

      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 40, 0],
                y: [0, 24, 0],
                scale: [1, 1.12, 1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-32 -top-32 -z-10 h-[300px] w-[360px] rounded-full bg-blue-900/40 blur-[100px] sm:-left-40 sm:-top-40 sm:h-[400px] sm:w-[500px] sm:blur-[120px]"
      />

      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -36, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute -right-24 -top-24 -z-10 h-[260px] w-[300px] rounded-full bg-teal-500/15 blur-[100px] sm:-right-32 sm:-top-32 sm:h-[360px] sm:w-[420px] sm:blur-[120px]"
      />

      {/* Decorative Wave */}

      <svg
        aria-hidden
        viewBox="0 0 200 200"
        className="absolute bottom-16 left-0 -z-10 hidden h-40 w-40 text-teal-400/60 lg:block"
      >
        <motion.path
          d="M0 40c40 20 50 90 100 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          variants={reduceMotion ? still : waveVariants}
        />
      </svg>

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Brand Section */}

          <div>
            <motion.a
              href="#"
              aria-label="AHAD.DEV"
              variants={reduceMotion ? still : logoVariants}
              whileHover={reduceMotion ? undefined : { x: 3 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-400"
            >
              <span
                aria-hidden
                className="flex overflow-hidden pb-1 text-2xl font-bold tracking-[0.12em] text-white sm:text-3xl"
              >
                {"AHAD".split("").map((ch, i) => (
                  <motion.span
                    key={`a-${i}`}
                    variants={reduceMotion ? still : letterVariants}
                    className="inline-block"
                  >
                    {ch}
                  </motion.span>
                ))}

                {".DEV".split("").map((ch, i) => (
                  <motion.span
                    key={`d-${i}`}
                    variants={reduceMotion ? still : letterVariants}
                    className="inline-block text-teal-400"
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            </motion.a>

            <motion.p
              variants={item}
              className="mt-5 max-w-md text-sm leading-7 text-gray-400 sm:text-[15px]"
            >
              Frontend Developer
              <span className="mx-2 text-teal-400">•</span>
              Product Excellence Engineer
              <br className="hidden sm:block" />
              HMS/PMS Specialist
            </motion.p>

            <AccentBar reduceMotion={reduceMotion} />

            {/* Social Links */}

            <motion.ul
              variants={reduceMotion ? still : footerContent}
              className="mt-6 flex flex-wrap gap-3"
            >
              {socials.map((social) => (
                <motion.li key={social.label} variants={item}>
                  <motion.a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -4,
                            scale: 1.08,
                          }
                    }
                    whileTap={reduceMotion ? undefined : { scale: 0.92 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 18,
                    }}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition-[border-color,background-color,box-shadow] duration-300 hover:border-teal-400/60 hover:bg-white/10 hover:shadow-[0_0_24px_-4px_rgba(45,212,191,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400 sm:h-12 sm:w-12"
                  >
                    <motion.span
                      variants={reduceMotion ? still : socialIcon}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              rotate: [0, -10, 10, 0],
                              transition: { duration: 0.4 },
                            }
                      }
                      className="flex"
                    >
                      {social.icon}
                    </motion.span>
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Keep Exploring */}

          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between lg:justify-end lg:gap-12">
            <div>
              <motion.p
                variants={item}
                className="text-xs uppercase tracking-[0.3em] text-slate-400 sm:text-sm"
              >
                Keep Exploring
              </motion.p>

              <motion.h3
                aria-label="Better ideas. Bigger impact."
                variants={reduceMotion ? still : headingVariants}
                className="mt-4 text-3xl font-medium leading-tight text-white sm:mt-5 sm:text-4xl"
              >
                <Mask>
                  <motion.span
                    aria-hidden
                    variants={reduceMotion ? still : lineVariants}
                    className="block"
                  >
                    Better ideas.
                  </motion.span>
                </Mask>

                <Mask>
                  <motion.span
                    aria-hidden
                    variants={reduceMotion ? still : lineVariants}
                    className="block"
                  >
                    <span className="text-teal-400">Bigger</span> impact.
                  </motion.span>
                </Mask>
              </motion.h3>

              <AccentBar reduceMotion={reduceMotion} />

              <motion.p
                variants={reduceMotion ? still : signatureVariants}
                className="mt-5 pr-3 text-2xl italic text-slate-300 sm:mt-6 sm:text-3xl"
                style={{
                  fontFamily: "'Mrs Saint Delafield', 'Segoe Script', cursive",
                }}
              >
                Ahad Hossain
              </motion.p>
            </div>

            {/* Floating Gem */}

            <motion.div
              variants={reduceMotion ? still : gemVariants}
              className="mx-auto shrink-0 sm:mx-0"
            >
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -12, 0],
                        rotate: [0, 1.5, 0],
                        filter: [
                          "drop-shadow(0 0 0px rgba(34,211,238,0))",
                          "drop-shadow(0 0 18px rgba(34,211,238,0.35))",
                          "drop-shadow(0 0 0px rgba(34,211,238,0))",
                        ],
                      }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Gem
                  aria-hidden
                  className="aspect-[4/3] h-36 w-auto sm:h-44 lg:h-52"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}

        <motion.div
          variants={item}
          className="relative mt-12 grid gap-4 pt-6 text-center text-xs text-gray-400 sm:mt-14 sm:text-sm lg:grid-cols-[1fr_auto_1fr] lg:items-center"
        >
          {/* Animated Border */}

          <motion.span
            aria-hidden
            variants={reduceMotion ? still : lineDrawVariants}
            style={{ originX: 0 }}
            className="absolute inset-x-0 top-0 h-px bg-white/10"
          />

          {/* Copyright */}

          <p className="flex items-center justify-center gap-3 lg:justify-self-start lg:text-left">
            © 2026 Md. Ahad Hossain. All rights reserved.
          </p>

          {/* Dynamic Location + Local Time */}

          <motion.div
            whileHover={reduceMotion ? undefined : { y: -2 }}
            className="group cursor-pointer relative flex max-w-full flex-col items-center gap-1 justify-self-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-slate-300 transition-colors duration-300 hover:border-teal-400/30 sm:flex-row sm:gap-3 sm:rounded-full sm:py-2"
          >
            {/* Privacy Tooltip */}

            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-max max-w-[260px] -translate-x-1/2 translate-y-2 rounded-xl border border-teal-400/20 bg-[#0c1728] px-4 py-2.5 text-center text-xs text-slate-300 opacity-0 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
            >
              <span className="font-medium text-teal-400">
                <span aria-hidden="true">🔒 </span>
                Privacy Protected
              </span>

              <span className="mt-1 block text-slate-400">
                Your location is not stored.
              </span>

              {/* Tooltip Arrow */}
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-full -translate-x-1/2 border-[6px] border-transparent border-t-[#0c1728]"
              />
            </span>

            {/* Live Indicator */}

            <span className="flex items-center gap-2 whitespace-nowrap">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              {/* Country Flag + Location */}

              <span>
                <span>{place}</span>
              </span>

              {/* Animated Local Time */}

              <span className="relative inline-flex min-w-[4.5rem] justify-center overflow-hidden font-semibold tabular-nums text-white">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={time || "empty"}
                    initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
                    animate={{
                      y: "0%",
                      opacity: 1,
                    }}
                    exit={reduceMotion ? undefined : { y: "-100%", opacity: 0 }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="inline-block"
                  >
                    {time || "--:--"}
                  </motion.span>
                </AnimatePresence>
              </span>

              {/* GMT Offset */}

              <span className="text-slate-400">({gmt || "GMT"})</span>
            </span>
          </motion.div>

          {/* Built With Me */}

          <p className="flex items-center justify-center gap-2 lg:justify-self-end">
            <motion.span
              aria-hidden
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.28, 1, 1.18, 1],
                    }
              }
              transition={{
                duration: 1.4,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut",
              }}
              className="flex"
            >
              <Heart className="h-4 w-4 fill-teal-400 text-teal-400" />
            </motion.span>
            Built with Me
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
