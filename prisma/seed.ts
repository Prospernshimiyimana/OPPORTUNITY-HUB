import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import { OpportunityStatus } from "@prisma/client";

async function main() {
  const hashed = await bcrypt.hash("123456", 10);

  await prisma.admin.upsert({
    where: {
      email: "admin@gmail.com",
    },
    update: {
      name: "Admin User",
      password: hashed,
      role: "ADMIN",
    },
    create: {
      email: "admin@gmail.com",
      name: "Admin User",
      password: hashed,
      role: "ADMIN",
    },
  });

  await prisma.user.deleteMany();
  await prisma.opportunity.deleteMany();

  await prisma.user.createMany({
    data: [
      {
        name: "Alice Mukamana",
        email: "alice@example.com",
        role: "ADMIN",
        banned: false,
      },
      {
        name: "Brian Uwase",
        email: "brian@example.com",
        role: "USER",
        banned: false,
      },
      {
        name: "Chantal Niyonsaba",
        email: "chantal@example.com",
        role: "USER",
        banned: true,
      },
      {
        name: "David Kwizera",
        email: "david@example.com",
        role: "USER",
        banned: false,
      },
    ],
  });

  await prisma.opportunity.createMany({
    data: [
      {
        title: "Climate Innovation Fellowship",
        type: "Fellowship",
        country: "Rwanda",
        description: "Support early-stage climate builders with mentorship and funding.",
        organization: "Green Future Lab",
        deadline: new Date("2026-05-15"),
        link: "https://example.com/climate-fellowship",
        views: 482,
        status: OpportunityStatus.APPROVED,
        submittedByName: "Alice Mukamana",
        submittedByEmail: "alice@example.com",
      },
      {
        title: "Pan-African Product Designer Role",
        type: "Job",
        country: "Kenya",
        description: "Remote-first product design role for a fast-growing marketplace.",
        organization: "Nexa Africa",
        deadline: new Date("2026-05-22"),
        link: "https://example.com/product-designer",
        views: 356,
        status: OpportunityStatus.APPROVED,
        submittedByName: "Brian Uwase",
        submittedByEmail: "brian@example.com",
      },
      {
        title: "Social Impact Accelerator",
        type: "Accelerator",
        country: "Nigeria",
        description: "Twelve-week accelerator for founders building inclusive digital services.",
        organization: "Impact Scale",
        deadline: new Date("2026-06-02"),
        link: "https://example.com/social-impact-accelerator",
        views: 514,
        status: OpportunityStatus.APPROVED,
        submittedByName: "David Kwizera",
        submittedByEmail: "david@example.com",
      },
      {
        title: "Youth Employment Program",
        type: "Program",
        country: "Uganda",
        description: "Community-led skills and hiring program for recent graduates.",
        organization: "WorkSpring",
        deadline: new Date("2026-05-28"),
        link: "https://example.com/youth-employment",
        views: 167,
        status: OpportunityStatus.PENDING,
        submittedByName: "Jean Claude",
        submittedByEmail: "jean@example.com",
      },
      {
        title: "Community Data Analyst Internship",
        type: "Internship",
        country: "Ghana",
        description: "Internship supporting research dashboards and reporting for NGOs.",
        organization: "Insight Commons",
        deadline: new Date("2026-05-19"),
        link: "https://example.com/data-analyst-internship",
        views: 79,
        status: OpportunityStatus.PENDING,
        submittedByName: "Sarah Lee",
        submittedByEmail: "sarah@example.com",
      },
      {
        title: "Open Grants for Civic Tools",
        type: "Grant",
        country: "South Africa",
        description: "Funding for startups building public-interest digital tools.",
        organization: "Civic Spark",
        deadline: new Date("2026-04-30"),
        link: "https://example.com/civic-grants",
        views: 212,
        status: OpportunityStatus.REJECTED,
        submittedByName: "Rejected Submitter",
        submittedByEmail: "rejected@example.com",
      },
    ],
  });

  console.log("Seeded admin dashboard data");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
