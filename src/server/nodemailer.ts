import { z } from "zod";
import * as nodemailer from "nodemailer";

const envSchema = z.object({
  SMTP_HOST: z.string().nonempty(),
  SMTP_PORT: z.string().nonempty(), // We'll convert to number later
});

const parsedEnv = envSchema.parse(process.env);

export const transporter = nodemailer.createTransport({
  host: parsedEnv.SMTP_HOST,
  port: Number(parsedEnv.SMTP_PORT),
  secure: false,
});
