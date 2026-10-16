// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Bell,
//   Check,
//   Code2,
//   Home,
//   LoaderCircle,
//   Settings,
//   Wrench,
// } from "lucide-react";

// const PROGRESS = 68;

// const stages = [
//   { name: "Planning", progress: 100 },
//   { name: "Design", progress: 100 },
//   { name: "Development", progress: 68 },
//   { name: "Testing", progress: 0 },
// ];

// export default function UnderDevelopment() {
//   const navigate = useNavigate();
//   const [progress, setProgress] = useState(0);
//   const [notified, setNotified] = useState(false);

//   useEffect(() => {
//     const timer = window.setTimeout(() => {
//       setProgress(PROGRESS);
//     }, 300);

//     return () => window.clearTimeout(timer);
//   }, []);

//   const handleGoBack = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate("/");
//     }
//   };

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#070b18] text-white">
//       {/* Background Effects */}
//       <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
//       <div className="pointer-events-none absolute -bottom-48 right-0 h-[500px] w-[500px] rounded-full bg-purple-700/20 blur-[140px]" />

//       <section className="relative mx-auto grid min-h-screen max-w-[1440px] items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16">
//         {/* Left Content */}
//         <div className="relative z-10">
//           {/* Status Badge */}
//           <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-200">
//             <Settings size={16} className="animate-spin-slow" />
//             <span>Currently Under Development</span>
//           </div>

//           {/* Heading */}
//           <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
//             This Page Is
//             <span className="mt-2 block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
//               Under Development
//             </span>
//           </h1>

//           <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
//             I’m currently working on this page to make it better, more useful,
//             and more engaging for you. Stay tuned for something awesome!
//           </p>

//           {/* Progress Card */}
//           <div className="mt-9 rounded-3xl border border-white/[0.08] bg-white/[0.035] p-5 shadow-2xl shadow-blue-950/20 backdrop-blur-xl sm:p-6">
//             <div className="mb-5 flex items-center justify-between gap-4">
//               <div className="flex items-center gap-3">
//                 <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-500">
//                   <Wrench size={19} />
//                 </span>

//                 <div>
//                   <h2 className="font-semibold sm:text-lg">
//                     Development Progress
//                   </h2>
//                   <p className="mt-1 text-xs text-slate-500">
//                     Work in progress
//                   </p>
//                 </div>
//               </div>

//               <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
//                 {progress}%
//               </span>
//             </div>

//             {/* Progress Bar */}
//             <div
//               className="h-3 overflow-hidden rounded-full bg-slate-800 sm:h-4"
//               role="progressbar"
//               aria-label="Development progress"
//               aria-valuemin={0}
//               aria-valuemax={100}
//               aria-valuenow={progress}
//             >
//               <div
//                 className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.45)] transition-[width] duration-[1500ms] ease-out"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>

//           {/* Development Stages */}
//           <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4">
//             {stages.map((stage) => {
//               const completed = stage.progress === 100;
//               const active = stage.name === "Development";

//               return (
//                 <div key={stage.name} className="relative">
//                   <div className="mb-3 flex items-center gap-2">
//                     <span
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
//                         completed
//                           ? "border-emerald-400 bg-emerald-400 text-slate-950"
//                           : active
//                             ? "border-violet-400 bg-violet-500/15 text-violet-300"
//                             : "border-slate-700 bg-slate-800/70 text-slate-500"
//                       }`}
//                     >
//                       {completed ? (
//                         <Check size={19} strokeWidth={3} />
//                       ) : active ? (
//                         <LoaderCircle size={19} className="animate-spin" />
//                       ) : (
//                         <span className="h-3 w-3 rounded-full border-2 border-current" />
//                       )}
//                     </span>
//                   </div>

//                   <p className="text-sm font-medium text-slate-200">
//                     {stage.name}
//                   </p>

//                   <p
//                     className={`mt-1 text-sm font-semibold ${
//                       completed
//                         ? "text-emerald-400"
//                         : active
//                           ? "text-violet-400"
//                           : "text-slate-500"
//                     }`}
//                   >
//                     {stage.progress}%
//                   </p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Action Buttons */}
//           <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
//             <button
//               type="button"
//               onClick={handleGoBack}
//               className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-cyan-400/60 px-5 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
//             >
//               <ArrowLeft size={20} />
//               Go Back
//             </button>

//             <Link
//               to="/"
//               className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-3 font-semibold text-white shadow-lg shadow-purple-900/30 transition duration-300 hover:-translate-y-1 hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
//             >
//               <Home size={20} />
//               Back to Home
//             </Link>

