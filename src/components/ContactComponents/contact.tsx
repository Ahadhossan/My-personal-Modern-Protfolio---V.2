// "use client";

// import React, {
//   useEffect,
//   useRef,
//   useState,
//   type ChangeEvent,
//   type FormEvent,
// } from "react";
// import { Check, Copy, Mail, MapPin, Phone, X } from "lucide-react";
// import emailjs from "@emailjs/browser";
// import {
//   motion,
//   AnimatePresence,
//   useInView,
//   useReducedMotion,
//   type Variants,
// } from "framer-motion";

// // ============================================================
// // EMAILJS CONFIG
// // ============================================================

// const EMAILJS_SERVICE_ID = "service_7hc6uli";
// const EMAILJS_TEMPLATE_ID = "template_fni6mgr";
// const EMAILJS_PUBLIC_KEY = "a8W05Bi3SM5Z8J3au";

// const CONTACT_EMAIL = "ahadm3016@gmail.com";
// const CONTACT_PHONE = "+880 1322959861"; // shown on screen
// const CONTACT_PHONE_RAW = "+8801322959861"; // used for tel: link and copy

// // ============================================================
// // GMAIL COMPOSE URL
// // ============================================================

// const buildGmailComposeUrl = ({
//   to,
//   subject,
//   body,
// }: {
//   to: string;
//   subject?: string;
//   body?: string;
// }) => {
//   const params = new URLSearchParams({
//     view: "cm",
//     fs: "1",
//     to,
//     ...(subject ? { su: subject } : {}),
//     ...(body ? { body } : {}),
//   });

//   return `https://mail.google.com/mail/?${params.toString()}`;
// };

// const GMAIL_COMPOSE_URL = buildGmailComposeUrl({
//   to: CONTACT_EMAIL,
//   subject: "Let's work together",
//   body: "Hi Ahad,\n\nI'd like to connect about...",
// });

// // ============================================================
// // PROJECT TYPES
// // ============================================================

// const PROJECT_TYPES = [
//   "Product design",
//   "Front-end build",
//   "Full project",
//   "Not sure yet",
// ] as const;

// type ProjectType = (typeof PROJECT_TYPES)[number] | "";

// // ============================================================
// // FORM TYPES
// // ============================================================

// interface ContactFormState {
//   name: string;
//   email: string;
//   type: ProjectType;
//   message: string;
// }

// type SubmitStatus = "idle" | "sending" | "sent" | "error";

// // ============================================================
// // ANIMATION VARIANTS
// // ============================================================

// const EASE = [0.22, 1, 0.36, 1] as const;

// // Reduced-motion fallback: everything is simply visible
// const still: Variants = {
//   hidden: { opacity: 1 },
//   visible: { opacity: 1 },
// };

// const leftVariants: Variants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
// };

// const wordVariants: Variants = {
//   hidden: { y: "110%" },
//   visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
// };

// const underlineVariants: Variants = {
//   hidden: { pathLength: 0, opacity: 0 },
//   visible: {
//     pathLength: 1,
//     opacity: 1,
//     transition: { duration: 0.9, delay: 0.55, ease: EASE },
//   },
// };

// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
//   visible: {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: { duration: 0.65, ease: EASE },
//   },
// };

// const rowsVariants: Variants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
// };

// const rowVariants: Variants = {
//   hidden: { opacity: 0, y: 28, scale: 0.97 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { type: "spring", stiffness: 220, damping: 22 },
//   },
// };

// const formVariants: Variants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
// };

// const fieldVariants: Variants = {
//   hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
//   visible: {
//     opacity: 1,
//     y: 0,
//     filter: "blur(0px)",
//     transition: { duration: 0.6, ease: EASE },
//   },
// };

// const successVariants: Variants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
// };

// // ============================================================
// // CONTACT ROW
// // ============================================================

// interface ContactRowProps {
//   icon: React.ElementType;
//   label: string;
//   value: string;
//   description?: string;
//   href?: string;
//   target?: string;
//   rel?: string;
//   /** When set, shows a small "copy" button that copies this text. */
//   copyValue?: string;
//   /** Called after a copy attempt so the page can show a message. */
//   onCopy?: (ok: boolean, label: string) => void;
//   className?: string;
// }

// function ContactRow({
//   icon: Icon,
//   label,
//   value,
//   description,
//   href,
//   target,
//   rel,
//   copyValue,
//   onCopy,
//   className = "",
// }: ContactRowProps) {
//   const reduceMotion = Boolean(useReducedMotion());
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     const text = copyValue ?? value;
//     let ok = false;

//     try {
//       // Modern API (needs https or localhost)
//       await navigator.clipboard.writeText(text);
//       ok = true;
//     } catch {
//       // Fallback for older mobile browsers / non-secure pages
//       try {
//         const ta = document.createElement("textarea");
//         ta.value = text;
//         ta.setAttribute("readonly", "");
//         ta.style.position = "fixed";
//         ta.style.opacity = "0";
//         document.body.appendChild(ta);
//         ta.select();
//         ta.setSelectionRange(0, text.length);
//         ok = document.execCommand("copy");
//         document.body.removeChild(ta);
//       } catch {
//         ok = false;
//       }
//     }

//     if (ok) {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }

//     onCopy?.(ok, label);
//   };

//   const valueClasses =
//     "block max-w-full break-words [overflow-wrap:anywhere] text-[15px] font-medium leading-snug tracking-[-0.015em] text-[#10243f] transition-colors dark:text-slate-100 sm:text-base lg:text-[17px]";

