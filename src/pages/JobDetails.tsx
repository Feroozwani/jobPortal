import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Calendar,
  Clock,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useJobs } from "@/context/JobsContext";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  const { jobs, removeJob } = useJobs();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg font-medium">Job not found.</p>
          <Link
            to="/dashboard/my-jobs"
            className="text-blue-600 underline text-sm mt-2 inline-block"
          >
            Back to My Jobs
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleDelete = () => {
    removeJob(job.id);
    navigate("/dashboard/my-jobs");
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground">Job Details</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDelete(true)}
            className="p-2 text-destructive hover:text-destructive/80 hover:bg-destructive/10 rounded-lg transition-colors"
            aria-label="Delete job"
          >
            <Trash2 size={22} />
          </button>

          <Button className="rounded-full px-6 w-full sm:w-auto" asChild>
            <Link to={`/dashboard/jobs/${job.id}/edit`}>Edit Job</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {job.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-[15px] sm:text-base">
              {job.description}
            </p>
          </div>

          {job.requirements?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Requirements
              </h3>
              <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-muted-foreground text-sm sm:text-base">
                {job.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="w-full lg:w-96 space-y-5 lg:space-y-6">
          <div className="border border-border rounded-xl p-5 bg-card">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">
                  Salary ({job.salary.currency})
                </p>
                <p className="text-2xl font-bold text-success">
                  ${job.salary.min.toLocaleString()} – $
                  {job.salary.max.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {job.salary.period} salary
                </p>
              </div>

              <div className="text-left sm:text-right">
                <Briefcase size={24} className="text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">Job Location</p>
                <p className="text-base font-medium text-foreground mt-1">
                  {job.location}
                </p>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-xl p-5 bg-card">
            <h3 className="text-lg font-semibold text-foreground mb-5">
              Job Overview
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6">
              <div className="flex flex-col items-center text-center">
                <Calendar size={20} className="text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Job Posted</p>
                <p className="text-sm font-medium text-foreground mt-1">
                  {job.jobPosted}
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Clock size={20} className="text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Expires on</p>
                <p className="text-sm font-medium text-foreground mt-1">
                  {job.jobExpires}
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Award size={20} className="text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Job Level</p>
                <p className="text-sm font-medium text-foreground mt-1">
                  {job.jobLevel}
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Briefcase size={20} className="text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="text-sm font-medium text-foreground mt-1">
                  {job.experience}
                </p>
              </div>

              <div className="flex flex-col items-center text-center col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1">
                <GraduationCap size={20} className="text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Education</p>
                <p className="text-sm font-medium text-foreground mt-1">
                  {job.education}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this job? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  );
};

export default JobDetails;
