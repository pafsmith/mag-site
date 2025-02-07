import { z } from "zod";

export const jobApplicationSchema = z.object({
  jobId: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  coverLetter: z.string().min(1, "Cover letter is required"),
  cv: z.preprocess(
    (value) => {
      // Only check instanceof FileList if the global FileList exists.
      if (
        typeof FileList !== "undefined" &&
        value instanceof FileList &&
        value.length > 0
      ) {
        return value.item(0);
      }
      // Otherwise, return the value (possibly undefined) for further checks.
      return undefined;
    },
    z
      .instanceof(File, { message: "CV file is required" })
      .refine((file) => file.size > 0, { message: "CV file cannot be empty" }),
  ),
});

// For convenience, infer the TypeScript type
export type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;

export interface JobApplication {
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  cv: File;
  jobId: string;
}
