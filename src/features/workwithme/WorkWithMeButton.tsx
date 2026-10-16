import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Briefcase } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type FloatingPillProps = {
  to: string;
  label: string;
  icon: ReactNode;
  labelIcon?: ReactNode;
  showDot?: boolean;
};

/* =========================================================
   SHARED FLOATING PILL
========================================================= */

const FloatingPill = ({
  to,
  label,
  icon,
  labelIcon,
  showDot = false,
}: FloatingPillProps) => {
  return (
    <div
      className="
        fixed
        bottom-80
        right-5
        z-9999

        animate-[wwm-enter_0.5s_cubic-bezier(0.22,1,0.36,1)_both]

        motion-reduce:animate-none
      "
    >
      <Link
        to={to}
        aria-label={label}
        className="
          group
          block

          animate-[wwm-float_4s_ease-in-out_infinite]
          hover:[animation-play-state:paused]

          focus-visible:outline-none

          motion-reduce:animate-none
        "
      >
        {/* =====================================================
            KEYFRAMES
        ===================================================== */}

        <style>{`
          @keyframes wwm-enter {
            from {
              opacity: 0;
              transform: translateX(24px) scale(0.85);
            }

            to {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }

          @keyframes wwm-float {
            0%,
            100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-6px);
            }
          }

          @keyframes wwm-wiggle {
            0%,
            100% {
              transform: rotate(0deg);
            }

            25% {
              transform: rotate(-14deg);
            }

            75% {
              transform: rotate(14deg);
            }
          }

          @keyframes wwm-shine {
            from {
              transform: translateX(0) skewX(-20deg);
            }

            to {
              transform: translateX(450%) skewX(-20deg);
            }
          }
        `}</style>

        {/* =====================================================
            OUTER SHELL
        ===================================================== */}

        <span
          className="
            relative
            flex
            h-14
            items-center
            overflow-hidden
            rounded-full
            p-[1.5px]

            bg-white/80

            shadow-[0_8px_30px_rgba(15,23,42,0.12)]

            transition-all
            duration-500

            group-hover:shadow-[0_10px_40px_rgba(59,130,246,0.20)]

            group-focus-visible:ring-2
            group-focus-visible:ring-blue-400/60
            group-focus-visible:ring-offset-2
            group-focus-visible:ring-offset-white
          "
        >
          {/* ===================================================
              SPINNING GRADIENT BORDER
          =================================================== */}

          <span
            aria-hidden
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
          >
            <span
              className="
                aspect-square
                w-[300%]

                animate-[spin_3.5s_linear_infinite]

                bg-[conic-gradient(from_0deg,transparent_0_55%,#60a5fa_78%,#a78bfa_92%,transparent_100%)]

                motion-reduce:animate-none
              "
            />
          </span>

          {/* ===================================================
              INNER LIGHT SURFACE
          =================================================== */}

          <span
            className="
              relative
              flex
              h-full
              items-center
              overflow-hidden
              rounded-full

              border
              border-slate-200/80

              bg-white/95

              p-1.5

              shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]

              backdrop-blur-xl
            "
          >
            {/* =================================================
                SHINE EFFECT
            ================================================= */}

            <span
              aria-hidden
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-1/3
                w-1/3

                bg-linear-to-r
                from-transparent
                via-blue-500/10
                to-transparent

                opacity-0

                group-hover:animate-[wwm-shine_0.9s_ease-out]

                motion-reduce:hidden
              "
            />

            {/* =================================================
                LABEL
            ================================================= */}

            <span
              className="
                flex
                max-w-0
                items-center
                gap-1.5
                overflow-hidden
                whitespace-nowrap
                pl-0
                pr-0 text-sm
                font-semibold
                tracking-tight
                text-slate-800

                opacity-0

                transition-all
                duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[170px]
                group-hover:pl-4
                group-hover:pr-3
                group-hover:opacity-100

                group-focus-visible:max-w-[170px]
                group-focus-visible:pl-4
                group-focus-visible:pr-3
                group-focus-visible:opacity-100

                motion-reduce:transition-none
              "
            >
              {label}

              {labelIcon}
            </span>

            {/* =================================================
                ICON BUBBLE
            ================================================= */}

            <span
              className="
                relative
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center

                rounded-full

                bg-gradient-to-br
                from-blue-500
                via-indigo-500
                to-violet-600

                text-white

                shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_5px_15px_rgba(79,70,229,0.18)]

                transition-all
                duration-500

                group-hover:scale-95
                group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_20px_rgba(79,70,229,0.28)]

                motion-reduce:transition-none
              "
            >
              {icon}

              {/* =================================================
                  AVAILABILITY DOT
              ================================================= */}

              {showDot && (
                <span
                  className="
                    absolute
                    -right-0.5
                    -top-0.5
                    flex
                    h-3
                    w-3
                  "
                >
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-emerald-400
                      opacity-60

                      motion-reduce:animate-none
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-3
                      w-3
                      rounded-full
                      border-2
                      border-white
                      bg-emerald-400

                      shadow-[0_0_8px_rgba(16,185,129,0.45)]
                    "
                  />
                </span>
              )}
            </span>
          </span>
        </span>
      </Link>
    </div>
  );
};

/* =========================================================
   MAIN BUTTON
========================================================= */

const WorkWithMeButton = () => {
  const { pathname } = useLocation();

  const isOnWorkWithMe = pathname.startsWith("/workwithme");

  /* =======================================================
     BACK TO HOME
  ======================================================= */

  if (isOnWorkWithMe) {
    return (
      <FloatingPill
        key="back-home"
        to="/"
        label="Back to home"
        icon={
          <ArrowLeft
            size={20}
            strokeWidth={2.25}
            className="
              transition-transform
              duration-300
              group-hover:-translate-x-0.5
            "
          />
        }
      />
    );
  }

  /* =======================================================
     WORK WITH ME
  ======================================================= */

  return (
    <FloatingPill
      key="work-with-me"
      to="/workwithme"
      label="Work with me"
      showDot
      icon={
        <Briefcase
          size={20}
          strokeWidth={2.25}
          className="
            group-hover:animate-[wwm-wiggle_0.6s_ease-in-out]
            motion-reduce:animate-none
          "
        />
      }
      labelIcon={
        <ArrowUpRight
          size={14}
          strokeWidth={2.5}
          className="
            text-blue-600

            transition-transform
            duration-300

            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
          "
        />
      }
    />
  );
};

export default WorkWithMeButton;
