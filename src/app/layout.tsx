import Header from "@/ui-components/header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeerGram - Social Media App By Nihal Padwal",
  description: "Generated and create by Nihal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="red" crawl={false} />
        <Header />
        {children}
      </body>
    </html>
  );
}
