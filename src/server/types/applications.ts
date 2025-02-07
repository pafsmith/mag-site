import { z } from "zod";

export const JobApplicationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  coverLetter: z.string().min(1, { message: "Cover letter is required" }),
  cv: z
    .instanceof(File, { message: "CV file is required" })
    .refine((file) => file.size > 0, { message: "CV file cannot be empty" }),
  jobId: z.string().min(1, "Job ID is required"),
});
