import { NextRequest, NextResponse } from "next/server";
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
    const opportunityId = Number(id);
    const body = await request.json();
    const {
      title,
      type,
      country,
      description,
      organization,
      deadline,
      link,
      views,
    } = body as {
      title?: string;
      type?: string;
      country?: string;
      description?: string;
      organization?: string;
      deadline?: string;
      link?: string;
      views?: number;
    };

    const opportunity = await prisma.opportunity.update({
      where: { id: opportunityId },
      data: {
        title,
        type,
        country,
        description,
        organization,
        deadline: deadline ? new Date(deadline) : undefined,
        link,
        views,
      },
    });

    return NextResponse.json(opportunity);
  } catch (caughtError) {
    console.error("Error updating opportunity:", caughtError);
    return NextResponse.json(
      { error: "Failed to update opportunity" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = requireAdminApi(request);

  if (error) {
    return error;
  }

  try {
    const { id } = await params;
    await prisma.opportunity.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ success: true });
  } catch (caughtError) {
    console.error("Error deleting opportunity:", caughtError);
    return NextResponse.json(
      { error: "Failed to delete opportunity" },
      { status: 500 }
    );
  }
}
