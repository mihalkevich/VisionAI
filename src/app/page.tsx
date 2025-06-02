// src/app/page.tsx (Welcome Screen Placeholder)
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <div className="relative flex flex-col items-center justify-end min-h-screen bg-background text-foreground p-8 overflow-hidden">
      {/* Background Image Grid */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2 opacity-30 transform scale-110 blur-sm">
          {[...Array(49)].map((_, i) => (
            <div key={i} className="aspect-square bg-card rounded-md overflow-hidden">
              <Image
                src={`https://placehold.co/300x300.png?text=Art${i}`}
                alt={`Placeholder art ${i}`}
                width={300}
                height={300}
                className="object-cover w-full h-full"
                data-ai-hint="abstract art"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          Experience the Future of <br /> AI-Powered Imagery
        </h1>
        <p className="text-muted-foreground mb-8">
          Enhance and transform visuals effortlessly with smart AI-powered tools.
        </p>
        
        <Link href="/home" legacyBehavior passHref>
          <Button className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mb-4">
            Try it now
          </Button>
        </Link>

        <div className="flex items-center text-sm text-muted-foreground">
          <span>Already have an account?</span>
          <Link href="/login" legacyBehavior passHref>
            <Button variant="link" className="text-primary pl-1">Log In</Button>
          </Link>
        </div>
      </div>
       <p className="z-10 text-xs text-muted-foreground mt-12">&copy; {new Date().getFullYear()} Artifex. All rights reserved.</p>
    </div>
  );
}
