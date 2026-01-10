"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import logoDark from "@/public/Routewise_dark.png";
import logoLight from "@/public/Routewise_light.png";
import { AlertTriangle, Ambulance, BarChart3, Bed, BookOpen, Building2, Calendar, Calendar1, CalendarOff, CheckCircle2, Droplet, FileText, Fuel, Grid, HelpCircle, LayoutDashboard, Mail, MessageCircle, MessageSquare, Package, Pill, Receipt, Route, Settings, ShieldCheck, Star, UserCog, UserRound, Users, Wallet, Wrench, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  submenu?: { title: string; href: string }[];
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const isMobile = useMobile();
  const { resolvedTheme } = useTheme();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Use light logo for dark mode, dark logo for light mode
  const currentLogo = resolvedTheme === "light" ? logoLight : logoDark;

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/admin-dashboard",
      icon: LayoutDashboard,

    },
    {
      title: "Tasks",
      href: "/admin-dashboard/tasks",
      icon: CheckCircle2,
    },
    {
      title: "Employee",
      href: "/admin-dashboard/staff",
      icon: UserCog,

    },
    {
      title: "Schedule",
      href: "/admin-dashboard/schedule/calendar",
      icon: Calendar,
      submenu: [
        { title: "List View", href: "/admin-dashboard/schedule" },

        { title: "Calendar View", href: "/admin-dashboard/schedule/calendar" },

      ],
    },
    {
      title: "PTO Tracker",
      href: "/admin-dashboard/pto",
      icon: CalendarOff,
    },
    {
      title: "Fuel Tracker",
      href: "/admin-dashboard/fuel-tracker",
      icon: Fuel,
    },
    {
      title: "Maintenance",
      href: "/admin-dashboard/maintenance",
      icon: Wrench,
    },

    {
      title: "Payroll",
      href: "/admin-dashboard/payroll",
      icon: Receipt,
    },
    {
      title: "Expenses",
      href: "/admin-dashboard/expenses",
      icon: Wallet,
    },
    {
      title: "Routes",
      href: "/admin-dashboard/routes",
      icon: Route,
    },
    {
      title: "Accidents",
      href: "/admin-dashboard/accidents",
      icon: AlertTriangle,
    },
    {
      title: "Handbook",
      href: "/admin-dashboard/handbook",
      icon: BookOpen,
    },
    {
      title: "Chat",
      href: "/chat",
      icon: MessageCircle,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      submenu: [
        { title: "General Settings", href: "/settings" },
        { title: "Notifications", href: "/settings/notifications" },
        { title: "Working Hours", href: "/settings/hours" },
        { title: "Integrations", href: "/settings/integrations" },
      ],
    },

  ];

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };

  const sidebarClasses = cn("!fixed h-full left-0 bottom-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out", {
    "translate-x-0": isOpen,
    "-translate-x-full": !isOpen,
    "translate-x-0 ": isOpen,
  });
  useEffect(() => {
    const foundItem = sidebarItems.find((item) => {
      if (item.submenu) {
        return item.submenu.some((subItem) => pathname === subItem.href);
      }
      return pathname === item.href;
    });
    if (foundItem?.submenu) {
      setOpenSubmenu(foundItem.title);
    }
  }, []);
  return (
    <aside className={sidebarClasses}>
      <div className="flex py-3 xl:py-3.5 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={currentLogo} alt="RouteWise" width={50} height={50} />
          <span className="font-bold inline-block">RouteWise</span>
        </Link>
        <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setIsOpen(false)}>
          <X className="size-6" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>

      <div className="flex-1 py-2  border-t h-full overflow-y-auto">
        <nav className="space-y-1 px-2 ">
          {sidebarItems.map((item) => (
            <div key={item.title} className="space-y-1 custom-scrollbar">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      item.href !== "/" && pathname.startsWith(item.href) ? "bg-primary/10 text-primary" : " hover:bg-muted hover:text-foreground",
                      pathname == "/" && item.href == "/" ? "bg-primary/10 text-primary" : " hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn("h-4 w-4 transition-transform", {
                        "rotate-180": openSubmenu === item.title,
                      })}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <AnimateHeight height={openSubmenu === item.title ? "auto" : 0}>
                    <div className="ml-4 space-y-1 pl-2 pt-1">
                      {item.submenu.map((subItem) => (
                        <Link key={subItem.title} href={subItem.href} className={cn("flex items-center rounded-md px-3 py-2 text-sm transition-colors", pathname === subItem.href ? "bg-primary/10 text-primary" : " hover:bg-muted hover:text-foreground")} onClick={() => isMobile && setIsOpen(false)}>
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </AnimateHeight>
                </>
              ) : (
                <Link href={item.href} className={cn("flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors", pathname === item.href ? "bg-primary/10 text-primary" : " hover:bg-muted hover:text-foreground")} onClick={() => isMobile && setIsOpen(false)}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t p-4 shrink-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
            <AvatarFallback>RW</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-muted-foreground">Route Wise</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
