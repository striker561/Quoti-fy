import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import HomeNavBar from "@/components/pages/home/NavBar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title:
    process.env.APP_NAME +
    " || Generate the right quote that fits your mood and day",
  description: "Free and NOT-AI powered quote generator, I was bored i guess.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <HomeNavBar />
        {children}
      </body>
    </html>
  );
}
