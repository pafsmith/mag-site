import "server-only";

import { db } from "~/server/db";
import { jobs } from "~/server/db/schema";
import { type JobSpec, type EditedJobInput } from "~/server/types/job-spec";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getJobs: async () => {
    return await db.select().from(jobs).orderBy(jobs.createdAt);
  },
};

export const MUTATIONS = {
  createJob: async (job: JobSpec) => {
    return await db.insert(jobs).values(job);
  },
  updateJob: async (job: EditedJobInput) => {
    return await db
      .update(jobs)
      .set({
        title: job.title,
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        benefits: job.benefits,
      })
      .where(eq(jobs.id, parseInt(job.jobId)));
  },
};
