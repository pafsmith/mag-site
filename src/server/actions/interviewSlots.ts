"use server";
import { eq, and, lte, gte, sql } from "drizzle-orm";
import { db } from "~/server/db";
import { createCalendarEvent } from "~/server/actions/google-calendar";
import { slots } from "~/server/db/schema";

export async function getAvailableSlots(date: Date) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  console.log("Searching for slots with params:", {
    date,

    startOfDay: startOfDay.toISOString(),
    endOfDay: endOfDay.toISOString(),
  });

  const availableSlots = await db
    .select()
    .from(slots)
    .where(
      and(
        eq(slots.isBooked, false),
        gte(slots.date, startOfDay),
        lte(slots.date, endOfDay),
      ),
    );

  console.log("Found slots:", availableSlots);
  return availableSlots;
}

export async function bookSlot(
  slotId: number,
  applicationId: number,
  userId: string,
) {
  console.log("Booking slot with params:", {
    slotId,
    userId,
    applicationId,
  });

  const updatedSlot = await db
    .update(slots)
    .set({
      isBooked: true,
      userId: userId,
      applicationId: applicationId,
      applicants: sql`${slots.applicants} + 1`,
    })
    .where(eq(slots.id, slotId))
    .returning();

  console.log("Updated slot:", updatedSlot);
  const eventDetails = {
    calendarId: "c_1885abs2d7qq0jiujd07vh1rsj60g@resource.calendar.google.com",
    summary: "Applicant Interview",
    description: "Interview for the next phase of our hiring process.",
    start: "2025-12-31T10:00:00-07:00",
    end: "2025-12-31T10:30:00-07:00",
    timeZone: "Europe/London",
  };
  await createCalendarEvent(eventDetails);
  return updatedSlot[0];
}
