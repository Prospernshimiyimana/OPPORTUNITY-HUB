"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiBriefcase,
  HiCog6Tooth,
  HiHome,
  HiInboxStack,
  HiShieldCheck,
  HiUsers,
  HiXMark,
} from "react-icons/hi2";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isDark: boolean;
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: HiHome, badge: "Live" },
  { name: "Opportunities", href: "/admin/opportunities", icon: HiBriefcase },
  { name: "Users", href: "/admin/users", icon: HiUsers, badge: "People" },
  { name: "Submissions", href: "/admin/submissions", icon: HiInboxStack, badge: "Queue" },
  { name: "Settings", href: "/admin/settings", icon: HiCog6Tooth },
];

export function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
  isDark,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full p-4">
          <div className="flex h-full flex-col rounded-[30px] border border-white/50 bg-white/80 p-4 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.4)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
            <div className="flex items-center justify-between px-2 pb-5 pt-2">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                  <HiShieldCheck className="h-4 w-4" />
                  Admin Space
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  OpportunityHub
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Monitor growth, content, and member trust from one place.
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-2xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/8 dark:hover:text-white lg:hidden"
              >
                <HiXMark className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6 rounded-[24px] border border-slate-200/70 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-4 text-white shadow-lg dark:border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">
                    System Health
                  </p>
                  <p className="mt-2 text-3xl font-semibold">98.4%</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-2 text-sm font-medium text-cyan-100">
                  Stable
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-200/80">
                Auth, opportunities, and notifications are all operating normally.
              </p>
            </div>

            <nav className="flex-1 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all ${
                      isActive
                        ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10 dark:bg-white dark:text-slate-950"
                        : "text-slate-600 hover:bg-slate-100/90 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/8 dark:hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`rounded-xl p-2 ${
                          isActive
                            ? "bg-white/12 dark:bg-slate-100"
                            : "bg-slate-100 text-slate-600 group-hover:bg-white dark:bg-white/8 dark:text-slate-300 dark:group-hover:bg-white/12"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </span>
                    {item.badge && (
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                          isActive
                            ? "bg-white/12 text-white dark:bg-slate-200 dark:text-slate-900"
                            : "bg-slate-200/80 text-slate-500 dark:bg-white/8 dark:text-slate-400"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 rounded-[24px] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
                  AU
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">Admin User</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    admin@opportunityhub.com
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-3 py-2 text-sm text-slate-600 dark:bg-slate-950/70 dark:text-slate-300">
                <span>{isDark ? "Dark mode active" : "Light mode active"}</span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
