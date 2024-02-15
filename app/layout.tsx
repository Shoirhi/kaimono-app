import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";

export const runtime = "edge";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaimono-app.pages.dev"),
  title: "買い物",
  description: "買い物アプリ",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#b8e986" />
      </head>
      <body className="flex flex-col min-h-dvh overscroll-none">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
