"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "~/lib/auth";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signUp(formData: FormData) {
  const validatedFields = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid form data" };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        name: formData.get("name") as string,
      },
    });
  } catch (error) {
    return { error: "Failed to sign up. Please try again." };
  }
  redirect("/careers");
}

export async function signIn(formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { error: "Invalid email or password" };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
    });
  } catch (error) {
    return { error: "Failed to sign in. Please check your credentials." };
  }
  redirect("/careers/jobs");
}

export const isAdmin = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role !== "admin") {
    redirect("/not-authorized");
  }
};
