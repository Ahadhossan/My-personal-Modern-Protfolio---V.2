// import { useEffect, useMemo, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   ArrowUpRight,
//   Award,
//   CalendarDays,
//   ChevronLeft,
//   ChevronRight,
//   ExternalLink,
//   House,
//   LayoutGrid,
//   List,
//   Search,
//   ShieldCheck,
//   X,
// } from "lucide-react";

// import { certificates, type CertificateItem } from "../../Data/Certificates";

// /* -------------------------------------------------------
//    Data
//    Every item gets its own unique `uid`. Using the raw `id`
//    as a React key breaks filtering when ids repeat, which
//    causes ghost / duplicated cards after search.
// ------------------------------------------------------- */

// type Item = CertificateItem & { uid: string };

// const ITEMS: Item[] = certificates.map((certificate, index) => ({
//   ...certificate,
//   uid: `${certificate.id}-${index}`,
// }));

// const ACCENT = "#B7F36B";

// const categoryColors: Record<string, string> = {
//   Programming: ACCENT,
//   Others: "#A5B4FC",
//   Design: "#F9A8D4",
//   Business: "#FCD34D",
// };

// const getAccent = (category: string) => categoryColors[category] ?? ACCENT;

// type SortKey = "match" | "newest" | "oldest" | "title";
// type ViewMode = "grid" | "list";

// /* -------------------------------------------------------
//    Helpers
// ------------------------------------------------------- */

// const normalize = (value: string) =>
//   value
//     .toLowerCase()
//     .normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, "")
//     .trim();

// function getTime(date: string) {
//   const parsed = Date.parse(date);
//   if (!Number.isNaN(parsed)) return parsed;

//   const year = date.match(/(19|20)\d{2}/);
//   return year ? new Date(Number(year[0]), 0).getTime() : 0;
// }

// /** 0 means no match. Every typed word has to match somewhere. */
// function getScore(item: Item, words: string[]) {
//   const fields = [
//     { text: normalize(item.title), weight: 5 },
//     { text: normalize(item.issuer), weight: 3 },
//     { text: normalize(item.tag ?? ""), weight: 3 },
//     { text: normalize(item.category), weight: 2 },
//     { text: normalize(item.date), weight: 1 },
//   ];

//   let total = 0;

//   for (const word of words) {
//     let best = 0;

//     for (const field of fields) {
//       const index = field.text.indexOf(word);
//       if (index === -1) continue;

//       const atWordStart = index === 0 || field.text[index - 1] === " ";
//       best = Math.max(best, field.weight * (atWordStart ? 2 : 1));
//     }

//     if (best === 0) return 0;
//     total += best;
//   }

//   return total;
// }

// function Highlight({ text, query }: { text: string; query: string }) {
//   const words = query
//     .trim()
//     .split(/\s+/)
//     .filter(Boolean)
//     .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

//   if (!words.length) return <>{text}</>;

//   const regex = new RegExp(`(${words.join("|")})`, "gi");

//   return (
//     <>
//       {text.split(regex).map((part, index) =>
//         index % 2 === 1 ? (
//           <mark
//             key={index}
//             className="rounded-sm bg-[#B7F36B]/60 px-0.5 text-inherit dark:bg-[#B7F36B]/30"
//           >
//             {part}
//           </mark>
//         ) : (
//           <span key={index}>{part}</span>
//         ),
//       )}
//     </>
//   );
// }

// /* -------------------------------------------------------
//    Certificate visual (image or generated fallback)
// ------------------------------------------------------- */

// function Artwork({ item, large = false }: { item: Item; large?: boolean }) {
//   const accent = getAccent(item.category);

//   return (
//     <div
//       className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#10131a] p-5 text-white ${
//         large ? "min-h-[260px] sm:p-8" : ""
//       }`}
//     >
//       <div
//         className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-25 blur-3xl"
//         style={{ backgroundColor: accent }}
//       />

//       <div className="relative flex items-center justify-between gap-3">
//         <span
//           className="truncate text-[11px] font-medium"
//           style={{ color: accent }}
//         >
//           {item.issuer}
//         </span>
//         <Award size={large ? 26 : 20} style={{ color: accent }} />
//       </div>

//       <h3
//         className={`relative break-words font-semibold leading-tight tracking-tight ${
//           large ? "text-2xl sm:text-3xl" : "text-lg"
//         }`}
//       >
//         {item.title}
//       </h3>

//       <div className="relative flex items-center justify-between text-[11px] text-white/50">
//         <span>{item.date}</span>
//         <ShieldCheck size={16} style={{ color: accent }} />
//       </div>
//     </div>
//   );
// }

// function Visual({ item, large = false }: { item: Item; large?: boolean }) {
//   if (item.image?.src) {
//     return (
//       <img
//         src={item.image.src}
//         alt={item.image.alt || item.title}
//         loading="lazy"
//         className="block h-full w-full object-contain"
//       />
//     );
//   }

//   return <Artwork item={item} large={large} />;
// }

// /* -------------------------------------------------------
//    Page
// ------------------------------------------------------- */

// export default function CertificatesPage() {
//   const navigate = useNavigate();
//   const inputRef = useRef<HTMLInputElement>(null);
//   const closeRef = useRef<HTMLButtonElement>(null);

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [sort, setSort] = useState<SortKey>("match");
//   const [view, setView] = useState<ViewMode>("grid");
//   const [selectedUid, setSelectedUid] = useState<string | null>(null);

//   const words = useMemo(
//     () => normalize(search).split(/\s+/).filter(Boolean),
//     [search],
//   );

//   /* 1. Search first (ignoring category) so category counts stay accurate */
//   const searched = useMemo(() => {
//     if (!words.length) return ITEMS.map((item) => ({ item, score: 1 }));

//     return ITEMS.map((item) => ({ item, score: getScore(item, words) })).filter(
//       (entry) => entry.score > 0,
//     );
//   }, [words]);

//   /* 2. Category list + counts based on the search results */
//   const categories = useMemo(() => {
//     const counts = new Map<string, number>();
//     for (const { item } of searched) {
//       counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
//     }

