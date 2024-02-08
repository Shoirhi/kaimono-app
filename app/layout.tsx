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
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
