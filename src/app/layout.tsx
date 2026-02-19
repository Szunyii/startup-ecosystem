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
  title: "Hungarian Innovation Agency",
  description: "Hungarian Innovation Agency's startup database",
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
        <div className=" w-full h-full p-0 m-0">
          <BgImage />
          <MaxWidthWraper>
            <Navigation />
            {children}
          </MaxWidthWraper>
        </div>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-11RET9835Q" />
    </html>
  );
}

// backdrop-blur-2xl
