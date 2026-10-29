// // // import {
// // //   useCallback,
// // //   useEffect,
// // //   useId,
// // //   useMemo,
// // //   useRef,
// // //   useState,
// // //   type CSSProperties,
// // //   type PointerEvent as ReactPointerEvent,
// // // } from "react";
// // // import { createPortal } from "react-dom";
// // // import {
// // //   ArrowRight as ArrowRightIcon,
// // //   Award as AwardIcon,
// // //   Calendar as CalendarIcon,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   ExternalLink as ExternalIcon,
// // //   Eye as EyeIcon,
// // //   Image as ImageIcon,
// // //   Maximize2 as ExpandIcon,
// // //   Search as SearchIcon,
// // //   X as CloseIcon,
// // // } from "lucide-react";
// // // import {
// // //   certificates as defaultCertificates,
// // //   type CertificateItem,
// // // } from "../../Data/Certificates";

// // // export type { CertificateItem };

// // // /* -------------------------------------------------------------------------- */
// // // /*  Types                                                                      */
// // // /* -------------------------------------------------------------------------- */

// // // type Theme = "light" | "dark";

// // // type Stat = {
// // //   label: string;
// // //   value: number;
// // //   suffix?: string;
// // //   pad?: boolean; // 8 -> "08"
// // // };

// // // type CertificatesSectionProps = {
// // //   id?: string;
// // //   heading?: string;
// // //   tagline?: string; // use \n for a line break
// // //   description?: string;
// // //   badgeLabel?: string;
// // //   recipientName?: string; // printed on generated certificate previews
// // //   certificates?: CertificateItem[];
// // //   stats?: Stat[]; // optional override of the 3 left-side stats
// // //   pageSize?: number;
// // //   accentColor?: string; // 6-digit hex, e.g. "#4f8bff"
// // //   theme?: Theme | "auto"; // "auto" (default) follows your site light/dark mode
// // //   className?: string;
// // // };

// // // const EMPTY: CertificateItem[] = [];

// // // /* -------------------------------------------------------------------------- */
// // // /*  Theme tokens                                                               */
// // // /* -------------------------------------------------------------------------- */

// // // const THEMES = {
// // //   dark: {
// // //     section: "bg-black text-white",
// // //     muted: "text-slate-400",
// // //     subtle: "text-slate-500",
// // //     card: "border-white/10 bg-white/[0.035]",
// // //     input:
// // //       "border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500",
// // //     pill: "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:text-white",
// // //     ghost: "bg-white/[0.07] text-white hover:bg-white/[0.13]",
// // //     divide: "divide-white/10",
// // //     preview: "border-white/10 shadow-black/40",
// // //     pageBtn:
// // //       "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/10 hover:text-white",
// // //     headingGrad: "from-white via-[#a5b4fc] to-white",
// // //     gridLine: "rgba(255,255,255,0.045)",
// // //     glow: 0.3,
// // //     iconHover: "hover:bg-white/10",
// // //   },
// // //   light: {
// // //     section: "bg-white text-slate-900",
// // //     muted: "text-slate-600",
// // //     subtle: "text-slate-500",
// // //     card: "border-slate-200 bg-slate-50/80 shadow-sm shadow-slate-900/[0.03]",
// // //     input:
// // //       "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400",
// // //     pill: "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900",
// // //     ghost: "bg-slate-100 text-slate-800 hover:bg-slate-200",
// // //     divide: "divide-slate-200",
// // //     preview: "border-slate-200 shadow-slate-900/10",
// // //     pageBtn:
// // //       "border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900",
// // //     headingGrad: "from-slate-900 via-indigo-600 to-slate-900",
// // //     gridLine: "rgba(15,23,42,0.06)",
// // //     glow: 0.1,
// // //     iconHover: "hover:bg-slate-200",
// // //   },
// // // } as const;

// // // const TAG_COLORS = [
// // //   "#8b5cf6",
// // //   "#38bdf8",
// // //   "#f59e0b",
// // //   "#34d399",
// // //   "#f472b6",
// // //   "#fb7185",
// // // ];

// // // /* -------------------------------------------------------------------------- */
// // // /*  CSS (fonts + animations)                                                   */
// // // /* -------------------------------------------------------------------------- */

// // // const CSS = `
// // // @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');
// // // .cw-body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
// // // .cw-script { font-family: 'Caveat', cursive; }

// // // /* entrance: hidden until the section scrolls into view */
// // // .cw-pre .cw-r, .cw-pre .cw-card { opacity: 0; }
// // // .cw-inview .cw-r { animation: cw-rise .8s cubic-bezier(.2,.7,.2,1) backwards; animation-delay: var(--d, 0ms); }
// // // .cw-inview .cw-card { animation: cw-rise .7s cubic-bezier(.2,.7,.2,1) backwards; animation-delay: calc(var(--i, 0) * 80ms + 120ms); }
// // // @keyframes cw-rise { from { opacity: 0; transform: translateY(28px) scale(.98); } to { opacity: 1; transform: none; } }

// // // .cw-shimmer { background-size: 200% 100%; background-repeat: repeat-x; animation: cw-shimmer 7s linear infinite; }
// // // @keyframes cw-shimmer { to { background-position: 200% 0; } }

// // // .cw-drift { animation: cw-drift 18s ease-in-out infinite; }
// // // @keyframes cw-drift { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(40px,30px,0); } }

// // // .cw-nudge { animation: cw-nudge 1.8s ease-in-out infinite; }
// // // @keyframes cw-nudge { 0%,100% { transform: translateX(0); } 50% { transform: translateX(6px); } }

// // // /* hero illustration */
// // // .cw-float { animation: cw-float 6s ease-in-out infinite; }
// // // @keyframes cw-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
// // // .cw-dash { animation: cw-dash 7s linear infinite; }
// // // @keyframes cw-dash { to { stroke-dashoffset: -440; } }
// // // .cw-pulse { animation: cw-pulse 3.5s ease-in-out infinite; }
// // // @keyframes cw-pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
// // // .cw-twinkle { transform-box: fill-box; transform-origin: center; animation: cw-twinkle 3s ease-in-out infinite; }
// // // @keyframes cw-twinkle { 0%,100% { opacity: .2; transform: scale(.6); } 50% { opacity: 1; transform: scale(1.1); } }

// // // /* gradient border on cards */
// // // .cw-border { position: relative; isolation: isolate; }
// // // .cw-border::before {
// // //   content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
// // //   background: linear-gradient(135deg, var(--accent), transparent 40%, rgba(139,92,246,.55));
// // //   -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
// // //   -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
// // //   opacity: .28; transition: opacity .4s ease;
// // // }
// // // .cw-card:hover .cw-border::before { opacity: 1; }

// // // .cw-search:focus-within { border-color: var(--accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent); }
// // // .cw-verify { transition: background .25s ease, box-shadow .25s ease, transform .25s ease; }
// // // .cw-verify:hover { background: color-mix(in srgb, var(--accent) 14%, transparent); box-shadow: 0 8px 24px -12px var(--accent); }

// // // .cw-fade { animation: cw-fade .2s ease-out; }
// // // .cw-pop { animation: cw-pop .26s ease-out; }
// // // @keyframes cw-fade { from { opacity: 0 } to { opacity: 1 } }
// // // @keyframes cw-pop { from { opacity: 0; transform: scale(.97) } to { opacity: 1; transform: scale(1) } }

// // // /* card buttons adapt to the card width (container queries) */
// // // .cw-actions { container-type: inline-size; }
// // // .cw-btnrow { display: flex; gap: .5rem; }
// // // .cw-b-main { flex: 1 1 auto; min-width: 0; }
// // // .cw-long, .cw-vtxt { display: none; }
// // // .cw-b-alt {
// // //   flex: 0 0 auto; display: flex; align-items: center; justify-content: center; gap: .4rem;
// // //   width: 2.25rem; height: 2.25rem; border-radius: 9999px; border: 1px solid;
// // //   font-size: .75rem; font-weight: 600; white-space: nowrap;
// // // }
// // // @container (min-width: 170px) { .cw-b-alt { width: auto; padding: 0 .9rem; } .cw-vtxt { display: inline; } }
// // // @container (min-width: 270px) { .cw-short { display: none; } .cw-long { display: inline; } }
// // // @media (min-width: 640px) { .cw-b-alt { height: 2.5rem; font-size: .875rem; } }

// // // @media (prefers-reduced-motion: reduce) {
// // //   .cw-pre .cw-r, .cw-pre .cw-card { opacity: 1; }
// // //   .cw-inview .cw-r, .cw-inview .cw-card, .cw-shimmer, .cw-drift, .cw-nudge,
// // //   .cw-float, .cw-dash, .cw-pulse, .cw-twinkle, .cw-fade, .cw-pop { animation: none !important; }
// // //   .cw-body *, .cw-body *::before, .cw-body *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
// // // }
// // // `;

// // // /* -------------------------------------------------------------------------- */
// // // /*  Helpers & hooks                                                            */
// // // /* -------------------------------------------------------------------------- */

// // // const hueOf = (s: string) => {
// // //   let h = 0;
// // //   for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;
// // //   return h;
// // // };

// // // const tagColor = (s: string) => TAG_COLORS[hueOf(s) % TAG_COLORS.length];

// // // function pageWindow(current: number, total: number): (number | "gap")[] {
// // //   if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
// // //   const nums = Array.from(
// // //     new Set([1, total, current - 1, current, current + 1]),
// // //   )
// // //     .filter((n) => n >= 1 && n <= total)
// // //     .sort((a, b) => a - b);
// // //   const out: (number | "gap")[] = [];
// // //   nums.forEach((n, i) => {
// // //     if (i > 0 && n - nums[i - 1] > 1) out.push("gap");
// // //     out.push(n);
// // //   });
// // //   return out;
// // // }

// // // function readSiteTheme(): Theme {
// // //   const root = document.documentElement;
// // //   const body = document.body;

// // //   // 1) explicit markers: class="dark" / data-theme="dark" (next-themes, Tailwind, etc.)
// // //   for (const el of [root, body]) {
// // //     const attr = (
// // //       el.getAttribute("data-theme") ||
// // //       el.getAttribute("data-mode") ||
// // //       el.getAttribute("data-color-scheme") ||
// // //       ""
// // //     ).toLowerCase();
// // //     if (el.classList.contains("dark") || attr === "dark") return "dark";
// // //     if (el.classList.contains("light") || attr === "light") return "light";
// // //   }

// // //   // 2) color-scheme set on <html>
// // //   const cs = root.style.colorScheme;
// // //   if (cs === "dark" || cs === "light") return cs;

// // //   // 3) how dark the page background really is
// // //   for (const el of [body, root]) {
// // //     const m = getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/);
// // //     if (m) {
// // //       const [r, g, b, a = "1"] = m[1].split(/[ ,/]+/).filter(Boolean);
// // //       if (parseFloat(a) > 0.5) {
// // //         const lum = (0.299 * +r + 0.587 * +g + 0.114 * +b) / 255;
// // //         return lum < 0.5 ? "dark" : "light";
// // //       }
// // //     }
// // //   }

// // //   // 4) operating system preference
// // //   return window.matchMedia("(prefers-color-scheme: dark)").matches
// // //     ? "dark"
// // //     : "light";
// // // }

// // // function useSiteTheme(enabled: boolean): Theme {
// // //   const [mode, setMode] = useState<Theme>("light");
// // //   useEffect(() => {
// // //     if (!enabled) return;
// // //     let timer = 0;
// // //     const update = () => setMode(readSiteTheme());
// // //     const schedule = () => {
// // //       update();
// // //       window.clearTimeout(timer);
// // //       timer = window.setTimeout(update, 400); // re-check after CSS transitions
// // //     };
// // //     update();
// // //     const mo = new MutationObserver(schedule);
// // //     const opts = {
// // //       attributes: true,
// // //       attributeFilter: [
// // //         "class",
// // //         "data-theme",
// // //         "data-mode",
// // //         "data-color-scheme",
// // //         "style",
// // //       ],
// // //     };
// // //     mo.observe(document.documentElement, opts);
// // //     mo.observe(document.body, opts);
// // //     const mq = window.matchMedia("(prefers-color-scheme: dark)");
// // //     mq.addEventListener("change", schedule);
// // //     return () => {
// // //       mo.disconnect();
// // //       mq.removeEventListener("change", schedule);
// // //       window.clearTimeout(timer);
// // //     };
// // //   }, [enabled]);
// // //   return mode;
// // // }

// // // function usePrefersReducedMotion() {
// // //   const [reduced, setReduced] = useState(false);
// // //   useEffect(() => {
// // //     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
// // //     setReduced(mq.matches);
// // //     const onChange = () => setReduced(mq.matches);
// // //     mq.addEventListener("change", onChange);
// // //     return () => mq.removeEventListener("change", onChange);
// // //   }, []);
// // //   return reduced;
// // // }

// // // function useInView<T extends Element>(threshold = 0.08) {
// // //   const ref = useRef<T | null>(null);
// // //   const [seen, setSeen] = useState(false);
// // //   useEffect(() => {
// // //     const el = ref.current;
// // //     if (!el) return;
// // //     if (typeof IntersectionObserver === "undefined") {
// // //       setSeen(true);
// // //       return;
// // //     }
// // //     const io = new IntersectionObserver(
// // //       ([entry]) => {
// // //         if (entry.isIntersecting) {
// // //           setSeen(true);
// // //           io.disconnect();
// // //         }
// // //       },
// // //       { threshold },
// // //     );
// // //     io.observe(el);
// // //     return () => io.disconnect();
// // //   }, [threshold]);
// // //   return [ref, seen] as const;
// // // }

// // // function useCountUp(
// // //   target: number,
// // //   run: boolean,
// // //   reduced: boolean,
// // //   duration = 1300,
// // // ) {
// // //   const [value, setValue] = useState(0);
// // //   useEffect(() => {
// // //     if (!run) return;
// // //     if (reduced) {
// // //       setValue(target);
// // //       return;
// // //     }
// // //     let raf = 0;
// // //     const t0 = performance.now();
// // //     const tick = (now: number) => {
// // //       const p = Math.min(1, (now - t0) / duration);
// // //       setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
// // //       if (p < 1) raf = requestAnimationFrame(tick);
// // //     };
// // //     raf = requestAnimationFrame(tick);
// // //     return () => cancelAnimationFrame(raf);
// // //   }, [target, run, reduced, duration]);
// // //   return value;
// // // }

// // // /* -------------------------------------------------------------------------- */
// // // /*  Generated certificate preview (used when no image is supplied)             */
// // // /* -------------------------------------------------------------------------- */

// // // function CertificateMock({
// // //   cert,
// // //   recipient,
// // // }: {
// // //   cert: CertificateItem;
// // //   recipient: string;
// // // }) {
// // //   const h = hueOf(cert.issuer);
// // //   const c1 = `hsl(${h} 78% 46%)`;
// // //   const c2 = `hsl(${(h + 40) % 360} 85% 62%)`;

// // //   const abs = (style: CSSProperties): CSSProperties => ({
// // //     position: "absolute",
// // //     ...style,
// // //   });

// // //   return (
// // //     <div
// // //       aria-hidden="true"
// // //       className="absolute inset-0 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-800"
// // //       style={{ containerType: "inline-size" }}
// // //     >
// // //       <div
// // //         style={abs({
// // //           right: "-10cqw",
// // //           top: "-10cqw",
// // //           width: "30cqw",
// // //           height: "30cqw",
// // //           transform: "rotate(45deg)",
// // //           background: `linear-gradient(135deg, ${c2}, ${c1})`,
// // //         })}
// // //       />
// // //       <div
// // //         style={abs({
// // //           left: 0,
// // //           bottom: 0,
// // //           width: "100%",
// // //           height: "1.6cqw",
// // //           background: `linear-gradient(90deg, ${c1}, ${c2}, transparent)`,
// // //         })}
// // //       />

// // //       <div
// // //         style={abs({
// // //           left: "7cqw",
// // //           top: "7cqw",
// // //           maxWidth: "60cqw",
// // //           fontSize: "6.4cqw",
// // //           fontWeight: 800,
// // //           letterSpacing: "-0.02em",
// // //           color: c1,
// // //           whiteSpace: "nowrap",
// // //           overflow: "hidden",
// // //           textOverflow: "ellipsis",
// // //         })}
// // //       >
// // //         {cert.issuer}
// // //       </div>

// // //       <div
// // //         style={abs({
// // //           left: "7cqw",
// // //           top: "17cqw",
// // //           fontSize: "3.1cqw",
// // //           fontWeight: 600,
// // //           color: c1,
// // //         })}
// // //       >
// // //         Certificate of Completion
// // //       </div>

// // //       <div
// // //         style={abs({
// // //           left: "7cqw",
// // //           top: "24cqw",
// // //           width: "62cqw",
// // //           fontSize: "5cqw",
// // //           fontWeight: 700,
// // //           lineHeight: 1.2,
// // //           color: "#0f172a",
// // //           display: "-webkit-box",
// // //           WebkitBoxOrient: "vertical",
// // //           WebkitLineClamp: 2,
// // //           overflow: "hidden",
// // //         })}
// // //       >
// // //         {cert.title}
// // //       </div>

// // //       <div style={abs({ left: "7cqw", bottom: "13cqw", maxWidth: "52cqw" })}>
// // //         <div style={{ fontSize: "2.4cqw", color: "#64748b" }}>Awarded to</div>
// // //         <div
// // //           style={{
// // //             fontSize: "4.2cqw",
// // //             fontWeight: 700,
// // //             color: "#0f172a",
// // //             whiteSpace: "nowrap",
// // //             overflow: "hidden",
// // //             textOverflow: "ellipsis",
// // //           }}
// // //         >
// // //           {recipient}
// // //         </div>
// // //       </div>

// // //       <div
// // //         style={abs({
// // //           left: "7cqw",
// // //           bottom: "5.5cqw",
// // //           fontSize: "2.5cqw",
// // //           color: "#64748b",
// // //         })}
// // //       >
// // //         Issued: {cert.date}
// // //       </div>

// // //       <div
// // //         style={abs({
// // //           right: "9cqw",
// // //           bottom: "17cqw",
// // //           width: "11cqw",
// // //           height: "11cqw",
// // //           borderRadius: "50%",
// // //           background: `radial-gradient(circle at 30% 30%, ${c2}, ${c1})`,
// // //           boxShadow: `0 1cqw 3cqw -1cqw ${c1}`,
// // //           border: "0.6cqw solid rgba(255,255,255,.85)",
// // //           display: "flex",
// // //           alignItems: "center",
// // //           justifyContent: "center",
// // //         })}
// // //       >
// // //         <svg viewBox="0 0 24 24" style={{ width: "55%", height: "55%" }}>
// // //           <path
// // //             d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z"
// // //             fill="#fff"
// // //           />
// // //         </svg>
// // //       </div>

// // //       <svg
// // //         viewBox="0 0 80 32"
// // //         style={abs({ right: "8cqw", bottom: "5cqw", width: "20cqw" })}
// // //       >
// // //         <path
// // //           d="M2 24c6-16 12-20 14-10 1 6-6 12-2 11 7-2 10-14 17-12 5 2-2 11 3 10 5-1 8-6 13-5 3 1 2 5 6 4 4-1 8-3 10-3"
// // //           fill="none"
// // //           stroke="#334155"
// // //           strokeWidth="1.6"
// // //           strokeLinecap="round"
// // //         />
// // //       </svg>
// // //     </div>
// // //   );
// // // }

// // // /* -------------------------------------------------------------------------- */
// // // /*  Hero illustration (floating 3D-style certificate on a glowing platform)    */
// // // /* -------------------------------------------------------------------------- */

// // // function HeroCertificate({ accent, mode }: { accent: string; mode: Theme }) {
// // //   const light = mode === "light";
// // //   const topA = light ? "#eef2ff" : "#16246b";
// // //   const topB = light ? "#c7d2fe" : "#0a1236";
// // //   const baseFill = light ? "#a5b4fc" : "#060a22";
// // //   const sideFill = light ? "#b9c4fb" : "#0a1236";
// // //   const sparkFill = light ? "#818cf8" : "#cdd9ff";
// // //   const uid = useId().replace(/:/g, "");
// // //   const gid = (n: string) => `${n}-${uid}`;
// // //   const ref = (n: string) => `url(#${gid(n)})`;

// // //   const sparkle = (x: number, y: number, s: number, d: number) => (
// // //     <path
// // //       key={`${x}-${y}`}
// // //       className="cw-twinkle"
// // //       style={{ animationDelay: `${d}s` }}
// // //       transform={`translate(${x} ${y}) scale(${s})`}
// // //       d="M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8Z"
// // //       fill={sparkFill}
// // //     />
// // //   );

// // //   return (
// // //     <div
// // //       aria-hidden="true"
// // //       className="relative mx-auto aspect-[420/360] w-full max-w-[340px] sm:max-w-[420px]"
// // //     >
// // //       <svg viewBox="0 0 420 360" className="h-full w-full overflow-visible">
// // //         <defs>
// // //           <linearGradient id={gid("ring")} x1="0" y1="0" x2="1" y2="0">
// // //             <stop offset="0" stopColor={accent} />
// // //             <stop offset="0.55" stopColor="#8b5cf6" />
// // //             <stop offset="1" stopColor="#22d3ee" />
// // //           </linearGradient>
// // //           <linearGradient id={gid("card")} x1="0" y1="0" x2="1" y2="1">
// // //             <stop offset="0" stopColor="#2a46a8" />
// // //             <stop offset="1" stopColor="#0d1740" />
// // //           </linearGradient>
// // //           <linearGradient id={gid("top")} x1="0" y1="0" x2="0" y2="1">
// // //             <stop offset="0" stopColor={topA} />
// // //             <stop offset="1" stopColor={topB} />
// // //           </linearGradient>
// // //           <linearGradient id={gid("gold")} x1="0" y1="0" x2="1" y2="1">
// // //             <stop offset="0" stopColor="#ffd896" />
// // //             <stop offset="1" stopColor="#d9822b" />
// // //           </linearGradient>
// // //           <radialGradient id={gid("glow")} cx=".5" cy=".5" r=".5">
// // //             <stop
// // //               offset="0"
// // //               stopColor={accent}
// // //               stopOpacity={light ? ".28" : ".5"}
// // //             />
// // //             <stop offset="1" stopColor={accent} stopOpacity="0" />
// // //           </radialGradient>
// // //           <filter id={gid("blur")} x="-20%" y="-60%" width="140%" height="220%">
// // //             <feGaussianBlur stdDeviation="7" />
// // //           </filter>
// // //         </defs>

// // //         <ellipse cx="210" cy="305" rx="210" ry="62" fill={ref("glow")} />

