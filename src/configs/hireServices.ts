export type THireService = {
  id: string;
  label: string;
  description: string;
};

// Plain data — shared between the client form and the page's structured data.
export const hireServices: THireService[] = [
  {
    id: "frontend-architecture",
    label: "Frontend Architecture",
    description: "Scalable structure, micro-frontends, and design systems.",
  },
  {
    id: "react-next-development",
    label: "React / Next.js Development",
    description: "Building fast, accessible products end to end.",
  },
  {
    id: "performance",
    label: "Performance Optimization",
    description: "Audits and fixes for Core Web Vitals and load speed.",
  },
  {
    id: "consulting",
    label: "Technical Consulting",
    description: "Architecture reviews, tooling, and team direction.",
  },
  {
    id: "mentoring",
    label: "Code Review & Mentoring",
    description: "Levelling up teams through reviews and pairing.",
  },
];
