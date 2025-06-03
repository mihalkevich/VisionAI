// src/app/page.tsx (New Main Landing Page)
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react'; // For the "Batch" icon

export default function LandingPage() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center p-8 selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          The first fully equipped AI photo studio for people
        </h1>
        <p className="text-lg sm:text-xl text-neutral-300">
          Stop messing around with AI image generators with broken faces, low resemblance and inconsistent characters.
        </p>
        <p className="text-lg sm:text-xl text-neutral-300">
          Start producing high quality AI photographs instantly with Photo AI with consistent characters. For each model you create we give you lots of free photos.
        </p>
        <p className="text-lg sm:text-xl text-neutral-300">
          If you need thousands of photos created for many models fast that&apos;s also possible with our{' '}
          <Link href="/batch-feature" legacyBehavior>
            <a className="underline hover:text-primary transition-colors inline-flex items-center">
              <Package className="w-5 h-5 mr-1.5" />
              Batch image generation feature
            </a>
          </Link>
          .
        </p>
        <Link href="/auth" passHref legacyBehavior>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-primary-glow px-8 py-6 text-lg font-semibold mt-4">
            <a>Try Photo AI Free</a>
          </Button>
        </Link>
      </div>
      {/* Placeholder for the image section below the text, to be added later */}
      {/* <div className="mt-16 w-full max-w-5xl"> */}
      {/*   Image collage/mockup will go here */}
      {/* </div> */}
    </div>
  );
}
