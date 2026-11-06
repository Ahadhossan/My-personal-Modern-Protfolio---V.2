import { createElement, type FC, type SVGProps } from "react";

import {
  Activity,
  Atom,
  Braces,
  Database,
  Flame,
  Layers,
  Radio,
  Server,
  Triangle,
  Webhook,
  Wind,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import image1 from "../assets/Articels/Modern Bookstore E-Commerce Homepage.png";
import image2 from "../assets/Projects/Projects1.png";

/* ---------- Project Types ---------- */

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  year: string;
  highlights: string[];
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  detailsUrl: string;
  image: string;
  featured?: boolean;
  status?: "live" | "upcoming";
  statusLabel?: string;
  stage?: string;
}

/* ---------- Project Data ---------- */

export const projects: Project[] = [
  {
    id: "book-store-online-book-shopping-platform",
    title: "Book Store – Online Book Shopping Platform",
    description:
      "An upcoming online bookstore platform currently in the planning and preparation stage. I am preparing to start frontend development, focusing first on customer shopping features and an admin dashboard.",
    role: "Planned Frontend Developer",
    year: "2026",
    highlights: [
      "Customer storefront for browsing, searching, and discovering books.",
      "Shopping cart, wishlist, checkout, order tracking, ratings, and reviews.",
      "Admin dashboard for managing books, users, orders, promotions, and analytics.",
      "Future phases may include author, publisher, printing staff, and logistics workflows.",
      "Development has not started yet; the project is currently in planning and preparation.",
      "Development phases: project setup, reusable components, routing, customer storefront, then admin dashboard.",
      "Later work: responsive testing, UI refinement, and backend integration when APIs are available.",
      "Expected outcome: a modular, responsive bookstore frontend with a structured admin experience.",
    ],
    tags: ["React 19", "TypeScript", "Vite", "React Router", "Tailwind CSS"],
    liveUrl: "",
    githubUrl: "",
    detailsUrl:
      "https://docs.google.com/document/d/1xnFBCq-CGIYEH8-BgVyiu1v25TT3IyyWkbyMhmQxQaA/edit?tab=t.ynpbwjdkn6wi#heading=h.6pqpnjgo2c66",
    image: image1,
    featured: true,
    status: "upcoming",
    statusLabel: "Upcoming Project",
    stage: "Planning & Preparation",
  },

  {
    id: "voyalabs-website",
    title: "voyalabs-website",
    description:
      "A responsive, animated landing page for a creative design and branding agency, built with vanilla HTML, CSS and JavaScript.",
    role: "Front-end developer",
    year: "2025",
    highlights: [
      "Custom cursor trail effect and scroll-triggered reveal animations using IntersectionObserver",
      "Scroll-based theme switch (dark to light) with smooth anchor navigation",
      "Responsive layout with a slide-in mobile menu, Lottie animations and a click-to-load Vimeo showreel",
    ],
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "IntersectionObserver",
      "Lottie",
      "Vimeo",
    ],
    liveUrl: "https://voyalabs-website.netlify.app/",
    githubUrl: "https://github.com/Ahadhossan/Voyalabs-Website",
    detailsUrl: "#",
    image: image2,
    status: "live",
  },

  {
    id: "task-manager",
    title: "Task Manager",
    description:
      "Drag-and-drop boards with deadlines, labels and team sharing.",
    role: "Full-stack developer",
    year: "2025",
    highlights: ["Drag-and-drop boards", "Deadlines and labels"],
    tags: ["Next.js", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/task-manager",
    detailsUrl: "/projects/task-manager",
    image: "https://picsum.photos/seed/tasks/800/500",
    status: "live",
  },

  {
    id: "blog-platform",
    title: "Blog Platform",
    description:
      "A markdown blog with comments, tags and a clean reading view.",
    role: "Full-stack developer",
    year: "2025",
    highlights: ["Markdown editor", "Tag filtering"],
    tags: ["Next.js", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/blog-platform",
    detailsUrl: "/projects/blog-platform",
    image: "https://picsum.photos/seed/blog-platform/800/500",
    status: "live",
  },

  {
    id: "chat-app",
    title: "Realtime Chat App",
    description:
      "One-to-one and group chat with online status and typing indicator.",
    role: "Full-stack developer",
    year: "2025",
    highlights: ["Instant messages", "Online status"],
    tags: ["React", "Socket.io"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/chat-app",
    detailsUrl: "/projects/chat-app",
    image: "https://picsum.photos/seed/chat-app/800/500",
    status: "live",
  },

  {
    id: "portfolio-cms",
    title: "Portfolio CMS",
    description: "Manage your projects and posts from a simple admin screen.",
    role: "Frontend developer",
    year: "2024",
    highlights: ["Simple admin screen", "Image upload"],
    tags: ["React", "Firebase"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/portfolio-cms",
    detailsUrl: "/projects/portfolio-cms",
    image: "https://picsum.photos/seed/portfolio-cms/800/500",
    status: "live",
  },

  {
    id: "food-delivery",
    title: "Food Delivery UI",
    description:
      "Browse restaurants, build a cart and place an order in a few taps.",
    role: "Frontend developer",
    year: "2024",
    highlights: ["Cart and checkout", "Restaurant search"],
    tags: ["React", "Redux"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/food-delivery",
    detailsUrl: "/projects/food-delivery",
    image: "https://picsum.photos/seed/food-delivery/800/500",
    status: "live",
  },

  {
    id: "expense-tracker",
    title: "Expense Tracker",
    description:
      "Add income and expenses and see where your money goes each month.",
    role: "Frontend developer",
    year: "2024",
    highlights: ["Monthly charts", "Category filters"],
    tags: ["TypeScript", "Chart.js"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/expense-tracker",
    detailsUrl: "/projects/expense-tracker",
    image: "https://picsum.photos/seed/expense-tracker/800/500",
    status: "live",
  },

  {
    id: "quiz-app",
    title: "Quiz App",
    description: "Timed multiple-choice quizzes with scores and review.",
    role: "Frontend developer",
    year: "2024",
    highlights: ["Timer and score", "Answer review"],
    tags: ["React", "Tailwind"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/your-username/quiz-app",
    detailsUrl: "/projects/quiz-app",
    image: "https://picsum.photos/seed/quiz-app/800/500",
    status: "live",
  },
];

/* ---------- Display Configuration ---------- */

export const INITIAL_COUNT = 2;
export const STEP = 4;

export const GRID = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8";

/* ---------- GitHub Icon ---------- */

export const GithubIcon: FC<SVGProps<SVGSVGElement>> = (props) =>
  createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "currentColor",
      "aria-hidden": "true",
      ...props,
    },
    createElement("path", {
      d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    }),
  );

/* ---------- Technology Icons ---------- */

export const TAG_ICONS: Record<string, LucideIcon> = {
  React: Atom,
  TypeScript: Braces,
  "React 19": Atom,
  Vite: Wind,
  "React Router": Triangle,
  "Tailwind CSS": Wind,
  Tailwind: Wind,
  "Node.js": Server,
  "Next.js": Triangle,
  MongoDB: Database,
  PostgreSQL: Database,
  "REST API": Webhook,
  Firebase: Flame,
  Redux: Layers,
  "Socket.io": Radio,
  "Chart.js": Activity,
};
