import { NextResponse } from "next/server";
import { OpportunityStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const opportunities = await prisma.opportunity.findMany({
      where: {
        status: OpportunityStatus.APPROVED,
      },
      orderBy: [{ deadline: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(opportunities, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch opportunities." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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
      submittedByName,
      submittedByEmail,
    } = body as {
      title?: string;
      type?: string;
      country?: string;
      description?: string;
      organization?: string;
      deadline?: string;
      link?: string;
      submittedByName?: string;
      submittedByEmail?: string;
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
        submittedByName,
        submittedByEmail,
        status: OpportunityStatus.PENDING,
      },
    });

    return NextResponse.json(opportunity, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create opportunity." },
      { status: 500 }
    );
  }
}