//     const all = Array.from(new Set(ITEMS.map((item) => item.category)));

//     return [
//       { name: "All", count: searched.length },
//       ...all.map((name) => ({ name, count: counts.get(name) ?? 0 })),
//     ];
//   }, [searched]);

//   /* 3. Apply category + sorting */
//   const results = useMemo(() => {
//     const list = searched.filter(
//       ({ item }) => category === "All" || item.category === category,
//     );

//     const sorted = [...list];

//     sorted.sort((a, b) => {
//       if (sort === "title") return a.item.title.localeCompare(b.item.title);
//       if (sort === "oldest") return getTime(a.item.date) - getTime(b.item.date);
//       if (sort === "match" && words.length && b.score !== a.score)
//         return b.score - a.score;
//       return getTime(b.item.date) - getTime(a.item.date);
//     });

//     return sorted.map((entry) => entry.item);
//   }, [searched, category, sort, words.length]);

//   const selectedIndex = results.findIndex((item) => item.uid === selectedUid);
//   const selected = selectedIndex >= 0 ? results[selectedIndex] : null;

//   /* If the open certificate disappears from the results, close the modal */
//   useEffect(() => {
//     if (selectedUid && selectedIndex === -1) setSelectedUid(null);
//   }, [selectedUid, selectedIndex]);

//   const step = (direction: 1 | -1) => {
//     if (!results.length || selectedIndex < 0) return;
//     const next = (selectedIndex + direction + results.length) % results.length;
//     setSelectedUid(results[next].uid);
//   };

//   /* "/" or Ctrl/Cmd+K focuses the search */
//   useEffect(() => {
//     const onKey = (event: KeyboardEvent) => {
//       if (selectedUid) return;

//       const target = event.target as HTMLElement;
//       const typing =
//         target.tagName === "INPUT" ||
//         target.tagName === "TEXTAREA" ||
//         target.tagName === "SELECT";

//       if (
//         ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") ||
//         (event.key === "/" && !typing)
//       ) {
//         event.preventDefault();
//         inputRef.current?.focus();
//         inputRef.current?.select();
//       }
//     };

//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [selectedUid]);

//   /* Modal: Esc closes, arrows navigate, body scroll locked */
//   useEffect(() => {
//     if (!selected) return;

//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     closeRef.current?.focus();

//     const onKey = (event: KeyboardEvent) => {
//       if (event.key === "Escape") setSelectedUid(null);
//       if (event.key === "ArrowRight") step(1);
//       if (event.key === "ArrowLeft") step(-1);
//     };

//     window.addEventListener("keydown", onKey);
//     return () => {
//       document.body.style.overflow = previousOverflow;
//       window.removeEventListener("keydown", onKey);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selected?.uid, results]);

//   const goBack = () => {
//     const state = window.history.state as { idx?: number } | null;
//     if (typeof state?.idx === "number" && state.idx > 0) navigate(-1);
//     else navigate("/");
//   };

//   const resetAll = () => {
//     setSearch("");
//     setCategory("All");
//     setSort("match");
//   };

//   const isFiltered = search.trim() !== "" || category !== "All";
//   const latestYear = useMemo(() => {
//     const years = ITEMS.map((item) =>
//       new Date(getTime(item.date)).getFullYear(),
//     );
//     return Math.max(...years.filter((year) => year > 1970), 0) || null;
//   }, []);

//   return (
//     <main className="min-h-screen bg-[#f4f6f8] text-slate-900 transition-colors duration-300 dark:bg-[#0a0c11] dark:text-slate-100">
//       {/* Soft top glow */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_80%_at_85%_0%,rgba(183,243,107,0.22),transparent_70%)] dark:bg-[radial-gradient(60%_80%_at_85%_0%,rgba(183,243,107,0.08),transparent_70%)]"
//       />

//       <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-8 sm:px-8 sm:pt-10 lg:px-12">
//         {/* Top bar */}
//         <nav
//           aria-label="Page navigation"
//           className="flex items-center justify-between gap-3"
//         >
//           <button
//             type="button"
//             onClick={goBack}
//             className="group inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 text-sm font-medium text-slate-700 backdrop-blur transition hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.08]"
//           >
//             <ArrowLeft
//               size={15}
//               className="transition-transform group-hover:-translate-x-0.5"
//             />
//             Back
//           </button>

//           <Link
//             to="/"
//             className="inline-flex h-10 items-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-[#B7F36B] dark:text-[#15190e] dark:hover:bg-lime-300"
//           >
//             <House size={15} />
//             Home
//           </Link>
//         </nav>

//         {/* Hero */}
//         <header className="mt-14 max-w-3xl sm:mt-20">
//           <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
//             Certificates
//           </h1>
//           <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400">
//             Courses, programs and credentials I have completed, with links to
//             verify each one.
//           </p>

//           <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
//             <div>
//               <dt className="text-xs text-slate-500 dark:text-slate-500">
//                 Total
//               </dt>
//               <dd className="text-2xl font-semibold tabular-nums">
//                 {ITEMS.length}
//               </dd>
//             </div>
//             <div>
//               <dt className="text-xs text-slate-500 dark:text-slate-500">
//                 Categories
//               </dt>
//               <dd className="text-2xl font-semibold tabular-nums">
//                 {categories.length - 1}
//               </dd>
//             </div>
//             {latestYear && (
//               <div>
//                 <dt className="text-xs text-slate-500 dark:text-slate-500">
//                   Latest
//                 </dt>
//                 <dd className="text-2xl font-semibold tabular-nums">
//                   {latestYear}
//                 </dd>
//               </div>
//             )}
//           </dl>
//         </header>

//         {/* Browser */}
//         <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12">
//           {/* Sidebar */}
//           <aside className="min-w-0 lg:sticky lg:top-8 lg:self-start">
//             <div className="relative">
//               <Search
//                 size={17}
//                 className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//               />
//               <input
//                 ref={inputRef}
//                 type="text"
//                 inputMode="search"
//                 value={search}
//                 onChange={(event) => setSearch(event.target.value)}
//                 onKeyDown={(event) => {
//                   if (event.key === "Escape") {
//                     if (search) setSearch("");
//                     else event.currentTarget.blur();
//                   }
//                 }}
//                 placeholder="Search certificates"
//                 aria-label="Search certificates"
//                 autoComplete="off"
//                 spellCheck={false}
//                 className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-slate-500 dark:focus:border-[#B7F36B] dark:focus:ring-[#B7F36B]/10"
//               />

