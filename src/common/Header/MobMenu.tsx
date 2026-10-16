// import React, { useState } from "react";
// import {
//   motion,
//   AnimatePresence,
//   easeIn,
//   easeOut,
//   type Variants,
// } from "framer-motion";
// import { ChevronDown, Menu, X } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// type IconType = React.ComponentType<{ size?: number; className?: string }>;
// type SubMenuItem = { href: string; label: string; icon?: string | IconType };
// type MenuType = { name: string; path: string; subMenu?: SubMenuItem[][] };
// export default function MobMenu({ Menus }: { Menus: MenuType[] }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeIndex, setActiveIndex] = useState<number | null>(null);
//   const location = useLocation();
//   const toggleDrawer = () => {
//     setIsOpen((prev) => !prev);
//     setActiveIndex(null);
//   };
//   const toggleSubMenu = (index: number) => {
//     setActiveIndex((prev) => (prev === index ? null : index));
//   };
//   const dropdownVariants: Variants = {
//     initial: { opacity: 0, y: -10, scale: 0.98 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: { type: "spring", stiffness: 300, damping: 30 },
//     },
//     exit: { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } },
//   };
//   const subMenuVariants: Variants = {
//     enter: {
//       height: "auto",
//       opacity: 1,
//       transition: { duration: 0.25, ease: easeOut },
//     },
//     exit: {
//       height: 0,
//       opacity: 0,
//       transition: { duration: 0.2, ease: easeIn },
//     },
//   };
//   return (
//     <>
//       {" "}
//       {/* Toggle Button */}{" "}
//       <button
//         type="button"
//         aria-label={isOpen ? "Close menu" : "Open menu"}
//         aria-expanded={isOpen}
//         onClick={toggleDrawer}
//         className=" relative z-[1000] text-[#1E5470] transition-colors duration-300 hover:text-green-700 dark:text-slate-200 dark:hover:text-green-400 lg:hidden "
//       >
//         {" "}
//         {isOpen ? <X size={26} /> : <Menu size={26} />}{" "}
//       </button>{" "}
//       {/* Mobile Dropdown */}{" "}
//       <AnimatePresence>
//         {" "}
//         {isOpen && (
//           <motion.div
//             className=" absolute left-0 right-0 top-16 z-[999] max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-b-2xl border border-slate-200/80 bg-white p-5 text-slate-900 shadow-2xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:shadow-black/40 "
//             variants={dropdownVariants}
//             initial="initial"
//             animate="animate"
//             exit="exit"
//           >
//             {" "}
//             <ul className="space-y-2">
//               {" "}
//               {Menus.map((menu, index) => {
//                 const hasSubMenu = !!menu.subMenu?.length;
//                 const isTopActive =
//                   location.pathname === menu.path ||
//                   (hasSubMenu &&
//                     menu
//                       .subMenu!.flat()
//                       .some((item) => item.href === location.pathname));
//                 const isActive = activeIndex === index;
//                 return (
//                   <li key={menu.name}>
//                     {" "}
//                     {/* Top Menu */}{" "}
//                     <div
//                       className={` flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 transition-colors duration-200 ${isTopActive ? "bg-green-400 text-green-700 dark:bg-green-400/15 dark:text-green-300" : "text-[#1E5470] hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/[0.07]"} `}
//                       onClick={() => {
//                         if (hasSubMenu) {
//                           toggleSubMenu(index);
//                         } else {
//                           setIsOpen(false);
//                         }
//                       }}
//                     >
//                       {" "}
//                       <Link
//                         to={menu.path || "#"}
//                         onClick={(event) => {
//                           if (hasSubMenu) {
//                             event.preventDefault();
//                           } else {
//                             setIsOpen(false);
//                           }
//                         }}
//                         className="flex-1 text-[16px] font-semibold"
//                       >
//                         {" "}
//                         {menu.name}{" "}
//                       </Link>{" "}
//                       {hasSubMenu && (
//                         <ChevronDown
//                           size={18}
//                           className={` shrink-0 transition-transform duration-300 ${isActive ? "rotate-180" : ""} `}
//                         />
//                       )}{" "}
//                     </div>{" "}
//                     {/* Submenu */}{" "}
//                     {hasSubMenu && (
//                       <AnimatePresence initial={false}>
//                         {" "}
//                         {isActive && (
//                           <motion.div
//                             variants={subMenuVariants}
//                             initial="exit"
//                             animate="enter"
//                             exit="exit"
//                             className="overflow-hidden"
//                           >
//                             <div className="ml-3 mt-2 space-y-2 border-l border-slate-200 pl-3 dark:border-slate-700">
//                               {menu.subMenu!.map((col, colIndex) => (
//                                 <ul key={colIndex} className="space-y-1">
//                                   {" "}
//                                   {col.map((item, i) => {
//                                     const isSubActive =
//                                       location.pathname === item.href;
//                                     const IconComponent = item.icon;
//                                     return (
//                                       <li key={item.href || i}>
//                                         {" "}
//                                         <Link
//                                           to={item.href}
//                                           onClick={() => setIsOpen(false)}
//                                           className={` group flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm transition-colors duration-200 ${isSubActive ? "bg-green-400 text-green-700 dark:bg-green-400/15 dark:text-green-300" : "text-[#1E5470] hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.07] dark:hover:text-white"} `}
//                                         >
//                                           {" "}
//                                           {IconComponent &&
//                                             (typeof IconComponent ===
//                                             "string" ? (
//                                               <img
//                                                 src={IconComponent}
//                                                 alt=""
//                                                 aria-hidden="true"
//                                                 className="h-4 w-4 shrink-0 object-contain"
//                                               />
//                                             ) : (
//                                               <IconComponent
//                                                 size={14}
//                                                 className={` shrink-0 transition-colors ${isSubActive ? "text-green-700 dark:text-green-300" : "text-[#1E5470] dark:text-slate-400 dark:group-hover:text-green-300"} `}
//                                               />
//                                             ))}{" "}
//                                           <span>{item.label}</span>{" "}
//                                         </Link>{" "}
//                                       </li>
//                                     );
//                                   })}{" "}
//                                 </ul>
//                               ))}{" "}
//                             </div>{" "}
//                           </motion.div>
//                         )}{" "}
//                       </AnimatePresence>
//                     )}{" "}
//                   </li>
//                 );
//               })}{" "}
//             </ul>{" "}
//           </motion.div>
//         )}{" "}
//       </AnimatePresence>{" "}
//     </>
//   );
// }

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  easeIn,
  easeOut,
  type Variants,
} from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type IconType = React.ComponentType<{
  size?: number;
  className?: string;
}>;

