import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* Fonts are self-hosted from src/fonts so the site builds and runs
   completely offline — no Google Fonts request at build or runtime. */

const display = localFont({
  variable: "--font-display",
  display: "swap",
  src: [
    { path: "../fonts/cormorant-garamond-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/cormorant-garamond-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const body = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    {
      path: "../fonts/inter-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
});

const script = localFont({
  variable: "--font-script",
  display: "swap",
  src: [
    { path: "../fonts/great-vibes-latin-400-normal.woff2", weight: "400", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "For Angel 💗 Happy Valentine's Day",
  description:
    "A little corner of the internet built to say thank you to Angel Tan Lee Ying — for fifteen years of love as a wife and a mother.",
  openGraph: {
    title: "For Angel 💗",
    description: "Fifteen years of love, of giving, of you.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#12040b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${script.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
