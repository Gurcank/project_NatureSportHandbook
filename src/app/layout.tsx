import type { Metadata } from "next";
import { Geist, Geist_Mono, Kalam } from "next/font/google";
import Navigation from "@/components/Navigation";
import BackgroundProvider from "@/components/BackgroundProvider";
import { SettingsProvider } from "@/context/SettingsContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Nature & Sport Handbook",
  description: "Field-ready notes for nature and sport explorers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${kalam.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <SettingsProvider>
          <Navigation />
          <BackgroundProvider>
            {children}
          </BackgroundProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
