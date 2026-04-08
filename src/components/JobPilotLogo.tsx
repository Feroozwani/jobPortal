import jobpilotLogo from "@/assets/jobpilot.svg";

const JobPilotLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <img
      src={jobpilotLogo}
      alt="JobPilot Logo"
      className="w-8 h-8 object-contain"
    />
    <span className="text-xl font-semibold text-foreground">JobPilot</span>
  </div>
);

export default JobPilotLogo;
