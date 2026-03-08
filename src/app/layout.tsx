import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SK Traders | Premium Interlocking Tiles in Trivandrum",
  description: "Durable and stylish interlocking tiles for your dream spaces. Leading tile supplier in Trivandrum, Kerala.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

