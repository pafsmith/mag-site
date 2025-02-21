"use server";
import { redirect } from "next/navigation";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import { JobApplicationSchema } from "~/server/types/applications";
import { type JobApplication } from "~/client/types/application";
import { supabase } from "~/server/db/supabase";
import { db } from "~/server/db";
import { applications } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import { transporter } from "../nodemailer";

export type SubmitApplicationResponse =
  | { success: true }
  | { success: false; fieldErrors: Record<string, string[]> };

async function saveApplication(
  app: JobApplication,
  userId: string,
): Promise<void> {
  // Replace this with your actual saving logic (database/upload, etc.)
  const filename = await uploadImage(app.cv);
  console.log(app);

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  await db.insert(applications).values([
    {
      fullName: app.name,
      email: app.email,
      phoneNumber: app.phone,
      coverLetter: app.coverLetter,
      cvUrl: filename,
      jobId: parseInt(app.jobId),
      userId: userId,
    },
  ]);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Application saved:", { ...app, cv: app.cv.name });
}

export async function submitApplication(
  formData: FormData,
): Promise<SubmitApplicationResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user) {
    return { success: false, fieldErrors: { general: ["User not found"] } };
  }

  const jobId = formData.get("jobId");
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const coverLetter = formData.get("coverLetter");
  const cvValue = formData.get("cv");

  if (!(cvValue instanceof File)) {
    return {
      success: false,
      fieldErrors: { cv: ["CV file is required"] },
    };
  }
  const cv = cvValue;

  const inputData = { name, email, phone, coverLetter, cv, jobId };
  // console.log("inputData", inputData);
  const result = JobApplicationSchema.safeParse(inputData);

  if (!result.success) {
    const { fieldErrors } = result.error.flatten();
    return { success: false, fieldErrors };
  }

  const jobApplication: JobApplication = { ...result.data };

  try {
    await saveApplication(jobApplication, user.id);
  } catch (error) {
    console.error("Error saving application", error);
    return {
      success: false,
      fieldErrors: {
        general: ["Failed to submit application. Please try again later."],
      },
    };
  }
  redirect(`/jobs/${jobApplication.jobId}/thanks`);
  return { success: true };
}

export const uploadImage = async (file: File) => {
  try {
    if (!file) {
      throw new Error("You must select an image to upload.");
    }

    // Generate unique filename using UUID
    const fileExt = file.name.split(".").pop();
    const uniqueId = crypto.randomUUID();
    const uniqueFilename = `${uniqueId}.${fileExt}`;

    const { data: image, error: uploadError } = await supabase.storage
      .from("magna-cv")
      .upload(uniqueFilename, file);

    if (uploadError) {
      throw uploadError;
    }

    if (image) {
      console.log(image);
    }

    // Return the unique filename so we can store it in the database if needed
    return uniqueFilename;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function approveApplication(id: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  console.log("approving application", id);
  await db
    .update(applications)
    .set({ status: "approved", updatedBy: user?.id, updatedAt: new Date() })
    .where(eq(applications.id, id));
  const application = await db
    .select()
    .from(applications)
    .where(eq(applications.id, id))
    .limit(1);
  const userEmail = application[0]?.email;
  transporter.sendMail(
    {
      from: "no-reply@magna.co.uk",
      to: userEmail,
      subject: "Application Approved",
      text: `Congratulations! Your application has been approved.`,
    },
    (error, info) => {
      if (error) {
        return console.error("Error while sending email:", error);
      }
      console.log("Email sent successfully:", info.response);
    },
  );
  redirect(`/admin/applications/`);
}

export async function rejectApplication(id: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  console.log("rejecting application", id);
  const application = await db
    .update(applications)
    .set({ status: "rejected", updatedBy: user?.id, updatedAt: new Date() })
    .where(eq(applications.id, id))
    .returning();
  const userEmail = application[0]?.email;
  transporter.sendMail(
    {
      from: "no-reply@magna.co.uk",
      to: userEmail,
      subject: "Application Rejected",
      text: `Unfortunately, your application has been rejected.`,
    },
    (error, info) => {
      if (error) {
        return console.error("Error while sending email:", error);
      }
      console.log("Email sent successfully:", info.response);
    },
  );
}

export const checkPreviousApplication = async (
  userId: string,
  jobId: number,
) => {
  const application = await db
    .select()
    .from(applications)
    .where(and(eq(applications.userId, userId), eq(applications.jobId, jobId)));

  if (application.length > 0) {
    return true;
  }
  return false;
};
