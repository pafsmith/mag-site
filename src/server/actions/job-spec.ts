"use server";

import { db } from "~/server/db";
import { jobs } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import {
  editJobSpecSchema,
  type EditedJobInput,
  type JobSpec,
  jobSpecSchema,
} from "~/server/types/job-spec";
import { redirect } from "next/navigation";
import { MUTATIONS } from "../db/queries";
import { transporter } from "../nodemailer";

export async function submitEditedJobSpec(formData: FormData) {
  // Extract fields from FormData and cast them as strings.
  const jobId = formData.get("jobId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  // For responsibilities and requirements, if you expect strings, cast them as well.
  const responsibilities = formData
    .getAll("responsibilities")
    .map((item) => item as string);
  const requirements = formData
    .getAll("requirements")
    .map((item) => item as string);

  const benefits = formData.getAll("benefits").map((item) => item as string);

  // Package input.
  const input: EditedJobInput = {
    jobId,
    title,
    description,
    responsibilities,
    requirements,
    benefits,
  };

  // Validate.
  const result = editJobSpecSchema.safeParse(input);
  if (!result.success) {
    // In practice you might return field errors back to the client.
    throw new Error("Validation error");
  }

  // Update the job record.
  await MUTATIONS.updateJob(result.data);

  // Redirect once the update is complete.
  redirect("/admin/jobs");
}

async function saveJobSpec(jobSpec: JobSpec): Promise<void> {
  // In production, replace this with your database logic.

  await new Promise((resolve) => setTimeout(resolve, 1000));
  await MUTATIONS.createJob(jobSpec);

  const mailOptions = {
    from: "no-reply@magna.co.uk", // Replace with your sender email
    to: "psmith@magna.co.uk", // Replace with your recipient email
    subject: "Test Email",
    text: "Hello! This is a test email sent via Gmail SMTP relay.",
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error while sending email:", error);
    }
    console.log("Email sent successfully:", info.response);
  });

  console.log("Job spec saved:", jobSpec);
}

// The server action to handle form submission.
export async function submitJobSpec(
  formData: FormData,
): Promise<
  { success: true } | { success: false; fieldErrors: Record<string, string[]> }
> {
  "use server";

  // Extract fields from the FormData.
  const title = formData.get("title");
  const description = formData.get("description");

  // Use getAll so we can collect all array values.
  const responsibilities = formData.getAll("responsibilities") as string[];
  const requirements = formData.getAll("requirements") as string[];
  const benefits = formData.getAll("benefits") as string[];

  // Package all the data.
  const input = {
    title,
    description,
    responsibilities,
    requirements,
    benefits,
  };

  // Validate with Zod.
  const result = jobSpecSchema.safeParse(input);
  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    return { success: false, fieldErrors };
  }

  try {
    await saveJobSpec(result.data);
  } catch (error) {
    console.error("Error saving job spec", error);
    return {
      success: false,
      fieldErrors: {
        general: ["Failed to save job spec. Please try again later."],
      },
    };
  }
  redirect("/admin/jobs");
  return { success: true };
}
