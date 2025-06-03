
// src/app/page.tsx (New Main Landing Page)
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Added Input
import { Package, Star, ArrowRight, Pencil, Sparkles, Camera, Film, Heart, SlidersHorizontal } from 'lucide-react'; // Added SlidersHorizontal
import NextImage from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const showcaseImages = [
  { src: "https://images.unsplash.com/photo-1667835949495-78a1ea9ecd77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtaWRqb3VybmV5fGVufDB8fHx8MTc0ODk3ODc0OXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Futuristic portrait", dataAiHint: "futuristic portrait" },
  { src: "https://images.unsplash.com/photo-1636690581110-a512fed05fd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxhaXxlbnwwfHx8fDE3NDg4ODg2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Fantasy landscape", dataAiHint: "fantasy landscape" },
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

const features = [
    { icon: <Pencil className="w-5 h-5 text-primary inline-block mr-2" />, text: "Upload your selfies \u2192 Create an AI model of yourself" },
    { icon: <Sparkles className="w-5 h-5 text-yellow-400 inline-block mr-2" />, text: "Or create 100% AI influencers to monetize them" },
    { icon: <Camera className="w-5 h-5 text-blue-400 inline-block mr-2" />, text: "Take 100% AI photos with yourself in any pose, place or action" },
    { icon: <Film className="w-5 h-5 text-purple-400 inline-block mr-2" />, text: "Create 100% AI videos from any AI photo you take" },
    { icon: <Heart className="w-5 h-5 text-red-500 fill-red-500 inline-block mr-2" />, text: "Run photo packs like Hinge or Tinder" },
];

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col items-center selection:bg-primary selection:text-primary-foreground">
      <main className="w-full max-w-5xl"> {/* Removed pb-28 */}
        {/* New Hero Section */}
        <section className="w-full">
          <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] md:aspect-[2.5/1] max-h-[500px] overflow-hidden">
            <NextImage
              src="https://placehold.co/1200x600.png" // Placeholder for the hero image
              alt="AI generated man"
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="man waterfall"
            />
          </div>
          <div className="bg-background p-6 sm:p-8 md:p-10 text-left space-y-5 max-w-2xl mx-auto sm:mx-0 sm:max-w-none">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold flex items-center">
              Start taking AI photos now <ArrowRight className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 ml-2" />
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Generate photorealistic images and videos of people with AI.
            </p>
            <ul className="space-y-2.5 text-sm sm:text-base">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mt-0.5">{feature.icon}</span>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
            <Link href="/auth" passHref legacyBehavior>
              <Button asChild size="lg" className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow px-8 py-3 h-auto text-base sm:text-lg font-semibold mt-4 group">
                <a>
                  Start taking AI photos now <ArrowRight className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </Link>
          </div>
        </section>

        {/* Photo Showcase Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-12">See What You Can Create</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {showcaseImages.map((image, index) => (
              <div key={index} className={`rounded-xl overflow-hidden shadow-lg aspect-[3/4] ${index === 0 || index === 4 ? 'sm:col-span-1 sm:row-span-2' : 'sm:col-span-1'}`}>
                <NextImage
                  src={image.src}
                  alt={image.alt}
                  width={index === 0 || index === 4 ? 600 : 400}
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
        <section className="py-16 sm:py-20 px-4 sm:px-0">
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

      {/* Sticky Bottom Bar - REMOVED */}

      <footer className="bg-black text-neutral-400 text-center py-10 w-full">
        <div className="container mx-auto max-w-5xl px-4">
            <h3 className="text-lg font-semibold text-white mb-2">PHOTO AI™</h3>
            <p className="text-xs">
            Photo AI™ is a registered trademark. Formerly known as Avatar AI. ©{new Date().getFullYear()}. Terms of Service and Privacy Policy.
            </p>
        </div>
      </footer>
    </div>
  );
}

