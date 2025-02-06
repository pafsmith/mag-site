import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "~/server/db/index";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    // This extends the user object with a role field
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60,
    },
    expiresIn: 60 * 60 * 24 * 7, // 1 week
    updateAge: 60 * 60 * 24, // every 1 day the session expiration is updated
  },
  // Enable email and password authentication
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