//               {search ? (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setSearch("");
//                     inputRef.current?.focus();
//                   }}
//                   aria-label="Clear search"
//                   className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 dark:hover:bg-white/10"
//                 >
//                   <X size={16} />
//                 </button>
//               ) : (
//                 <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-white/10 sm:block">
//                   /
//                 </kbd>
//               )}
//             </div>

//             {/* Categories */}
//             <div
//               role="group"
//               aria-label="Filter by category"
//               className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-6 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
//             >
//               {categories.map(({ name, count }) => {
//                 const active = category === name;
//                 const empty = count === 0 && !active;

//                 return (
//                   <button
//                     key={name}
//                     type="button"
//                     onClick={() => setCategory(name)}
//                     aria-pressed={active}
//                     disabled={empty}
//                     className={`flex shrink-0 items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm transition lg:w-full ${
//                       active
//                         ? "bg-slate-900 font-semibold text-white dark:bg-[#B7F36B] dark:text-[#15190e]"
//                         : "text-slate-600 hover:bg-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-white/[0.05]"
//                     }`}
//                   >
//                     <span className="flex items-center gap-2.5">
//                       {name !== "All" && (
//                         <span
//                           aria-hidden="true"
//                           className="h-2 w-2 rounded-full"
//                           style={{ backgroundColor: getAccent(name) }}
//                         />
//                       )}
//                       {name}
//                     </span>
//                     <span
//                       className={`text-xs tabular-nums ${
//                         active ? "opacity-70" : "text-slate-400"
//                       }`}
//                     >
//                       {count}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>
//           </aside>

//           {/* Results */}
//           <section className="min-w-0" aria-label="Certificate results">
//             <div className="flex flex-wrap items-center justify-between gap-3">
//               <p
//                 aria-live="polite"
//                 className="text-sm text-slate-600 dark:text-slate-400"
//               >
//                 <span className="font-semibold text-slate-900 dark:text-white">
//                   {results.length}
//                 </span>{" "}
//                 {results.length === 1 ? "certificate" : "certificates"}
//                 {search.trim() && (
//                   <>
//                     {" "}
//                     for{" "}
//                     <span className="font-medium text-slate-900 dark:text-white">
//                       “{search.trim()}”
//                     </span>
//                   </>
//                 )}
//                 {isFiltered && (
//                   <button
//                     type="button"
//                     onClick={resetAll}
//                     className="ml-3 text-xs font-medium text-slate-500 underline underline-offset-4 transition hover:text-slate-900 dark:hover:text-white"
//                   >
//                     Reset
//                   </button>
//                 )}
//               </p>

//               <div className="flex items-center gap-2">
//                 <label className="sr-only" htmlFor="cert-sort">
//                   Sort certificates
//                 </label>
//                 <select
//                   id="cert-sort"
//                   value={sort}
//                   onChange={(event) => setSort(event.target.value as SortKey)}
//                   className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-700 outline-none transition focus:border-slate-900 dark:border-white/10 dark:bg-[#11141b] dark:text-slate-200 dark:focus:border-[#B7F36B]"
//                 >
//                   <option value="match">
//                     {words.length ? "Best match" : "Default"}
//                   </option>
//                   <option value="newest">Newest first</option>
//                   <option value="oldest">Oldest first</option>
//                   <option value="title">Title A to Z</option>
//                 </select>

//                 <div
//                   role="group"
//                   aria-label="Layout"
//                   className="flex rounded-xl border border-slate-200 bg-white p-0.5 dark:border-white/10 dark:bg-[#11141b]"
//                 >
//                   {(
//                     [
//                       ["grid", LayoutGrid, "Grid view"],
//                       ["list", List, "List view"],
//                     ] as const
//                   ).map(([mode, Icon, label]) => (
//                     <button
//                       key={mode}
//                       type="button"
//                       onClick={() => setView(mode)}
//                       aria-label={label}
//                       aria-pressed={view === mode}
//                       className={`flex h-9 w-9 items-center justify-center rounded-[10px] transition ${
//                         view === mode
//                           ? "bg-slate-900 text-white dark:bg-[#B7F36B] dark:text-[#15190e]"
//                           : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
//                       }`}
//                     >
//                       <Icon size={16} />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {results.length > 0 ? (
//               <ul
//                 className={
//                   view === "grid"
//                     ? "mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
//                     : "mt-6 flex flex-col gap-3"
//                 }
//               >
//                 {results.map((item) => (
//                   <li key={item.uid} className="min-w-0">
//                     {view === "grid" ? (
//                       <GridCard
//                         item={item}
//                         query={search}
//                         onOpen={() => setSelectedUid(item.uid)}
//                       />
//                     ) : (
//                       <ListRow
//                         item={item}
//                         query={search}
//                         onOpen={() => setSelectedUid(item.uid)}
//                       />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <div className="mt-6 rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-white/15">
//                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-white/[0.05]">
//                   <Search size={22} />
//                 </div>
//                 <h3 className="mt-5 text-lg font-semibold">
//                   Nothing matches your search
//                 </h3>
//                 <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
//                   Try a shorter keyword, check the spelling, or pick a different
//                   category.
//                 </p>
//                 <button
//                   type="button"
//                   onClick={resetAll}
//                   className="mt-6 h-10 rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-[#B7F36B] dark:text-[#15190e] dark:hover:bg-lime-300"
//                 >
//                   Show all certificates
//                 </button>
//               </div>
//             )}
//           </section>
//         </div>
//       </div>