//   return (
//     <motion.div
//       variants={reduceMotion ? still : rowVariants}
//       whileHover={
//         reduceMotion
//           ? undefined
//           : {
//               y: -4,
//               transition: { type: "spring", stiffness: 320, damping: 18 },
//             }
//       }
//       className={`group relative isolate flex w-full cursor-pointer items-start gap-4 overflow-hidden rounded-2xl border border-[#0E1525]/15 bg-white p-4 shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition-[border-color,box-shadow] duration-300 hover:border-[#15919B] hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_8px_25px_rgba(0,0,0,0.2)] dark:hover:border-teal-400/70 sm:items-center sm:gap-5 sm:p-5 lg:rounded-[26px] lg:p-6 ${className}`}
//     >
//       {/* Soft sweep on hover */}
//       <span
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 -translate-x-full bg-gradient-to-r from-transparent via-[#15919B]/[0.06] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
//       />

//       {/* ICON */}
//       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#eefafa] to-[#e8f8f8] transition-transform duration-500 group-hover:-rotate-6 dark:from-teal-950/80 dark:to-slate-800 sm:h-12 sm:w-12">
//         <Icon
//           className="h-5 w-5 text-[#078b8c] transition-transform duration-500 group-hover:scale-110 sm:h-6 sm:w-6"
//           strokeWidth={1.6}
//           aria-hidden="true"
//         />
//       </div>

//       {/* DESKTOP ACCENT LINE: grows in on hover */}
//       <div
//         aria-hidden="true"
//         className="hidden w-[3px] shrink-0 origin-top scale-y-50 self-stretch rounded-full bg-gradient-to-b from-cyan-400 via-teal-400 to-cyan-500 transition-transform duration-500 group-hover:scale-y-100 xl:block"
//       />

//       {/* CONTENT */}
//       <div className="min-w-0 flex-1">
//         <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
//           {label}
//         </p>

//         {href ? (
//           <a
//             href={href}
//             target={target}
//             rel={rel}
//             className={`${valueClasses} transition-colors duration-300 hover:text-[#078b8c]`}
//           >
//             {value}
//           </a>
//         ) : (
//           <span className={valueClasses}>{value}</span>
//         )}

//         {description && (
//           <p className="mt-1.5 max-w-2xl break-words text-xs leading-relaxed text-slate-400 sm:text-sm">
//             {description}
//           </p>
//         )}
//       </div>

//       {/* COPY BUTTON (optional) */}
//       {copyValue && (
//         <motion.button
//           type="button"
//           onClick={handleCopy}
//           whileHover={reduceMotion ? undefined : { scale: 1.12 }}
//           whileTap={reduceMotion ? undefined : { scale: 0.85 }}
//           aria-label={copied ? "Copied to clipboard" : `Copy ${label}`}
//           title={copied ? "Copied!" : "Copy"}
//           className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors duration-300 hover:border-[#15919B]/50 hover:text-[#078b8c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#15919B] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-teal-400/60 dark:hover:text-teal-300"
//         >
//           <AnimatePresence mode="popLayout" initial={false}>
//             <motion.span
//               key={copied ? "check" : "copy"}
//               initial={
//                 reduceMotion ? false : { scale: 0, rotate: -90, opacity: 0 }
//               }
//               animate={{ scale: 1, rotate: 0, opacity: 1 }}
//               exit={
//                 reduceMotion ? undefined : { scale: 0, rotate: 90, opacity: 0 }
//               }
//               transition={{ type: "spring", stiffness: 500, damping: 22 }}
//               className="flex"
//             >
//               {copied ? (
//                 <Check className="h-4 w-4 text-emerald-500" strokeWidth={2.2} />
//               ) : (
//                 <Copy className="h-4 w-4" strokeWidth={1.8} />
//               )}
//             </motion.span>
//           </AnimatePresence>
//         </motion.button>
//       )}
//     </motion.div>
//   );
// }

// // ============================================================
// // INPUT STYLES
// // ============================================================

// const fieldClasses = `
//   w-full
//   rounded-xl
//   border border-slate-200
//   bg-white
//   px-4 py-3
//   text-sm text-slate-900
//   placeholder:text-slate-400
//   outline-none
//   shadow-[0_1px_0_rgba(255,255,255,0.9),inset_0_2px_4px_rgba(15,23,42,0.06)]
//   transition-all duration-300
//   focus:border-[#15919B]
//   focus:shadow-[0_1px_0_rgba(255,255,255,0.9),inset_0_2px_4px_rgba(15,23,42,0.06),0_0_0_3px_rgba(21,145,155,0.15)]
//   dark:border-slate-700
//   dark:bg-slate-900
//   dark:text-slate-100
//   dark:placeholder:text-slate-500
//   dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.25)]
//   dark:focus:border-teal-400
//   dark:focus:shadow-[0_0_0_3px_rgba(45,212,191,0.15)]
//   disabled:cursor-not-allowed
//   disabled:opacity-50
//   sm:text-base
// `;

// // Active chips get their background from a shared "pill" that glides between chips
// const chipBase =
//   "relative cursor-pointer rounded-full border px-3.5 py-2 text-xs font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm";
// const chipActive =
//   "border-[#15919B] text-[#0f6b72] dark:border-teal-400/70 dark:text-teal-200";
// const chipIdle =
//   "border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white";

// const chipPillClasses =
//   "absolute inset-0 rounded-full bg-[#15919B]/10 shadow-[0_2px_6px_rgba(21,145,155,0.25)] dark:bg-teal-400/15";

// // ============================================================
// // ANIMATED DIVIDER (replaces the static border between the two columns)
// // mobile / tablet: horizontal line under the left block, draws left -> right
// // desktop (lg):    vertical line on its right edge, draws top -> bottom
// // ============================================================

// const DividerLine: React.FC<{
//   vertical: boolean;
//   on: boolean;
//   reduceMotion: boolean;
// }> = ({ vertical, on, reduceMotion }) => (
//   <>
//     {/* Faint static track */}
//     <span className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />

//     {/* Glowing line that draws itself and fades out toward the end */}
//     <motion.span
//       initial={
//         vertical
//           ? { scaleY: reduceMotion ? 1 : 0 }
//           : { scaleX: reduceMotion ? 1 : 0 }
//       }
//       animate={vertical ? { scaleY: on ? 1 : 0 } : { scaleX: on ? 1 : 0 }}
//       transition={{ duration: 1.4, ease: EASE }}
//       style={{ originX: 0, originY: 0 }}
//       className={`absolute inset-0 shadow-[0_0_12px_rgba(21,145,155,0.6)] ${
//         vertical
//           ? "bg-gradient-to-b from-[#15919B] via-[#2a7fa3]/70 to-transparent"
//           : "bg-gradient-to-r from-[#15919B] via-[#2a7fa3]/70 to-transparent"
//       }`}
//     />

//     {!reduceMotion && (
//       <>
//         {/* Glowing head that leads the line */}
//         <motion.span
//           initial={
//             vertical ? { top: "0%", opacity: 0 } : { left: "0%", opacity: 0 }
//           }
//           animate={
//             on
//               ? vertical
//                 ? { top: "100%", opacity: [0, 1, 1, 0] }
//                 : { left: "100%", opacity: [0, 1, 1, 0] }
//               : vertical
//                 ? { top: "0%", opacity: 0 }
//                 : { left: "0%", opacity: 0 }
//           }
//           transition={{
//             duration: 1.4,
//             ease: EASE,
//             opacity: { duration: 1.4, times: [0, 0.1, 0.85, 1] },
//           }}
//           style={vertical ? { x: "-50%" } : { y: "-50%" }}
//           className={`absolute h-1.5 w-1.5 rounded-full bg-[#15919B] shadow-[0_0_10px_3px_rgba(21,145,155,0.7)] ${
//             vertical ? "left-1/2 -mt-[3px]" : "top-1/2 -ml-[3px]"
//           }`}
//         />

//         {/* Shine that keeps passing along the line */}
//         <motion.span
//           initial={
//             vertical
//               ? { top: "-15%", opacity: 0 }
//               : { left: "-15%", opacity: 0 }
//           }
//           animate={
//             on
//               ? vertical
//                 ? { top: ["-15%", "100%"], opacity: [0, 1, 1, 0] }
//                 : { left: ["-15%", "100%"], opacity: [0, 1, 1, 0] }
//               : vertical
//                 ? { top: "-15%", opacity: 0 }
//                 : { left: "-15%", opacity: 0 }
//           }
//           transition={{
//             duration: 2.6,
//             ease: "easeInOut",
//             repeat: Infinity,
//             repeatDelay: 4,
//             delay: 1.8,
//           }}
//           className={`absolute ${
//             vertical
//               ? "left-0 -mt-12 h-24 w-px bg-gradient-to-b from-transparent via-[#15919B] to-transparent"
//               : "top-0 -ml-12 h-px w-24 bg-gradient-to-r from-transparent via-[#15919B] to-transparent"
//           }`}
//         />
//       </>
//     )}
//   </>
// );

// const AnimatedDivider: React.FC<{ reduceMotion: boolean }> = ({
//   reduceMotion,
// }) => {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
//   const on = reduceMotion || inView;

//   return (
//     <div
//       ref={ref}
//       aria-hidden="true"
//       className="pointer-events-none absolute inset-0"
//     >
//       {/* Mobile + tablet: horizontal line at the bottom */}
//       <div className="absolute inset-x-0 bottom-0 h-px lg:hidden">
//         <DividerLine vertical={false} on={on} reduceMotion={reduceMotion} />
//       </div>

//       {/* Desktop: vertical line on the right edge */}
//       <div className="absolute inset-y-0 right-0 hidden w-px lg:block">
//         <DividerLine vertical on={on} reduceMotion={reduceMotion} />
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // CONTACT PAGE
// // ============================================================

// const Contact = ({ onBack }: { onBack?: () => void }) => {
//   const reduceMotion = Boolean(useReducedMotion());

//   // ==========================================================
//   // FORM STATE
//   // ==========================================================

//   const [form, setForm] = useState<ContactFormState>({
//     name: "",
//     email: "",
//     type: "",
//     message: "",
//   });

//   const [status, setStatus] = useState<SubmitStatus>("idle");
//   const [showOther, setShowOther] = useState(false);
//   const [otherText, setOtherText] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   // ==========================================================
//   // INPUT HANDLER
//   // ==========================================================

//   const handleChange =
//     (field: keyof ContactFormState) =>
//     (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       setForm((current) => ({
//         ...current,
//         [field]: e.target.value,
//       }));
//     };

//   // ==========================================================
//   // SUBMIT
//   // ==========================================================

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
//       setErrorMsg("Please complete all required fields.");
//       setStatus("error");
//       return;
//     }

//     if (showOther && !otherText.trim()) {
//       setErrorMsg("Please tell me what you need in the Others field.");
//       setStatus("error");
//       return;
//     }

//     setErrorMsg("");
//     setStatus("sending");

//     try {
//       await emailjs.send(
//         EMAILJS_SERVICE_ID,
//         EMAILJS_TEMPLATE_ID,
//         {
//           from_name: form.name,
//           from_email: form.email,

//           project_type: showOther
//             ? `Others: ${otherText.trim()}`
//             : form.type || "Not specified",

//           message:
//             showOther && otherText.trim()
//               ? `${form.message}\n\n(Looking for: ${otherText.trim()})`
//               : form.message,

//           other_text: showOther ? otherText.trim() : "",
//         },
//         {
//           publicKey: EMAILJS_PUBLIC_KEY,
//         },
//       );

//       setStatus("sent");
//     } catch (error) {
//       console.error("EmailJS send failed:", error);

//       const detail =
//         (error as { text?: string; message?: string })?.text ||
//         (error as { text?: string; message?: string })?.message ||
//         "";

//       setErrorMsg(
//         `Something went wrong sending that${
//           detail ? ` (${detail})` : ""
//         }. Please try again, or email me directly at ${CONTACT_EMAIL}.`,
//       );

//       setStatus("error");
//     }
//   };

//   // ==========================================================
//   // RESET / HOME
//   // ==========================================================

//   const resetForm = () => {
//     setForm({ name: "", email: "", type: "", message: "" });
//     setShowOther(false);
//     setOtherText("");
//     setErrorMsg("");
//     setStatus("idle");
//   };

//   const goHome = () => {
//     if (onBack) {
//       onBack();
//     } else {
//       window.location.assign("/");
//     }
//   };

//   const sending = status === "sending";

//   // ==========================================================
//   // COPY TOAST
//   // ==========================================================

//   const TOAST_MS = 2500;
//   const [toast, setToast] = useState({
//     id: 0,
//     text: "",
//     ok: true,
//     visible: false,
//   });
//   const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const showToast = (ok: boolean, label: string) => {
//     if (toastTimer.current) clearTimeout(toastTimer.current);

//     setToast((t) => ({
//       id: t.id + 1,
//       text: ok
//         ? `${label} copied to clipboard`
//         : `Couldn't copy ${label.toLowerCase()}. Please copy it manually.`,
//       ok,
//       visible: true,
//     }));

//     toastTimer.current = setTimeout(
//       () => setToast((t) => ({ ...t, visible: false })),
//       TOAST_MS,
//     );
//   };

//   useEffect(
//     () => () => {
//       if (toastTimer.current) clearTimeout(toastTimer.current);
//     },
//     [],
//   );

//   // ==========================================================
//   // PAGE
//   // ==========================================================

//   return (
//     <main className="mt-16 min-h-[calc(100vh-4rem)] w-full overflow-x-hidden bg-white dark:bg-[#050505]">
//       {/* Mobile + tablet: stacked. Desktop (lg): 2 / 3 split. */}
//       <div className="mx-auto grid min-h-[inherit] w-full max-w-7xl grid-cols-1 lg:grid-cols-5">
//         {/* ====================================================
//             LEFT SIDE
//         ==================================================== */}
//         <motion.section
//           variants={reduceMotion ? still : leftVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.12 }}
//           className="relative flex min-w-0 flex-col justify-between gap-10 px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:col-span-2 lg:gap-12"
//         >
//           {/* Divider: replaces the old static border-b / lg:border-r */}
//           <AnimatedDivider reduceMotion={reduceMotion} />

//           {/* INTRO */}
//           <div>
//             <h1
//               aria-label="Say hello."
//               style={{ fontFamily: "'Fraunces', Georgia, serif" }}
//               className="max-w-md text-[34px] font-normal leading-tight tracking-tight text-[#0F2E33] dark:text-white sm:text-[44px] lg:text-[52px] xl:text-[55px]"
//             >
//               <span
//                 aria-hidden="true"
//                 className="inline-block overflow-hidden pb-1 align-bottom"
//               >
//                 <motion.span
//                   variants={reduceMotion ? still : wordVariants}
//                   className="inline-block"
//                 >
//                   Say
//                 </motion.span>
//               </span>{" "}
//               {/* "hello." with a hand-drawn underline */}
//               <span aria-hidden="true" className="relative inline-block">
//                 <span className="inline-block overflow-hidden pb-1 align-bottom">
//                   <motion.span
//                     variants={reduceMotion ? still : wordVariants}
//                     className="inline-block text-[#15919B]"
//                     transition={{ delay: 0.12 }}
//                   >
//                     hello
//                   </motion.span>
//                 </span>
//                 <svg
//                   viewBox="0 0 100 8"
//                   preserveAspectRatio="none"
//                   className="pointer-events-none absolute -bottom-0.5 left-0 h-2 w-full overflow-visible"
//                 >
//                   <motion.path
//                     d="M2 5 Q 25 1 50 5 T 98 4"
//                     fill="none"
//                     stroke="#15919B"
//                     strokeWidth={2}
//                     strokeLinecap="round"
//                     vectorEffect="non-scaling-stroke"
//                     variants={reduceMotion ? still : underlineVariants}
//                   />
//                 </svg>
//                 <span className="inline-block overflow-hidden pb-1 align-bottom">
//                   <motion.span
//                     variants={reduceMotion ? still : wordVariants}
//                     className="inline-block"
//                     transition={{ delay: 0.2 }}
//                   >
//                     .
//                   </motion.span>
//                 </span>
//               </span>
//             </h1>

//             <motion.p
//               variants={reduceMotion ? still : fadeUp}
//               className="mt-2 max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:mt-4 sm:text-[17px]"
//             >
//               I take on a handful of design and development projects each
//               quarter. Tell me what you&apos;re building and I&apos;ll get back
//               to you within two days.
//             </motion.p>
//           </div>

//           {/* CONTACT CARDS
//               mobile: 1 column
//               tablet (md): email full width, location + phone side by side
//               desktop (lg): 1 column inside the left panel */}
//           <motion.div
//             variants={reduceMotion ? still : rowsVariants}
//             className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-1 lg:gap-6"
//           >
//             <ContactRow
//               icon={Mail}
//               label="Email"
//               value={CONTACT_EMAIL}
//               description="Feel free to drop me a message anytime."
//               href={GMAIL_COMPOSE_URL}
//               target="_blank"
//               rel="noopener noreferrer"
//               copyValue={CONTACT_EMAIL}
//               onCopy={showToast}
//               className="md:col-span-2 lg:col-span-1"
//             />

//             <ContactRow
//               icon={MapPin}
//               label="Location"
//               value="Dhaka, Bangladesh"
//               description="Based in Dhaka, ready for new opportunities."
//             />

//             <ContactRow
//               icon={Phone}
//               label="Phone"
//               value={CONTACT_PHONE}
//               description="Call or WhatsApp me anytime."
//               href={`tel:${CONTACT_PHONE_RAW}`}
//               copyValue={CONTACT_PHONE_RAW}
//               onCopy={showToast}
//             />
//           </motion.div>
//         </motion.section>

//         {/* ====================================================
//             RIGHT SIDE
//         ==================================================== */}
//         <motion.section
//           initial={reduceMotion ? false : { opacity: 0, x: 30 }}
//           whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
//           viewport={{ once: true, amount: 0.08 }}
//           transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
//           className="flex min-w-0 items-center px-4 py-10 sm:px-6 sm:py-12 lg:col-span-3 lg:px-10 lg:py-14 xl:px-12"
//         >
//           <AnimatePresence mode="wait" initial={false}>
//             {status !== "sent" ? (
//               <motion.form
//                 key="form"
//                 onSubmit={handleSubmit}
//                 variants={reduceMotion ? still : formVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 exit={
//                   reduceMotion
//                     ? undefined
//                     : { opacity: 0, y: -16, transition: { duration: 0.25 } }
//                 }
//                 viewport={{ once: true, amount: 0.12 }}
//                 className="w-full max-w-2xl"
//               >
//                 {/* NAME + EMAIL */}
//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
//                   <motion.div
//                     variants={reduceMotion ? still : fieldVariants}
//                     className="min-w-0"
//                   >
//                     <label
//                       htmlFor="name"
//                       className="mb-2 block text-sm font-medium text-slate-500 dark:text-slate-300"
//                     >
//                       Your name
//                     </label>
//                     <input
//                       id="name"
//                       type="text"
//                       required
//                       disabled={sending}
//                       value={form.name}
//                       onChange={handleChange("name")}
//                       placeholder="Jordan Lee"
//                       className={fieldClasses}
//                     />
//                   </motion.div>

//                   <motion.div
//                     variants={reduceMotion ? still : fieldVariants}
//                     className="min-w-0"
//                   >
//                     <label
//                       htmlFor="email"
//                       className="mb-2 block text-sm font-medium text-slate-500 dark:text-slate-300"
//                     >
//                       Email
//                     </label>
//                     <input
//                       id="email"
//                       type="email"
//                       required
//                       disabled={sending}
//                       value={form.email}
//                       onChange={handleChange("email")}
//                       placeholder="jordan@studio.com"
//                       className={fieldClasses}
//                     />
//                   </motion.div>
//                 </div>

//                 {/* PROJECT TYPE */}
//                 <motion.div
//                   variants={reduceMotion ? still : fieldVariants}
//                   className="mt-7 sm:mt-8"
//                 >
//                   <span className="mb-3 block text-sm font-medium text-slate-500 dark:text-slate-300">
//                     What are you looking for
//                   </span>

//                   <div className="flex flex-wrap gap-2">
//                     {PROJECT_TYPES.map((type) => {
//                       const active = form.type === type && !showOther;

//                       return (
//                         <motion.button
//                           key={type}
//                           whileHover={reduceMotion ? undefined : { y: -2 }}
//                           whileTap={reduceMotion ? undefined : { scale: 0.95 }}
//                           type="button"
//                           disabled={sending}
//                           aria-pressed={active}
//                           onClick={() => {
//                             setForm((current) => ({
//                               ...current,
//                               type: type as ProjectType,
//                             }));
//                             setShowOther(false);
//                             setOtherText("");
//                           }}
//                           className={`${chipBase} ${
//                             active ? chipActive : chipIdle
//                           }`}
//                         >
//                           {active && (
//                             <motion.span
//                               layoutId="project-type-pill"
//                               aria-hidden="true"
//                               transition={{
//                                 type: "spring",
//                                 stiffness: 420,
//                                 damping: 32,
//                               }}
//                               className={chipPillClasses}
//                             />
//                           )}
//                           <span className="relative">{type}</span>
//                         </motion.button>
//                       );
//                     })}

//                     {/* OTHERS */}
//                     <motion.button
//                       type="button"
//                       disabled={sending}
//                       whileHover={reduceMotion ? undefined : { y: -2 }}
//                       whileTap={reduceMotion ? undefined : { scale: 0.95 }}
//                       aria-pressed={showOther}
//                       aria-expanded={showOther}
//                       aria-controls="other-type"
//                       onClick={() => {
//                         setShowOther((current) => !current);
//                         setForm((current) => ({ ...current, type: "" }));
//                       }}
//                       className={`${chipBase} ${
//                         showOther ? chipActive : chipIdle
//                       }`}
//                     >
//                       {showOther && (
//                         <motion.span
//                           layoutId="project-type-pill"
//                           aria-hidden="true"
//                           transition={{
//                             type: "spring",
//                             stiffness: 420,
//                             damping: 32,
//                           }}
//                           className={chipPillClasses}
//                         />
//                       )}
//                       <span className="relative">Others</span>
//                     </motion.button>
//                   </div>

//                   <AnimatePresence initial={false}>
//                     {showOther && (
//                       <motion.div
//                         key="other-project-type"
//                         initial={{ opacity: 0, height: 0, y: -8 }}
//                         animate={{ opacity: 1, height: "auto", y: 0 }}
//                         exit={{ opacity: 0, height: 0, y: -8 }}
//                         transition={{ duration: 0.3, ease: EASE }}
//                         className="overflow-hidden"
//                       >
//                         <input
//                           id="other-type"
//                           type="text"
//                           autoFocus
//                           required
//                           disabled={sending}
//                           value={otherText}
//                           onChange={(e) => setOtherText(e.target.value)}
//                           placeholder="Tell me what you need"
//                           aria-label="Other project type"
//                           className={`${fieldClasses} mt-3`}
//                         />
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>

//                 {/* MESSAGE */}
//                 <motion.div
//                   variants={reduceMotion ? still : fieldVariants}
//                   className="mt-7 sm:mt-8"
//                 >
//                   <label
//                     htmlFor="message"
//                     className="mb-2 block text-sm font-medium text-slate-500 dark:text-slate-300"
//                   >
//                     Message
//                   </label>

//                   <textarea
//                     id="message"
//                     rows={5}
//                     required
//                     disabled={sending}
//                     value={form.message}
//                     onChange={handleChange("message")}
//                     placeholder="What are you working on?"
//                     className={`${fieldClasses} min-h-[140px] resize-none`}
//                   />
//                 </motion.div>

//                 {/* ERROR: expands in, then shakes once */}
//                 <AnimatePresence initial={false}>
//                   {status === "error" && (
//                     <motion.p
//                       key={errorMsg}
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{
//                         opacity: 1,
//                         height: "auto",
//                         x: reduceMotion ? 0 : [0, -6, 6, -4, 4, 0],
//                       }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{
//                         duration: 0.4,
//                         x: { duration: 0.45, delay: 0.1 },
//                       }}
//                       className="mt-4 break-words text-sm leading-relaxed text-red-600"
//                       role="alert"
//                     >
//                       {errorMsg}
//                     </motion.p>
//                   )}
//                 </AnimatePresence>

//                 {/* SUBMIT */}
//                 <motion.div
//                   variants={reduceMotion ? still : fieldVariants}
//                   className="mt-7 sm:mt-9"
//                 >
//                   <motion.button
//                     type="submit"
//                     disabled={sending}
//                     whileHover={
//                       !sending && !reduceMotion
//                         ? {
//                             y: -3,
//                             scale: 1.02,
//                             transition: {
//                               type: "spring",
//                               stiffness: 400,
//                               damping: 18,
//                             },
//                           }
//                         : undefined
//                     }
//                     whileTap={
//                       !sending && !reduceMotion ? { scale: 0.97 } : undefined
//                     }
//                     className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#1E5470] to-[#2a7fa3] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2a7fa3]/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-[#2a7fa3]/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
//                   >
//                     <span
//                       aria-hidden="true"
//                       className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
//                     />

//                     <AnimatePresence mode="wait" initial={false}>
//                       <motion.span
//                         key={sending ? "sending" : "idle"}
//                         initial={reduceMotion ? false : { opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
//                         transition={{ duration: 0.18 }}
//                         className="relative flex items-center gap-2"
//                       >
//                         {sending && (
//                           <motion.span
//                             aria-hidden="true"
//                             animate={{ rotate: 360 }}
//                             transition={{
//                               repeat: Infinity,
//                               duration: 0.8,
//                               ease: "linear",
//                             }}
//                             className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
//                           />
//                         )}
//                         {sending ? "Sending..." : "Submit"}
//                       </motion.span>
//                     </AnimatePresence>
//                   </motion.button>
//                 </motion.div>
//               </motion.form>
//             ) : (
//               /* ====================================================
//                  SUCCESS STATE
//               ==================================================== */
//               <motion.div
//                 key="success"
//                 variants={reduceMotion ? still : successVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="w-full max-w-xl"
//                 role="status"
//               >
//                 {/* Check mark draws itself */}
//                 <motion.div
//                   variants={reduceMotion ? still : fadeUp}
//                   className="mb-5"
//                 >
//                   <svg
//                     width="56"
//                     height="56"
//                     viewBox="0 0 56 56"
//                     fill="none"
//                     aria-hidden="true"
//                   >
//                     <motion.circle
//                       cx="28"
//                       cy="28"
//                       r="25"
//                       stroke="#15919B"
//                       strokeWidth="2.5"
//                       strokeLinecap="round"
//                       initial={reduceMotion ? false : { pathLength: 0 }}
//                       animate={{ pathLength: 1 }}
//                       transition={{ duration: 0.7, ease: EASE }}
//                     />
//                     <motion.path
//                       d="M17 29 L25 37 L40 20"
//                       stroke="#15919B"
//                       strokeWidth="3"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       initial={reduceMotion ? false : { pathLength: 0 }}
//                       animate={{ pathLength: 1 }}
//                       transition={{ duration: 0.45, delay: 0.55, ease: EASE }}
//                     />
//                   </svg>
//                 </motion.div>

//                 <motion.h2
//                   variants={reduceMotion ? still : fadeUp}
//                   style={{ fontFamily: "'Fraunces', Georgia, serif" }}
//                   className="text-3xl font-normal text-slate-900 dark:text-white sm:text-4xl"
//                 >
//                   Message sent.
//                 </motion.h2>

//                 <motion.p
//                   variants={reduceMotion ? still : fadeUp}
//                   className="mt-3 max-w-md break-words text-sm leading-relaxed text-slate-500 sm:text-base"
//                 >
//                   Thanks, {form.name.split(" ")[0]}. I&apos;ll reply to{" "}
//                   {form.email} within two business days.
//                 </motion.p>

//                 <motion.div
//                   variants={reduceMotion ? still : fadeUp}
//                   className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
//                 >
//                   <motion.button
//                     type="button"
//                     onClick={resetForm}
//                     whileHover={reduceMotion ? undefined : { y: -2 }}
//                     whileTap={reduceMotion ? undefined : { scale: 0.96 }}
//                     className="w-full cursor-pointer rounded-full border border-[#15919B] px-5 py-3 text-sm font-medium text-[#0f6b72] transition-colors hover:bg-[#15919B]/10 dark:text-teal-300 dark:hover:bg-teal-400/10 sm:w-auto"
//                   >
//                     Send another message
//                   </motion.button>

//                   <motion.button
//                     type="button"
//                     onClick={goHome}
//                     whileHover={reduceMotion ? undefined : { y: -2 }}
//                     whileTap={reduceMotion ? undefined : { scale: 0.96 }}
//                     className="w-full cursor-pointer rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white sm:w-auto"
//                   >
//                     Cancel
//                   </motion.button>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.section>
//       </div>

//       {/* COPY MESSAGE (toast) with a countdown bar */}
//       <AnimatePresence>
//         {toast.visible && (
//           <motion.div
//             key={toast.id}
//             initial={{ opacity: 0, y: 24, scale: 0.92 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 14, scale: 0.95 }}
//             transition={{ type: "spring", stiffness: 380, damping: 26 }}
//             role="status"
//             aria-live="polite"
//             className="pointer-events-none fixed inset-x-4 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 flex justify-center"
//           >
//             <div
//               className={`relative flex max-w-full items-center gap-2.5 overflow-hidden rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-lg ${
//                 toast.ok ? "bg-[#10243f]" : "bg-red-600"
//               }`}
//             >
//               <motion.span
//                 initial={reduceMotion ? false : { scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 500,
//                   damping: 15,
//                   delay: 0.1,
//                 }}
//                 className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
//                   toast.ok ? "bg-emerald-500" : "bg-white/25"
//                 }`}
//               >
//                 {toast.ok ? (
//                   <Check className="h-3 w-3" strokeWidth={3} />
//                 ) : (
//                   <X className="h-3 w-3" strokeWidth={3} />
//                 )}
//               </motion.span>
//               <span className="min-w-0 break-words">{toast.text}</span>

//               {!reduceMotion && (
//                 <motion.span
//                   aria-hidden="true"
//                   initial={{ scaleX: 1 }}
//                   animate={{ scaleX: 0 }}
//                   transition={{ duration: TOAST_MS / 1000, ease: "linear" }}
//                   style={{ originX: 0 }}
//                   className="absolute inset-x-0 bottom-0 h-[2px] bg-white/40"
//                 />
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </main>
//   );
// };

// export default Contact;

"use client";

import React, {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Check, Copy, Mail, MapPin, Phone, X } from "lucide-react";
import emailjs from "@emailjs/browser";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

// ============================================================
// EMAILJS CONFIG
// ============================================================

const EMAILJS_SERVICE_ID = "service_7hc6uli";
const EMAILJS_TEMPLATE_ID = "template_fni6mgr";
const EMAILJS_PUBLIC_KEY = "a8W05Bi3SM5Z8J3au";

const CONTACT_EMAIL = "ahadm3016@gmail.com";
const CONTACT_PHONE = "+880 1322959861"; // shown on screen
const CONTACT_PHONE_RAW = "+8801322959861"; // used for tel: link and copy

// ============================================================
// GMAIL COMPOSE URL
// ============================================================

const buildGmailComposeUrl = ({
  to,
  subject,
  body,
}: {
  to: string;
  subject?: string;
  body?: string;
}) => {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    ...(subject ? { su: subject } : {}),
    ...(body ? { body } : {}),
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
};

const GMAIL_COMPOSE_URL = buildGmailComposeUrl({
  to: CONTACT_EMAIL,
  subject: "Let's work together",
  body: "Hi Ahad,\n\nI'd like to connect about...",
});

// ============================================================
// PROJECT TYPES
// ============================================================

const PROJECT_TYPES = [
  "Product design",
  "Front-end build",
  "Full project",
  "Not sure yet",
] as const;

type ProjectType = (typeof PROJECT_TYPES)[number] | "";

// ============================================================
// FORM TYPES
// ============================================================

interface ContactFormState {
  name: string;
  email: string;
  type: ProjectType;
  message: string;
}

type SubmitStatus = "idle" | "sending" | "sent" | "error";

// ============================================================
// ANIMATION VARIANTS
// ============================================================

const EASE = [0.22, 1, 0.36, 1] as const;

// Reduced-motion fallback: everything is simply visible
const still: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const leftVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
};

const underlineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, delay: 0.55, ease: EASE },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE },
  },
};

const rowsVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
};

const formVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

const successVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

// ============================================================
// CONTACT ROW
// ============================================================

interface ContactRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  description?: string;
  href?: string;
  target?: string;
  rel?: string;
  /** When set, shows a small "copy" button that copies this text. */
  copyValue?: string;
  /** Called after a copy attempt so the page can show a message. */
  onCopy?: (ok: boolean, label: string) => void;
  className?: string;
}

function ContactRow({
  icon: Icon,
  label,
  value,
  description,
  href,
  target,
  rel,
  copyValue,
  onCopy,
  className = "",
}: ContactRowProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = copyValue ?? value;
    let ok = false;

    try {
      // Modern API (needs https or localhost)
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      // Fallback for older mobile browsers / non-secure pages
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, text.length);
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }

    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }

    onCopy?.(ok, label);
  };

  const valueClasses =
    "block max-w-full break-words [overflow-wrap:anywhere] text-[15px] font-medium leading-snug tracking-[-0.015em] text-[#10243f] transition-colors dark:text-slate-100 sm:text-base lg:text-[17px]";

  return (
    <motion.div
      variants={reduceMotion ? still : rowVariants}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              transition: { type: "spring", stiffness: 320, damping: 18 },
            }
      }
      className={`group relative isolate flex w-full cursor-pointer items-start gap-4 overflow-hidden rounded-2xl border border-[#0E1525]/15 bg-white p-4 shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition-[border-color,box-shadow] duration-300 hover:border-[#15919B] hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_8px_25px_rgba(0,0,0,0.2)] dark:hover:border-teal-400/70 sm:items-center sm:gap-5 sm:p-5 lg:rounded-[26px] lg:p-6 ${className}`}
    >
      {/* Soft sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 -translate-x-full bg-gradient-to-r from-transparent via-[#15919B]/[0.06] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />

      {/* ICON */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#eefafa] to-[#e8f8f8] transition-transform duration-500 group-hover:-rotate-6 dark:from-teal-950/80 dark:to-slate-800 sm:h-12 sm:w-12">
        <Icon
          className="h-5 w-5 text-[#078b8c] transition-transform duration-500 group-hover:scale-110 sm:h-6 sm:w-6"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </div>

      {/* DESKTOP ACCENT LINE: grows in on hover */}
      <div
        aria-hidden="true"
        className="hidden w-[3px] shrink-0 origin-top scale-y-50 self-stretch rounded-full bg-gradient-to-b from-cyan-400 via-teal-400 to-cyan-500 transition-transform duration-500 group-hover:scale-y-100 xl:block"
      />

      {/* CONTENT */}
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.22em]">
          {label}
        </p>

        {href ? (
          <a
            href={href}
            target={target}
            rel={rel}
            className={`${valueClasses} transition-colors duration-300 hover:text-[#078b8c]`}
          >
            {value}
          </a>
        ) : (
          <span className={valueClasses}>{value}</span>
        )}

        {description && (
          <p className="mt-1.5 max-w-2xl break-words text-xs leading-relaxed text-slate-400 sm:text-sm">
            {description}
          </p>
        )}
      </div>

      {/* COPY BUTTON (optional) */}
      {copyValue && (
        <motion.button
          type="button"
          onClick={handleCopy}
          whileHover={reduceMotion ? undefined : { scale: 1.12 }}
          whileTap={reduceMotion ? undefined : { scale: 0.85 }}
          aria-label={copied ? "Copied to clipboard" : `Copy ${label}`}
          title={copied ? "Copied!" : "Copy"}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors duration-300 hover:border-[#15919B]/50 hover:text-[#078b8c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#15919B] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-teal-400/60 dark:hover:text-teal-300"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={copied ? "check" : "copy"}
              initial={
                reduceMotion ? false : { scale: 0, rotate: -90, opacity: 0 }
              }
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={
                reduceMotion ? undefined : { scale: 0, rotate: 90, opacity: 0 }
              }
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className="flex"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" strokeWidth={2.2} />
              ) : (
                <Copy className="h-4 w-4" strokeWidth={1.8} />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      )}
    </motion.div>
  );
}

