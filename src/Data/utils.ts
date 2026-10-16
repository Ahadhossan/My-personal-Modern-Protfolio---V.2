export type MenuIcon = React.ElementType | null;

export type SubMenuLink = {
  label: string;
  href: string;
  icon?: string;
};

// export type SubMenuHeading = {
//   title: string;
//   icon: MenuIcon;
// };

export type MenuType = {
  name: string;
  path: string;
  gridCols?: 1 | 2 | 3 | 4;
  subMenu?: SubMenuLink[][];
};

export const Menus: MenuType[] = [
  {
    name: "Home",
    path: "/home",
  },

  // ABOUT
  {
    name: "About Me",
    path: "/about",
    gridCols: 1,
    subMenu: [
      [
        {
          label: "About Me",
          href: "/about",
        },
        // {
        //   label: "Success Stories",
        //   href: "/success",
        // },
        {
          label: "Experience",
          href: "/experience",
        },
      ],
    ],
  },

  // SERVICES
  // {
  //   name: "Services",
  //   path: "/services",
  //   gridCols: 1,
  //   subMenu: [
  //     [
  //       {
  //         label: "UX/UI Design",
  //         href: "/ui",
  //       },
  //       {
  //         label: "Web Design",
  //         href: "/webapp",
  //       },
  //       {
  //         label: "Frontend Developer",
  //         href: "/frontend",
  //       },
  //     ],
  //   ],
  // },

  // SKILLS
  {
    name: "Skills",
    path: "/skills",
  },

  // PROJECTS
  {
    name: "Projects",
    path: "/projects",
  },

  // ARTICLES
  {
    name: "My Articles",
    path: "/articles",
  },
];