// // //         {/* platform */}
// // //         <ellipse cx="210" cy="318" rx="170" ry="44" fill={baseFill} />
// // //         <rect x="40" y="296" width="340" height="22" fill={sideFill} />
// // //         <ellipse cx="210" cy="296" rx="170" ry="44" fill={ref("top")} />
// // //         <ellipse
// // //           className="cw-pulse"
// // //           cx="210"
// // //           cy="296"
// // //           rx="170"
// // //           ry="44"
// // //           fill="none"
// // //           stroke={ref("ring")}
// // //           strokeWidth="5"
// // //           filter={`url(#${gid("blur")})`}
// // //         />
// // //         <ellipse
// // //           cx="210"
// // //           cy="296"
// // //           rx="170"
// // //           ry="44"
// // //           fill="none"
// // //           stroke={ref("ring")}
// // //           strokeWidth="2.5"
// // //         />
// // //         <ellipse
// // //           cx="210"
// // //           cy="296"
// // //           rx="128"
// // //           ry="31"
// // //           fill="none"
// // //           stroke={ref("ring")}
// // //           strokeWidth="1.5"
// // //           strokeOpacity=".5"
// // //         />

// // //         {/* flowing orbit */}
// // //         <ellipse
// // //           className="cw-dash"
// // //           cx="210"
// // //           cy="205"
// // //           rx="190"
// // //           ry="54"
// // //           transform="rotate(-14 210 205)"
// // //           fill="none"
// // //           stroke={ref("ring")}
// // //           strokeWidth="2.5"
// // //           strokeLinecap="round"
// // //           strokeDasharray="120 40 20 40"
// // //         />

// // //         {/* floating certificate */}
// // //         <g className="cw-float">
// // //           <g transform="translate(210 185) rotate(-9)">
// // //             <rect
// // //               x="-125"
// // //               y="-85"
// // //               width="250"
// // //               height="170"
// // //               rx="18"
// // //               fill={ref("card")}
// // //               stroke={ref("ring")}
// // //               strokeWidth="1.5"
// // //             />
// // //             <rect
// // //               x="-113"
// // //               y="-73"
// // //               width="226"
// // //               height="146"
// // //               rx="12"
// // //               fill="none"
// // //               stroke="#6f8cff"
// // //               strokeOpacity=".35"
// // //               strokeDasharray="3 4"
// // //             />
// // //             <text
// // //               x="0"
// // //               y="-22"
// // //               textAnchor="middle"
// // //               fontSize="26"
// // //               fontWeight="800"
// // //               letterSpacing="3"
// // //               fill="#a9bcff"
// // //             >
// // //               CERTIFICATE
// // //             </text>
// // //             <text
// // //               x="0"
// // //               y="-4"
// // //               textAnchor="middle"
// // //               fontSize="10"
// // //               letterSpacing="3"
// // //               fill="#7f97ee"
// // //             >
// // //               OF COMPLETION
// // //             </text>
// // //             <rect
// // //               x="-70"
// // //               y="14"
// // //               width="140"
// // //               height="5"
// // //               rx="2.5"
// // //               fill="#6f8cff"
// // //               opacity=".35"
// // //             />
// // //             <rect
// // //               x="-50"
// // //               y="28"
// // //               width="100"
// // //               height="5"
// // //               rx="2.5"
// // //               fill="#6f8cff"
// // //               opacity=".25"
// // //             />
// // //             <path
// // //               d="M-100 62c10-22 20-26 24-14 3 9-8 20-2 18 10-3 18-22 28-20 8 2-2 14 6 12 8-2 14-10 22-8"
// // //               fill="none"
// // //               stroke="#8fa6ff"
// // //               strokeWidth="2"
// // //               strokeLinecap="round"
// // //             />
// // //             {/* medal */}
// // //             <g transform="translate(82 52)">
// // //               <path d="M-12 14-20 44l12-7 7 10 3-32Z" fill="#7c3aed" />
// // //               <path d="M12 14 20 44l-12-7-7 10-3-32Z" fill="#6d28d9" />
// // //               <circle
// // //                 r="25"
// // //                 fill={ref("gold")}
// // //                 stroke="#ffe2a8"
// // //                 strokeWidth="2"
// // //               />
// // //               <circle r="18" fill="none" stroke="#b85f12" strokeOpacity=".6" />
// // //               <polygon
// // //                 points="0,-10 3,-3.4 10,-3 4.5,1.7 6.2,8.6 0,4.7 -6.2,8.6 -4.5,1.7 -10,-3 -3,-3.4"
// // //                 fill="#4c1d95"
// // //               />
// // //             </g>
// // //           </g>
// // //         </g>

// // //         {sparkle(52, 120, 0.9, 0)}
// // //         {sparkle(372, 92, 1.1, 0.8)}
// // //         {sparkle(338, 238, 0.7, 1.6)}
// // //         {sparkle(86, 224, 0.6, 2.2)}
// // //       </svg>
// // //     </div>
// // //   );
// // // }

// // // /* -------------------------------------------------------------------------- */
// // // /*  Stat                                                                       */
// // // /* -------------------------------------------------------------------------- */

// // // function StatItem({
// // //   stat,
// // //   run,
// // //   reduced,
// // //   accent,
// // //   muted,
// // // }: {
// // //   stat: Stat;
// // //   run: boolean;
// // //   reduced: boolean;
// // //   accent: string;
// // //   muted: string;
// // // }) {
// // //   const v = useCountUp(stat.value, run, reduced);
// // //   const text =
// // //     (stat.pad ? String(v).padStart(2, "0") : String(v)) + (stat.suffix ?? "");
// // //   return (
// // //     <div className="min-w-0 px-4 first:pl-0 sm:px-6">
// // //       <p
// // //         className="bg-clip-text text-2xl font-extrabold tabular-nums text-transparent sm:text-3xl"
// // //         style={{
// // //           backgroundImage: `linear-gradient(90deg, ${accent}, #8b5cf6)`,
// // //         }}
// // //       >
// // //         {text}
// // //       </p>
// // //       <p className={`mt-1 text-xs sm:text-sm ${muted}`}>{stat.label}</p>
// // //     </div>
// // //   );
// // // }

// // // /* -------------------------------------------------------------------------- */
// // // /*  Certificate card                                                           */
// // // /* -------------------------------------------------------------------------- */

// // // type Tokens = (typeof THEMES)[Theme];

// // // function CertCard({
// // //   cert,
// // //   index,
// // //   recipient,
// // //   accent,
// // //   t,
// // //   onOpen,
// // // }: {
// // //   cert: CertificateItem;
// // //   index: number;
// // //   recipient: string;
// // //   accent: string;
// // //   t: Tokens;
// // //   onOpen: () => void;
// // // }) {
// // //   const spotRef = useRef<HTMLSpanElement | null>(null);
// // //   const raf = useRef(0);

// // //   useEffect(() => () => cancelAnimationFrame(raf.current), []);

// // //   const onMove = (e: ReactPointerEvent<HTMLElement>) => {
// // //     if (e.pointerType === "touch") return;
// // //     const spot = spotRef.current;
// // //     if (!spot) return;
// // //     const r = e.currentTarget.getBoundingClientRect();
// // //     const x = e.clientX - r.left;
// // //     const y = e.clientY - r.top;
// // //     cancelAnimationFrame(raf.current);
// // //     raf.current = requestAnimationFrame(() => {
// // //       spot.style.transform = `translate3d(${x - 180}px, ${y - 180}px, 0)`;
// // //     });
// // //   };

// // //   const chip = cert.tag ?? cert.category;
// // //   const chipColor = tagColor(cert.category);

// // //   return (
// // //     <article
// // //       onPointerMove={onMove}
// // //       style={{ "--i": index, "--accent": accent } as CSSProperties}
// // //       className="cw-card group relative isolate min-w-0"
// // //     >
// // //       {/* soft glow that is revealed under the card when it lifts (opacity only = smooth) */}
// // //       <span
// // //         aria-hidden="true"
// // //         className="pointer-events-none absolute inset-x-8 -bottom-3 -z-10 h-12 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
// // //         style={{ backgroundColor: accent }}
// // //       />

// // //       {/* only this inner box moves, so the hover area never shifts under the cursor */}
// // //       <div
// // //         className={`cw-border flex h-full min-w-0 flex-col rounded-2xl border p-2.5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform group-hover:-translate-y-1.5 motion-reduce:transform-none sm:rounded-3xl sm:p-4 ${t.card}`}
// // //       >
// // //         <span
// // //           aria-hidden="true"
// // //           className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
// // //         >
// // //           <span
// // //             ref={spotRef}
// // //             className="absolute left-0 top-0 h-[360px] w-[360px] rounded-full opacity-0 transition-opacity duration-300 will-change-transform group-hover:opacity-100"
// // //             style={{
// // //               background: `radial-gradient(circle, ${accent}30, transparent 65%)`,
// // //             }}
// // //           />
// // //         </span>

// // //         <button
// // //           type="button"
// // //           onClick={onOpen}
// // //           aria-label={`View ${cert.title} certificate`}
// // //           className={`group/media relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-xl border shadow-lg sm:rounded-2xl ${t.preview} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]`}
// // //         >
// // //           {cert.image ? (
// // //             <img
// // //               src={cert.image.src}
// // //               alt={cert.image.alt}
// // //               loading="lazy"
// // //               className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/media:scale-[1.05] motion-reduce:transition-none"
// // //             />
// // //           ) : (
// // //             <div className="absolute inset-0 transition-transform duration-700 group-hover/media:scale-[1.05] motion-reduce:transition-none">
// // //               <CertificateMock cert={cert} recipient={recipient} />
// // //             </div>
// // //           )}

// // //           <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover/media:translate-x-full motion-reduce:hidden" />
// // //           <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/0 transition-colors duration-300 group-hover/media:bg-slate-950/35">
// // //             <span className="flex translate-y-3 items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 text-slate-900 opacity-0 shadow-lg transition-all duration-300 group-hover/media:translate-y-0 group-hover/media:opacity-100">
// // //               <ExpandIcon className="h-3.5 w-3.5" />
// // //               Preview
// // //             </span>
// // //           </span>
// // //         </button>

// // //         <div className="flex min-w-0 flex-1 flex-col pt-3 sm:pt-4">
// // //           <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug sm:text-[17px]">
// // //             {cert.title}
// // //           </h3>
// // //           <p
// // //             className={`mt-0.5 truncate text-xs sm:mt-1 sm:text-sm ${t.muted}`}
// // //           >
// // //             {cert.issuer}
// // //           </p>

// // //           <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 sm:mt-3 sm:gap-x-3 sm:gap-y-2">
// // //             <span
// // //               className={`inline-flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-sm ${t.muted}`}
// // //             >
// // //               <CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
// // //               {cert.date}
// // //             </span>
// // //             {chip && (
// // //               <span
// // //                 className="max-w-full truncate rounded-full border px-2 py-0.5 text-[10px] font-semibold sm:px-2.5 sm:py-1 sm:text-[11px]"
// // //                 style={{
// // //                   color: chipColor,
// // //                   backgroundColor: `${chipColor}1f`,
// // //                   borderColor: `${chipColor}45`,
// // //                 }}
// // //               >
// // //                 {chip}
// // //               </span>
// // //             )}
// // //           </div>

// // //           <div className="cw-actions mt-auto pt-3 sm:pt-5">
// // //             <div className="cw-btnrow">
// // //               <button
// // //                 type="button"
// // //                 onClick={onOpen}
// // //                 className={`cw-b-main flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold transition sm:h-10 sm:gap-2 sm:px-4 sm:text-sm ${t.ghost} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
// // //               >
// // //                 <EyeIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
// // //                 <span className="cw-short">View</span>
// // //                 <span className="cw-long">View Certificate</span>
// // //               </button>
// // //               {cert.credentialUrl && (
// // //                 <a
// // //                   href={cert.credentialUrl}
// // //                   target="_blank"
// // //                   rel="noopener noreferrer"
// // //                   aria-label={`Verify ${cert.title} (opens in a new tab)`}
// // //                   className="cw-verify cw-b-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
// // //                   style={{ color: accent, borderColor: `${accent}70` }}
// // //                 >
// // //                   <span className="cw-vtxt">Verify</span>
// // //                   <ExternalIcon className="h-3.5 w-3.5 shrink-0" />
// // //                 </a>
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </article>
// // //   );
// // // }

// // // /* -------------------------------------------------------------------------- */
// // // /*  Lightbox (rendered in <body> through a portal so the close button works)   */
// // // /* -------------------------------------------------------------------------- */

// // // function Lightbox({
// // //   items,
// // //   index,
// // //   recipient,
// // //   accent,
// // //   onChange,
// // //   onClose,
// // // }: {
// // //   items: CertificateItem[];
// // //   index: number;
// // //   recipient: string;
// // //   accent: string;
// // //   onChange: (next: number) => void;
// // //   onClose: () => void;
// // // }) {
// // //   const cert = items[index];
// // //   const total = items.length;
// // //   const touchStartX = useRef<number | null>(null);

// // //   const go = useCallback(
// // //     (step: number) => onChange((index + step + total) % total),
// // //     [index, total, onChange],
// // //   );

// // //   useEffect(() => {
// // //     const trigger = document.activeElement as HTMLElement | null;
// // //     const onKeyDown = (event: KeyboardEvent) => {
// // //       if (event.key === "Escape") onClose();
// // //       if (event.key === "ArrowLeft" && total > 1) go(-1);
// // //       if (event.key === "ArrowRight" && total > 1) go(1);
// // //     };
// // //     const prevOverflow = document.body.style.overflow;
// // //     document.body.style.overflow = "hidden";
// // //     window.addEventListener("keydown", onKeyDown);
// // //     return () => {
// // //       window.removeEventListener("keydown", onKeyDown);
// // //       document.body.style.overflow = prevOverflow;
// // //       trigger?.focus?.();
// // //     };
// // //   }, [go, onClose, total]);

// // //   if (typeof document === "undefined") return null;

// // //   const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

// // //   const navBtn =
// // //     "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:h-12 sm:w-12";

// // //   return createPortal(
// // //     <div
// // //       role="dialog"
// // //       aria-modal="true"
// // //       aria-label={`${cert.title} certificate`}
// // //       onClick={onClose}
// // //       className="cw-fade cw-body fixed inset-0 z-[9999] flex h-[100dvh] w-screen cursor-zoom-out flex-col bg-[#03050f]/95 text-white backdrop-blur-xl"
// // //     >
// // //       <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-[max(1.5rem,env(safe-area-inset-top))]">
// // //         <div className="min-w-0 cursor-default" onClick={stop}>
// // //           <p className="break-words text-base font-semibold leading-snug sm:text-2xl">
// // //             {cert.title}
// // //           </p>
// // //           <p className="mt-1 text-xs text-white/60 sm:text-sm">
// // //             {cert.issuer} · {cert.date}
// // //             {total > 1 && (
// // //               <span className="tabular-nums">
// // //                 {" "}
// // //                 · {index + 1} / {total}
// // //               </span>
// // //             )}
// // //           </p>
// // //         </div>

// // //         <button
// // //           type="button"
// // //           autoFocus
// // //           aria-label="Close certificate"
// // //           onClick={(e) => {
// // //             e.stopPropagation();
// // //             onClose();
// // //           }}
// // //           className="relative z-20 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-slate-950 shadow-lg transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
// // //         >
// // //           <CloseIcon className="h-5 w-5" />
// // //         </button>
// // //       </div>

// // //       <div
// // //         className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
// // //         onTouchStart={(e) => {
// // //           touchStartX.current = e.touches[0].clientX;
// // //         }}
// // //         onTouchEnd={(e) => {
// // //           if (touchStartX.current === null || total < 2) return;
// // //           const delta = e.changedTouches[0].clientX - touchStartX.current;
// // //           touchStartX.current = null;
// // //           if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
// // //         }}
// // //       >
// // //         {total > 1 && (
// // //           <button
// // //             type="button"
// // //             aria-label="Previous certificate"
// // //             onClick={(e) => {
// // //               stop(e);
// // //               go(-1);
// // //             }}
// // //             className={`${navBtn} left-2 sm:left-5`}
// // //           >
// // //             <ChevronLeft className="h-5 w-5" />
// // //           </button>
// // //         )}

// // //         {cert.image ? (
// // //           <img
// // //             key={cert.id}
// // //             src={cert.image.src}
// // //             alt={cert.image.alt}
// // //             onClick={stop}
// // //             className="cw-pop h-full w-full cursor-default object-contain"
// // //           />
// // //         ) : (
// // //           <div
// // //             key={cert.id}
// // //             onClick={stop}
// // //             className="cw-pop relative cursor-default overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10"
// // //             style={{
// // //               aspectRatio: "16 / 10",
// // //               width: "min(100%, calc((100dvh - 11rem) * 1.6))",
// // //             }}
// // //           >
// // //             <CertificateMock cert={cert} recipient={recipient} />
// // //           </div>
// // //         )}

// // //         {total > 1 && (
// // //           <button
// // //             type="button"
// // //             aria-label="Next certificate"
// // //             onClick={(e) => {
// // //               stop(e);
// // //               go(1);
// // //             }}
// // //             className={`${navBtn} right-2 sm:right-5`}
// // //           >
// // //             <ChevronRight className="h-5 w-5" />
// // //           </button>
// // //         )}
// // //       </div>

// // //       <div className="flex shrink-0 justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-8">
// // //         {cert.credentialUrl && (
// // //           <a
// // //             href={cert.credentialUrl}
// // //             target="_blank"
// // //             rel="noopener noreferrer"
// // //             onClick={stop}
// // //             className="flex h-11 cursor-pointer items-center gap-2 rounded-full border px-6 text-sm font-semibold transition hover:bg-white/10"
// // //             style={{ color: accent, borderColor: `${accent}80` }}
// // //           >
// // //             Verify credential
// // //             <ExternalIcon className="h-4 w-4" />
// // //           </a>
// // //         )}
// // //       </div>
// // //     </div>,
// // //     document.body,
// // //   );
// // // }

// // // /* -------------------------------------------------------------------------- */
// // // /*  Main section                                                               */
// // // /* -------------------------------------------------------------------------- */

// // // export default function CertificatesSection({
// // //   id = "certificates",
// // //   heading = "Certificates",
// // //   tagline = "Learning Today,\nBuilding Tomorrow",
// // //   description = "Here are some of the certificates I've earned through online courses, technical training and professional programs. Each one represents a step in my journey of continuous learning and skill development.",
// // //   badgeLabel = "My Certificates",
// // //   recipientName = "Md. Ahad Hossain",
// // //   certificates = defaultCertificates,
// // //   stats,
// // //   pageSize = 6,
// // //   accentColor = "#4f8bff",
// // //   theme = "auto",
// // //   className = "",
// // // }: CertificatesSectionProps) {
// // //   const siteMode = useSiteTheme(theme === "auto");
// // //   const mode: Theme = theme === "auto" ? siteMode : theme;
// // //   const t = THEMES[mode];
// // //   const reduced = usePrefersReducedMotion();
// // //   const [sectionRef, seen] = useInView<HTMLElement>();
// // //   const toolbarRef = useRef<HTMLDivElement | null>(null);

// // //   const list = Array.isArray(certificates) ? certificates : EMPTY;
// // //   const [query, setQuery] = useState("");
// // //   const [searchOpen, setSearchOpen] = useState(false);
// // //   const inputRef = useRef<HTMLInputElement | null>(null);
// // //   const [page, setPage] = useState(1);
// // //   const [active, setActive] = useState<number | null>(null);
// // //   const close = useCallback(() => setActive(null), []);

// // //   useEffect(() => {
// // //     if (!searchOpen) return;
// // //     const id = requestAnimationFrame(() => inputRef.current?.focus());
// // //     return () => cancelAnimationFrame(id);
// // //   }, [searchOpen]);

// // //   const closeSearch = () => {
// // //     setQuery("");
// // //     setPage(1);
// // //     setSearchOpen(false);
// // //   };

// // //   const filtered = useMemo(() => {
// // //     const q = query.trim().toLowerCase();
// // //     if (!q) return list;
// // //     return list.filter((c) =>
// // //       [c.title, c.issuer, c.category, c.tag ?? "", c.date].some((v) =>
// // //         v.toLowerCase().includes(q),
// // //       ),
// // //     );
// // //   }, [list, query]);

// // //   const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
// // //   const current = Math.min(page, pages);
// // //   const offset = (current - 1) * pageSize;
// // //   const visible = filtered.slice(offset, offset + pageSize);

// // //   const statList: Stat[] = stats ?? [
// // //     { label: "Certificates", value: list.length, suffix: "+", pad: true },
// // //     {
// // //       label: "Platforms",
// // //       value: new Set(list.map((c) => c.issuer)).size,
// // //       suffix: "+",
// // //       pad: true,
// // //     },
// // //     { label: "Commitment", value: 100, suffix: "%" },
// // //   ];

// // //   const goPage = (n: number) => {
// // //     setPage(n);
// // //     const el = toolbarRef.current;
// // //     if (el && el.getBoundingClientRect().top < 0) {
// // //       el.scrollIntoView({
// // //         behavior: reduced ? "auto" : "smooth",
// // //         block: "start",
// // //       });
// // //     }
// // //   };

// // //   const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// // //   return (
// // //     <section
// // //       id={id}
// // //       ref={sectionRef}
// // //       style={{ "--accent": accentColor } as CSSProperties}
// // //       className={`cw-body relative isolate w-full overflow-hidden px-5 py-20  sm:px-6 sm:py-24 md:px-10 md:py-30 ${seen ? "cw-inview" : "cw-pre"} transition-colors duration-500 ${t.section} ${className}`}
// // //     >
// // //       <style>{CSS}</style>

// // //       {/* background */}
// // //       <div
// // //         aria-hidden="true"
// // //         className="pointer-events-none absolute inset-0 -z-10"
// // //       >
// // //         <div
// // //           className="cw-drift absolute -left-40 top-0 h-[520px] w-[520px] rounded-full blur-[120px]"
// // //           style={{ background: accentColor, opacity: t.glow }}
// // //         />
// // //         <div
// // //           className="cw-drift absolute -right-40 top-1/3 h-[460px] w-[460px] rounded-full blur-[130px]"
// // //           style={{
// // //             background: "#7c3aed",
// // //             opacity: t.glow * 0.8,
// // //             animationDelay: "-8s",
// // //           }}
// // //         />
// // //         <div
// // //           className="absolute inset-0"
// // //           style={{
// // //             backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`,
// // //             backgroundSize: "56px 56px",
// // //             maskImage:
// // //               "radial-gradient(ellipse at 30% 15%, #000, transparent 70%)",
// // //             WebkitMaskImage:
// // //               "radial-gradient(ellipse at 30% 15%, #000, transparent 70%)",
// // //           }}
// // //         />
// // //       </div>

