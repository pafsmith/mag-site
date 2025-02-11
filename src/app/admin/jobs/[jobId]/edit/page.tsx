// /app/admin/jobs/[jobId]/edit/page.tsx

import { QUERIES } from "~/server/db/queries";
import EditJobSpecForm from "./EditForm";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

export default async function EditJobSpecPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;

  const jobs = await QUERIES.getJobById(parseInt(jobId));
  const job = jobs[0];

  if (!job) {
    notFound();
  }

  // Transform the database job data into the form's expected format
  const defaultValues = {
    jobId: job.id.toString(),
    title: job.title,
    description: job.description,
    responsibilities: job.responsibilities.map((value) => ({ value })),
    requirements: job.requirements.map((value) => ({ value })),
    benefits: job.benefits.map((value) => ({ value })),
    isSeasonal: job.isSeasonal,
  };

  return <EditJobSpecForm defaultValues={defaultValues} />;
}
