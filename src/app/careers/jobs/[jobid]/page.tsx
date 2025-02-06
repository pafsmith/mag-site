import { getJob } from "../_data/jobs";
import Navbar from "~/components/global/Navbar";
import Footer from "~/components/global/Footer";
import { JobView } from "~/components/JobView";

export default async function Page({
  params,
}: {
  params: Promise<{ jobid: string }>;
}) {
  const { jobid } = await params;

  const job = await getJob(jobid);
  if (!job[0]) return <div>Job not found</div>;

  const sections = [
    { title: "High Level Description", paragraphs: job[0].description },
    { title: "Responsibilities", paragraphs: job[0].responsibilities },
    { title: "What We Look For", paragraphs: job[0].requirements },
    { title: "What We Offer", paragraphs: job[0].benefits },
  ];

  return (
    <>
      <Navbar transparent={false} />
      <JobView
        jobTitle={job[0].title}
        seasonal={job[0].isSeasonal}
        sections={sections}
      />
      <Footer />
    </>
  );
}
