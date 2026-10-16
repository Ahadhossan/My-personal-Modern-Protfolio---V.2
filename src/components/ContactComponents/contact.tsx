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
    <div
      className={`group relative isolate flex w-full items-start gap-4 overflow-hidden rounded-2xl border border-[#0E1525]/15 bg-white p-4 shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition-all duration-300 sm:items-center sm:gap-5 sm:p-5 lg:rounded-[26px] lg:p-6
                  hover:-translate-y-1 hover:border-[#15919B] hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_8px_25px_rgba(0,0,0,0.2)] dark:hover:border-teal-400/70
                  dark:hover:border-teal-400/70 cursor-pointer ${className}`}
    >
      {/* ICON */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#eefafa] to-[#e8f8f8] dark:from-teal-950/80 dark:to-slate-800 sm:h-12 sm:w-12">
        <Icon
          className="h-5 w-5 text-[#078b8c] transition-transform duration-500 group-hover:scale-110 sm:h-6 sm:w-6"
          strokeWidth={1.6}
          aria-hidden="true"
        />
      </div>

      {/* DESKTOP ACCENT LINE */}
      <div
        aria-hidden="true"
        className="hidden w-[3px] shrink-0 self-stretch rounded-full bg-gradient-to-b from-cyan-400 via-teal-400 to-cyan-500 xl:block"
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
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied to clipboard" : `Copy ${label}`}
          title={copied ? "Copied!" : "Copy"}
          className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors duration-300 hover:border-[#15919B]/50 hover:text-[#078b8c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#15919B] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-teal-400/60 dark:hover:text-teal-300"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" strokeWidth={2.2} />
          ) : (
            <Copy className="h-4 w-4" strokeWidth={1.8} />
          )}
        </button>
      )}
    </div>
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

const chipBase =
  "cursor-pointer rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm";
const chipActive =
  "border-[#15919B] bg-[#15919B]/10 text-[#0f6b72] shadow-[0_2px_6px_rgba(21,145,155,0.25)] dark:border-teal-400/70 dark:bg-teal-400/15 dark:text-teal-200";
const chipIdle =
  "border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white";

// ============================================================
// CONTACT PAGE
// ============================================================

const Contact = ({ onBack }: { onBack?: () => void }) => {
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

  const [toast, setToast] = useState({ text: "", ok: true, visible: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (ok: boolean, label: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);

    setToast({
      text: ok
        ? `${label} copied to clipboard`
        : `Couldn't copy ${label.toLowerCase()}. Please copy it manually.`,
      ok,
      visible: true,
    });

    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      2500,
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
    <main className="mt-16 min-h-[calc(100vh-4rem)] w-full bg-white dark:bg-[#050505]">
      {/* Mobile + tablet: stacked. Desktop (lg): 2 / 3 split. */}
      <div className="mx-auto grid min-h-[inherit] w-full max-w-7xl grid-cols-1 lg:grid-cols-5">
        {/* ====================================================
            LEFT SIDE
        ==================================================== */}
        <section className="flex min-w-0 flex-col justify-between gap-10 border-b border-slate-200 dark:border-slate-800 lg:col-span-2 lg:gap-12 lg:border-b-0 lg:border-r dark:lg:border-r-slate-800 px-4 py-12  sm:px-6 sm:py-16 md:px-8 md:py-20">
          {/* INTRO */}
          <div>
            <h1
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              className="max-w-md text-[34px] font-normal leading-tight tracking-tight text-[#0F2E33] dark:text-white sm:text-[44px] lg:text-[52px] xl:text-[55px]"
            >
              Say <span className="text-[#15919B]">hello</span>.
            </h1>

            <p className="mt-2 max-w-md text-[16px] leading-relaxed text-gray-600 transition-colors duration-300 dark:text-slate-400 sm:mt-4 sm:text-base sm:text-[17px]">
              I take on a handful of design and development projects each
              quarter. Tell me what you&apos;re building and I&apos;ll get back
              to you within two days.
            </p>
          </div>

          {/* CONTACT CARDS
              mobile: 1 column
              tablet (md): email full width, location + phone side by side
              desktop (lg): 1 column inside the left panel */}
          <div className="grid w-full grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-1 lg:gap-6">
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
          </div>
        </section>

        {/* ====================================================
            RIGHT SIDE
        ==================================================== */}
        <section className="flex min-w-0 items-center px-4 py-10 sm:px-6 sm:py-12 lg:col-span-3 lg:px-10 lg:py-14 xl:px-12">
          {status !== "sent" ? (
            <form onSubmit={handleSubmit} className="w-full max-w-2xl">
              {/* NAME + EMAIL */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                <div className="min-w-0">
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
                </div>

                <div className="min-w-0">
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
                </div>
              </div>

              {/* PROJECT TYPE */}
              <div className="mt-7 sm:mt-8">
                <span className="mb-3 block text-sm font-medium text-slate-500 dark:text-slate-300">
                  What are you looking for
                </span>

                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((type) => {
                    const active = form.type === type;

                    return (
                      <button
                        key={type}
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
                          active && !showOther ? chipActive : chipIdle
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}

                  {/* OTHERS */}
                  <button
                    type="button"
                    disabled={sending}
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
                    Others
                  </button>
                </div>

                {showOther && (
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
                )}
              </div>

              {/* MESSAGE */}
              <div className="mt-7 sm:mt-8">
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
                  className={`${fieldClasses} min-h-[140px] resize-none`}
                />
              </div>

              {/* ERROR */}
              {status === "error" && (
                <p
                  className="mt-4 break-words text-sm leading-relaxed text-red-600"
                  role="alert"
                >
                  {errorMsg}
                </p>
              )}

              {/* SUBMIT */}
              <div className="mt-7 sm:mt-9">
                <button
                  type="submit"
                  disabled={sending}
                  className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#1E5470] to-[#2a7fa3] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2a7fa3]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#2a7fa3]/40 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span className="relative">
                    {sending ? "Sending..." : "Submit"}
                  </span>
                </button>
              </div>
            </form>
          ) : (
            /* ====================================================
               SUCCESS STATE
            ==================================================== */
            <div className="w-full max-w-xl" role="status">
              <h2
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                className="text-3xl font-normal text-slate-900 dark:text-white sm:text-4xl"
              >
                Message sent.
              </h2>

              <p className="mt-3 max-w-md break-words text-sm leading-relaxed text-slate-500 sm:text-base">
                Thanks, {form.name.split(" ")[0]}. I&apos;ll reply to{" "}
                {form.email} within two business days.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full cursor-pointer rounded-full border border-[#15919B] px-5 py-3 text-sm font-medium text-[#0f6b72] transition-colors hover:bg-[#15919B]/10 dark:text-teal-300 dark:hover:bg-teal-400/10 sm:w-auto"
                >
                  Send another message
                </button>

                <button
                  type="button"
                  onClick={goHome}
                  className="w-full cursor-pointer rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:text-white sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* COPY MESSAGE (toast) */}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed inset-x-4 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 flex justify-center transition-all duration-300 ease-out ${
          toast.visible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
      >
        <div
          className={`flex max-w-full items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-lg ${
            toast.ok ? "bg-[#10243f]" : "bg-red-600"
          }`}
        >
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              toast.ok ? "bg-emerald-500" : "bg-white/25"
            }`}
          >
            {toast.ok ? (
              <Check className="h-3 w-3" strokeWidth={3} />
            ) : (
              <X className="h-3 w-3" strokeWidth={3} />
            )}
          </span>
          <span className="min-w-0 break-words">{toast.text}</span>
        </div>
      </div>
    </main>
  );
};

export default Contact;
