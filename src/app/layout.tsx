import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SK Traders Trivandrum | Tiles, Waterproofing & Construction",
  description: "The leading choice in Trivandrum for premium interlocking tiles, durable waterproofing, and professional construction services. Quality you can trust from SK Traders.",
  keywords: ["Interlocking Tiles Trivandrum", "Waterproofing Services Kerala", "House Construction Trivandrum", "Tile Supplier Kerala", "SK Traders"],
  authors: [{ name: "SK Traders" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#E1AD01",
  alternates: {
    canonical: "https://sktraders.com", // Replace with your actual domain
  },
  openGraph: {
    title: "SK Traders Trivandrum | Tiles, Waterproofing & Construction",
    description: "Premium interlocking tiles, expert waterproofing, and professional construction services in Trivandrum.",
    url: "https://sktraders.com",
    siteName: "SK Traders",
    images: [
      {
        url: "/logo.png", // This will be the preview image on WhatsApp/Facebook
        width: 800,
        height: 600,
        alt: "SK Traders Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Traders Trivandrum | Tiles, Waterproofing & Construction",
    description: "Premium interlocking tiles, expert waterproofing, and professional construction services in Trivandrum.",
    images: ["/logo.png"],
  },
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

