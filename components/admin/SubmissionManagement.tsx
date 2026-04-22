"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/admin/Button";
import { Card } from "@/components/admin/Card";
import { Table } from "@/components/admin/Table";

type SubmissionRecord = {
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

export function SubmissionManagement({
  initialSubmissions,
}: {
  initialSubmissions: SubmissionRecord[];
}) {
  const router = useRouter();
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "REJECTED">("ALL");

  const filteredSubmissions = useMemo(() => {
    if (filter === "ALL") {
      return submissions;
    }

    return submissions.filter((submission) => submission.status === filter);
  }, [filter, submissions]);

  async function handleAction(id: number, action: "approve" | "reject") {
    const response = await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    });

    if (!response.ok) {
      return;
    }

    const updatedSubmission = (await response.json()) as SubmissionRecord;

    setSubmissions((current) => {
      if (updatedSubmission.status === "APPROVED") {
        return current.filter((submission) => submission.id !== updatedSubmission.id);
      }

      return current.map((submission) =>
        submission.id === updatedSubmission.id ? updatedSubmission : submission
      );
    });

    router.refresh();
  }

  const columns = [
    {
      key: "title",
      label: "Submission",
      render: (value: unknown, row: SubmissionRecord) => (
        <div className="space-y-1">
          <p className="font-medium text-slate-950 dark:text-white">{String(value)}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {row.submittedByName ?? "Anonymous"} · {row.submittedByEmail ?? "No email"}
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
      render: (value: unknown) => new Date(String(value)).toLocaleDateString(),
    },
    {
      key: "status",
      label: "Status",
      render: (value: unknown) => (
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-white/8 dark:text-slate-300">
          {String(value)}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_value: unknown, row: SubmissionRecord) => (
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => handleAction(row.id, "approve")}>
            Approve
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleAction(row.id, "reject")}>
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Pending submissions</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
            {submissions.filter((submission) => submission.status === "PENDING").length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Rejected recently</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
            {submissions.filter((submission) => submission.status === "REJECTED").length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Approval queue health</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
            {submissions.length <= 5 ? "Stable" : "Busy"}
          </p>
        </Card>
      </div>

      <Card
        title="Review submissions"
        subtitle="Approve strong submissions quickly and reject weak ones with confidence."
      >
        <div className="mb-5 flex flex-wrap gap-2">
          {(["ALL", "PENDING", "REJECTED"] as const).map((option) => (
            <Button
              key={option}
              variant={filter === option ? "primary" : "secondary"}
              size="sm"
              onClick={() => setFilter(option)}
            >
              {option}
            </Button>
          ))}
        </div>

        <Table data={filteredSubmissions} columns={columns} empty={filteredSubmissions.length === 0} />
      </Card>
    </div>
  );
}
