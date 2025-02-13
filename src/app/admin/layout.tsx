import AdminNavbar from "~/components/admin/AdminNavbar";
import CareersNavbar from "~/components/careers/CareersNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CareersNavbar />
      <AdminNavbar> {children} </AdminNavbar>
    </>
  );
}
