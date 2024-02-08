import type { Metadata } from "next";
import "./globals.css";

export const runtime = 'edge';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen">
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
