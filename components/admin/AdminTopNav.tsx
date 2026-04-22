"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiBars3,
  HiBell,
  HiChevronDown,
  HiMagnifyingGlass,
  HiMoon,
  HiSparkles,
  HiSun,
  HiUser,
} from "react-icons/hi2";

interface AdminTopNavProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isDark: boolean;
  toggleDark: () => void;
}

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin": {
    title: "Dashboard",
    subtitle: "Monitor platform activity, content quality, and the actions your team should take next.",
  },
  "/admin/opportunities": {
    title: "Opportunities",
    subtitle: "Manage the approved listings that appear across Opportunity Hub.",
  },
  "/admin/users": {
    title: "Users",
    subtitle: "Control account roles, review status, and keep the community healthy.",
  },
  "/admin/submissions": {
    title: "Submissions",
    subtitle: "Review community-submitted opportunities and approve or reject them quickly.",
  },
  "/admin/settings": {
    title: "Settings",
    subtitle: "Adjust workspace defaults and operating preferences without leaving the admin area.",
  },
};

export function AdminTopNav({
  sidebarOpen,
  setSidebarOpen,
  isDark,
  toggleDark,
}: AdminTopNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: "3 new opportunity submissions need review", time: "4 min ago", tone: "cyan" },
    { id: 2, title: "Admin login activity is higher than baseline", time: "31 min ago", tone: "amber" },
    { id: 3, title: "Weekly digest was sent successfully", time: "2 hours ago", tone: "emerald" },
  ];

  const pageMeta = pageTitles[pathname] ?? pageTitles["/admin"];

  const toneClasses: Record<string, string> = {
    cyan: "bg-cyan-500",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
  };

  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-white/60 bg-white/72 px-4 py-4 shadow-[0_22px_60px_-30px_rgba(15,23,42,0.42)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/62 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white lg:hidden"
            >
              <HiBars3 className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                <HiSparkles className="h-4 w-4" />
                Admin Workspace
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {pageMeta.title}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
                {pageMeta.subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:min-w-[430px] lg:items-end">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
              <div className="relative flex-1 sm:max-w-sm">
                <HiMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users, alerts, reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/85 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-white/10 dark:bg-white/6 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-white/20 dark:focus:ring-white/10"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={toggleDark}
                  className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {isDark ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
                </button>

                <div ref={notificationsRef} className="relative">
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 hover:bg-slate-50 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  >
                    <HiBell className="h-5 w-5" />
                    <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500" />
                  </button>

                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-3 w-[22rem] rounded-[24px] border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/96">
                      <div className="flex items-center justify-between px-2 py-2">
                        <div>
                          <h3 className="font-semibold text-slate-950 dark:text-white">Notifications</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Priority signals from today</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-white/8 dark:text-slate-400">
                          3 new
                        </span>
                      </div>
                      <div className="mt-2 space-y-2">
                        {notifications.map((notification) => (
                          <button
                            key={notification.id}
                            className="flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-slate-50 dark:hover:bg-white/6"
                          >
                            <span className={`mt-1 h-2.5 w-2.5 rounded-full ${toneClasses[notification.tone]}`} />
                            <span className="flex-1">
                              <span className="block text-sm font-medium text-slate-900 dark:text-white">
                                {notification.title}
                              </span>
                              <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-slate-400">
                                {notification.time}
                              </span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div ref={profileRef} className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-left hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/20">
                      <HiUser className="h-5 w-5" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">Admin User</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Super Admin</p>
                    </div>
                    <HiChevronDown className="h-4 w-4 text-slate-400" />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-64 rounded-[24px] border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/96">
                      <div className="rounded-2xl bg-slate-50 p-3 dark:bg-white/6">
                        <p className="font-medium text-slate-900 dark:text-white">Admin User</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          admin@opportunityhub.com
                        </p>
                      </div>
                      <div className="mt-2 space-y-1">
                        <Link
                          href="/admin/settings"
                          className="block rounded-2xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/6"
                        >
                          Workspace settings
                        </Link>
                        <Link
                          href="/"
                          className="block rounded-2xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/6"
                        >
                          Back to site
                        </Link>
                        <button
                          onClick={async () => {
                            try {
                              const response = await fetch("/api/logout", {
                                method: "POST",
                              });

                              if (response.ok) {
                                router.replace("/login");
                                router.refresh();
                              }
                            } catch (error) {
                              console.error("Logout error:", error);
                            }
                          }}
                          className="block w-full rounded-2xl px-3 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {["Admin search", "Review queue", "Team activity"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-slate-200/80 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
