// import { useEffect, useRef, useState } from "react";
// import type { FC } from "react";
// import { createPortal } from "react-dom";
// import toast, { Toaster } from "react-hot-toast";

// import {
//   ArrowRight,
//   ArrowUpRight,
//   BookOpen,
//   Calendar,
//   Check,
//   ChevronDown,
//   Clock,
//   Download,
//   Eye,
//   Link2,
//   X,
//   ListChecks,
//   Users,
//   ShieldCheck,
//   LoaderCircle,
// } from "lucide-react";

// import type { Article } from "../../Data/articles";

// import {
//   articles,
//   TAG_ICONS,
//   DEFAULT_TAG_ICON,
//   INITIAL_COUNT,
//   STEP,
// } from "../../Data/articles";

// import SectionEyebrow from "../../common/SectionEyebrow";

// /* ---------- Constants ---------- */

// const GRID = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8";

// const firstBatch = articles.slice(0, INITIAL_COUNT);

// const extraBatches: Article[][] = [];

// for (let i = INITIAL_COUNT; i < articles.length; i += STEP) {
//   extraBatches.push(articles.slice(i, i + STEP));
// }

// /* ---------- Reveal on scroll ---------- */

// function useInView<T extends HTMLElement>() {
//   const ref = useRef<T | null>(null);
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const io = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setInView(true);
//           io.disconnect();
//         }
//       },
//       { threshold: 0.12 },
//     );

//     io.observe(el);

//     return () => io.disconnect();
//   }, []);

//   return { ref, inView };
// }

// /* ---------- Summary Modal ---------- */

// const SummaryModal: FC<{
//   article: Article;
//   onClose: () => void;
// }> = ({ article, onClose }) => {
//   const summary = article.summary;

//   const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
//   const [isDownloading, setIsDownloading] = useState(false);

//   useEffect(() => {
//     const onKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         if (imagePreviewOpen) {
//           setImagePreviewOpen(false);
//         } else {
//           onClose();
//         }
//       }
//     };

//     document.addEventListener("keydown", onKeyDown);

//     const previousBodyOverflow = document.body.style.overflow;
//     const previousHtmlOverflow = document.documentElement.style.overflow;

//     document.body.style.overflow = "hidden";
//     document.documentElement.style.overflow = "hidden";

//     return () => {
//       document.removeEventListener("keydown", onKeyDown);

//       document.body.style.overflow = previousBodyOverflow;
//       document.documentElement.style.overflow = previousHtmlOverflow;
//     };
//   }, [onClose, imagePreviewOpen]);

//   if (!summary) return null;

//   return createPortal(
//     <div
//       className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden overscroll-none bg-slate-950/65 p-4 backdrop-blur-sm"
//       role="presentation"
//       onMouseDown={(event) => {
//         if (event.target === event.currentTarget) {
//           onClose();
//         }
//       }}
//     >
//       {/* Summary Card */}

//       <section
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="project-summary-title"
//         className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-black/30 dark:border-white/10 dark:bg-[#101522]"
//       >
//         {/* Header */}

//         <div className="relative shrink-0 border-b border-slate-200 bg-slate-50 px-6 py-6 pr-16 dark:border-white/10 dark:bg-white/[0.04] sm:px-8">
//           <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300">
//             <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
//             PROJECT SUMMARY
//           </span>

//           <h2
//             id="project-summary-title"
//             className="text-xl font-bold leading-snug text-slate-900 dark:text-white sm:text-2xl"
//           >
//             {article.title}
//           </h2>

//           <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
//             {article.excerpt}
//           </p>

//           {/* Close Button */}

//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close summary"
//             className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:rotate-90 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Scrollable Content */}

//         <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
//           {/* Image Preview and Download */}

//           {article.image && (
//             <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]">
//               <button
//                 type="button"
//                 onClick={() => setImagePreviewOpen(true)}
//                 className="group relative block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-sky-500"
//                 aria-label={`Preview image for ${article.title}`}
//               >
//                 <img
//                   src={article.image}
//                   alt={`Workflow preview for ${article.title}`}
//                   className="max-h-64 w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
//                 />

