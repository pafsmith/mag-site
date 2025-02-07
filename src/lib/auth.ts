import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "~/server/db/index";
import { transporter } from "~/server/nodemailer";

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
  emailVerification: {
    enabled: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      transporter.sendMail(
        {
          from: "no-reply@magna.co.uk",
          to: user.email,
          subject: "Verify your email",
          text: `Click here to verify your email: ${url}`,
        },
        (error, info) => {
          if (error) {
            return console.error("Error while sending email:", error);
          }
          console.log("Email sent successfully:", info.response);
        },
      );
    },
  },
  emailAndPassword: {
    requireEmailVerification: true,
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      transporter.sendMail(
        {
          from: "no-reply@magna.co.uk",
          to: user.email,
          subject: "Reset your password",
          text: `Click here to reset your password: ${url}`,
        },
        (error, info) => {
          if (error) {
            return console.error("Error while sending email:", error);
          }
          console.log("Email sent successfully:", info.response);
        },
      );
    },
  },
  plugins: [nextCookies()],
});
