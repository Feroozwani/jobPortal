export interface Job {
  id: string;
  title: string;
  type: string;
  daysRemaining?: number;
  expiryDate?: string;
  status: "Active" | "Expired";
  applications: number;
  description: string;
  requirements: string[];
  salary: { min: number; max: number; currency: string; period: string };
  location: string;
  jobPosted: string;
  jobExpires: string;
  jobLevel: string;
  experience: string;
  education: string;
  tags: string;
  jobRole: string;
  educationLevel: string;
  experienceLevel: string;
  jobType: string;
  country: string;
  city: string;
  remote: boolean;
}

export const mockJobs: Job[] = [
  {
    id: "1", title: "UI/UX Designer", type: "Full time", daysRemaining: 27, status: "Active", applications: 80,
    description: "Join us as a UI/UX Designer and be part of an innovative project that blends creativity, clarity, and functionality. In this role, you will shape intuitive digital experiences while contributing to brand consistency across platforms. Work closely with cross-functional teams, bring ideas to life, and create designs that make a real impact.",
    requirements: [
      "2+ years of experience as a UI/UX Designer (mandatory).",
      "Strong portfolio showcasing UI/UX projects and design thinking.",
      "Proficiency in Figma and good working knowledge of Adobe tools (Photoshop, Illustrator, After Effects preferred).",
      "Solid understanding of user-centered design principles, usability standards, and responsive design.",
      "Experience working with or contributing to brand systems (brand colors, components, visual consistency).",
      "Ability to create clean, modern interfaces and collaborate with stakeholders on visual decisions.",
      "Leadership qualities — ability to guide junior designers, conduct design reviews, and lead discussions.",
      "Strong communication, documentation, and collaboration skills.",
      "Ability to work independently, meet deadlines, and adapt to changing requirements.",
      "Bachelor's degree in Design, HCI, or a related field is a plus.",
      "Bonus: Experience in motion graphics, micro-interactions, or prototyping animations.",
    ],
    salary: { min: 70000, max: 100000, currency: "USD", period: "Yearly" },
    location: "Bangalore, IN", jobPosted: "16 Feb 2026", jobExpires: "10 Mar 2026",
    jobLevel: "Entry Level", experience: "1 - 2 years", education: "Graduation",
    tags: "", jobRole: "Designer", educationLevel: "Graduation", experienceLevel: "1-2 years",
    jobType: "Full Time", country: "India", city: "Bangalore", remote: false,
  },
  { id: "2", title: "Senior UX Designer", type: "Full time", daysRemaining: 12, status: "Active", applications: 180, description: "", requirements: [], salary: { min: 90000, max: 130000, currency: "USD", period: "Yearly" }, location: "Bangalore, IN", jobPosted: "10 Feb 2026", jobExpires: "22 Feb 2026", jobLevel: "Senior", experience: "3 - 5 years", education: "Graduation", tags: "", jobRole: "Designer", educationLevel: "Graduation", experienceLevel: "3-5 years", jobType: "Full Time", country: "India", city: "Bangalore", remote: false },
  { id: "3", title: "Product Designer", type: "Contract", daysRemaining: 5, status: "Active", applications: 75, description: "", requirements: [], salary: { min: 80000, max: 110000, currency: "USD", period: "Yearly" }, location: "Bangalore, IN", jobPosted: "12 Feb 2026", jobExpires: "17 Feb 2026", jobLevel: "Mid", experience: "2 - 4 years", education: "Graduation", tags: "", jobRole: "Designer", educationLevel: "Graduation", experienceLevel: "2-4 years", jobType: "Contract", country: "India", city: "Bangalore", remote: false },
  { id: "4", title: "Lead UI Designer", type: "Full time", daysRemaining: 20, status: "Active", applications: 110, description: "", requirements: [], salary: { min: 100000, max: 140000, currency: "USD", period: "Yearly" }, location: "Bangalore, IN", jobPosted: "5 Feb 2026", jobExpires: "25 Feb 2026", jobLevel: "Lead", experience: "5+ years", education: "Graduation", tags: "", jobRole: "Designer", educationLevel: "Graduation", experienceLevel: "5+ years", jobType: "Full Time", country: "India", city: "Bangalore", remote: false },
  { id: "5", title: "Junior UX/UI Designer", type: "Internship", daysRemaining: 3, status: "Active", applications: 60, description: "", requirements: [], salary: { min: 30000, max: 50000, currency: "USD", period: "Yearly" }, location: "Bangalore, IN", jobPosted: "14 Feb 2026", jobExpires: "17 Feb 2026", jobLevel: "Junior", experience: "0 - 1 years", education: "Graduation", tags: "", jobRole: "Designer", educationLevel: "Graduation", experienceLevel: "0-1 years", jobType: "Internship", country: "India", city: "Bangalore", remote: false },
  { id: "6", title: "Visual Designer", type: "Part time", daysRemaining: 15, status: "Active", applications: 90, description: "", requirements: [], salary: { min: 50000, max: 75000, currency: "USD", period: "Yearly" }, location: "Bangalore, IN", jobPosted: "8 Feb 2026", jobExpires: "23 Feb 2026", jobLevel: "Mid", experience: "2 - 3 years", education: "Graduation", tags: "", jobRole: "Designer", educationLevel: "Graduation", experienceLevel: "2-3 years", jobType: "Part Time", country: "India", city: "Bangalore", remote: false },
  { id: "7", title: "Interaction Designer", type: "Full time", expiryDate: "12 Feb 2026", status: "Expired", applications: 45, description: "", requirements: [], salary: { min: 70000, max: 100000, currency: "USD", period: "Yearly" }, location: "Bangalore, IN", jobPosted: "1 Feb 2026", jobExpires: "12 Feb 2026", jobLevel: "Mid", experience: "2 - 4 years", education: "Graduation", tags: "", jobRole: "Designer", educationLevel: "Graduation", experienceLevel: "2-4 years", jobType: "Full Time", country: "India", city: "Bangalore", remote: false },
  { id: "8", title: "Full Stack Developer", type: "Internship", daysRemaining: 30, status: "Active", applications: 0, description: "", requirements: [], salary: { min: 40000, max: 60000, currency: "USD", period: "Yearly" }, location: "Bangalore, IN", jobPosted: "16 Feb 2026", jobExpires: "18 Mar 2026", jobLevel: "Junior", experience: "0 - 1 years", education: "Graduation", tags: "", jobRole: "Developer", educationLevel: "Graduation", experienceLevel: "0-1 years", jobType: "Internship", country: "India", city: "Bangalore", remote: false },
];
