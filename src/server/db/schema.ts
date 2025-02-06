// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
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
  id: integer("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description"),
});

// Job Postings table
export const jobPostings = createTable("job_postings", {
  id: integer("id").primaryKey(),
  departmentId: integer("department_id").references(() => departments.id),
  title: varchar("title").notNull(),
  seasonal: boolean("seasonal").default(false),
  description: text("description").notNull(),
  requirements: text("requirements"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  closingDate: timestamp("closing_date"),
});

// Applications table
export const applications = createTable("applications", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => user.id),
  jobPostingId: integer("jobPostingId").references(() => jobs.id),

  status: varchar("status", { length: 20 }).notNull().default("pending"),

  title: varchar("title", { length: 255 }).notNull(),
  sex: varchar("sex", { length: 20 }).notNull(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  surname: varchar("surname", { length: 255 }).notNull(),
  streetAddress: varchar("streetAddress", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  county: varchar("county", { length: 255 }).notNull(),
  postcode: varchar("postcode", { length: 255 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 255 }).notNull(),
  niNumber: varchar("niNumber", { length: 255 }).notNull(),
  option: varchar("option", { length: 255 }).notNull(),

  cvUrl: varchar("cvUrl"),

  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
  lastUpdatedAt: timestamp("lastUpdatedAt").defaultNow(),
});

export const jobs = createTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").array().notNull().default([]),
  responsibilities: text("responsibilities").array().notNull().default([]),
  requirements: text("requirements").array().notNull().default([]),
  benefits: text("benefits").array().notNull().default([]),
  department: integer("department_id").references(() => departments.id),
  location: varchar("location", { length: 255 }).notNull().default("Telford"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isActive: boolean("is_active").notNull().default(false),
  seasonal: boolean("seasonal").notNull().default(false),
});

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

export const verification = createTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
