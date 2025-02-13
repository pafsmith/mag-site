// /app/jobs/[jobId]/apply/page.tsx

"use server";

import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Form from "./Form";
import { QUERIES } from "~/server/db/queries";
import { checkPreviousApplication } from "~/server/actions/application";

export default async function Page({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return redirect("/jobs/sign-in");
  }

  const application = await checkPreviousApplication(user.id, Number(jobId));
  if (application) {
    return <div>You have already applied for this job</div>;
  }

  // console.log("jobId", jobId);
  return <Form jobId={jobId} />;
}
