import type { Metadata } from "next";
import "./globals.css";
import MobileHeader from "@/components/layout/MobileHeader";

export const metadata: Metadata = {
  title: "Naver Blog Clone",
  description: "Mobile-first Naver Blog style article page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#f4f5f6] text-text antialiased">
        <div className="mx-auto flex min-h-screen w-full flex-col">
          <MobileHeader />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
