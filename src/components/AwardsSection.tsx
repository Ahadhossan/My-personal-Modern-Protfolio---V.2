import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type AwardItem = {
  id: string;
  year: string;
  title: string;
  organization: string;
  image?: {
    src: string;
    alt: string;
  };
  description?: string;
};

type Theme = "light" | "dark";

type AwardsSectionProps = {
  heading?: string;
  description?: string;
  awards?: AwardItem[];
  accentColor?: string;
  theme?: Theme;
  className?: string;
};

const THEMES = {
  light: {
    section: "bg-[#f6f7fb] text-slate-950",
    muted: "text-slate-600",
    card: "border-slate-200/80 bg-white",
    media: "bg-slate-100 text-slate-500",
    tag: "bg-slate-100 text-slate-700",
    badge: "border-slate-200 bg-white text-slate-800",
    subtle: "text-slate-500",
  },
  dark: {
    section: "bg-[#0b0d12] text-white",
    muted: "text-slate-400",
    card: "border-white/10 bg-[#12151d]",
    media: "bg-white/[0.04] text-slate-500",
    tag: "bg-white/[0.08] text-slate-200",
    badge: "border-white/10 bg-white/[0.06] text-slate-100",
    subtle: "text-slate-500",
  },
} as const;

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
.aw-body { font-family: 'DM Sans', sans-serif; }
.aw-display { font-family: 'Space Grotesk', sans-serif; }
.aw-fade { animation: aw-fade .2s ease-out; }
.aw-pop { animation: aw-pop .24s ease-out; }
.aw-shine { position: relative; isolation: isolate; }
.aw-shine::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
  background: linear-gradient(135deg, var(--accent), transparent 38%, rgba(139,92,246,.3));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; opacity: .65;
}
@keyframes aw-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes aw-pop { from { opacity: 0; transform: scale(.97) } to { opacity: 1; transform: scale(1) } }
@media (prefers-reduced-motion: reduce) {
  .aw-fade, .aw-pop { animation: none !important; }
  .aw-body *, .aw-body *::before, .aw-body *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
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

function Media({
  award,
  onOpen,
  className,
  placeholderClass,
}: {
  award: AwardItem;
  onOpen: () => void;
  className: string;
  placeholderClass: string;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${award.title} image larger`}
      className={`group/media relative block cursor-zoom-in overflow-hidden text-left ${className} ${focusRing}`}
    >
      {award.image ? (
        <img
          src={award.image.src}
          alt={award.image.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover/media:scale-[1.04] motion-reduce:transition-none"
        />
      ) : (
        <span
          className={`flex h-full w-full flex-col items-center justify-center gap-3 ${placeholderClass}`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-current/10 bg-black/[0.025]">
            <ImageIcon className="h-7 w-7" />
          </span>
          <span className="text-xs font-medium tracking-wide">AWARD IMAGE</span>
        </span>
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-70 transition-opacity group-hover/media:opacity-100" />
      <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover/media:opacity-100 group-focus-visible/media:opacity-100">
        <ExpandIcon className="h-4 w-4" />
      </span>
    </button>
  );
}

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

  const go = useCallback(
    (step: number) => onChange((index + step + total) % total),
    [index, total, onChange],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && total > 1) go(-1);
      if (event.key === "ArrowRight" && total > 1) go(1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [go, onClose, total]);

  const navButton =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${award.title} award image`}
      onClick={onClose}
      className="aw-fade aw-body fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-[#050609]/90 p-4 backdrop-blur-xl sm:p-8"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="aw-pop flex w-full max-w-5xl cursor-default flex-col gap-5 text-white"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="aw-display truncate text-lg font-semibold sm:text-2xl">
              {award.title}
            </p>
            <p className="mt-1 truncate text-sm text-white/60">
              {award.organization} <span aria-hidden="true">·</span>{" "}
              {award.year}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-sm tabular-nums text-white/60">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close award image"
              autoFocus
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-950 transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          {total > 1 && (
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous award"
              className={navButton}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div className="flex aspect-[4/3] min-w-0 flex-1 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:aspect-[16/10] sm:rounded-3xl">
            {award.image ? (
              <img
                key={award.id}
                src={award.image.src}
                alt={award.image.alt}
                className="aw-fade h-full w-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-white/40">
                <ImageIcon className="h-12 w-12" />
                <span className="text-sm">No image added yet</span>
              </div>
            )}
          </div>

          {total > 1 && (
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next award"
              className={navButton}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {award.description && (
          <p className="mx-auto max-w-2xl text-center text-sm leading-6 text-white/65">
            {award.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function AwardsSection({
  heading = "Awards & Recognition",
  description = "A collection of milestones, achievements, and recognition earned throughout my professional journey.",
  awards = [],
  accentColor = "#B7F36B",
  theme = "dark",
  className = "",
}: AwardsSectionProps) {
  const t = THEMES[theme];
  const list = Array.isArray(awards) ? awards : [];
  const featured = list[0];
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section
      style={{ "--accent": accentColor } as CSSProperties}
      className={`aw-body relative isolate w-full overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28 ${t.section} ${className}`}
    >
      <style>{FONT_CSS}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[min(900px,100%)] -translate-x-1/2 rounded-full opacity-[0.09] blur-[110px]"
        style={{ background: accentColor }}
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:gap-14">
        <header className="flex flex-col gap-6 border-b border-current/10 pb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-10">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-current/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              <span>Milestones & recognition</span>
            </div>

            <h2 className="aw-display text-4xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              {heading}
              <span style={{ color: accentColor }}>.</span>
            </h2>
          </div>

          <div className="max-w-sm sm:pb-1">
            <p className={`text-base leading-7 sm:text-lg ${t.muted}`}>
              {description}
            </p>
            <div className="mt-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em]">
              <span
                className="h-px w-8"
                style={{ backgroundColor: accentColor }}
              />
              <span className={t.subtle}>
                {list.length}{" "}
                {list.length === 1 ? "recognition" : "recognitions"}
              </span>
            </div>
          </div>
        </header>

        {list.length === 0 ? (
          <div
            className={`aw-shine rounded-3xl border p-10 text-center sm:p-16 ${t.card}`}
          >
            <span
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: `${accentColor}18`,
                color: accentColor,
              }}
            >
              <TrophyIcon className="h-8 w-8" />
            </span>
            <h3 className="aw-display mt-6 text-2xl font-semibold">
              Your achievements go here
            </h3>
            <p className={`mx-auto mt-3 max-w-md text-sm leading-6 ${t.muted}`}>
              Add your awards to the awards prop to showcase your milestones and
              recognition.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured && (
              <article className="aw-shine group relative min-h-[450px] overflow-hidden rounded-[28px] border border-white/10 bg-[#10131a] text-white shadow-2xl shadow-black/10 md:row-span-2 md:min-h-[610px] lg:col-span-2">
                <Media
                  award={featured}
                  onOpen={() => setActive(0)}
                  className="absolute inset-0 h-full w-full"
                  placeholderClass="bg-[#171b23] text-slate-400"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-9">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-950"
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
                    <h3 className="aw-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-base text-white/70 sm:text-lg">
                      {featured.organization}
                    </p>
                    {featured.description && (
                      <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                        {featured.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/55">
                      Recognition · 01
                    </span>
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      View certificate
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-slate-950 transition-transform duration-300 group-hover:translate-x-1"
                        style={{ backgroundColor: accentColor }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    </span>
                  </div>
                </div>
              </article>
            )}

            {list.slice(1).map((award, index) => (
              <article
                key={award.id}
                className={`aw-shine group flex min-h-[300px] flex-col overflow-hidden rounded-[28px] border p-3.5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 motion-reduce:transform-none motion-reduce:transition-none ${t.card}`}
              >
                <div className="relative">
                  <Media
                    award={award}
                    onOpen={() => setActive(index + 1)}
                    className="h-[175px] w-full rounded-[20px]"
                    placeholderClass={t.media}
                  />
                  <span
                    className="absolute left-3 top-3 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-wide backdrop-blur-md"
                    style={{
                      borderColor: `${accentColor}50`,
                      backgroundColor:
                        theme === "dark" ? "#10131acc" : "#ffffffdd",
                      color: theme === "dark" ? "#fff" : "#111827",
                    }}
                  >
                    {award.year}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${accentColor}18`,
                        color: accentColor,
                      }}
                    >
                      <TrophyIcon className="h-4 w-4" />
                    </span>
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-[0.15em] ${t.subtle}`}
                    >
                      Recognition · {String(index + 2).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="aw-display text-xl font-semibold leading-snug tracking-[-0.025em]">
                    {award.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-6 ${t.muted}`}>
                    {award.organization}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActive(index + 1)}
                    className={`mt-auto flex w-full items-center justify-between pt-5 text-left text-sm font-semibold ${focusRing}`}
                  >
                    <span>View award</span>
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-current/10 transition group-hover:border-transparent"
                      style={{ color: accentColor }}
                    >
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {list.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-current/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className={`text-sm ${t.muted}`}>
              Every milestone represents a step forward.
            </p>
            <p
              className={`text-xs font-medium uppercase tracking-[0.16em] ${t.subtle}`}
            >
              Keep learning. Keep building.
            </p>
          </div>
        )}
      </div>

      {active !== null && list[active] && (
        <Lightbox
          awards={list}
          index={active}
          onChange={setActive}
          onClose={close}
        />
      )}
    </section>
  );
}

/*
Usage:

<AwardsSection
  heading="Awards & Recognition"
  description="Celebrating milestones, meaningful contributions, and professional growth."
  theme="dark"
  accentColor="#B7F36B"
  awards={[
    {
      id: "a1",
      year: "2025",
      title: "Outstanding Contributor",
      organization: "Company or organization",
      image: { src: "/awards/outstanding-contributor.jpg", alt: "Outstanding Contributor certificate" },
      description: "Recognized for contributions to the team and product.",
    },
    {
      id: "a2",
      year: "2024",
      title: "Frontend Development Challenge",
      organization: "Event or organization",
      image: { src: "/awards/frontend-challenge.jpg", alt: "Frontend Development Challenge award" },
    },
    {
      id: "a3",
      year: "2023",
      title: "Project Excellence",
      organization: "Company or organization",
    },
  ]}
/>

Place award images in your public/awards folder, then reference them with /awards/filename.jpg.
*/
