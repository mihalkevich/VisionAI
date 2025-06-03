// src/app/page.tsx (New Main Landing Page)
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Package, Star } from 'lucide-react';
import NextImage from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const showcaseImages = [
  { src: "https://placehold.co/600x800.png", alt: "Futuristic portrait", dataAiHint: "futuristic portrait" },
  { src: "https://placehold.co/600x400.png", alt: "Fantasy landscape", dataAiHint: "fantasy landscape" },
  { src: "https://placehold.co/600x600.png", alt: "Abstract art", dataAiHint: "abstract art" },
  { src: "https://placehold.co/400x600.png", alt: "Sci-fi character", dataAiHint: "sci-fi character" },
  { src: "https://placehold.co/800x600.png", alt: "Detailed object", dataAiHint: "detailed object" },
  { src: "https://placehold.co/600x400.png", alt: "Animal portrait", dataAiHint: "animal portrait" },
];

const testimonials = [
  {
    quote: "Artifex has revolutionized how I create concept art. The speed and quality are unmatched!",
    name: "Jane Doe",
    title: "Lead Artist, DreamWorks",
    avatarSrc: "https://placehold.co/100x100.png?text=JD",
    dataAiHint: "profile avatar",
    stars: 5,
  },
  {
    quote: "The consistency in character generation is a game-changer for my comic book projects.",
    name: "John Smith",
    title: "Indie Comic Creator",
    avatarSrc: "https://placehold.co/100x100.png?text=JS",
    dataAiHint: "profile avatar",
    stars: 5,
  },
  {
    quote: "I can finally produce thousands of high-quality AI photos for my models quickly. The batch feature is incredible.",
    name: "Alex Chen",
    title: "E-commerce Entrepreneur",
    avatarSrc: "https://placehold.co/100x100.png?text=AC",
    dataAiHint: "profile avatar",
    stars: 4,
  },
];

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col items-center p-4 sm:p-8 selection:bg-primary selection:text-primary-foreground">
      <main className="w-full max-w-5xl">
        {/* Hero Section */}
        <section className="text-center py-16 sm:py-24 space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            The first fully equipped AI photo studio for people
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Stop messing around with AI image generators with broken faces, low resemblance and inconsistent characters.
          </p>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Start producing high quality AI photographs instantly with Photo AI with consistent characters. For each model you create we give you lots of free photos.
          </p>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
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
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-primary-glow px-8 py-3 h-12 text-base font-semibold mt-4">
              <a>Try Photo AI Free</a>
            </Button>
          </Link>
        </section>

        {/* Photo Showcase Section */}
        <section className="py-16 sm:py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12">See What You Can Create</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {showcaseImages.map((image, index) => (
              <div key={index} className={`rounded-xl overflow-hidden shadow-lg aspect-[3/4] ${index === 0 || index === 4 ? 'sm:col-span-1 sm:row-span-2' : 'sm:col-span-1'}`}>
                <NextImage
                  src={image.src}
                  alt={image.alt}
                  width={index === 0 || index === 4 ? 600 : 400} // Adjusted for potential larger images
                  height={index === 0 || index === 4 ? 800 : 533}
                  className="object-cover w-full h-full"
                  data-ai-hint={image.dataAiHint}
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 sm:py-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12">Loved by Creators Worldwide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card p-6 rounded-xl shadow-lg flex flex-col">
                <CardContent className="flex-grow p-0 space-y-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                    ))}
                  </div>
                  <p className="text-base text-foreground leading-relaxed">&quot;{testimonial.quote}&quot;</p>
                </CardContent>
                <div className="mt-6 flex items-center space-x-3 pt-4 border-t border-border">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                    <AvatarFallback>{testimonial.name.substring(0,1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="text-center py-10 mt-10 border-t border-border w-full">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Artifex AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
