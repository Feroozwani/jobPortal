import { ReactNode } from "react";
import authBg from "@/assets/auth-bg.svg";
import JobPilotLogo from "./JobPilotLogo";

const AuthLayout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen">
    <div className="flex flex-1 flex-col px-8 py-6 md:px-16 lg:px-20">
      <JobPilotLogo />
      <div className="flex flex-1 flex-col  max-w-md mt-8">{children}</div>
    </div>
    <div className="hidden lg:block lg:w-[45%]">
      <img
        src={authBg}
        alt="Team collaboration"
        className="h-full w-full object-cover"
      />
    </div>
  </div>
);

export default AuthLayout;
