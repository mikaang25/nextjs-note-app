import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const vt = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Matcha Notes",
  description: "A pixel art note application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${pixel.variable} ${vt.variable}`}>
      <body>{children}</body>
    </html>
  );
}