//                 <span className="absolute inset-0 flex items-center justify-center bg-slate-950/0 text-white opacity-0 transition group-hover:bg-slate-950/35 group-hover:opacity-100">
//                   <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/75 px-4 py-2 text-sm font-semibold backdrop-blur">
//                     <Eye className="h-4 w-4" />
//                     Preview image
//                   </span>
//                 </span>
//               </button>

//               <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 dark:border-white/10">
//                 <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
//                   Project workflow image
//                 </span>

//                 {/* Download Button */}

//                 <a
//                   href={article.image}
//                   download
//                   onClick={() => {
//                     if (isDownloading) return;

//                     setIsDownloading(true);

//                     window.setTimeout(() => {
//                       setIsDownloading(false);
//                     }, 1500);
//                   }}
//                   aria-busy={isDownloading}
//                   className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-slate-900 px-3 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#2a7fa3] hover:text-white dark:bg-white dark:text-slate-900 dark:hover:bg-[#2a7fa3] dark:hover:text-white"
//                 >
//                   {isDownloading ? (
//                     <>
//                       <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
//                       Downloading...
//                     </>
//                   ) : (
//                     <>
//                       <Download className="h-3.5 w-3.5" />
//                       Download
//                     </>
//                   )}
//                 </a>
//               </div>
//             </div>
//           )}

//           {/* Overview */}

//           <div>
//             <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
//               <BookOpen className="h-4 w-4 text-sky-500" />
//               Project Overview
//             </h3>

//             <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
//               {summary.overview}
//             </p>
//           </div>

//           {/* Highlights */}

//           <div>
//             <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
//               <ShieldCheck className="h-4 w-4 text-emerald-500" />
//               Key Highlights
//             </h3>

//             <ul className="grid gap-3 sm:grid-cols-2">
//               {summary.highlights.map((item) => (
//                 <li
//                   key={item}
//                   className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300"
//                 >
//                   <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
//                   {item}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Workflow */}

//           <div>
//             <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
//               <ListChecks className="h-4 w-4 text-sky-500" />
//               Workflow Process
//             </h3>

//             <ol className="space-y-3">
//               {summary.workflow.map((item, index) => (
//                 <li
//                   key={item}
//                   className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
//                 >
//                   <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
//                     {index + 1}
//                   </span>

//                   {item}
//                 </li>
//               ))}
//             </ol>
//           </div>

//           {/* Outcomes */}

//           {summary.outcomes.length > 0 && (
//             <div>
//               <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
//                 <Users className="h-4 w-4 text-violet-500" />
//                 Expected Outcomes
//               </h3>

//               <ul className="space-y-2">
//                 {summary.outcomes.map((item) => (
//                   <li
//                     key={item}
//                     className="flex items-start gap-2.5 text-sm leading-6 text-slate-600 dark:text-slate-300"
//                   >
//                     <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Tags */}

//           <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-5 dark:border-white/10">
//             {article.tags.map((tag) => (
//               <span
//                 key={tag}
//                 className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Full Image Preview */}

//       {imagePreviewOpen && (
//         <div
//           className="fixed inset-0 z-[310] flex items-center justify-center bg-black/90 p-4"
//           role="presentation"
//           onMouseDown={(event) => {
//             if (event.target === event.currentTarget) {
//               setImagePreviewOpen(false);
//             }
//           }}
//         >
//           <div className="relative flex max-h-[92dvh] w-full max-w-6xl flex-col items-center">
//             <button
//               type="button"
//               onClick={() => setImagePreviewOpen(false)}
//               aria-label="Close image preview"
//               className="absolute -right-1 -top-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:rotate-90 hover:bg-white/20 sm:right-0"
//             >
//               <X className="h-5 w-5" />
//             </button>

//             <img
//               src={article.image}
//               alt={`Full preview of ${article.title}`}
//               className="max-h-[80dvh] max-w-full rounded-xl object-contain shadow-2xl"
//             />
//           </div>
//         </div>
//       )}
//     </div>,
//     document.body,
//   );
// };

// /* ---------- Article Card ---------- */

// const ArticleCard: FC<{
//   article: Article;
//   index: number;
//   reveal?: boolean;
//   eager?: boolean;
// }> = ({ article, index, reveal, eager }) => {
//   const {
//     title,
//     excerpt,
//     category,
//     date,
//     readTime,
//     tags,
//     url,
//     image,
//     featured,
//   } = article;

