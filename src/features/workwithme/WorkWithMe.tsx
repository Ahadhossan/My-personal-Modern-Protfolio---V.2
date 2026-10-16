// import React from "react";
// import {
//   ArrowRight,
//   Building2,
//   Check,
//   Clock3,
//   Globe2,
//   Lightbulb,
//   Link2,
//   MapPin,
//   RefreshCw,
//   Send,
//   Users,
// } from "lucide-react";

// type WorkOption = {
//   title: string;
//   description: string;
//   details: string;
//   icon: React.ElementType;
//   accent: "blue" | "purple" | "green";
//   preferred?: boolean;
//   features: string[];
// };

// const workOptions: WorkOption[] = [
//   {
//     title: "Remote",
//     description: "Work from anywhere, stay connected.",
//     details:
//       "I'm open to remote work and enjoy collaborating with teams and clients across different time zones.",
//     icon: Globe2,
//     accent: "blue",
//     preferred: true,
//     features: ["Global collaboration", "Flexible schedule", "Fully remote"],
//   },
//   {
//     title: "On-site",
//     description: "Be part of the team, in person.",
//     details: "Available for on-site opportunities based in Dhaka, Bangladesh.",
//     icon: Building2,
//     accent: "purple",
//     features: [
//       "Team collaboration",
//       "Direct communication",
//       "Office environment",
//     ],
//   },
//   {
//     title: "Hybrid",
//     description: "The best of both worlds.",
//     details:
//       "Open to hybrid roles that combine remote work with on-site collaboration when needed.",
//     icon: RefreshCw,
//     accent: "green",
//     features: [
//       "Flexible working style",
//       "Better work-life balance",
//       "On-site when required",
//     ],
//   },
// ];

// /* =========================================================
//    LIGHT ACCENT STYLES
// ========================================================= */

// const accentStyles = {
//   blue: {
//     wrap: "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-[0_12px_35px_rgba(59,130,246,0.14)]",
//     card: "bg-gradient-to-br from-white via-blue-50/50 to-white",
//     icon: "border-blue-200 bg-blue-50 text-blue-600 shadow-[0_8px_20px_rgba(59,130,246,0.10)]",
//     check: "bg-blue-500",
//     button:
//       "border-blue-200 bg-blue-50 text-blue-600 hover:border-blue-300 hover:bg-blue-100",
//   },

//   purple: {
//     wrap: "bg-slate-200 shadow-[0_12px_35px_rgba(15,23,42,0.06)]",
//     card: "bg-white",
//     icon: "border-purple-200 bg-purple-50 text-purple-600 shadow-[0_8px_20px_rgba(168,85,247,0.08)]",
//     check: "bg-slate-500",
//     button:
//       "border-purple-200 bg-purple-50 text-purple-600 hover:border-purple-300 hover:bg-purple-100",
//   },

//   green: {
//     wrap: "bg-gradient-to-br from-emerald-400 via-emerald-300 to-teal-400 shadow-[0_12px_35px_rgba(16,185,129,0.10)]",
//     card: "bg-gradient-to-br from-white via-emerald-50/40 to-white",
//     icon: "border-emerald-200 bg-emerald-50 text-emerald-600 shadow-[0_8px_20px_rgba(16,185,129,0.08)]",
//     check: "bg-emerald-500",
//     button:
//       "border-emerald-200 bg-emerald-50 text-emerald-600 hover:border-emerald-300 hover:bg-emerald-100",
//   },
// };

// /* =========================================================
//    FLOAT CARD
// ========================================================= */

// type FloatCardProps = {
//   className: string;
//   icon: React.ReactNode;
//   line1: string;
//   line2: string;
//   border: string;
//   glow: string;
//   iconBox: string;
// };

// function FloatCard({
//   className,
//   icon,
//   line1,
//   line2,
//   border,
//   glow,
//   iconBox,
// }: FloatCardProps) {
//   return (
//     <div
//       className={`
//         absolute z-20
//         rounded-xl border
//         bg-white/90
//         px-3.5 py-2.5
//         shadow-[0_12px_35px_rgba(15,23,42,0.10)]
//         backdrop-blur-xl
//         ${border}
//         ${glow}
//         ${className}
//       `}
//     >
//       <div className="flex items-center gap-2.5">
//         <div
//           className={`
//             flex h-8 w-8 items-center justify-center
//             rounded-lg
//             ${iconBox}
//           `}
//         >
//           {icon}
//         </div>

//         <div className="leading-tight">
//           <p className="text-[11px] text-slate-500">{line1}</p>

//           <p className="text-sm font-semibold text-slate-900">{line2}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    LAPTOP SVG
// ========================================================= */

// function LaptopSvg() {
//   return (
//     <svg
//       viewBox="0 0 420 270"
//       fill="none"
//       className="
//         absolute
//         left-[90px]
//         top-[105px]
//         z-10
//         w-[350px]
//       "
//       aria-hidden
//     >
//       <defs>
//         <radialGradient id="wwm-screen" cx="50%" cy="50%" r="65%">
//           <stop offset="0" stopColor="#3b4fd8" />
//           <stop offset="0.5" stopColor="#1a1f5c" />
//           <stop offset="1" stopColor="#0b1030" />
//         </radialGradient>

//         <linearGradient id="wwm-base" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0" stopColor="#4b5563" />
//           <stop offset="1" stopColor="#1f2937" />
//         </linearGradient>

//         <filter id="wwm-blur" x="-50%" y="-50%" width="200%" height="200%">
//           <feGaussianBlur stdDeviation="14" />
//         </filter>

//         <filter id="wwm-codeglow" x="-50%" y="-50%" width="200%" height="200%">
//           <feGaussianBlur stdDeviation="4" result="b" />

//           <feMerge>
//             <feMergeNode in="b" />
//             <feMergeNode in="SourceGraphic" />
//           </feMerge>
//         </filter>
//       </defs>

//       {/* Floor glow */}
//       <ellipse
//         cx="215"
//         cy="248"
//         rx="190"
//         ry="22"
//         fill="#7c3aed"
//         opacity="0.25"
//         filter="url(#wwm-blur)"
//       />