//       {/* Detail modal */}
//       {selected && (
//         <div
//           className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
//           onMouseDown={(event) => {
//             if (event.target === event.currentTarget) setSelectedUid(null);
//           }}
//         >
//           <div
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="certificate-modal-title"
//             className="relative flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl dark:bg-[#10131a] sm:max-h-[88dvh] sm:rounded-3xl lg:flex-row"
//           >
//             <button
//               ref={closeRef}
//               type="button"
//               aria-label="Close"
//               onClick={() => setSelectedUid(null)}
//               className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
//             >
//               <X size={18} />
//             </button>

//             {/* Image side */}
//             <div className="flex min-h-[220px] flex-1 items-center justify-center overflow-hidden bg-[#0b0d12] lg:min-h-[480px] lg:basis-[58%]">
//               <div className="h-full max-h-[50dvh] w-full lg:max-h-none">
//                 <Visual item={selected} large />
//               </div>
//             </div>

//             {/* Details side */}
//             <div className="flex min-w-0 flex-col overflow-y-auto p-6 sm:p-8 lg:basis-[42%]">
//               <span
//                 className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
//                 style={{
//                   color: getAccent(selected.category),
//                   backgroundColor: `${getAccent(selected.category)}1f`,
//                 }}
//               >
//                 <span
//                   className="h-1.5 w-1.5 rounded-full"
//                   style={{ backgroundColor: getAccent(selected.category) }}
//                 />
//                 {selected.category}
//               </span>

//               <h2
//                 id="certificate-modal-title"
//                 className="mt-4 break-words text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
//               >
//                 {selected.title}
//               </h2>

//               <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200 text-sm dark:divide-white/10 dark:border-white/10">
//                 <div className="flex items-center justify-between gap-4 py-3">
//                   <dt className="text-slate-500">Issued by</dt>
//                   <dd className="text-right font-medium">{selected.issuer}</dd>
//                 </div>
//                 <div className="flex items-center justify-between gap-4 py-3">
//                   <dt className="text-slate-500">Date</dt>
//                   <dd className="flex items-center gap-2 font-medium">
//                     <CalendarDays size={14} />
//                     {selected.date}
//                   </dd>
//                 </div>
//                 {selected.tag && (
//                   <div className="flex items-center justify-between gap-4 py-3">
//                     <dt className="text-slate-500">Focus</dt>
//                     <dd className="text-right font-medium">{selected.tag}</dd>
//                   </div>
//                 )}
//               </dl>

//               {selected.credentialUrl ? (
//                 <a
//                   href={selected.credentialUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-[#B7F36B] dark:text-[#15190e] dark:hover:bg-lime-300"
//                 >
//                   <ExternalLink size={16} />
//                   Verify credential
//                 </a>
//               ) : (
//                 <p className="mt-6 text-xs leading-6 text-slate-500">
//                   No verification link has been added for this certificate.
//                 </p>
//               )}

//               {/* Prev / next */}
//               <div className="mt-auto flex items-center justify-between pt-8">
//                 <span className="text-xs tabular-nums text-slate-500">
//                   {selectedIndex + 1} of {results.length}
//                 </span>

//                 <div className="flex gap-2">
//                   <button
//                     type="button"
//                     onClick={() => step(-1)}
//                     aria-label="Previous certificate"
//                     disabled={results.length < 2}
//                     className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-100 disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/10"
//                   >
//                     <ChevronLeft size={18} />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => step(1)}
//                     aria-label="Next certificate"
//                     disabled={results.length < 2}
//                     className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-100 disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/10"
//                   >
//                     <ChevronRight size={18} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

// /* -------------------------------------------------------
//    Cards
// ------------------------------------------------------- */

// function GridCard({
//   item,
//   query,
//   onOpen,
// }: {
//   item: Item;
//   query: string;
//   onOpen: () => void;
// }) {
//   const accent = getAccent(item.category);

//   return (
//     <article className="group h-full">
//       <button
//         type="button"
//         onClick={onOpen}
//         aria-label={`View ${item.title}`}
//         className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-left transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:border-white/10 dark:bg-[#11141b] dark:hover:border-white/20 dark:hover:shadow-black/30 dark:focus-visible:ring-[#B7F36B]"
//       >
//         <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-[#0b0d12]">
//           <Visual item={item} />

//           <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 opacity-0 shadow-md transition duration-300 group-hover:opacity-100 dark:bg-[#B7F36B] dark:text-[#15190e]">
//             <ArrowUpRight size={16} />
//           </span>
//         </div>

//         <div className="flex flex-1 flex-col p-5">
//           <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
//             <span
//               aria-hidden="true"
//               className="h-2 w-2 shrink-0 rounded-full"
//               style={{ backgroundColor: accent }}
//             />
//             <span className="truncate">{item.category}</span>
//             <span className="ml-auto shrink-0">
//               <Highlight text={item.date} query={query} />
//             </span>
//           </div>

//           <h3 className="mt-3 line-clamp-2 min-h-12 break-words text-base font-semibold leading-6 tracking-tight">
//             <Highlight text={item.title} query={query} />
//           </h3>

//           <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
//             <Highlight text={item.issuer} query={query} />
//           </p>

//           {item.tag && (
//             <p className="mt-4 w-fit max-w-full truncate rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
//               <Highlight text={item.tag} query={query} />
//             </p>
//           )}
//         </div>
//       </button>
//     </article>
//   );
// }

// function ListRow({
//   item,
//   query,
//   onOpen,
// }: {
//   item: Item;
//   query: string;
//   onOpen: () => void;
// }) {
//   const accent = getAccent(item.category);

//   return (
//     <article className="group">
//       <button
//         type="button"
//         onClick={onOpen}
//         aria-label={`View ${item.title}`}
//         className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:border-white/10 dark:bg-[#11141b] dark:hover:border-white/20 dark:focus-visible:ring-[#B7F36B] sm:gap-5 sm:p-4"
//       >
//         <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-[#0b0d12] sm:h-20 sm:w-32">
//           <Visual item={item} />
//         </div>

//         <div className="min-w-0 flex-1">
//           <h3 className="line-clamp-2 break-words text-sm font-semibold leading-5 tracking-tight sm:text-base">
//             <Highlight text={item.title} query={query} />
//           </h3>
//           <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
//             <Highlight text={item.issuer} query={query} />
//           </p>
//         </div>

