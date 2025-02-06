"use server";

import { getJob, hasApplied } from "~/app/careers/jobs/_data/jobs";

import JobApp from "./JobApp";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function JobApplication({
  params,
}: {
  params: Promise<{ jobid: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/jobs/sign-in");
  }
  const userId = session.user.id;

  const { jobid } = await params;
  const job = await getJob(jobid);
  const title = job[0]?.title;

  const applied = await hasApplied(userId, jobid);

  if (applied === true) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Application Already Submitted
        </h2>
        <p className="mt-2">You have already applied for this position.</p>
      </div>
    );
  }

  return <JobApp title={title} userId={userId} jobid={jobid} />;
}

export default JobApplication;
