import AdminNavbar from "~/components/admin/AdminNavbar";
import CareersNavbar from "~/components/careers/CareersNavbar";
import { isAdmin } from "~/server/actions/authentication";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await isAdmin();
  return (
    <>
      <CareersNavbar />
      <AdminNavbar> {children} </AdminNavbar>
    </>
  );
}
