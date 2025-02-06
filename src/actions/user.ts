"use server";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { db } from "~/server/db";
import { user } from "~/server/db/schema";
import { eq } from "drizzle-orm";
export async function getUserInfo(userId: string) {
  const userInfo = await db.select().from(user).where(eq(user.id, userId));

  if (!userInfo) {
    return null;
  }

  const x = userInfo[0]?.name.split(" ") ?? [];
  const firstName = x[0];
  const lastName = x[1];
  const emailAddresses = userInfo[0]?.email ?? "";

  return { firstName, lastName, emailAddresses };
}
