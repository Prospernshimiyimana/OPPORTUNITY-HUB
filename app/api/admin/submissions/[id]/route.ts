import { NextRequest, NextResponse } from "next/server";
import { OpportunityStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin-api";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = requireAdminApi(request);

  if (error) {
    return error;
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { action } = body as { action?: "approve" | "reject" };

    if (!action) {
      return NextResponse.json(
        { error: "Action is required." },
        { status: 400 }
      );
    }

    const submission = await prisma.opportunity.update({
      where: {
        id: Number(id),
      },
      data: {
        status:
          action === "approve"
            ? OpportunityStatus.APPROVED
            : OpportunityStatus.REJECTED,
      },
    });

    return NextResponse.json(submission);
  } catch (caughtError) {
    console.error("Error updating submission:", caughtError);
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }
}