// ============================================================
// INPUT STYLES
// ============================================================

const fieldClasses = `
  w-full
  rounded-xl
  border border-slate-200
  bg-white
  px-4 py-3
  text-sm text-slate-900
  placeholder:text-slate-400
  outline-none
  shadow-[0_1px_0_rgba(255,255,255,0.9),inset_0_2px_4px_rgba(15,23,42,0.06)]
  transition-all duration-300
  focus:border-[#15919B]
  focus:shadow-[0_1px_0_rgba(255,255,255,0.9),inset_0_2px_4px_rgba(15,23,42,0.06),0_0_0_3px_rgba(21,145,155,0.15)]
  dark:border-slate-700
  dark:bg-slate-900
  dark:text-slate-100
  dark:placeholder:text-slate-500
  dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.25)]
  dark:focus:border-teal-400
  dark:focus:shadow-[0_0_0_3px_rgba(45,212,191,0.15)]
  disabled:cursor-not-allowed
  disabled:opacity-50
  sm:text-base
`;

// Active chips get their background from a shared "pill" that glides between chips
const chipBase =
  "relative cursor-pointer rounded-full border px-3.5 py-2 text-xs font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm";
const chipActive =
  "border-[#15919B] text-[#0f6b72] dark:border-teal-400/70 dark:text-teal-200";
