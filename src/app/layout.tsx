import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Poppins } from "next/font/google";
import { type Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"], // Specify weights as needed
});

import { Playfair_Display as PlayfairDisplay } from "next/font/google";

const playfairDisplay = PlayfairDisplay({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700"], // Specify weights as needed
});
export const metadata: Metadata = {
  title: "Magna Specialist Confectioners",
  description: "Chocolate co-manufacturing company based in Telford, UK",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${poppins.variable} ${playfairDisplay.variable}`}
    >
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
