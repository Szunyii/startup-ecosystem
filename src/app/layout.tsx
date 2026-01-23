import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import MaxWidthWraper from "@/components/MaxWidthWrapper";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Fotter";
import BgImage from "@/components/BgImage";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  title: "National Innovation Agency",
  description: "National Innovation Agency's startup database",
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
        <div className="backdrop-blur-2xl w-full h-full m-0 p-0">
          <BgImage />
          <MaxWidthWraper>
            <Navigation />
            {children}
          </MaxWidthWraper>

          <Footer />
        </div>
      </body>
      <GoogleAnalytics gaId="G-11RET9835Q" />
    </html>
  );
}