// // //       <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-12 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:gap-x-14">
// // //         {/* ------------------------------ intro ------------------------------ */}
// // //         <div className="flex min-w-0 flex-col gap-6 sm:gap-7 lg:col-start-1 lg:row-start-1">
// // //           <div className="cw-r" style={d(0)}>
// // //             <span
// // //               className="inline-flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-4 text-sm font-semibold"
// // //               style={{
// // //                 borderColor: `${accentColor}45`,
// // //                 backgroundColor: `${accentColor}14`,
// // //               }}
// // //             >
// // //               <span
// // //                 className="flex h-8 w-8 items-center justify-center rounded-full text-white"
// // //                 style={{
// // //                   backgroundImage: `linear-gradient(135deg, ${accentColor}, #7c3aed)`,
// // //                 }}
// // //               >
// // //                 <AwardIcon className="h-4 w-4" />
// // //               </span>
// // //               {badgeLabel}
// // //             </span>
// // //           </div>

// // //           <div className="cw-r" style={d(90)}>
// // //             <h2
// // //               className={`cw-shimmer bg-gradient-to-r bg-clip-text pb-1 text-[2.75rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-transparent sm:text-6xl lg:text-5xl xl:text-6xl ${t.headingGrad}`}
// // //             >
// // //               {heading}
// // //             </h2>
// // //           </div>

// // //           <p
// // //             className="cw-r whitespace-pre-line text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl"
// // //             style={d(180)}
// // //           >
// // //             {tagline}
// // //           </p>

// // //           <p
// // //             className={`cw-r max-w-md text-[15px] leading-7 sm:leading-8 ${t.muted}`}
// // //             style={d(270)}
// // //           >
// // //             {description}
// // //           </p>

// // //           <div className="cw-r" style={d(360)}>
// // //             <div className={`flex divide-x ${t.divide}`}>
// // //               {statList.map((s) => (
// // //                 <StatItem
// // //                   key={s.label}
// // //                   stat={s}
// // //                   run={seen}
// // //                   reduced={reduced}
// // //                   accent={accentColor}
// // //                   muted={t.muted}
// // //                 />
// // //               ))}
// // //             </div>
// // //           </div>

// // //           <div className="cw-r flex items-center gap-3" style={d(450)}>
// // //             <span
// // //               className="cw-script text-3xl font-bold sm:text-4xl"
// // //               style={{ color: accentColor }}
// // //             >
// // //               Keep Learning
// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* ------------------------------ right ------------------------------ */}
// // //         <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
// // //           <div
// // //             ref={toolbarRef}
// // //             className="cw-r flex scroll-mt-24 items-center justify-between gap-3"
// // //             style={d(120)}
// // //           >
// // //             <p
// // //               aria-live="polite"
// // //               className={`min-w-0 flex-1 truncate text-sm ${t.muted} ${searchOpen ? "hidden sm:block" : ""}`}
// // //             >
// // //               {query.trim()
// // //                 ? `${filtered.length} ${filtered.length === 1 ? "result" : "results"} for “${query.trim()}”`
// // //                 : `${list.length} ${list.length === 1 ? "certificate" : "certificates"}`}
// // //             </p>

// // //             <div
// // //               role="search"
// // //               onBlur={(e) => {
// // //                 if (
// // //                   !e.currentTarget.contains(e.relatedTarget as Node | null) &&
// // //                   !query
// // //                 )
// // //                   setSearchOpen(false);
// // //               }}
// // //               className={`cw-search relative flex h-11 shrink-0 items-center overflow-hidden rounded-full border transition-[width,border-color,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
// // //                 searchOpen
// // //                   ? "w-full sm:w-96"
// // //                   : "w-11 hover:border-[var(--accent)]"
// // //               } ${t.input}`}
// // //             >
// // //               <button
// // //                 type="button"
// // //                 onClick={() =>
// // //                   searchOpen ? inputRef.current?.focus() : setSearchOpen(true)
// // //                 }
// // //                 aria-label={searchOpen ? "Search certificates" : "Open search"}
// // //                 aria-expanded={searchOpen}
// // //                 className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors hover:text-[var(--accent)] ${searchOpen ? t.subtle : ""}`}
// // //               >
// // //                 <SearchIcon className="h-5 w-5" />
// // //               </button>

// // //               <input
// // //                 ref={inputRef}
// // //                 type="text"
// // //                 inputMode="search"
// // //                 value={query}
// // //                 tabIndex={searchOpen ? 0 : -1}
// // //                 onChange={(e) => {
// // //                   setQuery(e.target.value);
// // //                   setPage(1);
// // //                 }}
// // //                 onKeyDown={(e) => {
// // //                   if (e.key === "Escape") closeSearch();
// // //                 }}
// // //                 placeholder="Search certificates..."
// // //                 aria-label="Search certificates"
// // //                 className={`h-full min-w-0 flex-1 bg-transparent pr-1 text-sm outline-none transition-opacity duration-300 ${
// // //                   searchOpen
// // //                     ? "opacity-100 delay-200"
// // //                     : "pointer-events-none opacity-0"
// // //                 }`}
// // //               />

// // //               <button
// // //                 type="button"
// // //                 onClick={closeSearch}
// // //                 tabIndex={searchOpen ? 0 : -1}
// // //                 aria-label="Close search"
// // //                 className={`mr-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${t.iconHover} ${t.subtle} ${
// // //                   searchOpen
// // //                     ? "opacity-100 delay-200"
// // //                     : "pointer-events-none opacity-0"
// // //                 }`}
// // //               >
// // //                 <CloseIcon className="h-4 w-4" />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {visible.length === 0 ? (
// // //             <div
// // //               className={`cw-r mt-5 flex flex-col items-center rounded-3xl border px-6 py-16 text-center ${t.card}`}
// // //               style={d(200)}
// // //             >
// // //               <span
// // //                 className="flex h-14 w-14 items-center justify-center rounded-2xl"
// // //                 style={{
// // //                   backgroundColor: `${accentColor}1c`,
// // //                   color: accentColor,
// // //                 }}
// // //               >
// // //                 <ImageIcon className="h-7 w-7" />
// // //               </span>
// // //               <h3 className="mt-5 text-xl font-semibold">
// // //                 {list.length === 0
// // //                   ? "No certificates yet"
// // //                   : "No certificates found"}
// // //               </h3>
// // //               <p className={`mt-2 max-w-sm text-sm leading-6 ${t.muted}`}>
// // //                 {list.length === 0
// // //                   ? "Add items to the certificates prop to show your achievements here."
// // //                   : "Try a different keyword."}
// // //               </p>
// // //               {list.length > 0 && (
// // //                 <button
// // //                   type="button"
// // //                   onClick={closeSearch}
// // //                   className={`mt-6 h-10 rounded-full px-5 text-sm font-semibold transition ${t.ghost}`}
// // //                 >
// // //                   Clear search
// // //                 </button>
// // //               )}
// // //             </div>
// // //           ) : (
// // //             <div key={current} className="mt-5 grid grid-cols-2 gap-3 sm:gap-5">
// // //               {visible.map((cert, i) => (
// // //                 <CertCard
// // //                   key={cert.id}
// // //                   cert={cert}
// // //                   index={i}
// // //                   recipient={recipientName}
// // //                   accent={accentColor}
// // //                   t={t}
// // //                   onOpen={() => setActive(offset + i)}
// // //                 />
// // //               ))}
// // //             </div>
// // //           )}

// // //           {pages > 1 && (
// // //             <nav
// // //               aria-label="Certificate pages"
// // //               className="cw-r mt-8 flex items-center justify-center gap-2 sm:mt-10"
// // //               style={d(300)}
// // //             >
// // //               <button
// // //                 type="button"
// // //                 onClick={() => goPage(current - 1)}
// // //                 disabled={current === 1}
// // //                 aria-label="Previous page"
// // //                 className={`flex h-10 w-10 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-35 ${t.pageBtn}`}
// // //               >
// // //                 <ChevronLeft className="h-4 w-4" />
// // //               </button>

// // //               {pageWindow(current, pages).map((n, i) =>
// // //                 n === "gap" ? (
// // //                   <span
// // //                     key={`gap-${i}`}
// // //                     className={`px-1 ${t.subtle}`}
// // //                     aria-hidden="true"
// // //                   >
// // //                     …
// // //                   </span>
// // //                 ) : (
// // //                   <button
// // //                     key={n}
// // //                     type="button"
// // //                     onClick={() => goPage(n)}
// // //                     aria-label={`Page ${n}`}
// // //                     aria-current={n === current ? "page" : undefined}
// // //                     className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold tabular-nums transition ${
// // //                       n === current
// // //                         ? "border-transparent text-white"
// // //                         : t.pageBtn
// // //                     }`}
// // //                     style={
// // //                       n === current
// // //                         ? {
// // //                             backgroundImage: `linear-gradient(135deg, ${accentColor}, #7c3aed)`,
// // //                             boxShadow: `0 10px 26px -10px ${accentColor}`,
// // //                           }
// // //                         : undefined
// // //                     }
// // //                   >
// // //                     {n}
// // //                   </button>
// // //                 ),
// // //               )}

// // //               <button
// // //                 type="button"
// // //                 onClick={() => goPage(current + 1)}
// // //                 disabled={current === pages}
// // //                 aria-label="Next page"
// // //                 className={`flex h-10 w-10 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-35 ${t.pageBtn}`}
// // //               >
// // //                 <ChevronRight className="h-4 w-4" />
// // //               </button>
// // //             </nav>
// // //           )}
// // //         </div>

// // //         {/* --------------------------- illustration -------------------------- */}
// // //         <div
// // //           className="cw-r lg:col-start-1 lg:row-start-2 lg:self-end"
// // //           style={d(540)}
// // //         >
// // //           <HeroCertificate accent={accentColor} mode={mode} />
// // //         </div>
// // //       </div>

// // //       {active !== null && filtered[active] && (
// // //         <Lightbox
// // //           items={filtered}
// // //           index={active}
// // //           recipient={recipientName}
// // //           accent={accentColor}
// // //           onChange={setActive}
// // //           onClose={close}
// // //         />
// // //       )}
// // //     </section>
// // //   );
// // // }

// // // /*
// // // Install icons once:  npm i lucide-react

// // // Usage:

// // // import CertificatesSection from "./CertificatesSection";

// // // // follows your site's light / dark mode automatically (white bg in light, black bg in dark)
// // // <CertificatesSection accentColor="#4f8bff" />

// // // // or control it yourself with your theme state:
// // // <CertificatesSection theme={isDark ? "dark" : "light"} />

// // // Your certificates live in ../../Data/Certificates (edit / add there).
// // // Optional props: recipientName, certificates (override the list), stats, pageSize,
// // // heading, tagline, description, badgeLabel, theme, className.
// // // */

// // import {
// //   useCallback,
// //   useEffect,
// //   useId,
// //   useMemo,
// //   useRef,
// //   useState,
// //   type CSSProperties,
// //   type PointerEvent as ReactPointerEvent,
// // } from "react";

// // import { createPortal } from "react-dom";

// // import {
// //   ArrowRight as ArrowRightIcon,
// //   Award as AwardIcon,
// //   Calendar as CalendarIcon,
// //   ChevronLeft,
// //   ChevronRight,
// //   ExternalLink as ExternalIcon,
// //   Eye as EyeIcon,
// //   Image as ImageIcon,
// //   Maximize2 as ExpandIcon,
// //   Search as SearchIcon,
// //   X as CloseIcon,
// // } from "lucide-react";

// // import {
// //   certificates as defaultCertificates,
// //   type CertificateItem,
// // } from "../../Data/Certificates";

// // export type { CertificateItem };

// // /* -------------------------------------------------------------------------- */

// // /*  Types                                                                      */

// // /* -------------------------------------------------------------------------- */

// // type Theme = "light" | "dark";

// // type Stat = {
// //   label: string;

// //   value: number;

// //   suffix?: string;

// //   pad?: boolean; // 8 -> "08"*
// // };

// // type CertificatesSectionProps = {
// //   id?: string;

// //   heading?: string;

// //   tagline?: string; // use \n for a line break*

// //   description?: string;

// //   badgeLabel?: string;

// //   recipientName?: string; // printed on generated certificate previews*

// //   certificates?: CertificateItem[];

// //   stats?: Stat[]; // optional override of the 3 left-side stats*

// //   pageSize?: number;

// //   accentColor?: string; // 6-digit hex, e.g. "#4f8bff"*

// //   theme?: Theme | "auto"; // "auto" (default) follows your site light/dark mode*

// //   className?: string;
// // };

// // const EMPTY: CertificateItem[] = [];

// // /* -------------------------------------------------------------------------- */

// // /*  Theme tokens                                                               */

// // /* -------------------------------------------------------------------------- */

// // const THEMES = {
// //   dark: {
// //     section: "bg-black text-white",

// //     muted: "text-slate-400",

// //     subtle: "text-slate-500",

// //     card: "border-white/10 bg-white/[0.035]",

// //     input:
// //       "border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500",

// //     pill: "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:text-white",

// //     ghost: "bg-white/[0.07] text-white hover:bg-white/[0.13]",

// //     divide: "divide-white/10",

// //     preview: "border-white/10 shadow-black/40",

// //     pageBtn:
// //       "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/10 hover:text-white",

// //     headingGrad: "from-white via-[#a5b4fc] to-white",

// //     gridLine: "rgba(255,255,255,0.045)",

// //     glow: 0.3,

// //     iconHover: "hover:bg-white/10",
// //   },

// //   light: {
// //     section: "bg-white text-slate-900",

// //     muted: "text-slate-600",

// //     subtle: "text-slate-500",

// //     card: "border-slate-200 bg-slate-50/80 shadow-sm shadow-slate-900/[0.03]",

// //     input:
// //       "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400",

// //     pill: "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900",

// //     ghost: "bg-slate-100 text-slate-800 hover:bg-slate-200",

// //     divide: "divide-slate-200",

// //     preview: "border-slate-200 shadow-slate-900/10",

// //     pageBtn:
// //       "border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900",

// //     headingGrad: "from-slate-900 via-indigo-600 to-slate-900",

// //     gridLine: "rgba(15,23,42,0.06)",

// //     glow: 0.1,

// //     iconHover: "hover:bg-slate-200",
// //   },
// // } as const;

// // const TAG_COLORS = [
// //   "#8b5cf6",

// //   "#38bdf8",

// //   "#f59e0b",

// //   "#34d399",

// //   "#f472b6",

// //   "#fb7185",
// // ];

// // /* -------------------------------------------------------------------------- */

// // /*  CSS (fonts + animations)                                                   */

// // /* -------------------------------------------------------------------------- */

// // const CSS = `

// // @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

// // .cw-body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }

// // .cw-script { font-family: 'Caveat', cursive; }

// // /* entrance: hidden until the section scrolls into view */

// // .cw-pre .cw-r, .cw-pre .cw-card { opacity: 0; }

// // .cw-inview .cw-r { animation: cw-rise .8s cubic-bezier(.2,.7,.2,1) backwards; animation-delay: var(--d, 0ms); }

// // .cw-inview .cw-card { animation: cw-rise .7s cubic-bezier(.2,.7,.2,1) backwards; animation-delay: calc(var(--i, 0) * 80ms + 120ms); }

// // @keyframes cw-rise { from { opacity: 0; transform: translateY(28px) scale(.98); } to { opacity: 1; transform: none; } }

// // .cw-shimmer { background-size: 200% 100%; background-repeat: repeat-x; animation: cw-shimmer 7s linear infinite; }

// // @keyframes cw-shimmer { to { background-position: 200% 0; } }

// // .cw-drift { animation: cw-drift 18s ease-in-out infinite; }

// // @keyframes cw-drift { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(40px,30px,0); } }

// // .cw-nudge { animation: cw-nudge 1.8s ease-in-out infinite; }

// // @keyframes cw-nudge { 0%,100% { transform: translateX(0); } 50% { transform: translateX(6px); } }

// // /* hero illustration */

// // .cw-float { animation: cw-float 6s ease-in-out infinite; }

// // @keyframes cw-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

// // .cw-dash { animation: cw-dash 7s linear infinite; }

// // @keyframes cw-dash { to { stroke-dashoffset: -440; } }

// // .cw-pulse { animation: cw-pulse 3.5s ease-in-out infinite; }

// // @keyframes cw-pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }

// // .cw-twinkle { transform-box: fill-box; transform-origin: center; animation: cw-twinkle 3s ease-in-out infinite; }

// // @keyframes cw-twinkle { 0%,100% { opacity: .2; transform: scale(.6); } 50% { opacity: 1; transform: scale(1.1); } }

// // /* gradient border on cards */

// // .cw-border { position: relative; isolation: isolate; }

// // .cw-border::before {

// //   content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px;

// //   background: linear-gradient(135deg, var(--accent), transparent 40%, rgba(139,92,246,.55));

// //   -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);

// //   -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;

// //   opacity: .28; transition: opacity .4s ease;

// // }

// // .cw-card:hover .cw-border::before { opacity: 1; }

// // .cw-search:focus-within { border-color: var(--accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent); }

// // .cw-verify { transition: background .25s ease, box-shadow .25s ease, transform .25s ease; }

// // .cw-verify:hover { background: color-mix(in srgb, var(--accent) 14%, transparent); box-shadow: 0 8px 24px -12px var(--accent); }

// // .cw-fade { animation: cw-fade .2s ease-out; }

// // .cw-pop { animation: cw-pop .26s ease-out; }

// // @keyframes cw-fade { from { opacity: 0 } to { opacity: 1 } }

// // @keyframes cw-pop { from { opacity: 0; transform: scale(.97) } to { opacity: 1; transform: scale(1) } }

// // /* card buttons adapt to the card width (container queries) */

// // .cw-actions { container-type: inline-size; }

// // .cw-btnrow { display: flex; gap: .5rem; }

// // .cw-b-main { flex: 1 1 auto; min-width: 0; }

// // .cw-long, .cw-vtxt { display: none; }

// // .cw-b-alt {

// //   flex: 0 0 auto; display: flex; align-items: center; justify-content: center; gap: .4rem;

// //   width: 2.25rem; height: 2.25rem; border-radius: 9999px; border: 1px solid;

// //   font-size: .75rem; font-weight: 600; white-space: nowrap;

// // }

// // @container (min-width: 170px) { .cw-b-alt { width: auto; padding: 0 .9rem; } .cw-vtxt { display: inline; } }

// // @container (min-width: 270px) { .cw-short { display: none; } .cw-long { display: inline; } }

// // @media (min-width: 640px) { .cw-b-alt { height: 2.5rem; font-size: .875rem; } }

// // @media (prefers-reduced-motion: reduce) {

// //   .cw-pre .cw-r, .cw-pre .cw-card { opacity: 1; }

// //   .cw-inview .cw-r, .cw-inview .cw-card, .cw-shimmer, .cw-drift, .cw-nudge,

// //   .cw-float, .cw-dash, .cw-pulse, .cw-twinkle, .cw-fade, .cw-pop { animation: none !important; }

// //   .cw-body *, .cw-body *::before, .cw-body *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }

// // }

// // `;

// // /* -------------------------------------------------------------------------- */

// // /*  Helpers & hooks                                                            */

// // /* -------------------------------------------------------------------------- */

// // const hueOf = (s: string) => {
// //   let h = 0;

// //   for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;

// //   return h;
// // };

// // const tagColor = (s: string) => TAG_COLORS[hueOf(s) % TAG_COLORS.length];

// // function pageWindow(current: number, total: number): (number | "gap")[] {
// //   if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

// //   const nums = Array.from(
// //     new Set([1, total, current - 1, current, current + 1]),
// //   )

// //     .filter((n) => n >= 1 && n <= total)

// //     .sort((a, b) => a - b);

// //   const out: (number | "gap")[] = [];

// //   nums.forEach((n, i) => {
// //     if (i > 0 && n - nums[i - 1] > 1) out.push("gap");

// //     out.push(n);
// //   });

// //   return out;
// // }

// // function readSiteTheme(): Theme {
// //   const root = document.documentElement;

// //   const body = document.body;

// //   // 1) explicit markers: class="dark" / data-theme="dark" (next-themes, Tailwind, etc.)*

// //   for (const el of [root, body]) {
// //     const attr = (
// //       el.getAttribute("data-theme") ||
// //       el.getAttribute("data-mode") ||
// //       el.getAttribute("data-color-scheme") ||
// //       ""
// //     ).toLowerCase();

// //     if (el.classList.contains("dark") || attr === "dark") return "dark";

// //     if (el.classList.contains("light") || attr === "light") return "light";
// //   }

// //   // 2) color-scheme set on <html>*

// //   const cs = root.style.colorScheme;

// //   if (cs === "dark" || cs === "light") return cs;

// //   // 3) how dark the page background really is*

// //   for (const el of [body, root]) {
// //     const m = getComputedStyle(el).backgroundColor.match(/rgba?\\(([^)]+)\\)/);

// //     if (m) {
// //       const [r, g, b, a = "1"] = m[1].split(/[ ,/]+/).filter(Boolean);

// //       if (parseFloat(a) > 0.5) {
// //         const lum = (0.299 * +r + 0.587 * +g + 0.114 * +b) / 255;

// //         return lum < 0.5 ? "dark" : "light";
// //       }
// //     }
// //   }

// //   // 4) operating system preference*

// //   return window.matchMedia("(prefers-color-scheme: dark)").matches
// //     ? "dark"
// //     : "light";
// // }

// // function useSiteTheme(enabled: boolean): Theme {
// //   const [mode, setMode] = useState<Theme>("light");

// //   useEffect(() => {
// //     if (!enabled) return;

// //     let timer = 0;

// //     const update = () => setMode(readSiteTheme());

// //     const schedule = () => {
// //       update();

// //       window.clearTimeout(timer);

// //       timer = window.setTimeout(update, 400); // re-check after CSS transitions*
// //     };

// //     update();

// //     const mo = new MutationObserver(schedule);

// //     const opts = {
// //       attributes: true,

// //       attributeFilter: [
// //         "class",

// //         "data-theme",

// //         "data-mode",

// //         "data-color-scheme",

// //         "style",
// //       ],
// //     };

// //     mo.observe(document.documentElement, opts);

// //     mo.observe(document.body, opts);

// //     const mq = window.matchMedia("(prefers-color-scheme: dark)");

// //     mq.addEventListener("change", schedule);

// //     return () => {
// //       mo.disconnect();

