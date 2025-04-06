import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const interSans = Inter({
  variable: "--font-inter",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | GorudenTaiga",
  description: "IT Web Developer & Game Developer Portfolio",
  keywords: ['reactjs', 'nextjs', 'react.js', 'next.js', 'portfolio', 'reza', 'reza arfana', 'reza ar', 'reza arfana rafi', 'gorudentaiga', 'goruden_taiga', 'programmer', 'web programmer', 'developer', 'web developer', 'game developer', 'game programmer', 'back-end engineer', 'backend engineer', 'back end engineer'],
  creator: 'GorudenTaiga',
  twitter: {
    card: 'summary_large_image',
    site: '@portfolio',
    creator: '@goruden_taiga',
    images: '/public/images/portfolio_thumbnail.png',
    title: 'Portfolio | GorudenTaiga',
  },
  applicationName: 'Portfolio',
  category: 'Portfolio',
  classification: 'Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