//       {/* Screen glow */}
//       <polygon
//         points="112,34 296,18 286,158 96,172"
//         fill="#3b5bff"
//         opacity="0.30"
//         filter="url(#wwm-blur)"
//       />

//       {/* Screen */}
//       <polygon
//         points="112,34 296,18 286,158 96,172"
//         fill="#0b1020"
//         stroke="#475569"
//         strokeWidth="3"
//         strokeLinejoin="round"
//       />

//       <polygon points="121,43 287,28 278,148 107,162" fill="url(#wwm-screen)" />

//       {/* Code symbol */}
//       <g
//         filter="url(#wwm-codeglow)"
//         stroke="#8b9cff"
//         strokeWidth="7"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         transform="translate(198 95) skewY(-4) translate(-198 -95)"
//       >
//         <path d="M170 80 L150 96 L168 112" />
//         <path d="M207 74 L192 116" />
//         <path d="M224 82 L244 98 L226 114" />
//       </g>

//       {/* Base */}
//       <polygon
//         points="96,172 286,158 372,212 52,238"
//         fill="url(#wwm-base)"
//         stroke="#64748b"
//         strokeWidth="1.5"
//         strokeLinejoin="round"
//       />

//       <polygon
//         points="52,238 372,212 372,220 52,246"
//         fill="#111827"
//         stroke="#7c3aed"
//         strokeOpacity="0.6"
//       />

//       <path d="M96 172 L286 158" stroke="#94a3b8" strokeOpacity="0.5" />

//       {/* Keys */}
//       <g
//         stroke="#94a3b8"
//         strokeOpacity="0.35"
//         strokeWidth="1.5"
//         strokeDasharray="6 3"
//       >
//         <path d="M85 188.5 L307.5 171.5" />
//         <path d="M76 202 L325 182" />
//         <path d="M67 215 L342 193" />
//       </g>

//       {/* Trackpad */}
//       <polygon
//         points="163.6,211.6 248.6,204.8 255.9,215 163.9,222.7"
//         fill="#0f172a"
//         stroke="#475569"
//       />
//     </svg>
//   );
// }

// /* =========================================================
//    PLANT SVG
// ========================================================= */

// function PlantSvg() {
//   return (
//     <svg
//       viewBox="0 0 80 120"
//       fill="none"
//       className="
//         absolute
//         right-1
//         top-[165px]
//         z-10
//         h-[115px]
//         w-[80px]
//       "
//       aria-hidden
//     >
//       <defs>
//         <linearGradient id="wwm-leaf" x1="0" y1="0" x2="1" y2="1">
//           <stop offset="0" stopColor="#6ee7b7" />
//           <stop offset="1" stopColor="#047857" />
//         </linearGradient>

//         <linearGradient id="wwm-pot" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0" stopColor="#334155" />
//           <stop offset="1" stopColor="#0f172a" />
//         </linearGradient>
//       </defs>

//       <path
//         d="M40 72 C34 52 30 34 22 14 C38 20 46 44 40 72Z"
//         fill="url(#wwm-leaf)"
//       />

//       <path
//         d="M40 72 C46 52 56 34 72 26 C70 46 58 64 40 72Z"
//         fill="url(#wwm-leaf)"
//       />

//       <path
//         d="M40 76 C26 70 12 60 6 44 C22 46 36 58 40 76Z"
//         fill="url(#wwm-leaf)"
//         opacity="0.9"
//       />

//       <path
//         d="M40 72 C42 54 46 38 44 8 C54 28 52 54 40 72Z"
//         fill="url(#wwm-leaf)"
//         opacity="0.95"
//       />

//       <path
//         d="M18 74 L62 74 L56 116 Q55 118 52 118 L28 118 Q25 118 24 116 Z"
//         fill="url(#wwm-pot)"
//         stroke="#475569"
//         strokeOpacity="0.5"
//       />

//       <ellipse cx="40" cy="74" rx="22" ry="4" fill="#0b1220" />
//     </svg>
//   );
// }

// /* =========================================================
//    HERO ILLUSTRATION
// ========================================================= */

// function HeroIllustration() {
//   return (
//     <div
//       className="
//         relative mx-auto w-full max-w-[520px]
//         h-[175px]
//         min-[400px]:h-[205px]
//         min-[480px]:h-[245px]
//         sm:h-[300px]
//         lg:h-[285px]
//         xl:h-[330px]
//       "
//     >
//       <div
//         className="
//           absolute left-1/2 top-0
//           h-[330px] w-[520px]
//           -translate-x-1/2
//           origin-top
//           scale-[0.52]
//           min-[400px]:scale-[0.62]
//           min-[480px]:scale-[0.74]
//           sm:scale-[0.9]
//           lg:scale-[0.85]
//           xl:scale-100
//         "
//       >
//         {/* Background glow */}
//         <div
//           className="
//             absolute left-1/2 top-1/2
//             h-64 w-64
//             -translate-x-1/2
//             -translate-y-1/2
//             rounded-full
//             bg-blue-500/10
//             blur-3xl
//           "
//         />

//         {/* Handwritten note */}
//         <div
//           className="
//             absolute left-0 top-[85px]
//             z-10
//             -rotate-[8deg]
//             text-[21px]
//             leading-6
//             text-slate-500
//           "
//           style={{
//             fontFamily: "'Caveat', 'Segoe Script', cursive",
//           }}
//         >
//           <span className="block">Good ideas</span>
//           <span className="block">need great</span>
//           <span className="block">collaboration</span>

//           <svg
//             className="ml-14 mt-1"
//             width="55"
//             height="30"
//             viewBox="0 0 55 30"
//             fill="none"
//           >
//             <path
//               d="M2 2C17 23 30 25 51 19"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//             />

//             <path
//               d="M42 13L51 19L42 25"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>

//         {/* Build Together */}
//         <FloatCard
//           className="left-[160px] top-[70px]"
//           icon={<Users size={18} />}
//           line1="Build"
//           line2="Together"
//           border="border-purple-200"
//           glow="shadow-[0_10px_35px_rgba(139,92,246,0.12)]"
//           iconBox="bg-purple-50 text-purple-600"
//         />