// //       mq.removeEventListener("change", schedule);

// //       window.clearTimeout(timer);
// //     };
// //   }, [enabled]);

// //   return mode;
// // }

// // function usePrefersReducedMotion() {
// //   const [reduced, setReduced] = useState(false);

// //   useEffect(() => {
// //     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

// //     setReduced(mq.matches);

// //     const onChange = () => setReduced(mq.matches);

// //     mq.addEventListener("change", onChange);

// //     return () => mq.removeEventListener("change", onChange);
// //   }, []);

// //   return reduced;
// // }

// // function useInView<T extends Element>(threshold = 0.08) {
// //   const ref = useRef<T | null>(null);

// //   const [seen, setSeen] = useState(false);

// //   useEffect(() => {
// //     const el = ref.current;

// //     if (!el) return;

// //     if (typeof IntersectionObserver === "undefined") {
// //       setSeen(true);

// //       return;
// //     }

// //     const io = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           setSeen(true);

// //           io.disconnect();
// //         }
// //       },

// //       { threshold },
// //     );

// //     io.observe(el);

// //     return () => io.disconnect();
// //   }, [threshold]);

// //   return [ref, seen] as const;
// // }

// // function useCountUp(
// //   target: number,

// //   run: boolean,

// //   reduced: boolean,

// //   duration = 1300,
// // ) {
// //   const [value, setValue] = useState(0);

// //   useEffect(() => {
// //     if (!run) return;

// //     if (reduced) {
// //       setValue(target);

// //       return;
// //     }

// //     let raf = 0;

// //     const t0 = performance.now();

// //     const tick = (now: number) => {
// //       const p = Math.min(1, (now - t0) / duration);

// //       setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));

// //       if (p < 1) raf = requestAnimationFrame(tick);
// //     };

// //     raf = requestAnimationFrame(tick);

// //     return () => cancelAnimationFrame(raf);
// //   }, [target, run, reduced, duration]);

// //   return value;
// // }

// // /* -------------------------------------------------------------------------- */

// // /*  Generated certificate preview (used when no image is supplied)             */

// // /* -------------------------------------------------------------------------- */

// // function CertificateMock({
// //   cert,

// //   recipient,
// // }: {
// //   cert: CertificateItem;

// //   recipient: string;
// // }) {
// //   const h = hueOf(cert.issuer);

// //   const c1 = `hsl(${h} 78% 46%)`;

// //   const c2 = `hsl(${(h + 40) % 360} 85% 62%)`;

// //   const abs = (style: CSSProperties): CSSProperties => ({
// //     position: "absolute",

// //     ...style,
// //   });

// //   return (
// //     <div
// //       aria-hidden="true"
// //       className="absolute inset-0 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-800"
// //       style={{ containerType: "inline-size" }}
// //     >
// //       <div
// //         style={abs({
// //           right: "-10cqw",

// //           top: "-10cqw",

// //           width: "30cqw",

// //           height: "30cqw",

// //           transform: "rotate(45deg)",

// //           background: `linear-gradient(135deg, ${c2}, ${c1})`,
// //         })}
// //       />

// //       <div
// //         style={abs({
// //           left: 0,

// //           bottom: 0,

// //           width: "100%",

// //           height: "1.6cqw",

// //           background: `linear-gradient(90deg, ${c1}, ${c2}, transparent)`,
// //         })}
// //       />

// //       <div
// //         style={abs({
// //           left: "7cqw",

// //           top: "7cqw",

// //           maxWidth: "60cqw",

// //           fontSize: "6.4cqw",

// //           fontWeight: 800,

// //           letterSpacing: "-0.02em",

// //           color: c1,

// //           whiteSpace: "nowrap",

// //           overflow: "hidden",

// //           textOverflow: "ellipsis",
// //         })}
// //       >
// //         {cert.issuer}
// //       </div>

// //       <div
// //         style={abs({
// //           left: "7cqw",

// //           top: "17cqw",

// //           fontSize: "3.1cqw",

// //           fontWeight: 600,

// //           color: c1,
// //         })}
// //       >
// //         Certificate of Completion
// //       </div>

// //       <div
// //         style={abs({
// //           left: "7cqw",

// //           top: "24cqw",

// //           width: "62cqw",

// //           fontSize: "5cqw",

// //           fontWeight: 700,

// //           lineHeight: 1.2,

// //           color: "#0f172a",

// //           display: "-webkit-box",

// //           WebkitBoxOrient: "vertical",

// //           WebkitLineClamp: 2,

// //           overflow: "hidden",
// //         })}
// //       >
// //         {cert.title}
// //       </div>

// //       <div style={abs({ left: "7cqw", bottom: "13cqw", maxWidth: "52cqw" })}>
// //         <div style={{ fontSize: "2.4cqw", color: "#64748b" }}>Awarded to</div>

// //         <div
// //           style={{
// //             fontSize: "4.2cqw",

// //             fontWeight: 700,

// //             color: "#0f172a",

// //             whiteSpace: "nowrap",

// //             overflow: "hidden",

// //             textOverflow: "ellipsis",
// //           }}
// //         >
// //           {recipient}
// //         </div>
// //       </div>

// //       <div
// //         style={abs({
// //           left: "7cqw",

// //           bottom: "5.5cqw",

// //           fontSize: "2.5cqw",

// //           color: "#64748b",
// //         })}
// //       >
// //         Issued: {cert.date}
// //       </div>

// //       <div
// //         style={abs({
// //           right: "9cqw",

// //           bottom: "17cqw",

// //           width: "11cqw",

// //           height: "11cqw",

// //           borderRadius: "50%",

// //           background: `radial-gradient(circle at 30% 30%, ${c2}, ${c1})`,

// //           boxShadow: `0 1cqw 3cqw -1cqw ${c1}`,

// //           border: "0.6cqw solid rgba(255,255,255,.85)",

// //           display: "flex",

// //           alignItems: "center",

// //           justifyContent: "center",
// //         })}
// //       >
// //         <svg viewBox="0 0 24 24" style={{ width: "55%", height: "55%" }}>
// //           <path
// //             d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z"
// //             fill="#fff"
// //           />
// //         </svg>
// //       </div>

// //       <svg
// //         viewBox="0 0 80 32"
// //         style={abs({ right: "8cqw", bottom: "5cqw", width: "20cqw" })}
// //       >
// //         <path
// //           d="M2 24c6-16 12-20 14-10 1 6-6 12-2 11 7-2 10-14 17-12 5 2-2 11 3 10 5-1 8-6 13-5 3 1 2 5 6 4 4-1 8-3 10-3"
// //           fill="none"
// //           stroke="#334155"
// //           strokeWidth="1.6"
// //           strokeLinecap="round"
// //         />
// //       </svg>
// //     </div>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */

// // /*  Hero illustration (floating 3D-style certificate on a glowing platform)    */

// // /* -------------------------------------------------------------------------- */

// // function HeroCertificate({ accent, mode }: { accent: string; mode: Theme }) {
// //   const light = mode === "light";

// //   const topA = light ? "#eef2ff" : "#16246b";

// //   const topB = light ? "#c7d2fe" : "#0a1236";

// //   const baseFill = light ? "#a5b4fc" : "#060a22";

// //   const sideFill = light ? "#b9c4fb" : "#0a1236";

// //   const sparkFill = light ? "#818cf8" : "#cdd9ff";

// //   const uid = useId().replace(/:/g, "");

// //   const gid = (n: string) => `${n}-${uid}`;

// //   const ref = (n: string) => `url(#${gid(n)})`;

// //   const sparkle = (x: number, y: number, s: number, d: number) => (
// //     <path
// //       key={`${x}-${y}`}
// //       className="cw-twinkle"
// //       style={{ animationDelay: `${d}s` }}
// //       transform={`translate(${x} ${y}) scale(${s})`}
// //       d="M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8Z"
// //       fill={sparkFill}
// //     />
// //   );

// //   return (
// //     <div
// //       aria-hidden="true"
// //       className="relative mx-auto aspect-[420/360] w-full max-w-[340px] sm:max-w-[420px]"
// //     >
// //       <svg viewBox="0 0 420 360" className="h-full w-full overflow-visible">
// //         <defs>
// //           <linearGradient id={gid("ring")} x1="0" y1="0" x2="1" y2="0">
// //             <stop offset="0" stopColor={accent} />

// //             <stop offset="0.55" stopColor="#8b5cf6" />

// //             <stop offset="1" stopColor="#22d3ee" />
// //           </linearGradient>

// //           <linearGradient id={gid("card")} x1="0" y1="0" x2="1" y2="1">
// //             <stop offset="0" stopColor="#2a46a8" />

// //             <stop offset="1" stopColor="#0d1740" />
// //           </linearGradient>

// //           <linearGradient id={gid("top")} x1="0" y1="0" x2="0" y2="1">
// //             <stop offset="0" stopColor={topA} />

// //             <stop offset="1" stopColor={topB} />
// //           </linearGradient>

// //           <linearGradient id={gid("gold")} x1="0" y1="0" x2="1" y2="1">
// //             <stop offset="0" stopColor="#ffd896" />

// //             <stop offset="1" stopColor="#d9822b" />
// //           </linearGradient>

// //           <radialGradient id={gid("glow")} cx=".5" cy=".5" r=".5">
// //             <stop
// //               offset="0"
// //               stopColor={accent}
// //               stopOpacity={light ? ".28" : ".5"}
// //             />

// //             <stop offset="1" stopColor={accent} stopOpacity="0" />
// //           </radialGradient>

// //           <filter id={gid("blur")} x="-20%" y="-60%" width="140%" height="220%">
// //             <feGaussianBlur stdDeviation="7" />
// //           </filter>
// //         </defs>

// //         <ellipse cx="210" cy="305" rx="210" ry="62" fill={ref("glow")} />

// //         {/* platform */}

// //         <ellipse cx="210" cy="318" rx="170" ry="44" fill={baseFill} />

// //         <rect x="40" y="296" width="340" height="22" fill={sideFill} />

// //         <ellipse cx="210" cy="296" rx="170" ry="44" fill={ref("top")} />

// //         <ellipse
// //           className="cw-pulse"
// //           cx="210"
// //           cy="296"
// //           rx="170"
// //           ry="44"
// //           fill="none"
// //           stroke={ref("ring")}
// //           strokeWidth="5"
// //           filter={`url(#${gid("blur")})`}
// //         />

// //         <ellipse
// //           cx="210"
// //           cy="296"
// //           rx="170"
// //           ry="44"
// //           fill="none"
// //           stroke={ref("ring")}
// //           strokeWidth="2.5"
// //         />

// //         <ellipse
// //           cx="210"
// //           cy="296"
// //           rx="128"
// //           ry="31"
// //           fill="none"
// //           stroke={ref("ring")}
// //           strokeWidth="1.5"
// //           strokeOpacity=".5"
// //         />

// //         {/* flowing orbit */}

// //         <ellipse
// //           className="cw-dash"
// //           cx="210"
// //           cy="205"
// //           rx="190"
// //           ry="54"
// //           transform="rotate(-14 210 205)"
// //           fill="none"
// //           stroke={ref("ring")}
// //           strokeWidth="2.5"
// //           strokeLinecap="round"
// //           strokeDasharray="120 40 20 40"
// //         />

// //         {/* floating certificate */}

// //         <g className="cw-float">
// //           <g transform="translate(210 185) rotate(-9)">
// //             <rect
// //               x="-125"
// //               y="-85"
// //               width="250"
// //               height="170"
// //               rx="18"
// //               fill={ref("card")}
// //               stroke={ref("ring")}
// //               strokeWidth="1.5"
// //             />

// //             <rect
// //               x="-113"
// //               y="-73"
// //               width="226"
// //               height="146"
// //               rx="12"
// //               fill="none"
// //               stroke="#6f8cff"
// //               strokeOpacity=".35"
// //               strokeDasharray="3 4"
// //             />

// //             <text
// //               x="0"
// //               y="-22"
// //               textAnchor="middle"
// //               fontSize="26"
// //               fontWeight="800"
// //               letterSpacing="3"
// //               fill="#a9bcff"
// //             >
// //               CERTIFICATE
// //             </text>

// //             <text
// //               x="0"
// //               y="-4"
// //               textAnchor="middle"
// //               fontSize="10"
// //               letterSpacing="3"
// //               fill="#7f97ee"
// //             >
// //               OF COMPLETION
// //             </text>

// //             <rect
// //               x="-70"
// //               y="14"
// //               width="140"
// //               height="5"
// //               rx="2.5"
// //               fill="#6f8cff"
// //               opacity=".35"
// //             />

// //             <rect
// //               x="-50"
// //               y="28"
// //               width="100"
// //               height="5"
// //               rx="2.5"
// //               fill="#6f8cff"
// //               opacity=".25"
// //             />

// //             <path
// //               d="M-100 62c10-22 20-26 24-14 3 9-8 20-2 18 10-3 18-22 28-20 8 2-2 14 6 12 8-2 14-10 22-8"
// //               fill="none"
// //               stroke="#8fa6ff"
// //               strokeWidth="2"
// //               strokeLinecap="round"
// //             />

// //             {/* medal */}

// //             <g transform="translate(82 52)">
// //               <path d="M-12 14-20 44l12-7 7 10 3-32Z" fill="#7c3aed" />

// //               <path d="M12 14 20 44l-12-7-7 10-3-32Z" fill="#6d28d9" />

// //               <circle
// //                 r="25"
// //                 fill={ref("gold")}
// //                 stroke="#ffe2a8"
// //                 strokeWidth="2"
// //               />

// //               <circle r="18" fill="none" stroke="#b85f12" strokeOpacity=".6" />

// //               <polygon
// //                 points="0,-10 3,-3.4 10,-3 4.5,1.7 6.2,8.6 0,4.7 -6.2,8.6 -4.5,1.7 -10,-3 -3,-3.4"
// //                 fill="#4c1d95"
// //               />
// //             </g>
// //           </g>
// //         </g>

// //         {sparkle(52, 120, 0.9, 0)}

// //         {sparkle(372, 92, 1.1, 0.8)}

// //         {sparkle(338, 238, 0.7, 1.6)}

// //         {sparkle(86, 224, 0.6, 2.2)}
// //       </svg>
// //     </div>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */

// // /*  Stat                                                                       */

// // /* -------------------------------------------------------------------------- */

// // function StatItem({
// //   stat,

// //   run,

// //   reduced,

// //   accent,

// //   muted,
// // }: {
// //   stat: Stat;

// //   run: boolean;

// //   reduced: boolean;

// //   accent: string;

// //   muted: string;
// // }) {
// //   const v = useCountUp(stat.value, run, reduced);

// //   const text =
// //     (stat.pad ? String(v).padStart(2, "0") : String(v)) + (stat.suffix ?? "");

// //   return (
// //     <div className="min-w-0 px-4 first:pl-0 sm:px-6">
// //       <p
// //         className="bg-clip-text text-2xl font-extrabold tabular-nums text-transparent sm:text-3xl"
// //         style={{
// //           backgroundImage: `linear-gradient(90deg, ${accent}, #8b5cf6)`,
// //         }}
// //       >
// //         {text}
// //       </p>

// //       <p className={`mt-1 text-xs sm:text-sm ${muted}`}>{stat.label}</p>
// //     </div>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */

// // /*  Certificate card                                                           */

// // /* -------------------------------------------------------------------------- */

// // type Tokens = (typeof THEMES)[Theme];

// // function CertCard({
// //   cert,

// //   index,

// //   recipient,

// //   accent,

// //   t,

// //   onOpen,
// // }: {
// //   cert: CertificateItem;

// //   index: number;

// //   recipient: string;

// //   accent: string;

// //   t: Tokens;

// //   onOpen: () => void;
// // }) {
// //   const spotRef = useRef<HTMLSpanElement | null>(null);

// //   const raf = useRef(0);

// //   useEffect(() => () => cancelAnimationFrame(raf.current), []);

// //   const onMove = (e: ReactPointerEvent<HTMLElement>) => {
// //     if (e.pointerType === "touch") return;

// //     const spot = spotRef.current;

// //     if (!spot) return;

// //     const r = e.currentTarget.getBoundingClientRect();

// //     const x = e.clientX - r.left;

// //     const y = e.clientY - r.top;

// //     cancelAnimationFrame(raf.current);

// //     raf.current = requestAnimationFrame(() => {
// //       spot.style.transform = `translate3d(${x - 180}px, ${y - 180}px, 0)`;
// //     });
// //   };

// //   const chip = cert.tag ?? cert.category;

// //   const chipColor = tagColor(cert.category);

// //   return (
// //     <article
// //       onPointerMove={onMove}
// //       style={{ "--i": index, "--accent": accent } as CSSProperties}
// //       className="cw-card group relative isolate min-w-0"
// //     >
// //       {/* soft glow that is revealed under the card when it lifts (opacity only = smooth) */}

// //       <span
// //         aria-hidden="true"
// //         className="pointer-events-none absolute inset-x-8 -bottom-3 -z-10 h-12 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
// //         style={{ backgroundColor: accent }}
// //       />

// //       {/* only this inner box moves, so the hover area never shifts under the cursor */}

// //       <div
// //         className={`cw-border flex h-full min-w-0 flex-col rounded-2xl border p-2.5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform group-hover:-translate-y-1.5 motion-reduce:transform-none sm:rounded-3xl sm:p-4 ${t.card}`}
// //       >
// //         <span
// //           aria-hidden="true"
// //           className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
// //         >
// //           <span
// //             ref={spotRef}
// //             className="absolute left-0 top-0 h-[360px] w-[360px] rounded-full opacity-0 transition-opacity duration-300 will-change-transform group-hover:opacity-100"
// //             style={{
// //               background: `radial-gradient(circle, ${accent}30, transparent 65%)`,
// //             }}
// //           />
// //         </span>

// //         <button
// //           type="button"
// //           onClick={onOpen}
// //           aria-label={`View ${cert.title} certificate`}
// //           className={`group/media relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-xl border shadow-lg sm:rounded-2xl ${t.preview} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]`}
// //         >
// //           {cert.image ? (
// //             <img
// //               src={cert.image.src}
// //               alt={cert.image.alt}
// //               loading="lazy"
// //               className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/media:scale-[1.05] motion-reduce:transition-none"
// //             />
// //           ) : (
// //             <div className="absolute inset-0 transition-transform duration-700 group-hover/media:scale-[1.05] motion-reduce:transition-none">
// //               <CertificateMock cert={cert} recipient={recipient} />
// //             </div>
// //           )}

// //           <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover/media:translate-x-full motion-reduce:hidden" />

// //           <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/0 transition-colors duration-300 group-hover/media:bg-slate-950/35">
// //             <span className="flex translate-y-3 items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 text-slate-900 opacity-0 shadow-lg transition-all duration-300 group-hover/media:translate-y-0 group-hover/media:opacity-100">
// //               <ExpandIcon className="h-3.5 w-3.5" />
// //               Preview
// //             </span>
// //           </span>
// //         </button>

// //         <div className="flex min-w-0 flex-1 flex-col pt-3 sm:pt-4">
// //           <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug sm:text-[17px]">
// //             {cert.title}
// //           </h3>

// //           <p
// //             className={`mt-0.5 truncate text-xs sm:mt-1 sm:text-sm ${t.muted}`}
// //           >
// //             {cert.issuer}
// //           </p>

// //           <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 sm:mt-3 sm:gap-x-3 sm:gap-y-2">
// //             <span
// //               className={`inline-flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-sm ${t.muted}`}
// //             >
// //               <CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

// //               {cert.date}
// //             </span>

// //             {chip && (
// //               <span
// //                 className="max-w-full truncate rounded-full border px-2 py-0.5 text-[10px] font-semibold sm:px-2.5 sm:py-1 sm:text-[11px]"
// //                 style={{
// //                   color: chipColor,

// //                   backgroundColor: `${chipColor}1f`,

// //                   borderColor: `${chipColor}45`,
// //                 }}
// //               >
// //                 {chip}
// //               </span>
// //             )}
// //           </div>

// //           <div className="cw-actions mt-auto pt-3 sm:pt-5">
// //             <div className="cw-btnrow">
// //               <button
// //                 type="button"
// //                 onClick={onOpen}
// //                 className={`cw-b-main flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold transition sm:h-10 sm:gap-2 sm:px-4 sm:text-sm ${t.ghost} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
// //               >
// //                 <EyeIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />

// //                 <span className="cw-short">View</span>

// //                 <span className="cw-long">View Certificate</span>
// //               </button>

// //               {cert.credentialUrl && (
// //                 <a
// //                   href={cert.credentialUrl}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   aria-label={`Verify ${cert.title} (opens in a new tab)`}
// //                   className="cw-verify cw-b-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
// //                   style={{ color: accent, borderColor: `${accent}70` }}
// //                 >
// //                   <span className="cw-vtxt">Verify</span>

// //                   <ExternalIcon className="h-3.5 w-3.5 shrink-0" />
// //                 </a>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </article>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */

// // /*  Lightbox (rendered in <body> through a portal so the close button works)   */

// // /* -------------------------------------------------------------------------- */

// // function Lightbox({
// //   items,

// //   index,

// //   recipient,

// //   accent,

// //   onChange,

// //   onClose,
// // }: {
// //   items: CertificateItem[];

// //   index: number;

// //   recipient: string;

// //   accent: string;

// //   onChange: (next: number) => void;

// //   onClose: () => void;
// // }) {
// //   const cert = items[index];

// //   const total = items.length;

// //   const touchStartX = useRef<number | null>(null);

// //   const go = useCallback(
// //     (step: number) => onChange((index + step + total) % total),

// //     [index, total, onChange],
// //   );

// //   useEffect(() => {
// //     const trigger = document.activeElement as HTMLElement | null;

// //     const onKeyDown = (event: KeyboardEvent) => {
// //       if (event.key === "Escape") onClose();

// //       if (event.key === "ArrowLeft" && total > 1) go(-1);

// //       if (event.key === "ArrowRight" && total > 1) go(1);
// //     };

// //     const prevOverflow = document.body.style.overflow;

// //     document.body.style.overflow = "hidden";

// //     window.addEventListener("keydown", onKeyDown);

// //     return () => {
// //       window.removeEventListener("keydown", onKeyDown);

// //       document.body.style.overflow = prevOverflow;

// //       trigger?.focus?.();
// //     };
// //   }, [go, onClose, total]);

// //   if (typeof document === "undefined") return null;

// //   const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

// //   const navBtn =
// //     "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:h-12 sm:w-12";

