// /app/admin/jobs/[jobId]/edit/page.tsx

import EditForm from "./EditForm";
import { db } from "~/server/db";
import { jobs } from "~/server/db/schema";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

export default async function EditJobSpecPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  // Query the job record by ID.
  const job = await db
    .select()
    .from(jobs)
    .where(eq(jobs.id, parseInt(jobId, 10)))
    .then((res) => res[0]);

  if (!job) {
    notFound();
  }

  // Transform array columns to the shape the client form expects.
  // Our edit form expects responsibilities and requirements to be
  // an array of objects with a "value" property.
  const defaultValues = {
    jobId: job.id.toString(),
    title: job.title,
    description: job.description,
    responsibilities: job.responsibilities.map((r: string) => ({ value: r })),
    requirements: job.requirements.map((r: string) => ({ value: r })),
    benefits: job.benefits.map((b: string) => ({ value: b })),
  };

  return <EditForm defaultValues={defaultValues} />;
}