//         {/* Solve Problems */}
//         <FloatCard
//           className="left-[272px] top-0"
//           icon={<Lightbulb size={19} />}
//           line1="Solve"
//           line2="Problems"
//           border="border-cyan-200"
//           glow="shadow-[0_10px_35px_rgba(6,182,212,0.10)]"
//           iconBox="bg-cyan-50 text-cyan-600"
//         />

//         {/* Create Impact */}
//         <FloatCard
//           className="right-0 top-[68px]"
//           icon={
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M4 20v-5" />
//               <path d="M10 20v-8" />
//               <path d="M16 20v-4" />
//               <path d="M3 11l6-5 4 3 7-6" />
//               <path d="M15 3h5v5" />
//             </svg>
//           }
//           line1="Create"
//           line2="Impact"
//           border="border-blue-200"
//           glow="shadow-[0_10px_35px_rgba(59,130,246,0.10)]"
//           iconBox="bg-blue-50 text-blue-600"
//         />

//         <LaptopSvg />
//         <PlantSvg />
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    WORLD MAP
// ========================================================= */

// function WorldMap() {
//   return (
//     <svg
//       className="h-full w-full"
//       viewBox="0 0 600 230"
//       fill="none"
//       aria-hidden
//     >
//       <defs>
//         <pattern
//           id="wwm-dots"
//           width="6"
//           height="6"
//           patternUnits="userSpaceOnUse"
//         >
//           <circle cx="3" cy="3" r="1.1" fill="#93c5fd" />
//         </pattern>

//         <mask id="wwm-land">
//           <g fill="white">
//             {/* North America */}
//             <path d="M20 22 L67 16 L142 13 L167 16 L200 32 L208 48 L183 59 L173 72 L165 88 L138 86 L138 99 L153 104 L167 115 L148 110 L125 96 L103 77 L93 64 L93 51 L75 35 L50 32 L25 32 Z" />

//             {/* South America */}
//             <path d="M167 115 L200 112 L217 128 L242 138 L233 163 L203 189 L187 216 L175 208 L180 176 L183 157 L165 136 L167 128 Z" />

//             {/* Europe */}
//             <path d="M283 70 L285 59 L297 51 L308 45 L317 35 L333 16 L350 14 L367 22 L367 40 L350 56 L347 62 L333 64 L320 67 L300 67 Z" />

//             {/* Africa */}
//             <path d="M272 94 L283 77 L317 69 L353 78 L372 109 L385 110 L367 133 L367 152 L355 171 L333 184 L320 157 L315 130 L315 122 L287 122 L272 106 Z" />

//             {/* Asia */}
//             <path d="M367 22 L400 16 L467 5 L533 13 L583 22 L567 40 L537 56 L517 77 L503 80 L500 93 L480 112 L472 126 L463 115 L453 93 L433 115 L422 96 L412 88 L395 86 L383 80 L372 107 L358 80 L360 70 L347 62 L350 56 L367 40 Z" />

//             {/* Australia */}
//             <path d="M490 163 L508 150 L528 147 L537 146 L550 163 L555 173 L547 189 L530 184 L515 179 L492 182 Z" />
//           </g>
//         </mask>
//       </defs>

//       {/* Dotted land */}
//       <rect
//         width="600"
//         height="230"
//         fill="url(#wwm-dots)"
//         mask="url(#wwm-land)"
//         opacity="0.8"
//       />

//       {/* Connection arcs */}
//       <g
//         stroke="rgba(59,130,246,0.35)"
//         strokeWidth="1.2"
//         strokeDasharray="3 4"
//         strokeLinecap="round"
//       >
//         <path d="M451 90 Q310 -10 177 63" />
//         <path d="M451 90 Q380 20 300 46" />
//         <path d="M451 90 Q530 110 552 182" />
//       </g>

//       {/* Dhaka marker */}
//       <circle
//         cx="451"
//         cy="90"
//         r="6"
//         fill="none"
//         stroke="#60a5fa"
//         strokeOpacity="0.5"
//       >
//         <animate
//           attributeName="r"
//           values="6;20"
//           dur="2.2s"
//           repeatCount="indefinite"
//         />

//         <animate
//           attributeName="stroke-opacity"
//           values="0.5;0"
//           dur="2.2s"
//           repeatCount="indefinite"
//         />
//       </circle>

//       <circle cx="451" cy="90" r="5" fill="#3b82f6" />

//       <circle cx="451" cy="90" r="2" fill="white" />

//       <path d="M470 74 L455 86" stroke="rgba(59,130,246,0.35)" />

//       <rect
//         x="462"
//         y="52"
//         width="78"
//         height="24"
//         rx="7"
//         fill="#eff6ff"
//         stroke="#bfdbfe"
//       />

//       <text
//         x="501"
//         y="68"
//         textAnchor="middle"
//         fontSize="11"
//         fontWeight="600"
//         fill="#2563eb"
//       >
//         Dhaka, BD
//       </text>
//     </svg>
//   );
// }

// /* =========================================================
//    WORK OPTION CARD
// ========================================================= */

// function WorkOptionCard({ option }: { option: WorkOption }) {
//   const Icon = option.icon;
//   const styles = accentStyles[option.accent];

//   return (
//     <div
//       className={`
//         group h-full rounded-2xl
//         transition-all duration-300
//         hover:-translate-y-1
//         hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]
//         ${option.preferred ? "p-[2px]" : "p-px"}
//         ${styles.wrap}
//       `}
//     >
//       <div
//         className={`
//           relative flex h-full min-h-[315px]
//           flex-col rounded-[14px] p-4
//           sm:min-h-[340px] sm:p-6
//           ${styles.card}
//         `}
//       >
//         {/* Preferred */}
//         {option.preferred && (
//           <span
//             className="
//               absolute right-3 top-3
//               rounded-full
//               border border-purple-200
//               bg-purple-50
//               px-2.5 py-1
//               text-[10px]
//               font-semibold
//               text-purple-600
//               sm:right-5 sm:top-5
//               sm:px-3 sm:text-[11px]
//             "
//           >
//             Preferred
//           </span>
//         )}

