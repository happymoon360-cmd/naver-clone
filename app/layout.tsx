import type { Metadata } from "next";
// import "./globals.css"; // Already imported in real file, rewriting full content
import { Header } from "@/components/layout/Header";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "My Naver Blog Clone",
  description: "A clone of Naver Blog functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 min-h-screen text-slate-900`}>
        {/* Mobile Container - Centered, 430px max width */}
        <div className="max-w-[430px] mx-auto bg-white min-h-screen shadow-lg flex flex-col relative">
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
