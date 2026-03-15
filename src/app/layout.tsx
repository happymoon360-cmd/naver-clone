import type { Metadata } from "next";
import "./globals.css";
import MobileHeader from "@/components/layout/MobileHeader";
import MetaPixel from "@/components/tracking/MetaPixel";
import { blogConfig } from "@/lib/blogConfig";

export const metadata: Metadata = {
  title: blogConfig.name,
  description: `${blogConfig.name} — ${blogConfig.description}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#f4f5f6] text-text antialiased">
        <MetaPixel />
        <div className="mx-auto flex min-h-screen w-full flex-col">
          <MobileHeader />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
