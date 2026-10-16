import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SCROLL_THRESHOLD = 300;

interface ScrollProgressProps {
  isHidden?: boolean;
}

const ScrollProgress = ({ isHidden = false }: ScrollProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    let animationFrameId: number | null = null;

    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const percentage =
        scrollableHeight > 0
          ? Math.min(100, Math.max(0, (scrollTop / scrollableHeight) * 100))
          : 0;

      setProgress(Math.round(percentage));
      setVisible(scrollTop > SCROLL_THRESHOLD);

      ticking = false;
      animationFrameId = null;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        animationFrameId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      aria-label={`Page scroll progress: ${progress}%`}
      aria-hidden={isHidden}
      className={`
        fixed right-5 top-1/2 z-[60]
        flex -translate-y-1/2 flex-col
        items-center gap-3
        transition-all duration-300 ease-out
        max-sm:right-2
        ${
          visible && !isHidden
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-4 opacity-0"
        }
      `}
    >
      {/* Percentage */}
      <span
        className="
          min-w-[38px] text-center
          font-mono text-[11px] font-semibold
          tracking-tight text-[#2a7fa3]
          dark:text-[#87c9e6]
        "
      >
        {String(progress).padStart(2, "0")}%
      </span>

      {/* Vertical progress track */}
      <div
        className="
          relative h-20 w-[3px] overflow-hidden
          rounded-full bg-slate-300/60
          dark:bg-white/15
        "
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="
            absolute left-0 top-0 w-full
            rounded-full bg-gradient-to-b
            from-[#87c9e6] to-[#2a7fa3]
            transition-[height] duration-150
          "
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Back to top */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        tabIndex={isHidden ? -1 : 0}
        className="
          group flex h-10 w-10 items-center
          justify-center rounded-full
          border border-[#2a7fa3]/30
          bg-white/90 text-[#2a7fa3]
          shadow-md shadow-slate-900/5
          backdrop-blur-xl
          transition-all duration-300
          hover:-translate-y-1 hover:scale-105
          hover:border-[#2a7fa3]
          hover:bg-[#2a7fa3] hover:text-white
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#2a7fa3]
          dark:border-[#87c9e6]/25
          dark:bg-slate-900/90
          dark:text-[#87c9e6]
          dark:hover:bg-[#2a7fa3]
          dark:hover:text-white
        "
      >
        <ArrowUp
          size={18}
          strokeWidth={2}
          className="
            transition-transform duration-300
            group-hover:-translate-y-0.5
          "
        />
      </button>
    </div>
  );
};

export default ScrollProgress;
