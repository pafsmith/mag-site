import "server-only";
import { db } from "~/server/db";
import { applications, departments, jobs } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export const getJobs = async () => {
  const jobsList = await db
    .select({
      id: jobs.id,
      title: jobs.title,
      location: jobs.location,
      departmentName: departments.name,
      isSeasonal: jobs.seasonal,
      isActive: jobs.isActive,
    })
    .from(jobs)
    .leftJoin(departments, eq(jobs.department, departments.id));

  return jobsList;
};

export const getDepartmentById = async (id: number) => {
  const department = await db
    .select()
    .from(departments)
    .where(eq(departments.id, id));
  return department;
};

export const getActiveJobs = async () => {
  const activeJobs = await db
    .select({
      id: jobs.id,
      title: jobs.title,
      location: jobs.location,
      departmentName: departments.name,
      isSeasonal: jobs.seasonal,
    })
    .from(jobs)
    .leftJoin(departments, eq(jobs.department, departments.id))
    .where(eq(jobs.isActive, true));
  return activeJobs;
};

export const getJob = async (id: string) => {
  const job = await db
    .select({
      id: jobs.id,
      title: jobs.title,
      description: jobs.description,
      responsibilities: jobs.responsibilities,
      requirements: jobs.requirements,
      benefits: jobs.benefits,
      isSeasonal: jobs.seasonal,
      location: jobs.location,
    })
    .from(jobs)
    .where(eq(jobs.id, Number(id)));

  return job;
};

export const hasApplied = async (userId: string, jobId: string) => {
  const application = await db
    .select()
    .from(applications)
    .where(
      and(
        eq(applications.userId, userId),
        eq(applications.jobPostingId, Number(jobId)),
      ),
    );
  return application.length > 0;
};

export const getApplication = async (id: string) => {
  const application = await db
    .select()
    .from(applications)
    .where(eq(applications.id, Number(id)));
  return application;
};
