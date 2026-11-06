import { useCallback, useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { createPortal } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Eye,
  Link2,
  X,
  ListChecks,
  Users,
  ShieldCheck,
} from "lucide-react";

import type { Article } from "../../Data/articles";

import {
  articles,
  TAG_ICONS,
  DEFAULT_TAG_ICON,
  INITIAL_COUNT,
  STEP,
} from "../../Data/articles";

import SectionEyebrow from "../../common/SectionEyebrow";

/* ---------- Constants ---------- */

const GRID = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8";

const EASE = [0.22, 1, 0.36, 1] as const;

const firstBatch = articles.slice(0, INITIAL_COUNT);

const extraBatches: Article[][] = [];

for (let i = INITIAL_COUNT; i < articles.length; i += STEP) {
  extraBatches.push(articles.slice(i, i + STEP));
}

/* ---------- Animation Variants ---------- */

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.985,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: 14,
    scale: 0.98,
  },
};

const imagePreviewVariants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.97,
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const revealItem = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

/* ---------- Scroll Reveal Hook ---------- */

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || inView) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [inView]);

  return { ref, inView };
}

/* ---------- Word Reveal ---------- */

const WordReveal: FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{
            opacity: 0,
            y: 22,
            filter: "blur(5px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.055,
            ease: EASE,
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

/* ---------- Summary Modal ---------- */

const SummaryModal: FC<{
  article: Article;
  onClose: () => void;
}> = ({ article, onClose }) => {
  const summary = article.summary;

  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);

  const downloadController = useRef<AbortController | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanupDownload = useCallback(() => {
    downloadController.current?.abort();
    downloadController.current = null;

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (imagePreviewOpen) {
          setImagePreviewOpen(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);

      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;

      cleanupDownload();
    };
  }, [onClose, imagePreviewOpen, cleanupDownload]);

  if (!summary) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden overscroll-none bg-slate-950/65 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.35, ease: EASE }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-summary-title"
        className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-black/30 dark:border-white/10 dark:bg-[#101522]"
      >
        {/* Header */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative shrink-0 border-b border-slate-200 bg-slate-50 px-6 py-6 pr-16 dark:border-white/10 dark:bg-white/[0.04] sm:px-8"
        >
          <motion.span
            variants={revealItem}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            SUMMARY
          </motion.span>

          <motion.h2
            id="article-summary-title"
            variants={revealItem}
            className="text-xl font-bold leading-snug text-slate-900 dark:text-white sm:text-2xl"
          >
            {article.title}
          </motion.h2>

          <motion.p
            variants={revealItem}
            className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400"
          >
            {article.excerpt}
          </motion.p>

          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Close summary"
            whileHover={{ rotate: 90, scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Scrollable Content */}

        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
          {/* Image Preview */}

          {article.image && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.4, ease: EASE }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <button
                type="button"
                onClick={() => setImagePreviewOpen(true)}
                aria-label={`Preview image for ${article.title}`}
                className="group relative block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-sky-500"
              >
                <motion.img
                  src={article.image}
                  alt={`Workflow preview for ${article.title}`}
                  whileHover={{ scale: 1.025 }}
                  transition={{ duration: 0.4 }}
                  className="max-h-64 w-full object-contain"
                />

                <span className="absolute inset-0 flex items-center justify-center bg-slate-950/0 text-white opacity-0 transition group-hover:bg-slate-950/35 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/75 px-4 py-2 text-sm font-semibold backdrop-blur">
                    <Eye className="h-4 w-4" />
                    Preview image
                  </span>
                </span>
              </button>

              <div className="border-t border-slate-200 px-4 py-3 dark:border-white/10">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Article workflow image
                </span>
              </div>
            </motion.div>
          )}

          {/* Overview */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h3
              variants={revealItem}
              className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white"
            >
              <BookOpen className="h-4 w-4 text-sky-500" />
              Project Overview
            </motion.h3>

            <motion.p
              variants={revealItem}
              className="text-sm leading-7 text-slate-600 dark:text-slate-300"
            >
              {summary.overview}
            </motion.p>
          </motion.div>

          {/* Highlights */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h3
              variants={revealItem}
              className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Key Highlights
            </motion.h3>

            <ul className="grid gap-3 sm:grid-cols-2">
              {summary.highlights.map((item, index) => (
                <motion.li
                  key={item}
                  variants={revealItem}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Workflow */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h3
              variants={revealItem}
              className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white"
            >
              <ListChecks className="h-4 w-4 text-sky-500" />
              Workflow Process
            </motion.h3>

            <ol className="space-y-3">
              {summary.workflow.map((item, index) => (
                <motion.li
                  key={item}
                  variants={revealItem}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 250,
                      damping: 20,
                    }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700 dark:bg-sky-400/15 dark:text-sky-300"
                  >
                    {index + 1}
                  </motion.span>

                  {item}
                </motion.li>
              ))}
            </ol>
          </motion.div>

          {/* Outcomes */}

          {summary.outcomes.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h3
                variants={revealItem}
                className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white"
              >
                <Users className="h-4 w-4 text-violet-500" />
                Expected Outcomes
              </motion.h3>

              <ul className="space-y-2">
                {summary.outcomes.map((item) => (
                  <motion.li
                    key={item}
                    variants={revealItem}
                    className="flex items-start gap-2.5 text-sm leading-6 text-slate-600 dark:text-slate-300"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Tags */}

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-wrap gap-2 border-t border-slate-200 pt-5 dark:border-white/10"
          >
            {article.tags.map((tag) => (
              <motion.span
                key={tag}
                variants={revealItem}
                whileHover={{ scale: 1.04, y: -2 }}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Full Image Preview */}

      <AnimatePresence>
        {imagePreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[310] flex items-center justify-center bg-black/90 p-4"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setImagePreviewOpen(false);
              }
            }}
          >
            <div className="relative flex max-h-[92dvh] w-full max-w-6xl flex-col items-center">
              <button
                type="button"
                onClick={() => setImagePreviewOpen(false)}
                aria-label="Close image preview"
                className="absolute -right-1 -top-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:rotate-90 hover:bg-white/20 sm:right-0"
              >
                <X className="h-5 w-5" />
              </button>

              <motion.img
                src={article.image}
                alt={`Full preview of ${article.title}`}
                variants={imagePreviewVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3, ease: EASE }}
                className="max-h-[80dvh] max-w-full rounded-xl object-contain shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,
    document.body,
  );
};

/* ---------- Article Card ---------- */

const ArticleCard: FC<{
  article: Article;
  index: number;
  reveal?: boolean;
  eager?: boolean;
}> = ({ article, index, reveal, eager }) => {
  const {
    title,
    excerpt,
    category,
    date,
    readTime,
    tags,
    url,
    image,
    featured,
  } = article;

  const [imgFailed, setImgFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const { ref, inView: seen } = useInView<HTMLElement>();

  const inView = reveal ?? seen;

  const closeSummary = useCallback(() => {
    setSummaryOpen(false);
  }, []);

  /* Copy Article Link */

  const copyLink = async () => {
    try {
      const articleUrl = new URL(url, window.location.origin).href;

      await navigator.clipboard.writeText(articleUrl);

      setCopied(true);

      toast.success("Link copied successfully!", {
        duration: 2500,
        icon: "🔗",
      });

      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link!", {
        duration: 2500,
      });
    }
  };

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.075, 0.3),
        ease: EASE,
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className={[
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#0E1525]/15 bg-white dark:border-white/10 dark:bg-slate-900/70",
        "transition-all duration-300 ease-out hover:border-[#15919B] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-20px_rgba(21,145,155,0.3)] dark:hover:border-[#15919B] dark:hover:shadow-[0_24px_48px_-20px_rgba(21,145,155,0.2)]",
        "motion-reduce:transition-none",
        featured ? "md:col-span-2 lg:flex-row" : "",
      ].join(" ")}
    >
      {/* Image */}

      <div
        className={[
          "relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800",
          featured ? "lg:aspect-auto lg:min-h-[340px] lg:w-1/2" : "",
        ].join(" ")}
      >
        {imgFailed || !image ? (
          <div className="flex h-full items-center justify-center text-6xl font-bold text-slate-900/15 dark:text-white/15">
            {title.charAt(0)}
          </div>
        ) : (
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
            whileHover={{ scale: 1.055 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className={`h-full w-full object-cover object-center transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Image Overlay */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Category */}

        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ delay: 0.25 + Math.min(index * 0.04, 0.2) }}
          className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur dark:border-white/15 dark:bg-slate-950/70 dark:text-white"
        >
          <span className="h-2 w-2 rounded-full bg-[#2a7fa3]" />
          {category}
        </motion.span>
      </div>

      {/* Content */}

      <div
        className={[
          "flex flex-1 flex-col gap-4 p-6 sm:p-7",
          featured ? "lg:w-1/2 lg:justify-center lg:p-10" : "",
        ].join(" ")}
      >
        {/* Date and Reading Time */}

        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {date}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {readTime}
          </span>
        </p>

        {/* Title */}

        <h3
          className={[
            "font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-[#15919B] dark:text-white dark:group-hover:text-[#45c1c9]",
            featured ? "text-3xl sm:text-4xl" : "text-2xl",
          ].join(" ")}
        >
          {title}
        </h3>

        {/* Description */}

        <p className="max-w-prose text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
          {excerpt}
        </p>

        {/* Tags */}

        <ul className="flex flex-wrap gap-2">
          {tags.map((tag, tagIndex) => {
            const TagIcon = TAG_ICONS[tag] ?? DEFAULT_TAG_ICON;

            return (
              <motion.li
                key={tag}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{
                  delay: 0.2 + tagIndex * 0.045,
                  duration: 0.3,
                }}
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
        </ul>

        {/* Action Buttons */}

        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-2">
          {/* Read Article */}

          <a
            href={url}
            className="group/read relative inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-xl border border-slate-300 px-4 text-[15px] font-semibold text-[#0F2E33] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7fa3] dark:border-white/20 dark:text-white dark:hover:text-white dark:focus-visible:outline-[#2a7fa3]"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-[#2a7fa3] transition-transform duration-300 ease-out group-hover/read:translate-x-0 motion-reduce:transition-none"
            />

            <span className="relative z-10">Read Article</span>

            <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/read:-translate-y-0.5 group-hover/read:translate-x-0.5 motion-reduce:transition-none" />
          </a>

          {/* Copy Link */}

          <div className="relative inline-flex">
            <motion.button
              type="button"
              onClick={copyLink}
              aria-label={copied ? "Link copied" : `Copy link to ${title}`}
              whileHover={{ rotate: -3, scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-300 text-slate-900 transition-all duration-300 hover:bg-[#2a7fa3] hover:text-white dark:border-white/20 dark:text-white dark:hover:bg-[#2a7fa3]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                  >
                    <Check className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="link"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                  >
                    <Link2 className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-200 [button:hover+&]:translate-y-0 [button:hover+&]:opacity-100 dark:bg-white dark:text-slate-900">
              {copied ? "Copied!" : "Copy"}
            </span>
          </div>

          {/* Summary */}

          <motion.button
            type="button"
            onClick={() => setSummaryOpen(true)}
            disabled={!article.summary}
            aria-expanded={summaryOpen}
            aria-haspopup="dialog"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group/more inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 px-4 text-[15px] font-semibold text-slate-900 transition-all duration-300 hover:border-[#2a7fa3] hover:bg-[#2a7fa3] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7fa3] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:text-white dark:hover:border-[#2a7fa3] dark:hover:bg-[#2a7fa3] dark:hover:text-white dark:focus-visible:outline-[#2a7fa3]"
          >
            Summary
            <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/more:translate-x-0 group-hover/more:opacity-100 motion-reduce:transition-none" />
          </motion.button>
        </div>
      </div>

      {/* Summary Modal */}

      <AnimatePresence>
        {summaryOpen && article.summary && (
          <SummaryModal article={article} onClose={closeSummary} />
        )}
      </AnimatePresence>
    </motion.article>
  );
};

/* ---------- Articles Page ---------- */

export default function ArticlesPage() {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [busy, setBusy] = useState(false);

  const gridRef = useRef<HTMLElement | null>(null);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showLessTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = articles.length;
  const shown = Math.min(visible, total);
  const allShown = shown >= total;
  const nextCount = Math.min(STEP, total - shown);

  /* Button Lock */

  const lock = (ms: number) => {
    setBusy(true);

    if (lockTimerRef.current) {
      clearTimeout(lockTimerRef.current);
    }

    lockTimerRef.current = setTimeout(() => {
      setBusy(false);
      lockTimerRef.current = null;
    }, ms);
  };

  /* Timer Cleanup */

  useEffect(() => {
    return () => {
      if (lockTimerRef.current) {
        clearTimeout(lockTimerRef.current);
      }

      if (showLessTimerRef.current) {
        clearTimeout(showLessTimerRef.current);
      }
    };
  }, []);

  /* Show More */

  const showMore = () => {
    if (busy) return;

    lock(800);

    setVisible((current) => Math.min(current + STEP, total));
  };

  /* Show Less */

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

    if (showLessTimerRef.current) {
      clearTimeout(showLessTimerRef.current);
    }

    showLessTimerRef.current = setTimeout(
      () => {
        setVisible(INITIAL_COUNT);
        showLessTimerRef.current = null;
      },
      reduce ? 0 : 450,
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="w-full bg-white transition-colors duration-300 dark:bg-[#050505]">
        {/* Toast Notifications */}

        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={10}
          toastOptions={{
            duration: 2500,
            style: {
              background: "#111827",
              color: "#ffffff",
              borderRadius: "14px",
              padding: "14px 18px",
              fontSize: "13px",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 10px 35px rgba(0,0,0,0.18)",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />

        <div className="relative mx-auto mt-0 max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-30">
          {/* Eyebrow */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex items-center gap-3"
          >
            <SectionEyebrow label="Articles" />
          </motion.div>

          {/* Header */}

          <header className="max-w-3xl py-8 sm:py-10 lg:py-12">
            <h1 className="text-[28px] font-semibold leading-tight text-[#0F2E33] transition-colors duration-300 dark:text-white sm:text-[34px] lg:text-[40px]">
              <WordReveal
                text="Articles on building for the web"
                delay={0.12}
              />
            </h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 18,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.55,
                delay: 0.55,
                ease: EASE,
              }}
              className="mt-5 max-w-xl text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:text-[17px]"
            >
              What I learn while building projects, written in plain language
              with real examples you can try.
            </motion.p>
          </header>

          {/* Article Cards */}

          <section ref={gridRef} aria-label="Articles" className="scroll-mt-6">
            {/* Initial Articles */}

            <div className={GRID}>
              {firstBatch.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>

            {/* Extra Articles */}

            <AnimatePresence initial={false}>
              {extraBatches.map((batch, batchIndex) => {
                const open = shown > INITIAL_COUNT + batchIndex * STEP;

                if (!open) return null;

                return (
                  <motion.div
                    key={batchIndex}
                    initial={{
                      opacity: 0,
                      height: 0,
                      marginTop: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      marginTop: 32,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      marginTop: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: EASE,
                    }}
                    className="overflow-hidden"
                  >
                    <div className={GRID}>
                      {batch.map((article, index) => (
                        <ArticleCard
                          key={article.id}
                          article={article}
                          index={index}
                          reveal={open}
                          eager
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </section>

          {/* Show More / Show Less */}

          {total > INITIAL_COUNT && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="mt-12 flex flex-col items-center gap-3"
            >
              <p
                aria-live="polite"
                className="text-sm text-slate-500 dark:text-slate-400"
              >
                Showing {shown} of {total} articles
              </p>

              <motion.button
                type="button"
                onClick={allShown ? showLess : showMore}
                disabled={busy}
                aria-disabled={busy}
                whileHover={!busy ? { scale: 1.035, y: -2 } : undefined}
                whileTap={!busy ? { scale: 0.97 } : undefined}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-[#15919B] px-6 py-2.5 text-sm font-medium text-[#0F2E33] transition-all duration-300 hover:bg-[#15919B] hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#15919B]/70 dark:text-slate-200 dark:hover:bg-[#15919B] dark:hover:text-white"
              >
                {allShown ? "Show less" : `Show more (${nextCount} more)`}

                <motion.span
                  animate={{ rotate: allShown ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex"
                >
                  <ChevronDown aria-hidden="true" className="h-4 w-4" />
                </motion.span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </main>
    </MotionConfig>
  );
}
