import { z } from "zod";

export const editJobSpecSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  title: z.string().min(1, { message: "Job title is required" }),
  description: z
    .string()
    .min(1, { message: "High level description is required" }),
  // In this approach, our database columns for responsibilities and requirements
  // are stored as PostgreSQL arrays of text, so we validate them as arrays of strings.
  responsibilities: z.array(
    z.string().min(1, { message: "Responsibility cannot be empty" }),
  ),
  requirements: z.array(
    z.string().min(1, { message: "Requirement cannot be empty" }),
  ),
  benefits: z.array(z.string().min(1, { message: "Benefit cannot be empty" })),
  isSeasonal: z.boolean(),
});

export type EditedJobInput = z.infer<typeof editJobSpecSchema>;

export const jobSpecSchema = z.object({
  title: z.string().min(1, { message: "Job title is required" }),
  description: z
    .string()
    .min(1, { message: "High level description is required" }),
  responsibilities: z
    .array(z.string().min(1, { message: "Responsibility cannot be empty" }))
    .min(1, { message: "At least one responsibility is required" }),
  requirements: z
    .array(z.string().min(1, { message: "Requirement cannot be empty" }))
    .min(1, { message: "At least one requirement is required" }),
  benefits: z
    .array(z.string().min(1, { message: "Benefit cannot be empty" }))
    .min(1, { message: "At least one benefit is required" }),
  isSeasonal: z.boolean(),
});

export type JobSpec = z.infer<typeof jobSpecSchema>;