//         {/* Icon */}
//         <div
//           className={`
//             mb-4
//             flex h-11 w-11
//             items-center justify-center
//             rounded-full border
//             sm:mb-5 sm:h-14 sm:w-14
//             ${styles.icon}
//           `}
//         >
//           <Icon
//             size={22}
//             strokeWidth={1.8}
//             className="sm:h-[26px] sm:w-[26px]"
//           />
//         </div>

//         {/* Content */}
//         <div className="min-w-0">
//           <h3
//             className="
//               text-lg
//               font-semibold
//               tracking-tight
//               text-slate-900
//               sm:text-2xl
//             "
//           >
//             {option.title}
//           </h3>

//           <p
//             className="
//               mt-1
//               text-xs
//               leading-5
//               text-slate-600
//               sm:text-sm
//             "
//           >
//             {option.description}
//           </p>

//           <p
//             className="
//               mt-3
//               max-w-sm
//               text-xs
//               leading-5
//               text-slate-500
//               sm:mt-5
//               sm:text-sm
//               sm:leading-6
//             "
//           >
//             {option.details}
//           </p>
//         </div>

//         {/* Features */}
//         <div
//           className="
//             mt-auto
//             space-y-2.5
//             pr-12
//             pt-5
//             sm:space-y-3
//             sm:pr-14
//             sm:pt-6
//           "
//         >
//           {option.features.map((feature) => (
//             <div
//               key={feature}
//               className="
//                 flex
//                 min-w-0
//                 items-start
//                 gap-2.5
//                 text-xs
//                 leading-5
//                 text-slate-600
//                 sm:items-center
//                 sm:gap-3
//                 sm:text-sm
//               "
//             >
//               <span
//                 className={`
//                   mt-0.5
//                   flex h-4 w-4
//                   shrink-0
//                   items-center
//                   justify-center
//                   rounded-full
//                   sm:mt-0
//                   ${styles.check}
//                 `}
//               >
//                 <Check size={10} strokeWidth={3} className="text-white" />
//               </span>

//               <span className="min-w-0 break-words">{feature}</span>
//             </div>
//           ))}
//         </div>

//         {/* Arrow */}
//         <button
//           type="button"
//           aria-label={`Select ${option.title}`}
//           className={`
//             absolute
//             bottom-4
//             right-4
//             flex
//             h-10
//             w-10
//             items-center
//             justify-center
//             rounded-full
//             border
//             transition-all
//             duration-300
//             hover:scale-105
//             sm:bottom-6
//             sm:right-6
//             sm:h-11
//             sm:w-11
//             ${styles.button}
//           `}
//         >
//           <ArrowRight
//             size={17}
//             className="
//               transition-transform
//               duration-300
//               group-hover:translate-x-0.5
//             "
//           />
//         </button>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    INFO ITEMS
// ========================================================= */

