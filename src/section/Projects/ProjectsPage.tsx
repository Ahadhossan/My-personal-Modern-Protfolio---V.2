import { useEffect, useRef, useState } from "react";
import type { FC, MouseEvent, SVGProps } from "react";
import {
  Activity,
  ArrowRight as ArrowRightIcon,
  ArrowUpRight as ArrowUpRightIcon,
  Atom,
  Braces,
  Check as CheckIcon,
  ChevronDown,
  Code,
  Database,
  Flame,
  Layers,
  Radio,
  Server,
  Triangle,
  Webhook,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import image1 from "../../assets/About.jpeg";

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
}

/* ---------- Data (replace with your own projects) ---------- */
const projects: Project[] = [
  {
    id: "ecommerce-dashboard",
    title: "E-commerce Dashboard",
    description:
      "An admin panel to track sales, orders and inventory with live charts.",
    role: "Full-stack developer",
    year: "2026",
    highlights: [
      "Real-time sales and stock charts",
      "Role-based login for admin and staff",
      "Fully responsive, works on phone and desktop",
    ],
    tags: ["React", "TypeScript", "Tailwind", "Node.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/ecommerce-dashboard",
    detailsUrl: "/projects/ecommerce-dashboard",
    image: image1,
    accent: "bg-indigo-500",
    dot: "bg-indigo-400",
    featured: true,
  },
  {
    id: "weather-app",
    title: "Weather App",
    description:
      "Search any city and get a 7-day forecast in a fast, simple interface.",
    role: "Frontend developer",
    year: "2025",
    highlights: ["7-day forecast", "Search with suggestions"],
    tags: ["TypeScript", "REST API"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/weather-app",
    detailsUrl: "/projects/weather-app",
    image: "https://picsum.photos/seed/weather/800/500",
    accent: "bg-orange-500",
    dot: "bg-orange-400",
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
  {
    id: "url-shortener",
    title: "URL Shortener",
    description:
      "Turn long links into short ones and track how many people click.",
    role: "Full-stack developer",
    year: "2023",
    highlights: ["Click counter", "Custom short link"],
    tags: ["Node.js", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/url-shortener",
    detailsUrl: "/projects/url-shortener",
    image: "https://picsum.photos/seed/url-shortener/800/500",
    accent: "bg-cyan-500",
    dot: "bg-cyan-400",
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
  } = project;
  const [imgFailed, setImgFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
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

        {/* Fade into the card body */}
        <div
          aria-hidden="true"
          className={[
            "pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/50 to-transparent dark:from-slate-900/70",
            featured ? "lg:hidden" : "",
          ].join(" ")}
        />

        {/* Live chip */}
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur dark:border-white/15 dark:bg-slate-950/70 dark:text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70 dark:bg-emerald-400 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
          </span>
          Live
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

        {/* Buttons */}
        <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-2">
          {/* Live Project: accent fill slides in, arrow flies out */}
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/live relative inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-xl bg-slate-900 px-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-white dark:text-slate-900 dark:hover:text-white dark:focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className={`absolute inset-0 -translate-x-full ${accent} transition-transform duration-300 ease-out group-hover/live:translate-x-0 motion-reduce:transition-none`}
            />
            <span className="relative">Live Project</span>
            <ArrowUpRightIcon className="relative h-4 w-4 transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5 motion-reduce:transition-none" />
          </a>

          {/* GitHub icon button */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} on GitHub`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-slate-900 transition-all duration-300 hover:-rotate-6 hover:scale-110 hover:bg-slate-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-white/20 dark:text-white dark:hover:bg-white dark:hover:text-slate-900 dark:focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:transform-none"
          >
            <GithubIcon className="h-5 w-5" />
          </a>

          {/* Project Details */}
          <a
            href={detailsUrl}
            className="group/details inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 px-4 text-[15px] font-semibold text-slate-900 transition-colors duration-300 hover:border-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-white/20 dark:text-white dark:hover:border-white/60 dark:focus-visible:outline-white"
          >
            Project Details
            <ArrowRightIcon className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/details:translate-x-0 group-hover/details:opacity-100 motion-reduce:transition-none" />
          </a>
        </div>
      </div>
    </article>
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
              <a href="/projects" className="text-slate-900 dark:text-white">
                Projects
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
            <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            Available for new roles
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Projects I have built and shipped
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
