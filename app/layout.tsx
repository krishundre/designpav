import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DesignPav | Coming Soon",
  description:
    "DesignPav is launching soon. We design and develop premium websites, web applications, and digital experiences.",
  keywords: [
    "DesignPav",
    "web design",
    "web development",
    "digital agency",
    "coming soon",
    "premium websites",
  ],
  authors: [{ name: "Krish Undre", url: "https://krishundre.vercel.app/" }],
  creator: "Krish Undre",
  publisher: "Krish Undre",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://designpav.in",
    siteName: "DesignPav",
    title: "DesignPav | Coming Soon",
    description:
      "DesignPav is launching soon. We design and develop premium websites, web applications, and digital experiences.",
    images: [
      {
        url: "/logo.png",
        width: 1920,
        height: 1080,
        alt: "DesignPav – Creative Digital Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DesignPav | Coming Soon",
    description:
      "DesignPav is launching soon. We design and develop premium websites, web applications, and digital experiences.",
    images: ["/logo.png"],
    creator: "@designpav",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.png",
  },
  metadataBase: new URL("https://designpav.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        {/* Skip to content – accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#6D5EF8] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
