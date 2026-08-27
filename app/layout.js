import { Fraunces, Inter, Space_Mono } from "next/font/google";
import SmoothScroll from "../components/SmoothScroll";
import Preloader from "../components/Preloader";
import PawCursorTrail from "../components/PawCursorTrail";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "NEKO CAFE — A Cafe for Cat People",
  description:
    "NEKO CAFE is a cat lounge and coffee room in Chicago. Slow coffee, warm laps, and resident cats looking for a forever home.",
  metadataBase: new URL("https://nekocafe.example.com"),
  openGraph: {
    title: "NEKO CAFE — A Cafe for Cat People",
    description:
      "Slow coffee, warm light, and a roomful of resident cats in Chicago. Book a session at the colony.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("neko-theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full bg-cream font-sans text-ink">
        <SmoothScroll>
          <Preloader />
          <PawCursorTrail />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