//   const [imgFailed, setImgFailed] = useState(false);
//   const [loaded, setLoaded] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [summaryOpen, setSummaryOpen] = useState(false);

//   const { ref, inView: seen } = useInView<HTMLElement>();

//   const inView = reveal ?? seen;

//   /* Copy Article Link + Toast */

//   const copyLink = async () => {
//     try {
//       const articleUrl = new URL(url, window.location.origin).href;

//       await navigator.clipboard.writeText(articleUrl);

//       setCopied(true);

//       toast.success("Link copied successfully!", {
//         duration: 2500,
//         icon: "🔗",
//       });

//       setTimeout(() => setCopied(false), 2000);
//     } catch {
//       toast.error("Failed to copy link!", {
//         duration: 2500,
//       });
//     }
//   };

//   return (
//     <article
//       ref={ref}
//       className={[
//         "group relative flex flex-col overflow-hidden rounded-2xl border border-[#0E1525]/15 bg-white dark:border-white/10 dark:bg-slate-900/70 cursor-pointer",
//         "transition-all duration-500 ease-out dark:hover:border-[#15919B] hover:border-[#15919B] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-20px_rgba(21,145,155,0.3)] dark:hover:shadow-[0_24px_48px_-20px_rgba(21,145,155,0.2)] hover:-translate-y-1",
//         "motion-reduce:transition-none",
//         featured ? "md:col-span-2 lg:flex-row" : "",
//         inView
//           ? "translate-y-0 opacity-100"
//           : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
//       ].join(" ")}
//     >
//       {/* Image */}

//       <div
//         className={[
//           "relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800",
//           featured ? "lg:aspect-auto lg:min-h-[340px] lg:w-1/2" : "",
//         ].join(" ")}
//       >
//         {imgFailed || !image ? (
//           <div className="flex h-full items-center justify-center text-6xl font-bold text-slate-900/15 dark:text-white/15">
//             {title.charAt(0)}
//           </div>
//         ) : (
//           <img
//             src={image}
//             alt={`Cover image for ${title}`}
//             width={800}
//             height={500}
//             loading={eager ? "eager" : "lazy"}
//             decoding="async"
//             ref={(el) => {
//               if (el?.complete && el.naturalWidth > 0) {
//                 setLoaded(true);
//               }
//             }}
//             onLoad={() => setLoaded(true)}
//             onError={() => setImgFailed(true)}
//             className={`h-full w-full object-cover object-center transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
//               loaded ? "opacity-100" : "opacity-0"
//             }`}
//           />
//         )}

//         {/* Category */}

//         <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur dark:border-white/15 dark:bg-slate-950/70 dark:text-white">
//           <span className="h-2 w-2 rounded-full bg-[#2a7fa3]" />
//           {category}
//         </span>
//       </div>

//       {/* Content */}

//       <div
//         className={[
//           "flex flex-1 flex-col gap-4 p-6 sm:p-7",
//           featured ? "lg:w-1/2 lg:justify-center lg:p-10" : "",
//         ].join(" ")}
//       >
//         {/* Date and Reading Time */}

//         <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
//           <span className="inline-flex items-center gap-1.5">
//             <Calendar className="h-4 w-4" aria-hidden="true" />
//             {date}
//           </span>

//           <span className="inline-flex items-center gap-1.5">
//             <Clock className="h-4 w-4" aria-hidden="true" />
//             {readTime}
//           </span>
//         </p>

//         {/* Title */}

//         <h3
//           className={[
//             "font-bold tracking-tight text-slate-900 dark:text-white",
//             featured ? "text-3xl sm:text-4xl" : "text-2xl",
//           ].join(" ")}
//         >
//           {title}
//         </h3>

//         {/* Description */}

//         <p className="max-w-prose text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
//           {excerpt}
//         </p>

//         {/* Tags */}

//         <ul className="flex flex-wrap gap-2">
//           {tags.map((tag) => {
//             const TagIcon = TAG_ICONS[tag] ?? DEFAULT_TAG_ICON;

//             return (
//               <li
//                 key={tag}
//                 className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors duration-300 group-hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:group-hover:border-white/20"
//               >
//                 <TagIcon
//                   className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400"
//                   aria-hidden="true"
//                 />
//                 {tag}
//               </li>
//             );
//           })}
//         </ul>

//         {/* Action Buttons */}

