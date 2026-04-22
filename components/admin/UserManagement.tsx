"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/admin/Button";
import { Card } from "@/components/admin/Card";
import { Table } from "@/components/admin/Table";

type UserRecord = {
  id: number;
  name: string;
  email: string;
  role: string;
  banned: boolean;
  createdAt: string;
  updatedAt: string;
};

type UserFormState = {
  name: string;
  email: string;
  role: string;
};

const emptyForm: UserFormState = {
  name: "",
  email: "",
  role: "USER",
};

export function UserManagement({ initialUsers }: { initialUsers: UserRecord[] }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [form, setForm] = useState<UserFormState>(emptyForm);

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return users;
    }

    return users.filter((user) =>
      [user.name, user.email, user.role].join(" ").toLowerCase().includes(normalizedQuery)
    );
  }, [users, query]);

  function openCreateForm() {
    setEditingUser(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  }

  function openEditForm(user: UserRecord) {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setIsFormOpen(true);
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm("Delete this user?");

    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return;
    }

    setUsers((current) => current.filter((user) => user.id !== id));
    router.refresh();
  }

  async function handleToggleBan(user: UserRecord) {
    const response = await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        banned: !user.banned,
      }),
    });

    if (!response.ok) {
      return;
    }

    const updatedUser = (await response.json()) as UserRecord;
    setUsers((current) =>
      current.map((entry) => (entry.id === updatedUser.id ? updatedUser : entry))
    );
  }

  async function handleRoleChange(user: UserRecord, role: string) {
    const response = await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
      }),
    });

    if (!response.ok) {
      return;
    }

    const updatedUser = (await response.json()) as UserRecord;
    setUsers((current) =>
      current.map((entry) => (entry.id === updatedUser.id ? updatedUser : entry))
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    const response = await fetch(
      editingUser ? `/api/admin/users/${editingUser.id}` : "/api/admin/users",
      {
        method: editingUser ? "PATCH" : "POST",
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

    const savedUser = (await response.json()) as UserRecord;

    if (editingUser) {
      setUsers((current) =>
        current.map((user) => (user.id === savedUser.id ? savedUser : user))
      );
    } else {
      setUsers((current) => [savedUser, ...current]);
    }

    setIsFormOpen(false);
    setEditingUser(null);
    setForm(emptyForm);
    router.refresh();
  }

  const columns = [
    {
      key: "name",
      label: "User",
      render: (value: unknown, row: UserRecord) => (
        <div className="space-y-1">
          <p className="font-medium text-slate-950 dark:text-white">{String(value)}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{row.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (value: unknown, row: UserRecord) => (
        <select
          value={String(value)}
          onChange={(event) => handleRoleChange(row, event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-white/10 dark:bg-white/5"
        >
          <option value="ADMIN">ADMIN</option>
          <option value="USER">USER</option>
        </select>
      ),
    },
    {
      key: "banned",
      label: "Status",
      render: (value: unknown) => {
        const banned = Boolean(value);
        return (
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
              banned
                ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300"
                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
            }`}
          >
            {banned ? "Banned" : "Active"}
          </span>
        );
      },
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value: unknown) => new Date(String(value)).toLocaleDateString(),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_value: unknown, row: UserRecord) => (
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => openEditForm(row)}>
            Edit
          </Button>
          <Button
            variant={row.banned ? "secondary" : "ghost"}
            size="sm"
            onClick={() => handleToggleBan(row)}
          >
            {row.banned ? "Unban" : "Ban"}
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
          <p className="text-sm text-slate-500 dark:text-slate-400">Total users</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{users.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Admins</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
            {users.filter((user) => user.role === "ADMIN").length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Banned users</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
            {users.filter((user) => user.banned).length}
          </p>
        </Card>
      </div>

      <Card
        title="User management"
        subtitle="Update roles, prevent abuse, and remove accounts when necessary."
      >
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, email, or role..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 md:max-w-md dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
          />
          <Button onClick={openCreateForm}>Add user</Button>
        </div>

        <Table data={filteredUsers} columns={columns} empty={filteredUsers.length === 0} />
      </Card>

      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-2xl" padding="lg">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">
                    {editingUser ? "Edit user" : "Add user"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Adjust identity and access without leaving the dashboard.
                  </p>
                </div>
                <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)}>
                  Close
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-white/10 dark:bg-white/5"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-white/10 dark:bg-white/5"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <span>Role</span>
                <select
                  value={form.role}
                  onChange={(event) => setForm({ ...form, role: event.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-white/10 dark:bg-white/5"
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
              </label>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" loading={isSaving}>
                  {editingUser ? "Save changes" : "Create user"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
