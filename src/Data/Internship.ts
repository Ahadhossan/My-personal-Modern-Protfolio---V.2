export interface InternshipJob {
  role: string;
  company: string;
  location: string;
  duration: string;
  current?: boolean;
  points: string[];
}

export const internshipJobs: InternshipJob[] = [
  {
    role: "Industrial Attachment – Professional Web Development Specialist (PWDS)",
    company: "People N Tech Limited",
    location: "Dhaka, Bangladesh · On-site",
    duration: "Oct 2022 – Jan 2023",
    points: [
      "Gained practical experience in frontend and backend web development.",
      "Worked with HTML, CSS, JavaScript, PHP, and MySQL on real-world development projects.",
      "Practiced responsive web development and database-driven application development.",
      "Collaborated with team members using Agile development practices and Git-based version control.",
    ],
  },
];
