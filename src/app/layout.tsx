import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import MaxWidthWraper from "@/components/MaxWidthWrapper";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Fotter";
import BgImage from "@/components/BgImage";
import { GoogleAnalytics } from "@next/third-parties/google";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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

//  bg-[length:100%_100vh]
//     bg-repeat-y
//      backdrop-blur-2xl

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu-HU">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased #5D3DFF00 #5D3DFF00`}
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
      <GoogleAnalytics gaId="G-41SDPF4YC4" />
    </html>
  );
}

// bg-gradient-to-b
//     from-[#091737]/95     from-5%
//     via-[#3b23b3]/95  via-55%
//     to-[#091737]/95   to-95%
//     bg-[length:100%_100vh]
//     bg-repeat-y
