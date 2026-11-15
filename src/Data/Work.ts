export interface Job {
  role: string;
  company: string;
  location: string;
  duration: string;
  current?: boolean;
  points: string[];
}

export const jobs: Job[] = [
  {
    role: "Product Excellence Engineer",
    company: "Cubix Technology Ltd.",
    location: "Dhaka, Bangladesh · On-site",
    duration: "Dec 2025 – Present",
    current: true,
    points: [
      "Provide software technical support for HMS & PMS (Hospitality/Property Management Systems), supporting day-to-day hotel operations.",
      "Analyze client queries, reproduce software behavior, identify potential system-related causes, and coordinate solutions with development and product teams.",
      "Collaborate with developers to identify bugs, validate fixes, and improve product performance, usability, and reliability.",
      "Contribute to continuous product improvement by communicating client feedback, operational requirements, and real-world usage scenarios to internal teams.",
      "Assist with implementation, configuration, testing, handover, and ongoing support for hotel management software solutions.",
    ],
  },
  {
    role: "Junior Web Developer",
    company: "Imranslab",
    location: "Montreal, Canada · Remote",
    duration: "Feb 2025 – Nov 2025",
    points: [
      "Developed and maintained modern, responsive web applications using React.js, JavaScript, Tailwind CSS, and related frontend technologies.",
      "Built reusable UI components and responsive interfaces for mobile, tablet, and desktop environments.",
      "Improved application performance and cross-device compatibility through frontend optimization and responsive development practices.",
      "Collaborated with remote developers and project teams using Git, GitHub, Jira, and Confluence.",
      "Participated in development workflows including requirement understanding, implementation, testing, debugging, code review, and deployment.",
    ],
  },
  {
    role: "Digital Marketer",
    company: "National IT Limited",
    location: "Savar, Dhaka, Bangladesh",
    duration: "Dec 2020 – Oct 2021",
    points: [
      "Managed digital marketing activities including SEO, content marketing, and social media campaigns.",
      "Analyzed user behavior, market trends, and campaign performance to support data-driven improvements.",
      "Improved online visibility and brand engagement through multi-channel digital marketing activities.",
    ],
  },
];
