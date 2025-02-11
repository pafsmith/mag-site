import { QUERIES } from "~/server/db/queries";
import Navbar from "~/components/global/Navbar";
import Footer from "~/components/global/Footer";
import { JobView } from "~/components/JobView";

export default async function Page({
  params,
}: {
  params: Promise<{ jobid: string }>;
}) {
  const { jobid } = await params;

  const job = await QUERIES.getJobById(Number(jobid));
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
      <JobView job={job[0]} />
      <Footer />
    </>
  );
}
