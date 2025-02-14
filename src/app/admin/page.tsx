import { isAdmin } from "~/server/actions/authentication";

export default async function adminPage() {
  await isAdmin();
  return <div>Test</div>;
}