// const infoItems = [
//   {
//     label: "Location",
//     value: "Dhaka, Bangladesh",
//     icon: MapPin,
//   },
//   {
//     label: "Timezone",
//     value: "GMT+6 (BST)",
//     icon: Clock3,
//   },
//   {
//     label: "Collaboration",
//     value: "Remote · On-site · Hybrid",
//     icon: Link2,
//   },
// ];

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function WorkWithMe() {
//   const scrollToContact = () => {
//     document.getElementById("contact")?.scrollIntoView({
//       behavior: "smooth",
//     });
//   };

//   return (
//     <section
//       id="work-with-me"
//       className="
//         relative
//         overflow-hidden
//         bg-white
//         text-slate-900
//       "
//     >
//       {/* =====================================================
//           BACKGROUND
//       ===================================================== */}

//       <div className="pointer-events-none absolute inset-0">
//         <div
//           className="
//             absolute
//             left-[-150px]
//             top-20
//             h-96
//             w-96
//             rounded-full
//             bg-blue-500/5
//             blur-3xl
//           "
//         />

//         <div
//           className="
//             absolute
//             right-[-150px]
//             top-96
//             h-96
//             w-96
//             rounded-full
//             bg-purple-500/5
//             blur-3xl
//           "
//         />

//         <div
//           className="
//             absolute
//             left-1/2
//             top-[45%]
//             h-72
//             w-72
//             -translate-x-1/2
//             rounded-full
//             bg-emerald-500/[0.025]
//             blur-3xl
//           "
//         />
//       </div>

//       <div className="relative">
//         {/* ===================================================
//             HERO
//         =================================================== */}

//         <div className="border-b border-slate-200">
//           <div
//             className="
//               mx-auto
//               grid
//               max-w-7xl
//               items-center
//               gap-6
//               px-4
//               pb-8
//               pt-20

//               sm:gap-8
//               sm:px-6
//               sm:pb-10
//               sm:pt-24

//               lg:grid-cols-2
//               lg:gap-14
//               lg:px-10
//               lg:pb-12
//               lg:pt-24
//             "
//           >
//             {/* LEFT */}
//             <div className="min-w-0">
//               {/* Label */}
//               <div
//                 className="
//                   mb-5
//                   inline-flex
//                   items-center
//                   gap-2
//                   rounded-full
//                   border
//                   border-emerald-200
//                   bg-emerald-50
//                   px-3
//                   py-1.5
//                 "
//               >
//                 <span
//                   className="
//                     h-1.5
//                     w-1.5
//                     rounded-full
//                     bg-emerald-500
//                     shadow-[0_0_10px_rgba(16,185,129,0.5)]
//                     sm:h-2
//                     sm:w-2
//                   "
//                 />

//                 <span
//                   className="
//                     text-[10px]
//                     font-semibold
//                     tracking-wide
//                     text-emerald-700
//                     sm:text-xs
//                   "
//                 >
//                   WORK WITH ME
//                 </span>
//               </div>

//               {/* Heading */}
//               <h1
//                 className="
//                   text-[1rem]
//                   font-bold
//                   leading-[1.08]
//                   tracking-tight
//                   text-slate-950

//                   sm:text-2xl

//                   md:text-3xl

//                   lg:text-4xl
//                 "
//               >
//                 Let’s Build Something
//                 <span
//                   className="
//                     block
//                     bg-gradient-to-r
//                     from-blue-600
//                     via-indigo-600
//                     to-purple-600
//                     bg-clip-text
//                     text-transparent
//                   "
//                 >
//                   Great Together
//                 </span>
//               </h1>

//               {/* Description */}
//               <p
//                 className="
//                   mt-5
//                   max-w-xl
//                   text-sm
//                   leading-6
//                   text-slate-400

//                   sm:mt-6
//                   sm:text-base
//                   sm:leading-7

//                   lg:text-sm
//                   lg:leading-6
//                 "
//               >
//                 I’m open to opportunities that match my skills, experience, and
//                 passion for building impactful digital products. Whether it’s
//                 remote, on-site, or hybrid — I’m flexible and ready to
//                 collaborate with great teams and clients.
//               </p>
//             </div>

//             {/* RIGHT */}
//             <div className="mt-2 sm:mt-0">
//               <HeroIllustration />
//             </div>
//           </div>
//         </div>

//         {/* ===================================================
//             CONTENT
//         =================================================== */}

//         <div
//           className="
//             mx-auto
//             max-w-7xl
//             px-4
//             pb-12
//             pt-10

//             sm:px-6
//             sm:pb-16
//             sm:pt-14

//             lg:px-8
//             lg:pb-20
//             lg:pt-16
//           "
//         >
//           {/* =================================================
//               WORK PREFERENCES
//           ================================================= */}

//           <div className="max-w-2xl">
//             <p
//               className="
//                 text-[10px]
//                 font-semibold
//                 tracking-[0.2em]
//                 text-blue-600
//                 sm:text-xs
//               "
//             >
//               WORK PREFERENCES
//             </p>

//             <h2
//               className="
//                 mt-2
//                 text-[1.65rem]
//                 font-semibold
//                 leading-tight
//                 tracking-tight
//                 text-slate-950

//                 min-[400px]:text-[1.8rem]

//                 sm:text-3xl

//                 lg:text-4xl
//               "
//             >
//               How would you like to work?
//             </h2>

//             <p
//               className="
//                 mt-2
//                 max-w-xl
//                 text-sm
//                 leading-6
//                 text-slate-600

//                 sm:mt-3
//                 sm:text-base
//                 sm:leading-7
//               "
//             >
//               I’m comfortable with different work environments and always open
//               to flexible collaboration.
//             </p>
//           </div>

//           {/* =================================================
//               WORK CARDS
//           ================================================= */}

//           <div
//             className="
//               mt-6
//               grid
//               grid-cols-1
//               gap-4

//               sm:mt-8
//               sm:grid-cols-2
//               sm:gap-5

//               lg:grid-cols-3
//             "
//           >
//             {workOptions.map((option) => (
//               <WorkOptionCard key={option.title} option={option} />
//             ))}
//           </div>

//           {/* =================================================
//               INFO PANEL
//           ================================================= */}

//           <div
//             className="
//               relative
//               mt-6
//               overflow-hidden
//               rounded-2xl
//               border
//               border-slate-200
//               bg-white/95
//               p-4
//               shadow-[0_15px_50px_rgba(15,23,42,0.06)]
//               backdrop-blur-xl

//               sm:mt-10
//               sm:p-8

//               lg:mt-12
//             "
//           >
//             {/* subtle panel glow */}
//             <div
//               className="
//                 pointer-events-none
//                 absolute
//                 left-0
//                 top-0
//                 h-40
//                 w-40
//                 rounded-full
//                 bg-blue-500/5
//                 blur-3xl
//               "
//             />

//             {/* LEFT CONTENT */}
//             <div
//               className="
//                 relative
//                 z-10

//                 lg:pr-[38%]
//                 xl:pr-[46%]
//               "
//             >
//               {/* INFO ITEMS */}

//               <div
//                 className="
//                   grid
//                   gap-4

//                   sm:grid-cols-3
//                   sm:gap-0
//                   sm:divide-x
//                   sm:divide-slate-200
//                 "
//               >
//                 {infoItems.map(({ label, value, icon: Icon }) => (
//                   <div
//                     key={label}
//                     className="
//                         flex
//                         min-w-0
//                         items-center
//                         gap-3

//                         sm:px-5
//                         sm:first:pl-0
//                         sm:last:pr-0
//                       "
//                   >
//                     <div
//                       className="
//                           flex
//                           h-10
//                           w-10
//                           shrink-0
//                           items-center
//                           justify-center
//                           rounded-full
//                           border
//                           border-blue-100
//                           bg-blue-50
//                           text-blue-600

//                           sm:h-11
//                           sm:w-11
//                         "
//                     >
//                       <Icon size={18} />
//                     </div>

//                     <div className="min-w-0">
//                       <p
//                         className="
//                             text-[10px]
//                             font-medium
//                             text-slate-500
//                             sm:text-xs
//                           "
//                       >
//                         {label}
//                       </p>

//                       <p
//                         className="
//                             mt-0.5
//                             break-words
//                             text-xs
//                             font-semibold
//                             leading-5
//                             text-slate-900

//                             sm:text-sm
//                           "
//                       >
//                         {value}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* =================================================
//                 WORLD MAP
//             ================================================= */}

//             <div
//               className="
//                 pointer-events-none
//                 mt-5
//                 h-28
//                 opacity-90

//                 sm:mt-6
//                 sm:h-44

//                 lg:absolute
//                 lg:inset-y-0
//                 lg:right-0
//                 lg:mt-0
//                 lg:h-auto
//                 lg:w-[38%]

//                 xl:w-[46%]

//                 lg:[mask-image:linear-gradient(to_right,transparent,black_28%)]
//               "
//             >
//               <WorldMap />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import {
  ArrowRight,
  Building2,
  Check,
  Clock3,
  Globe2,
  Lightbulb,
  Link2,
  MapPin,
  RefreshCw,
  Users,
} from "lucide-react";

type Accent = "blue" | "purple" | "green";

