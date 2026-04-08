import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const navigate = useNavigate();
  const validate = () => {
    let newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const users: any[] = JSON.parse(
      localStorage.getItem("jobpilot_users") || "[]",
    );

    const matched = users.find(
      (u) =>
        (u.email === email.trim() || u.username === email.trim()) &&
        u.password === password,
    );

    if (!matched) {
      const accountExists = users.some(
        (u) => u.email === email.trim() || u.username === email.trim(),
      );

      if (!accountExists) {
        setErrors({
          general:
            "No account found with this email or username. Please sign up first.",
        });
      } else {
        setErrors({ password: "Incorrect password. Please try again." });
      }
      return;
    }
    sessionStorage.setItem("loggedInUser", JSON.stringify(matched));

    navigate("/dashboard");
  };

  const handleSocialLogin = () => {
    navigate("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-0 flex flex-col justify-start pt-12 sm:pt-16 lg:pt-20">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 text-center sm:text-left">
          Log In to JobPilot
        </h1>

        <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base text-center sm:text-left">
          Don't have an account?{" "}
          <Link to="/signup" className="text-foreground underline font-medium">
            Sign Up
          </Link>
        </p>

        {errors.general && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {errors.general}{" "}
            <Link to="/signup" className="underline font-medium">
              Sign up here
            </Link>
            .
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">
              Username or Email Address
            </label>
            <Input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "", general: "" }));
              }}
              className={`h-11 sm:h-12 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">
              Password
            </label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({ ...prev, password: "", general: "" }));
                }}
                className={`h-11 sm:h-12 pr-10 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}

            <div className="text-right mt-1.5">
              <Link to="#" className="text-sm text-primary underline">
                Forget your password
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 sm:h-12 rounded-full text-sm sm:text-base font-medium"
          >
            Log In
          </Button>
        </form>

        <div className="flex items-center gap-3 my-5 sm:my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs sm:text-sm text-muted-foreground">OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => {}}
            className="h-11 sm:h-12 rounded-full gap-2 text-sm font-normal justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"
                fill="#1877F2"
              />
            </svg>
            Log in with Facebook
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="h-11 sm:h-12 rounded-full gap-2 text-sm font-normal justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </svg>
            Log in with Google
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