//         <div className="hidden shrink-0 flex-col items-end gap-1.5 text-xs text-slate-500 dark:text-slate-400 sm:flex">
//           <span className="flex items-center gap-2">
//             <span
//               aria-hidden="true"
//               className="h-2 w-2 rounded-full"
//               style={{ backgroundColor: accent }}
//             />
//             {item.category}
//           </span>
//           <span>
//             <Highlight text={item.date} query={query} />
//           </span>
//         </div>

//         <ArrowUpRight
//           size={18}
//           className="shrink-0 text-slate-400 transition group-hover:text-slate-900 dark:group-hover:text-[#B7F36B]"
//         />
//       </button>
//     </article>
//   );
// }

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  House,
  LayoutGrid,
  List,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

import { certificates, type CertificateItem } from "../../Data/Certificates";

/* -------------------------------------------------------
   Data
   Every item gets its own unique `uid`. Using the raw `id`
   as a React key breaks filtering when ids repeat, which
   causes ghost / duplicated cards after search.
------------------------------------------------------- */

type Item = CertificateItem & { uid: string };

const ITEMS: Item[] = certificates.map((certificate, index) => ({
  ...certificate,
  uid: `${certificate.id}-${index}`,
}));

const ACCENT = "#B7F36B";

const categoryColors: Record<string, string> = {
  Programming: ACCENT,
  Others: "#A5B4FC",
  Design: "#F9A8D4",
  Business: "#FCD34D",
};

const getAccent = (category: string) => categoryColors[category] ?? ACCENT;

type SortKey = "match" | "newest" | "oldest" | "title";
type ViewMode = "grid" | "list";

/* -------------------------------------------------------
   Helpers
------------------------------------------------------- */

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

function getTime(date: string) {
  const parsed = Date.parse(date);
  if (!Number.isNaN(parsed)) return parsed;

  const year = date.match(/(19|20)\d{2}/);
  return year ? new Date(Number(year[0]), 0).getTime() : 0;
}

/** 0 means no match. Every typed word has to match somewhere. */
function getScore(item: Item, words: string[]) {
  const fields = [
    { text: normalize(item.title), weight: 5 },
    { text: normalize(item.issuer), weight: 3 },
    { text: normalize(item.tag ?? ""), weight: 3 },
    { text: normalize(item.category), weight: 2 },
    { text: normalize(item.date), weight: 1 },
  ];

  let total = 0;

  for (const word of words) {
    let best = 0;

    for (const field of fields) {
      const index = field.text.indexOf(word);
      if (index === -1) continue;

      const atWordStart = index === 0 || field.text[index - 1] === " ";
      best = Math.max(best, field.weight * (atWordStart ? 2 : 1));
    }

    if (best === 0) return 0;
    total += best;
  }

  return total;
}

