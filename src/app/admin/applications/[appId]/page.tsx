import { CheckCircle, XCircle } from "lucide-react";
import { Download } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { QUERIES } from "~/server/db/queries";
import { type applications } from "~/server/db/schema";
import {
  approveApplication,
  rejectApplication,
} from "~/server/actions/application";

async function handleApprove(id: number) {
  "use server";
  await approveApplication(id);
}

async function handleReject(id: number) {
  "use server";
  await rejectApplication(id);
}

type Application = typeof applications.$inferSelect;

export default async function Page({
  params,
}: {
  params: Promise<{ appId: string }>;
}) {
  const { appId } = await params;
  const responses = await QUERIES.getApplicationById(Number(appId));
  const response = responses[0]; // Get the first (and only) result

  if (!response) {
    return <div>Application not found</div>;
  }

  if (response.application.status === "approved") {
    return <div>Application already approved</div>;
  }

  if (response.application.status === "rejected") {
    return <div>Application already rejected</div>;
  }

  return (
    <Card className="mx-auto my-8 max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Job Application: {response.jobTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Full Name</h3>
            <p>{response.application.fullName}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Phone Number</h3>
            <p>{response.application.phoneNumber}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold">Email</h3>
            <p>{response.application.email}</p>
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">Cover Letter</h3>
          <p className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">
            {response.application.coverLetter}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <a
          href={`https://nvbkyusqehouuvrtpsab.supabase.co/storage/v1/object/public/magna-cv//${response.application.cvUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="flex w-full items-center gap-2 sm:w-auto"
          >
            <Download size={16} />
            Download CV
          </Button>
        </a>
        <div className="flex w-full gap-4 sm:w-auto">
          <form action={handleReject.bind(null, response.application.id)}>
            <Button
              type="submit"
              variant="destructive"
              className="flex flex-1 items-center justify-center gap-2 sm:flex-initial"
            >
              <XCircle size={16} />
              Reject
            </Button>
          </form>
          <form action={handleApprove.bind(null, response.application.id)}>
            <Button
              type="submit"
              variant="default"
              className="flex flex-1 items-center justify-center gap-2 sm:flex-initial"
            >
              <CheckCircle size={16} />
              Approve
            </Button>
          </form>
        </div>
      </CardFooter>
    </Card>
  );
}
