import { useEffect, useState } from "react";
import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";

type Theme = "light" | "system" | "dark";

const STORAGE_KEY = "theme";

const THEME_ORDER: Theme[] = ["light", "system", "dark"];

type ThemeMeta = {
  label: string;
  Icon: LucideIcon;
  description: string;
};

const THEME_META: Record<Theme, ThemeMeta> = {
  light: {
    label: "Light Mode",
    Icon: Sun,
    description: "Bright and clean appearance",
  },
  system: {
    label: "System Mode",
    Icon: Monitor,
    description: "Follows your device preference",
  },
  dark: {
    label: "Dark Mode",
    Icon: Moon,
    description: "Easy on the eyes",
  },
};

/**
 * Applies the selected theme to the document root.
 */
function applyTheme(theme: Theme): void {
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  const isDark = theme === "dark" || (theme === "system" && systemPrefersDark);

  const root = document.documentElement;

  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
}

/**
 * Reads the saved theme preference.
 */
function getSavedTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }

  try {
    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (
      savedTheme === "light" ||
      savedTheme === "system" ||
      savedTheme === "dark"
    ) {
      return savedTheme;
    }
  } catch {
    // localStorage may be unavailable.
  }

  return "system";
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(getSavedTheme);

  const currentIndex = THEME_ORDER.indexOf(theme);

  const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];

  const current = THEME_META[theme];
  const next = THEME_META[nextTheme];

  const CurrentIcon = current.Icon;
  const NextIcon = next.Icon;

  useEffect(() => {
    applyTheme(theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Continue working if localStorage is unavailable.
    }

    if (theme !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme]);

  const cycleTheme = () => {
    setTheme(nextTheme);
  };

  return (
    <div className="group/theme relative flex shrink-0 items-center">
      <button
        type="button"
        onClick={cycleTheme}
        aria-label={`${current.label}. Switch to ${next.label}`}
        aria-describedby="theme-toggle-tooltip"
        title={current.label}
        className="
          relative grid h-10 w-10 shrink-0
          place-items-center overflow-hidden rounded-full
          border border-black/70 bg-white text-slate-700
          transition-[background-color,border-color,color,transform]
          duration-300 ease-in-out
          hover:border-teal-400 hover:bg-teal-50
          hover:text-teal-700 active:scale-90
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-teal-500
          focus-visible:ring-offset-2
          dark:border-slate-700 dark:bg-slate-900
          dark:text-slate-200
          dark:hover:border-teal-400
          dark:hover:bg-teal-950
          dark:hover:text-teal-300
          dark:focus-visible:ring-offset-[#050505]
          motion-reduce:transform-none
          motion-reduce:transition-none
        "
      >
        {/* Subtle hover background */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none absolute inset-0 rounded-full
            bg-teal-500/10 opacity-0
            transition-opacity duration-300
            group-hover/theme:opacity-100
            group-focus-within/theme:opacity-100
          "
        />

        {/* Animated theme icon */}
        <span
          key={theme}
          aria-hidden="true"
          className="
            relative flex items-center justify-center
            animate-theme-icon
          "
        >
          <CurrentIcon size={18} strokeWidth={2} />
        </span>
      </button>

      {/* Theme tooltip */}
      <div
        id="theme-toggle-tooltip"
        role="tooltip"
        className="
          pointer-events-none invisible absolute right-0 top-full
          z-[100] mt-3 w-56 origin-top-right
          translate-y-1 scale-95 rounded-2xl
          border border-slate-200 bg-white p-3.5 text-left
          opacity-0 shadow-sm shadow-slate-200/80
          transition-[opacity,transform,visibility]
          duration-200 ease-in-out
          group-hover/theme:visible
          group-hover/theme:translate-y-0
          group-hover/theme:scale-100
          group-hover/theme:opacity-100
          group-focus-within/theme:visible
          group-focus-within/theme:translate-y-0
          group-focus-within/theme:scale-100
          group-focus-within/theme:opacity-100
          dark:border-slate-700 dark:bg-[#050505]
          dark:shadow-black/60
        "
      >
        {/* Current theme information */}
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl bg-teal-500/10 text-teal-700
              transition-colors duration-300
              dark:bg-teal-400/10 dark:text-teal-300
            "
          >
            <CurrentIcon size={20} strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-sm font-semibold text-slate-900
                transition-colors duration-300 dark:text-white
              "
            >
              {current.label}
            </p>

            <p
              className="
                mt-0.5 text-xs leading-relaxed text-slate-500
                transition-colors duration-300 dark:text-slate-400
              "
            >
              {current.description}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-slate-100 dark:border-slate-800" />

        {/* Next theme */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Click to switch
          </span>

          <span
            className="
              inline-flex items-center gap-1 rounded-full
              bg-teal-50 px-2 py-1
              text-[11px] font-medium text-teal-700
              transition-colors duration-300
              dark:bg-teal-400/10 dark:text-teal-300
            "
          >
            <NextIcon size={12} />
            {next.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
