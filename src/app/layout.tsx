import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { RevealProvider } from "@/components/Reveal";
import { site } from "@/lib/site";
import "./globals.css";

const instrument = localFont({
  src: "./fonts/instrumentserif-latin.woff2",
  variable: "--font-instrument",
  display: "swap",
  weight: "400",
});

const sora = localFont({
  src: "./fonts/sora-latin.woff2",
  variable: "--font-sora",
  display: "swap",
  weight: "300 700",
});

export const metadata: Metadata = {
  title: `${site.full} | ${site.base}`,
  description: `${site.role} based in ${site.base}, covering ${site.covers}.`,
  robots: { index: false, follow: false },
  openGraph: {
    title: `${site.full} | ${site.base}`,
    description: `${site.role} based in ${site.base}, covering ${site.covers}.`,
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${instrument.variable} ${sora.variable}`}>
      <body>
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Last in the tree: effects commit bottom up, so the observer only
            starts once the page it marks has hydrated. */}
        <RevealProvider />
      </body>
    </html>
  );
}
