"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  HiArrowRight,
  HiBriefcase,
  HiBuildingOffice,
  HiClock,
  HiMapPin,
  HiSparkles,
} from "react-icons/hi2";
import { PublicOpportunity } from "@/lib/public-opportunities";

export default function RecentOpportunities() {
  const [isInView, setIsInView] = useState(false);
  const [opportunities, setOpportunities] = useState<PublicOpportunity[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("recent-opportunities");
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsInView(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    async function loadOpportunities() {
      try {
        const response = await fetch("/api/opportunities", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as Array<{
          id: number;
          title: string;
          organization: string;
          country: string;
          type: string;
          deadline: string;
          createdAt: string;
        }>;

        setOpportunities(
          data.slice(0, 6).map((item) => ({
            id: item.id,
            title: item.title,
            organization: item.organization,
            location: item.country,
            type: item.type,
            deadline: item.deadline,
            posted: item.createdAt,
            description: "",
            category: "Opportunity",
            requirements: [],
            link: "",
            views: 0,
          }))
        );
      } catch (error) {
        console.error("Failed to load opportunities:", error);
      }
    }

    handleScroll();
    loadOpportunities();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fullTimeCount = useMemo(
    () => opportunities.filter((opportunity) => opportunity.type.toLowerCase().includes("full")).length,
    [opportunities]
  );
  const remoteCount = useMemo(
    () => opportunities.filter((opportunity) => opportunity.location.toLowerCase().includes("remote")).length,
    [opportunities]
  );

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "part-time":
        return "bg-green-100 text-green-700 border-green-200";
      case "internship":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "contract":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTimeUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays <= 7) return `${diffDays} days`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks`;
    return `${Math.ceil(diffDays / 30)} months`;
  };

  return (
    <section
      id="recent-opportunities"
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 py-24"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-30 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-100 to-cyan-100 opacity-30 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
            <HiSparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Latest Opportunities</span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Fresh Opportunities
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Waiting for You
            </span>
          </h2>

          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
            Discover the latest approved opportunities directly from your database.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
              <HiBriefcase className="mr-1 inline h-4 w-4 text-blue-600" />
              {fullTimeCount} Full-time
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
              <HiBuildingOffice className="mr-1 inline h-4 w-4 text-green-600" />
              {remoteCount} Remote
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
              <HiClock className="mr-1 inline h-4 w-4 text-purple-600" />
              Live from database
            </span>
          </div>
        </div>

        <div className="mb-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {opportunities.map((opportunity, index) => (
            <div
              key={opportunity.id}
              className={`group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600">
                  <HiBuildingOffice className="h-6 w-6 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                    {opportunity.title}
                  </h3>
                  <p className="font-medium text-gray-600">{opportunity.organization}</p>
                </div>

                <div className={`rounded-full border px-3 py-1 text-xs font-semibold ${getTypeColor(opportunity.type)}`}>
                  {opportunity.type}
                </div>
              </div>

              <div className="mb-4 space-y-2">
                {opportunity.location && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <HiMapPin className="h-4 w-4" />
                    {opportunity.location}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <HiClock className="h-4 w-4" />
                  <span
                    className={`font-medium ${
                      getTimeUntilDeadline(opportunity.deadline) === "Expired"
                        ? "text-red-600"
                        : "text-orange-600"
                    }`}
                  >
                    {getTimeUntilDeadline(opportunity.deadline)} left
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <Link
                  href={`/jobs/${opportunity.id}`}
                  className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  View Details
                  <HiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/jobs"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            View All Opportunities
            <HiArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <p className="mt-4 text-gray-600">
            Newly approved opportunities will appear here automatically.
          </p>
        </div>
      </div>
    </section>
  );
}
