import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { FC, MouseEvent, SVGProps } from "react";

import {
  Activity,
  ArrowRight,
  ArrowUpRight as ArrowUpRightIcon,
  Atom,
  Braces,
  Check as CheckIcon,
  ChevronDown,
  Code,
  Database,
  Download,
  Eye,
  Flame,
  Layers,
  Radio,
  Server,
  Triangle,
  Webhook,
  Wind,
  X,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import image2 from "../../assets/Projects/Projects1.png";
import image1 from "../../assets/Articels/Modern Bookstore E-Commerce Homepage.png";

import SectionEyebrow from "../../common/SectionEyebrow";

/* ---------- Types ---------- */

export interface Project {
  id: string;

  title: string;

  description: string;

  role: string; // your role in the project

  year: string;

  highlights: string[]; // 2-3 short results/features (recruiters read these)

  tags: string[];

  liveUrl: string;

  githubUrl: string;

  detailsUrl: string;

  image: string; // imported image or URL

  accent: string; // Tailwind bg class for the hover fill

  dot: string; // Tailwind bg class for the small colour dot

  featured?: boolean; // featured card is shown full width
  status?: "live" | "upcoming";
  statusLabel?: string;
  stage?: string;
}

/* ---------- Data (replace with your own projects) ---------- */

const projects: Project[] = [
  {
    id: "book-store-online-book-shopping-platform",
    title: "Book Store – Online Book Shopping Platform",
    description:
      "An upcoming online bookstore platform currently in the planning and preparation stage. I am preparing to start frontend development, focusing first on customer shopping features and an admin dashboard.",
    role: "Planned Frontend Developer",
    year: "2026",
    highlights: [
      "Customer storefront for browsing, searching, and discovering books.",
      "Shopping cart, wishlist, checkout, order tracking, ratings, and reviews.",
      "Admin dashboard for managing books, users, orders, promotions, and analytics.",
      "Future phases may include author, publisher, printing staff, and logistics workflows.",
      "Development has not started yet; the project is currently in planning and preparation.",
      "Development phases: project setup, reusable components, routing, customer storefront, then admin dashboard.",
      "Later work: responsive testing, UI refinement, and backend integration when APIs are available.",
      "Expected outcome: a modular, responsive bookstore frontend with a structured admin experience.",
    ],
    tags: ["React 19", "TypeScript", "Vite", "React Router", "Tailwind CSS"],
    liveUrl: "",
    githubUrl: "",
    detailsUrl:
      "https://docs.google.com/document/d/1xnFBCq-CGIYEH8-BgVyiu1v25TT3IyyWkbyMhmQxQaA/edit?tab=t.ynpbwjdkn6wi#heading=h.6pqpnjgo2c66",
    image: image1,
    accent: "bg-amber-500",
    dot: "bg-amber-400",
    featured: true,
    status: "upcoming",
    statusLabel: "Upcoming Project",
    stage: "Planning & Preparation",
  },

  {
    id: "voyalabs-website",

    title: "voyalabs-website",

    description:
      "A responsive, animated landing page for a creative design and branding agency, built with vanilla HTML, CSS and JavaScript.",

    role: "Front-end developer",

    year: "2025",

    highlights: [
      "Custom cursor trail effect and scroll-triggered reveal animations using IntersectionObserver",

      "Scroll-based theme switch (dark to light) with smooth anchor navigation",

      "Responsive layout with a slide-in mobile menu, Lottie animations and a click-to-load Vimeo showreel",
    ],

    tags: [
      "HTML",

      "CSS",

      "JavaScript",

      "IntersectionObserver",

      "Lottie",

      "Vimeo",
    ],

    liveUrl: "https://voyalabs-website.netlify.app/",

    githubUrl: "https://github.com/Ahadhossan/Voyalabs-Website",

    detailsUrl: "#",

    image: image2,

    accent: "bg-indigo-500",

    dot: "bg-indigo-400",
  },

  {
    id: "task-manager",

    title: "Task Manager",

    description:
      "Drag-and-drop boards with deadlines, labels and team sharing.",

    role: "Full-stack developer",

    year: "2025",

    highlights: ["Drag-and-drop boards", "Deadlines and labels"],

    tags: ["Next.js", "MongoDB"],

    liveUrl: "https://example.com",

    githubUrl: "https://github.com/your-username/task-manager",

    detailsUrl: "/projects/task-manager",

    image: "https://picsum.photos/seed/tasks/800/500",

    accent: "bg-emerald-500",

    dot: "bg-emerald-400",
  },

  {
    id: "blog-platform",

    title: "Blog Platform",

    description:
      "A markdown blog with comments, tags and a clean reading view.",

    role: "Full-stack developer",

    year: "2025",

    highlights: ["Markdown editor", "Tag filtering"],

    tags: ["Next.js", "PostgreSQL"],

    liveUrl: "https://example.com",

    githubUrl: "https://github.com/your-username/blog-platform",

    detailsUrl: "/projects/blog-platform",

    image: "https://picsum.photos/seed/blog-platform/800/500",

    accent: "bg-rose-500",

    dot: "bg-rose-400",
  },

  {
    id: "chat-app",

    title: "Realtime Chat App",

    description:
      "One-to-one and group chat with online status and typing indicator.",

    role: "Full-stack developer",

    year: "2025",

    highlights: ["Instant messages", "Online status"],

    tags: ["React", "Socket.io"],

    liveUrl: "https://example.com",

    githubUrl: "https://github.com/your-username/chat-app",

    detailsUrl: "/projects/chat-app",

    image: "https://picsum.photos/seed/chat-app/800/500",

    accent: "bg-sky-500",

    dot: "bg-sky-400",
  },

  {
    id: "portfolio-cms",

    title: "Portfolio CMS",

    description: "Manage your projects and posts from a simple admin screen.",

    role: "Frontend developer",

    year: "2024",

    highlights: ["Simple admin screen", "Image upload"],

    tags: ["React", "Firebase"],

    liveUrl: "https://example.com",

    githubUrl: "https://github.com/your-username/portfolio-cms",

    detailsUrl: "/projects/portfolio-cms",

    image: "https://picsum.photos/seed/portfolio-cms/800/500",

    accent: "bg-violet-500",

    dot: "bg-violet-400",
  },

  {
    id: "food-delivery",

    title: "Food Delivery UI",

    description:
      "Browse restaurants, build a cart and place an order in a few taps.",

    role: "Frontend developer",

    year: "2024",

    highlights: ["Cart and checkout", "Restaurant search"],

    tags: ["React", "Redux"],

    liveUrl: "https://example.com",

    githubUrl: "https://github.com/your-username/food-delivery",

    detailsUrl: "/projects/food-delivery",

    image: "https://picsum.photos/seed/food-delivery/800/500",

    accent: "bg-amber-500",

    dot: "bg-amber-400",
  },

  {
    id: "expense-tracker",

    title: "Expense Tracker",

    description:
      "Add income and expenses and see where your money goes each month.",

    role: "Frontend developer",

    year: "2024",

    highlights: ["Monthly charts", "Category filters"],

    tags: ["TypeScript", "Chart.js"],

    liveUrl: "https://example.com",

    githubUrl: "https://github.com/your-username/expense-tracker",

    detailsUrl: "/projects/expense-tracker",

    image: "https://picsum.photos/seed/expense-tracker/800/500",

    accent: "bg-teal-500",

    dot: "bg-teal-400",
  },

  {
    id: "quiz-app",

    title: "Quiz App",

    description: "Timed multiple-choice quizzes with scores and review.",

    role: "Frontend developer",

    year: "2024",

    highlights: ["Timer and score", "Answer review"],

    tags: ["React", "Tailwind"],

    liveUrl: "https://example.com",

    githubUrl: "https://github.com/your-username/quiz-app",

    detailsUrl: "/projects/quiz-app",

    image: "https://picsum.photos/seed/quiz-app/800/500",

    accent: "bg-pink-500",

    dot: "bg-pink-400",
  },
];

/* How many cards to show first, and how many each "Show more" click adds */

const INITIAL_COUNT = 5;

const STEP = 4;

const GRID = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8";

const firstBatch = projects.slice(0, INITIAL_COUNT);

const extraBatches: Project[][] = [];

for (let i = INITIAL_COUNT; i < projects.length; i += STEP) {
  extraBatches.push(projects.slice(i, i + STEP));
}

/* ---------- Icons ---------- */

const GithubIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

/* Lucide icon for each tech tag (unknown tags fall back to <Code />) */

const TAG_ICONS: Record<string, LucideIcon> = {
  React: Atom,

  TypeScript: Braces,
  "React 19": Atom,
  Vite: Wind,
  "React Router": Triangle,
  "Tailwind CSS": Wind,

  Tailwind: Wind,

  "Node.js": Server,

  "Next.js": Triangle,

  MongoDB: Database,

  PostgreSQL: Database,

  "REST API": Webhook,

  Firebase: Flame,

  Redux: Layers,

  "Socket.io": Radio,

  "Chart.js": Activity,
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

/* ---------- Project card ---------- */

const ProjectCard: FC<{
  project: Project;

  index: number;

  reveal?: boolean; // set by the "extra" batches so they animate when opened

  eager?: boolean; // load the image early (extra batches are hidden at first)
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

    accent,

    dot,

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

  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!previewOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewOpen]);

  // The stagger delay only applies while the card is entering, never on hover

  useEffect(() => {
    if (!inView) return;

    const t = setTimeout(() => setSettled(true), 1400);

    return () => clearTimeout(t);
  }, [inView]);

  // Mouse-follow spotlight: updates two CSS variables on the card

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();

    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);

    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <>
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

            featured ? "lg:aspect-auto lg:w-1/2 lg:min-h-[340px]" : "",
          ].join(" ")}
        >
          {imgFailed || !image ? (
            <div className="flex h-full items-center justify-center text-6xl font-bold text-slate-900/15 dark:text-white/15">
              {title.charAt(0)}
            </div>
          ) : (
            <img
              src={image}
              alt={`${title} screenshot`}
              width={800}
              height={500}
              loading={eager ? "eager" : "lazy"}
              decoding="async"
              ref={(el) => {
                if (el?.complete && el.naturalWidth > 0) setLoaded(true);
              }}
              onLoad={() => setLoaded(true)}
              onError={() => setImgFailed(true)}
              className={`h-full w-full object-cover object-top transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Image preview and download actions */}
          {!imgFailed && image && (
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                aria-label={`Preview ${title} image`}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/20 bg-slate-950/75 px-3 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:bg-slate-950"
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
              <a
                href={image}
                download={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-preview`}
                aria-label={`Download ${title} image`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-slate-950/75 text-white shadow-lg backdrop-blur transition hover:bg-slate-950"
                onClick={(event) => event.stopPropagation()}
              >
                <Download className="h-4 w-4" />
              </a>
            </div>
          )}

          {/* Fade into the card body */}

          <div
            aria-hidden="true"
            className={[
              "pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/50 to-transparent dark:from-slate-900/70",

              featured ? "lg:hidden" : "",
            ].join(" ")}
          />

          {/* Project status */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur dark:border-white/15 dark:bg-slate-950/70 dark:text-white">
            <span
              className={`h-2 w-2 rounded-full ${status === "upcoming" ? "bg-amber-500" : "bg-emerald-500"}`}
            />
            {statusLabel ??
              (status === "upcoming" ? "Upcoming Project" : "Live")}
          </span>
        </div>

        {/* Content */}

        <div
          className={[
            "flex flex-1 flex-col gap-4 p-6 sm:p-7",

            featured ? "lg:w-1/2 lg:justify-center lg:p-10" : "",
          ].join(" ")}
        >
          {/* Meta: role and year */}

          <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className={`h-2 w-2 rounded-full ${dot}`} />

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
            {description}
          </p>

          {/* Highlights */}

          <ul className="flex flex-col gap-2 text-sm text-slate-700 dark:text-slate-300">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />

                {h}
              </li>
            ))}
          </ul>

          {/* Tech stack */}

          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const TagIcon = TAG_ICONS[tag] ?? Code;

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

          {/* Project actions */}
          <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-2">
            {status === "upcoming" ? (
              <a
                href={detailsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/details inline-flex min-h-11 items-center gap-2 rounded-xl bg-slate-900 px-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-amber-500 dark:bg-white dark:text-slate-900 dark:hover:bg-amber-400"
              >
                View Project Brief
                <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover/details:-translate-y-0.5 group-hover/details:translate-x-0.5" />
              </a>
            ) : (
              <>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/live relative inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-xl bg-slate-900 px-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:text-white dark:bg-white dark:text-slate-900 dark:hover:text-white"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 -translate-x-full ${accent} transition-transform duration-300 ease-out group-hover/live:translate-x-0 motion-reduce:transition-none`}
                  />
                  <span className="relative">Live Project</span>
                  <ArrowUpRightIcon className="relative h-4 w-4" />
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${title} on GitHub`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-slate-900 transition-all duration-300 hover:-rotate-6 hover:scale-110 hover:bg-slate-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-slate-900 dark:focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:transform-none"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a
                  href={detailsUrl}
                  className="group/more inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 px-4 text-[15px] font-semibold text-slate-900 transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:text-white dark:hover:border-white/60 dark:hover:bg-white dark:hover:text-slate-900 dark:focus-visible:outline-white"
                >
                  Project Details
                  <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/more:translate-x-0 group-hover/more:opacity-100 motion-reduce:transition-none" />
                </a>
              </>
            )}
          </div>
        </div>
      </article>

      {previewOpen &&
        image &&
        !imgFailed &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} image preview`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setPreviewOpen(false);
            }}
          >
            <div className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-400">Image preview</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={image}
                    download={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-preview`}
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-white px-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewOpen(false)}
                    aria-label="Close image preview"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white transition hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black/30 p-3 sm:p-6">
                <img
                  src={image}
                  alt={`${title} full-size preview`}
                  className="max-h-[calc(100vh-150px)] max-w-full rounded-lg object-contain"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

/* ---------- Page ---------- */

export default function ProjectsPage() {
  const [visible, setVisible] = useState(INITIAL_COUNT);

  const gridRef = useRef<HTMLElement | null>(null);

  const total = projects.length;

  const shown = Math.min(visible, total);

  const allShown = shown >= total;

  const nextCount = Math.min(STEP, total - shown);

  const [busy, setBusy] = useState(false);

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
    // Outer wrapper: full-width background (light = white, dark = #050505)

    <main className="w-full bg-white transition-colors duration-300 dark:bg-[#050505]">
      {/* Inner container: content width limit */}

      <div className="relative mx-auto mt-0 max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-30">
        {/* Eyebrow */}

        <div className="flex items-center gap-3">
          <SectionEyebrow label="Projects" />
        </div>

        {/* Header */}

        <header className="max-w-3xl py-8 sm:py-10 lg:py-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            Available for new roles
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Selected Projects & Upcoming Work
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Real products with live demos and public code. Open any project to
            try it, read the code, or see how I built it.
          </p>
        </header>

        {/* Grid: 1 col mobile, 2 col tablet and up. Featured project is full width. */}

        <section ref={gridRef} aria-label="Projects" className="scroll-mt-6">
          <div className={GRID}>
            {firstBatch.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
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
                    {batch.map((project, i) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
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
              Showing {shown} of {total} projects
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
