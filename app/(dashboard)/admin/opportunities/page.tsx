import { OpportunityStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { OpportunityManagement } from "@/components/admin/OpportunityManagement";

export default async function OpportunitiesPage() {
  const opportunities = await prisma.opportunity.findMany({
    where: {
      status: OpportunityStatus.APPROVED,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <OpportunityManagement
      initialOpportunities={opportunities.map((opportunity) => ({
        ...opportunity,
        deadline: opportunity.deadline.toISOString(),
        createdAt: opportunity.createdAt.toISOString(),
        updatedAt: opportunity.updatedAt.toISOString(),
      }))}
    />
  );
}
