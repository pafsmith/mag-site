import { QUERIES } from "~/server/db/queries";

import BookInterview from "~/components/careers/BookInterview";
import { user } from "auth-schema";
import { UserRoundIcon } from "lucide-react";

type Application = {
  id: number;
  jobId: number;
  userId: string;
};

export default async function Page({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;

  const applications = await QUERIES.getApplicationById(Number(appId));

  const { application } = applications[0];

  if (!application) {
    return <div>Application not found</div>;
  }

  console.log(application.userId);
  console.log(application.jobId);
  console.log(application.id);

  return (
    <div>
      <BookInterview
        jobPostingId={application.jobId}
        userId={application.userId}
        applicationId={application.id}
      />
    </div>
  );
}
