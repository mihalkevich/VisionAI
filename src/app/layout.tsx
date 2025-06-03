import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'], // Added cyrillic
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Artifex - AI Powered Imagery',
  description: 'Experience the Future of AI-Powered Imagery',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        {/* Manrope font link can be removed as Inter is primary and Manrope is fallback via Tailwind config */}
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
