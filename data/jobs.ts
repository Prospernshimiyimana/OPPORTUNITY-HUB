export type Job = {
  id: number;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  category: "Engineering" | "Design" | "Data";
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    description:
      "Build polished web experiences using React, Next.js, and modern frontend tooling for a global product team.",
    requirements: ["React", "Next.js", "Tailwind CSS", "Git"],
    location: "Remote",
    type: "Full-time",
    category: "Engineering",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Amazon",
    description:
      "Design APIs, services, and data flows that support high-scale products across internal and external platforms.",
    requirements: ["Node.js", "Express", "MongoDB", "REST APIs"],
    location: "New York, NY",
    type: "Full-time",
    category: "Engineering",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Microsoft",
    description:
      "Turn product and customer data into clear insights, dashboards, and recommendations for business teams.",
    requirements: ["SQL", "Excel", "Power BI", "Python"],
    location: "Remote",
    type: "Contract",
    category: "Data",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Apple",
    description:
      "Design thoughtful interfaces, prototypes, and user journeys for product experiences across web and mobile.",
    requirements: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    location: "Toronto, Canada",
    type: "Internship",
    category: "Design",
  },
];

export default jobs;
