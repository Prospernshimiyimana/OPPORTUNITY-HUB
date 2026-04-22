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
    const opportunities = await prisma.opportunity.findMany({
      where: {
        status: OpportunityStatus.APPROVED,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(opportunities);
  } catch (caughtError) {
    console.error("Error fetching admin opportunities:", caughtError);
    return NextResponse.json(
      { error: "Failed to fetch opportunities" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { error } = requireAdminApi(request);

  if (error) {
    return error;
  }

  try {
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

    if (!title || !type || !country || !description || !organization || !deadline || !link) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        title,
        type,
        country,
        description,
        organization,
        deadline: new Date(deadline),
        link,
        views: Number.isFinite(views) ? views : 0,
        status: OpportunityStatus.APPROVED,
      },
    });

    return NextResponse.json(opportunity, { status: 201 });
  } catch (caughtError) {
    console.error("Error creating admin opportunity:", caughtError);
    return NextResponse.json(
      { error: "Failed to create opportunity" },
      { status: 500 }
    );
  }
}
