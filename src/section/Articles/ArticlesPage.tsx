import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { createPortal } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Download,
  Eye,
  Link2,
  X,
  ListChecks,
  Users,
  ShieldCheck,
  LoaderCircle,
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

const firstBatch = articles.slice(0, INITIAL_COUNT);

const extraBatches: Article[][] = [];

for (let i = INITIAL_COUNT; i < articles.length; i += STEP) {
  extraBatches.push(articles.slice(i, i + STEP));
}

/* ---------- Animation Variants ---------- */

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },
};

const imagePreviewVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
  },
};

/* ---------- Reveal on Scroll ---------- */

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

/* ---------- Summary Modal ---------- */

type DownloadStatus = "idle" | "downloading" | "completed" | "error";

const SummaryModal: FC<{
  article: Article;
  onClose: () => void;
}> = ({ article, onClose }) => {
  const summary = article.summary;

  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>("idle");
  const [downloadProgress, setDownloadProgress] = useState<number | null>(0);

  const downloadController = useRef<AbortController | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Download Cleanup */

  const cleanupDownload = () => {
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
  };

  /* Reset Download Status */

  const resetDownloadStatus = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      setDownloadStatus("idle");
      setDownloadProgress(0);
      resetTimerRef.current = null;
    }, 2000);
  };

  /* Actual Image Download */

  const handleDownload = async () => {
    if (!article.image || downloadStatus === "downloading") return;

    cleanupDownload();

    const controller = new AbortController();
    downloadController.current = controller;

    setDownloadStatus("downloading");
    setDownloadProgress(0);

    try {
      const response = await fetch(article.image, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const contentLength = response.headers.get("content-length");
      const total = contentLength ? Number(contentLength) : 0;

      const hasKnownSize = Number.isFinite(total) && total > 0;

      setDownloadProgress(hasKnownSize ? 0 : null);

      if (!response.body) {
        throw new Error("Download stream is not supported.");
      }

      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];

      let receivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        if (value) {
          chunks.push(new Uint8Array(value));
          receivedLength += value.byteLength;

          if (hasKnownSize) {
            const percentage = Math.min(
              100,
              Math.round((receivedLength / total) * 100),
            );

            setDownloadProgress(percentage);
          }
        }
      }

      if (controller.signal.aborted) return;

      const blob = new Blob(chunks, {
        type:
          response.headers.get("content-type") || "application/octet-stream",
      });

      const objectUrl = URL.createObjectURL(blob);
      objectUrlRef.current = objectUrl;

      const pathname = new URL(article.image, window.location.origin).pathname;

      const filename = decodeURIComponent(
        pathname.split("/").pop() || "article-image",
      );

      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setDownloadProgress(100);
      setDownloadStatus("completed");

      resetDownloadStatus();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      console.error("Download error:", error);

      setDownloadStatus("error");

      resetDownloadStatus();
    } finally {
      if (downloadController.current === controller) {
        downloadController.current = null;
      }
    }
  };

  /* Modal Events and Scroll Lock */

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
  }, [onClose, imagePreviewOpen]);

  if (!summary) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden overscroll-none bg-slate-950/65 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Summary Card */}

      <motion.section
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-summary-title"
        className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-black/30 dark:border-white/10 dark:bg-[#101522]"
      >
        {/* Header */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.12,
              },
            },
          }}
          className="relative shrink-0 border-b border-slate-200 bg-slate-50 px-6 py-6 pr-16 dark:border-white/10 dark:bg-white/[0.04] sm:px-8"
        >
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            SUMMARY
          </motion.span>

          <motion.h2
            id="project-summary-title"
            variants={{
              hidden: {
                opacity: 0,
                y: 25,
                filter: "blur(6px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              },
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-xl font-bold leading-snug text-slate-900 dark:text-white sm:text-2xl"
          >
            {article.title}
          </motion.h2>

          <motion.p
            variants={{
              hidden: {
                opacity: 0,
                y: 18,
                filter: "blur(4px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              },
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400"
          >
            {article.excerpt}
          </motion.p>

          {/* Close Button */}

          <motion.button
            type="button"
            onClick={onClose}
            aria-label="Close summary"
            whileHover={{ rotate: 90, scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Scrollable Content */}

        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
          {/* Image Preview and Download */}

          {article.image && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]"
            >
              <button
                type="button"
                onClick={() => setImagePreviewOpen(true)}
                className="group relative block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-sky-500"
                aria-label={`Preview image for ${article.title}`}
              >
                <motion.img
                  src={article.image}
                  alt={`Workflow preview for ${article.title}`}
                  whileHover={{ scale: 1.035 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
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
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Project workflow image
                  </span>

                  {/* Download Button */}

                  <motion.button
                    type="button"
                    onClick={handleDownload}
                    disabled={downloadStatus === "downloading"}
                    aria-busy={downloadStatus === "downloading"}
                    whileHover={
                      downloadStatus !== "downloading"
                        ? { scale: 1.04, y: -2 }
                        : undefined
                    }
                    whileTap={
                      downloadStatus !== "downloading"
                        ? { scale: 0.96 }
                        : undefined
                    }
                    className="inline-flex min-h-9 items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#2a7fa3] disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-[#2a7fa3] dark:hover:text-white"
                  >
                    {downloadStatus === "downloading" ? (
                      <>
                        <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                        {downloadProgress === null
                          ? "Downloading..."
                          : `${downloadProgress}%`}
                      </>
                    ) : downloadStatus === "completed" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        Downloaded
                      </>
                    ) : downloadStatus === "error" ? (
                      <>
                        <X className="h-3.5 w-3.5" />
                        Try Again
                      </>
                    ) : (
                      <>
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Download Progress */}

                <AnimatePresence mode="wait">
                  {downloadStatus === "downloading" && (
                    <motion.div
                      key="progress"
                      initial={{ opacity: 0, height: 0, y: -5 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -5 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
                        role="progressbar"
                        aria-label="Download progress"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={downloadProgress ?? undefined}
                      >
                        {downloadProgress === null ? (
                          <div className="h-full w-1/3 animate-[article-progress_1.2s_ease-in-out_infinite] rounded-full bg-[#2a7fa3]" />
                        ) : (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${downloadProgress}%` }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="h-full rounded-full bg-[#2a7fa3]"
                          />
                        )}
                      </div>
                    </motion.div>
                  )}

                  {downloadStatus === "completed" && (
                    <motion.p
                      key="completed"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                    >
                      Download started successfully.
                    </motion.p>
                  )}

                  {downloadStatus === "error" && (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 text-xs font-medium text-red-500"
                    >
                      Unable to download this image. Please try again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Overview */}

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.55,
              ease: "easeOut",
            }}
          >
            <motion.h3
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.45 }}
              className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white"
            >
              <BookOpen className="h-4 w-4 text-sky-500" />
              Project Overview
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-sm leading-7 text-slate-600 dark:text-slate-300"
            >
              {summary.overview}
            </motion.p>
          </motion.div>

          {/* Highlights */}

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.55,
              ease: "easeOut",
            }}
          >
            <motion.h3
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
              className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Key Highlights
            </motion.h3>

            <ul className="grid gap-3 sm:grid-cols-2">
              {summary.highlights.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -15, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{
                    delay: 0.4 + index * 0.07,
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -3,
                    transition: { duration: 0.2 },
                  }}
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
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.55,
              ease: "easeOut",
            }}
          >
            <motion.h3
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.45 }}
              className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white"
            >
              <ListChecks className="h-4 w-4 text-sky-500" />
              Workflow Process
            </motion.h3>

            <ol className="space-y-3">
              {summary.workflow.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.45 + index * 0.07,
                    duration: 0.45,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.48 + index * 0.07,
                      type: "spring",
                      stiffness: 250,
                      damping: 18,
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
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.55,
                ease: "easeOut",
              }}
            >
              <motion.h3
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.45 }}
                className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white"
              >
                <Users className="h-4 w-4 text-violet-500" />
                Expected Outcomes
              </motion.h3>

              <ul className="space-y-2">
                {summary.outcomes.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.5 + index * 0.07,
                      duration: 0.45,
                      ease: "easeOut",
                    }}
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
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.45,
              duration: 0.5,
            }}
            className="flex flex-wrap gap-2 border-t border-slate-200 pt-5 dark:border-white/10"
          >
            {article.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.75, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.5 + index * 0.05,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.06,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
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
            transition={{ duration: 0.25 }}
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
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
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

  /* Copy Article Link + Toast */

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
        duration: 0.65,
        delay: Math.min(index * 0.08, 0.32),
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25 },
      }}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl border border-[#0E1525]/15 bg-white dark:border-white/10 dark:bg-slate-900/70 cursor-pointer",
        "transition-all duration-500 ease-out dark:hover:border-[#15919B] hover:border-[#15919B] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-20px_rgba(21,145,155,0.3)] dark:hover:shadow-[0_24px_48px_-20px_rgba(21,145,155,0.2)]",
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
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`h-full w-full object-cover object-center ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Category */}

        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur dark:border-white/15 dark:bg-slate-950/70 dark:text-white">
          <span className="h-2 w-2 rounded-full bg-[#2a7fa3]" />
          {category}
        </span>
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
            "font-bold tracking-tight text-slate-900 dark:text-white",
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
          {tags.map((tag) => {
            const TagIcon = TAG_ICONS[tag] ?? DEFAULT_TAG_ICON;

            return (
              <li
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors duration-300 group-hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:group-hover:border-white/20"
              >
                <TagIcon
                  className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400"
                  aria-hidden="true"
                />
                {tag}
              </li>
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

          <button
            type="button"
            onClick={copyLink}
            aria-label={copied ? "Link copied" : `Copy link to ${title}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-slate-900 transition-all duration-300 hover:-rotate-6 hover:scale-110 hover:bg-[#2a7fa3] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7fa3] motion-reduce:transition-none motion-reduce:hover:transform-none dark:border-white/20 dark:text-white dark:hover:bg-[#2a7fa3] dark:hover:text-white dark:focus-visible:outline-[#2a7fa3] cursor-pointer"
          >
            {copied ? (
              <Check className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Link2 className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {/* Summary */}

          <button
            type="button"
            onClick={() => setSummaryOpen(true)}
            disabled={!article.summary}
            aria-expanded={summaryOpen}
            aria-haspopup="dialog"
            className="group/more inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 px-4 text-[15px] font-semibold text-slate-900 transition-all duration-300 hover:border-[#2a7fa3] hover:bg-[#2a7fa3] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7fa3] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:text-white dark:hover:border-[#2a7fa3] dark:hover:bg-[#2a7fa3] dark:hover:text-white dark:focus-visible:outline-[#2a7fa3] cursor-pointer"
          >
            Summary
            <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/more:translate-x-0 group-hover/more:opacity-100 motion-reduce:transition-none" />
          </button>
        </div>
      </div>

      {/* Summary Modal */}

      <AnimatePresence>
        {summaryOpen && article.summary && (
          <SummaryModal
            article={article}
            onClose={() => setSummaryOpen(false)}
          />
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

  const total = articles.length;

  const shown = Math.min(visible, total);

  const allShown = shown >= total;

  const nextCount = Math.min(STEP, total - shown);

  /* Button Lock */

  const lock = (ms: number) => {
    setBusy(true);

    setTimeout(() => {
      setBusy(false);
    }, ms);
  };

  /* Show More */

  const showMore = () => {
    if (busy) return;

    lock(800);

    setVisible((v) => Math.min(v + STEP, total));
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

    setTimeout(() => setVisible(INITIAL_COUNT), reduce ? 0 : 450);
  };

  /* Button Styling */

  const moreBtn =
    "inline-flex min-h-12 min-w-48 items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 text-[15px] font-semibold text-slate-900 transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 motion-reduce:transition-none motion-reduce:active:scale-100 dark:border-white/20 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-900 dark:focus-visible:outline-white";

  return (
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <SectionEyebrow label="Articles" />
        </motion.div>

        {/* Header */}

        <motion.header
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.15,
              },
            },
          }}
          className="max-w-3xl py-8 sm:py-10 lg:py-12"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Notes and tutorials
          </motion.p>

          <motion.h1
            variants={{
              hidden: {
                opacity: 0,
                y: 35,
                filter: "blur(8px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              },
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl"
          >
            Articles on building for the web
          </motion.h1>

          <motion.p
            variants={{
              hidden: {
                opacity: 0,
                y: 25,
                filter: "blur(5px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              },
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg"
          >
            What I learn while building projects, written in plain language with
            real examples you can try.
          </motion.p>
        </motion.header>

        {/* Article Cards */}

        <section ref={gridRef} aria-label="Articles" className="scroll-mt-6">
          {/* Initial Articles */}

          <div className={GRID}>
            {firstBatch.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>

          {/* Extra Articles */}

          {extraBatches.map((batch, b) => {
            const open = shown > INITIAL_COUNT + b * STEP;

            return (
              <motion.div
                key={b}
                initial={false}
                animate={{
                  opacity: open ? 1 : 0,
                  height: open ? "auto" : 0,
                  marginTop: open ? 32 : 0,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-hidden={!open}
                className="grid grid-cols-1 overflow-hidden md:grid-cols-2 lg:gap-8"
              >
                <div className="col-span-full min-h-0 overflow-hidden">
                  <div className={GRID}>
                    {batch.map((article, i) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        index={i}
                        reveal={open}
                        eager
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

        {/* Show More / Show Less */}

        {total > INITIAL_COUNT && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
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
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`${moreBtn} disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {allShown ? "Show less" : `Show more (${nextCount} more)`}

              <motion.span
                animate={{ rotate: allShown ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex"
              >
                <ChevronDown aria-hidden="true" className="h-4 w-4" />
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