//             <button
//               type="button"
//               onClick={() => setNotified(true)}
//               className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-purple-400/60 px-5 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-purple-500/10 focus:outline-none focus:ring-2 focus:ring-purple-400"
//             >
//               <Bell size={20} />
//               {notified ? "Coming Soon!" : "Notify Me"}
//             </button>
//           </div>

//           <p className="mt-8 text-sm text-slate-500">
//             Crafted with care. Better things take time.
//             <span className="ml-2 text-purple-400">✦</span>
//           </p>
//         </div>

//         {/* Right Illustration */}
//         <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
//           <div className="absolute inset-10 rounded-full bg-blue-600/20 blur-[100px]" />

//           <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/90 via-[#10152d] to-purple-950/40 p-3 shadow-2xl shadow-blue-950/40 sm:p-5">
//             <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl" />

//             <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1020]">
//               {/* Mock Browser Header */}
//               <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.035] px-5 py-4">
//                 <span className="h-3 w-3 rounded-full bg-rose-400" />
//                 <span className="h-3 w-3 rounded-full bg-amber-300" />
//                 <span className="h-3 w-3 rounded-full bg-emerald-400" />

//                 <div className="ml-3 flex-1 rounded-md bg-white/[0.06] px-3 py-1.5 text-xs text-slate-500">
//                   ahad.dev / in-progress
//                 </div>
//               </div>

//               {/* Main Illustration */}
//               <div className="relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden px-6 py-12 sm:min-h-[380px]">
//                 <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

//                 <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-blue-400/30 bg-gradient-to-br from-blue-500/20 to-purple-600/20 shadow-[0_0_50px_rgba(99,102,241,0.16)] sm:h-32 sm:w-32">
//                   <Code2
//                     size={60}
//                     strokeWidth={1.5}
//                     className="text-cyan-300 sm:h-[76px] sm:w-[76px]"
//                   />

//                   <span className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-xl border border-purple-400/30 bg-[#17132e] text-purple-300">
//                     <Settings size={21} />
//                   </span>
//                 </div>

//                 <h3 className="relative mt-8 text-center text-xl font-bold sm:text-2xl">
//                   Building Something Great
//                 </h3>

//                 <p className="relative mt-2 text-center text-sm text-slate-400">
//                   Design. Develop. Improve.
//                 </p>

//                 {/* Decorative Code Lines */}
//                 <div className="relative mt-7 w-full max-w-xs space-y-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5">
//                   <div className="flex gap-2">
//                     <span className="h-2 w-12 rounded-full bg-cyan-400/80" />
//                     <span className="h-2 w-20 rounded-full bg-purple-400/70" />
//                   </div>
//                   <div className="h-2 w-4/5 rounded-full bg-slate-700" />
//                   <div className="h-2 w-3/5 rounded-full bg-slate-700" />
//                   <div className="h-2 w-2/3 rounded-full bg-blue-500/50" />
//                 </div>

//                 <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/5 text-cyan-300">
//                   <Code2 size={24} />
//                 </div>
//               </div>
//             </div>

//             {/* Bottom Card */}
//             <div className="flex items-center justify-between gap-4 px-3 py-5 sm:px-4">
//               <div>
//                 <p className="text-sm font-semibold text-slate-200">
//                   Something better is coming
//                 </p>
//                 <p className="mt-1 text-xs text-slate-500">
//                   Thanks for your patience.
//                 </p>
//               </div>

//               <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 text-purple-300">
//                 <Wrench size={22} />
//               </div>
//             </div>
//           </div>

//           {/* Floating Status */}
//           <div className="absolute -left-2 top-12 hidden rounded-2xl border border-emerald-400/20 bg-[#101b25]/95 p-4 shadow-xl sm:block lg:-left-6">
//             <div className="flex items-center gap-3">
//               <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-400">
//                 <Check size={20} />
//               </span>
//               <div>
//                 <p className="text-xs text-slate-400">Design Status</p>
//                 <p className="mt-1 text-sm font-semibold text-emerald-400">
//                   Completed
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="absolute -right-2 bottom-24 hidden rounded-2xl border border-purple-400/20 bg-[#151129]/95 p-4 shadow-xl sm:block lg:-right-5">
//             <div className="flex items-center gap-3">
//               <LoaderCircle
//                 size={22}
//                 className="animate-spin text-purple-400"
//               />
//               <div>
//                 <p className="text-xs text-slate-400">Current Status</p>
//                 <p className="mt-1 text-sm font-semibold text-purple-300">
//                   In Progress
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }
