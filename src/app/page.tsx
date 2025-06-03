// src/app/page.tsx (Welcome Screen Placeholder)
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <div className="relative flex flex-col items-center justify-end min-h-screen bg-background text-foreground p-6 overflow-hidden">
      {/* Background Image Grid */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-1.5 opacity-25 transform scale-105 blur-xs">
          {[...Array(49)].map((_, i) => (
            <div key={i} className="aspect-square bg-card rounded-sm overflow-hidden">
              <Image
                src={`https://placehold.co/200x200.png?text=Art${i}`}
                alt={`Placeholder art ${i}`}
                width={200}
                height={200}
                className="object-cover w-full h-full"
                data-ai-hint="abstract art"
                priority={i < 10}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-3 leading-snug">
          Experience the Future of <br /> AI-Powered Imagery
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Enhance and transform visuals effortlessly with smart AI-powered tools.
        </p>
        
        <Link href="/home" legacyBehavior passHref>
          <Button asChild className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mb-3">
            <a>Try it now</a>
          </Button>
        </Link>

        <div className="flex items-center text-xs text-muted-foreground">
          <Link href="/login" legacyBehavior passHref>
            <a> {/* Wrap the span and button in an anchor tag */}
              <span>Already have an account?</span>
              <Button variant="link" className="text-primary pl-1 text-xs" asChild>
                <span>Log In</span>
              </Button>
            </a>
          </Link>
        </div>
      </div>
       <p className="z-10 text-2xs text-muted-foreground mt-10">&copy; {new Date().getFullYear()} Artifex. All rights reserved.</p>
    </div>
  );
}
