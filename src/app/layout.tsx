import type { Metadata } from "next";

import "./globals.css";
import { Inter as InterFont, Space_Grotesk } from "next/font/google"
import Navbar from "./components/Navbar";

const inter = InterFont({
  subsets: ['latin']
})
const spaceGrotsek=Space_Grotesk({
  subsets: ['latin'],
  weight:['300','400','500','600','700']
})
export const metadata: Metadata = {
  title: "Price Spy",
  description: "Track or spies the price of teh product price on the online stores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <main className="max-w-10xl mx-auto">
          <Navbar/>
        {children}
        </main>
        
      </body>
    </html>
  );
}
