"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/admin/Button";
import { Card } from "@/components/admin/Card";
import { Table } from "@/components/admin/Table";

type OpportunityRecord = {
  id: number;
  title: string;
  type: string;
  country: string;
  organization: string;
  description: string;
  deadline: string;
  link: string;
  views: number;
  status: string;
  submittedByName: string | null;
  submittedByEmail: string | null;
  createdAt: string;
  updatedAt: string;
};

type OpportunityFormState = {
  title: string;
  type: string;
  country: string;
  organization: string;
  deadline: string;
  link: string;
  description: string;
};

const emptyForm: OpportunityFormState = {
  title: "",
  type: "",
  country: "",
  organization: "",
  deadline: "",
  link: "",
  description: "",
};

function toFormState(opportunity: OpportunityRecord): OpportunityFormState {
  return {
    title: opportunity.title,
    type: opportunity.type,
    country: opportunity.country,
    organization: opportunity.organization,
    deadline: opportunity.deadline.slice(0, 10),
    link: opportunity.link,
    description: opportunity.description,
  };
}

export function OpportunityManagement({
  initialOpportunities,
}: {
  initialOpportunities: OpportunityRecord[];
}) {
  const router = useRouter();
  const [opportunities, setOpportunities] = useState(initialOpportunities);
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<OpportunityFormState>(emptyForm);

  const filteredOpportunities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return opportunities;
    }

    return opportunities.filter((opportunity) =>
      [opportunity.title, opportunity.type, opportunity.country, opportunity.organization]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [opportunities, query]);

  async function handleDelete(id: number) {
    const confirmed = window.confirm("Delete this opportunity?");

    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/admin/opportunities/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return;
    }

    setOpportunities((current) => current.filter((opportunity) => opportunity.id !== id));
    router.refresh();
  }

  function handleCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  }

  function handleEdit(opportunity: OpportunityRecord) {
    setEditingId(opportunity.id);
    setForm(toFormState(opportunity));
    setIsFormOpen(true);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    const response = await fetch(
      editingId ? `/api/admin/opportunities/${editingId}` : "/api/admin/opportunities",
      {
        method: editingId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    setIsSaving(false);

    if (!response.ok) {
      return;
    }

    const savedOpportunity = (await response.json()) as OpportunityRecord;

    if (editingId) {
      setOpportunities((current) =>
        current.map((opportunity) =>
          opportunity.id === savedOpportunity.id ? savedOpportunity : opportunity
        )
      );
    } else {
      setOpportunities((current) => [savedOpportunity, ...current]);
    }

    setIsFormOpen(false);
    setForm(emptyForm);
    setEditingId(null);
    router.refresh();
  }

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (value: unknown, row: OpportunityRecord) => (
        <div className="space-y-1">
          <p className="font-medium text-slate-950 dark:text-white">{String(value)}</p>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            {row.organization}
          </p>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
    },
    {
      key: "country",
      label: "Country",
    },
    {
      key: "deadline",
      label: "Deadline",
      render: (value: unknown) => (
        <span>{new Date(String(value)).toLocaleDateString()}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_value: unknown, row: OpportunityRecord) => (
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => handleEdit(row)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Approved opportunities</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
            {opportunities.length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Countries covered</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
            {new Set(opportunities.map((opportunity) => opportunity.country)).size}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Average views</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
            {opportunities.length
              ? Math.round(
                  opportunities.reduce((sum, opportunity) => sum + opportunity.views, 0) /
                    opportunities.length
                )
              : 0}
          </p>
        </Card>
      </div>

      <Card
        title="Manage opportunities"
        subtitle="Create, update, and remove the listings that appear on the public hub."
      >
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, type, country..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 md:max-w-md dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
          />
          <Button onClick={handleCreate}>Add opportunity</Button>
        </div>

        <Table data={filteredOpportunities} columns={columns} empty={filteredOpportunities.length === 0} />
      </Card>

      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-3xl" padding="lg">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                    {editingId ? "Edit opportunity" : "Add opportunity"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Keep public listings clear, trustworthy, and complete.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsFormOpen(false)}
                >
                  Close
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>Title</span>
                  <input
                    required
                    value={form.title}
                    onChange={(event) => setForm({ ...form, title: event.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-white/10 dark:bg-white/5"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>Organization</span>
                  <input
                    required
                    value={form.organization}
                    onChange={(event) => setForm({ ...form, organization: event.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-white/10 dark:bg-white/5"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>Type</span>
                  <input
                    required
                    value={form.type}
                    onChange={(event) => setForm({ ...form, type: event.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-white/10 dark:bg-white/5"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>Country</span>
                  <input
                    required
                    value={form.country}
                    onChange={(event) => setForm({ ...form, country: event.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-white/10 dark:bg-white/5"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>Deadline</span>
                  <input
                    required
                    type="date"
                    value={form.deadline}
                    onChange={(event) => setForm({ ...form, deadline: event.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-white/10 dark:bg-white/5"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>Link</span>
                  <input
                    required
                    type="url"
                    value={form.link}
                    onChange={(event) => setForm({ ...form, link: event.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-white/10 dark:bg-white/5"
                  />
                </label>
              </div>

              <label className="block space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <span>Description</span>
                <textarea
                  required
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-white/10 dark:bg-white/5"
                />
              </label>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" loading={isSaving}>
                  {editingId ? "Save changes" : "Create opportunity"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
