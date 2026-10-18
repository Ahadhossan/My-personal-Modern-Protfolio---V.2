import { useEffect, useRef, useState } from "react";
import type { FC, MouseEvent } from "react";
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  Atom,
  BookOpen,
  Braces,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  FileCode,
  Gauge,
  Hash,
  Lightbulb,
  Link2,
  Palette,
  Triangle,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ---------- Types ---------- */
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  url: string; // link to the full article
  image: string; // imported image or URL
  accent: string; // Tailwind bg class for the hover fill
  dot: string; // Tailwind bg class for the small colour dot
  featured?: boolean; // featured card is shown full width
}

/* ---------- Data (replace with your own articles) ---------- */
const articles: Article[] = [
  {
    id: "react-performance",
    title: "How I made my React app load twice as fast",
    excerpt:
      "A step-by-step look at code splitting, lazy loading and memoization, and which of them actually made a difference.",
    category: "React",
    date: "Oct 12, 2026",
    readTime: "8 min read",
    tags: ["React", "Performance", "TypeScript"],
    url: "/articles/react-performance",
    image: "https://picsum.photos/seed/react-performance/800/500",
    accent: "bg-indigo-500",
    dot: "bg-indigo-400",
    featured: true,
  },
  {
    id: "tailwind-tips",
    title: "10 Tailwind CSS tips I wish I knew earlier",
    excerpt:
      "Small habits that keep your class names short, your design consistent and your code easy to read.",
    category: "CSS",
    date: "Sep 28, 2026",
    readTime: "5 min read",
    tags: ["Tailwind", "CSS", "Tips"],
    url: "/articles/tailwind-tips",
    image: "https://picsum.photos/seed/tailwind-tips/800/500",
    accent: "bg-sky-500",
    dot: "bg-sky-400",
  },
  {
    id: "typescript-beginners",
    title: "TypeScript for beginners: types you will use every day",
    excerpt:
      "Skip the theory. Learn interfaces, unions and generics with real examples from a small project.",
    category: "Tutorial",
    date: "Sep 10, 2026",
    readTime: "10 min read",
    tags: ["TypeScript", "Tutorial"],
    url: "/articles/typescript-beginners",
    image: "https://picsum.photos/seed/typescript-beginners/800/500",
    accent: "bg-blue-500",
    dot: "bg-blue-400",
  },
  {
    id: "first-dev-job",
    title: "What I learned from my first developer interviews",
    excerpt:
      "The questions that came up again and again, and how I prepared for them.",
    category: "Career",
    date: "Aug 22, 2026",
    readTime: "6 min read",
    tags: ["Career", "Tips"],
    url: "/articles/first-dev-job",
    image: "https://picsum.photos/seed/first-dev-job/800/500",
    accent: "bg-emerald-500",
    dot: "bg-emerald-400",
  },
  {
    id: "nextjs-routing",
    title: "A simple guide to routing in Next.js",
    excerpt:
      "Pages, layouts and dynamic routes explained with one small example you can copy.",
    category: "Next.js",
    date: "Aug 05, 2026",
    readTime: "7 min read",
    tags: ["Next.js", "Tutorial"],
    url: "/articles/nextjs-routing",
    image: "https://picsum.photos/seed/nextjs-routing/800/500",
    accent: "bg-violet-500",
    dot: "bg-violet-400",
  },
  {
    id: "web-accessibility",
    title: "Web accessibility basics every developer should know",
    excerpt:
      "Labels, focus states and colour contrast: the quick wins that help every visitor.",
    category: "Accessibility",
    date: "Jul 18, 2026",
    readTime: "6 min read",
    tags: ["Accessibility", "Tips"],
    url: "/articles/web-accessibility",
    image: "https://picsum.photos/seed/web-accessibility/800/500",
    accent: "bg-rose-500",
    dot: "bg-rose-400",
  },
  {
    id: "javascript-async",
    title: "Async JavaScript made simple",
    excerpt:
      "Promises and async/await explained step by step, without the confusing parts.",
    category: "JavaScript",
    date: "Jul 02, 2026",
    readTime: "9 min read",
    tags: ["JavaScript", "Tutorial"],
    url: "/articles/javascript-async",
    image: "https://picsum.photos/seed/javascript-async/800/500",
    accent: "bg-amber-500",
    dot: "bg-amber-400",
  },
  {
    id: "css-layout",
    title: "Flexbox or Grid? How I choose",
    excerpt:
      "A quick way to decide which layout tool fits the problem in front of you.",
    category: "CSS",
    date: "Jun 14, 2026",
    readTime: "4 min read",
    tags: ["CSS", "Tips"],
    url: "/articles/css-layout",
    image: "https://picsum.photos/seed/css-layout/800/500",
    accent: "bg-teal-500",
    dot: "bg-teal-400",
  },
  {
    id: "portfolio-tips",
    title: "How to build a portfolio that gets noticed",
    excerpt:
      "What to show, what to leave out, and how to explain your projects in a few lines.",
    category: "Career",
    date: "May 30, 2026",
    readTime: "5 min read",
    tags: ["Career", "Tips"],
    url: "/articles/portfolio-tips",
    image: "https://picsum.photos/seed/portfolio-tips/800/500",
    accent: "bg-pink-500",
    dot: "bg-pink-400",
  },
  {
    id: "react-state",
    title: "Managing state in React without extra libraries",
    excerpt:
      "useState, useReducer and context: when each one is enough on its own.",
    category: "React",
    date: "May 11, 2026",
    readTime: "8 min read",
    tags: ["React", "TypeScript"],
    url: "/articles/react-state",
    image: "https://picsum.photos/seed/react-state/800/500",
    accent: "bg-cyan-500",
    dot: "bg-cyan-400",
  },
];

