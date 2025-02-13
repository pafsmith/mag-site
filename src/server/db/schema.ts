// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  text,
  boolean,
  serial,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `mag-site_${name}`);

// Departments table
export const departments = createTable("departments", {
  id: serial("id").primaryKey(),
  description: text("description"),
  featuredImage: text("featuredImage"),
  gallery: text("gallery")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  name: varchar("name").notNull(),
});

// User table
export const user = createTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  role: text("role"),
});

// Jobs table
export const jobs = createTable("jobs", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  responsibilities: text("responsibilities")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  requirements: text("requirements")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  benefits: text("benefits")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  departmentId: integer("departmentId").references(() => departments.id),
  isActive: boolean("is_active").notNull().default(false),
  isSeasonal: boolean("is_seasonal").notNull().default(false),
  location: varchar("location", { length: 255 }).notNull().default("Telford"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Applications table
export const applications = createTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("jobId").references(() => jobs.id),

  userId: text("userId").references(() => user.id),
  status: text("status").notNull().default("pending"),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 255 }).notNull(),
  coverLetter: text("coverLetter").notNull(),
  cvUrl: varchar("cvUrl", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: text("updatedBy").references(() => user.id),
});

// Slots table
export const slots = createTable("slots", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  jobPostingId: integer("jobPostingId").references(() => jobs.id),
  userId: text("userId").references(() => user.id),
  type: varchar("type", { length: 20 }).notNull(),
  isBooked: boolean("is_booked").notNull().default(false),
  applicants: integer("applicants").notNull().default(0),
  applicationId: integer("application_id").references(() => applications.id),
});

// Session table
export const session = createTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

// Account table
export const account = createTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

// Verification table
export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