// //   return createPortal(
// //     <div
// //       role="dialog"
// //       aria-modal="true"
// //       aria-label={`${cert.title} certificate`}
// //       onClick={onClose}
// //       className="cw-fade cw-body fixed inset-0 z-[9999] flex h-[100dvh] w-screen cursor-zoom-out flex-col bg-[#03050f]/95 text-white backdrop-blur-xl"
// //     >
// //       <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-[max(1.5rem,env(safe-area-inset-top))]">
// //         <div className="min-w-0 cursor-default" onClick={stop}>
// //           <p className="break-words text-base font-semibold leading-snug sm:text-2xl">
// //             {cert.title}
// //           </p>

// //           <p className="mt-1 text-xs text-white/60 sm:text-sm">
// //             {cert.issuer} · {cert.date}
// //             {total > 1 && (
// //               <span className="tabular-nums">
// //                 {" "}
// //                 · {index + 1} / {total}
// //               </span>
// //             )}
// //           </p>
// //         </div>

// //         <button
// //           type="button"
// //           autoFocus
// //           aria-label="Close certificate"
// //           onClick={(e) => {
// //             e.stopPropagation();

// //             onClose();
// //           }}
// //           className="relative z-20 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-slate-950 shadow-lg transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
// //         >
// //           <CloseIcon className="h-5 w-5" />
// //         </button>
// //       </div>

// //       <div
// //         className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
// //         onTouchStart={(e) => {
// //           touchStartX.current = e.touches[0].clientX;
// //         }}
// //         onTouchEnd={(e) => {
// //           if (touchStartX.current === null || total < 2) return;

// //           const delta = e.changedTouches[0].clientX - touchStartX.current;

// //           touchStartX.current = null;

// //           if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
// //         }}
// //       >
// //         {total > 1 && (
// //           <button
// //             type="button"
// //             aria-label="Previous certificate"
// //             onClick={(e) => {
// //               stop(e);

// //               go(-1);
// //             }}
// //             className={`${navBtn} left-2 sm:left-5`}
// //           >
// //             <ChevronLeft className="h-5 w-5" />
// //           </button>
// //         )}

// //         {cert.image ? (
// //           <img
// //             key={cert.id}
// //             src={cert.image.src}
// //             alt={cert.image.alt}
// //             onClick={stop}
// //             className="cw-pop h-full w-full cursor-default object-contain"
// //           />
// //         ) : (
// //           <div
// //             key={cert.id}
// //             onClick={stop}
// //             className="cw-pop relative cursor-default overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10"
// //             style={{
// //               aspectRatio: "16 / 10",

// //               width: "min(100%, calc((100dvh - 11rem) * 1.6))",
// //             }}
// //           >
// //             <CertificateMock cert={cert} recipient={recipient} />
// //           </div>
// //         )}

// //         {total > 1 && (
// //           <button
// //             type="button"
// //             aria-label="Next certificate"
// //             onClick={(e) => {
// //               stop(e);

// //               go(1);
// //             }}
// //             className={`${navBtn} right-2 sm:right-5`}
// //           >
// //             <ChevronRight className="h-5 w-5" />
// //           </button>
// //         )}
// //       </div>

// //       <div className="flex shrink-0 justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-8">
// //         {cert.credentialUrl && (
// //           <a
// //             href={cert.credentialUrl}
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             onClick={stop}
// //             className="flex h-11 cursor-pointer items-center gap-2 rounded-full border px-6 text-sm font-semibold transition hover:bg-white/10"
// //             style={{ color: accent, borderColor: `${accent}80` }}
// //           >
// //             Verify credential
// //             <ExternalIcon className="h-4 w-4" />
// //           </a>
// //         )}
// //       </div>
// //     </div>,

// //     document.body,
// //   );
// // }

// // /* -------------------------------------------------------------------------- */

// // /*  Main section                                                               */

// // /* -------------------------------------------------------------------------- */

// // export default function CertificatesSection({
// //   id = "certificates",

// //   heading = "Certificates",

// //   tagline = "Learning Today,\nBuilding Tomorrow",

// //   description = "Here are some of the certificates I've earned through online courses, technical training and professional programs. Each one represents a step in my journey of continuous learning and skill development.",

// //   badgeLabel = "My Certificates",

// //   recipientName = "Md. Ahad Hossain",

// //   certificates = defaultCertificates,

// //   stats,

// //   pageSize = 6,

// //   accentColor = "#4f8bff",

// //   theme = "auto",

// //   className = "",
// // }: CertificatesSectionProps) {
// //   const siteMode = useSiteTheme(theme === "auto");

// //   const mode: Theme = theme === "auto" ? siteMode : theme;

// //   const t = THEMES[mode];

// //   const reduced = usePrefersReducedMotion();

// //   const [sectionRef, seen] = useInView<HTMLElement>();

// //   const toolbarRef = useRef<HTMLDivElement | null>(null);

// //   const list = Array.isArray(certificates) ? certificates : EMPTY;

// //   const [query, setQuery] = useState("");

// //   const [searchOpen, setSearchOpen] = useState(false);

// //   const inputRef = useRef<HTMLInputElement | null>(null);

// //   const [page, setPage] = useState(1);

// //   const [active, setActive] = useState<number | null>(null);

// //   const close = useCallback(() => setActive(null), []);

// //   useEffect(() => {
// //     if (!searchOpen) return;

// //     const id = requestAnimationFrame(() => inputRef.current?.focus());

// //     return () => cancelAnimationFrame(id);
// //   }, [searchOpen]);

// //   const closeSearch = () => {
// //     setQuery("");

// //     setPage(1);

// //     setSearchOpen(false);
// //   };

// //   const filtered = useMemo(() => {
// //     const q = query.trim().toLowerCase();

// //     if (!q) return list;

// //     return list.filter((c) =>
// //       [c.title, c.issuer, c.category, c.tag ?? "", c.date].some((v) =>
// //         v.toLowerCase().includes(q),
// //       ),
// //     );
// //   }, [list, query]);

// //   const pages = Math.max(1, Math.ceil(filtered.length / pageSize));

// //   const current = Math.min(page, pages);

// //   const offset = (current - 1) * pageSize;

// //   const visible = filtered.slice(offset, offset + pageSize);

// //   const statList: Stat[] = stats ?? [
// //     { label: "Certificates", value: list.length, suffix: "+", pad: true },

// //     {
// //       label: "Platforms",

// //       value: new Set(list.map((c) => c.issuer)).size,

// //       suffix: "+",

// //       pad: true,
// //     },

// //     { label: "Commitment", value: 100, suffix: "%" },
// //   ];

// //   const goPage = (n: number) => {
// //     setPage(n);

// //     const el = toolbarRef.current;

// //     if (el && el.getBoundingClientRect().top < 0) {
// //       el.scrollIntoView({
// //         behavior: reduced ? "auto" : "smooth",

// //         block: "start",
// //       });
// //     }
// //   };

// //   const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// //   return (
// //     <section
// //       id={id}
// //       ref={sectionRef}
// //       style={{ "--accent": accentColor } as CSSProperties}
// //       className={`cw-body relative isolate w-full overflow-hidden px-5 py-20  sm:px-6 sm:py-24 md:px-10 md:py-30 ${seen ? "cw-inview" : "cw-pre"} transition-colors duration-500 ${t.section} ${className}`}
// //     >
// //       <style>{CSS}</style>

// //       {/* background */}

// //       <div
// //         aria-hidden="true"
// //         className="pointer-events-none absolute inset-0 -z-10"
// //       >
// //         <div
// //           className="cw-drift absolute -left-40 top-0 h-[520px] w-[520px] rounded-full blur-[120px]"
// //           style={{ background: accentColor, opacity: t.glow }}
// //         />

// //         <div
// //           className="cw-drift absolute -right-40 top-1/3 h-[460px] w-[460px] rounded-full blur-[130px]"
// //           style={{
// //             background: "#7c3aed",

// //             opacity: t.glow * 0.8,

// //             animationDelay: "-8s",
// //           }}
// //         />

// //         <div
// //           className="absolute inset-0"
// //           style={{
// //             backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`,

// //             backgroundSize: "56px 56px",

// //             maskImage:
// //               "radial-gradient(ellipse at 30% 15%, #000, transparent 70%)",

// //             WebkitMaskImage:
// //               "radial-gradient(ellipse at 30% 15%, #000, transparent 70%)",
// //           }}
// //         />
// //       </div>

// //       <div className="mx-auto grid w-full max-w-7xl grid-cols-1 content-start items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-8 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:gap-x-14">
// //         {/* ------------------------------ intro ------------------------------ */}

// //         <div className="flex min-w-0 flex-col gap-6 sm:gap-7 lg:col-start-1 lg:row-start-1">
// //           <div className="cw-r" style={d(0)}>
// //             <span
// //               className="inline-flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-4 text-sm font-semibold"
// //               style={{
// //                 borderColor: `${accentColor}45`,

// //                 backgroundColor: `${accentColor}14`,
// //               }}
// //             >
// //               <span
// //                 className="flex h-8 w-8 items-center justify-center rounded-full text-white"
// //                 style={{
// //                   backgroundImage: `linear-gradient(135deg, ${accentColor}, #7c3aed)`,
// //                 }}
// //               >
// //                 <AwardIcon className="h-4 w-4" />
// //               </span>

// //               {badgeLabel}
// //             </span>
// //           </div>

// //           <div className="cw-r" style={d(90)}>
// //             <h2
// //               className={`cw-shimmer bg-gradient-to-r bg-clip-text pb-1 text-[2.75rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-transparent sm:text-6xl lg:text-5xl xl:text-6xl ${t.headingGrad}`}
// //             >
// //               {heading}
// //             </h2>
// //           </div>

// //           <p
// //             className="cw-r whitespace-pre-line text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl"
// //             style={d(180)}
// //           >
// //             {tagline}
// //           </p>

// //           <p
// //             className={`cw-r max-w-md text-[15px] leading-7 sm:leading-8 ${t.muted}`}
// //             style={d(270)}
// //           >
// //             {description}
// //           </p>

// //           <div className="cw-r" style={d(360)}>
// //             <div className={`flex divide-x ${t.divide}`}>
// //               {statList.map((s) => (
// //                 <StatItem
// //                   key={s.label}
// //                   stat={s}
// //                   run={seen}
// //                   reduced={reduced}
// //                   accent={accentColor}
// //                   muted={t.muted}
// //                 />
// //               ))}
// //             </div>
// //           </div>

// //           <div className="cw-r flex items-center gap-3" style={d(450)}>
// //             <span
// //               className="cw-script text-3xl font-bold sm:text-4xl"
// //               style={{ color: accentColor }}
// //             >
// //               Keep Learning
// //             </span>

// //             <ArrowRightIcon className="cw-nudge h-5 w-5" />
// //           </div>
// //         </div>

// //         {/* ------------------------------ right ------------------------------ */}

// //         <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
// //           <div
// //             ref={toolbarRef}
// //             className="cw-r flex scroll-mt-24 items-center justify-between gap-3"
// //             style={d(120)}
// //           >
// //             <p
// //               aria-live="polite"
// //               className={`min-w-0 flex-1 truncate text-sm ${t.muted} ${searchOpen ? "hidden sm:block" : ""}`}
// //             >
// //               {query.trim()
// //                 ? `${filtered.length} ${filtered.length === 1 ? "result" : "results"} for “${query.trim()}”`
// //                 : `${list.length} ${list.length === 1 ? "certificate" : "certificates"}`}
// //             </p>

// //             <div
// //               role="search"
// //               onBlur={(e) => {
// //                 if (
// //                   !e.currentTarget.contains(e.relatedTarget as Node | null) &&
// //                   !query
// //                 )
// //                   setSearchOpen(false);
// //               }}
// //               className={`cw-search relative flex h-11 shrink-0 items-center overflow-hidden rounded-full border transition-[width,border-color,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
// //                 searchOpen
// //                   ? "w-full sm:w-96"
// //                   : "w-11 hover:border-[var(--accent)]"
// //               } ${t.input}`}
// //             >
// //               <button
// //                 type="button"
// //                 onClick={() =>
// //                   searchOpen ? inputRef.current?.focus() : setSearchOpen(true)
// //                 }
// //                 aria-label={searchOpen ? "Search certificates" : "Open search"}
// //                 aria-expanded={searchOpen}
// //                 className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors hover:text-[var(--accent)] ${searchOpen ? t.subtle : ""}`}
// //               >
// //                 <SearchIcon className="h-5 w-5" />
// //               </button>

// //               <input
// //                 ref={inputRef}
// //                 type="text"
// //                 inputMode="search"
// //                 value={query}
// //                 tabIndex={searchOpen ? 0 : -1}
// //                 onChange={(e) => {
// //                   setQuery(e.target.value);

// //                   setPage(1);
// //                 }}
// //                 onKeyDown={(e) => {
// //                   if (e.key === "Escape") closeSearch();
// //                 }}
// //                 placeholder="Search certificates..."
// //                 aria-label="Search certificates"
// //                 className={`h-full min-w-0 flex-1 bg-transparent pr-1 text-sm outline-none transition-opacity duration-300 ${
// //                   searchOpen
// //                     ? "opacity-100 delay-200"
// //                     : "pointer-events-none opacity-0"
// //                 }`}
// //               />

// //               <button
// //                 type="button"
// //                 onClick={closeSearch}
// //                 tabIndex={searchOpen ? 0 : -1}
// //                 aria-label="Close search"
// //                 className={`mr-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${t.iconHover} ${t.subtle} ${
// //                   searchOpen
// //                     ? "opacity-100 delay-200"
// //                     : "pointer-events-none opacity-0"
// //                 }`}
// //               >
// //                 <CloseIcon className="h-4 w-4" />
// //               </button>
// //             </div>
// //           </div>

// //           {visible.length === 0 ? (
// //             <div
// //               className={`cw-r mt-5 flex flex-col items-center rounded-3xl border px-6 py-16 text-center ${t.card}`}
// //               style={d(200)}
// //             >
// //               <span
// //                 className="flex h-14 w-14 items-center justify-center rounded-2xl"
// //                 style={{
// //                   backgroundColor: `${accentColor}1c`,

// //                   color: accentColor,
// //                 }}
// //               >
// //                 <ImageIcon className="h-7 w-7" />
// //               </span>

// //               <h3 className="mt-5 text-xl font-semibold">
// //                 {list.length === 0
// //                   ? "No certificates yet"
// //                   : "No certificates found"}
// //               </h3>

// //               <p className={`mt-2 max-w-sm text-sm leading-6 ${t.muted}`}>
// //                 {list.length === 0
// //                   ? "Add items to the certificates prop to show your achievements here."
// //                   : "Try a different keyword."}
// //               </p>

// //               {list.length > 0 && (
// //                 <button
// //                   type="button"
// //                   onClick={closeSearch}
// //                   className={`mt-6 h-10 rounded-full px-5 text-sm font-semibold transition ${t.ghost}`}
// //                 >
// //                   Clear search
// //                 </button>
// //               )}
// //             </div>
// //           ) : (
// //             <div key={current} className="mt-5 grid grid-cols-2 gap-3 sm:gap-5">
// //               {visible.map((cert, i) => (
// //                 <CertCard
// //                   key={cert.id}
// //                   cert={cert}
// //                   index={i}
// //                   recipient={recipientName}
// //                   accent={accentColor}
// //                   t={t}
// //                   onOpen={() => setActive(offset + i)}
// //                 />
// //               ))}
// //             </div>
// //           )}

// //           {pages > 1 && (
// //             <nav
// //               aria-label="Certificate pages"
// //               className="cw-r mt-8 flex items-center justify-center gap-2 sm:mt-10"
// //               style={d(300)}
// //             >
// //               <button
// //                 type="button"
// //                 onClick={() => goPage(current - 1)}
// //                 disabled={current === 1}
// //                 aria-label="Previous page"
// //                 className={`flex h-10 w-10 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-35 ${t.pageBtn}`}
// //               >
// //                 <ChevronLeft className="h-4 w-4" />
// //               </button>

// //               {pageWindow(current, pages).map((n, i) =>
// //                 n === "gap" ? (
// //                   <span
// //                     key={`gap-${i}`}
// //                     className={`px-1 ${t.subtle}`}
// //                     aria-hidden="true"
// //                   >
// //                     …
// //                   </span>
// //                 ) : (
// //                   <button
// //                     key={n}
// //                     type="button"
// //                     onClick={() => goPage(n)}
// //                     aria-label={`Page ${n}`}
// //                     aria-current={n === current ? "page" : undefined}
// //                     className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold tabular-nums transition ${
// //                       n === current
// //                         ? "border-transparent text-white"
// //                         : t.pageBtn
// //                     }`}
// //                     style={
// //                       n === current
// //                         ? {
// //                             backgroundImage: `linear-gradient(135deg, ${accentColor}, #7c3aed)`,

// //                             boxShadow: `0 10px 26px -10px ${accentColor}`,
// //                           }
// //                         : undefined
// //                     }
// //                   >
// //                     {n}
// //                   </button>
// //                 ),
// //               )}

// //               <button
// //                 type="button"
// //                 onClick={() => goPage(current + 1)}
// //                 disabled={current === pages}
// //                 aria-label="Next page"
// //                 className={`flex h-10 w-10 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-35 ${t.pageBtn}`}
// //               >
// //                 <ChevronRight className="h-4 w-4" />
// //               </button>
// //             </nav>
// //           )}
// //         </div>

// //         {/* --------------------------- illustration -------------------------- */}

// //         <div
// //           className="cw-r min-w-0 self-start lg:col-start-1 lg:row-start-2"
// //           style={d(540)}
// //         >
// //           <HeroCertificate accent={accentColor} mode={mode} />
// //         </div>
// //       </div>

// //       {active !== null && filtered[active] && (
// //         <Lightbox
// //           items={filtered}
// //           index={active}
// //           recipient={recipientName}
// //           accent={accentColor}
// //           onChange={setActive}
// //           onClose={close}
// //         />
// //       )}
// //     </section>
// //   );
// // }

// import {
//   useCallback,
//   useEffect,
//   useId,
//   useMemo,
//   useRef,
//   useState,
//   type CSSProperties,
//   type PointerEvent as ReactPointerEvent,
// } from "react";

// import { createPortal } from "react-dom";
// import { Link } from "react-router-dom";

// import {
//   ArrowRight as ArrowRightIcon,
//   Award as AwardIcon,
//   Calendar as CalendarIcon,
//   ChevronLeft,
//   ChevronRight,
//   ExternalLink as ExternalIcon,
//   Eye as EyeIcon,
//   Image as ImageIcon,
//   Maximize2 as ExpandIcon,
//   Search as SearchIcon,
//   X as CloseIcon,
// } from "lucide-react";

// import {
//   certificates as defaultCertificates,
//   type CertificateItem,
// } from "../../Data/Certificates";

// export type { CertificateItem };

// /* -------------------------------------------------------------------------- */

// /*  Types                                                                      */

// /* -------------------------------------------------------------------------- */

// type Theme = "light" | "dark";

// type Stat = {
//   label: string;

//   value: number;

//   suffix?: string;

//   pad?: boolean; // 8 -> "08"*
// };

// type CertificatesSectionProps = {
//   id?: string;

//   heading?: string;

//   tagline?: string; // use \n for a line break*

//   description?: string;

//   badgeLabel?: string;

//   recipientName?: string; // printed on generated certificate previews*

//   certificates?: CertificateItem[];

//   stats?: Stat[]; // optional override of the 3 left-side stats*

//   pageSize?: number;

//   fullPage?: boolean;

//   accentColor?: string; // 6-digit hex, e.g. "#4f8bff"*

//   theme?: Theme | "auto"; // "auto" (default) follows your site light/dark mode*

//   className?: string;
// };

// const EMPTY: CertificateItem[] = [];

// /* -------------------------------------------------------------------------- */

// /*  Theme tokens                                                               */

// /* -------------------------------------------------------------------------- */

// const THEMES = {
//   dark: {
//     section: "bg-black text-white",

//     muted: "text-slate-400",

//     subtle: "text-slate-500",

//     card: "border-white/10 bg-white/[0.035]",

//     input:
//       "border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500",

//     pill: "border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:text-white",

//     ghost: "bg-white/[0.07] text-white hover:bg-white/[0.13]",

//     divide: "divide-white/10",

//     preview: "border-white/10 shadow-black/40",

//     pageBtn:
//       "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/10 hover:text-white",

//     headingGrad: "from-white via-[#a5b4fc] to-white",

//     gridLine: "rgba(255,255,255,0.045)",

//     glow: 0.3,

//     iconHover: "hover:bg-white/10",
//   },

//   light: {
//     section: "bg-white text-slate-900",

//     muted: "text-slate-600",

//     subtle: "text-slate-500",

//     card: "border-slate-200 bg-slate-50/80 shadow-sm shadow-slate-900/[0.03]",

//     input:
//       "border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400",

//     pill: "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900",

//     ghost: "bg-slate-100 text-slate-800 hover:bg-slate-200",

//     divide: "divide-slate-200",

//     preview: "border-slate-200 shadow-slate-900/10",

//     pageBtn:
//       "border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900",

//     headingGrad: "from-slate-900 via-indigo-600 to-slate-900",

//     gridLine: "rgba(15,23,42,0.06)",

//     glow: 0.1,

//     iconHover: "hover:bg-slate-200",
//   },
// } as const;

// const TAG_COLORS = [
//   "#8b5cf6",

//   "#38bdf8",

//   "#f59e0b",

//   "#34d399",

//   "#f472b6",

//   "#fb7185",
// ];

// /* -------------------------------------------------------------------------- */

// /*  CSS (fonts + animations)                                                   */

// /* -------------------------------------------------------------------------- */

// const CSS = `

// @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

// .cw-body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }

// .cw-script { font-family: 'Caveat', cursive; }

// /* entrance: hidden until the section scrolls into view */

// .cw-pre .cw-r, .cw-pre .cw-card { opacity: 0; }

// .cw-inview .cw-r { animation: cw-rise .8s cubic-bezier(.2,.7,.2,1) backwards; animation-delay: var(--d, 0ms); }

// .cw-inview .cw-card { animation: cw-rise .7s cubic-bezier(.2,.7,.2,1) backwards; animation-delay: calc(var(--i, 0) * 80ms + 120ms); }

// @keyframes cw-rise { from { opacity: 0; transform: translateY(28px) scale(.98); } to { opacity: 1; transform: none; } }

// .cw-shimmer { background-size: 200% 100%; background-repeat: repeat-x; animation: cw-shimmer 7s linear infinite; }

// @keyframes cw-shimmer { to { background-position: 200% 0; } }

// .cw-drift { animation: cw-drift 18s ease-in-out infinite; }

// @keyframes cw-drift { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(40px,30px,0); } }

