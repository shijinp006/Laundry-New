import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Geist_Mono, Russo_One } from "next/font/google";
import { ScrollProvider } from "@/components/scroll-provider";
import { PageLoader } from "@/components/page-loader";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const russoOne = Russo_One({
  variable: "--font-russo",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wash Zone Laundry — pickup, wash & delivery in 24h",
  description:
    "Wash, dry, fold, press and dry cleaning picked up at your door and returned within 24 hours.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} ${geistMono.variable} ${russoOne.variable} antialiased`}
    >
      <head>
        {/* AOS hides [data-aos] elements until its JS runs — reveal them if it never does. */}
        <noscript>
          <style>{`[data-aos]{opacity:1!important;transform:none!important;}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col font-sans" suppressHydrationWarning>
        <PageLoader />
        <ScrollProvider />
        {children}
      </body>
    </html>
  );
}

