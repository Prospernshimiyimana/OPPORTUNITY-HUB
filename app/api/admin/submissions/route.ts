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

    return NextResponse.json(submissions);
  } catch (caughtError) {
    console.error("Error fetching submissions:", caughtError);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
