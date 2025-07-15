import "../styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import HomeNavBar from "@/components/pages/home/NavBar";
import { ThemeProvider } from "@/components/theme/provider";
import { Toaster } from "react-hot-toast";

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
    <SessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-right" containerClassName="text-[12px]" />
            <HomeNavBar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
