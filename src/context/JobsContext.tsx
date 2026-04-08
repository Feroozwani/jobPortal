import { createContext, useContext, useState, ReactNode } from "react";

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  type: string;
  status: "Active" | "Expired";
  applications: number;
  daysRemaining?: number;
  expiryDate?: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
    period: string;
  };
  jobPosted: string;
  jobExpires: string;
  jobLevel: string;
  experience: string;
  education: string;
}

interface JobsContextType {
  jobs: Job[];
  addJob: (job: Job) => void;
  updateJob: (job: Job) => void;
  removeJob: (id: string) => void;
}

const JobsContext = createContext<JobsContextType | undefined>(undefined);

const initialJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    description:
      "We are looking for a skilled Frontend Developer to join our team and help build modern, responsive web applications using React and TypeScript.",
    requirements: [
      "3+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with REST APIs",
      "Good understanding of UI/UX principles",
    ],
    type: "Full-time",
    status: "Active",
    applications: 12,
    daysRemaining: 10,
    location: "Remote",
    salary: { min: 60000, max: 90000, currency: "USD", period: "Annual" },
    jobPosted: "Jan 1, 2025",
    jobExpires: "Feb 1, 2025",
    jobLevel: "Mid Level",
    experience: "3 Years",
    education: "Bachelor's Degree",
  },
  {
    id: "2",
    title: "Backend Engineer",
    description:
      "Join our backend team to design and build scalable APIs and services that power our platform.",
    requirements: [
      "Experience with Node.js or Python",
      "Familiarity with SQL and NoSQL databases",
      "Understanding of microservices architecture",
    ],
    type: "Full-time",
    status: "Expired",
    applications: 8,
    expiryDate: "Expired",
    location: "New York, NY",
    salary: { min: 80000, max: 120000, currency: "USD", period: "Annual" },
    jobPosted: "Dec 1, 2024",
    jobExpires: "Jan 1, 2025",
    jobLevel: "Senior Level",
    experience: "5 Years",
    education: "Bachelor's Degree",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    description:
      "Design intuitive and engaging user interfaces for web and mobile applications.",
    requirements: [
      "3+ years of UI/UX design experience",
      "Figma & Adobe XD skills",
      "Prototyping experience",
    ],
    type: "Full-time",
    status: "Active",
    applications: 5,
    daysRemaining: 15,
    location: "San Francisco, CA",
    salary: { min: 70000, max: 95000, currency: "USD", period: "Annual" },
    jobPosted: "Mar 1, 2025",
    jobExpires: "Mar 31, 2025",
    jobLevel: "Mid Level",
    experience: "3 Years",
    education: "Bachelor's Degree",
  },
  {
    id: "4",
    title: "Data Scientist",
    description:
      "Analyze data to provide actionable insights and build predictive models.",
    requirements: [
      "Python & R proficiency",
      "Experience with ML algorithms",
      "SQL & data visualization skills",
    ],
    type: "Full-time",
    status: "Active",
    applications: 7,
    daysRemaining: 20,
    location: "Boston, MA",
    salary: { min: 85000, max: 130000, currency: "USD", period: "Annual" },
    jobPosted: "Feb 20, 2025",
    jobExpires: "Mar 20, 2025",
    jobLevel: "Senior Level",
    experience: "4 Years",
    education: "Master's Degree",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    description: "Manage CI/CD pipelines and cloud infrastructure.",
    requirements: [
      "AWS/Azure experience",
      "Docker & Kubernetes",
      "CI/CD tools knowledge",
    ],
    type: "Full-time",
    status: "Active",
    applications: 10,
    daysRemaining: 12,
    location: "Seattle, WA",
    salary: { min: 90000, max: 120000, currency: "USD", period: "Annual" },
    jobPosted: "Feb 25, 2025",
    jobExpires: "Mar 15, 2025",
    jobLevel: "Mid Level",
    experience: "3 Years",
    education: "Bachelor's Degree",
  },
  {
    id: "6",
    title: "Marketing Specialist",
    description:
      "Develop and implement marketing campaigns to drive brand awareness.",
    requirements: [
      "SEO & SEM experience",
      "Social media marketing",
      "Content creation",
    ],
    type: "Full-time",
    status: "Active",
    applications: 6,
    daysRemaining: 18,
    location: "Chicago, IL",
    salary: { min: 50000, max: 70000, currency: "USD", period: "Annual" },
    jobPosted: "Mar 5, 2025",
    jobExpires: "Apr 1, 2025",
    jobLevel: "Junior Level",
    experience: "2 Years",
    education: "Bachelor's Degree",
  },
  {
    id: "7",
    title: "Product Manager",
    description: "Lead product development from ideation to launch.",
    requirements: [
      "3+ years in product management",
      "Agile/Scrum experience",
      "Stakeholder communication",
    ],
    type: "Full-time",
    status: "Active",
    applications: 9,
    daysRemaining: 14,
    location: "Remote",
    salary: { min: 95000, max: 130000, currency: "USD", period: "Annual" },
    jobPosted: "Mar 10, 2025",
    jobExpires: "Apr 10, 2025",
    jobLevel: "Senior Level",
    experience: "4 Years",
    education: "Bachelor's Degree",
  },
  {
    id: "8",
    title: "QA Engineer",
    description:
      "Ensure software quality through automated and manual testing.",
    requirements: [
      "Selenium or Cypress",
      "Manual testing experience",
      "Bug tracking tools",
    ],
    type: "Contract",
    status: "Active",
    applications: 3,
    daysRemaining: 8,
    location: "Austin, TX",
    salary: { min: 60000, max: 85000, currency: "USD", period: "Annual" },
    jobPosted: "Mar 12, 2025",
    jobExpires: "Mar 20, 2025",
    jobLevel: "Mid Level",
    experience: "2 Years",
    education: "Bachelor's Degree",
  },
  {
    id: "9",
    title: "Mobile Developer",
    description:
      "Develop high-quality iOS and Android apps using Flutter and React Native.",
    requirements: [
      "3+ years of mobile development",
      "Flutter & React Native",
      "App Store & Play Store deployment",
    ],
    type: "Full-time",
    status: "Active",
    applications: 11,
    daysRemaining: 16,
    location: "Los Angeles, CA",
    salary: { min: 80000, max: 110000, currency: "USD", period: "Annual" },
    jobPosted: "Mar 1, 2025",
    jobExpires: "Mar 30, 2025",
    jobLevel: "Mid Level",
    experience: "3 Years",
    education: "Bachelor's Degree",
  },
  {
    id: "10",
    title: "HR Coordinator",
    description:
      "Assist in HR operations, recruitment, and employee engagement initiatives.",
    requirements: [
      "HR operations knowledge",
      "Recruitment experience",
      "Strong communication skills",
    ],
    type: "Full-time",
    status: "Active",
    applications: 4,
    daysRemaining: 20,
    location: "Miami, FL",
    salary: { min: 45000, max: 60000, currency: "USD", period: "Annual" },
    jobPosted: "Mar 3, 2025",
    jobExpires: "Mar 23, 2025",
    jobLevel: "Junior Level",
    experience: "2 Years",
    education: "Bachelor's Degree",
  },
  {
    id: "11",
    title: "Cybersecurity Analyst",
    description: "Protect systems and networks from cyber threats.",
    requirements: [
      "Network security",
      "Firewalls & IDS/IPS",
      "Incident response",
    ],
    type: "Full-time",
    status: "Active",
    applications: 5,
    daysRemaining: 15,
    location: "Washington, D.C.",
    salary: { min: 75000, max: 100000, currency: "USD", period: "Annual" },
    jobPosted: "Mar 5, 2025",
    jobExpires: "Mar 25, 2025",
    jobLevel: "Mid Level",
    experience: "3 Years",
    education: "Bachelor's Degree",
  },
  {
    id: "12",
    title: "Technical Writer",
    description:
      "Create technical documentation and manuals for software products.",
    requirements: [
      "Technical writing experience",
      "API documentation",
      "Attention to detail",
    ],
    type: "Part-time",
    status: "Active",
    applications: 2,
    daysRemaining: 25,
    location: "Remote",
    salary: { min: 40000, max: 55000, currency: "USD", period: "Annual" },
    jobPosted: "Mar 2, 2025",
    jobExpires: "Apr 2, 2025",
    jobLevel: "Junior Level",
    experience: "1 Year",
    education: "Bachelor's Degree",
  },
];

export const JobsProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const addJob = (job: Job) => setJobs((prev) => [job, ...prev]);

  const updateJob = (updated: Job) =>
    setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));

  const removeJob = (id: string) =>
    setJobs((prev) => prev.filter((j) => j.id !== id));

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, removeJob }}>
      {children}
    </JobsContext.Provider>
  );
};

export const useJobs = () => {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error("useJobs must be used within JobsProvider");
  return ctx;
};