function Highlight({ text, query }: { text: string; query: string }) {
  const words = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (!words.length) return <>{text}</>;

  const regex = new RegExp(`(${words.join("|")})`, "gi");

  return (
    <>
      {text.split(regex).map((part, index) =>
        index % 2 === 1 ? (
          <mark
            key={index}
            className="rounded-sm bg-[#B7F36B]/60 px-0.5 text-inherit dark:bg-[#B7F36B]/30"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
}

/* -------------------------------------------------------
   Certificate visual (image or generated fallback)
------------------------------------------------------- */

function Artwork({ item, large = false }: { item: Item; large?: boolean }) {
  const accent = getAccent(item.category);

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#10131a] p-5 text-white ${
        large ? "min-h-[260px] sm:p-8" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: accent }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span
          className="truncate text-[11px] font-medium"
          style={{ color: accent }}
        >
          {item.issuer}
        </span>
        <Award size={large ? 26 : 20} style={{ color: accent }} />
      </div>

      <h3
        className={`relative break-words font-semibold leading-tight tracking-tight ${
          large ? "text-2xl sm:text-3xl" : "text-lg"
        }`}
      >
        {item.title}
      </h3>

      <div className="relative flex items-center justify-between text-[11px] text-white/50">
        <span>{item.date}</span>
        <ShieldCheck size={16} style={{ color: accent }} />
      </div>
    </div>
  );
}

function Visual({ item, large = false }: { item: Item; large?: boolean }) {
  if (item.image?.src) {
    return (
      <img
        src={item.image.src}
        alt={item.image.alt || item.title}
        loading="lazy"
        className="block h-full w-full object-contain"
      />
    );
  }

  return <Artwork item={item} large={large} />;
}

/* -------------------------------------------------------
   Controls: sort dropdown + view toggle
------------------------------------------------------- */

const SORT_OPTIONS: { value: SortKey; label: string; hint: string }[] = [
  { value: "match", label: "Best match", hint: "Most relevant first" },
  { value: "newest", label: "Newest first", hint: "Latest year on top" },
  { value: "oldest", label: "Oldest first", hint: "Earliest year on top" },
  { value: "title", label: "Title A to Z", hint: "Alphabetical order" },
];

function SortMenu({
  value,
  onChange,
  hasQuery,
}: {
  value: SortKey;
  onChange: (value: SortKey) => void;
  hasQuery: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const options = SORT_OPTIONS.map((option) =>
    option.value === "match" && !hasQuery
      ? { ...option, label: "Default", hint: "Newest first" }
      : option,
  );

  const current =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Sort by ${current.label}`}
        className={`inline-flex h-12 items-center gap-2.5 rounded-full border bg-white/80 pl-4 pr-3 text-sm backdrop-blur transition dark:bg-white/[0.04] ${
          open
            ? "border-slate-900 ring-4 ring-slate-900/5 dark:border-[#B7F36B] dark:ring-[#B7F36B]/10"
            : "border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20"
        }`}
      >
        <span className="text-slate-500 dark:text-slate-400">Sort by</span>

        <span className="font-semibold text-slate-900 dark:text-white">
          {current.label}
        </span>

        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        role="listbox"
        aria-label="Sort options"
        aria-hidden={!open}
        className={`absolute right-0 top-[calc(100%+8px)] z-30 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10 duration-200 ease-out [transition-property:opacity,transform,visibility] dark:border-white/10 dark:bg-[#141821] dark:shadow-black/40 ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible -translate-y-2 scale-95 opacity-0"
        }`}
      >
        {options.map((option, index) => {
          const active = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={active}
              tabIndex={open ? 0 : -1}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              style={{ transitionDelay: open ? `${60 + index * 35}ms` : "0ms" }}
              className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left duration-300 ease-out [transition-property:opacity,transform,background-color] ${
                open ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
              } ${
                active
                  ? "bg-slate-100 dark:bg-white/[0.07]"
                  : "hover:bg-slate-50 dark:hover:bg-white/[0.04]"
              }`}
            >
              <span className="min-w-0">
                <span className="block text-sm font-medium text-slate-900 dark:text-white">
                  {option.label}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  {option.hint}
                </span>
              </span>

              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white transition duration-300 ease-out dark:bg-[#B7F36B] dark:text-[#15190e] ${
                  active ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
              >
                <Check size={12} strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ViewToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  const modes = [
    { mode: "grid", Icon: LayoutGrid, label: "Grid view" },
    { mode: "list", Icon: List, label: "List view" },
  ] as const;

  return (
    <div
      role="group"
      aria-label="Layout"
      className="relative flex h-12 items-center rounded-full border border-slate-200 bg-white/80 p-1 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
    >
      <span
        aria-hidden="true"
        className={`absolute left-1 top-1 h-10 w-10 rounded-full bg-slate-900 shadow-sm transition-transform duration-300 ease-out dark:bg-[#B7F36B] ${
          value === "list" ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {modes.map(({ mode, Icon, label }) => {
        const active = value === mode;

        return (
          <button
            key={mode}
            type="button"
            onClick={() => onChange(mode)}
            aria-label={label}
            aria-pressed={active}
            title={label}
            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 ${
              active
                ? "text-white dark:text-[#15190e]"
                : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------
   useHideFloatingWidgets
   While `active` is true, every `position: fixed` element that is
   not part of the modal is hidden (!important, so utility classes
   cannot win). A MutationObserver keeps it working for widgets that
   mount late, re-render, or reset their own styles. Everything is
   restored when `active` becomes false.
------------------------------------------------------- */

function useHideFloatingWidgets(
  active: boolean,
  rootRef: { current: HTMLElement | null },
) {
  useEffect(() => {
    if (!active) return;

    const touched = new Map<HTMLElement, { value: string; priority: string }>();

    const hide = (el: HTMLElement) => {
      if (!touched.has(el)) {
        touched.set(el, {
          value: el.style.getPropertyValue("visibility"),
          priority: el.style.getPropertyPriority("visibility"),
        });
      }

      if (
        el.style.getPropertyValue("visibility") !== "hidden" ||
        el.style.getPropertyPriority("visibility") !== "important"
      ) {
        el.style.setProperty("visibility", "hidden", "important");
      }
    };

    const scan = () => {
      const root = rootRef.current;

      document.body.querySelectorAll<HTMLElement>("*").forEach((el) => {
        if (root && (el === root || root.contains(el) || el.contains(root))) {
          return;
        }

        if (touched.has(el)) {
          hide(el);
          return;
        }

        if (getComputedStyle(el).position === "fixed") hide(el);
      });
    };

    let timer: number | undefined;

    const schedule = () => {
      if (timer !== undefined) return;
      timer = window.setTimeout(() => {
        timer = undefined;
        scan();
      }, 120);
    };

    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    scan();

    return () => {
      observer.disconnect();
      if (timer !== undefined) window.clearTimeout(timer);

      touched.forEach(({ value, priority }, el) => {
        if (value) el.style.setProperty("visibility", value, priority);
        else el.style.removeProperty("visibility");
      });
    };
  }, [active, rootRef]);
}

/* -------------------------------------------------------
   Page
------------------------------------------------------- */

export default function CertificatesPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const modalRootRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortKey>("match");
  const [view, setView] = useState<ViewMode>("grid");
  const [selectedUid, setSelectedUid] = useState<string | null>(null);

  const words = useMemo(
    () => normalize(search).split(/\s+/).filter(Boolean),
    [search],
  );

  /* 1. Search first (ignoring category) so category counts stay accurate */
  const searched = useMemo(() => {
    if (!words.length) return ITEMS.map((item) => ({ item, score: 1 }));

    return ITEMS.map((item) => ({ item, score: getScore(item, words) })).filter(
      (entry) => entry.score > 0,
    );
  }, [words]);

  /* 2. Category list + counts based on the search results */
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const { item } of searched) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }

    const all = Array.from(new Set(ITEMS.map((item) => item.category)));

    return [
      { name: "All", count: searched.length },
      ...all.map((name) => ({ name, count: counts.get(name) ?? 0 })),
    ];
  }, [searched]);

  /* 3. Apply category + sorting */
  const results = useMemo(() => {
    const list = searched.filter(
      ({ item }) => category === "All" || item.category === category,
    );

    const sorted = [...list];

    sorted.sort((a, b) => {
      if (sort === "title") return a.item.title.localeCompare(b.item.title);
      if (sort === "oldest") return getTime(a.item.date) - getTime(b.item.date);
      if (sort === "match" && words.length && b.score !== a.score)
        return b.score - a.score;
      return getTime(b.item.date) - getTime(a.item.date);
    });

    return sorted.map((entry) => entry.item);
  }, [searched, category, sort, words.length]);

  const selectedIndex = results.findIndex((item) => item.uid === selectedUid);
  const selected = selectedIndex >= 0 ? results[selectedIndex] : null;

  /* If the open certificate disappears from the results, close the modal */
  useEffect(() => {
    if (selectedUid && selectedIndex === -1) setSelectedUid(null);
  }, [selectedUid, selectedIndex]);

  const step = (direction: 1 | -1) => {
    if (!results.length || selectedIndex < 0) return;
    const next = (selectedIndex + direction + results.length) % results.length;
    setSelectedUid(results[next].uid);
  };

  /* "/" or Ctrl/Cmd+K focuses the search */
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (selectedUid) return;

      const target = event.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT";

      if (
        ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") ||
        (event.key === "/" && !typing)
      ) {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedUid]);

  /* Modal: Esc closes, arrows navigate, body scroll locked */
  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedUid(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.uid, results]);

  /* Hide scroll-to-top, chat button and other floating widgets while open */
  useHideFloatingWidgets(Boolean(selected), modalRootRef);

  const goBack = () => {
    const state = window.history.state as { idx?: number } | null;
    if (typeof state?.idx === "number" && state.idx > 0) navigate(-1);
    else navigate("/");
  };

  const resetAll = () => {
    setSearch("");
    setCategory("All");
    setSort("match");
  };

  const isFiltered = search.trim() !== "" || category !== "All";
  const latestYear = useMemo(() => {
    const years = ITEMS.map((item) =>
      new Date(getTime(item.date)).getFullYear(),
    );
    return Math.max(...years.filter((year) => year > 1970), 0) || null;
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f6f8] text-slate-900 transition-colors duration-300 dark:bg-[#0a0c11] dark:text-slate-100">
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .card-in    { animation: cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .modal-bg   { animation: fadeIn 0.2s ease-out both; }
        .modal-panel{ animation: panelIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .card-in, .modal-bg, .modal-panel { animation: none; }
        }
      `}</style>
      {/* Soft top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_80%_at_85%_0%,rgba(183,243,107,0.22),transparent_70%)] dark:bg-[radial-gradient(60%_80%_at_85%_0%,rgba(183,243,107,0.08),transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-8 sm:px-8 sm:pt-10 lg:px-12">
        {/* Top bar */}
        <nav
          aria-label="Page navigation"
          className="flex items-center justify-between gap-3"
        >
          <button
            type="button"
            onClick={goBack}
            className="group inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 text-sm font-medium text-slate-700 backdrop-blur transition hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.08]"
          >
            <ArrowLeft
              size={15}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back
          </button>

          <Link
            to="/"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-[#B7F36B] dark:text-[#15190e] dark:hover:bg-lime-300"
          >
            <House size={15} />
            Home
          </Link>
        </nav>

        {/* Hero */}
        <header className="mt-14 grid grid-cols-1 gap-8 sm:mt-20 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12">
          <div className="min-w-0 max-w-2xl">
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Certificates
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-400">
              Courses, programs and credentials I have completed, with links to
              verify each one.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-6 dark:border-white/10 md:flex md:gap-10 md:border-t-0 md:pb-1 md:pt-0">
            <div className="min-w-0">
              <dt className="text-xs text-slate-500">Total</dt>
              <dd className="text-2xl font-semibold tabular-nums sm:text-3xl">
                {ITEMS.length}
              </dd>
            </div>

            <div className="min-w-0">
              <dt className="truncate text-xs text-slate-500">Categories</dt>
              <dd className="text-2xl font-semibold tabular-nums sm:text-3xl">
                {categories.length - 1}
              </dd>
            </div>

            {latestYear && (
              <div className="min-w-0">
                <dt className="text-xs text-slate-500">Latest</dt>
                <dd className="text-2xl font-semibold tabular-nums sm:text-3xl">
                  {latestYear}
                </dd>
              </div>
            )}
          </dl>
        </header>

        {/* Browser */}
        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12">
          {/* Sidebar */}
          <aside className="min-w-0 lg:sticky lg:top-8 lg:self-start">
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                ref={inputRef}
                type="text"
                inputMode="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    if (search) setSearch("");
                    else event.currentTarget.blur();
                  }
                }}
                placeholder="Search certificates"
                aria-label="Search certificates"
                autoComplete="off"
                spellCheck={false}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 dark:border-white/10 dark:bg-white/[0.04] dark:placeholder:text-slate-500 dark:focus:border-[#B7F36B] dark:focus:ring-[#B7F36B]/10"
              />

              {search ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  <X size={16} />
                </button>
              ) : (
                <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 dark:border-white/10 sm:block">
                  /
                </kbd>
              )}
            </div>

            {/* Categories */}
            <div
              role="group"
              aria-label="Filter by category"
              className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-6 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {categories.map(({ name, count }) => {
                const active = category === name;
                const empty = count === 0 && !active;

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setCategory(name)}
                    aria-pressed={active}
                    disabled={empty}
                    className={`flex shrink-0 items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm transition lg:w-full ${
                      active
                        ? "bg-slate-900 font-semibold text-white dark:bg-[#B7F36B] dark:text-[#15190e]"
                        : "text-slate-600 hover:bg-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent dark:text-slate-400 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {name !== "All" && (
                        <span
                          aria-hidden="true"
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: getAccent(name) }}
                        />
                      )}
                      {name}
                    </span>
                    <span
                      className={`text-xs tabular-nums ${
                        active ? "opacity-70" : "text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Results */}
          <section className="min-w-0" aria-label="Certificate results">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p
                aria-live="polite"
                className="text-sm text-slate-600 dark:text-slate-400"
              >
                <span className="font-semibold text-slate-900 dark:text-white">
                  {results.length}
                </span>{" "}
                {results.length === 1 ? "certificate" : "certificates"}
                {search.trim() && (
                  <>
                    {" "}
                    for{" "}
                    <span className="font-medium text-slate-900 dark:text-white">
                      “{search.trim()}”
                    </span>
                  </>
                )}
                {isFiltered && (
                  <button
                    type="button"
                    onClick={resetAll}
                    className="ml-3 text-xs font-medium text-slate-500 underline underline-offset-4 transition hover:text-slate-900 dark:hover:text-white"
                  >
                    Reset
                  </button>
                )}
              </p>

              <div className="flex items-center gap-2">
                <SortMenu
                  value={sort}
                  onChange={setSort}
                  hasQuery={words.length > 0}
                />
                <ViewToggle value={view} onChange={setView} />
              </div>
            </div>

            {results.length > 0 ? (
              <ul
                className={
                  view === "grid"
                    ? "mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                    : "mt-6 flex flex-col gap-3"
                }
              >
                {results.map((item, index) => (
                  <li
                    key={`${view}-${item.uid}`}
                    className="card-in min-w-0"
                    style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
                  >
                    {view === "grid" ? (
                      <GridCard
                        item={item}
                        query={search}
                        onOpen={() => setSelectedUid(item.uid)}
                      />
                    ) : (
                      <ListRow
                        item={item}
                        query={search}
                        onOpen={() => setSelectedUid(item.uid)}
                      />
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-white/15">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-white/[0.05]">
                  <Search size={22} />
                </div>
                <h3 className="mt-5 text-lg font-semibold">
                  Nothing matches your search
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Try a shorter keyword, check the spelling, or pick a different
                  category.
                </p>
                <button
                  type="button"
                  onClick={resetAll}
                  className="mt-6 h-10 rounded-full bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-[#B7F36B] dark:text-[#15190e] dark:hover:bg-lime-300"
                >
                  Show all certificates
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div
          ref={modalRootRef}
          style={{ zIndex: 2147483647 }}
          className="modal-bg fixed inset-0 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedUid(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
            className="modal-panel relative flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl dark:bg-[#10131a] sm:max-h-[88dvh] sm:rounded-3xl lg:flex-row"
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="Close"
              onClick={() => setSelectedUid(null)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
            >
              <X size={18} />
            </button>

            {/* Image side */}
            <div className="flex min-h-[220px] flex-1 items-center justify-center overflow-hidden bg-[#0b0d12] lg:min-h-[480px] lg:basis-[58%]">
              <div className="h-full max-h-[50dvh] w-full lg:max-h-none">
                <Visual item={selected} large />
              </div>
            </div>

            {/* Details side */}
            <div className="flex min-w-0 flex-col overflow-y-auto p-6 sm:p-8 lg:basis-[42%]">
              <span
                className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                style={{
                  color: getAccent(selected.category),
                  backgroundColor: `${getAccent(selected.category)}1f`,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: getAccent(selected.category) }}
                />
                {selected.category}
              </span>

              <h2
                id="certificate-modal-title"
                className="mt-4 break-words text-2xl font-semibold leading-tight tracking-tight sm:text-3xl"
              >
                {selected.title}
              </h2>

              <dl className="mt-6 divide-y divide-slate-200 border-y border-slate-200 text-sm dark:divide-white/10 dark:border-white/10">
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-slate-500">Issued by</dt>
                  <dd className="text-right font-medium">{selected.issuer}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-slate-500">Date</dt>
                  <dd className="flex items-center gap-2 font-medium">
                    <CalendarDays size={14} />
                    {selected.date}
                  </dd>
                </div>
                {selected.tag && (
                  <div className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-slate-500">Focus</dt>
                    <dd className="text-right font-medium">{selected.tag}</dd>
                  </div>
                )}
              </dl>

              {selected.credentialUrl ? (
                <a
                  href={selected.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-[#B7F36B] dark:text-[#15190e] dark:hover:bg-lime-300"
                >
                  <ExternalLink size={16} />
                  Verify credential
                </a>
              ) : (
                <p className="mt-6 text-xs leading-6 text-slate-500">
                  No verification link has been added for this certificate.
                </p>
              )}

              {/* Prev / next */}
              <div className="mt-auto flex items-center justify-between pt-8">
                <span className="text-xs tabular-nums text-slate-500">
                  {selectedIndex + 1} of {results.length}
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous certificate"
                    disabled={results.length < 2}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-100 disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/10"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next certificate"
                    disabled={results.length < 2}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 transition hover:bg-slate-100 disabled:opacity-40 dark:border-white/10 dark:hover:bg-white/10"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* -------------------------------------------------------
   Cards
------------------------------------------------------- */

function GridCard({
  item,
  query,
  onOpen,
}: {
  item: Item;
  query: string;
  onOpen: () => void;
}) {
  const accent = getAccent(item.category);

  return (
    <article className="group h-full">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${item.title}`}
        className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-left transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:border-white/10 dark:bg-[#11141b] dark:hover:border-white/20 dark:hover:shadow-black/30 dark:focus-visible:ring-[#B7F36B]"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-[#0b0d12]">
          <Visual item={item} />

          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-900 opacity-0 shadow-md transition duration-300 group-hover:opacity-100 dark:bg-[#B7F36B] dark:text-[#15190e]">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span className="truncate">{item.category}</span>
            <span className="ml-auto shrink-0">
              <Highlight text={item.date} query={query} />
            </span>
          </div>

          <h3 className="mt-3 line-clamp-2 min-h-12 break-words text-base font-semibold leading-6 tracking-tight">
            <Highlight text={item.title} query={query} />
          </h3>

          <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
            <Highlight text={item.issuer} query={query} />
          </p>

          {item.tag && (
            <p className="mt-4 w-fit max-w-full truncate rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600 dark:bg-white/[0.06] dark:text-slate-300">
              <Highlight text={item.tag} query={query} />
            </p>
          )}
        </div>
      </button>
    </article>
  );
}

function ListRow({
  item,
  query,
  onOpen,
}: {
  item: Item;
  query: string;
  onOpen: () => void;
}) {
  const accent = getAccent(item.category);

  return (
    <article className="group">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${item.title}`}
        className="flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 text-left transition hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 dark:border-white/10 dark:bg-[#11141b] dark:hover:border-white/20 dark:focus-visible:ring-[#B7F36B] sm:gap-5 sm:p-4"
      >
        <div className="h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-[#0b0d12] sm:h-20 sm:w-32">
          <Visual item={item} />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 break-words text-sm font-semibold leading-5 tracking-tight sm:text-base">
            <Highlight text={item.title} query={query} />
          </h3>
          <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            <Highlight text={item.issuer} query={query} />
          </p>
        </div>

        <div className="hidden shrink-0 flex-col items-end gap-1.5 text-xs text-slate-500 dark:text-slate-400 sm:flex">
          <span className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: accent }}
            />
            {item.category}
          </span>
          <span>
            <Highlight text={item.date} query={query} />
          </span>
        </div>

        <ArrowUpRight
          size={18}
          className="shrink-0 text-slate-400 transition group-hover:text-slate-900 dark:group-hover:text-[#B7F36B]"
        />
      </button>
    </article>
  );
}
