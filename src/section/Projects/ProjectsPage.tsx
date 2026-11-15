import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  animate,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type Variants,
} from "framer-motion";
import type { FC, PointerEvent } from "react";

import {
  ArrowRight,
  ArrowUpRight as ArrowUpRightIcon,
  Check as CheckIcon,
  ChevronDown,
  Code,
  Eye,
  X,
} from "lucide-react";

import {
  projects,
  INITIAL_COUNT,
  STEP,
  GRID,
  TAG_ICONS,
  GithubIcon,
} from "../../Data/projects";

import type { Project } from "../../Data/projects";
import SectionEyebrow from "../../common/SectionEyebrow";

/* ---------- Animation Settings ---------- */

const ease = [0.22, 1, 0.36, 1] as const;

const pageVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const eyebrowVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -16,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease,
    },
  },
};

const sectionTitleVariants: Variants = {
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
      ease,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 44,
    scale: 0.97,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease,
    },
  },
};

const contentContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.15,
    },
  },
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

const listContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

const listItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease,
    },
  },
};

// Tags pop in with a small spring
const tagVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 340, damping: 20 },
  },
};

const modalBackdropVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 28,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 18,
    filter: "blur(5px)",
    transition: {
      duration: 0.2,
      ease,
    },
  },
};

/* ---------- Word Reveal (each word slides up from a mask) ---------- */

const WordReveal: FC<{ text: string }> = ({ text }) => {
  const words = text.split(" ");

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.075,
            delayChildren: 0.2,
          },
        },
      }}
      aria-label={text}
      className="inline"
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom"
        >
          <motion.span
            variants={{
              hidden: { y: "110%" },
              visible: {
                y: "0%",
                transition: {
                  duration: 0.75,
                  ease,
                },
              },
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

/* ---------- Count Up (number counts when scrolled into view) ---------- */

const CountUp: FC<{ value: number }> = ({ value }) => {
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? value : 0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  return (
    <motion.span
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (reduce) {
          mv.set(value);
        } else {
          animate(mv, value, { duration: 0.9, ease, delay: 0.25 });
        }
      }}
      className="tabular-nums"
    >
      {rounded}
    </motion.span>
  );
};

/* ---------- Reveal on Scroll ---------- */

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

/* ---------- Image Preview Modal ---------- */

