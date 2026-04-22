import { Card } from "@/components/admin/Card";

const settingsGroups = [
  {
    title: "Moderation defaults",
    items: [
      "Require review for every public submission",
      "Keep rejected submissions visible to admins only",
      "Track views on approved opportunities for ranking",
    ],
  },
  {
    title: "Access policy",
    items: [
      "Only admins can reach `/admin` routes",
      "User roles can be switched between ADMIN and USER",
      "Banned users remain stored but can be reactivated later",
    ],
  },
  {
    title: "UI system",
    items: [
      "Reusable cards, tables, and buttons power every admin screen",
      "Responsive shell supports desktop and mobile navigation",
      "Search and profile controls stay consistent across pages",
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card
        title="Admin settings"
        subtitle="A lightweight operations summary for the current dashboard structure."
        padding="lg"
      >
        <p className="max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          This page is intentionally focused on platform configuration notes for now. The more
          operational settings, like role control and submission policy, are already exposed through
          the protected admin APIs and management screens.
        </p>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {settingsGroups.map((group) => (
          <Card key={group.title} title={group.title}>
            <div className="space-y-3">
              {group.items.map((item) => (
                <div
                  key={item}
                  className="rounded-[20px] border border-slate-200/70 bg-slate-50/90 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
