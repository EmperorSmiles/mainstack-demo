import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mainstack",
  description: "Submitted by Smiles Adejoh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <NavBar />
        <div className="flex w-full">
          <SideBar />
          <main className="w-full md:w-[90%] md:ml-[10%]">{children}</main>
        </div>
      </body>
    </html>
  );
}
