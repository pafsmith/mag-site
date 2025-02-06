"use server";

import { db } from "~/server/db";
import { applications, slots, jobPostings, jobs } from "~/server/db/schema";
import { eq } from "drizzle-orm";

async function getApplication(applicationId: number) {
  const application = await db.query.applications.findFirst({
    where: eq(applications.id, applicationId),
  });
  return application;
}

export async function approveApplication(applicationId: number) {
  const application = await getApplication(applicationId);

  if (!application) {
    return { error: "Application not found" };
  }
  await db
    .update(applications)
    .set({ status: "interview pending" })
    .where(eq(applications.id, applicationId));

  //TODO send email to applicant informing them to book an interview
}

export async function rejectApplication(applicationId: number) {
  const application = await getApplication(applicationId);

  if (!application) {
    return { error: "Application not found" };
  }
  await db
    .update(applications)
    .set({ status: "rejected" })
    .where(eq(applications.id, applicationId));

  //TODO send email to applicant informing them that they have been rejected
}

export async function scheduleInterview(applicationId: number) {
  const application = await getApplication(applicationId);

  if (!application) {
    return { error: "Application not found" };
  }

  //TODO Book interview into database
  await db
    .update(applications)
    .set({ status: "interview pending" }) // ✅ Match schema exactly
    .where(eq(applications.id, applicationId));

  //TODO send email to applicant informing them that their interview has been scheduled
}

export async function cancelInterview(applicationId: number) {
  const application = await getApplication(applicationId);

  if (!application) {
    return { error: "Application not found" };
  }

  //TODO cancel interview in database

  //TODO send email to applicant informing them that their interview has been cancelled / reschedule
}

export async function interviewAccepted(applicationId: number) {
  const application = await getApplication(applicationId);

  if (!application) {
    return { error: "Application not found" };
  }

  // Logic to start induction process

  //TODO send email to applicant informing them that their interview was successful and to book complete inductions
}

export async function getSlots() {
  const slots = await db.query.slots.findMany();

  // Convert dates to ISO strings for serialization
  const formattedSlots = slots.map((slot) => ({
    ...slot,
    date: slot.date.toISOString(),
  }));

  return formattedSlots;
}

export async function bookSlot(
  slotId: number,
  jobPostingId: string,
  userId: string,
  applicationId: number,
) {
  try {
    // First, convert jobPostingId to a number since that's what the database expects
    const jobPostingIdNum = parseInt(jobPostingId, 10);

    // Verify the job exists first (changed from jobPostings to jobs)
    const job = await db.query.jobs.findFirst({
      where: eq(jobs.id, jobPostingIdNum),
    });

    if (!job) {
      throw new Error(`Job with ID ${jobPostingId} not found`);
    }

    const slot = await db
      .update(slots)
      .set({
        isBooked: true,
        jobPostingId: jobPostingIdNum,
        userId,
        applicationId,
      })
      .where(eq(slots.id, slotId));

    return slot;
  } catch (error) {
    console.error("Error booking slot:", error);
    throw new Error("Failed to book interview slot. Please try again.");
  }
}

export async function createSlot(data: { date: Date; type: string }) {
  try {
    const newSlot = await db.insert(slots).values({
      date: data.date,
      type: data.type,
      isBooked: false,
      jobPostingId: null,
      userId: null,
      applicationId: null,
    });

    return newSlot;
  } catch (error) {
    console.error("Error creating slot:", error);
    throw new Error("Failed to create interview slot. Please try again.");
  }
}

export async function deleteSlot(slotId: number) {
  try {
    // First check if the slot exists and is not booked
    const existingSlot = await db.query.slots.findFirst({
      where: eq(slots.id, slotId),
    });

    if (!existingSlot) {
      throw new Error("Slot not found");
    }

    if (existingSlot.isBooked) {
      throw new Error("Cannot delete a booked slot");
    }

    await db.delete(slots).where(eq(slots.id, slotId));

    return { success: true };
  } catch (error) {
    console.error("Error deleting slot:", error);
    throw new Error("Failed to delete interview slot. Please try again.");
  }
}

export async function updateSlot(
  slotId: number,
  data: { date?: Date; type?: string },
) {
  try {
    // First check if the slot exists
    const existingSlot = await db.query.slots.findFirst({
      where: eq(slots.id, slotId),
    });

    if (!existingSlot) {
      throw new Error("Slot not found");
    }

    const updatedSlot = await db
      .update(slots)
      .set({
        ...(data.date && { date: data.date }),
        ...(data.type && { type: data.type }),
      })
      .where(eq(slots.id, slotId));

    return updatedSlot;
  } catch (error) {
    console.error("Error updating slot:", error);
    throw new Error("Failed to update interview slot. Please try again.");
  }
}