//         <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-2">
//           {/* Read Article */}

//           <a
//             href={url}
//             className="group/read relative inline-flex min-h-11 items-center gap-2 overflow-hidden rounded-xl border border-slate-300 px-4 text-[15px] font-semibold text-[#0F2E33] transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7fa3] dark:border-white/20 dark:text-white dark:hover:text-white dark:focus-visible:outline-[#2a7fa3]"
//           >
//             <span
//               aria-hidden="true"
//               className="absolute inset-0 -translate-x-full bg-[#2a7fa3] transition-transform duration-300 ease-out group-hover/read:translate-x-0 motion-reduce:transition-none"
//             />

//             <span className="relative z-10">Read Article</span>

//             <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/read:-translate-y-0.5 group-hover/read:translate-x-0.5 motion-reduce:transition-none" />
//           </a>

//           {/* Copy Link */}

//           <button
//             type="button"
//             onClick={copyLink}
//             aria-label={copied ? "Link copied" : `Copy link to ${title}`}
//             className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300 text-slate-900 transition-all duration-300 hover:-rotate-6 hover:scale-110 hover:bg-[#2a7fa3] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7fa3] motion-reduce:transition-none motion-reduce:hover:transform-none dark:border-white/20 dark:text-white dark:hover:bg-[#2a7fa3] dark:hover:text-white dark:focus-visible:outline-[#2a7fa3] cursor-pointer"
//           >
//             {copied ? (
//               <Check className="h-5 w-5" aria-hidden="true" />
//             ) : (
//               <Link2 className="h-5 w-5" aria-hidden="true" />
//             )}
//           </button>

//           {/* Summary */}

//           <button
//             type="button"
//             onClick={() => setSummaryOpen(true)}
//             disabled={!article.summary}
//             aria-expanded={summaryOpen}
//             aria-haspopup="dialog"
//             className="group/more inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 px-4 text-[15px] font-semibold text-slate-900 transition-all duration-300 hover:border-[#2a7fa3] hover:bg-[#2a7fa3] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7fa3] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:text-white dark:hover:border-[#2a7fa3] dark:hover:bg-[#2a7fa3] dark:hover:text-white dark:focus-visible:outline-[#2a7fa3]"
//           >
//             Summary
//             <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/more:translate-x-0 group-hover/more:opacity-100 motion-reduce:transition-none" />
//           </button>
//         </div>
//       </div>

//       {/* Summary Modal */}

//       {summaryOpen && article.summary && (
//         <SummaryModal article={article} onClose={() => setSummaryOpen(false)} />
//       )}
//     </article>
//   );
// };

// /* ---------- Articles Page ---------- */

// export default function ArticlesPage() {
//   const [visible, setVisible] = useState(INITIAL_COUNT);
//   const [busy, setBusy] = useState(false);

//   const gridRef = useRef<HTMLElement | null>(null);

//   const total = articles.length;

//   const shown = Math.min(visible, total);

//   const allShown = shown >= total;

//   const nextCount = Math.min(STEP, total - shown);

//   /* Button Lock */

//   const lock = (ms: number) => {
//     setBusy(true);

//     setTimeout(() => {
//       setBusy(false);
//     }, ms);
//   };

//   /* Show More */

//   const showMore = () => {
//     if (busy) return;

//     lock(800);

//     setVisible((v) => Math.min(v + STEP, total));
//   };

//   /* Show Less */

//   const showLess = () => {
//     if (busy) return;

//     const reduce = window.matchMedia(
//       "(prefers-reduced-motion: reduce)",
//     ).matches;

//     lock(reduce ? 50 : 1300);

//     gridRef.current?.scrollIntoView({
//       behavior: reduce ? "auto" : "smooth",
//       block: "start",
//     });

//     setTimeout(() => setVisible(INITIAL_COUNT), reduce ? 0 : 450);
//   };

//   /* Button Styling */

//   const moreBtn =
//     "inline-flex min-h-12 min-w-48 items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 text-[15px] font-semibold text-slate-900 transition-all duration-300 hover:border-slate-900 hover:bg-slate-900 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 motion-reduce:transition-none motion-reduce:active:scale-100 dark:border-white/20 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-slate-900 dark:focus-visible:outline-white";