// .cw-nudge { animation: cw-nudge 1.8s ease-in-out infinite; }

// @keyframes cw-nudge { 0%,100% { transform: translateX(0); } 50% { transform: translateX(6px); } }

// /* hero illustration */

// .cw-float { animation: cw-float 6s ease-in-out infinite; }

// @keyframes cw-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

// .cw-dash { animation: cw-dash 7s linear infinite; }

// @keyframes cw-dash { to { stroke-dashoffset: -440; } }

// .cw-pulse { animation: cw-pulse 3.5s ease-in-out infinite; }

// @keyframes cw-pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }

// .cw-twinkle { transform-box: fill-box; transform-origin: center; animation: cw-twinkle 3s ease-in-out infinite; }

// @keyframes cw-twinkle { 0%,100% { opacity: .2; transform: scale(.6); } 50% { opacity: 1; transform: scale(1.1); } }

// /* gradient border on cards */

// .cw-border { position: relative; isolation: isolate; }

// .cw-border::before {

//   content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px;

//   background: linear-gradient(135deg, var(--accent), transparent 40%, rgba(139,92,246,.55));

//   -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);

//   -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;

//   opacity: .28; transition: opacity .4s ease;

// }

// .cw-card:hover .cw-border::before { opacity: 1; }

// .cw-search:focus-within { border-color: var(--accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 18%, transparent); }

// .cw-verify { transition: background .25s ease, box-shadow .25s ease, transform .25s ease; }

// .cw-verify:hover { background: color-mix(in srgb, var(--accent) 14%, transparent); box-shadow: 0 8px 24px -12px var(--accent); }

// .cw-fade { animation: cw-fade .2s ease-out; }

// .cw-pop { animation: cw-pop .26s ease-out; }

// @keyframes cw-fade { from { opacity: 0 } to { opacity: 1 } }

// @keyframes cw-pop { from { opacity: 0; transform: scale(.97) } to { opacity: 1; transform: scale(1) } }

// /* card buttons adapt to the card width (container queries) */

// .cw-actions { container-type: inline-size; }

// .cw-btnrow { display: flex; gap: .5rem; }

// .cw-b-main { flex: 1 1 auto; min-width: 0; }

// .cw-long, .cw-vtxt { display: none; }

// .cw-b-alt {

//   flex: 0 0 auto; display: flex; align-items: center; justify-content: center; gap: .4rem;

//   width: 2.25rem; height: 2.25rem; border-radius: 9999px; border: 1px solid;

//   font-size: .75rem; font-weight: 600; white-space: nowrap;

// }

// @container (min-width: 170px) { .cw-b-alt { width: auto; padding: 0 .9rem; } .cw-vtxt { display: inline; } }

// @container (min-width: 270px) { .cw-short { display: none; } .cw-long { display: inline; } }

// @media (min-width: 640px) { .cw-b-alt { height: 2.5rem; font-size: .875rem; } }

// @media (prefers-reduced-motion: reduce) {

//   .cw-pre .cw-r, .cw-pre .cw-card { opacity: 1; }

//   .cw-inview .cw-r, .cw-inview .cw-card, .cw-shimmer, .cw-drift, .cw-nudge,

//   .cw-float, .cw-dash, .cw-pulse, .cw-twinkle, .cw-fade, .cw-pop { animation: none !important; }

//   .cw-body *, .cw-body *::before, .cw-body *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }

// }

// `;

// /* -------------------------------------------------------------------------- */

// /*  Helpers & hooks                                                            */

// /* -------------------------------------------------------------------------- */

// const hueOf = (s: string) => {
//   let h = 0;

//   for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 360;

//   return h;
// };

// const tagColor = (s: string) => TAG_COLORS[hueOf(s) % TAG_COLORS.length];

// function pageWindow(current: number, total: number): (number | "gap")[] {
//   if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

//   const nums = Array.from(
//     new Set([1, total, current - 1, current, current + 1]),
//   )

//     .filter((n) => n >= 1 && n <= total)

//     .sort((a, b) => a - b);

//   const out: (number | "gap")[] = [];

//   nums.forEach((n, i) => {
//     if (i > 0 && n - nums[i - 1] > 1) out.push("gap");

//     out.push(n);
//   });

//   return out;
// }

// function readSiteTheme(): Theme {
//   const root = document.documentElement;

//   const body = document.body;

//   // 1) explicit markers: class="dark" / data-theme="dark" (next-themes, Tailwind, etc.)*

//   for (const el of [root, body]) {
//     const attr = (
//       el.getAttribute("data-theme") ||
//       el.getAttribute("data-mode") ||
//       el.getAttribute("data-color-scheme") ||
//       ""
//     ).toLowerCase();

//     if (el.classList.contains("dark") || attr === "dark") return "dark";

//     if (el.classList.contains("light") || attr === "light") return "light";
//   }

//   // 2) color-scheme set on <html>*

//   const cs = root.style.colorScheme;

//   if (cs === "dark" || cs === "light") return cs;

//   // 3) how dark the page background really is*

//   for (const el of [body, root]) {
//     const m = getComputedStyle(el).backgroundColor.match(/rgba?\\(([^)]+)\\)/);

//     if (m) {
//       const [r, g, b, a = "1"] = m[1].split(/[ ,/]+/).filter(Boolean);

//       if (parseFloat(a) > 0.5) {
//         const lum = (0.299 * +r + 0.587 * +g + 0.114 * +b) / 255;

//         return lum < 0.5 ? "dark" : "light";
//       }
//     }
//   }

//   // 4) operating system preference*

//   return window.matchMedia("(prefers-color-scheme: dark)").matches
//     ? "dark"
//     : "light";
// }

// function useSiteTheme(enabled: boolean): Theme {
//   const [mode, setMode] = useState<Theme>("light");

//   useEffect(() => {
//     if (!enabled) return;

//     let timer = 0;

//     const update = () => setMode(readSiteTheme());

//     const schedule = () => {
//       update();

//       window.clearTimeout(timer);

//       timer = window.setTimeout(update, 400); // re-check after CSS transitions*
//     };

//     update();

//     const mo = new MutationObserver(schedule);

//     const opts = {
//       attributes: true,

//       attributeFilter: [
//         "class",

//         "data-theme",

//         "data-mode",

//         "data-color-scheme",

//         "style",
//       ],
//     };

//     mo.observe(document.documentElement, opts);

//     mo.observe(document.body, opts);

//     const mq = window.matchMedia("(prefers-color-scheme: dark)");

//     mq.addEventListener("change", schedule);

//     return () => {
//       mo.disconnect();

//       mq.removeEventListener("change", schedule);

//       window.clearTimeout(timer);
//     };
//   }, [enabled]);

//   return mode;
// }

// function usePrefersReducedMotion() {
//   const [reduced, setReduced] = useState(false);

//   useEffect(() => {
//     const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

//     setReduced(mq.matches);

//     const onChange = () => setReduced(mq.matches);

//     mq.addEventListener("change", onChange);

//     return () => mq.removeEventListener("change", onChange);
//   }, []);

//   return reduced;
// }

// function useInView<T extends Element>(threshold = 0.08) {
//   const ref = useRef<T | null>(null);

//   const [seen, setSeen] = useState(false);

//   useEffect(() => {
//     const el = ref.current;

//     if (!el) return;

//     if (typeof IntersectionObserver === "undefined") {
//       setSeen(true);

//       return;
//     }

//     const io = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setSeen(true);

//           io.disconnect();
//         }
//       },

//       { threshold },
//     );

//     io.observe(el);

//     return () => io.disconnect();
//   }, [threshold]);

//   return [ref, seen] as const;
// }

// function useCountUp(
//   target: number,

//   run: boolean,

//   reduced: boolean,

//   duration = 1300,
// ) {
//   const [value, setValue] = useState(0);

//   useEffect(() => {
//     if (!run) return;

//     if (reduced) {
//       setValue(target);

//       return;
//     }

//     let raf = 0;

//     const t0 = performance.now();

//     const tick = (now: number) => {
//       const p = Math.min(1, (now - t0) / duration);

//       setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));

//       if (p < 1) raf = requestAnimationFrame(tick);
//     };

//     raf = requestAnimationFrame(tick);

//     return () => cancelAnimationFrame(raf);
//   }, [target, run, reduced, duration]);

//   return value;
// }

// /* -------------------------------------------------------------------------- */

// /*  Generated certificate preview (used when no image is supplied)             */

// /* -------------------------------------------------------------------------- */

// function CertificateMock({
//   cert,

//   recipient,
// }: {
//   cert: CertificateItem;

//   recipient: string;
// }) {
//   const h = hueOf(cert.issuer);

//   const c1 = `hsl(${h} 78% 46%)`;

//   const c2 = `hsl(${(h + 40) % 360} 85% 62%)`;

//   const abs = (style: CSSProperties): CSSProperties => ({
//     position: "absolute",

//     ...style,
//   });

//   return (
//     <div
//       aria-hidden="true"
//       className="absolute inset-0 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-800"
//       style={{ containerType: "inline-size" }}
//     >
//       <div
//         style={abs({
//           right: "-10cqw",

//           top: "-10cqw",

//           width: "30cqw",

//           height: "30cqw",

//           transform: "rotate(45deg)",

//           background: `linear-gradient(135deg, ${c2}, ${c1})`,
//         })}
//       />

//       <div
//         style={abs({
//           left: 0,

//           bottom: 0,

//           width: "100%",

//           height: "1.6cqw",

//           background: `linear-gradient(90deg, ${c1}, ${c2}, transparent)`,
//         })}
//       />

//       <div
//         style={abs({
//           left: "7cqw",

//           top: "7cqw",

//           maxWidth: "60cqw",

//           fontSize: "6.4cqw",

//           fontWeight: 800,

//           letterSpacing: "-0.02em",

//           color: c1,

//           whiteSpace: "nowrap",

//           overflow: "hidden",

//           textOverflow: "ellipsis",
//         })}
//       >
//         {cert.issuer}
//       </div>

//       <div
//         style={abs({
//           left: "7cqw",

//           top: "17cqw",

//           fontSize: "3.1cqw",

//           fontWeight: 600,

//           color: c1,
//         })}
//       >
//         Certificate of Completion
//       </div>

//       <div
//         style={abs({
//           left: "7cqw",

//           top: "24cqw",

//           width: "62cqw",

//           fontSize: "5cqw",

//           fontWeight: 700,

//           lineHeight: 1.2,

//           color: "#0f172a",

//           display: "-webkit-box",

//           WebkitBoxOrient: "vertical",

//           WebkitLineClamp: 2,

//           overflow: "hidden",
//         })}
//       >
//         {cert.title}
//       </div>

//       <div style={abs({ left: "7cqw", bottom: "13cqw", maxWidth: "52cqw" })}>
//         <div style={{ fontSize: "2.4cqw", color: "#64748b" }}>Awarded to</div>

//         <div
//           style={{
//             fontSize: "4.2cqw",

//             fontWeight: 700,

//             color: "#0f172a",

//             whiteSpace: "nowrap",

//             overflow: "hidden",

//             textOverflow: "ellipsis",
//           }}
//         >
//           {recipient}
//         </div>
//       </div>

//       <div
//         style={abs({
//           left: "7cqw",

//           bottom: "5.5cqw",

//           fontSize: "2.5cqw",

//           color: "#64748b",
//         })}
//       >
//         Issued: {cert.date}
//       </div>

//       <div
//         style={abs({
//           right: "9cqw",

//           bottom: "17cqw",

//           width: "11cqw",

//           height: "11cqw",

//           borderRadius: "50%",

//           background: `radial-gradient(circle at 30% 30%, ${c2}, ${c1})`,

//           boxShadow: `0 1cqw 3cqw -1cqw ${c1}`,

//           border: "0.6cqw solid rgba(255,255,255,.85)",

//           display: "flex",

//           alignItems: "center",

//           justifyContent: "center",
//         })}
//       >
//         <svg viewBox="0 0 24 24" style={{ width: "55%", height: "55%" }}>
//           <path
//             d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z"
//             fill="#fff"
//           />
//         </svg>
//       </div>

//       <svg
//         viewBox="0 0 80 32"
//         style={abs({ right: "8cqw", bottom: "5cqw", width: "20cqw" })}
//       >
//         <path
//           d="M2 24c6-16 12-20 14-10 1 6-6 12-2 11 7-2 10-14 17-12 5 2-2 11 3 10 5-1 8-6 13-5 3 1 2 5 6 4 4-1 8-3 10-3"
//           fill="none"
//           stroke="#334155"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//         />
//       </svg>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */

// /*  Hero illustration (floating 3D-style certificate on a glowing platform)    */

// /* -------------------------------------------------------------------------- */

// function HeroCertificate({ accent, mode }: { accent: string; mode: Theme }) {
//   const light = mode === "light";

//   const topA = light ? "#eef2ff" : "#16246b";

//   const topB = light ? "#c7d2fe" : "#0a1236";

//   const baseFill = light ? "#a5b4fc" : "#060a22";

//   const sideFill = light ? "#b9c4fb" : "#0a1236";

//   const sparkFill = light ? "#818cf8" : "#cdd9ff";

//   const uid = useId().replace(/:/g, "");

//   const gid = (n: string) => `${n}-${uid}`;

//   const ref = (n: string) => `url(#${gid(n)})`;

//   const sparkle = (x: number, y: number, s: number, d: number) => (
//     <path
//       key={`${x}-${y}`}
//       className="cw-twinkle"
//       style={{ animationDelay: `${d}s` }}
//       transform={`translate(${x} ${y}) scale(${s})`}
//       d="M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8Z"
//       fill={sparkFill}
//     />
//   );

//   return (
//     <div
//       aria-hidden="true"
//       className="relative mx-auto aspect-[420/360] w-full max-w-[340px] sm:max-w-[420px]"
//     >
//       <svg viewBox="0 0 420 360" className="h-full w-full overflow-visible">
//         <defs>
//           <linearGradient id={gid("ring")} x1="0" y1="0" x2="1" y2="0">
//             <stop offset="0" stopColor={accent} />

//             <stop offset="0.55" stopColor="#8b5cf6" />

//             <stop offset="1" stopColor="#22d3ee" />
//           </linearGradient>

//           <linearGradient id={gid("card")} x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0" stopColor="#2a46a8" />

//             <stop offset="1" stopColor="#0d1740" />
//           </linearGradient>

//           <linearGradient id={gid("top")} x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0" stopColor={topA} />

//             <stop offset="1" stopColor={topB} />
//           </linearGradient>

//           <linearGradient id={gid("gold")} x1="0" y1="0" x2="1" y2="1">
//             <stop offset="0" stopColor="#ffd896" />

//             <stop offset="1" stopColor="#d9822b" />
//           </linearGradient>

//           <radialGradient id={gid("glow")} cx=".5" cy=".5" r=".5">
//             <stop
//               offset="0"
//               stopColor={accent}
//               stopOpacity={light ? ".28" : ".5"}
//             />

//             <stop offset="1" stopColor={accent} stopOpacity="0" />
//           </radialGradient>

//           <filter id={gid("blur")} x="-20%" y="-60%" width="140%" height="220%">
//             <feGaussianBlur stdDeviation="7" />
//           </filter>
//         </defs>

//         <ellipse cx="210" cy="305" rx="210" ry="62" fill={ref("glow")} />

//         {/* platform */}

//         <ellipse cx="210" cy="318" rx="170" ry="44" fill={baseFill} />

//         <rect x="40" y="296" width="340" height="22" fill={sideFill} />

//         <ellipse cx="210" cy="296" rx="170" ry="44" fill={ref("top")} />

//         <ellipse
//           className="cw-pulse"
//           cx="210"
//           cy="296"
//           rx="170"
//           ry="44"
//           fill="none"
//           stroke={ref("ring")}
//           strokeWidth="5"
//           filter={`url(#${gid("blur")})`}
//         />

//         <ellipse
//           cx="210"
//           cy="296"
//           rx="170"
//           ry="44"
//           fill="none"
//           stroke={ref("ring")}
//           strokeWidth="2.5"
//         />

//         <ellipse
//           cx="210"
//           cy="296"
//           rx="128"
//           ry="31"
//           fill="none"
//           stroke={ref("ring")}
//           strokeWidth="1.5"
//           strokeOpacity=".5"
//         />

//         {/* flowing orbit */}

//         <ellipse
//           className="cw-dash"
//           cx="210"
//           cy="205"
//           rx="190"
//           ry="54"
//           transform="rotate(-14 210 205)"
//           fill="none"
//           stroke={ref("ring")}
//           strokeWidth="2.5"
//           strokeLinecap="round"
//           strokeDasharray="120 40 20 40"
//         />

//         {/* floating certificate */}

//         <g className="cw-float">
//           <g transform="translate(210 185) rotate(-9)">
//             <rect
//               x="-125"
//               y="-85"
//               width="250"
//               height="170"
//               rx="18"
//               fill={ref("card")}
//               stroke={ref("ring")}
//               strokeWidth="1.5"
//             />

//             <rect
//               x="-113"
//               y="-73"
//               width="226"
//               height="146"
//               rx="12"
//               fill="none"
//               stroke="#6f8cff"
//               strokeOpacity=".35"
//               strokeDasharray="3 4"
//             />

//             <text
//               x="0"
//               y="-22"
//               textAnchor="middle"
//               fontSize="26"
//               fontWeight="800"
//               letterSpacing="3"
//               fill="#a9bcff"
//             >
//               CERTIFICATE
//             </text>

//             <text
//               x="0"
//               y="-4"
//               textAnchor="middle"
//               fontSize="10"
//               letterSpacing="3"
//               fill="#7f97ee"
//             >
//               OF COMPLETION
//             </text>

//             <rect
//               x="-70"
//               y="14"
//               width="140"
//               height="5"
//               rx="2.5"
//               fill="#6f8cff"
//               opacity=".35"
//             />

//             <rect
//               x="-50"
//               y="28"
//               width="100"
//               height="5"
//               rx="2.5"
//               fill="#6f8cff"
//               opacity=".25"
//             />

//             <path
//               d="M-100 62c10-22 20-26 24-14 3 9-8 20-2 18 10-3 18-22 28-20 8 2-2 14 6 12 8-2 14-10 22-8"
//               fill="none"
//               stroke="#8fa6ff"
//               strokeWidth="2"
//               strokeLinecap="round"
//             />

//             {/* medal */}

//             <g transform="translate(82 52)">
//               <path d="M-12 14-20 44l12-7 7 10 3-32Z" fill="#7c3aed" />

//               <path d="M12 14 20 44l-12-7-7 10-3-32Z" fill="#6d28d9" />

//               <circle
//                 r="25"
//                 fill={ref("gold")}
//                 stroke="#ffe2a8"
//                 strokeWidth="2"
//               />

//               <circle r="18" fill="none" stroke="#b85f12" strokeOpacity=".6" />

//               <polygon
//                 points="0,-10 3,-3.4 10,-3 4.5,1.7 6.2,8.6 0,4.7 -6.2,8.6 -4.5,1.7 -10,-3 -3,-3.4"
//                 fill="#4c1d95"
//               />
//             </g>
//           </g>
//         </g>

//         {sparkle(52, 120, 0.9, 0)}

//         {sparkle(372, 92, 1.1, 0.8)}

//         {sparkle(338, 238, 0.7, 1.6)}

//         {sparkle(86, 224, 0.6, 2.2)}
//       </svg>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */

// /*  Stat                                                                       */

// /* -------------------------------------------------------------------------- */

// function StatItem({
//   stat,

//   run,

//   reduced,

//   accent,

//   muted,
// }: {
//   stat: Stat;

//   run: boolean;

//   reduced: boolean;

//   accent: string;

//   muted: string;
// }) {
//   const v = useCountUp(stat.value, run, reduced);

//   const text =
//     (stat.pad ? String(v).padStart(2, "0") : String(v)) + (stat.suffix ?? "");

//   return (
//     <div className="min-w-0 px-4 first:pl-0 sm:px-6">
//       <p
//         className="bg-clip-text text-2xl font-extrabold tabular-nums text-transparent sm:text-3xl"
//         style={{
//           backgroundImage: `linear-gradient(90deg, ${accent}, #8b5cf6)`,
//         }}
//       >
//         {text}
//       </p>

//       <p className={`mt-1 text-xs sm:text-sm ${muted}`}>{stat.label}</p>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */

// /*  Certificate card                                                           */

// /* -------------------------------------------------------------------------- */

// type Tokens = (typeof THEMES)[Theme];

// function CertCard({
//   cert,

//   index,

//   recipient,

//   accent,

//   t,

//   onOpen,
// }: {
//   cert: CertificateItem;

//   index: number;

//   recipient: string;

//   accent: string;

//   t: Tokens;

//   onOpen: () => void;
// }) {
//   const spotRef = useRef<HTMLSpanElement | null>(null);

//   const raf = useRef(0);

//   useEffect(() => () => cancelAnimationFrame(raf.current), []);

//   const onMove = (e: ReactPointerEvent<HTMLElement>) => {
//     if (e.pointerType === "touch") return;

//     const spot = spotRef.current;

//     if (!spot) return;

//     const r = e.currentTarget.getBoundingClientRect();

//     const x = e.clientX - r.left;

//     const y = e.clientY - r.top;

//     cancelAnimationFrame(raf.current);

//     raf.current = requestAnimationFrame(() => {
//       spot.style.transform = `translate3d(${x - 180}px, ${y - 180}px, 0)`;
//     });
//   };

//   const chip = cert.tag ?? cert.category;

//   const chipColor = tagColor(cert.category);

//   return (
//     <article
//       onPointerMove={onMove}
//       style={{ "--i": index, "--accent": accent } as CSSProperties}
//       className="cw-card group relative isolate min-w-0"
//     >
//       {/* soft glow that is revealed under the card when it lifts (opacity only = smooth) */}

//       <span
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-x-8 -bottom-3 -z-10 h-12 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
//         style={{ backgroundColor: accent }}
//       />

//       {/* only this inner box moves, so the hover area never shifts under the cursor */}

//       <div
//         className={`cw-border flex h-full min-w-0 flex-col rounded-2xl border p-2.5 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform group-hover:-translate-y-1.5 motion-reduce:transform-none sm:rounded-3xl sm:p-4 ${t.card}`}
//       >
//         <span
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
//         >
//           <span
//             ref={spotRef}
//             className="absolute left-0 top-0 h-[360px] w-[360px] rounded-full opacity-0 transition-opacity duration-300 will-change-transform group-hover:opacity-100"
//             style={{
//               background: `radial-gradient(circle, ${accent}30, transparent 65%)`,
//             }}
//           />
//         </span>

