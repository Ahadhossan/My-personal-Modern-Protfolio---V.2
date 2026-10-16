import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ChevronsRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  USAGE (App.jsx)                                                    */
/*                                                                     */
/*  import { LoaderLayout } from "./components/PageLoader";            */
/*                                                                     */
/*  <Routes>                                                           */
/*    // every page inside this layout gets the loading animation      */
/*    <Route element={<LoaderLayout />}>                               */
/*      <Route path="/" element={<Home />} />                          */
/*      <Route path="/about" element={<About />} />                    */
/*      <Route path="/contact" element={<Contact />} />                */
/*    </Route>                                                         */
/*                                                                     */
/*    // NotFound pages have their own intro, so keep them outside     */
/*    <Route path="/services" element={<NotFound mode="coming-soon" /> */
/*    <Route path="*" element={<NotFound />} />                        */
/*  </Routes>                                                          */
/*                                                                     */
/*  LoaderLayout props                                                 */
/*   once   false (default): loader plays EVERY time you open a page   */
/*          (refresh and every navigation between pages)               */
/*          true: plays on refresh, then once per page in the app      */
/*   speed  typing speed in ms per character (default 7, lower = faster) */
/*   respectReducedMotion  false (default): always plays. Set true to  */
/*          skip it for visitors whose OS has animations turned off    */
/* ------------------------------------------------------------------ */

const css = `
@keyframes pl-fade   { from { opacity: 0; } to { opacity: 1; } }
@keyframes pl-drift  { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,-24px) scale(1.12); } }
@keyframes pl-cursor { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
@keyframes pl-stripe { to { background-position: 28px 0; } }
@keyframes pl-scan   { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }

.pl-fade    { animation: pl-fade .5s ease both; }
.pl-drift   { animation: pl-drift 14s ease-in-out infinite; }
.pl-cursor  { animation: pl-cursor 1s steps(1) infinite; }
.pl-scan    { animation: pl-scan 3.2s linear infinite; }
.pl-stripes {
  background-image: repeating-linear-gradient(45deg, rgba(255,255,255,.28) 0 7px, transparent 7px 14px);
  background-size: 28px 28px;
  animation: pl-stripe 1s linear infinite;
}
.pl-grid {
  background-image: radial-gradient(rgba(99,102,241,.22) 1.2px, transparent 1.2px);
  background-size: 26px 26px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 75%);
}
.pl-grid-dark {
  background-image: radial-gradient(rgba(129,140,248,.16) 1.2px, transparent 1.2px);
  background-size: 26px 26px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 75%);
}

@media (prefers-reduced-motion: reduce) {
  .pl-fade { animation: none; }
  .pl-drift, .pl-cursor, .pl-scan, .pl-stripes { animation: none; }
}
`;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Kept in memory on purpose: a browser refresh clears it, so the loader plays
// again after every reload. Inside the app (no reload) each page plays it once.
const loadedPaths = new Set<string>();
const hasSeen = (path: string) => loadedPaths.has(path);
const markSeen = (path: string) => {
  loadedPaths.add(path);
};

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n) + "…" : s);

const toneClass: Record<string, string> = {
  cmd: "text-indigo-300",
  info: "text-slate-300",
  success: "text-emerald-400",
};

