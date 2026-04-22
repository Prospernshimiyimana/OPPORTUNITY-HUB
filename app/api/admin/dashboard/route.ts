import { NextRequest, NextResponse } from "next/server";
import { OpportunityStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin-api";

export async function GET(request: NextRequest) {
  const { error } = requireAdminApi(request);

  if (error) {
    return error;
  }

  try {
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
          select: {
            id: true,
            title: true,
            organization: true,
            country: true,
            views: true,
            deadline: true,
          },
        }),
      ]);

    return NextResponse.json({
      totalOpportunities,
      totalUsers,
      pendingSubmissions,
      mostViewedOpportunities,
    });
  } catch (caughtError) {
    console.error("Error fetching dashboard stats:", caughtError);
    return NextResponse.json(
      { error: "Failed to load dashboard" },
      { status: 500 }
    );
  }
}