//         <button
//           type="button"
//           onClick={onOpen}
//           aria-label={`View ${cert.title} certificate`}
//           className={`group/media relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-xl border shadow-lg sm:rounded-2xl ${t.preview} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]`}
//         >
//           {cert.image ? (
//             <img
//               src={cert.image.src}
//               alt={cert.image.alt}
//               loading="lazy"
//               className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/media:scale-[1.05] motion-reduce:transition-none"
//             />
//           ) : (
//             <div className="absolute inset-0 transition-transform duration-700 group-hover/media:scale-[1.05] motion-reduce:transition-none">
//               <CertificateMock cert={cert} recipient={recipient} />
//             </div>
//           )}

//           <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover/media:translate-x-full motion-reduce:hidden" />

//           <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/0 transition-colors duration-300 group-hover/media:bg-slate-950/35">
//             <span className="flex translate-y-3 items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 text-slate-900 opacity-0 shadow-lg transition-all duration-300 group-hover/media:translate-y-0 group-hover/media:opacity-100">
//               <ExpandIcon className="h-3.5 w-3.5" />
//               Preview
//             </span>
//           </span>
//         </button>

//         <div className="flex min-w-0 flex-1 flex-col pt-3 sm:pt-4">
//           <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug sm:text-[17px]">
//             {cert.title}
//           </h3>

//           <p
//             className={`mt-0.5 truncate text-xs sm:mt-1 sm:text-sm ${t.muted}`}
//           >
//             {cert.issuer}
//           </p>

//           <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 sm:mt-3 sm:gap-x-3 sm:gap-y-2">
//             <span
//               className={`inline-flex items-center gap-1.5 text-[11px] sm:gap-2 sm:text-sm ${t.muted}`}
//             >
//               <CalendarIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />

//               {cert.date}
//             </span>

//             {chip && (
//               <span
//                 className="max-w-full truncate rounded-full border px-2 py-0.5 text-[10px] font-semibold sm:px-2.5 sm:py-1 sm:text-[11px]"
//                 style={{
//                   color: chipColor,

//                   backgroundColor: `${chipColor}1f`,

//                   borderColor: `${chipColor}45`,
//                 }}
//               >
//                 {chip}
//               </span>
//             )}
//           </div>

//           <div className="cw-actions mt-auto pt-3 sm:pt-5">
//             <div className="cw-btnrow">
//               <button
//                 type="button"
//                 onClick={onOpen}
//                 className={`cw-b-main flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold transition sm:h-10 sm:gap-2 sm:px-4 sm:text-sm ${t.ghost} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
//               >
//                 <EyeIcon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />

//                 <span className="cw-short">View</span>

//                 <span className="cw-long">View Certificate</span>
//               </button>

//               {cert.credentialUrl && (
//                 <a
//                   href={cert.credentialUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={`Verify ${cert.title} (opens in a new tab)`}
//                   className="cw-verify cw-b-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
//                   style={{ color: accent, borderColor: `${accent}70` }}
//                 >
//                   <span className="cw-vtxt">Verify</span>

//                   <ExternalIcon className="h-3.5 w-3.5 shrink-0" />
//                 </a>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

// /* -------------------------------------------------------------------------- */

// /*  Lightbox (rendered in <body> through a portal so the close button works)   */

// /* -------------------------------------------------------------------------- */

// function Lightbox({
//   items,

//   index,

//   recipient,

//   accent,

//   onChange,

//   onClose,
// }: {
//   items: CertificateItem[];

//   index: number;

//   recipient: string;

//   accent: string;

//   onChange: (next: number) => void;

//   onClose: () => void;
// }) {
//   const cert = items[index];

//   const total = items.length;

//   const touchStartX = useRef<number | null>(null);

//   const go = useCallback(
//     (step: number) => onChange((index + step + total) % total),

//     [index, total, onChange],
//   );

//   useEffect(() => {
//     const trigger = document.activeElement as HTMLElement | null;

//     const onKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") onClose();

//       if (event.key === "ArrowLeft" && total > 1) go(-1);

//       if (event.key === "ArrowRight" && total > 1) go(1);
//     };

//     const prevOverflow = document.body.style.overflow;

//     document.body.style.overflow = "hidden";

//     window.addEventListener("keydown", onKeyDown);

//     return () => {
//       window.removeEventListener("keydown", onKeyDown);

//       document.body.style.overflow = prevOverflow;

//       trigger?.focus?.();
//     };
//   }, [go, onClose, total]);

//   if (typeof document === "undefined") return null;

//   const stop = (e: { stopPropagation: () => void }) => e.stopPropagation();

//   const navBtn =
//     "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:h-12 sm:w-12";

//   return createPortal(
//     <div
//       role="dialog"
//       aria-modal="true"
//       aria-label={`${cert.title} certificate`}
//       onClick={onClose}
//       className="cw-fade cw-body fixed inset-0 z-[9999] flex h-[100dvh] w-screen cursor-zoom-out flex-col bg-[#03050f]/95 text-white backdrop-blur-xl"
//     >
//       <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-[max(1.5rem,env(safe-area-inset-top))]">
//         <div className="min-w-0 cursor-default" onClick={stop}>
//           <p className="break-words text-base font-semibold leading-snug sm:text-2xl">
//             {cert.title}
//           </p>

//           <p className="mt-1 text-xs text-white/60 sm:text-sm">
//             {cert.issuer} · {cert.date}
//             {total > 1 && (
//               <span className="tabular-nums">
//                 {" "}
//                 · {index + 1} / {total}
//               </span>
//             )}
//           </p>
//         </div>

//         <button
//           type="button"
//           autoFocus
//           aria-label="Close certificate"
//           onClick={(e) => {
//             e.stopPropagation();

//             onClose();
//           }}
//           className="relative z-20 flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-slate-950 shadow-lg transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
//         >
//           <CloseIcon className="h-5 w-5" />
//         </button>
//       </div>

//       <div
//         className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
//         onTouchStart={(e) => {
//           touchStartX.current = e.touches[0].clientX;
//         }}
//         onTouchEnd={(e) => {
//           if (touchStartX.current === null || total < 2) return;

//           const delta = e.changedTouches[0].clientX - touchStartX.current;

//           touchStartX.current = null;

//           if (Math.abs(delta) > 50) go(delta > 0 ? -1 : 1);
//         }}
//       >
//         {total > 1 && (
//           <button
//             type="button"
//             aria-label="Previous certificate"
//             onClick={(e) => {
//               stop(e);

//               go(-1);
//             }}
//             className={`${navBtn} left-2 sm:left-5`}
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </button>
//         )}

//         {cert.image ? (
//           <img
//             key={cert.id}
//             src={cert.image.src}
//             alt={cert.image.alt}
//             onClick={stop}
//             className="cw-pop h-full w-full cursor-default object-contain"
//           />
//         ) : (
//           <div
//             key={cert.id}
//             onClick={stop}
//             className="cw-pop relative cursor-default overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10"
//             style={{
//               aspectRatio: "16 / 10",

//               width: "min(100%, calc((100dvh - 11rem) * 1.6))",
//             }}
//           >
//             <CertificateMock cert={cert} recipient={recipient} />
//           </div>
//         )}

//         {total > 1 && (
//           <button
//             type="button"
//             aria-label="Next certificate"
//             onClick={(e) => {
//               stop(e);

//               go(1);
//             }}
//             className={`${navBtn} right-2 sm:right-5`}
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>
//         )}
//       </div>

//       <div className="flex shrink-0 justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-8">
//         {cert.credentialUrl && (
//           <a
//             href={cert.credentialUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             onClick={stop}
//             className="flex h-11 cursor-pointer items-center gap-2 rounded-full border px-6 text-sm font-semibold transition hover:bg-white/10"
//             style={{ color: accent, borderColor: `${accent}80` }}
//           >
//             Verify credential
//             <ExternalIcon className="h-4 w-4" />
//           </a>
//         )}
//       </div>
//     </div>,

//     document.body,
//   );
// }

// /* -------------------------------------------------------------------------- */

// /*  Main section                                                               */

// /* -------------------------------------------------------------------------- */

// export default function CertificatesSection({
//   id = "certificates",

//   heading = "Certificates",

//   tagline = "Learning Today,\nBuilding Tomorrow",

//   description = "Here are some of the certificates I've earned through online courses, technical training and professional programs. Each one represents a step in my journey of continuous learning and skill development.",

//   badgeLabel = "My Certificates",

//   recipientName = "Md. Ahad Hossain",

//   certificates = defaultCertificates,

//   stats,

//   pageSize = 4,

//   fullPage = false,

//   accentColor = "#4f8bff",

//   theme = "auto",

//   className = "",
// }: CertificatesSectionProps) {
//   const siteMode = useSiteTheme(theme === "auto");

//   const mode: Theme = theme === "auto" ? siteMode : theme;

//   const t = THEMES[mode];

//   const reduced = usePrefersReducedMotion();

//   const [sectionRef, seen] = useInView<HTMLElement>();

//   const toolbarRef = useRef<HTMLDivElement | null>(null);

//   const list = Array.isArray(certificates) ? certificates : EMPTY;

//   const [query, setQuery] = useState("");

//   const [searchOpen, setSearchOpen] = useState(false);

//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const [displayedCount, setDisplayedCount] = useState(
//     fullPage ? Number.MAX_SAFE_INTEGER : pageSize,
//   );

//   const [active, setActive] = useState<number | null>(null);

//   const close = useCallback(() => setActive(null), []);

//   useEffect(() => {
//     if (!searchOpen) return;

//     const id = requestAnimationFrame(() => inputRef.current?.focus());

//     return () => cancelAnimationFrame(id);
//   }, [searchOpen]);

//   const closeSearch = () => {
//     setQuery("");

//     setDisplayedCount(fullPage ? Number.MAX_SAFE_INTEGER : pageSize);

//     setSearchOpen(false);
//   };

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();

//     if (!q) return list;

//     return list.filter((c) =>
//       [c.title, c.issuer, c.category, c.tag ?? "", c.date].some((v) =>
//         v.toLowerCase().includes(q),
//       ),
//     );
//   }, [list, query]);

//   const visible = filtered.slice(
//     0,
//     fullPage ? filtered.length : displayedCount,
//   );

//   const statList: Stat[] = stats ?? [
//     { label: "Certificates", value: list.length, suffix: "+", pad: true },

//     {
//       label: "Platforms",

//       value: new Set(list.map((c) => c.issuer)).size,

//       suffix: "+",

//       pad: true,
//     },

//     { label: "Commitment", value: 100, suffix: "%" },
//   ];

//   const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

//   useEffect(() => {
//     setDisplayedCount(fullPage ? Number.MAX_SAFE_INTEGER : pageSize);
//   }, [fullPage, pageSize]);

//   return (
//     <section
//       id={id}
//       ref={sectionRef}
//       style={{ "--accent": accentColor } as CSSProperties}
//       className={`cw-body relative isolate w-full overflow-hidden px-5 py-20  sm:px-6 sm:py-24 md:px-10 md:py-30 ${seen ? "cw-inview" : "cw-pre"} transition-colors duration-500 ${t.section} ${className}`}
//     >
//       <style>{CSS}</style>

//       {/* background */}

//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10"
//       >
//         <div
//           className="cw-drift absolute -left-40 top-0 h-[520px] w-[520px] rounded-full blur-[120px]"
//           style={{ background: accentColor, opacity: t.glow }}
//         />

//         <div
//           className="cw-drift absolute -right-40 top-1/3 h-[460px] w-[460px] rounded-full blur-[130px]"
//           style={{
//             background: "#7c3aed",

//             opacity: t.glow * 0.8,

//             animationDelay: "-8s",
//           }}
//         />

//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`,

//             backgroundSize: "56px 56px",

//             maskImage:
//               "radial-gradient(ellipse at 30% 15%, #000, transparent 70%)",

//             WebkitMaskImage:
//               "radial-gradient(ellipse at 30% 15%, #000, transparent 70%)",
//           }}
//         />
//       </div>

//       <div className="mx-auto grid w-full max-w-7xl grid-cols-1 content-start items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-8 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:gap-x-14">
//         {/* ------------------------------ intro ------------------------------ */}

//         <div className="flex min-w-0 flex-col gap-6 sm:gap-7 lg:col-start-1 lg:row-start-1">
//           <div className="cw-r" style={d(0)}>
//             <span
//               className="inline-flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-4 text-sm font-semibold"
//               style={{
//                 borderColor: `${accentColor}45`,

//                 backgroundColor: `${accentColor}14`,
//               }}
//             >
//               <span
//                 className="flex h-8 w-8 items-center justify-center rounded-full text-white"
//                 style={{
//                   backgroundImage: `linear-gradient(135deg, ${accentColor}, #7c3aed)`,
//                 }}
//               >
//                 <AwardIcon className="h-4 w-4" />
//               </span>

//               {badgeLabel}
//             </span>
//           </div>

//           <div className="cw-r" style={d(90)}>
//             <h2
//               className={`cw-shimmer bg-gradient-to-r bg-clip-text pb-1 text-[2.75rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-transparent sm:text-6xl lg:text-5xl xl:text-6xl ${t.headingGrad}`}
//             >
//               {heading}
//             </h2>
//           </div>

//           <p
//             className="cw-r whitespace-pre-line text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl"
//             style={d(180)}
//           >
//             {tagline}
//           </p>

//           <p
//             className={`cw-r max-w-md text-[15px] leading-7 sm:leading-8 ${t.muted}`}
//             style={d(270)}
//           >
//             {description}
//           </p>

//           <div className="cw-r" style={d(360)}>
//             <div className={`flex divide-x ${t.divide}`}>
//               {statList.map((s) => (
//                 <StatItem
//                   key={s.label}
//                   stat={s}
//                   run={seen}
//                   reduced={reduced}
//                   accent={accentColor}
//                   muted={t.muted}
//                 />
//               ))}
//             </div>
//           </div>

//           <div className="cw-r flex items-center gap-3" style={d(450)}>
//             <span
//               className="cw-script text-3xl font-bold sm:text-4xl"
//               style={{ color: accentColor }}
//             >
//               Keep Learning
//             </span>

//             <ArrowRightIcon className="cw-nudge h-5 w-5" />
//           </div>
//         </div>

//         {/* ------------------------------ right ------------------------------ */}

//         <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
//           <div
//             ref={toolbarRef}
//             className="cw-r flex scroll-mt-24 items-center justify-between gap-3"
//             style={d(120)}
//           >
//             {/* <p
//               aria-live="polite"
//               className={`min-w-0 flex-1 truncate text-sm ${t.muted} ${searchOpen ? "hidden sm:block" : ""}`}
//             >
//               {query.trim()
//                 ? `${filtered.length} ${filtered.length === 1 ? "result" : "results"} for “${query.trim()}”`
//                 : `${list.length} ${list.length === 1 ? "certificate" : "certificates"}`}
//             </p> */}

//             {/* <div
//               role="search"
//               onBlur={(e) => {
//                 if (
//                   !e.currentTarget.contains(e.relatedTarget as Node | null) &&
//                   !query
//                 )
//                   setSearchOpen(false);
//               }}
//               className={`cw-search relative flex h-11 shrink-0 items-center overflow-hidden rounded-full border transition-[width,border-color,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
//                 searchOpen
//                   ? "w-full sm:w-96"
//                   : "w-11 hover:border-[var(--accent)]"
//               } ${t.input}`}
//             >
//               <button
//                 type="button"
//                 onClick={() =>
//                   searchOpen ? inputRef.current?.focus() : setSearchOpen(true)
//                 }
//                 aria-label={searchOpen ? "Search certificates" : "Open search"}
//                 aria-expanded={searchOpen}
//                 className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors hover:text-[var(--accent)] ${searchOpen ? t.subtle : ""}`}
//               >
//                 <SearchIcon className="h-5 w-5" />
//               </button>

//               <input
//                 ref={inputRef}
//                 type="text"
//                 inputMode="search"
//                 value={query}
//                 tabIndex={searchOpen ? 0 : -1}
//                 onChange={(e) => {
//                   setQuery(e.target.value);

//                   setDisplayedCount(
//                     fullPage ? Number.MAX_SAFE_INTEGER : pageSize,
//                   );
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key === "Escape") closeSearch();
//                 }}
//                 placeholder="Search certificates..."
//                 aria-label="Search certificates"
//                 className={`h-full min-w-0 flex-1 bg-transparent pr-1 text-sm outline-none transition-opacity duration-300 ${
//                   searchOpen
//                     ? "opacity-100 delay-200"
//                     : "pointer-events-none opacity-0"
//                 }`}
//               />

//               <button
//                 type="button"
//                 onClick={closeSearch}
//                 tabIndex={searchOpen ? 0 : -1}
//                 aria-label="Close search"
//                 className={`mr-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${t.iconHover} ${t.subtle} ${
//                   searchOpen
//                     ? "opacity-100 delay-200"
//                     : "pointer-events-none opacity-0"
//                 }`}
//               >
//                 <CloseIcon className="h-4 w-4" />
//               </button>
//             </div> */}
//           </div>

//           {visible.length === 0 ? (
//             <div
//               className={`cw-r mt-5 flex flex-col items-center rounded-3xl border px-6 py-16 text-center ${t.card}`}
//               style={d(200)}
//             ></div>
//           ) : (
//             <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5">
//               {visible.map((cert, i) => (
//                 <CertCard
//                   key={cert.id}
//                   cert={cert}
//                   index={i}
//                   recipient={recipientName}
//                   accent={accentColor}
//                   t={t}
//                   onOpen={() => setActive(i)}
//                 />
//               ))}
//             </div>
//           )}

//           {!fullPage && list.length > 0 && (
//             <div
//               className="cw-r mt-8 flex justify-center sm:mt-10"
//               style={d(300)}
//             >
//               <Link
//                 to="/certificates"
//                 className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${t.pageBtn}`}
//                 style={{
//                   borderColor: `${accentColor}65`,
//                   backgroundImage: `linear-gradient(135deg, ${accentColor}18, #7c3aed12)`,
//                 }}
//               >
//                 View All Certificates
//                 <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* --------------------------- illustration -------------------------- */}

//         <div
//           className="cw-r min-w-0 self-start lg:col-start-1 lg:row-start-2"
//           style={d(540)}
//         >
//           <HeroCertificate accent={accentColor} mode={mode} />
//         </div>
//       </div>

//       {active !== null && filtered[active] && (
//         <Lightbox
//           items={filtered}
//           index={active}
//           recipient={recipientName}
//           accent={accentColor}
//           onChange={setActive}
//           onClose={close}
//         />
//       )}
//     </section>
//   );
// }

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Maximize2,
  X,
} from "lucide-react";

import {
  certificates as defaultCertificates,
  type CertificateItem,
} from "../../Data/Certificates";

export type { CertificateItem };

type Theme = "light" | "dark";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  pad?: boolean;
};

type CertificatesSectionProps = {
  id?: string;
  heading?: string;
  tagline?: string;
  description?: string;
  badgeLabel?: string;
  recipientName?: string;
  certificates?: CertificateItem[];
  stats?: Stat[];
  pageSize?: number;
  fullPage?: boolean;
  accentColor?: string;
  theme?: Theme | "auto";
  className?: string;
};

const EMPTY: CertificateItem[] = [];

const THEMES = {
  dark: {
    section: "bg-[#080a10] text-white",
    muted: "text-slate-400",
    card: "border-white/10 bg-white/[0.035]",
    ghost: "bg-white/[0.07] text-white hover:bg-white/[0.13]",
    divide: "divide-white/10",
    preview: "border-white/10 shadow-black/40",
    pageBtn:
      "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/10 hover:text-white",
    headingGrad: "from-white via-[#a5b4fc] to-white",
    gridLine: "rgba(255,255,255,0.045)",
    glow: 0.2,
  },
  light: {
    section: "bg-white text-slate-900",
    muted: "text-slate-600",
    card: "border-slate-200 bg-slate-50/80 shadow-sm shadow-slate-900/[0.03]",
    ghost: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    divide: "divide-slate-200",
    preview: "border-slate-200 shadow-slate-900/10",
    pageBtn:
      "border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    headingGrad: "from-slate-900 via-indigo-600 to-slate-900",
    gridLine: "rgba(15,23,42,0.06)",
    glow: 0.08,
  },
} as const;