type WorkOption = {
  title: string;
  description: string;
  details: string;
  icon: React.ElementType;
  accent: Accent;
  preferred?: boolean;
  features: string[];
};

const workOptions: WorkOption[] = [
  {
    title: "Remote",
    description: "Work from anywhere, stay connected.",
    details:
      "I'm open to remote work and enjoy collaborating with teams and clients across different time zones.",
    icon: Globe2,
    accent: "blue",
    preferred: true,
    features: ["Global collaboration", "Flexible schedule", "Fully remote"],
  },
  {
    title: "On-site",
    description: "Be part of the team, in person.",
    details: "Available for on-site opportunities based in Dhaka, Bangladesh.",
    icon: Building2,
    accent: "purple",
    features: [
      "Team collaboration",
      "Direct communication",
      "Office environment",
    ],
  },
  {
    title: "Hybrid",
    description: "The best of both worlds.",
    details:
      "Open to hybrid roles that combine remote work with on-site collaboration when needed.",
    icon: RefreshCw,
    accent: "green",
    features: [
      "Flexible working style",
      "Better work-life balance",
      "On-site when required",
    ],
  },
];

const infoItems = [
  { label: "Location", value: "Dhaka, Bangladesh", icon: MapPin },
  { label: "Timezone", value: "GMT+6 (BST)", icon: Clock3 },
  { label: "Collaboration", value: "Remote · On-site · Hybrid", icon: Link2 },
];

/* ---------- Accent styles ---------- */

const accentStyles: Record<
  Accent,
  { wrap: string; card: string; icon: string; check: string; button: string }
> = {
  blue: {
    wrap: "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-[0_12px_35px_rgba(59,130,246,0.14)]",
    card: "bg-gradient-to-br from-white via-blue-50/50 to-white",
    icon: "border-blue-200 bg-blue-50 text-blue-600 shadow-[0_8px_20px_rgba(59,130,246,0.10)]",
    check: "bg-blue-500",
    button:
      "border-blue-200 bg-blue-50 text-blue-600 hover:border-blue-300 hover:bg-blue-100 focus-visible:ring-blue-400",
  },
  purple: {
    wrap: "bg-slate-200 shadow-[0_12px_35px_rgba(15,23,42,0.06)]",
    card: "bg-white",
    icon: "border-purple-200 bg-purple-50 text-purple-600 shadow-[0_8px_20px_rgba(168,85,247,0.08)]",
    check: "bg-slate-500",
    button:
      "border-purple-200 bg-purple-50 text-purple-600 hover:border-purple-300 hover:bg-purple-100 focus-visible:ring-purple-400",
  },
  green: {
    wrap: "bg-gradient-to-br from-emerald-400 via-emerald-300 to-teal-400 shadow-[0_12px_35px_rgba(16,185,129,0.10)]",
    card: "bg-gradient-to-br from-white via-emerald-50/40 to-white",
    icon: "border-emerald-200 bg-emerald-50 text-emerald-600 shadow-[0_8px_20px_rgba(16,185,129,0.08)]",
    check: "bg-emerald-500",
    button:
      "border-emerald-200 bg-emerald-50 text-emerald-600 hover:border-emerald-300 hover:bg-emerald-100 focus-visible:ring-emerald-400",
  },
};

/* ---------- Fit-to-width scaling for the fixed-size illustration ---------- */

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

function useFitScale(baseWidth: number) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = React.useState(1);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / baseWidth));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseWidth]);

  return { ref, scale };
}

/* ---------- Float card ---------- */

type FloatCardProps = {
  className: string;
  icon: React.ReactNode;
  line1: string;
  line2: string;
  border: string;
  glow: string;
  iconBox: string;
};

