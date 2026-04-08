import { Link } from "react-router-dom";
import JobPilotLogo from "@/components/JobPilotLogo";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";

const SetupComplete = () => (
  <div className="min-h-screen bg-background px-4 sm:px-6 md:px-10 lg:px-16 py-6">
    <div className="max-w-6xl mx-auto">
      <JobPilotLogo />
    </div>

    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center px-2">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent flex items-center justify-center mb-5 sm:mb-6">
        <CheckCheck size={28} className="text-primary sm:size-8" />
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 max-w-xl">
        🎉 Congratulations, Your profile is 100% complete!
      </h1>

      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-md">
        You're all set! Start exploring your dashboard or post your first job
        now.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
        <Button
          variant="outline"
          className="w-full sm:w-auto rounded-full px-6 sm:px-8 h-11"
          asChild
        >
          <Link to="/dashboard">View Dashboard</Link>
        </Button>

        <Button
          className="w-full sm:w-auto rounded-full px-6 sm:px-8 h-11"
          asChild
        >
          <Link to="/dashboard/post-job">Post a Job</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default SetupComplete;
