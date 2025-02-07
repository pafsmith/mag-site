// /app/jobs/[jobId]/apply/page.tsx

"use server";

import Form from "./Form";

export default async function Page({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;

  // console.log("jobId", jobId);
  return <Form jobId={jobId} />;
}
