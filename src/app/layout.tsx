import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Naver Blog Clone",
  description: "Pixel-perfect clone of Naver Blog UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-gray-100 flex justify-center">
        <div className="w-full max-w-[768px] bg-white min-h-screen shadow-lg flex flex-col">
          <MobileHeader />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