function FloatCard({
  className,
  icon,
  line1,
  line2,
  border,
  glow,
  iconBox,
}: FloatCardProps) {
  return (
    <div
      className={`absolute z-20 rounded-xl border bg-white/90 px-3.5 py-2.5 shadow-[0_12px_35px_rgba(15,23,42,0.10)] backdrop-blur-xl ${border} ${glow} ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconBox}`}
        >
          {icon}
        </div>
        <div className="leading-tight">
          <p className="text-[11px] text-slate-500">{line1}</p>
          <p className="text-sm font-semibold text-slate-900">{line2}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Laptop SVG ---------- */

function LaptopSvg() {
  return (
    <svg
      viewBox="0 0 420 270"
      fill="none"
      className="absolute left-[90px] top-[105px] z-10 w-[350px]"
      aria-hidden
    >
      <defs>
        <radialGradient id="wwm-screen" cx="50%" cy="50%" r="65%">
          <stop offset="0" stopColor="#3b4fd8" />
          <stop offset="0.5" stopColor="#1a1f5c" />
          <stop offset="1" stopColor="#0b1030" />
        </radialGradient>
        <linearGradient id="wwm-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4b5563" />
          <stop offset="1" stopColor="#1f2937" />
        </linearGradient>
        <filter id="wwm-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id="wwm-codeglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse
        cx="215"
        cy="248"
        rx="190"
        ry="22"
        fill="#7c3aed"
        opacity="0.25"
        filter="url(#wwm-blur)"
      />
      <polygon
        points="112,34 296,18 286,158 96,172"
        fill="#3b5bff"
        opacity="0.30"
        filter="url(#wwm-blur)"
      />
      <polygon
        points="112,34 296,18 286,158 96,172"
        fill="#0b1020"
        stroke="#475569"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <polygon points="121,43 287,28 278,148 107,162" fill="url(#wwm-screen)" />

      <g
        filter="url(#wwm-codeglow)"
        stroke="#8b9cff"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(198 95) skewY(-4) translate(-198 -95)"
      >
        <path d="M170 80 L150 96 L168 112" />
        <path d="M207 74 L192 116" />
        <path d="M224 82 L244 98 L226 114" />
      </g>

      <polygon
        points="96,172 286,158 372,212 52,238"
        fill="url(#wwm-base)"
        stroke="#64748b"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polygon
        points="52,238 372,212 372,220 52,246"
        fill="#111827"
        stroke="#7c3aed"
        strokeOpacity="0.6"
      />
      <path d="M96 172 L286 158" stroke="#94a3b8" strokeOpacity="0.5" />

      <g
        stroke="#94a3b8"
        strokeOpacity="0.35"
        strokeWidth="1.5"
        strokeDasharray="6 3"
      >
        <path d="M85 188.5 L307.5 171.5" />
        <path d="M76 202 L325 182" />
        <path d="M67 215 L342 193" />
      </g>

      <polygon
        points="163.6,211.6 248.6,204.8 255.9,215 163.9,222.7"
        fill="#0f172a"
        stroke="#475569"
      />
    </svg>
  );
}

/* ---------- Plant SVG ---------- */

function PlantSvg() {
  return (
    <svg
      viewBox="0 0 80 120"
      fill="none"
      className="absolute right-1 top-[165px] z-10 h-[115px] w-[80px]"
      aria-hidden
    >
      <defs>
        <linearGradient id="wwm-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6ee7b7" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="wwm-pot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#334155" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <path
        d="M40 72 C34 52 30 34 22 14 C38 20 46 44 40 72Z"
        fill="url(#wwm-leaf)"
      />
      <path
        d="M40 72 C46 52 56 34 72 26 C70 46 58 64 40 72Z"
        fill="url(#wwm-leaf)"
      />
      <path
        d="M40 76 C26 70 12 60 6 44 C22 46 36 58 40 76Z"
        fill="url(#wwm-leaf)"
        opacity="0.9"
      />
      <path
        d="M40 72 C42 54 46 38 44 8 C54 28 52 54 40 72Z"
        fill="url(#wwm-leaf)"
        opacity="0.95"
      />
      <path
        d="M18 74 L62 74 L56 116 Q55 118 52 118 L28 118 Q25 118 24 116 Z"
        fill="url(#wwm-pot)"
        stroke="#475569"
        strokeOpacity="0.5"
      />
      <ellipse cx="40" cy="74" rx="22" ry="4" fill="#0b1220" />
    </svg>
  );
}

/* ---------- Hero illustration (scales smoothly to any width) ---------- */

const ART_W = 520;
const ART_H = 330;

function HeroIllustration() {
  const { ref, scale } = useFitScale(ART_W);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[520px]"
      style={{ height: ART_H * scale }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: ART_W, height: ART_H, transform: `scale(${scale})` }}
      >
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div
          className="absolute left-0 top-[85px] z-10 -rotate-[8deg] text-[21px] leading-6 text-slate-500"
          style={{ fontFamily: "'Caveat', 'Segoe Script', cursive" }}
        >
          <span className="block">Good ideas</span>
          <span className="block">need great</span>
          <span className="block">collaboration</span>
          <svg
            className="ml-14 mt-1"
            width="55"
            height="30"
            viewBox="0 0 55 30"
            fill="none"
          >
            <path
              d="M2 2C17 23 30 25 51 19"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M42 13L51 19L42 25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <FloatCard
          className="left-[160px] top-[70px]"
          icon={<Users size={18} />}
          line1="Build"
          line2="Together"
          border="border-purple-200"
          glow="shadow-[0_10px_35px_rgba(139,92,246,0.12)]"
          iconBox="bg-purple-50 text-purple-600"
        />

        <FloatCard
          className="left-[272px] top-0"
          icon={<Lightbulb size={19} />}
          line1="Solve"
          line2="Problems"
          border="border-cyan-200"
          glow="shadow-[0_10px_35px_rgba(6,182,212,0.10)]"
          iconBox="bg-cyan-50 text-cyan-600"
        />

        <FloatCard
          className="right-0 top-[68px]"
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 20v-5" />
              <path d="M10 20v-8" />
              <path d="M16 20v-4" />
              <path d="M3 11l6-5 4 3 7-6" />
              <path d="M15 3h5v5" />
            </svg>
          }
          line1="Create"
          line2="Impact"
          border="border-blue-200"
          glow="shadow-[0_10px_35px_rgba(59,130,246,0.10)]"
          iconBox="bg-blue-50 text-blue-600"
        />

        <LaptopSvg />
        <PlantSvg />
      </div>
    </div>
  );
}

/* ---------- World map ---------- */

function WorldMap() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 600 230"
      fill="none"
      aria-hidden
    >
      <defs>
        <pattern
          id="wwm-dots"
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="1.1" fill="#93c5fd" />
        </pattern>
        <mask id="wwm-land">
          <g fill="white">
            <path d="M20 22 L67 16 L142 13 L167 16 L200 32 L208 48 L183 59 L173 72 L165 88 L138 86 L138 99 L153 104 L167 115 L148 110 L125 96 L103 77 L93 64 L93 51 L75 35 L50 32 L25 32 Z" />
            <path d="M167 115 L200 112 L217 128 L242 138 L233 163 L203 189 L187 216 L175 208 L180 176 L183 157 L165 136 L167 128 Z" />
            <path d="M283 70 L285 59 L297 51 L308 45 L317 35 L333 16 L350 14 L367 22 L367 40 L350 56 L347 62 L333 64 L320 67 L300 67 Z" />
            <path d="M272 94 L283 77 L317 69 L353 78 L372 109 L385 110 L367 133 L367 152 L355 171 L333 184 L320 157 L315 130 L315 122 L287 122 L272 106 Z" />
            <path d="M367 22 L400 16 L467 5 L533 13 L583 22 L567 40 L537 56 L517 77 L503 80 L500 93 L480 112 L472 126 L463 115 L453 93 L433 115 L422 96 L412 88 L395 86 L383 80 L372 107 L358 80 L360 70 L347 62 L350 56 L367 40 Z" />
            <path d="M490 163 L508 150 L528 147 L537 146 L550 163 L555 173 L547 189 L530 184 L515 179 L492 182 Z" />
          </g>
        </mask>
      </defs>

      <rect
        width="600"
        height="230"
        fill="url(#wwm-dots)"
        mask="url(#wwm-land)"
        opacity="0.8"
      />

      <g
        stroke="rgba(59,130,246,0.35)"
        strokeWidth="1.2"
        strokeDasharray="3 4"
        strokeLinecap="round"
      >
        <path d="M451 90 Q310 -10 177 63" />
        <path d="M451 90 Q380 20 300 46" />
        <path d="M451 90 Q530 110 552 182" />
      </g>

      <circle
        cx="451"
        cy="90"
        r="6"
        fill="none"
        stroke="#60a5fa"
        strokeOpacity="0.5"
      >
        <animate
          attributeName="r"
          values="6;20"
          dur="2.2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-opacity"
          values="0.5;0"
          dur="2.2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="451" cy="90" r="5" fill="#3b82f6" />
      <circle cx="451" cy="90" r="2" fill="white" />
      <path d="M470 74 L455 86" stroke="rgba(59,130,246,0.35)" />
      <rect
        x="462"
        y="52"
        width="78"
        height="24"
        rx="7"
        fill="#eff6ff"
        stroke="#bfdbfe"
      />
      <text
        x="501"
        y="68"
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="#2563eb"
      >
        Dhaka, BD
      </text>
    </svg>
  );
}