//   return (
//     <main className="w-full bg-white transition-colors duration-300 dark:bg-[#050505]">
//       {/* Toast Notifications */}

//       <Toaster
//         position="top-right"
//         reverseOrder={false}
//         gutter={10}
//         toastOptions={{
//           duration: 2500,
//           style: {
//             background: "#111827",
//             color: "#ffffff",
//             borderRadius: "14px",
//             padding: "14px 18px",
//             fontSize: "13px",
//             fontWeight: 600,
//             border: "1px solid rgba(255,255,255,0.12)",
//             boxShadow: "0 10px 35px rgba(0,0,0,0.18)",
//           },
//           success: {
//             iconTheme: {
//               primary: "#22c55e",
//               secondary: "#ffffff",
//             },
//           },
//           error: {
//             iconTheme: {
//               primary: "#ef4444",
//               secondary: "#ffffff",
//             },
//           },
//         }}
//       />

//       <div className="relative mx-auto mt-0 max-w-7xl px-5 py-20 sm:px-6 sm:py-24 md:px-10 md:py-30">
//         {/* Eyebrow */}

//         <div className="flex items-center gap-3">
//           <SectionEyebrow label="Articles" />
//         </div>

//         {/* Header */}

//         <header className="max-w-3xl py-8 sm:py-10 lg:py-12">
//           <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
//             <BookOpen className="h-4 w-4" aria-hidden="true" />
//             Notes and tutorials
//           </p>

//           <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
//             Articles on building for the web
//           </h1>

//           <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
//             What I learn while building projects, written in plain language with
//             real examples you can try.
//           </p>
//         </header>

//         {/* Article Cards */}

//         <section ref={gridRef} aria-label="Articles" className="scroll-mt-6">
//           {/* Initial Articles */}

//           <div className={GRID}>
//             {firstBatch.map((article, i) => (
//               <ArticleCard key={article.id} article={article} index={i} />
//             ))}
//           </div>

//           {/* Extra Articles */}

//           {extraBatches.map((batch, b) => {
//             const open = shown > INITIAL_COUNT + b * STEP;

//             return (
//               <div
//                 key={b}
//                 aria-hidden={!open}
//                 className={[
//                   "grid transition-[grid-template-rows,opacity,margin,visibility] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
//                   open
//                     ? "visible mt-6 grid-rows-[1fr] opacity-100 lg:mt-8"
//                     : "invisible mt-0 grid-rows-[0fr] opacity-0",
//                 ].join(" ")}
//               >
//                 <div className="-mx-3 -mb-6 min-h-0 overflow-hidden px-3 pb-6">
//                   <div className={GRID}>
//                     {batch.map((article, i) => (
//                       <ArticleCard
//                         key={article.id}
//                         article={article}
//                         index={i}
//                         reveal={open}
//                         eager
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </section>

//         {/* Show More / Show Less */}

//         {total > INITIAL_COUNT && (
//           <div className="mt-12 flex flex-col items-center gap-3">
//             <p
//               aria-live="polite"
//               className="text-sm text-slate-500 dark:text-slate-400"
//             >
//               Showing {shown} of {total} articles
//             </p>

//             <button
//               type="button"
//               onClick={allShown ? showLess : showMore}
//               disabled={busy}
//               aria-disabled={busy}
//               className={`${moreBtn} disabled:cursor-not-allowed disabled:opacity-60`}
//             >
//               {allShown ? "Show less" : `Show more (${nextCount} more)`}

//               <ChevronDown
//                 aria-hidden="true"
//                 className={`h-4 w-4 transition-transform duration-300 motion-reduce:transition-none ${
//                   allShown ? "rotate-180" : ""
//                 }`}
//               />
//             </button>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }

import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { createPortal } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

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

