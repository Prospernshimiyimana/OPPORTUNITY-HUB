"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopNav } from "@/components/admin/AdminTopNav";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleDark } = useDarkMode();

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.12),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_38%,_#f8fafc_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(34,197,94,0.08),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#0f172a_44%,_#020617_100%)] dark:text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/10" />
          <div className="absolute right-[-6rem] top-16 h-80 w-80 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-400/10" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-300/15 blur-3xl dark:bg-indigo-400/10" />
        </div>

        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isDark={isDark}
        />

        <div className="relative transition-all duration-300 lg:ml-72">
          <AdminTopNav
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isDark={isDark}
            toggleDark={toggleDark}
          />

          <main className="px-4 pb-8 pt-3 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
