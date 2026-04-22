"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PublicOpportunity } from "@/lib/public-opportunities";

export function JobsClient({ jobs }: { jobs: PublicOpportunity[] }) {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const locations = useMemo(
    () => ["All", ...new Set(jobs.map((job) => job.location))],
    [jobs]
  );
  const jobTypes = useMemo(
    () => ["All", ...new Set(jobs.map((job) => job.type))],
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.organization.toLowerCase().includes(search.toLowerCase()) ||
        job.category.toLowerCase().includes(search.toLowerCase());
      const matchesLocation =
        selectedLocation === "All" || job.location === selectedLocation;
      const matchesType = selectedType === "All" || job.type === selectedType;

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, search, selectedLocation, selectedType]);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Opportunities
            </p>
            <h1 className="mt-3 text-4xl font-bold text-gray-900">
              Find your next opportunity with confidence
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Browse approved opportunities from the database in real time. Filter
              by country or opportunity type to find the best fit faster.
            </p>
          </div>

          <div className="mt-10 grid gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-5 md:grid-cols-[2fr_1fr_1fr]">
            <input
              type="text"
              placeholder="Search by title, organization, or category"
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
              value={selectedLocation}
              onChange={(event) => setSelectedLocation(event.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <select
              className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
            >
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="rounded-full bg-indigo-50 px-4 py-2 text-indigo-700">
              {filteredJobs.length} opportunity{filteredJobs.length === 1 ? "" : "ies"} found
            </span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
              Live data from Prisma
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          {filteredJobs.map((job) => (
            <Link key={job.id} href={`/jobs/${job.id}`}>
              <div className="cursor-pointer rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700">
                    {job.category}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                    {job.type}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>

                <p className="mt-2 text-base font-medium text-gray-700">
                  {job.organization}
                </p>

                <p className="mt-1 text-sm text-gray-500">{job.location}</p>

                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {job.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.requirements.slice(0, 3).map((requirement) => (
                    <span
                      key={requirement}
                      className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
                    >
                      {requirement}
                    </span>
                  ))}
                </div>

                <p className="mt-6 text-sm font-semibold text-indigo-600">
                  View details →
                </p>
              </div>
            </Link>
          ))}
        </div>
        {filteredJobs.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No opportunities match your filters
            </h2>
            <p className="mt-2 text-gray-600">
              Try a different search term or reset the country and type filters.
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
