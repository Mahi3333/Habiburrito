import type { Metadata } from "next";
import { Outfit, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Habiburrito | Charcoal Halal Taqueria",
  description:
    "Charcoal-fired halal burritos, bowls, and chef-crafted experiences with gold-label hospitality.",
  metadataBase: new URL("https://habiburrito.example.com"),
  openGraph: {
    title: "Habiburrito | Charcoal Halal Taqueria",
    description:
      "Where smoky mezcal nights meet halal fire — reserve, build, and savor in cinematic warmth.",
    url: "https://habiburrito.example.com",
    siteName: "Habiburrito",
    images: [
      {
        url: "/menu-items/burrito-special.jpg",
        width: 1200,
        height: 630,
        alt: "Charcoal-fired halal burrito draped in gold light",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Habiburrito | Charcoal Halal Taqueria",
    description:
      "Premium halal burritos and bowls with immersive hospitality and ember-lit storytelling.",
    images: ["/menu-items/bowl-signature.jpg"],
  },
  themeColor: "#0b0b0b",
};

import { CartProvider } from "../context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} ${playfair.variable} font-sans antialiased bg-brand-night text-brand-cream`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
