import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import awardsData, { type AwardItem } from "../../Data/awardsData";

export type { AwardItem };

const PREVIEW_COUNT = 3;

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

.aw-body { font-family: 'DM Sans', sans-serif; }
.aw-display { font-family: 'Space Grotesk', sans-serif; }
.aw-fade { animation: aw-fade .2s ease-out; }
.aw-pop { animation: aw-pop .24s ease-out; }

@keyframes aw-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes aw-pop {
  from { opacity: 0; transform: scale(.97); }
  to { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .aw-fade, .aw-pop { animation: none !important; }
  .aw-body *, .aw-body *::before, .aw-body *::after {
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
}
`;

type IconProps = {
  className?: string;
  children: ReactNode;
  stroke?: number;
};

function Svg({ className, children, stroke = 1.7 }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <circle cx="9" cy="10" r="2" />
      <path d="m21 16-5-5-8 8" />
    </Svg>
  );
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <Svg className={className}>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4" />
    </Svg>
  );
}

function ExpandIcon({ className }: { className?: string }) {
  return (
    <Svg className={className} stroke={2}>
      <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
    </Svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <Svg className={className} stroke={2}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Svg>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <Svg className={className} stroke={2}>
      <path d="m15 6-6 6 6 6" />
    </Svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <Svg className={className} stroke={2}>
      <path d="m9 6 6 6-6 6" />
    </Svg>
  );
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]";

type AwardsSectionProps = {
  id?: string;
  fullPage?: boolean;
  heading?: string;
  description?: string;
  badgeLabel?: string;
  pageSize?: number;
  awards?: AwardItem[];
  accentColor?: string;
  className?: string;
  showAll?: boolean;
  viewAllHref?: string;
};

/* ---------------- Award Media ---------------- */

function Media({
  award,
  onOpen,
  className = "",
  placeholderClass = "",
}: {
  award: AwardItem;
  onOpen: () => void;
  className?: string;
  placeholderClass?: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${award.title} image larger`}
      className={`group/media relative block cursor-zoom-in overflow-hidden text-left ${className} ${focusRing}`}
    >
      {award.image?.src ? (
        <img
          src={award.image.src}
          alt={award.image.alt || award.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover/media:scale-[1.04] motion-reduce:transition-none"
        />
      ) : (
        <span
          className={`flex h-full w-full flex-col items-center justify-center gap-3 ${placeholderClass}`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-current/20 sm:h-14 sm:w-14">
            <ImageIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          </span>
          <span className="text-xs font-medium tracking-wide">AWARD IMAGE</span>
        </span>
      )}

      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-70 transition-opacity group-hover/media:opacity-100" />

      <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md sm:h-10 sm:w-10 sm:opacity-0 sm:group-hover/media:opacity-100 sm:group-focus-visible/media:opacity-100">
        <ExpandIcon className="h-4 w-4" />
      </span>
    </button>
  );
}

/* ---------------- Lightbox ---------------- */

function Lightbox({
  awards,
  index,
  onChange,
  onClose,
}: {
  awards: AwardItem[];
  index: number;
  onChange: (next: number) => void;
  onClose: () => void;
}) {
  const award = awards[index];
  const total = awards.length;
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (step: number) => {
      if (total > 1) {
        onChange((index + step + total) % total);
      }
    },
    [index, total, onChange],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [go, onClose]);

  if (typeof document === "undefined" || !award) return null;

  const stop = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const navButton =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:h-12 sm:w-12";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${award.title} award image`}
      onClick={onClose}
      className="aw-fade aw-body fixed inset-0 z-[9999] flex h-[100dvh] w-screen cursor-zoom-out flex-col bg-[#050609]/95 text-white backdrop-blur-xl"
    >
      <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-[max(1.5rem,env(safe-area-inset-top))]">
        <div className="min-w-0 cursor-default" onClick={stop}>
          <h2 className="aw-display break-words text-base font-semibold leading-snug sm:text-2xl">
            {award.title}
          </h2>
          <p className="mt-1 text-xs text-white/60 sm:text-sm">
            {award.organization} · {award.year}
            {total > 1 && ` · ${index + 1} / ${total}`}
          </p>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label="Close award image"
          className="relative z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null || total < 2) return;

          const delta = event.changedTouches[0].clientX - touchStartX.current;

          touchStartX.current = null;

          if (Math.abs(delta) > 50) {
            go(delta > 0 ? -1 : 1);
          }
        }}
      >
        {total > 1 && (
          <button
            type="button"
            onClick={(event) => {
              stop(event);
              go(-1);
            }}
            aria-label="Previous award"
            className={`${navButton} left-2 sm:left-5`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {award.image?.src ? (
          <img
            key={award.id}
            src={award.image.src}
            alt={award.image.alt || award.title}
            onClick={stop}
            className="aw-fade aw-pop h-full w-full cursor-default object-contain"
          />
        ) : (
          <div
            onClick={stop}
            className="flex cursor-default flex-col items-center gap-3 text-white/40"
          >
            <ImageIcon className="h-12 w-12" />
            <span className="text-sm">No image added yet</span>
          </div>
        )}

        {total > 1 && (
          <button
            type="button"
            onClick={(event) => {
              stop(event);
              go(1);
            }}
            aria-label="Next award"
            className={`${navButton} right-2 sm:right-5`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="shrink-0 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-8">
        {award.description && (
          <p
            onClick={stop}
            className="mx-auto max-h-24 max-w-2xl cursor-default overflow-y-auto text-center text-xs leading-5 text-white/65 sm:text-sm sm:leading-6"
          >
            {award.description}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}

/* ---------------- Award Card ---------------- */

function AwardCard({
  award,
  number,
  accentColor,
  onOpen,
}: {
  award: AwardItem;
  number: number;
  accentColor: string;
  onOpen: () => void;
}) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 motion-reduce:transform-none motion-reduce:transition-none dark:border-white/10 dark:bg-[#12151d] dark:shadow-none dark:hover:shadow-black/30 sm:rounded-[28px] sm:p-3.5">
      <div className="relative">
        <Media
          award={award}
          onOpen={onOpen}
          className="aspect-[16/10] w-full rounded-[18px] sm:rounded-[20px]"
          placeholderClass="bg-slate-100 text-slate-400 dark:bg-white/[0.04] dark:text-slate-500"
        />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-slate-900 backdrop-blur-md dark:border-white/15 dark:bg-[#10131a]/80 dark:text-white">
          {award.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4 sm:pt-5">
        <div className="mb-3 flex items-center gap-2">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-900"
            style={{ backgroundColor: `${accentColor}33` }}
          >
            <TrophyIcon className="h-4 w-4" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500">
            Recognition · {String(number).padStart(2, "0")}
          </span>
        </div>

        <h3 className="aw-display break-words text-lg font-semibold leading-snug tracking-[-0.02em] sm:text-xl">
          {award.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {award.organization}
        </p>

        {award.description && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {award.description}
          </p>
        )}

        <button
          type="button"
          onClick={onOpen}
          className={`mt-auto flex w-full items-center justify-between pt-5 text-left text-sm font-semibold ${focusRing}`}
        >
          <span>View award</span>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-950 transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ backgroundColor: accentColor }}
          >
            <ChevronRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </article>
  );
}

/* ---------------- Main Awards Section ---------------- */

export default function AwardsSection({
  id,
  fullPage = false,
  heading = "Awards & Recognition",
  description = "A collection of milestones, achievements, and recognition earned throughout my professional journey.",
  badgeLabel = "Milestones & recognition",
  pageSize = PREVIEW_COUNT,
  awards = awardsData,
  accentColor = "#B7F36B",
  className = "",
  showAll,
  viewAllHref = "/awards",
}: AwardsSectionProps) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => {
    setActive(null);
  }, []);

  const list = Array.isArray(awards) ? awards : [];
  const shouldShowAll = showAll ?? fullPage;

  const safePageSize = Number.isFinite(pageSize)
    ? Math.max(0, Math.floor(pageSize))
    : PREVIEW_COUNT;

  const visibleAwards = shouldShowAll ? list : list.slice(0, safePageSize);

  const featured = !fullPage && !shouldShowAll ? visibleAwards[0] : undefined;

  const offset = featured ? 1 : 0;
  const rest = visibleAwards.slice(offset);

  const featuredSpan =
    visibleAwards.length === 1
      ? "md:col-span-2 lg:col-span-3"
      : "md:row-span-2 lg:col-span-2";

  return (
    <section
      id={id}
      style={{ "--accent": accentColor } as CSSProperties}
      className={`aw-body relative isolate w-full overflow-hidden bg-white px-4 py-14 text-slate-950 sm:px-8 sm:py-20 lg:px-10 lg:py-24 dark:bg-[#0b0d12] dark:text-white ${className}`}
    >
      <style>{FONT_CSS}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[min(900px,100%)] -translate-x-1/2 rounded-full opacity-[0.12] blur-[110px] dark:opacity-[0.09]"
        style={{ background: accentColor }}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-10 lg:gap-12">
        <header className="flex flex-col gap-6 border-b border-slate-200 pb-8 dark:border-white/10 md:flex-row md:items-end md:justify-between md:pb-10">
          <div className="min-w-0 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] dark:border-white/10 sm:mb-5 sm:px-3.5 sm:py-2 sm:text-xs">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span>{badgeLabel}</span>
            </div>

            <h2 className="aw-display break-words text-[clamp(2rem,7vw,4.5rem)] font-semibold leading-[1.06] tracking-[-0.05em]">
              {heading}
              <span style={{ color: accentColor }}>.</span>
            </h2>
          </div>

          <div className="max-w-md md:max-w-sm md:pb-1">
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-7 lg:text-lg">
              {description}
            </p>

            <div className="mt-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] sm:mt-5">
              <span
                className="h-px w-8"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-slate-500">
                {list.length}{" "}
                {list.length === 1 ? "recognition" : "recognitions"}
              </span>
            </div>
          </div>
        </header>

        {visibleAwards.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-[#12151d] sm:p-14">
            <span
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-slate-900"
              style={{ backgroundColor: `${accentColor}33` }}
            >
              <TrophyIcon className="h-7 w-7" />
            </span>

            <h3 className="aw-display mt-5 text-xl font-semibold sm:text-2xl">
              No awards to display
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
              Add award entries to awardsData.ts to showcase your achievements.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured && (
              <article
                className={`group relative min-h-[22rem] overflow-hidden rounded-3xl border border-slate-200 bg-[#10131a] text-white shadow-xl shadow-slate-900/10 dark:border-white/10 dark:shadow-none sm:min-h-[28rem] sm:rounded-[28px] md:min-h-[32rem] ${featuredSpan}`}
              >
                <Media
                  award={featured}
                  onOpen={() => setActive(0)}
                  className="absolute inset-0 h-full w-full"
                  placeholderClass="bg-[#171b23] text-slate-400"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5 sm:gap-4 sm:p-8 lg:p-9">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-950 sm:text-xs"
                      style={{ backgroundColor: accentColor }}
                    >
                      <TrophyIcon className="h-4 w-4" />
                      Featured award
                    </span>

                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md">
                      {featured.year}
                    </span>
                  </div>

                  <div className="max-w-2xl">
                    <h3 className="aw-display break-words text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
                      {featured.title}
                    </h3>

                    <p className="mt-2 text-sm text-white/70 sm:mt-3 sm:text-lg">
                      {featured.organization}
                    </p>

                    {featured.description && (
                      <p className="mt-2 line-clamp-3 max-w-xl text-sm leading-6 text-white/60 sm:mt-3">
                        {featured.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-white/15 pt-4">
                    <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/55 sm:text-xs">
                      Recognition · 01
                    </span>

                    <button
                      type="button"
                      onClick={() => setActive(0)}
                      className={`pointer-events-auto flex items-center gap-2 text-sm font-semibold ${focusRing}`}
                    >
                      View award
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-950 transition-transform duration-300 group-hover:translate-x-1"
                        style={{ backgroundColor: accentColor }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            )}

            {rest.map((award, index) => (
              <AwardCard
                key={award.id}
                award={award}
                number={offset + index + 1}
                accentColor={accentColor}
                onOpen={() => setActive(offset + index)}
              />
            ))}
          </div>
        )}

        {list.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Every milestone represents a step forward.
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                Keep learning. Keep building.
              </p>
            </div>

            {!shouldShowAll && list.length > visibleAwards.length && (
              <Link
                to={viewAllHref}
                aria-label={`View all ${list.length} awards`}
                className={`group inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full border px-6 py-3 text-sm font-semibold shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:self-auto ${focusRing}`}
                style={{
                  borderColor: `${accentColor}80`,
                  backgroundImage: `linear-gradient(135deg, ${accentColor}20, #7c3aed12)`,
                }}
              >
                <span>View All Awards</span>
                <span
                  className="flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-bold text-slate-950"
                  style={{ backgroundColor: accentColor }}
                >
                  {list.length}
                </span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        )}
      </div>

      {active !== null && visibleAwards[active] && (
        <Lightbox
          awards={visibleAwards}
          index={active}
          onChange={setActive}
          onClose={close}
        />
      )}
    </section>
  );
}
