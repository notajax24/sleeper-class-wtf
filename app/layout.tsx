import { Analytics } from "@vercel/analytics/next";
import { Inter, Noto_Serif_Devanagari } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import bg from "../assets/bg.png";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "700"],
  variable: "--font-devanagari",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sleeperclass.wtf"),
  icons: {
    shortcut: "/favicon.ico",
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  title: "स्लीपर क्लास | SleeperClass.wtf — Indian train night radio",
  description:
    "A dreamy Indian sleeper train radio for night journeys, window seats, ambient music, and the long way home.",
  keywords: [
    "SleeperClass",
    "स्लीपर क्लास",
    "Indian train music",
    "night radio",
    "ambient train music",
    "lofi India",
  ],
  applicationName: "SleeperClass.wtf",
  authors: [{ name: "SleeperClass" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "स्लीपर क्लास | SleeperClass.wtf",
    description: "Ambient music for Indian train journeys after dark.",
    url: "https://sleeperclass.wtf",
    siteName: "SleeperClass.wtf",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: bg.src,
        width: 1080,
        height: 810,
        alt: "Moonlit Indian sleeper train interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "स्लीपर क्लास | SleeperClass.wtf",
    description: "Ambient music for Indian train journeys after dark.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4baff711a4b2e362773a0700479ce9bc-SvJvZvafhJxPYXYEzcuvlsLfI0DE3z.jpg",
    ],
  },
  robots: { index: true, follow: true },
  generator: "v0.app",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#171126",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="dark">
      <body
        className={`${inter.variable} ${devanagari.variable} font-sans antialiased bg-[#171126] text-white overflow-hidden`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "SleeperClass.wtf",
              alternateName: "स्लीपर क्लास",
              url: "https://sleeperclass.wtf",
              description:
                "Ambient music for Indian train journeys after dark.",
            }),
          }}
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
