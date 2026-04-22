import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicOpportunityById } from "@/lib/public-opportunities";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JobDetails(props: PageProps<"/jobs/[id]">) {
  const { id } = await props.params;
  const job = await getPublicOpportunityById(Number(id));

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <Link href="/jobs" className="text-sm font-semibold text-indigo-600 hover:underline">
          ← Back to Opportunities
        </Link>

        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700">
            {job.category}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
            {job.type}
          </span>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
            {job.organization}
          </span>
        </div>

        <h1 className="mb-4 mt-6 text-4xl font-bold text-gray-900">
          {job.title}
        </h1>

        <p className="mb-2 text-gray-600">{job.location}</p>

        <p className="mb-8 text-gray-500">
          Posted on {new Date(job.posted).toLocaleDateString()}
        </p>

        <p className="mb-10 leading-7 text-gray-700">{job.description}</p>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Opportunity Highlights
          </h2>
          <ul className="mt-4 space-y-3 text-gray-600">
            {job.requirements.map((requirement) => (
              <li key={requirement} className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-600" />
                <span>{requirement}</span>
              </li>
            ))}
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-600" />
              <span>Apply before {new Date(job.deadline).toLocaleDateString()}.</span>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={job.link}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
            target="_blank"
            rel="noreferrer"
          >
            Visit Opportunity
          </Link>
          <Link
            href="/submit"
            className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-white"
          >
            Submit Opportunity
          </Link>
        </div>
      </section>
    </main>
  );
}