/* How many cards to show first, and how many each "Show more" click adds */
const INITIAL_COUNT = 5;
const STEP = 4;
const GRID = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8";

const firstBatch = articles.slice(0, INITIAL_COUNT);
const extraBatches: Article[][] = [];
for (let i = INITIAL_COUNT; i < articles.length; i += STEP) {
  extraBatches.push(articles.slice(i, i + STEP));
}

/* Lucide icon for each tag (unknown tags fall back to <Hash />) */
const TAG_ICONS: Record<string, LucideIcon> = {
  React: Atom,
  TypeScript: Braces,
  JavaScript: FileCode,
  Tailwind: Wind,
  CSS: Palette,
  "Next.js": Triangle,
  Performance: Gauge,
  Career: Briefcase,
  Tutorial: BookOpen,
  Tips: Lightbulb,
  Accessibility: Accessibility,
};

/* ---------- Reveal on scroll (runs once per element) ---------- */
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

/* ---------- Article card ---------- */
const ArticleCard: FC<{
  article: Article;
  index: number;
  reveal?: boolean; // set by the "extra" batches so they animate when opened
  eager?: boolean; // load the image early (extra batches are hidden at first)
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
    accent,
    dot,
    featured,
  } = article;

  const [imgFailed, setImgFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const { ref, inView: seen } = useInView<HTMLElement>();
  const inView = reveal ?? seen;
  const [settled, setSettled] = useState(false);

  // The stagger delay only applies while the card is entering, never on hover
  useEffect(() => {
    if (!inView) {
      setSettled(false);
      return;
    }
    const t = setTimeout(() => setSettled(true), 1400);
    return () => clearTimeout(t);
  }, [inView]);

  // Mouse-follow spotlight: updates two CSS variables on the card
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  // Copy the article link
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        new URL(url, window.location.origin).href,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available: do nothing */
    }
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      style={
        inView && !settled
          ? { transitionDelay: `${150 + index * 90}ms` }
          : undefined
      }
      className={[
        "group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900/70 dark:shadow-none",
        "transition-all duration-500 ease-out hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/10 dark:hover:border-white/25 dark:hover:shadow-none",
        "motion-reduce:transition-none",
        featured ? "md:col-span-2 lg:flex-row" : "",
        inView
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
      ].join(" ")}
    >
      {/* Spotlight that follows the cursor (soft grey in light, soft white in dark) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:hidden"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(15,23,42,0.05), transparent 45%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:block"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.07), transparent 45%)",
        }}
      />

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
          <img
            src={image}
            alt={`Cover image for ${title}`}
            width={800}
            height={500}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            ref={(el) => {
              if (el?.complete && el.naturalWidth > 0) setLoaded(true);
            }}
            onLoad={() => setLoaded(true)}
            onError={() => setImgFailed(true)}
            className={`h-full w-full object-cover object-center transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Category chip */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur dark:border-white/15 dark:bg-slate-950/70 dark:text-white">
          <span className={`h-2 w-2 rounded-full ${dot}`} />
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
        {/* Meta: date and reading time */}
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

        <h3
          className={[
            "font-bold tracking-tight text-slate-900 dark:text-white",
            featured ? "text-3xl sm:text-4xl" : "text-2xl",
          ].join(" ")}
        >
          {title}
        </h3>

        <p className="max-w-prose text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
          {excerpt}
        </p>

        {/* Tags with Lucide icons */}
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const TagIcon = TAG_ICONS[tag] ?? Hash;
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

        {/* Buttons */}
        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-2">
          {/* Read Article: accent fill slides in, arrow moves */}
          <a
            href={url}
            className="group/read relative inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-xl bg-slate-900 px-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-white dark:text-slate-900 dark:hover:text-white dark:focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className={`absolute inset-0 -translate-x-full ${accent} transition-transform duration-300 ease-out group-hover/read:translate-x-0 motion-reduce:transition-none`}
            />
            <span className="relative">Read Article</span>
            <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover/read:-translate-y-0.5 group-hover/read:translate-x-0.5 motion-reduce:transition-none" />
          </a>

          {/* Copy link icon button */}
          <button
            type="button"
            onClick={copyLink}
            aria-label={copied ? "Link copied" : `Copy link to ${title}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-slate-900 transition-all duration-300 hover:-rotate-6 hover:scale-110 hover:bg-slate-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 motion-reduce:transition-none motion-reduce:hover:transform-none dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-slate-900 dark:focus-visible:outline-white"
          >
            {copied ? (
              <Check className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Link2 className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {/* Short text link: arrow slides in */}
          <a
            href={url}
            className="group/more inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 px-4 text-[15px] font-semibold text-slate-900 transition-colors duration-300 hover:border-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-white/20 dark:text-white dark:hover:border-white/60 dark:focus-visible:outline-white"
          >
            Summary
            <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/more:translate-x-0 group-hover/more:opacity-100 motion-reduce:transition-none" />
          </a>
        </div>
      </div>
    </article>
  );
};

/* ---------- Page ---------- */
export default function ArticlesPage() {
  const [visible, setVisible] = useState(INITIAL_COUNT);
  const [busy, setBusy] = useState(false);
  const gridRef = useRef<HTMLElement | null>(null);

  const total = articles.length;
  const shown = Math.min(visible, total);
  const allShown = shown >= total;
  const nextCount = Math.min(STEP, total - shown);

  const lock = (ms: number) => {
    setBusy(true);
    setTimeout(() => setBusy(false), ms);
  };

  const showMore = () => {
    if (busy) return;
    lock(800);
    setVisible((v) => Math.min(v + STEP, total));
  };

  // Scroll up first, then collapse, so the page never jumps
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

  const moreBtn =
    "inline-flex min-h-12 min-w-48 items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 text-[15px] font-semibold text-slate-900 transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 motion-reduce:transition-none motion-reduce:active:scale-100 dark:border-white/20 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-900 dark:focus-visible:outline-white";

  return (
    <main className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-8 sm:pb-28">
        {/* Nav */}
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="text-xl font-bold tracking-tight">
            Your Name
          </a>
          <ul className="flex gap-5 text-[15px] font-medium text-slate-600 dark:text-slate-400 sm:gap-7">
            <li>
              <a
                href="/"
                className="transition-colors hover:text-slate-900 dark:hover:text-white"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/projects"
                className="transition-colors hover:text-slate-900 dark:hover:text-white"
              >
                Projects
              </a>
            </li>
            <li>
              <a href="/articles" className="text-slate-900 dark:text-white">
                Articles
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="transition-colors hover:text-slate-900 dark:hover:text-white"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="transition-colors hover:text-slate-900 dark:hover:text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Header */}
        <header className="max-w-3xl py-14 sm:py-20 lg:py-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Notes and tutorials
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Articles on building for the web
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            What I learn while building projects, written in plain language with
            real examples you can try.
          </p>
        </header>

        {/* Cards */}
        <section ref={gridRef} aria-label="Articles" className="scroll-mt-6">
          <div className={GRID}>
            {firstBatch.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>

          {/* Extra cards open and close with a smooth height animation */}
          {extraBatches.map((batch, b) => {
            const open = shown > INITIAL_COUNT + b * STEP;
            return (
              <div
                key={b}
                aria-hidden={!open}
                className={[
                  "grid transition-[grid-template-rows,opacity,margin,visibility] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  open
                    ? "visible mt-6 grid-rows-[1fr] opacity-100 lg:mt-8"
                    : "invisible mt-0 grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="-mx-3 -mb-6 min-h-0 overflow-hidden px-3 pb-6">
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
              </div>
            );
          })}
        </section>

        {/* Show more / Show less */}
        {total > INITIAL_COUNT && (
          <div className="mt-12 flex flex-col items-center gap-3">
            <p
              aria-live="polite"
              className="text-sm text-slate-500 dark:text-slate-400"
            >
              Showing {shown} of {total} articles
            </p>
            <button
              type="button"
              onClick={allShown ? showLess : showMore}
              aria-disabled={busy}
              className={moreBtn}
            >
              {allShown ? "Show less" : `Show more (${nextCount} more)`}
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${
                  allShown ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