const TAG_COLORS = [
  "#8b5cf6",
  "#38bdf8",
  "#f59e0b",
  "#34d399",
  "#f472b6",
  "#fb7185",
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

.cw-body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.cw-script {
  font-family: 'Caveat', cursive;
}

.cw-pre .cw-r,
.cw-pre .cw-card {
  opacity: 0;
}

.cw-inview .cw-r {
  animation: cw-rise .8s cubic-bezier(.2,.7,.2,1) backwards;
  animation-delay: var(--d, 0ms);
}

.cw-inview .cw-card {
  animation: cw-rise .7s cubic-bezier(.2,.7,.2,1) backwards;
  animation-delay: calc(var(--i, 0) * 80ms + 120ms);
}

@keyframes cw-rise {
  from { opacity: 0; transform: translateY(24px) scale(.98); }
  to { opacity: 1; transform: none; }
}

.cw-shimmer {
  background-size: 200% 100%;
  animation: cw-shimmer 7s linear infinite;
}

@keyframes cw-shimmer {
  to { background-position: 200% 0; }
}

.cw-drift {
  animation: cw-drift 18s ease-in-out infinite;
}

@keyframes cw-drift {
  0%,100% { transform: translate3d(0,0,0); }
  50% { transform: translate3d(35px,25px,0); }
}

.cw-nudge {
  animation: cw-nudge 1.8s ease-in-out infinite;
}

@keyframes cw-nudge {
  0%,100% { transform: translateX(0); }
  50% { transform: translateX(6px); }
}

.cw-float {
  animation: cw-float 6s ease-in-out infinite;
}

@keyframes cw-float {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.cw-twinkle {
  transform-box: fill-box;
  transform-origin: center;
  animation: cw-twinkle 3s ease-in-out infinite;
}

@keyframes cw-twinkle {
  0%,100% { opacity: .25; transform: scale(.7); }
  50% { opacity: 1; transform: scale(1.1); }
}

.cw-border {
  position: relative;
  isolation: isolate;
}

.cw-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(
    135deg,
    var(--accent),
    transparent 45%,
    rgba(139,92,246,.55)
  );
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: .25;
  transition: opacity .35s ease;
}

.cw-card:hover .cw-border::before {
  opacity: 1;
}

.cw-verify {
  transition: background .25s ease, box-shadow .25s ease, transform .25s ease;
}

.cw-verify:hover {
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  box-shadow: 0 8px 24px -12px var(--accent);
}

.cw-fade {
  animation: cw-fade .2s ease-out;
}

.cw-pop {
  animation: cw-pop .26s ease-out;
}

@keyframes cw-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes cw-pop {
  from { opacity: 0; transform: scale(.97); }
  to { opacity: 1; transform: scale(1); }
}

.cw-actions {
  container-type: inline-size;
}

.cw-btnrow {
  display: flex;
  gap: .5rem;
}

.cw-b-main {
  flex: 1 1 auto;
  min-width: 0;
}

.cw-b-alt {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: .4rem;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid;
  border-radius: 9999px;
  font-size: .75rem;
  font-weight: 600;
  white-space: nowrap;
}

.cw-vtxt,
.cw-long {
  display: none;
}

@container (min-width: 170px) {
  .cw-b-alt {
    width: auto;
    padding: 0 .8rem;
  }

  .cw-vtxt {
    display: inline;
  }
}

@container (min-width: 270px) {
  .cw-short {
    display: none;
  }

  .cw-long {
    display: inline;
  }
}

@media (min-width: 640px) {
  .cw-b-alt {
    height: 2.5rem;
    font-size: .875rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cw-pre .cw-r,
  .cw-pre .cw-card {
    opacity: 1;
  }

  .cw-inview .cw-r,
  .cw-inview .cw-card,
  .cw-shimmer,
  .cw-drift,
  .cw-nudge,
  .cw-float,
  .cw-twinkle,
  .cw-fade,
  .cw-pop {
    animation: none !important;
  }

  .cw-body *,
  .cw-body *::before,
  .cw-body *::after {
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
}
`;

function hueOf(value: string) {
  let hue = 0;

  for (let i = 0; i < value.length; i++) {
    hue = (hue * 31 + value.charCodeAt(i)) % 360;
  }

  return hue;
}

function tagColor(value: string) {
  return TAG_COLORS[hueOf(value) % TAG_COLORS.length];
}

function readSiteTheme(): Theme {
  const root = document.documentElement;
  const body = document.body;

  for (const element of [root, body]) {
    const attr = (
      element.getAttribute("data-theme") ||
      element.getAttribute("data-mode") ||
      element.getAttribute("data-color-scheme") ||
      ""
    ).toLowerCase();

    if (element.classList.contains("dark") || attr === "dark") {
      return "dark";
    }

    if (element.classList.contains("light") || attr === "light") {
      return "light";
    }
  }

  const colorScheme = root.style.colorScheme;

  if (colorScheme === "dark" || colorScheme === "light") {
    return colorScheme;
  }

  for (const element of [body, root]) {
    const match =
      getComputedStyle(element).backgroundColor.match(/rgba?\(([^)]+)\)/);

    if (match) {
      const [r, g, b, alpha = "1"] = match[1].split(/[ ,/]+/).filter(Boolean);

      if (Number.parseFloat(alpha) > 0.5) {
        const luminance =
          (0.299 * Number(r) + 0.587 * Number(g) + 0.114 * Number(b)) / 255;

        return luminance < 0.5 ? "dark" : "light";
      }
    }
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useSiteTheme(enabled: boolean): Theme {
  const [mode, setMode] = useState<Theme>("light");

  useEffect(() => {
    if (!enabled) return;

    let timer = 0;

    const update = () => setMode(readSiteTheme());

    const schedule = () => {
      update();
      window.clearTimeout(timer);
      timer = window.setTimeout(update, 400);
    };

    update();

    const observer = new MutationObserver(schedule);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [
        "class",
        "data-theme",
        "data-mode",
        "data-color-scheme",
        "style",
      ],
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: [
        "class",
        "data-theme",
        "data-mode",
        "data-color-scheme",
        "style",
      ],
    });

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    media.addEventListener("change", schedule);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", schedule);
      window.clearTimeout(timer);
    };
  }, [enabled]);

  return mode;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setReduced(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useInView<T extends Element>(threshold = 0.08) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, seen] as const;
}

function useCountUp(
  target: number,
  run: boolean,
  reduced: boolean,
  duration = 1300,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;

    if (reduced) {
      setValue(target);
      return;
    }

    let animationFrame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);

      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, run, reduced, duration]);

  return value;
}

/* -------------------------------------------------------------------------- */
/* Generated certificate preview                                              */
/* -------------------------------------------------------------------------- */

function CertificateMock({
  cert,
  recipient,
}: {
  cert: CertificateItem;
  recipient: string;
}) {
  const hue = hueOf(cert.issuer);
  const primary = `hsl(${hue} 78% 46%)`;
  const secondary = `hsl(${(hue + 40) % 360} 85% 62%)`;

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-800"
      style={{ containerType: "inline-size" }}
    >
      <div
        className="absolute -right-[10cqw] -top-[10cqw] h-[30cqw] w-[30cqw] rotate-45"
        style={{
          background: `linear-gradient(135deg, ${secondary}, ${primary})`,
        }}
      />

      <div
        className="absolute bottom-0 left-0 h-[1.6cqw] w-full"
        style={{
          background: `linear-gradient(90deg, ${primary}, ${secondary}, transparent)`,
        }}
      />

      <div
        className="absolute left-[7cqw] top-[7cqw] max-w-[60cqw] truncate text-[6.4cqw] font-extrabold"
        style={{ color: primary }}
      >
        {cert.issuer}
      </div>

      <div
        className="absolute left-[7cqw] top-[17cqw] text-[3.1cqw] font-semibold"
        style={{ color: primary }}
      >
        Certificate of Completion
      </div>

      <div className="absolute left-[7cqw] top-[24cqw] line-clamp-2 w-[62cqw] text-[5cqw] font-bold leading-tight">
        {cert.title}
      </div>

      <div className="absolute bottom-[13cqw] left-[7cqw] max-w-[52cqw]">
        <p className="text-[2.4cqw] text-slate-500">Awarded to</p>
        <p className="truncate text-[4.2cqw] font-bold">{recipient}</p>
      </div>

      <p className="absolute bottom-[5.5cqw] left-[7cqw] text-[2.5cqw] text-slate-500">
        Issued: {cert.date}
      </p>

      <div
        className="absolute bottom-[17cqw] right-[9cqw] flex h-[11cqw] w-[11cqw] items-center justify-center rounded-full border-[0.6cqw] border-white/85"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${secondary}, ${primary})`,
          boxShadow: `0 1cqw 3cqw -1cqw ${primary}`,
        }}
      >
        <Award className="h-1/2 w-1/2 text-white" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero illustration                                                          */
/* -------------------------------------------------------------------------- */

function HeroCertificate({ accent, mode }: { accent: string; mode: Theme }) {
  const light = mode === "light";
  const uid = useId().replace(/:/g, "");
  const gradientId = `certificate-gradient-${uid}`;

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[420/360] w-full max-w-[340px] sm:max-w-[420px]"
    >
      <svg viewBox="0 0 420 360" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={accent} />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>

          <radialGradient id={`${gradientId}-glow`}>
            <stop
              offset="0"
              stopColor={accent}
              stopOpacity={light ? "0.25" : "0.5"}
            />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse
          cx="210"
          cy="305"
          rx="210"
          ry="62"
          fill={`url(#${gradientId}-glow)`}
        />

        <ellipse
          cx="210"
          cy="318"
          rx="170"
          ry="44"
          fill={light ? "#c7d2fe" : "#10152c"}
        />

        <ellipse
          cx="210"
          cy="296"
          rx="170"
          ry="44"
          fill={light ? "#eef2ff" : "#111a3d"}
          stroke={`url(#${gradientId})`}
          strokeWidth="2.5"
        />

        <ellipse
          cx="210"
          cy="205"
          rx="190"
          ry="54"
          transform="rotate(-14 210 205)"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          strokeDasharray="120 40 20 40"
        />

        <g className="cw-float">
          <g transform="translate(210 185) rotate(-9)">
            <rect
              x="-125"
              y="-85"
              width="250"
              height="170"
              rx="18"
              fill={light ? "#172554" : "#101a46"}
              stroke={`url(#${gradientId})`}
              strokeWidth="2"
            />

            <rect
              x="-113"
              y="-73"
              width="226"
              height="146"
              rx="12"
              fill="none"
              stroke="#93a9ff"
              strokeOpacity=".45"
              strokeDasharray="3 4"
            />

            <text
              x="0"
              y="-22"
              textAnchor="middle"
              fontSize="26"
              fontWeight="800"
              letterSpacing="3"
              fill="#c7d2fe"
            >
              CERTIFICATE
            </text>

            <text
              x="0"
              y="-4"
              textAnchor="middle"
              fontSize="10"
              letterSpacing="3"
              fill="#a5b4fc"
            >
              OF COMPLETION
            </text>

            <rect
              x="-70"
              y="14"
              width="140"
              height="5"
              rx="2.5"
              fill="#a5b4fc"
              opacity=".45"
            />

            <rect
              x="-50"
              y="28"
              width="100"
              height="5"
              rx="2.5"
              fill="#a5b4fc"
              opacity=".3"
            />

            <g transform="translate(82 52)">
              <path d="M-12 14-20 44l12-7 7 10 3-32Z" fill="#7c3aed" />
              <path d="M12 14 20 44l-12-7-7 10-3-32Z" fill="#6d28d9" />
              <circle r="25" fill="#fbbf24" stroke="#fde68a" strokeWidth="2" />
              <circle r="18" fill="none" stroke="#b45309" strokeOpacity=".6" />
              <polygon
                points="0,-10 3,-3.4 10,-3 4.5,1.7 6.2,8.6 0,4.7 -6.2,8.6 -4.5,1.7 -10,-3 -3,-3.4"
                fill="#4c1d95"
              />
            </g>
          </g>
        </g>

        {[
          [52, 120],
          [372, 92],
          [338, 238],
          [86, 224],
        ].map(([x, y], index) => (
          <path
            key={`${x}-${y}`}
            className="cw-twinkle"
            style={{ animationDelay: `${index * 0.6}s` }}
            transform={`translate(${x} ${y})`}
            d="M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8Z"
            fill={accent}
          />
        ))}
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Statistics                                                                 */
/* -------------------------------------------------------------------------- */

function StatItem({
  stat,
  run,
  reduced,
  accent,
  muted,
}: {
  stat: Stat;
  run: boolean;
  reduced: boolean;
  accent: string;
  muted: string;
}) {
  const value = useCountUp(stat.value, run, reduced);

  const text =
    (stat.pad ? String(value).padStart(2, "0") : String(value)) +
    (stat.suffix ?? "");

  return (
    <div className="min-w-0 px-4 first:pl-0 sm:px-6">
      <p
        className="bg-clip-text text-2xl font-extrabold tabular-nums text-transparent sm:text-3xl"
        style={{
          backgroundImage: `linear-gradient(90deg, ${accent}, #8b5cf6)`,
        }}
      >
        {text}
      </p>

      <p className={`mt-1 text-xs sm:text-sm ${muted}`}>{stat.label}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Certificate card                                                           */
/* -------------------------------------------------------------------------- */

type Tokens = (typeof THEMES)[Theme];

function CertCard({
  cert,
  index,
  recipient,
  accent,
  t,
  onOpen,
}: {
  cert: CertificateItem;
  index: number;
  recipient: string;
  accent: string;
  t: Tokens;
  onOpen: () => void;
}) {
  const chip = cert.tag ?? cert.category;
  const chipColor = tagColor(cert.category);

  return (
    <article
      style={{ "--i": index, "--accent": accent } as CSSProperties}
      className="cw-card group relative isolate min-w-0"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 -bottom-3 -z-10 h-12 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
        style={{ backgroundColor: accent }}
      />

      <div
        className={`cw-border flex h-full min-w-0 flex-col rounded-2xl border p-2.5 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 motion-reduce:transform-none sm:rounded-3xl sm:p-4 ${t.card}`}
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={`View ${cert.title} certificate`}
          className={`group/media relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-xl border shadow-lg sm:rounded-2xl ${t.preview} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]`}
        >
          {cert.image ? (
            <img
              src={cert.image.src}
              alt={cert.image.alt}
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/media:scale-105 motion-reduce:transition-none"
            />
          ) : (
            <div className="absolute inset-0 transition-transform duration-700 group-hover/media:scale-105 motion-reduce:transition-none">
              <CertificateMock cert={cert} recipient={recipient} />
            </div>
          )}

          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/0 transition-colors duration-300 group-hover/media:bg-slate-950/35">
            <span className="flex translate-y-3 items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 opacity-0 shadow-lg transition-all duration-300 group-hover/media:translate-y-0 group-hover/media:opacity-100 sm:px-4 sm:py-2">
              <Maximize2 className="h-3.5 w-3.5" />
              Preview
            </span>
          </span>
        </button>

        <div className="flex min-w-0 flex-1 flex-col pt-3 sm:pt-4">
          <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug sm:text-[17px]">
            {cert.title}
          </h3>

          <p className={`mt-1 truncate text-xs sm:text-sm ${t.muted}`}>
            {cert.issuer}
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] sm:text-sm ${t.muted}`}
            >
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {cert.date}
            </span>

            {chip && (
              <span
                className="max-w-full truncate rounded-full border px-2 py-0.5 text-[10px] font-semibold sm:px-2.5 sm:py-1 sm:text-[11px]"
                style={{
                  color: chipColor,
                  backgroundColor: `${chipColor}1f`,
                  borderColor: `${chipColor}45`,
                }}
              >
                {chip}
              </span>
            )}
          </div>

          <div className="cw-actions mt-auto pt-3 sm:pt-5">
            <div className="cw-btnrow">
              <button
                type="button"
                onClick={onOpen}
                className={`cw-b-main flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold transition sm:h-10 sm:gap-2 sm:px-4 sm:text-sm ${t.ghost} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
              >
                <Eye className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                <span className="cw-short">View</span>
                <span className="cw-long">View Certificate</span>
              </button>

              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${cert.title} (opens in a new tab)`}
                  className="cw-verify cw-b-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  style={{
                    color: accent,
                    borderColor: `${accent}70`,
                  }}
                >
                  <span className="cw-vtxt">Verify</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* Lightbox                                                                   */
/* -------------------------------------------------------------------------- */

function Lightbox({
  items,
  index,
  recipient,
  accent,
  onChange,
  onClose,
}: {
  items: CertificateItem[];
  index: number;
  recipient: string;
  accent: string;
  onChange: (next: number) => void;
  onClose: () => void;
}) {
  const cert = items[index];
  const total = items.length;
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (step: number) => {
      if (total < 2) return;
      onChange((index + step + total) % total);
    },
    [index, total, onChange],
  );

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus?.();
    };
  }, [go, onClose]);

  if (typeof document === "undefined" || !cert) return null;

  const stop = (event: React.MouseEvent) => event.stopPropagation();

  const navButton =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md transition hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:h-12 sm:w-12";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} certificate`}
      onClick={onClose}
      className="cw-fade cw-body fixed inset-0 z-[9999] flex h-[100dvh] w-screen cursor-zoom-out flex-col bg-[#03050f]/95 text-white backdrop-blur-xl"
    >
      <div className="flex shrink-0 items-start justify-between gap-3 px-4 pb-3 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-[max(1.5rem,env(safe-area-inset-top))]">
        <div className="min-w-0 cursor-default" onClick={stop}>
          <p className="break-words text-base font-semibold leading-snug sm:text-2xl">
            {cert.title}
          </p>

          <p className="mt-1 text-xs text-white/60 sm:text-sm">
            {cert.issuer} · {cert.date}
            {total > 1 && (
              <span className="tabular-nums">
                {" "}
                · {index + 1} / {total}
              </span>
            )}
          </p>
        </div>

        <button
          type="button"
          autoFocus
          aria-label="Close certificate"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="relative z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0].clientX;
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
            aria-label="Previous certificate"
            onClick={(event) => {
              stop(event);
              go(-1);
            }}
            className={`${navButton} left-2 sm:left-5`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {cert.image ? (
          <img
            key={cert.id}
            src={cert.image.src}
            alt={cert.image.alt}
            onClick={stop}
            className="cw-pop h-full w-full cursor-default object-contain"
          />
        ) : (
          <div
            key={cert.id}
            onClick={stop}
            className="cw-pop relative cursor-default overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10"
            style={{
              aspectRatio: "16 / 10",
              width: "min(100%, calc((100dvh - 11rem) * 1.6))",
            }}
          >
            <CertificateMock cert={cert} recipient={recipient} />
          </div>
        )}

        {total > 1 && (
          <button
            type="button"
            aria-label="Next certificate"
            onClick={(event) => {
              stop(event);
              go(1);
            }}
            className={`${navButton} right-2 sm:right-5`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex shrink-0 justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-8">
        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stop}
            className="flex h-11 items-center gap-2 rounded-full border px-6 text-sm font-semibold transition hover:bg-white/10"
            style={{
              color: accent,
              borderColor: `${accent}80`,
            }}
          >
            Verify credential
            <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>,
    document.body,
  );
}

/* -------------------------------------------------------------------------- */
/* Main section                                                               */
/* -------------------------------------------------------------------------- */

export default function CertificatesSection({
  id = "certificates",
  tagline = "Learning Today,\nBuilding Tomorrow",
  description = "Here are some of the certificates I've earned through online courses, technical training and professional programs. Each one represents a step in my journey of continuous learning and skill development.",
  badgeLabel = "My Certificates",
  recipientName = "Md. Ahad Hossain",
  certificates = defaultCertificates,
  stats,
  pageSize = 4,
  fullPage = false,
  accentColor = "#4f8bff",
  theme = "auto",
  className = "",
}: CertificatesSectionProps) {
  const siteMode = useSiteTheme(theme === "auto");
  const mode: Theme = theme === "auto" ? siteMode : theme;
  const t = THEMES[mode];

  const reduced = usePrefersReducedMotion();
  const [sectionRef, seen] = useInView<HTMLElement>();

  const list = Array.isArray(certificates) ? certificates : EMPTY;

  const [displayedCount, setDisplayedCount] = useState(
    fullPage ? Number.MAX_SAFE_INTEGER : pageSize,
  );

  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    setDisplayedCount(fullPage ? Number.MAX_SAFE_INTEGER : pageSize);
  }, [fullPage, pageSize]);

  const visible = fullPage ? list : list.slice(0, displayedCount);

  const statList: Stat[] = stats ?? [
    {
      label: "Certificates",
      value: list.length,
      suffix: "+",
      pad: true,
    },
    {
      label: "Platforms",
      value: new Set(list.map((certificate) => certificate.issuer)).size,
      suffix: "+",
      pad: true,
    },
    {
      label: "Commitment",
      value: 100,
      suffix: "%",
    },
  ];

  const d = (milliseconds: number) =>
    ({ "--d": `${milliseconds}ms` }) as CSSProperties;

  return (
    <section
      id={id}
      ref={sectionRef}
      style={{ "--accent": accentColor } as CSSProperties}
      className={`cw-body relative isolate w-full overflow-hidden px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-30 ${
        seen ? "cw-inview" : "cw-pre"
      } transition-colors duration-500 ${t.section} ${className}`}
    >
      <style>{CSS}</style>

      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="cw-drift absolute -left-40 top-0 h-[520px] w-[520px] rounded-full blur-[120px]"
          style={{ background: accentColor, opacity: t.glow }}
        />

        <div
          className="cw-drift absolute -right-40 top-1/3 h-[460px] w-[460px] rounded-full blur-[130px]"
          style={{
            background: "#7c3aed",
            opacity: t.glow * 0.8,
            animationDelay: "-8s",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${t.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${t.gridLine} 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at 30% 15%, #000, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 30% 15%, #000, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 content-start items-start gap-8 sm:gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-8 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)] xl:gap-x-14">
        {/* Intro */}
        <div className="flex min-w-0 flex-col gap-6 sm:gap-7 lg:col-start-1 lg:row-start-1">
          <div className="cw-r" style={d(0)}>
            <span
              className="inline-flex items-center gap-3 rounded-full border py-1.5 pl-1.5 pr-4 text-sm font-semibold"
              style={{
                borderColor: `${accentColor}45`,
                backgroundColor: `${accentColor}14`,
              }}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${accentColor}, #7c3aed)`,
                }}
              >
                <Award className="h-4 w-4" />
              </span>

              {badgeLabel}
            </span>
          </div>

          <p
            className="cw-r whitespace-pre-line text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl"
            style={d(180)}
          >
            {tagline}
          </p>

          <p
            className={`cw-r max-w-md text-[15px] leading-7 sm:leading-8 ${t.muted}`}
            style={d(270)}
          >
            {description}
          </p>

          <div className="cw-r" style={d(360)}>
            <div className={`flex divide-x ${t.divide}`}>
              {statList.map((stat) => (
                <StatItem
                  key={stat.label}
                  stat={stat}
                  run={seen}
                  reduced={reduced}
                  accent={accentColor}
                  muted={t.muted}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Certificate list */}
        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div
            className="cw-r flex items-center justify-end gap-3"
            style={d(120)}
          >
            <p aria-live="polite" className={`text-sm ${t.muted}`}>
              {list.length} {list.length === 1 ? "certificate" : "certificates"}
            </p>
          </div>

          {visible.length === 0 ? (
            <div
              className={`cw-r mt-5 flex flex-col items-center rounded-3xl border px-6 py-16 text-center ${t.card}`}
              style={d(200)}
            >
              <Award
                className="mb-4 h-10 w-10"
                style={{ color: accentColor }}
              />

              <h3 className="text-lg font-semibold">No Certificates Yet</h3>

              <p className={`mt-2 max-w-sm text-sm ${t.muted}`}>
                Certificates will appear here when they are added.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5">
              {visible.map((certificate, index) => (
                <CertCard
                  key={certificate.id}
                  cert={certificate}
                  index={index}
                  recipient={recipientName}
                  accent={accentColor}
                  t={t}
                  onOpen={() => setActive(index)}
                />
              ))}
            </div>
          )}

          {!fullPage && list.length > 0 && (
            <div
              className="cw-r mt-8 flex justify-center sm:mt-10"
              style={d(300)}
            >
              <Link
                to="/certificates"
                className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${t.pageBtn}`}
                style={{
                  borderColor: `${accentColor}65`,
                  backgroundImage: `linear-gradient(135deg, ${accentColor}18, #7c3aed12)`,
                }}
              >
                View All Certificates
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>

        {/* Illustration */}
        <div
          className="cw-r min-w-0 self-start lg:col-start-1 lg:row-start-2"
          style={d(540)}
        >
          <HeroCertificate accent={accentColor} mode={mode} />
        </div>
      </div>

      {active !== null && visible[active] && (
        <Lightbox
          items={visible}
          index={active}
          recipient={recipientName}
          accent={accentColor}
          onChange={setActive}
          onClose={close}
        />
      )}
    </section>
  );
}
