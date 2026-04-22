"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChartBar, HiBriefcase, HiUsers } from "react-icons/hi";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: HiChartBar },
    { name: "Opportunities", href: "/admin/opportunities", icon: HiBriefcase },
    { name: "Users", href: "/admin/users", icon: HiUsers },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      
      <nav className="mt-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
