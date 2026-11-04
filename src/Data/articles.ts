import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Braces,
  FileCode,
  Wind,
  Palette,
  Triangle,
  Gauge,
  Briefcase,
  BookOpen,
  Lightbulb,
  Accessibility,
  Hash,
} from "lucide-react";

import image1 from "../assets/Articels/Modern Bookstore E-Commerce Homepage.png";
import image2 from "../assets/Articels/Ticket Task Management.png";
import image3 from "../assets/Articels/RCM Operations Triage Dashboard.png";

/* ---------- Types ---------- */

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  url: string;
  image: string;
  featured?: boolean;

  summary?: {
    overview: string;
    highlights: string[];
    workflow: string[];
    outcomes: string[];
  };
}

/* ---------- Article Data ---------- */

export const articles: Article[] = [
  {
    id: "book-store-online-book-shopping-platform",
    title: "Book Store – Online Book Shopping Platform",
    excerpt:
      "An upcoming online bookstore project currently in the planning and preparation stage. I am preparing to start frontend development with React 19, TypeScript, Vite, and Tailwind CSS, focusing initially on customer shopping functionality and an admin dashboard.",
    category: "Upcoming Project",
    date: "Nov 04, 2026",
    readTime: "Planning Stage",
    tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "E-commerce"],
    url: "https://docs.google.com/document/d/1xnFBCq-CGIYEH8-BgVyiu1v25TT3IyyWkbyMhmQxQaA/edit?tab=t.ynpbwjdkn6wi#heading=h.tyahc810xyp6",
    image: image1,

    featured: true,

    summary: {
      overview:
        "Book Store is a planned online book shopping platform where customers will be able to browse, search, purchase, and review books. The platform is also planned to include an admin dashboard for managing books, users, orders, and platform activities. This project has not started development yet and is currently in the planning and preparation stage. The next step is to begin frontend development.",

      highlights: [
        "Customer-facing storefront with book discovery, search, categories, and book details.",
        "Shopping cart, wishlist, checkout interface, and order tracking experience.",
        "Customer authentication, profile management, ratings, and reviews.",
        "Admin dashboard for managing users, books, orders, promotions, and analytics.",
        "Optional author and publisher features, with printing and logistics workflows planned for later phases.",
        "Frontend technology plan: React 19, TypeScript, Vite, React Router, and Tailwind CSS.",
      ],

      workflow: [
        "Current stage: project planning and preparation; frontend development has not started.",
        "Begin frontend development by setting up the project with the selected technologies.",
        "Build the reusable UI components, application layout, and page routing.",
        "Develop the customer-facing storefront and core shopping experience.",
        "Build the admin dashboard and its initial management interfaces.",
        "Continue with testing, responsive improvements, and backend integration when the required APIs are available.",
      ],

      outcomes: [
        "A convenient and responsive online book discovery and shopping experience.",
        "A structured admin interface for managing core bookstore activities.",
        "A modular frontend foundation that can support additional roles and features in later phases.",
      ],
    },
  },

  {
    id: "enterprise-pms-support-workflow",
    title: "Enterprise PMS Support Ticket & Task Management System",
    excerpt:
      "A structured workflow for managing PMS support tickets, SLA monitoring, issue escalation, developer coordination, and quality assurance.",
    category: "Case Study",
    date: "Nov 04, 2026",
    readTime: "5 min read",
    tags: ["PMS", "Workflow", "Ticket Management", "SLA"],
    url: "https://docs.google.com/document/d/1n4LbY7_RUba1XbKxRgDzyaloBa0NFzEl/edit",
    image: image2,

    summary: {
      overview:
        "A structured enterprise workflow designed to streamline PMS support operations, ticket management, issue tracking, and collaboration between clients, support engineers, team leads, developers, and QA engineers.",

      highlights: [
        "Centralized ticket creation, categorization, and tracking.",
        "SLA monitoring with priority and business-impact assessment.",
        "Multi-level escalation for complex and critical queries.",
        "Clear coordination between support, development, and QA teams.",
        "Functional, regression, and live-environment verification.",
        "Client updates, resolution confirmation, and feedback collection.",
      ],

      workflow: [
        "Client submits a ticket with the subject, description, module, and attachments.",
        "Support Engineer reviews, acknowledges, categorizes, and investigates the query.",
        "If the issue cannot be resolved at Level 1, it is escalated and converted into a development task.",
        "Developer analyzes the task, implements a fix, updates the task, and submits it to QA.",
        "QA Engineer performs functional and regression testing and shares the verified results.",
        "Client tests the fix in the live environment; Support confirms the resolution and closes the ticket.",
      ],

      outcomes: [
        "More transparent ticket ownership and progress tracking.",
        "Improved cross-team communication and accountability.",
        "A consistent process for escalation, testing, and resolution.",
        "Better visibility into SLA performance and support operations.",
      ],
    },
  },

  {
    id: "RCM Operations Triage & Prioritization",
    title: "RCM Operations Triage & Prioritization",
    excerpt:
      "A structured operational prioritization framework for managing time-sensitive tasks, workforce coordination, HR operations, data accuracy, and cross-functional responsibilities in a fast-paced RCM environment.",
    category: "Case Study",
    date: "Nov 04, 2026",
    readTime: "5 min read",
    tags: [
      "RCM Operations",
      "Task Prioritization",
      "Workforce Management",
      "HR Operations",
      "Data Analysis",
      "Process Improvement",
    ],
    url: "https://drive.google.com/file/d/12aKPBr5Oge3K18pABPv9W1M-iTmGio5i/view?usp=sharing",
    image: image3,
    accent: "bg-sky-500",
    dot: "bg-sky-400",

    summary: {
      overview:
        "This case study demonstrates a structured approach to managing multiple operational responsibilities during a time-sensitive RCM shift. It focuses on task prioritization, deadline management, workforce coordination, data verification, operational risk assessment, and cross-functional communication.",

      highlights: [
        "Prioritization of six concurrent operational tasks based on urgency and business impact.",
        "Identification of critical workforce and desk allocation gaps before new-hire onboarding.",
        "Verification of employee leave balance discrepancies and automation records.",
        "Preparation of accurate headcount, pod distribution, and leave summaries for leadership.",
        "Investigation of internal tracker automation failures and temporary recovery planning.",
        "Analysis of workforce working hours and late-arrival trends across multiple RCM pods.",
        "Identification of process improvement and automation opportunities.",
      ],

      workflow: [
        "Review all incoming operational requests and identify their deadlines, urgency, and potential business impact.",
        "Submit time-sensitive HR offboarding documentation to avoid financial or administrative delays.",
        "Coordinate with IT and RCM Pod Leads to address desk allocation shortages before new-hire onboarding.",
        "Collect and cross-check Lifecycle, Leave Approval, and Leave Balance trackers for leadership reporting.",
        "Investigate automation failures, review system logs, and perform manual recovery when necessary.",
        "Analyze Workhour Dashboard data to identify workload imbalances and attendance-related patterns.",
        "Communicate operational risks, document findings, and recommend corrective actions and follow-ups.",
      ],

      outcomes: [
        "Established a clear execution order for multiple concurrent operational responsibilities.",
        "Improved visibility into task ownership, deadlines, and operational dependencies.",
        "Identified potential workforce workload imbalances between RCM pods.",
        "Highlighted data accuracy risks in leadership reporting and employee records.",
        "Proposed proactive automation alerts and data validation improvements.",
        "Developed a structured approach to operational risk identification and escalation.",
      ],
    },
  },

  {
    id: "first-dev-job",
    title: "What I learned from my first developer interviews",
    excerpt:
      "The questions that came up again and again, and how I prepared for them.",
    category: "Career",
    date: "Aug 22, 2026",
    readTime: "6 min read",
    tags: ["Career", "Tips"],
    url: "/articles/first-dev-job",
    image: "https://picsum.photos/seed/first-dev-job/800/500",
  },

  {
    id: "web-accessibility",
    title: "Web accessibility basics every developer should know",
    excerpt:
      "Labels, focus states and colour contrast: the quick wins that help every visitor.",
    category: "Accessibility",
    date: "Jul 18, 2026",
    readTime: "6 min read",
    tags: ["Accessibility", "Tips"],
    url: "/articles/web-accessibility",
    image: "https://picsum.photos/seed/web-accessibility/800/500",
  },

  {
    id: "css-layout",
    title: "Flexbox or Grid? How I choose",
    excerpt:
      "A quick way to decide which layout tool fits the problem in front of you.",
    category: "CSS",
    date: "Jun 14, 2026",
    readTime: "4 min read",
    tags: ["CSS", "Tips"],
    url: "/articles/css-layout",
    image: "https://picsum.photos/seed/css-layout/800/500",
  },

  {
    id: "portfolio-tips",
    title: "How to build a portfolio that gets noticed",
    excerpt:
      "What to show, what to leave out, and how to explain your projects in a few lines.",
    category: "Career",
    date: "May 30, 2026",
    readTime: "5 min read",
    tags: ["Career", "Tips"],
    url: "/articles/portfolio-tips",
    image: "https://picsum.photos/seed/portfolio-tips/800/500",
  },
];

/* ---------- Tag Icons ---------- */

export const TAG_ICONS: Record<string, LucideIcon> = {
  React: Atom,
  TypeScript: Braces,
  JavaScript: FileCode,
  Tailwind: Wind,
  CSS: Palette,
  "Next.js": Triangle,
  Performance: Gauge,
  Career: Briefcase,
  Tutorial: BookOpen,
  Tips: Lightbulb,
  Accessibility: Accessibility,
};

/* ---------- Fallback Tag Icon ---------- */

export const DEFAULT_TAG_ICON = Hash;

/* ---------- Pagination ---------- */

export const INITIAL_COUNT = 5;
export const STEP = 4;
