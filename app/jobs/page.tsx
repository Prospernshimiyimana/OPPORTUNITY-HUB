import { JobsClient } from "./JobsClient";
import { getPublicOpportunities } from "@/lib/public-opportunities";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JobsPage() {
  const opportunities = await getPublicOpportunities();

  return <JobsClient jobs={opportunities} />;
}
