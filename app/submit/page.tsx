"use client";

import { FormEvent, useState } from "react";

type FormState = {
  title: string;
  type: string;
  country: string;
  description: string;
  organization: string;
  deadline: string;
  link: string;
  submittedByName: string;
  submittedByEmail: string;
};

const initialState: FormState = {
  title: "",
  type: "",
  country: "",
  description: "",
  organization: "",
  deadline: "",
  link: "",
  submittedByName: "",
  submittedByEmail: "",
};

export default function SubmitOpportunityPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/opportunities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("Opportunity submitted successfully and is now awaiting admin review.");
      setForm(initialState);
    } catch {
      setStatus("Unable to submit opportunity right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-md">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Submit Opportunity
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Share a new opportunity with the community
          </h1>
          <p className="mt-3 text-gray-600">
            Add jobs, grants, fellowships, or other helpful opportunities in a
            few quick steps.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              required
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
              type="text"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="type">
                Type
              </label>
              <input
                id="type"
                required
                value={form.type}
                onChange={(event) =>
                  setForm((current) => ({ ...current, type: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
                placeholder="Job, Grant, Fellowship..."
                type="text"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="country">
                Country
              </label>
              <input
                id="country"
                required
                value={form.country}
                onChange={(event) =>
                  setForm((current) => ({ ...current, country: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
                placeholder="Rwanda"
                type="text"
              />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              required
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              className="min-h-32 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-700"
              htmlFor="organization"
            >
              Organization
            </label>
            <input
              id="organization"
              required
              value={form.organization}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  organization: event.target.value,
                }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
              type="text"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="deadline"
              >
                Deadline
              </label>
              <input
                id="deadline"
                required
                value={form.deadline}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    deadline: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
                type="date"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="link">
                Link
              </label>
              <input
                id="link"
                required
                value={form.link}
                onChange={(event) =>
                  setForm((current) => ({ ...current, link: event.target.value }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
                type="url"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="submittedByName"
              >
                Your Name
              </label>
              <input
                id="submittedByName"
                value={form.submittedByName}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    submittedByName: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
                type="text"
              />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-700"
                htmlFor="submittedByEmail"
              >
                Your Email
              </label>
              <input
                id="submittedByEmail"
                value={form.submittedByEmail}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    submittedByEmail: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
                type="email"
              />
            </div>
          </div>

          <button
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Submitting..." : "Submit Opportunity"}
          </button>

          {status ? <p className="text-sm text-gray-600">{status}</p> : null}
        </form>
      </section>
    </main>
  );
}
