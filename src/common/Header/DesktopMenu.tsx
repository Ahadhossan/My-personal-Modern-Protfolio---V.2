import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type IconType = React.ComponentType<{
  size?: number;
  className?: string;
}>;

type SubMenuLink = {
  label: string;
  href: string;
  icon?: string | IconType;
};

type MenuType = {
  name: string;
  path: string;
  gridCols?: 1 | 2 | 3 | 4;
  subMenu?: SubMenuLink[][];
};

type Props = {
  menu: MenuType;
};

export default function DesktopMenu({ menu }: Props) {
  const [isHover, setIsHover] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const location = useLocation();
  const { gridCols = 3, subMenu = [], name, path } = menu;

  const hasSubMenu = subMenu.length > 0;

  const gridColsMap: Record<1 | 2 | 3 | 4, string> = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
  };

  const gridClass = `grid-cols-1 ${gridColsMap[gridCols]}`;

  // Normalize paths to handle trailing slashes.
  const normalizePath = (value: string) => value.replace(/\/+$/, "") || "/";

  const currentPath = normalizePath(location.pathname);

  // Match Home on both "/" and "/home".
  const isPathActive = (href: string) => {
    const normalizedHref = normalizePath(href);

    return (
      currentPath === normalizedHref ||
      (normalizedHref === "/home" && currentPath === "/")
    );
  };

  // Active state for the top-level menu.
  const isTopActive =
    isPathActive(path) ||
    (hasSubMenu && subMenu.flat().some((link) => isPathActive(link.href)));

  const handleEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }

    setIsHover(true);
  };

  const handleLeave = () => {
    const id = setTimeout(() => {
      setIsHover(false);
      setTimeoutId(null);
    }, 150);

    setTimeoutId(id);
  };

  return (
    <li
      className="relative hidden md:list-item"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      tabIndex={0}
      aria-expanded={hasSubMenu ? isHover : undefined}
      aria-haspopup={hasSubMenu ? true : undefined}
      onKeyDown={(event: React.KeyboardEvent<HTMLLIElement>) => {
        if (hasSubMenu && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          setIsHover((prev) => !prev);
        }

        if (event.key === "Escape") {
          setIsHover(false);
        }
      }}
    >
      {/* Main Menu */}
      <Link
        to={path}
        aria-current={isTopActive ? "page" : undefined}
        onClick={() => setIsHover(false)}
        className={`
          relative flex items-center gap-1 rounded-xl px-3 py-2
          text-sm font-semibold tracking-wide lg:text-base
          transition-all duration-200
          ${
            isTopActive
              ? "bg-green-400/15 text-green-700 dark:bg-green-400/15 dark:text-green-300"
              : "text-[#1E5470] hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-white/[0.08]"
          }
          after:absolute after:bottom-0 after:left-1/2
          after:h-[2px] after:w-0 after:-translate-x-1/2
          after:bg-[#1E5470] after:transition-all after:duration-300
          hover:after:w-3/4
          dark:after:bg-green-400
        `}
      >
        {name}

        {hasSubMenu && (
          <ChevronDown
            className={`transition-transform duration-200 ${
              isHover ? "rotate-180" : ""
            }`}
            size={16}
          />
        )}
      </Link>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {hasSubMenu && isHover && (
          <motion.div
            role="menu"
            aria-label={`${name} submenu`}
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
              absolute left-0 z-50 mt-3
              w-max min-w-[400px] max-w-[60vw]
              rounded-2xl border border-white
              bg-white p-4
              shadow-[0_10px_40px_rgba(0,0,0,0.10)]
              backdrop-blur-xl
              transition-colors duration-300
              dark:border-slate-700/70
              dark:bg-slate-950/95
              dark:shadow-[0_16px_50px_rgba(0,0,0,0.45)]
              dark:backdrop-blur-2xl
            "
          >
            <div className={`grid gap-6 ${gridClass}`}>
              {subMenu.map((column, i) => (
                <ul key={i} className="space-y-2 text-[15px]">
                  {column.map((link, j) => {
                    const isSubActive = isPathActive(link.href);
                    const IconComponent = link.icon;

                    return (
                      <li key={link.href || j}>
                        <Link
                          to={link.href}
                          role="menuitem"
                          aria-current={isSubActive ? "page" : undefined}
                          onClick={() => setIsHover(false)}
                          className={`
                            group flex items-center gap-3
                            rounded-xl px-3 py-2.5
                            transition-all duration-200
                            ${
                              isSubActive
                                ? "bg-green-400/15 text-green-700 dark:bg-green-400/15 dark:text-green-300"
                                : "text-[#1E5470] hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-white/[0.08]"
                            }
                          `}
                        >
                          {IconComponent &&
                            (typeof IconComponent === "string" ? (
                              <img
                                src={IconComponent}
                                alt=""
                                aria-hidden="true"
                                className="h-5 w-5 shrink-0 object-contain"
                              />
                            ) : (
                              <IconComponent
                                size={17}
                                className={`
                                  shrink-0 transition-all duration-200
                                  group-hover:translate-x-1
                                  ${
                                    isSubActive
                                      ? "text-green-700 dark:text-green-300"
                                      : "text-[#1E5470] dark:text-slate-400 dark:group-hover:text-green-300"
                                  }
                                `}
                              />
                            ))}

                          <span>{link.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