type SubMenuItem = {
  href: string;
  label: string;
  icon?: string | IconType;
};

type MenuType = {
  name: string;
  path: string;
  subMenu?: SubMenuItem[][];
};

export default function MobMenu({ Menus }: { Menus: MenuType[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const location = useLocation();

  // Normalize paths to prevent trailing-slash mismatches.
  const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

  const currentPath = normalizePath(location.pathname);

  // Check whether a menu or submenu matches the current route.
  const isPathActive = (path: string) => {
    const normalizedPath = normalizePath(path);

    return (
      currentPath === normalizedPath ||
      (normalizedPath === "/home" && currentPath === "/")
    );
  };

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
    setActiveIndex(null);
  };

  const toggleSubMenu = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const dropdownVariants: Variants = {
    initial: {
      opacity: 0,
      y: -10,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.2,
      },
    },
  };

  const subMenuVariants: Variants = {
    enter: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: easeOut,
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: easeIn,
      },
    },
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={toggleDrawer}
        className="relative z-[1000] text-[#1E5470] transition-colors duration-300 hover:text-green-700 dark:text-slate-200 dark:hover:text-green-400 lg:hidden"
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 right-0 top-16 z-[999] max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-b-2xl border border-slate-200/80 bg-white p-5 text-slate-900 shadow-2xl transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:shadow-black/40"
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ul className="space-y-2">
              {Menus.map((menu, index) => {
                const hasSubMenu = Boolean(menu.subMenu?.length);

                const isTopActive =
                  isPathActive(menu.path) ||
                  (hasSubMenu &&
                    menu
                      .subMenu!.flat()
                      .some((item) => isPathActive(item.href)));

                const isActive = activeIndex === index;

                return (
                  <li key={menu.name}>
                    {/* Top Menu */}
                    <div
                      className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 transition-colors duration-200 ${
                        isTopActive
                          ? "bg-green-400/15 text-green-700 dark:bg-green-400/15 dark:text-green-300"
                          : "text-[#1E5470] hover:bg-white/80 dark:text-slate-200 dark:hover:bg-white/[0.08]"
                      }`}
                      onClick={() => {
                        if (hasSubMenu) {
                          toggleSubMenu(index);
                        } else {
                          setIsOpen(false);
                        }
                      }}
                    >
                      <Link
                        to={menu.path || "/"}
                        onClick={(event) => {
                          if (hasSubMenu) {
                            event.preventDefault();
                          } else {
                            setIsOpen(false);
                          }
                        }}
                        className="flex-1 text-[16px] font-semibold"
                      >
                        {menu.name}
                      </Link>

                      {hasSubMenu && (
                        <ChevronDown
                          size={18}
                          className={`shrink-0 transition-transform duration-300 ${
                            isActive ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>

                    {/* Submenu */}
                    {hasSubMenu && (
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            variants={subMenuVariants}
                            initial="exit"
                            animate="enter"
                            exit="exit"
                            className="overflow-hidden"
                          >
                            <div className="ml-3 mt-2 space-y-2 border-l border-slate-200 pl-3 dark:border-slate-700">
                              {menu.subMenu!.map((col, colIndex) => (
                                <ul key={colIndex} className="space-y-1">
                                  {col.map((item, i) => {
                                    const isSubActive = isPathActive(item.href);

                                    const IconComponent = item.icon;

                                    return (
                                      <li key={item.href || i}>
                                        <Link
                                          to={item.href}
                                          onClick={() => {
                                            setIsOpen(false);
                                            setActiveIndex(null);
                                          }}
                                          aria-current={
                                            isSubActive ? "page" : undefined
                                          }
                                          className={`group flex items-center gap-3
                            rounded-xl px-3 py-2.5
                            transition-all duration-200 ${
                              isSubActive
                                ? "bg-green-400/15 text-green-700 dark:bg-green-400/15 dark:text-green-300"
                                : "text-[#1E5470] hover:bg-white/80 dark:text-slate-200 dark:hover:bg-white/[0.08]"
                            }`}
                                        >
                                          {IconComponent &&
                                            (typeof IconComponent ===
                                            "string" ? (
                                              <img
                                                src={IconComponent}
                                                alt=""
                                                aria-hidden="true"
                                                className="h-4 w-4 shrink-0 object-contain"
                                              />
                                            ) : (
                                              <IconComponent
                                                size={14}
                                                className={`shrink-0 transition-colors ${
                                                  isSubActive
                                                    ? "text-green-700 dark:text-green-300"
                                                    : "text-[#1E5470] dark:text-slate-400 dark:group-hover:text-green-300"
                                                }`}
                                              />
                                            ))}

                                          <span>{item.label}</span>
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
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
