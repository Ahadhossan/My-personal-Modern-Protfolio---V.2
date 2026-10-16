// const careerTargets: string[] = [
//   "Frontend Developer",
//   "React.js Developer",
//   "Next.js Developer",
//   "Web Developer",
//   "Junior Software Engineer",
//   "Junior Frontend Engineer",
//   "UI & UX Developer",
//   "Software Support Engineer",
//   "Product Support Engineer",
// ];

// const firstRow = careerTargets.slice(0, 4);
// const secondRow = careerTargets.slice(4);

// // Number of times each row is repeated. The animation moves by
// // -(100 / COPIES)% so the loop is seamless.
// const COPIES = 4;

// type MarqueeRowProps = {
//   items: string[];
//   reverse?: boolean;
//   duration?: number;
// };

// function MarqueeRow({
//   items,
//   reverse = false,
//   duration = 36,
// }: MarqueeRowProps) {
//   const repeatedItems = Array.from({ length: COPIES }).flatMap(() => items);

//   return (
//     <div className="career-marquee w-full overflow-hidden">
//       <div
//         className="career-marquee-track flex w-max items-center"
//         style={{
//           animationDuration: `${duration}s`,
//           animationDirection: reverse ? "reverse" : "normal",
//         }}
//       >
//         {repeatedItems.map((career, index) => (
//           <div
//             key={`${career}-${index}`}
//             aria-hidden={index >= items.length ? true : undefined}
//             className="career-item group flex shrink-0 items-center gap-6 px-5 py-3 sm:gap-8 sm:px-7 lg:gap-10 lg:px-9"
//           >
//             <span className="career-outline inline-block whitespace-nowrap text-[clamp(1.25rem,3.1vw,3.4rem)] font-black uppercase leading-none tracking-[-0.045em] transition-transform duration-500 ease-out group-hover:scale-[1.04]">
//               {career}
//             </span>

//             <span
//               aria-hidden="true"
//               className="career-diamond h-3 w-3 shrink-0 rotate-45 sm:h-4 sm:w-4"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const CareerTarget = () => {
//   return (
//     <
//       id="career-target"
//       aria-labelledby="career-target-heading"
//       className="career-target-section relative isolate overflow-hidden bg-white py-12 text-slate-950 transition-colors duration-500 dark:bg-[#050812] dark:text-white sm:py-16 md:py-20"
//     >
//       {/* Section heading */}
//       <div className="relative z-10 mx-auto mb-12 max-w-4xl px-5 text-center sm:mb-16">
//         <h2
//           id="career-target-heading"
//           className="text-[28px] font-bold leading-tight text-[#0F2E33] transition-colors duration-300 dark:text-white sm:text-[34px] lg:text-[40px]"
//         >
//           My Career{" "}
//           <span className="bg-gradient-to-r from-[#2a7fa3] to-[#6366f1] bg-clip-text text-transparent">
//             Target
//           </span>
//         </h2>
//       </div>

//       {/* Animated career rows */}
//       <div className="relative flex flex-col gap-5 sm:gap-7">
//         <MarqueeRow items={firstRow} duration={36} />
//         <MarqueeRow items={secondRow} reverse duration={32} />
//       </div>

//       <div
//         aria-hidden="true"
//         className="mx-auto mt-12 h-px max-w-6xl bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/10 sm:mt-16"
//       />

//       <style>{`
//         .career-marquee {
//           -webkit-mask-image: linear-gradient(
//             to right,
//             transparent,
//             black 5%,
//             black 95%,
//             transparent
//           );
//           mask-image: linear-gradient(
//             to right,
//             transparent,
//             black 5%,
//             black 95%,
//             transparent
//           );
//         }

//         .career-marquee-track {
//           width: max-content;
//           animation-name: career-scroll;
//           animation-timing-function: linear;
//           animation-iteration-count: infinite;
//           will-change: transform;
//         }

//         @keyframes career-scroll {
//           from {
//             transform: translate3d(0, 0, 0);
//           }

//           to {
//             transform: translate3d(-25%, 0, 0);
//           }
//         }

//         .career-outline {
//           color: transparent;
//           -webkit-text-stroke: 1px #94a3b8;
//         }

//         .dark .career-outline {
//           -webkit-text-stroke-color: #52677f;
//         }

//         /* Light mode gradient hover */
//         .career-item:hover .career-outline {
//           background: linear-gradient(
//             90deg,
//             #0284c7,
//             #4f46e5,
//             #9333ea,
//             #0284c7
//           );
//           background-size: 200% auto;
//           background-clip: text;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           -webkit-text-stroke-color: transparent;
//           animation: career-gradient 2s linear infinite;
//           text-shadow: none;
//           filter: drop-shadow(0 0 10px rgb(99 102 241 / 25%));
//         }

//         /* Dark mode neon hover */
//         .dark .career-item:hover .career-outline {
//           background: linear-gradient(
//             90deg,
//             #22d3ee,
//             #3b82f6,
//             #c084fc,
//             #22d3ee
//           );
//           background-size: 200% auto;
//           background-clip: text;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           -webkit-text-stroke-color: transparent;
//           animation: career-gradient 2s linear infinite;
//           filter: drop-shadow(0 0 9px rgb(34 211 238 / 30%));
//         }

//         .career-diamond {
//           background: linear-gradient(
//             135deg,
//             #38bdf8,
//             #6366f1 55%,
//             #a855f7
//           );
//           box-shadow: 0 0 12px rgb(99 102 241 / 25%);
//           transition: box-shadow 350ms ease;
//         }

//         .career-item:hover .career-diamond {
//           box-shadow:
//             0 0 12px rgb(56 189 248 / 65%),
//             0 0 25px rgb(168 85 247 / 35%);
//           animation: diamond-pulse 1.2s ease-in-out infinite alternate;
//         }

//         @keyframes career-gradient {
//           from {
//             background-position: 0% center;
//           }

//           to {
//             background-position: 200% center;
//           }
//         }

//         @keyframes diamond-pulse {
//           from {
//             transform: rotate(45deg) scale(1);
//           }

//           to {
//             transform: rotate(225deg) scale(1.2);
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .career-marquee {
//             -webkit-mask-image: none;
//             mask-image: none;
//           }

//           .career-marquee-track {
//             animation: none !important;
//             transform: none !important;
//             width: 100%;
//             flex-wrap: wrap;
//             justify-content: center;
//           }

//           .career-item[aria-hidden="true"] {
//             display: none;
//           }

//           .career-item:hover .career-outline,
//           .career-item:hover .career-diamond {
//             animation: none !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default CareerTarget;
