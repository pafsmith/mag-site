import { z } from "zod";

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword"];

export const appSchema = z.object({
  title: z.string(),
  jobid: z.string().optional(),
  userId: z.string().optional(),
  sex: z.string(),
  firstName: z.string().min(1).max(255),
  surname: z.string().min(1).max(255),
  streetAddress: z.string(),
  city: z.string(),
  county: z.string(),
  postcode: z.string(),
  phoneNumber: z.string(),
  niNumber: z.string(),
  cv: z
    .instanceof(File, { message: "CV is required" })
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, {
      message: `File size should be less than ${
        MAX_UPLOAD_SIZE / (1024 * 1024)
      }MB`,
    })
    .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Only PDF and DOCX files are accepted",
    })
    .optional(),
  option: z.enum(["option-one", "option-two"]),
});

export type Application = z.infer<typeof appSchema>;
