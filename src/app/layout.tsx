import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import MaxWidthWraper from "@/components/MaxWidthWrapper";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Fotter";
import SubscribePopup from "@/components/SubscribePopup";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Hungarian Startup Ecosystem`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Official portal of the Hungarian Innovation Agency (NIÜ): startup database, sector insights, funding opportunities and the legal library for the Hungarian innovation ecosystem.",
  applicationName: SITE_NAME,
  keywords: [
    "Hungarian Innovation Agency",
    "NIÜ",
    "Hungarian startups",
    "Hungary startup ecosystem",
    "startup database",
    "funding opportunities",
    "Hungary innovation",
    "scale-ups Hungary",
  ],
  authors: [{ name: SITE_NAME, url: "https://niu.hu" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: SITE_URL,
    title: `${SITE_NAME} — Hungarian Startup Ecosystem`,
    description:
      "Discover the Hungarian startup ecosystem: companies, sectors, funding and legal resources curated by the Hungarian Innovation Agency.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Hungarian Startup Ecosystem`,
    description:
      "Discover the Hungarian startup ecosystem: companies, sectors, funding and legal resources curated by the Hungarian Innovation Agency.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu-HU">
      <body
        className={` ${inter.variable} 
    ${roboto_mono.variable}
    bg-[#120937] antialiased grainy overflow-x-hidden `}
        cz-shortcut-listen="true"
      >
        <div className="w-full h-full p-0 m-0">
          {/* <BgImage /> */}
          <MaxWidthWraper>
            <Navigation />
            {children}
          </MaxWidthWraper>
          <SubscribePopup />
        </div>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-11RET9835Q" />
    </html>
  );
}

// backdrop-blur-2xl