const chipIdle =
  "border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white";

const chipPillClasses =
  "absolute inset-0 rounded-full bg-[#15919B]/10 shadow-[0_2px_6px_rgba(21,145,155,0.25)] dark:bg-teal-400/15";

// ============================================================
// ANIMATED DIVIDER (replaces the static border between the two columns)
// mobile / tablet: horizontal line under the left block, draws left -> right
// desktop (lg):    vertical line on its right edge, draws top -> bottom
// ============================================================

const DividerLine: React.FC<{
  vertical: boolean;
  on: boolean;
  reduceMotion: boolean;
}> = ({ vertical, on, reduceMotion }) => (
  <>
    {/* Faint static track */}
    <span className="absolute inset-0 bg-slate-200 dark:bg-slate-800" />

    {/* Glowing line that draws itself and fades out toward the end */}
    <motion.span
      initial={
        vertical
          ? { scaleY: reduceMotion ? 1 : 0 }
          : { scaleX: reduceMotion ? 1 : 0 }
      }
      animate={vertical ? { scaleY: on ? 1 : 0 } : { scaleX: on ? 1 : 0 }}
      transition={{ duration: 1.4, ease: EASE }}
      style={{ originX: 0, originY: 0 }}
      className={`absolute inset-0 shadow-[0_0_12px_rgba(21,145,155,0.6)] ${
        vertical
          ? "bg-gradient-to-b from-[#15919B] via-[#2a7fa3]/70 to-transparent"
          : "bg-gradient-to-r from-[#15919B] via-[#2a7fa3]/70 to-transparent"
      }`}
    />

    {!reduceMotion && (
      <>
        {/* Glowing head that leads the line */}
        <motion.span
          initial={
            vertical ? { top: "0%", opacity: 0 } : { left: "0%", opacity: 0 }
          }
          animate={
            on
              ? vertical
                ? { top: "100%", opacity: [0, 1, 1, 0] }
                : { left: "100%", opacity: [0, 1, 1, 0] }
              : vertical
                ? { top: "0%", opacity: 0 }
                : { left: "0%", opacity: 0 }
          }
          transition={{
            duration: 1.4,
            ease: EASE,
            opacity: { duration: 1.4, times: [0, 0.1, 0.85, 1] },
          }}
          style={vertical ? { x: "-50%" } : { y: "-50%" }}
          className={`absolute h-1.5 w-1.5 rounded-full bg-[#15919B] shadow-[0_0_10px_3px_rgba(21,145,155,0.7)] ${
            vertical ? "left-1/2 -mt-[3px]" : "top-1/2 -ml-[3px]"
          }`}
        />

        {/* Shine that keeps passing along the line */}
        <motion.span
          initial={
            vertical
              ? { top: "-15%", opacity: 0 }
              : { left: "-15%", opacity: 0 }
          }
          animate={
            on
              ? vertical
                ? { top: ["-15%", "100%"], opacity: [0, 1, 1, 0] }
                : { left: ["-15%", "100%"], opacity: [0, 1, 1, 0] }
              : vertical
                ? { top: "-15%", opacity: 0 }
                : { left: "-15%", opacity: 0 }
          }
          transition={{
            duration: 2.6,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 4,
            delay: 1.8,
          }}
          className={`absolute ${
            vertical
              ? "left-0 -mt-12 h-24 w-px bg-gradient-to-b from-transparent via-[#15919B] to-transparent"
              : "top-0 -ml-12 h-px w-24 bg-gradient-to-r from-transparent via-[#15919B] to-transparent"
          }`}
        />
      </>
    )}
  </>
);

