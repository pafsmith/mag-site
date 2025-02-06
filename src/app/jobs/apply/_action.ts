"use server";

import { createClient } from "~/config/supabase";
import { convertZodErrors } from "~/utils/zodErrors";
import { FormState } from "~/schemas/formState";
import { Application, appSchema } from "~/schemas/jobApplication";
import { db } from "~/server/db";
import { applications } from "~/server/db/schema";

const supabase = createClient();

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

export const applicationSubmit = async (
  application: Application,
): Promise<FormState<Application>> => {
  const result = appSchema.safeParse(application);

  if (!result.success) {
    const errors = convertZodErrors(result.error);
    return { errors };
  }

  try {
    // Upload CV if provided
    let cvUrl = null;
    if (application.cv) {
      cvUrl = await uploadImage(application.cv);
    }

    // Insert application into database

    const {
      userId,
      jobid,
      title,
      sex,
      firstName,
      surname,
      streetAddress,
      city,
      county,
      postcode,
      phoneNumber,
      niNumber,
      option,
      cv,
    } = application;

    const testapp = await db.insert(applications).values(application);

    console.log("DELEATE ME");
    console.log(testapp);

    // if (error) throw error;

    return { successMsg: "Application submitted successfully" };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { errors: { form: "Failed to submit application" } };
  }
};
