import { z } from "zod";

export const editJobSpecSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  title: z.string().min(1, { message: "Job title is required" }),
  description: z
    .string()
    .min(1, { message: "High level description is required" }),
  responsibilities: z.array(
    z.object({
      value: z.string().min(1, { message: "Responsibility cannot be empty" }),
    }),
  ),
  requirements: z.array(
    z.object({
      value: z.string().min(1, { message: "Requirement cannot be empty" }),
    }),
  ),
  benefits: z.array(
    z.object({
      value: z.string().min(1, { message: "Benefit cannot be empty" }),
    }),
  ),
});

export type EditJobSpecFormValues = z.infer<typeof editJobSpecSchema>;

export const jobSpecSchema = z.object({
  title: z.string().min(1, { message: "Job title is required" }),
  description: z
    .string()
    .min(1, { message: "High level description is required" }),
  responsibilities: z
    .array(
      z.object({
        value: z.string().min(1, { message: "Responsibility cannot be empty" }),
      }),
    )
    .min(1, { message: "At least one responsibility is required" }),
  requirements: z
    .array(
      z.object({
        value: z.string().min(1, { message: "Requirement cannot be empty" }),
      }),
    )
    .min(1, { message: "At least one requirement is required" }),
  benefits: z
    .array(
      z.object({
        value: z.string().min(1, { message: "Benefit cannot be empty" }),
      }),
    )
    .min(1, { message: "At least one benefit is required" }),
});

// Infer the TypeScript type from the schema.
export type JobSpecFormValues = z.infer<typeof jobSpecSchema>;
