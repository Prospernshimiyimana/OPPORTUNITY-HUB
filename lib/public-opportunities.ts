import { Opportunity, OpportunityStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type PublicOpportunity = {
  id: number;
  title: string;
  organization: string;
  location: string;
  type: string;
  deadline: string;
  posted: string;
  description: string;
  category: string;
  requirements: string[];
  link: string;
  views: number;
};

function toOpportunityCategory(type: string) {
  const normalized = type.toLowerCase();

  if (normalized.includes("intern")) {
    return "Internship";
  }

  if (normalized.includes("grant")) {
    return "Grant";
  }

  if (normalized.includes("fellow")) {
    return "Fellowship";
  }

  return "Opportunity";
}

function toRequirements(description: string) {
  return description
    .split(/[.!?]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);
}

export function mapOpportunityToPublic(opportunity: Opportunity): PublicOpportunity {
  return {
    id: opportunity.id,
    title: opportunity.title,
    organization: opportunity.organization,
    location: opportunity.country,
    type: opportunity.type,
    deadline: opportunity.deadline.toISOString(),
    posted: opportunity.createdAt.toISOString(),
    description: opportunity.description,
    category: toOpportunityCategory(opportunity.type),
    requirements: toRequirements(opportunity.description),
    link: opportunity.link,
    views: opportunity.views,
  };
}

export async function getPublicOpportunities() {
  const opportunities = await prisma.opportunity.findMany({
    where: {
      status: OpportunityStatus.APPROVED,
    },
    orderBy: [{ createdAt: "desc" }, { deadline: "asc" }],
  });

  return opportunities.map(mapOpportunityToPublic);
}

export async function getPublicOpportunityById(id: number) {
  const opportunity = await prisma.opportunity.findFirst({
    where: {
      id,
      status: OpportunityStatus.APPROVED,
    },
  });

  if (!opportunity) {
    return null;
  }

  return mapOpportunityToPublic(opportunity);
}