/* ------------------------------------------------------------------ */
/*  Skip button (click or press Esc)                                   */
/* ------------------------------------------------------------------ */
const SkipButton = ({ onClick }: { onClick: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClick();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClick]);

  return (
    <div className="mt-6 flex flex-col items-center gap-2.5">
      <button
        type="button"
        onClick={onClick}
        aria-label="Skip intro (or press the Esc key)"
        className="group inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white/70 py-2 pl-5 pr-2 text-sm font-semibold text-slate-600 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-[#2a7fa3] hover:shadow-lg hover:shadow-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7fa3] active:translate-y-0 dark:border-slate-800 dark:bg-white/5 dark:text-[#2a7fa3]/70 dark:shadow-none dark:hover:border-[#2a7fa3]/60 dark:hover:text-indigo-300 dark:hover:shadow-indigo-500/10 dark:focus-visible:outline-[#2a7fa3]"
      >
        Skip
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white transition duration-300 group-hover:bg-[#2a7fa3] dark:bg-slate-100 dark:text-slate-900 dark:group-hover:bg-[#2a7fa3]">
          <ChevronsRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </button>

      {/* Explains the keyboard shortcut (hidden on phones, they have no Esc key) */}
      <p className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex dark:text-slate-500">
        Press
        <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 font-mono text-[11px] font-medium text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:shadow-none">
          Esc
        </kbd>
        on your keyboard to skip
      </p>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  PageLoader                                                         */
/*  - with onDone: plays the script, then calls onDone                 */
/*  - without onDone (e.g. Suspense fallback): plays the script, then  */
/*    waits at 92% until React unmounts it                             */
/* ------------------------------------------------------------------ */
export const PageLoader = ({
  path,
  onDone,
  speed = 10,
}: {
  path?: string;
  onDone?: () => void;
  speed?: number;
}) => {
  const location = useLocation();
  const route = path ?? location.pathname;

  const script = useMemo(
    () => [
      {
        tone: "cmd",
        text: `$ load-page --route "${clip(route, 28)}"`,
        pause: 150,
      },
      { tone: "info", text: "> Connecting to router...", pause: 100 },
      { tone: "info", text: "> Loading components and assets...", pause: 150 },
      { tone: "success", text: "✓ Ready! Opening page...", pause: 250 },
    ],
    [route],
  );

  const [lines, setLines] = useState<typeof script>([]);
  const [typed, setTyped] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx >= script.length) {
      if (!onDone) return;
      const t = setTimeout(onDone, 200);
      return () => clearTimeout(t);
    }
    const { text, pause } = script[idx];
    if (typed.length < text.length) {
      const t = setTimeout(
        () => setTyped(text.slice(0, typed.length + 1)),
        speed,
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLines((l) => [...l, script[idx]]);
      setTyped("");
      setIdx((i) => i + 1);
    }, pause);
    return () => clearTimeout(t);
  }, [typed, idx, script, onDone, speed]);

  const finished = idx >= script.length;
  const progress = finished
    ? onDone
      ? 100
      : 92
    : Math.min(
        99,
        Math.round(
          ((idx + typed.length / (script[idx]?.text.length || 1)) /
            script.length) *
            100,
        ),
      );
  const current = script[idx];

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-white via-white to-indigo-50/60 text-slate-900 transition-colors duration-300 dark:bg-[#050505] dark:bg-none dark:text-slate-100">
      <style>{css}</style>

      {/* Dot grid: light version / dark version */}
      <div className="pl-grid pointer-events-none absolute inset-0 dark:hidden" />
      <div className="pl-grid-dark pointer-events-none absolute inset-0 hidden dark:block" />

      {/* Glow blobs */}
      <div className="pl-drift pointer-events-none absolute -right-32 top-10 h-[26rem] w-[26rem] rounded-full bg-indigo-200/50 blur-3xl dark:bg-indigo-500/15" />
      <div
        className="pl-drift pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl dark:bg-cyan-500/10"
        style={{ animationDelay: "-6s" }}
      />

      <section className="pl-fade relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-5 py-12">
        <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-950/95 shadow-2xl shadow-indigo-300/40 backdrop-blur dark:border-slate-800 dark:bg-black dark:shadow-indigo-500/10 dark:ring-1 dark:ring-white/5">
          <div className="pl-scan pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-indigo-400/10 to-transparent" />

          <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-3 font-mono text-xs text-slate-500">
              page-loader — zsh
            </span>
          </div>

          <div
            className="min-h-[150px] space-y-2 p-5 font-mono text-[13px] leading-6 sm:text-sm"
            role="status"
            aria-live="polite"
          >
            {lines.map((l, i) => (
              <p key={i} className={toneClass[l.tone]}>
                {l.text}
              </p>
            ))}
            {current && (
              <p className={toneClass[current.tone]}>
                {typed}
                <span className="pl-cursor ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-indigo-300" />
              </p>
            )}
          </div>

          <div className="border-t border-slate-800 px-5 py-4">
            <div className="mb-2 flex items-center justify-between font-mono text-xs text-slate-400">
              <span>{progress >= 100 ? "Done" : "Loading page..."}</span>
              <span>{progress}%</span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-slate-800 dark:bg-slate-900"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="pl-stripes h-full rounded-full bg-gradient-to-r from-indigo-500 to-blue-400 transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {onDone && <SkipButton onClick={onDone} />}
      </section>
    </main>
  );
};

/* ------------------------------------------------------------------ */
/*  LoaderLayout: layout route, wraps every child page                 */
/* ------------------------------------------------------------------ */
export const LoaderLayout = ({
  once = false,
  speed = 7,
  respectReducedMotion = false,
}) => {
  const { pathname } = useLocation();
  const [readyPath, setReadyPath] = useState<string | null>(null);

  // Derived during render, so there is no flash of the page before the loader
  const skipForMotion = respectReducedMotion && prefersReducedMotion();
  const needsLoader = !skipForMotion && !(once && hasSeen(pathname));
  const loading = needsLoader && readyPath !== pathname;

  const finish = useCallback(() => {
    markSeen(pathname);
    setReadyPath(pathname);
  }, [pathname]);

  if (loading) {
    return (
      <PageLoader
        key={pathname}
        path={pathname}
        onDone={finish}
        speed={speed}
      />
    );
  }

  return (
    // No key here on purpose: Navbar/Footer inside the layout keep their state
    // between pages. The fade plays when the loader hands over to the page.
    <div className="pl-fade">
      <style>{css}</style>
      <Outlet />
    </div>
  );
};

export default LoaderLayout;