const AnimatedDivider: React.FC<{ reduceMotion: boolean }> = ({
  reduceMotion,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const on = reduceMotion || inView;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      {/* Mobile + tablet: horizontal line at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px lg:hidden">
        <DividerLine vertical={false} on={on} reduceMotion={reduceMotion} />
      </div>

      {/* Desktop: vertical line on the right edge */}
      <div className="absolute inset-y-0 right-0 hidden w-px lg:block">
        <DividerLine vertical on={on} reduceMotion={reduceMotion} />
      </div>
    </div>
  );
};

// ============================================================
// CONTACT PAGE
// ============================================================

const Contact = ({ onBack }: { onBack?: () => void }) => {
  const reduceMotion = Boolean(useReducedMotion());

  // ==========================================================
  // FORM STATE
  // ==========================================================

  const [form, setForm] = useState<ContactFormState>({
    name: "",
    email: "",
    type: "",
    message: "",
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [showOther, setShowOther] = useState(false);
  const [otherText, setOtherText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ==========================================================
  // INPUT HANDLER
  // ==========================================================

  const handleChange =
    (field: keyof ContactFormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({
        ...current,
        [field]: e.target.value,
      }));
    };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg("Please complete all required fields.");
      setStatus("error");
      return;
    }

    if (showOther && !otherText.trim()) {
      setErrorMsg("Please tell me what you need in the Others field.");
      setStatus("error");
      return;
    }

    setErrorMsg("");
    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,

          project_type: showOther
            ? `Others: ${otherText.trim()}`
            : form.type || "Not specified",

          message:
            showOther && otherText.trim()
              ? `${form.message}\n\n(Looking for: ${otherText.trim()})`
              : form.message,

          other_text: showOther ? otherText.trim() : "",
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      setStatus("sent");
    } catch (error) {
      console.error("EmailJS send failed:", error);

      const detail =
        (error as { text?: string; message?: string })?.text ||
        (error as { text?: string; message?: string })?.message ||
        "";

      setErrorMsg(
        `Something went wrong sending that${
          detail ? ` (${detail})` : ""
        }. Please try again, or email me directly at ${CONTACT_EMAIL}.`,
      );

      setStatus("error");
    }
  };

  // ==========================================================
  // RESET / HOME
  // ==========================================================

  const resetForm = () => {
    setForm({ name: "", email: "", type: "", message: "" });
    setShowOther(false);
    setOtherText("");
    setErrorMsg("");
    setStatus("idle");
  };

  const goHome = () => {
    if (onBack) {
      onBack();
    } else {
      window.location.assign("/");
    }
  };

  const sending = status === "sending";

  // ==========================================================
  // COPY TOAST
  // ==========================================================

  const TOAST_MS = 2500;
  const [toast, setToast] = useState({
    id: 0,
    text: "",
    ok: true,
    visible: false,
  });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (ok: boolean, label: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);

    setToast((t) => ({
      id: t.id + 1,
      text: ok
        ? `${label} copied to clipboard`
        : `Couldn't copy ${label.toLowerCase()}. Please copy it manually.`,
      ok,
      visible: true,
    }));

    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      TOAST_MS,
    );
  };

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <main className="mt-16 min-h-[calc(100vh-4rem)] w-full overflow-x-clip bg-white dark:bg-[#050505]">
      {/* Mobile + tablet: stacked. Desktop (lg): 2 / 3 split. */}
      <div className="mx-auto grid min-h-[inherit] w-full max-w-7xl grid-cols-1 lg:grid-cols-5">
        {/* ====================================================
            LEFT SIDE
        ==================================================== */}
        <motion.section
          variants={reduceMotion ? still : leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="relative flex min-w-0 flex-col justify-between gap-10 px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:col-span-2 lg:gap-12"
        >
          {/* Divider: replaces the old static border-b / lg:border-r */}
          <AnimatedDivider reduceMotion={reduceMotion} />

          {/* INTRO */}
          <div>
            <h1
              aria-label="Say hello."
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              className="max-w-md text-[34px] font-normal leading-tight tracking-tight text-[#0F2E33] dark:text-white sm:text-[44px] lg:text-[52px] xl:text-[55px]"
            >
              <span
                aria-hidden="true"
                className="inline-block overflow-hidden pb-1 align-bottom"
              >
                <motion.span
                  variants={reduceMotion ? still : wordVariants}
                  className="inline-block"
                >
                  Say
                </motion.span>
              </span>{" "}
              {/* "hello." with a hand-drawn underline */}
              <span aria-hidden="true" className="relative inline-block">
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    variants={reduceMotion ? still : wordVariants}
                    className="inline-block text-[#15919B]"
                    transition={{ delay: 0.12 }}
                  >
                    hello
                  </motion.span>
                </span>
                <svg
                  viewBox="0 0 100 8"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-2 w-full overflow-visible"
                >
                  <motion.path
                    d="M2 5 Q 25 1 50 5 T 98 4"
                    fill="none"
                    stroke="#15919B"
                    strokeWidth={2}
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    variants={reduceMotion ? still : underlineVariants}
                  />
                </svg>
                <span className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    variants={reduceMotion ? still : wordVariants}
                    className="inline-block"
                    transition={{ delay: 0.2 }}
                  >
                    .
                  </motion.span>
                </span>
              </span>
            </h1>

            <motion.p
              variants={reduceMotion ? still : fadeUp}
              className="mt-2 max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:mt-4 sm:text-[17px]"
            >
              I take on a handful of design and development projects each
              quarter. Tell me what you&apos;re building and I&apos;ll get back
              to you within two days.
            </motion.p>
          </div>

          {/* CONTACT CARDS
              mobile: 1 column
              tablet (md): email full width, location + phone side by side
              desktop (lg): 1 column inside the left panel */}
          <motion.div
            variants={reduceMotion ? still : rowsVariants}
            className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-1 lg:gap-6"
          >
            <ContactRow
              icon={Mail}
              label="Email"
              value={CONTACT_EMAIL}
              description="Feel free to drop me a message anytime."
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              copyValue={CONTACT_EMAIL}
              onCopy={showToast}
              className="md:col-span-2 lg:col-span-1"
            />

            <ContactRow
              icon={MapPin}
              label="Location"
              value="Dhaka, Bangladesh"
              description="Based in Dhaka, ready for new opportunities."
            />

            <ContactRow
              icon={Phone}
              label="Phone"
              value={CONTACT_PHONE}
              description="Call or WhatsApp me anytime."
              href={`tel:${CONTACT_PHONE_RAW}`}
              copyValue={CONTACT_PHONE_RAW}
              onCopy={showToast}
            />
          </motion.div>
        </motion.section>

        {/* ====================================================
            RIGHT SIDE
        ==================================================== */}
        <motion.section
          initial={reduceMotion ? false : { opacity: 0, x: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="flex min-w-0 items-center px-4 py-10 sm:px-6 sm:py-12 lg:col-span-3 lg:px-10 lg:py-14 xl:px-12"
        >
          <AnimatePresence mode="wait" initial={false}>
            {status !== "sent" ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                variants={reduceMotion ? still : formVariants}
                initial="hidden"
                whileInView="visible"
                exit={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: -16, transition: { duration: 0.25 } }
                }
                viewport={{ once: true, amount: 0.12 }}
                className="w-full max-w-2xl"
              >
                {/* NAME + EMAIL */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                  <motion.div
                    variants={reduceMotion ? still : fieldVariants}
                    className="min-w-0"
                  >
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-500 dark:text-slate-300"
                    >
                      Your name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      disabled={sending}
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="Jordan Lee"
                      className={fieldClasses}
                    />
                  </motion.div>

                  <motion.div
                    variants={reduceMotion ? still : fieldVariants}
                    className="min-w-0"
                  >
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-slate-500 dark:text-slate-300"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      disabled={sending}
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="jordan@studio.com"
                      className={fieldClasses}
                    />
                  </motion.div>
                </div>

                {/* PROJECT TYPE */}
                <motion.div
                  variants={reduceMotion ? still : fieldVariants}
                  className="mt-7 sm:mt-8"
                >
                  <span className="mb-3 block text-sm font-medium text-slate-500 dark:text-slate-300">
                    What are you looking for
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type) => {
                      const active = form.type === type && !showOther;

                      return (
                        <motion.button
                          key={type}
                          whileHover={reduceMotion ? undefined : { y: -2 }}
                          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                          type="button"
                          disabled={sending}
                          aria-pressed={active}
                          onClick={() => {
                            setForm((current) => ({
                              ...current,
                              type: type as ProjectType,
                            }));
                            setShowOther(false);
                            setOtherText("");
                          }}
                          className={`${chipBase} ${
                            active ? chipActive : chipIdle
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="project-type-pill"
                              aria-hidden="true"
                              transition={{
                                type: "spring",
                                stiffness: 420,
                                damping: 32,
                              }}
                              className={chipPillClasses}
                            />
                          )}
                          <span className="relative">{type}</span>
                        </motion.button>
                      );
                    })}

                    {/* OTHERS */}
                    <motion.button
                      type="button"
                      disabled={sending}
                      whileHover={reduceMotion ? undefined : { y: -2 }}
                      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                      aria-pressed={showOther}
                      aria-expanded={showOther}
                      aria-controls="other-type"
                      onClick={() => {
                        setShowOther((current) => !current);
                        setForm((current) => ({ ...current, type: "" }));
                      }}
                      className={`${chipBase} ${
                        showOther ? chipActive : chipIdle
                      }`}
                    >
                      {showOther && (
                        <motion.span
                          layoutId="project-type-pill"
                          aria-hidden="true"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 32,
                          }}
                          className={chipPillClasses}
                        />
                      )}
                      <span className="relative">Others</span>
                    </motion.button>
                  </div>

                  <AnimatePresence initial={false}>
                    {showOther && (
                      <motion.div
                        key="other-project-type"
                        initial={{ opacity: 0, height: 0, y: -8 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <input
                          id="other-type"
                          type="text"
                          autoFocus
                          required
                          disabled={sending}
                          value={otherText}
                          onChange={(e) => setOtherText(e.target.value)}
                          placeholder="Tell me what you need"
                          aria-label="Other project type"
                          className={`${fieldClasses} mt-3`}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* MESSAGE */}
                <motion.div
                  variants={reduceMotion ? still : fieldVariants}
                  className="mt-7 sm:mt-8"
                >
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-slate-500 dark:text-slate-300"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows={5}
                    required
                    disabled={sending}
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="What are you working on?"
                    className={`${fieldClasses} min-h-[140px] resize-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
                  />
                </motion.div>

                {/* ERROR: expands in, then shakes once */}
                <AnimatePresence initial={false}>
                  {status === "error" && (
                    <motion.p
                      key={errorMsg}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        x: reduceMotion ? 0 : [0, -6, 6, -4, 4, 0],
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.4,
                        x: { duration: 0.45, delay: 0.1 },
                      }}
                      className="mt-4 break-words text-sm leading-relaxed text-red-600"
                      role="alert"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* SUBMIT */}
                <motion.div
                  variants={reduceMotion ? still : fieldVariants}
                  className="mt-7 sm:mt-9"
                >
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={
                      !sending && !reduceMotion
                        ? {
                            y: -3,
                            scale: 1.02,
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 18,
                            },
                          }
                        : undefined
                    }
                    whileTap={
                      !sending && !reduceMotion ? { scale: 0.97 } : undefined
                    }
                    className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#1E5470] to-[#2a7fa3] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2a7fa3]/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-[#2a7fa3]/40 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                    />

                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={sending ? "sending" : "idle"}
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.18 }}
                        className="relative flex items-center gap-2"
                      >
                        {sending && (
                          <motion.span
                            aria-hidden="true"
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              ease: "linear",
                            }}
                            className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                          />
                        )}
                        {sending ? "Sending..." : "Submit"}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </motion.form>
            ) : (
              /* ====================================================
                 SUCCESS STATE
              ==================================================== */
              <motion.div
                key="success"
                variants={reduceMotion ? still : successVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-xl"
                role="status"
              >
                {/* Check mark draws itself */}
                <motion.div
                  variants={reduceMotion ? still : fadeUp}
                  className="mb-5"
                >
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    aria-hidden="true"
                  >
                    <motion.circle
                      cx="28"
                      cy="28"
                      r="25"
                      stroke="#15919B"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={reduceMotion ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                    <motion.path
                      d="M17 29 L25 37 L40 20"
                      stroke="#15919B"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={reduceMotion ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, delay: 0.55, ease: EASE }}
                    />
                  </svg>
                </motion.div>

                <motion.h2
                  variants={reduceMotion ? still : fadeUp}
                  style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  className="text-3xl font-normal text-slate-900 dark:text-white sm:text-4xl"
                >
                  Message sent.
                </motion.h2>

                <motion.p
                  variants={reduceMotion ? still : fadeUp}
                  className="mt-3 max-w-md break-words text-sm leading-relaxed text-slate-500 sm:text-base"
                >
                  Thanks, {form.name.split(" ")[0]}. I&apos;ll reply to{" "}
                  {form.email} within two business days.
                </motion.p>

                <motion.div
                  variants={reduceMotion ? still : fadeUp}
                  className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <motion.button
                    type="button"
                    onClick={resetForm}
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                    className="w-full cursor-pointer rounded-full border border-[#15919B] px-5 py-3 text-sm font-medium text-[#0f6b72] transition-colors hover:bg-[#15919B]/10 dark:text-teal-300 dark:hover:bg-teal-400/10 sm:w-auto"
                  >
                    Send another message
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={goHome}
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                    className="w-full cursor-pointer rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white sm:w-auto"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </div>

      {/* COPY MESSAGE (toast) with a countdown bar */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            role="status"
            aria-live="polite"
            className="pointer-events-none fixed inset-x-4 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 flex justify-center"
          >
            <div
              className={`relative flex max-w-full items-center gap-2.5 overflow-hidden rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-lg ${
                toast.ok ? "bg-[#10243f]" : "bg-red-600"
              }`}
            >
              <motion.span
                initial={reduceMotion ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                  delay: 0.1,
                }}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  toast.ok ? "bg-emerald-500" : "bg-white/25"
                }`}
              >
                {toast.ok ? (
                  <Check className="h-3 w-3" strokeWidth={3} />
                ) : (
                  <X className="h-3 w-3" strokeWidth={3} />
                )}
              </motion.span>
              <span className="min-w-0 break-words">{toast.text}</span>

              {!reduceMotion && (
                <motion.span
                  aria-hidden="true"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: TOAST_MS / 1000, ease: "linear" }}
                  style={{ originX: 0 }}
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-white/40"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Contact;
