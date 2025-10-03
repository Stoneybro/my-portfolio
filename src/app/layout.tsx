import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "stoneybro · Zion Livingstone",
    template: "%s · stoneybro",
  },
  description:
    "Portfolio of Zion Livingstone – Solidity & Frontend developer focused on secure, scalable, and user-friendly Web3 applications.",
  keywords: [
    "Solidity developer",
    "frontend developer",
    "smart contracts",
    "ERC4337",
    "account abstraction",
    "Next.js",
    "React",
    "Web3 portfolio",
    "Ethereum",
    "Base blockchain",
  ],
  authors: [{ name: "Zion Livingstone (Stoneybro)" }],
  creator: "Zion Livingstone",
  publisher: "Stoneybro Portfolio",
  openGraph: {
    type: "website",
    url: "https://stoneybro.dev/",
    title: "Stoneybro Portfolio",
    description:
      "Portfolio of Stoneybro (Zion Livingstone), a Solidity and frontend developer building secure, scalable Web3 applications. Focused on smart contracts, account abstraction, and modern frontend engineering.",
    siteName: "Stoneybro Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stoneybro Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stoneybro Portfolio",
    description:
      "Portfolio of Stoneybro (Zion Livingstone), a Solidity and frontend developer building secure, scalable Web3 applications. Focused on smart contracts, account abstraction, and modern frontend engineering.",
    creator: "@z__stone",
    images: ["https://stoneybro.dev/og-image.png"],
  },
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-icon.png"],
  },
  metadataBase: new URL("https://stoneybro.dev/"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-neutral-200`}
      >
        <SiteNav />
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
