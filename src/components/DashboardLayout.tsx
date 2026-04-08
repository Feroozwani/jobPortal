import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Settings,
  LogOut,
  User,
  PlusCircle,
  Bookmark,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Employers profile", icon: User, href: "/dashboard/profile" },
  { label: "Post a Job", icon: PlusCircle, href: "/dashboard/post-job" },
  { label: "My Jobs", icon: Briefcase, href: "/dashboard/my-jobs" },
  {
    label: "Saved Candidate",
    icon: Bookmark,
    href: "/dashboard/saved-candidates",
  },
  {
    label: "Plans & Billing",
    icon: CreditCard,
    href: "/dashboard/plans-billing",
  },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isOverview = location.pathname === "/dashboard";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar collapsible="offcanvas" className="border-r border-border">
          {!isOverview && (
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
              <img
                src="/src/assets/jobpilot.svg"
                alt="JobPilot Logo"
                className="w-7 h-7 flex-shrink-0"
              />
              <span className="font-bold text-lg tracking-tight text-foreground">
                JobPilot
              </span>
            </div>
          )}

          <div className="px-5 pt-4 pb-2">
            <SidebarGroupLabel className="text-[10px] font-semibold tracking-widest text-muted-foreground px-0 uppercase">
              EMPLOYERS DASHBOARD
            </SidebarGroupLabel>
          </div>

          <SidebarContent className="px-2 flex-1">
            <SidebarGroup className="p-0">
              <SidebarMenu className="gap-0.5">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`h-10 text-sm font-medium rounded-md px-3 transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-600 border-l-[3px] border-blue-600 rounded-l-none pl-[calc(0.75rem-3px)]"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Link
                          to={item.href}
                          className="flex items-center gap-3"
                        >
                          <item.icon size={18} className="flex-shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="px-2 pb-0 border-t-0">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/login")}
                  className="h-10 text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/5 px-3"
                >
                  <LogOut size={18} className="flex-shrink-0" />
                  <span>Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            {isOverview && (
              <div className="flex items-center gap-2 px-3 py-4 mt-1">
                <img
                  src="/src/assets/jobpilot.svg"
                  alt="JobPilot Logo"
                  className="w-7 h-7 flex-shrink-0"
                />
                <span className="font-bold text-lg tracking-tight text-foreground">
                  JobPilot
                </span>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col flex-1 min-w-0">
          {isOverview && (
            <>
              <div className="md:hidden h-14 border-b border-border bg-background px-4 flex items-center sticky top-0 z-50">
                <SidebarTrigger />
              </div>

              <main className="flex-1 p-6 lg:p-8 overflow-auto pb-20">
                {children}
              </main>

              <div className="h-16 border-t border-border bg-background px-6 flex items-center justify-end sticky bottom-0 z-50">
                <div className="flex items-center gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full px-6 h-9 text-sm font-medium border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Link to="/dashboard/post-job">Post a Job</Link>
                  </Button>
                  <div className="w-9 h-9 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-pink-300 transition-all">
                    <User size={18} className="text-white" />
                  </div>
                </div>
              </div>
            </>
          )}

          {!isOverview && (
            <>
              <header className="h-16 border-b border-border bg-background px-6 flex items-center justify-between sticky top-0 z-50">
                <SidebarTrigger className="md:hidden" />

                <div className="flex items-center gap-4 ml-auto">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full px-6 h-9 text-sm font-medium border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Link to="/dashboard/post-job">Post a Job</Link>
                  </Button>
                  <div className="w-9 h-9 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-pink-300 transition-all">
                    <User size={18} className="text-white" />
                  </div>
                </div>
              </header>

              <main className="flex-1 p-6 lg:p-8 overflow-auto">
                {children}
              </main>
            </>
          )}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
