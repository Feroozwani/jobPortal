import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AccountSetup from "./pages/AccountSetup";
import SetupComplete from "./pages/SetupComplete";
import Dashboard from "./pages/Dashboard";
import MyJobs from "./pages/MyJobs";
import JobDetails from "./pages/JobDetails";
import EditJob from "./pages/EditJob";
import PostJob from "./pages/PostJob";
import NotFound from "./pages/NotFound";
import { JobsProvider } from "./context/JobsContext";

const queryClient = new QueryClient();

const App = () => (
  <JobsProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account-setup" element={<AccountSetup />} />
            <Route path="/setup-complete" element={<SetupComplete />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/my-jobs" element={<MyJobs />} />
            <Route path="/dashboard/jobs/:id" element={<JobDetails />} />
            <Route path="/dashboard/jobs/:id/edit" element={<EditJob />} />
            <Route path="/dashboard/post-job" element={<PostJob />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </JobsProvider>
);

export default App;
