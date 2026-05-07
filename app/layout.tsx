import { headers } from "next/headers";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import './globals.css';
import Backsound from "./components/Backsound";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

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

const THUMBNAILS = {
  private: process.env.NEXT_PUBLIC_PRIVATETHUMBNAIL,
  public: process.env.NEXT_PUBLIC_PUBLICTHUMBNAIL,
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host') ?? '';
  
  const privateUrl = process.env.NEXT_PUBLIC_PRIVATEURL ?? '';
  const isPrivate = privateUrl && host.includes(privateUrl);

  const displayName = isPrivate 
    ? process.env.NEXT_PUBLIC_PRIVATENAME
    : process.env.NEXT_PUBLIC_PUBLICNAME;
  
  const siteUrl = isPrivate ? 'https://rezaar.vercel.app' : 'https://gorudentaiga.vercel.app';
  const thumbnailUrl = isPrivate ? THUMBNAILS.private : THUMBNAILS.public;
  const title = `Portfolio | ${displayName}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${displayName}`,
    },
    description: 'IT Web Developer & Game Developer Portfolio – ' + displayName,
    keywords: [
      'reactjs', 'nextjs', 'react.js', 'next.js',
      'portfolio', 'reza', 'reza arfana', 'reza ar', 'reza arfana rafi',
      'gorudentaiga', 'goruden_taiga',
      'programmer', 'web programmer', 'developer', 'web developer',
      'game developer', 'game programmer',
      'back-end engineer', 'backend engineer', 'back end engineer',
    ],
    authors: [{ name: displayName, url: siteUrl }],
    creator: displayName,
    publisher: displayName,
    applicationName: title,
    category: 'Portfolio',
    classification: 'Portfolio',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      url: siteUrl,
      title,
      description: `IT Web Developer & Game Developer Portfolio – ${displayName}`,
      siteName: title,
      locale: 'en_US',
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: `${displayName} – Web & Game Developer Portfolio`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@goruden_taiga',
      creator: '@goruden_taiga',
      title,
      description: `IT Web Developer & Game Developer Portfolio – ${displayName}`,
      images: [
        {
          url: thumbnailUrl,
          alt: `${displayName} – Web & Game Developer Portfolio`,
        },
      ],
    },
  };
}

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
        <a href="#hero" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded z-50">Skip to content</a>
        <SpeedInsights />
        {children}
        <Backsound />
      </body>
    </html>
  );
}
