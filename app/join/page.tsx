"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  role: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  role: "",
};

export default function JoinCommunityPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/users", {
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

      setStatus("You joined the community successfully.");
      setForm(initialState);
    } catch {
      setStatus("Unable to join the community right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-md">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Join Community
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Stay connected with new opportunities
          </h1>
          <p className="mt-3 text-gray-600">
            Add your details so we can start building the community around the
            opportunities shared on OpportunityHub.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(event) =>
                setForm((current) => ({ ...current, name: event.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
              type="text"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              required
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
              type="email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="role">
              Role
            </label>
            <input
              id="role"
              required
              value={form.role}
              onChange={(event) =>
                setForm((current) => ({ ...current, role: event.target.value }))
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-indigo-500"
              type="text"
              placeholder="Developer, Founder, Student..."
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Joining..." : "Join Community"}
            </button>

            <Link
              href="/submit"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Submit an Opportunity
            </Link>
          </div>

          {status ? <p className="text-sm text-gray-600">{status}</p> : null}
        </form>
      </section>
    </main>
  );
}
