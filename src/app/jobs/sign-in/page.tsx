"use server";

import SignInUp from "~/components/SignInUp";
import { auth } from "~/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "~/components/global/Navbar";
import Footer from "~/components/global/Footer";

// Define the server action as a standalone function.
export async function signOutAction() {
  "use server";
  await auth.api.signOut({ headers: await headers() });
  redirect("/jobs/sign-in");
}

async function SignIn() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    return (
      <div>
        <p>Already signed in</p>
        <p>{session.user.email}</p>
        <form action={signOutAction}>
          <button type="submit">Sign out</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Navbar transparent={false} />
      <SignInUp />
      <Footer />
    </div>
  );
}

export default SignIn;
