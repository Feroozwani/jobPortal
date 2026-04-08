import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobs } from "@/context/JobsContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, updateJob } = useJobs();
  const job = jobs.find((j) => j.id === id);

  const [title, setTitle] = useState(job?.title || "");
  const [tags, setTags] = useState(job?.tags || "");
  const [jobRole, setJobRole] = useState(
    job?.jobRole?.toLowerCase() || "developer",
  );
  const [salaryMin, setSalaryMin] = useState(String(job?.salary.min || ""));
  const [salaryMax, setSalaryMax] = useState(String(job?.salary.max || ""));
  const [salaryPeriod, setSalaryPeriod] = useState(
    job?.salary.period?.toLowerCase() || "yearly",
  );
  const [education, setEducation] = useState("graduation");
  const [experienceLevel, setExperienceLevel] = useState(
    job?.experienceLevel || "3-5 years",
  );
  const [jobType, setJobType] = useState(
    job?.jobType?.toLowerCase().replace(" ", "-") || "full-time",
  );
  const [jobLevel, setJobLevel] = useState(
    job?.jobLevel?.toLowerCase().replace(" ", "-") || "mid",
  );
  const [jobExpires, setJobExpires] = useState(job?.jobExpires || "");
  const [country, setCountry] = useState(
    job?.country?.toLowerCase() || "india",
  );
  const [city, setCity] = useState(job?.city?.toLowerCase() || "bangalore");
  const [remote, setRemote] = useState(job?.remote || false);
  const [description, setDescription] = useState(job?.description || "");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateJob({
      ...job,
      title,
      tags,
      jobRole,
      salary: {
        ...job.salary,
        min: Number(salaryMin.replace(/,/g, "")),
        max: Number(salaryMax.replace(/,/g, "")),
        period: salaryPeriod,
      },
      experienceLevel,
      jobType,
      jobLevel,
      jobExpires,
      country,
      city,
      remote,
      description,
    });

    navigate(`/dashboard/jobs/${job.id}`);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Edit Job Details
        </h1>
        <Button
          type="submit"
          form="edit-form"
          className="rounded-full px-8 h-11 w-full sm:w-auto"
        >
          Save Changes
        </Button>
      </div>

      <form
        id="edit-form"
        onSubmit={handleSubmit}
        className="max-w-4xl space-y-8"
      >
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="col-span-1 lg:col-span-2">
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Job Title
              </label>
              <Input
                className="h-11"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Tags
              </label>
              <Input
                className="h-11"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. remote, senior"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Job Role
              </label>
              <Select value={jobRole} onValueChange={setJobRole}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Salary</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Minimum Salary
              </label>
              <div className="relative">
                <Input
                  className="h-11 pl-8"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                  USD
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Maximum Salary
              </label>
              <div className="relative">
                <Input
                  className="h-11 pl-8"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                  USD
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Salary Period
              </label>
              <Select value={salaryPeriod} onValueChange={setSalaryPeriod}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yearly">Yearly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">
            Advanced Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Education Level
              </label>
              <Select value={education} onValueChange={setEducation}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="graduation">Graduation</SelectItem>
                  <SelectItem value="masters">Masters</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Experience Level
              </label>
              <Select
                value={experienceLevel}
                onValueChange={setExperienceLevel}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1 years">0-1 years</SelectItem>
                  <SelectItem value="1-2 years">1-2 years</SelectItem>
                  <SelectItem value="3-5 years">3-5 years</SelectItem>
                  <SelectItem value="5+ years">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Job Type
              </label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Job Level
              </label>
              <Select value={jobLevel} onValueChange={setJobLevel}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry-level">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid Level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                  <SelectItem value="lead">Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Expiration Date
              </label>
              <Input
                className="h-11"
                value={jobExpires}
                onChange={(e) => setJobExpires(e.target.value)}
                type="date"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Location</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                Country
              </label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                City
              </label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="delhi">Delhi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="remote"
              checked={remote}
              onCheckedChange={(val) => setRemote(Boolean(val))}
            />
            <label
              htmlFor="remote"
              className="text-sm text-foreground cursor-pointer"
            >
              Fully remote position
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-foreground">
            Job Description & Requirements
          </h2>
          <Textarea
            className="min-h-[180px] resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a detailed job description..."
          />
        </div>
      </form>
    </DashboardLayout>
  );
};

export default EditJob;
