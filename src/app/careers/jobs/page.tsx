import React from "react";
// import { getActiveJobs } from "./_data/jobs";

import Navbar from "~/components/global/Navbar";
import Footer from "~/components/global/Footer";
import JobListingPage from "~/app/careers/jobs/JobList";
import { QUERIES } from "~/server/db/queries";
export default async function page() {
  // const activeJobs = await getActiveJobs();
  // const seasonalJobs = activeJobs.filter((job) => job.isSeasonal);
  // const permanentJobs = activeJobs.filter((job) => !job.isSeasonal);

  const openJobs = await QUERIES.getOpenJobs();

  return (
    <>
      <Navbar transparent={false} />
      <JobListingPage openJobs={openJobs} />
      {/* <div className="container mx-auto min-h-[60vh] max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-7">
          <h1 className="text-center text-4xl font-bold">Active Jobs</h1>
          <div className="overflow-hidden sm:rounded-lg sm:shadow-sm">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    Seasonal Jobs
                  </h3>
                </div>
              </div>
            </div>
            <JobList jobs={seasonalJobs} admin={false} />
          </div>
          <div className="overflow-hidden sm:rounded-lg sm:shadow-sm">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
              <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                <div className="ml-4 mt-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    Permanent Jobs
                  </h3>
                </div>
              </div>
            </div>
            <JobList jobs={permanentJobs} admin={false} />
          </div>
        </div>
      </div> */}

      <Footer />
    </>
  );
}
