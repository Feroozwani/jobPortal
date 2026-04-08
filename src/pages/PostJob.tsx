import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const PostJob = () => {
  const navigate = useNavigate();
  const { addJob } = useJobs();

  const [form, setForm] = useState({
    title: "",
    tags: "",
    role: "",
    minSalary: "",
    maxSalary: "",
    salaryType: "",
    education: "",
    experience: "",
    jobType: "",
    jobLevel: "",
    expiryDate: "",
    country: "",
    city: "",
    description: "",
    remote: false,
  });

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let newErrors: any = {};
    if (!form.title.trim()) newErrors.title = "Job title is required";
    if (!form.tags.trim()) newErrors.tags = "Tags are required";
    if (!form.role) newErrors.role = "Select job role";
    if (!form.minSalary) newErrors.minSalary = "Min salary required";
    if (!form.maxSalary) newErrors.maxSalary = "Max salary required";
    if (
      form.minSalary &&
      form.maxSalary &&
      Number(form.minSalary) > Number(form.maxSalary)
    ) {
      newErrors.maxSalary = "Max must be greater than Min";
    }
    if (!form.salaryType) newErrors.salaryType = "Select salary type";
    if (!form.education) newErrors.education = "Select education level";
    if (!form.experience) newErrors.experience = "Select experience";
    if (!form.jobType) newErrors.jobType = "Select job type";
    if (!form.jobLevel) newErrors.jobLevel = "Select job level";
    if (!form.expiryDate) {
      newErrors.expiryDate = "Expiry date required";
    }
    if (!form.country) newErrors.country = "Select country";
    if (!form.city) newErrors.city = "Select city";
    if (!form.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const [y, m, d] = form.expiryDate.split("-");
    const formattedDate = `${d}/${m}/${y}`;

    addJob({
      id: crypto.randomUUID(),
      title: form.title,
      type: form.jobType,
      status: "Active",
      applications: 0,
      expiryDate: formattedDate,
    });

    navigate("/dashboard/my-jobs");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <DashboardLayout>
      <h1 className="text-[24px] sm:text-[28px] font-medium text-[#434348] mb-6">
        Post a job
      </h1>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Job Title" error={errors.title}>
            <Input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={inputClass(errors.title)}
            />
          </Field>

          <Field label="Tags" error={errors.tags}>
            <Input
              value={form.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              className={inputClass(errors.tags)}
            />
          </Field>

          <SelectField
            label="Job Role"
            value={form.role}
            onChange={(v: string) => handleChange("role", v)}
            error={errors.role}
            options={[
              { value: "developer", label: "Developer" },
              { value: "designer", label: "Designer" },
              { value: "product_manager", label: "Product Manager" },
              { value: "qa", label: "QA Engineer" },
            ]}
          />
        </div>

        <Section title="Salary">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="Min Salary" error={errors.minSalary}>
              <Input
                value={form.minSalary}
                onChange={(e) => handleChange("minSalary", e.target.value)}
                className={inputClass(errors.minSalary)}
              />
            </Field>

            <Field label="Max Salary" error={errors.maxSalary}>
              <Input
                value={form.maxSalary}
                onChange={(e) => handleChange("maxSalary", e.target.value)}
                className={inputClass(errors.maxSalary)}
              />
            </Field>

            <SelectField
              label="Salary Type"
              value={form.salaryType}
              onChange={(v: string) => handleChange("salaryType", v)}
              error={errors.salaryType}
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
                { value: "hourly", label: "Hourly" },
              ]}
            />
          </div>
        </Section>

        <Section title="Advance Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <SelectField
              label="Education Level"
              value={form.education}
              onChange={(v: string) => handleChange("education", v)}
              error={errors.education}
              options={[
                { value: "high_school", label: "High School" },
                { value: "bachelor", label: "Bachelor's" },
                { value: "master", label: "Master's" },
                { value: "phd", label: "PhD" },
              ]}
            />
            <SelectField
              label="Experience Level"
              value={form.experience}
              onChange={(v: string) => handleChange("experience", v)}
              error={errors.experience}
              options={[
                { value: "entry", label: "Entry Level" },
                { value: "mid", label: "Mid Level" },
                { value: "senior", label: "Senior Level" },
                { value: "lead", label: "Lead" },
              ]}
            />
            <SelectField
              label="Job Type"
              value={form.jobType}
              onChange={(v: string) => handleChange("jobType", v)}
              error={errors.jobType}
              options={[
                { value: "full_time", label: "Full Time" },
                { value: "part_time", label: "Part Time" },
                { value: "contract", label: "Contract" },
                { value: "internship", label: "Internship" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <SelectField
              label="Job Level"
              value={form.jobLevel}
              onChange={(v: string) => handleChange("jobLevel", v)}
              error={errors.jobLevel}
              options={[
                { value: "junior", label: "Junior" },
                { value: "mid", label: "Mid" },
                { value: "senior", label: "Senior" },
                { value: "lead", label: "Lead" },
              ]}
            />

            <Field label="Expiration Date" error={errors.expiryDate}>
              <input
                type="date"
                min={today}
                value={form.expiryDate}
                onChange={(e) => handleChange("expiryDate", e.target.value)}
                className={`h-12 w-full rounded-md border px-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-colors ${
                  errors.expiryDate ? "border-red-500" : "border-input"
                }`}
              />
            </Field>
          </div>
        </Section>

        <Section title="Location">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectField
              label="Country"
              value={form.country}
              onChange={(v: string) => handleChange("country", v)}
              error={errors.country}
              options={[
                { value: "usa", label: "United States" },
                { value: "canada", label: "Canada" },
                { value: "uk", label: "United Kingdom" },
                { value: "india", label: "India" },
              ]}
            />
            <SelectField
              label="City"
              value={form.city}
              onChange={(v: string) => handleChange("city", v)}
              error={errors.city}
              options={[
                { value: "new_york", label: "New York" },
                { value: "los_angeles", label: "Los Angeles" },
                { value: "london", label: "London" },
                { value: "mumbai", label: "Mumbai" },
              ]}
            />
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Checkbox
              checked={form.remote}
              onCheckedChange={(v) => handleChange("remote", v)}
            />
            <span className="text-sm">Fully remote position</span>
          </div>
        </Section>

        <Section title="Job Descriptions">
          <Textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className={inputClass(errors.description)}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </Section>

        <Button className="w-full sm:w-auto h-12 rounded-full px-8">
          Post Job
        </Button>
      </form>
    </DashboardLayout>
  );
};

const Section = ({ title, children }: any) => (
  <div>
    <h2 className="text-[18px] font-medium text-[#434348] mb-3">{title}</h2>
    {children}
  </div>
);

const Field = ({ label, error, children }: any) => (
  <div>
    <label className="text-[14px] text-[#7E7E86] mb-1.5 block">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, value, onChange, error, options }: any) => (
  <div>
    <label className="text-[14px] text-[#7E7E86] mb-1.5 block">{label}</label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`h-12 ${error ? "border-red-500" : ""}`}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt: { value: string; label: string }) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const inputClass = (error: any) => `h-12 ${error ? "border-red-500" : ""}`;

export default PostJob;
