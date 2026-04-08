import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Users, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useJobs } from "@/context/JobsContext";
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

const MyJobs = () => {
  const { jobs, removeJob } = useJobs();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      removeJob(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-[24px] sm:text-[28px] font-medium text-[#434348] mb-6">
        My Jobs
      </h1>

      {jobs.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg font-medium">No jobs posted yet</p>
          <p className="text-sm mt-1">
            Go to{" "}
            <Link to="/dashboard/post-job" className="text-blue-600 underline">
              Post a Job
            </Link>{" "}
            to get started.
          </p>
        </div>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="hidden md:grid grid-cols-[1fr_120px_160px_120px] gap-4 px-5 py-3 bg-muted text-[14px] font-medium text-[#7E7E86]">
            <span>Jobs</span>
            <span>Status</span>
            <span>Applications</span>
            <span>Actions</span>
          </div>

          {jobs.map((job) => {
            const isExpired = job.status === "Expired";

            return (
              <div
                key={job.id}
                className="border-t border-border px-4 py-4 md:px-5 md:py-4"
              >
                <div className="hidden md:grid grid-cols-[1fr_120px_160px_120px] gap-4 items-center">
                  <div>
                    <p className="font-medium text-[#434348]">{job.title}</p>
                    <p className="text-[14px] text-[#7E7E86]">
                      {job.type} ·{" "}
                      {job.daysRemaining
                        ? `${job.daysRemaining} days remaining`
                        : job.expiryDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {job.status === "Active" ? (
                      <>
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-[14px] text-green-600">
                          Active
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} className="text-red-500" />
                        <span className="text-[14px] text-red-500">
                          Expired
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[14px] text-[#7E7E86]">
                    <Users size={16} /> {job.applications} Applications
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`rounded-md text-xs ${
                        isExpired ? "cursor-not-allowed opacity-50" : ""
                      }`}
                      asChild
                      disabled={isExpired}
                    >
                      {isExpired ? (
                        <span>View Job</span>
                      ) : (
                        <Link to={`/dashboard/jobs/${job.id}`}>View Job</Link>
                      )}
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={`p-1 ${
                            isExpired
                              ? "cursor-not-allowed text-gray-400"
                              : "text-[#7E7E86] hover:text-[#434348]"
                          }`}
                          disabled={isExpired}
                        >
                          <MoreVertical size={16} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/dashboard/jobs/${job.id}/edit`}>
                            ✏️ Edit Job
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => setDeleteId(job.id)}
                        >
                          🗑️ Delete Job
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="md:hidden space-y-3">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <p className="font-medium text-[#434348]">{job.title}</p>
                      <p className="text-[13px] text-[#7E7E86]">
                        {job.type} ·{" "}
                        {job.daysRemaining
                          ? `${job.daysRemaining} days remaining`
                          : job.expiryDate}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={`text-[#7E7E86] ${
                            isExpired ? "cursor-not-allowed text-gray-400" : ""
                          }`}
                          disabled={isExpired}
                        >
                          <MoreVertical size={18} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/dashboard/jobs/${job.id}/edit`}>
                            ✏️ Edit Job
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => setDeleteId(job.id)}
                        >
                          🗑️ Delete Job
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      {job.status === "Active" ? (
                        <>
                          <CheckCircle size={16} className="text-green-600" />
                          <span className="text-[13px] text-green-600">
                            Active
                          </span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={16} className="text-red-500" />
                          <span className="text-[13px] text-red-500">
                            Expired
                          </span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[13px] text-[#7E7E86]">
                      <Users size={16} /> {job.applications}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className={`w-full rounded-md text-[13px] ${
                      isExpired ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    asChild
                    disabled={isExpired}
                  >
                    {isExpired ? (
                      <span>View Job</span>
                    ) : (
                      <Link to={`/dashboard/jobs/${job.id}`}>View Job</Link>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
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

export default MyJobs;
