import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./global.css";
import { ThemeProvider } from "../components/provider/theme-provider";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "eNearby",
  description: "All you need in nearby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${inter.variable}  antialiased`}>
            <div className="mx-auto px-4 md:0 max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl">
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange>
                <Navbar />
                {children}
                <Toaster />
                <Footer />
              </ThemeProvider>
            </div>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
