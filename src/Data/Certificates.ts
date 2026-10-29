/* Certificate type + your certificate data. The section component imports this file. */
import reactUdemyCertificate from "../assets/beautiful-office-space-cartoon-style.jpg";

export type CertificateItem = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: string;
  tag: string;
  image: {
    src: string;
    alt: string;
  };
  credentialUrl?: string;
};

/* -------------------------------------------------------------------------- */
/*  YOUR CERTIFICATES  (edit / add here)                                       */
/*  - image: put the file in public/certificates/ and use "/certificates/x.png"*/
/*    (if you skip image, a clean preview is generated automatically)          */
/*  - credentialUrl: your real verify link ("Verify" button shows only if set) */
/*  - category: controls the filter pills (Programming, Design, Tools, Others) */
/* -------------------------------------------------------------------------- */

export const certificates: CertificateItem[] = [
  {
    id: "react-complete-guide",
    title: "React - The Complete Guide",
    issuer: "Udemy",
    date: "Mar 15, 2024",
    category: "Programming",
    tag: "Programming",

    image: {
      src: reactUdemyCertificate,
      alt: "React - The Complete Guide certificate from Udemy",
    },

    credentialUrl: "https://www.udemy.com/certificate/UC-xxxxxxxx/",
  },
  {
    id: "react-complete-guide",
    title: "React - The Complete Guide",
    issuer: "Udemy",
    date: "Mar 15, 2024",
    category: "Programming",
    tag: "Programming",

    image: {
      src: reactUdemyCertificate,
      alt: "React - The Complete Guide certificate from Udemy",
    },

    credentialUrl: "https://www.udemy.com/certificate/UC-xxxxxxxx/",
  },
  {
    id: "react-complete-guide",
    title: "React - The Complete Guide",
    issuer: "Udemy",
    date: "Mar 15, 2024",
    category: "Programming",
    tag: "Programming",

    image: {
      src: reactUdemyCertificate,
      alt: "React - The Complete Guide certificate from Udemy",
    },

    credentialUrl: "https://www.udemy.com/certificate/UC-xxxxxxxx/",
  },
  {
    id: "react-complete-guide",
    title: "React - The Complete Guide",
    issuer: "Udemy",
    date: "Mar 15, 2024",
    category: "Programming",
    tag: "Programming",

    image: {
      src: reactUdemyCertificate,
      alt: "React - The Complete Guide certificate from Udemy",
    },

    credentialUrl: "https://www.udemy.com/certificate/UC-xxxxxxxx/",
  },
  // Add more here. A new page appears automatically after 6 certificates.
];
