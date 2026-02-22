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
      <body className="min-h-screen bg-bg text-text antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-[740px] flex-col bg-white">
          <MobileHeader />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