const ImagePreviewModal: FC<{
  title: string;
  image: string;
  onClose: () => void;
}> = ({ title, image, onClose }) =>
  createPortal(
    <motion.div
      key="preview-modal-backdrop"
      variants={modalBackdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-xl sm:p-6 lg:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image preview`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl shadow-black/30 dark:bg-[#101827] dark:shadow-black/60 sm:rounded-3xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Modal Header */}

        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/90 px-4 py-3.5 dark:border-white/10 dark:bg-[#101827]/95 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -40 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 16,
                delay: 0.15,
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white"
            >
              <Eye className="h-5 w-5" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.2, ease }}
              className="min-w-0"
            >
              <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                {title}
              </h3>

              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Project Image Preview
              </p>
            </motion.div>
          </div>

          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            whileHover={{
              rotate: 90,
              scale: 1.1,
            }}
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors duration-300 hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-red-400/30 dark:hover:bg-red-500/10 dark:hover:text-red-400 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Image Viewer */}

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-slate-100 p-3 dark:bg-[#080e19] sm:p-6 lg:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(148,163,184,0.25) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <motion.img
            src={image}
            alt={`${title} full-size preview`}
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 16,
              filter: "blur(6px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 24,
              delay: 0.1,
            }}
            className="relative z-10 max-h-[calc(92vh-130px)] max-w-full rounded-xl object-contain shadow-2xl shadow-slate-950/15 dark:shadow-black/40"
          />
        </div>

        {/* Modal Footer */}

        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#101827] sm:px-6">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Image Preview</span>
          </div>

          <p className="hidden text-xs text-slate-400 sm:block dark:text-slate-500">
            Press ESC or click outside to close
          </p>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );

/* ---------- Project Card ---------- */

const ProjectCard: FC<{
  project: Project;
  index: number;
  reveal?: boolean;
  eager?: boolean;
}> = ({ project, index, reveal, eager }) => {
  const {
    title,
    description,
    role,
    year,
    highlights,
    tags,
    liveUrl,
    githubUrl,
    detailsUrl,
    image,
    featured,
    status = "live",
    statusLabel,
    stage,
  } = project;

  const [imgFailed, setImgFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { ref, inView: seen } = useInView<HTMLElement>();
  const inView = reveal ?? seen;

  /* ---------- Preview Keyboard Control ---------- */

  useEffect(() => {
    if (!previewOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewOpen]);

  /* ---------- Background Scroll Lock ---------- */

  useEffect(() => {
    if (!previewOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [previewOpen]);

  /* ---------- Mouse Spotlight (mouse only) ---------- */

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgba(21,145,155,0.13), transparent 70%)`;

  const onMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();

    mx.set(event.clientX - rect.left);
    my.set(event.clientY - rect.top);
  };

  return (
    <>
      <motion.article
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{
          delay: Math.min(index * 0.09, 0.36),
        }}
        whileHover={{
          y: -6,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 22,
          },
        }}
        onPointerMove={onMove}
        className={[
          "group relative flex flex-col cursor-pointer overflow-hidden rounded-2xl border border-[#0E1525]/15 bg-white dark:border-white/10 dark:bg-slate-900/70",
          "transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#15919B] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-20px_rgba(21,145,155,0.3)] dark:hover:border-[#15919B] dark:hover:shadow-[0_24px_48px_-20px_rgba(21,145,155,0.2)]",
          featured ? "md:col-span-2 lg:flex-row" : "",
        ].join(" ")}
      >
        {/* Cursor spotlight */}
        <motion.span
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
        />

        {/* Bottom hover accent */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 z-20 h-[2px] w-0 bg-[#15919B] transition-all duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
        />

        {/* Project Image */}

        <div
          className={[
            "relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800",
            featured ? "lg:aspect-auto lg:min-h-[340px] lg:w-1/2" : "",
          ].join(" ")}
        >
          {imgFailed || !image ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="flex h-full items-center justify-center text-6xl font-bold text-slate-900/15 dark:text-white/15"
            >
              {title.charAt(0)}
            </motion.div>
          ) : (
            /* Zoom-out reveal once the image has loaded */
            <motion.div
              initial={{ scale: 1.18 }}
              animate={loaded && inView ? { scale: 1 } : { scale: 1.18 }}
              transition={{ duration: 1.1, ease }}
              className="h-full w-full"
            >
              <motion.img
                src={image}
                alt={`Cover image for ${title}`}
                width={800}
                height={500}
                loading={eager ? "eager" : "lazy"}
                decoding="async"
                ref={(el) => {
                  if (el?.complete && el.naturalWidth > 0) {
                    setLoaded(true);
                  }
                }}
                onLoad={() => setLoaded(true)}
                onError={() => setImgFailed(true)}
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`h-full w-full object-cover object-center transition-opacity duration-700 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </motion.div>
          )}

          {/* Shine sweep on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-[420%] motion-reduce:hidden"
          />

          {/* Preview Button */}

          {!imgFailed && image && (
            <div className="absolute bottom-4 right-4 z-20">
              <motion.button
                type="button"
                onClick={() => setPreviewOpen(true)}
                aria-label={`Preview ${title} image`}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 12, scale: 0.9 }
                }
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 20,
                  delay: 0.3 + Math.min(index * 0.06, 0.2),
                }}
                whileHover={{
                  y: -3,
                  scale: 1.06,
                }}
                whileTap={{ scale: 0.93 }}
                className="group/preview inline-flex h-10 items-center gap-2 rounded-xl border border-white/25 bg-slate-950/75 px-3.5 text-sm font-semibold text-white shadow-xl shadow-black/20 backdrop-blur-xl transition-colors duration-300 hover:border-[#15919B] hover:bg-[#15919B] cursor-pointer"
              >
                <Eye className="h-4 w-4 transition-transform duration-300 group-hover/preview:scale-110" />
                <span>Preview</span>
              </motion.button>
            </div>
          )}

          {/* Image Gradient */}

          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/50 to-transparent dark:from-slate-900/70",
              featured ? "lg:hidden" : "",
            ].join(" ")}
          />

          {/* Project Status */}

          <motion.span
            initial={{ opacity: 0, x: -14, scale: 0.9 }}
            animate={
              inView
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: -14, scale: 0.9 }
            }
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2 + Math.min(index * 0.06, 0.2),
            }}
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur dark:border-white/15 dark:bg-slate-950/70 dark:text-white"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping ${
                  status === "upcoming" ? "bg-amber-400" : "bg-emerald-400"
                }`}
              />
              <span
                className={`relative h-2 w-2 rounded-full ${
                  status === "upcoming" ? "bg-amber-500" : "bg-emerald-500"
                }`}
              />
            </span>

            {statusLabel ??
              (status === "upcoming" ? "Upcoming Project" : "Live")}
          </motion.span>
        </div>

        {/* Project Content */}

        <motion.div
          variants={contentContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={[
            "flex flex-1 flex-col gap-4 p-6 sm:p-7",
            featured ? "lg:w-1/2 lg:justify-center lg:p-10" : "",
          ].join(" ")}
        >
          {/* Role and Year */}

          <motion.p
            variants={contentVariants}
            className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 14,
                delay: 0.3,
              }}
              className="h-2 w-2 rounded-full bg-[#15919B]"
            />

            {role}

            <span className="text-slate-300 dark:text-slate-600">/</span>

            {year}

            {stage && (
              <>
                <span className="text-slate-300 dark:text-slate-600">/</span>

                <span className="font-medium text-amber-600 dark:text-amber-400">
                  {stage}
                </span>
              </>
            )}
          </motion.p>

          {/* Title */}

          <motion.h3
            variants={contentVariants}
            className={[
              "font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-[#15919B] dark:text-white dark:group-hover:text-[#45c1c9]",
              featured ? "text-3xl sm:text-4xl" : "text-2xl",
            ].join(" ")}
          >
            {title}
          </motion.h3>

          {/* Description */}

          <motion.p
            variants={contentVariants}
            className="max-w-prose text-[15px] leading-relaxed text-slate-600 dark:text-slate-300"
          >
            {description}
          </motion.p>

          {/* Highlights */}

          <motion.ul
            variants={listContainerVariants}
            className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-300"
          >
            {highlights.map((highlight) => (
              <motion.li
                key={highlight}
                variants={listItemVariants}
                className="flex items-start gap-2.5"
              >
                <motion.span
                  variants={{
                    hidden: { scale: 0, rotate: -45 },
                    visible: {
                      scale: 1,
                      rotate: 0,
                      transition: {
                        type: "spring",
                        stiffness: 420,
                        damping: 14,
                      },
                    },
                  }}
                  className="mt-0.5 flex shrink-0"
                >
                  <CheckIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </motion.span>
                {highlight}
              </motion.li>
            ))}
          </motion.ul>

          {/* Technology Stack */}

          <motion.ul
            variants={listContainerVariants}
            className="flex flex-wrap gap-2"
          >
            {tags.map((tag) => {
              const TagIcon = TAG_ICONS[tag] ?? Code;

              return (
                <motion.li
                  key={tag}
                  variants={tagVariants}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors duration-300 group-hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:group-hover:border-white/20"
                >
                  <TagIcon
                    className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400"
                    aria-hidden="true"
                  />
                  {tag}
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Project Actions */}

          <motion.div
            variants={contentVariants}
            className="mt-auto flex flex-wrap items-center gap-2.5 pt-2"
          >
            {status === "upcoming" ? (
              detailsUrl && detailsUrl !== "#" ? (
                <motion.a
                  href={detailsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="group/details inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[#15919B] dark:bg-white dark:text-slate-900 dark:hover:bg-[#15919B] dark:hover:text-white"
                >
                  View Project Brief
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/details:-translate-y-0.5 group-hover/details:translate-x-0.5" />
                </motion.a>
              ) : null
            ) : (
              <>
                {liveUrl && (
                  <motion.a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="group/live relative inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-xl border border-slate-300 px-4 text-[15px] font-semibold text-[#0F2E33] transition-colors duration-300 hover:text-white focus-visible:outline-[#2a7fa3] dark:border-white/20 dark:text-white dark:hover:text-white dark:focus-visible:outline-[#2a7fa3]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full bg-[#15919B] transition-transform duration-300 ease-out group-hover/live:translate-x-0 motion-reduce:transition-none"
                    />
                    <span className="relative">Live Project</span>
                    <ArrowUpRightIcon className="relative h-4 w-4 transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5" />
                  </motion.a>
                )}

                {githubUrl && (
                  <motion.a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${title} on GitHub`}
                    whileHover={{
                      rotate: -7,
                      scale: 1.1,
                      y: -3,
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 420, damping: 16 }}
                    className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-300 text-slate-900 transition-colors duration-300 hover:bg-[#2a7fa3] hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-[#2a7fa3]"
                  >
                    <GithubIcon className="h-5 w-5" aria-hidden="true" />
                  </motion.a>
                )}

                {detailsUrl && detailsUrl !== "#" && (
                  <motion.a
                    href={detailsUrl}
                    target={
                      detailsUrl.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      detailsUrl.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="group/more inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 px-4 text-[15px] font-semibold text-slate-900 transition-colors duration-300 hover:border-[#2a7fa3] hover:bg-[#2a7fa3] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7fa3] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:text-white dark:hover:border-[#2a7fa3] dark:hover:bg-[#2a7fa3] dark:hover:text-white dark:focus-visible:outline-[#2a7fa3]"
                  >
                    Project Details
                    <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/more:translate-x-0 group-hover/more:opacity-100 motion-reduce:transition-none" />
                  </motion.a>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.article>

      {/* ---------- Image Preview Modal ---------- */}

      <AnimatePresence>
        {previewOpen && image && !imgFailed && (
          <ImagePreviewModal
            key="preview-modal"
            title={title}
            image={image}
            onClose={() => setPreviewOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

/* ---------- Reusable Project Section ---------- */

const ProjectSection: FC<{
  title: string;
  items: Project[];
  type: "completed" | "upcoming";
}> = ({ title, items, type }) => {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [busy, setBusy] = useState(false);

  const gridRef = useRef<HTMLElement | null>(null);
  const lockTimerRef = useRef<number | null>(null);
  const showLessTimerRef = useRef<number | null>(null);

  const total = items.length;
  const shown = Math.min(visible, total);
  const allShown = shown >= total;
  const nextCount = Math.min(STEP, total - shown);

  const isUpcoming = type === "upcoming";

  /* ---------- Timer Cleanup ---------- */

  useEffect(() => {
    return () => {
      if (lockTimerRef.current) window.clearTimeout(lockTimerRef.current);
      if (showLessTimerRef.current)
        window.clearTimeout(showLessTimerRef.current);
    };
  }, []);

  /* ---------- Button Lock ---------- */

  const lock = (ms: number) => {
    setBusy(true);

    if (lockTimerRef.current) window.clearTimeout(lockTimerRef.current);

    lockTimerRef.current = window.setTimeout(() => {
      setBusy(false);
      lockTimerRef.current = null;
    }, ms);
  };

  /* ---------- Show More ---------- */

  const showMore = () => {
    if (busy) return;

    lock(800);

    setVisible((current) => Math.min(current + STEP, total));
  };

  /* ---------- Show Less ---------- */

  const showLess = () => {
    if (busy) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    lock(reduce ? 50 : 1300);

    gridRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });

    if (showLessTimerRef.current) window.clearTimeout(showLessTimerRef.current);

    showLessTimerRef.current = window.setTimeout(
      () => {
        setVisible(INITIAL_COUNT);
        showLessTimerRef.current = null;
      },
      reduce ? 0 : 450,
    );
  };

  return (
    <motion.section
      ref={gridRef}
      aria-label={title}
      initial={{
        opacity: 0,
        y: 28,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      transition={{
        duration: 0.75,
        ease,
      }}
      className="scroll-mt-8"
    >
      {/* Section Header */}

      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <motion.div
            variants={eyebrowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-3 flex items-center gap-2"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 motion-safe:animate-ping ${
                  isUpcoming ? "bg-amber-400" : "bg-emerald-400"
                }`}
              />
              <span
                className={`relative h-2.5 w-2.5 rounded-full ${
                  isUpcoming ? "bg-amber-500" : "bg-emerald-500"
                }`}
              />
            </span>

            <span
              className={`text-xs font-bold uppercase tracking-[0.18em] ${
                isUpcoming
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }`}
            >
              {isUpcoming ? "Currently In Progress" : "Successfully Completed"}
            </span>
          </motion.div>

          <motion.h2
            variants={sectionTitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
          >
            {title}
          </motion.h2>
        </div>

        {/* Project Count: number counts up */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
            x: 16,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.15,
          }}
          whileHover={{
            y: -3,
            scale: 1.04,
          }}
          className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
            isUpcoming
              ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400"
              : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400"
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isUpcoming ? "bg-amber-500" : "bg-emerald-500"
            }`}
          />
          <CountUp value={total} /> {total === 1 ? "Project" : "Projects"}
        </motion.div>
      </div>

      {/* Initial Projects */}

      <div className={GRID}>
        {items.slice(0, INITIAL_COUNT).map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Extra Project Batches */}

      {Array.from(
        {
          length: Math.ceil(Math.max(0, total - INITIAL_COUNT) / STEP),
        },
        (_, index) =>
          items.slice(
            INITIAL_COUNT + index * STEP,
            INITIAL_COUNT + (index + 1) * STEP,
          ),
      ).map((batch, batchIndex) => {
        const open = shown > INITIAL_COUNT + batchIndex * STEP;

        return (
          <motion.div
            key={batchIndex}
            initial={false}
            animate={{
              opacity: open ? 1 : 0,
              height: open ? "auto" : 0,
              marginTop: open ? 24 : 0,
            }}
            transition={{
              duration: 0.6,
              ease,
            }}
            aria-hidden={!open}
            className="overflow-hidden"
          >
            <div className="-mx-3 -mb-6 min-h-0 overflow-hidden px-3 pb-6">
              <div className={GRID}>
                {batch.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    reveal={open}
                    eager
                  />
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Show More / Show Less */}

      {total > INITIAL_COUNT && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.55,
            ease,
          }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={shown}
              initial={{
                opacity: 0,
                y: 7,
                filter: "blur(3px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -7,
                filter: "blur(3px)",
              }}
              transition={{ duration: 0.25 }}
              aria-live="polite"
              className="text-sm text-slate-500 dark:text-slate-400"
            >
              Showing {shown} of {total} projects
            </motion.p>
          </AnimatePresence>

          {/* Progress track fills as more projects are shown */}
          <div
            aria-hidden="true"
            className="h-1 w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
          >
            <motion.div
              initial={false}
              animate={{ width: `${(shown / total) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="h-full rounded-full bg-gradient-to-r from-[#15919B] to-[#2a7fa3]"
            />
          </div>

          <motion.button
            type="button"
            onClick={allShown ? showLess : showMore}
            disabled={busy}
            whileHover={
              busy
                ? undefined
                : {
                    y: -3,
                    scale: 1.04,
                  }
            }
            whileTap={
              busy
                ? undefined
                : {
                    scale: 0.96,
                  }
            }
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="group mt-1 inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-[#15919B] px-6 py-2.5 text-sm font-medium text-[#0F2E33] transition-colors duration-300 hover:bg-[#15919B] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#15919B]/70 dark:text-slate-200 dark:hover:bg-[#15919B] dark:hover:text-white"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={allShown ? "less" : "more"}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                }}
                transition={{
                  duration: 0.18,
                }}
              >
                {allShown ? "Show less" : `Show more (${nextCount} more)`}
              </motion.span>
            </AnimatePresence>

            <motion.span
              animate={{
                rotate: allShown ? 180 : 0,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="inline-flex"
            >
              <ChevronDown aria-hidden="true" className="h-4 w-4" />
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </motion.section>
  );
};

/* ---------- Projects Page ---------- */

export default function ProjectsPage() {
  const completedProjects = projects.filter(
    (project) => project.status !== "upcoming",
  );

  const upcomingProjects = projects.filter(
    (project) => project.status === "upcoming",
  );

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative w-full overflow-hidden bg-white transition-colors duration-300 dark:bg-[#050505]">
        {/* Ambient glow: one slow drifting blob */}
        <motion.div
          aria-hidden="true"
          animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-32 -top-32 h-[320px] w-[420px] rounded-full bg-teal-400/10 blur-[110px] dark:bg-teal-500/10"
        />

        <div className="relative mx-auto mt-0 max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-30">
          {/* Eyebrow */}

          <motion.div
            variants={eyebrowVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3"
          >
            <SectionEyebrow label="Projects" />
          </motion.div>

          {/* Page Header */}

          <motion.header
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl py-8 sm:py-10 lg:py-12"
          >
            <motion.h1 className="text-[28px] font-semibold leading-tight text-[#0F2E33] transition-colors duration-300 dark:text-white sm:text-[34px] lg:text-[40px]">
              <WordReveal text="Selected Projects & Upcoming Work" />
            </motion.h1>

            {/* Accent line draws itself */}
            <motion.span
              aria-hidden="true"
              variants={{
                hidden: { scaleX: 0 },
                visible: {
                  scaleX: 1,
                  transition: { duration: 0.9, ease, delay: 0.3 },
                },
              }}
              style={{ originX: 0 }}
              className="mt-4 block h-[2px] w-16 rounded-full bg-[#15919B]"
            />

            <motion.p
              variants={fadeUpVariants}
              className="mt-5 max-w-xl text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]"
            >
              Explore my completed projects, live applications, and upcoming
              work. Each project represents my experience, creativity, and
              passion for building modern web applications.
            </motion.p>
          </motion.header>

          {/* Completed Projects */}

          {completedProjects.length > 0 && (
            <ProjectSection
              title="Completed Projects"
              items={completedProjects}
              type="completed"
            />
          )}

          {/* Section Divider: line draws out from the centre, dot pops in */}

          {completedProjects.length > 0 && upcomingProjects.length > 0 && (
            <div className="relative my-16 sm:my-20">
              <motion.div
                initial={{
                  opacity: 0,
                  scaleX: 0,
                }}
                whileInView={{
                  opacity: 1,
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.5,
                }}
                transition={{
                  duration: 1,
                  ease,
                }}
                className="origin-center"
              >
                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/15" />
              </motion.div>

              <motion.span
                aria-hidden="true"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 14,
                  delay: 0.5,
                }}
                className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#15919B]"
              />
            </div>
          )}

          {/* Upcoming Projects */}

          {upcomingProjects.length > 0 && (
            <ProjectSection
              title="Upcoming Projects"
              items={upcomingProjects}
              type="upcoming"
            />
          )}
        </div>
      </main>
    </MotionConfig>
  );
}