/* ---------- Work option card ---------- */

function WorkOptionCard({
  option,
  onSelect,
}: {
  option: WorkOption;
  onSelect?: () => void;
}) {
  const Icon = option.icon;
  const styles = accentStyles[option.accent];

  return (
    <div
      className={`group h-full rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        option.preferred ? "p-[2px]" : "p-px"
      } ${styles.wrap}`}
    >
      <div
        className={`relative flex h-full min-h-[300px] flex-col rounded-[14px] p-5 sm:min-h-[340px] sm:p-6 ${styles.card}`}
      >
        {option.preferred && (
          <span className="absolute right-4 top-4 rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-[10px] font-semibold text-purple-600 sm:right-5 sm:top-5 sm:px-3 sm:text-[11px]">
            Preferred
          </span>
        )}

        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full border sm:mb-5 sm:h-14 sm:w-14 ${styles.icon}`}
        >
          <Icon
            size={24}
            strokeWidth={1.8}
            className="sm:h-[26px] sm:w-[26px]"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {option.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {option.description}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500 sm:mt-4">
            {option.details}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <ul className="min-w-0 space-y-2.5 sm:space-y-3">
            {option.features.map((feature) => (
              <li
                key={feature}
                className="flex min-w-0 items-start gap-2.5 text-sm leading-5 text-slate-600 sm:items-center sm:gap-3"
              >
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full sm:mt-0 ${styles.check}`}
                >
                  <Check size={10} strokeWidth={3} className="text-white" />
                </span>
                <span className="min-w-0 break-words">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={onSelect}
            aria-label={`Select ${option.title}`}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:scale-100 ${styles.button}`}
          >
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Main component ---------- */

export default function WorkWithMe() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const lastIndex = workOptions.length - 1;

  return (
    <section
      id="work-with-me"
      className="relative overflow-hidden bg-white text-slate-900"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[-150px] top-20 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute right-[-150px] top-96 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute left-1/2 top-[45%] h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/[0.025] blur-3xl" />
      </div>

      <div className="relative">
        {/* HERO */}
        <div className="border-b border-slate-200">
          <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-8 pt-20 sm:gap-10 sm:px-6 sm:pb-10 sm:pt-24 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:pb-12">
            <div className="min-w-0">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] sm:h-2 sm:w-2" />
                <span className="text-[11px] font-semibold tracking-wider text-emerald-700 sm:text-xs">
                  WORK WITH ME
                </span>
              </div>

              <h1 className="text-[2rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-slate-950 min-[400px]:text-[2.4rem] sm:text-5xl lg:text-[clamp(2.4rem,4.1vw,3.4rem)]">
                Let’s Build Something
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text pb-[0.1em] text-transparent">
                  Great Together
                </span>
              </h1>

              <p className="mt-5 max-w-[34rem] text-[0.95rem] leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-7 lg:text-[1.05rem] lg:leading-8 xl:text-lg">
                I’m open to opportunities that match my skills, experience, and
                passion for building impactful digital products. Whether it’s
                remote, on-site, or hybrid — I’m flexible and ready to
                collaborate with great teams and clients.
              </p>
            </div>

            <div className="min-w-0">
              <HeroIllustration />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-16">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-blue-600 sm:text-xs">
              WORK PREFERENCES
            </p>
            <h2 className="mt-2 text-balance text-[1.65rem] font-semibold leading-tight tracking-tight text-slate-950 min-[400px]:text-[1.8rem] sm:text-3xl lg:text-4xl">
              How would you like to work?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
              I’m comfortable with different work environments and always open
              to flexible collaboration.
            </p>
          </div>

          {/* Cards: 1 col → 2 col (last card centered) → 3 col */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {workOptions.map((option, i) => (
              <div
                key={option.title}
                className={
                  i === lastIndex && workOptions.length % 2 === 1
                    ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.625rem)] lg:col-span-1 lg:mx-0 lg:w-full"
                    : ""
                }
              >
                <WorkOptionCard option={option} onSelect={scrollToContact} />
              </div>
            ))}
          </div>

          {/* Info panel */}
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-[0_15px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:mt-10 sm:p-8 lg:mt-12">
            <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl" />

            <div className="relative z-10 lg:pr-[38%] xl:pr-[46%]">
              <div className="grid gap-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-slate-200 lg:grid-cols-1 lg:divide-x-0 lg:divide-y xl:grid-cols-3 xl:divide-x xl:divide-y-0">
                {infoItems.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex min-w-0 items-center gap-3 sm:px-4 sm:first:pl-0 sm:last:pr-0 lg:px-0 lg:py-3 lg:first:pt-0 lg:last:pb-0 xl:px-5 xl:py-0 xl:first:pl-0 xl:last:pr-0"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600 sm:h-11 sm:w-11">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-slate-500 sm:text-xs">
                        {label}
                      </p>
                      <p className="mt-0.5 break-words text-sm font-semibold leading-5 text-slate-900">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none mt-5 h-32 opacity-90 sm:mt-6 sm:h-44 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[38%] lg:[mask-image:linear-gradient(to_right,transparent,black_28%)] xl:w-[46%]">
              <WorldMap />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
