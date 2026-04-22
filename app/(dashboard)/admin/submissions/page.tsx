import { OpportunityStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { SubmissionManagement } from "@/components/admin/SubmissionManagement";

export default async function SubmissionsPage() {
  const submissions = await prisma.opportunity.findMany({
    where: {
      status: {
        in: [OpportunityStatus.PENDING, OpportunityStatus.REJECTED],
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <SubmissionManagement
      initialSubmissions={submissions.map((submission) => ({
        ...submission,
        deadline: submission.deadline.toISOString(),
        createdAt: submission.createdAt.toISOString(),
        updatedAt: submission.updatedAt.toISOString(),
      }))}
    />
  );
}
