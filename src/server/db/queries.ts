import "server-only";

import { db } from "~/server/db";
import { applications, departments, jobs, user } from "~/server/db/schema";
import { type JobSpec, type EditedJobInput } from "~/server/types/job-spec";
import { eq, and } from "drizzle-orm";

export const QUERIES = {
  getJobs: async () => {
    return await db.select().from(jobs).orderBy(jobs.createdAt);
  },
  getActiveJobByDepartment: async (departmentId: number) => {
    return await db
      .select()
      .from(jobs)
      .where(and(eq(jobs.departmentId, departmentId), eq(jobs.isActive, true)))
      .orderBy(jobs.createdAt);
  },
  getDepartmentById: async (departmentId: number) => {
    return await db
      .select()
      .from(departments)
      .where(eq(departments.id, departmentId));
  },
  getDepartments: async () => {
    return await db.select().from(departments);
  },
  getJobById: async (jobId: number) => {
    return await db.select().from(jobs).where(eq(jobs.id, jobId));
  },
  getAllApplications: async () => {
    return await db
      .select({
        application: applications,
        jobTitle: jobs.title,
        userName: user.name,
      })
      .from(applications)
      .leftJoin(jobs, eq(applications.jobId, jobs.id))
      .leftJoin(user, eq(applications.updatedBy, user.id))
      .orderBy(applications.createdAt);
  },
  getApplicationById: async (applicationId: number) => {
    return await db
      .select({
        application: applications,
        jobTitle: jobs.title,
      })
      .from(applications)
      .leftJoin(jobs, eq(applications.jobId, jobs.id))
      .where(eq(applications.id, applicationId))
      .limit(1);
  },
};

export const MUTATIONS = {
  createJob: async (job: JobSpec) => {
    try {
      return await db.insert(jobs).values(job).returning();
    } catch (error) {
      console.error("Failed to create job", error);
      throw new Error("Failed to create job");
    }
  },

  updateJob: async (input: EditedJobInput) => {
    return await db
      .update(jobs)
      .set({
        title: input.title,
        description: input.description,
        responsibilities: input.responsibilities,
        requirements: input.requirements,
        benefits: input.benefits,
        isSeasonal: input.isSeasonal,
      })
      .where(eq(jobs.id, parseInt(input.jobId)))
      .returning();
  },
};