/* ---------- Reveal on scroll ---------- */

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
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden overscroll-none bg-slate-950/65 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Summary Card */}

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-summary-title"
        className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-black/30 dark:border-white/10 dark:bg-[#101522]"
      >
        {/* Header */}

        <div className="relative shrink-0 border-b border-slate-200 bg-slate-50 px-6 py-6 pr-16 dark:border-white/10 dark:bg-white/[0.04] sm:px-8">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            PROJECT SUMMARY
          </span>

          <h2
            id="project-summary-title"
            className="text-xl font-bold leading-snug text-slate-900 dark:text-white sm:text-2xl"
          >
            {article.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {article.excerpt}
          </p>

          {/* Close Button */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close summary"
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:rotate-90 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}

        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
          {/* Image Preview and Download */}

          {article.image && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]">
              <button
                type="button"
                onClick={() => setImagePreviewOpen(true)}
                className="group relative block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-sky-500"
                aria-label={`Preview image for ${article.title}`}
              >
                <img
                  src={article.image}
                  alt={`Workflow preview for ${article.title}`}
                  className="max-h-64 w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
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

                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={downloadStatus === "downloading"}
                    aria-busy={downloadStatus === "downloading"}
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
                  </button>
                </div>

                {/* Download Progress */}

                {downloadStatus === "downloading" && (
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
                      <div
                        className="h-full rounded-full bg-[#2a7fa3] transition-[width] duration-200 ease-out"
                        style={{ width: `${downloadProgress}%` }}
                      />
                    )}
                  </div>
                )}

                {downloadStatus === "completed" && (
                  <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    Download started successfully.
                  </p>
                )}

                {downloadStatus === "error" && (
                  <p className="mt-2 text-xs font-medium text-red-500">
                    Unable to download this image. Please try again.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Overview */}

          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
              <BookOpen className="h-4 w-4 text-sky-500" />
              Project Overview
            </h3>

            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              {summary.overview}
            </p>
          </div>

          {/* Highlights */}

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Key Highlights
            </h3>

            <ul className="grid gap-3 sm:grid-cols-2">
              {summary.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Workflow */}

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
              <ListChecks className="h-4 w-4 text-sky-500" />
              Workflow Process
            </h3>

            <ol className="space-y-3">
              {summary.workflow.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
                    {index + 1}
                  </span>

                  {item}
                </li>
              ))}
            </ol>
          </div>

          {/* Outcomes */}

          {summary.outcomes.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900 dark:text-white">
                <Users className="h-4 w-4 text-violet-500" />
                Expected Outcomes
              </h3>

              <ul className="space-y-2">
                {summary.outcomes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-6 text-slate-600 dark:text-slate-300"
                  >
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}

          <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-5 dark:border-white/10">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Full Image Preview */}

      {imagePreviewOpen && (
        <div
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

            <img
              src={article.image}
              alt={`Full preview of ${article.title}`}
              className="max-h-[80dvh] max-w-full rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>,
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
    <article
      ref={ref}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl border border-[#0E1525]/15 bg-white dark:border-white/10 dark:bg-slate-900/70 cursor-pointer",
        "transition-all duration-500 ease-out dark:hover:border-[#15919B] hover:border-[#15919B] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-20px_rgba(21,145,155,0.3)] dark:hover:shadow-[0_24px_48px_-20px_rgba(21,145,155,0.2)] hover:-translate-y-1",
        "motion-reduce:transition-none",
        featured ? "md:col-span-2 lg:flex-row" : "",
        inView
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
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
          <img
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
            className={`h-full w-full object-cover object-center transition-[transform,opacity] duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${
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
            className="group/more inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-slate-300 px-4 text-[15px] font-semibold text-slate-900 transition-all duration-300 hover:border-[#2a7fa3] hover:bg-[#2a7fa3] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a7fa3] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/20 dark:text-white dark:hover:border-[#2a7fa3] dark:hover:bg-[#2a7fa3] dark:hover:text-white dark:focus-visible:outline-[#2a7fa3]"
          >
            Summary
            <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/more:translate-x-0 group-hover/more:opacity-100 motion-reduce:transition-none" />
          </button>
        </div>
      </div>

      {/* Summary Modal */}

      {summaryOpen && article.summary && (
        <SummaryModal article={article} onClose={() => setSummaryOpen(false)} />
      )}
    </article>
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

        <div className="flex items-center gap-3">
          <SectionEyebrow label="Articles" />
        </div>

        {/* Header */}

        <header className="max-w-3xl py-8 sm:py-10 lg:py-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Notes and tutorials
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            Articles on building for the web
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            What I learn while building projects, written in plain language with
            real examples you can try.
          </p>
        </header>

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

        {/* Show More / Show Less */}

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
              disabled={busy}
              aria-disabled={busy}
              className={`${moreBtn} disabled:cursor-not-allowed disabled:opacity-60`}
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
