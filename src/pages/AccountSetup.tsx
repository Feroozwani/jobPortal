import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobPilotLogo from "@/components/JobPilotLogo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AccountSetup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    orgType: "",
    industry: "",
    teamSize: "",
    year: "",
    about: "",
    location: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    let newErrors: any = {};

    if (!form.companyName.trim())
      newErrors.companyName = "Company name is required";

    if (!form.orgType) newErrors.orgType = "Select organization type";
    if (!form.industry) newErrors.industry = "Select industry";
    if (!form.teamSize) newErrors.teamSize = "Select team size";

    if (!form.year) {
      newErrors.year = "Year is required";
    } else if (!/^\d{4}$/.test(form.year)) {
      newErrors.year = "Enter valid year (e.g., 2015)";
    }

    if (!form.about.trim()) newErrors.about = "About us is required";
    if (!form.location.trim()) newErrors.location = "Location is required";

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{7,15}$/.test(form.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const pending = sessionStorage.getItem("pendingUser");
    if (!pending) {
      navigate("/signup");
      return;
    }

    const signupData = JSON.parse(pending);

    const newUser = {
      ...signupData,
      profile: { ...form },
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("jobpilot_users") || "[]");

    const alreadyExists = existing.some((u: any) => u.email === newUser.email);

    if (!alreadyExists) {
      existing.push(newUser);
      localStorage.setItem("jobpilot_users", JSON.stringify(existing));
    }

    sessionStorage.removeItem("pendingUser");

    navigate("/setup-complete");
  };

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 md:px-10 lg:px-16 py-6">
      <JobPilotLogo />

      <div className="max-w-3xl mx-auto mt-8 sm:mt-10">
        <h1 className="text-2xl font-bold text-foreground mb-8">
          Account Setup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Logo Upload */}
          <div>
            <h2 className="text-base font-semibold text-foreground mb-3">
              Logo Upload
            </h2>

            <div className="w-full max-w-[280px] h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors text-center px-4">
              <img
                src="/src/assets/cloud-upload.svg"
                alt="Cloud Upload"
                className="w-12 h-12 mb-3"
              />
              <p className="text-sm text-gray-700">
                <span className="font-medium">Browse photo</span> or drop here
              </p>
              <p className="text-xs text-gray-500 mt-1">
                A photo larger than 400 pixels works best.
              </p>
              <p className="text-xs text-gray-500">Max file size 5 MB.</p>
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">
              Company Info
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Company Name
                </label>
                <Input
                  className="h-11"
                  placeholder="Enter company name"
                  value={form.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Organization Type
                </label>
                <Select onValueChange={(val) => handleChange("orgType", val)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="ngo">NGO</SelectItem>
                  </SelectContent>
                </Select>
                {errors.orgType && (
                  <p className="text-red-500 text-xs mt-1">{errors.orgType}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Industry Type
                </label>
                <Select onValueChange={(val) => handleChange("industry", val)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
                {errors.industry && (
                  <p className="text-red-500 text-xs mt-1">{errors.industry}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Team Size
                </label>
                <Select onValueChange={(val) => handleChange("teamSize", val)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
                {errors.teamSize && (
                  <p className="text-red-500 text-xs mt-1">{errors.teamSize}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Year of Establishment
                </label>
                <Input
                  className="h-11"
                  placeholder="YYYY"
                  maxLength={4}
                  value={form.year}
                  onChange={(e) => handleChange("year", e.target.value)}
                />
                {errors.year && (
                  <p className="text-red-500 text-xs mt-1">{errors.year}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">
                About Us
              </label>
              <Textarea
                className="min-h-[110px] resize-y"
                placeholder="Tell us about your company..."
                value={form.about}
                onChange={(e) => handleChange("about", e.target.value)}
              />
              {errors.about && (
                <p className="text-red-500 text-xs mt-1">{errors.about}</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground mb-4">
              Contact Info
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Location
                </label>
                <Input
                  className="h-11"
                  placeholder="City, Country"
                  value={form.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
                {errors.location && (
                  <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Contact Number
                </label>
                <div className="flex">
                  <div className="flex items-center gap-2 border border-r-0 rounded-l-md px-3 h-11 bg-gray-50 text-sm min-w-[72px]">
                    <span>🇺🇸</span>
                    <span>+1</span>
                  </div>
                  <Input
                    className="h-11 rounded-l-none flex-1"
                    placeholder="Phone number"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Email
                </label>
                <Input
                  type="email"
                  className="h-11"
                  placeholder="company@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white rounded-full px-10 h-12 text-base font-medium"
            >
              Finish Setup
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSetup;
