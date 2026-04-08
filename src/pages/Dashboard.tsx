import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Users,
  CheckCircle,
  AlertCircle,
  MoreVertical,
} from "lucide-react";
import { mockJobs } from "@/data/mockJobs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const recentJobs = mockJobs.slice(0, 7);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Hello, Designic
        </h1>
        <p className="text-muted-foreground text-sm mt-0.5">
          Here is your daily activity and applications
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-2xl">
        <div className="flex items-center justify-between rounded-xl px-5 py-5 bg-indigo-50">
          <div>
            <p className="text-2xl font-bold text-foreground">10</p>
            <p className="text-sm text-muted-foreground mt-0.5">Open Jobs</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
            <Briefcase size={22} className="text-indigo-500" />
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl px-5 py-5 bg-orange-50">
          <div>
            <p className="text-2xl font-bold text-foreground">200</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Saved Candidates
            </p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
            <Users size={22} className="text-orange-400" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">
            Recently Posted Jobs
          </h2>
          <Link
            to="/dashboard/my-jobs"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            View all
          </Link>
        </div>
        <div className="hidden md:block border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_140px_180px_140px] gap-4 px-5 py-3 bg-muted/60 text-sm font-medium text-muted-foreground border-b border-border">
            <span>Jobs</span>
            <span>Status</span>
            <span>Applications</span>
            <span>Actions</span>
          </div>

          {recentJobs.map((job, idx) => (
            <div
              key={job.id}
              className={`grid grid-cols-[1fr_140px_180px_140px] gap-4 px-5 py-4 items-center ${
                idx !== recentJobs.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {job.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {job.type}
                  {" · "}
                  {job.daysRemaining
                    ? `${job.daysRemaining} days remaining`
                    : job.expiryDate}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {job.status === "Active" ? (
                  <>
                    <CheckCircle size={15} className="text-green-500" />
                    <span className="text-sm text-green-600 font-medium">
                      Active
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={15} className="text-red-400" />
                    <span className="text-sm text-red-500 font-medium">
                      Expired
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users size={15} />
                <span>{job.applications} Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  size="sm"
                  className="text-xs h-8 px-4 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 shadow-none font-medium"
                  variant="ghost"
                >
                  <Link to={`/dashboard/jobs/${job.id}`}>View Job</Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 text-muted-foreground hover:text-foreground">
                      <MoreVertical size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem asChild>
                      <Link
                        to={`/dashboard/jobs/${job.id}/edit`}
                        className="flex items-center gap-2"
                      >
                        ✏️ Edit Job
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive flex items-center gap-2">
                      🗑️ Delete Job
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden space-y-3">
          {recentJobs.map((job) => (
            <div
              key={job.id}
              className="border border-border rounded-xl p-4 space-y-3"
            >
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {job.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {job.type}
                  {" · "}
                  {job.daysRemaining
                    ? `${job.daysRemaining} days remaining`
                    : job.expiryDate}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {job.status === "Active" ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle size={14} className="text-green-500" />
                      <span className="text-xs text-green-600 font-medium">
                        Active
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <AlertCircle size={14} className="text-red-400" />
                      <span className="text-xs text-red-500 font-medium">
                        Expired
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users size={13} />
                    <span>{job.applications} Apps</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="text-xs h-7 px-3 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 shadow-none font-medium"
                    variant="ghost"
                    asChild
                  >
                    <Link to={`/dashboard/jobs/${job.id}`}>View Job</Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 text-muted-foreground hover:text-foreground">
                        <MoreVertical size={15} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuItem asChild>
                        <Link to={`/dashboard/jobs/${job.id}/edit`}>
                          ✏️ Edit Job
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        🗑️ Delete Job
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
