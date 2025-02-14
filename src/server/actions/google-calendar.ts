// app/actions/createCalendarEvent.server.js

"use server";

import { google } from "googleapis";
import { v4 as uuidv4 } from "uuid";

/**
 * Creates a Google Calendar event with a Google Meet link using a service account.
 *
 * @param {Object} eventDetails - Details for the event to be created.
 * @param {string} eventDetails.calendarId - The Calendar ID where the event will be placed.
 * @param {string} eventDetails.summary - A summary or title for the event.
 * @param {string} eventDetails.description - A description for the event.
 * @param {string} eventDetails.start - The start dateTime in ISO 8601 format.
 * @param {string} eventDetails.end - The end dateTime in ISO 8601 format.
 * @param {Array<Object>} eventDetails.attendees - List of attendees, each with an email.
 * @param {string} [eventDetails.timeZone="America/Los_Angeles"] - The event's timeZone.
 */
export async function createCalendarEvent(eventDetails) {
  const {
    calendarId = "primary",
    summary,
    description,
    start,
    end,
    timeZone = "America/Los_Angeles",
  } = eventDetails;

  try {
    /* Using Service Account Credentials:
       The client will read the service account JSON file automatically
       if you set the GOOGLE_APPLICATION_CREDENTIALS environment variable.
    */
    const auth = new google.auth.GoogleAuth({
      scopes: [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.events",
      ],
    });

    // Create a client instance with the service account credentials.
    const authClient = await auth.getClient();

    // Initialize Calendar API with the authenticated client.
    const calendar = google.calendar({
      version: "v3",
      auth: authClient,
    });

    // First check if we can access the calendar
    try {
      await calendar.calendars.get({
        calendarId,
      });
    } catch (error) {
      console.error(`Calendar ${calendarId} not found or not accessible`);
      throw new Error(`Calendar ${calendarId} not found or not accessible`);
    }

    // Build the event object.
    const event = {
      summary,
      description,
      start: {
        dateTime: start,
        timeZone,
      },
      end: {
        dateTime: end,
        timeZone,
      },
    };

    // Insert the event into the specified calendar.
    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw new Error("Failed to create calendar event");
  }
}
