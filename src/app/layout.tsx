import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppSidebar } from "@/components/home/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeNest",
  description: "An AI website for personalized financial insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
