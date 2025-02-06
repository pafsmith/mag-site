import { signUp } from "~/server/actions";

function SignUp() {
  return (
    <form action={signUp} className="border-1 flex flex-col gap-2">
      <input type="email" name="email" />
      <input type="password" name="password" />
      <input type="text" name="name" />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export { SignUp };
