import CareersNavbar from "~/components/careers/CareersNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CareersNavbar />
      {children}
    </>
  );
}
