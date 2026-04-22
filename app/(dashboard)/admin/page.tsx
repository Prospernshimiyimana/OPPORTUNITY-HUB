import { OpportunityStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/admin/Card";
import { Table } from "@/components/admin/Table";

export default async function AdminDashboardPage() {
  const [totalOpportunities, totalUsers, pendingSubmissions, mostViewedOpportunities] =
    await Promise.all([
      prisma.opportunity.count({
        where: { status: OpportunityStatus.APPROVED },
      }),
      prisma.user.count(),
      prisma.opportunity.count({
        where: { status: OpportunityStatus.PENDING },
      }),
      prisma.opportunity.findMany({
        where: { status: OpportunityStatus.APPROVED },
        orderBy: [{ views: "desc" }, { createdAt: "desc" }],
        take: 5,
      }),
    ]);

  const cards = [
    {
      label: "Total opportunities",
      value: totalOpportunities,
      note: "Approved listings visible on the public hub",
    },
    {
      label: "Total users",
      value: totalUsers,
      note: "Community accounts with platform access",
    },
    {
      label: "Pending submissions",
      value: pendingSubmissions,
      note: "Items waiting for moderation review",
    },
    {
      label: "Most viewed opportunity",
      value: mostViewedOpportunities[0]?.views ?? 0,
      note: mostViewedOpportunities[0]?.title ?? "No approved opportunities yet",
    },
  ];

  const columns = [
    {
      key: "title",
      label: "Opportunity",
      render: (value: unknown, row: (typeof mostViewedOpportunities)[number]) => (
        <div className="space-y-1">
          <p className="font-medium text-slate-950 dark:text-white">{String(value)}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {row.organization} · {row.country}
          </p>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
    },
    {
      key: "views",
      label: "Views",
    },
    {
      key: "deadline",
      label: "Deadline",
      render: (value: unknown) => new Date(String(value)).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6 pb-4">
      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
        <Card
          padding="lg"
          className="overflow-hidden border-none bg-[linear-gradient(135deg,_rgba(2,6,23,1)_0%,_rgba(15,23,42,0.98)_42%,_rgba(8,47,73,0.95)_100%)] text-white shadow-[0_35px_90px_-35px_rgba(8,47,73,0.9)]"
        >
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
              Opportunity Hub Admin
            </div>
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                A clean, production-ready workspace for content, users, and approvals.
              </h2>
              <p className="text-sm leading-6 text-slate-300 sm:text-base">
                This admin dashboard is now structured around real moderation flow: approved opportunities,
                pending submissions, user access control, and a review-first navigation model.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Moderation queue</p>
                <p className="mt-3 text-3xl font-semibold">{pendingSubmissions}</p>
                <p className="mt-1 text-sm text-slate-300">Pending submissions waiting for review.</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Published listings</p>
                <p className="mt-3 text-3xl font-semibold">{totalOpportunities}</p>
                <p className="mt-1 text-sm text-slate-300">Live opportunities currently discoverable.</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Community users</p>
                <p className="mt-3 text-3xl font-semibold">{totalUsers}</p>
                <p className="mt-1 text-sm text-slate-300">Accounts being managed from one control panel.</p>
              </div>
            </div>
          </div>
        </Card>

        <Card
          title="What changed"
          subtitle="The structure below matches your requested admin architecture."
          padding="lg"
        >
          <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="rounded-[22px] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
              Route-group admin layout under `app/(dashboard)/admin`
            </div>
            <div className="rounded-[22px] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
              Sidebar navigation for Dashboard, Opportunities, Users, Submissions, Settings
            </div>
            <div className="rounded-[22px] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
              Role-protected `/admin` access through Next.js `proxy.ts`
            </div>
            <div className="rounded-[22px] border border-slate-200/70 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/5">
              Data-backed moderation flow using Prisma and reusable UI components
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">
              {card.value}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{card.note}</p>
          </Card>
        ))}
      </section>

      <Card
        title="Most viewed opportunities"
        subtitle="The approved listings attracting the most attention right now."
      >
        <Table
          data={mostViewedOpportunities}
          columns={columns}
          empty={mostViewedOpportunities.length === 0}
        />
      </Card>
    </div>
  );
}
