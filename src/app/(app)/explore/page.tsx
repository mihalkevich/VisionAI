// src/app/(app)/explore/page.tsx
"use client";

import { Input } from "@/components/ui/input";
import ImageCard from "@/components/ImageCard";
import type { GeneratedImage } from "@/types";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";

// Mock data
const categories = [
  { 
    name: "Abstract", 
    images: [
      { id: "abs1", prompt: "Abstract flow", imageUrl: "https://placehold.co/300x200.png", model: "Midjourney", timestamp: new Date(), dataAiHint: "abstract flow" },
      { id: "abs2", prompt: "Geometric shapes", imageUrl: "https://placehold.co/300x200.png", model: "OpenAI", timestamp: new Date(), dataAiHint: "geometric shapes" },
      { id: "abs3", prompt: "Fluid colors", imageUrl: "https://placehold.co/300x200.png", model: "Stable Diffusion", timestamp: new Date(), dataAiHint: "fluid colors" },
    ],
  },
  { 
    name: "Fantasy", 
    images: [
      { id: "fan1", prompt: "Dragon's lair", imageUrl: "https://placehold.co/300x200.png", model: "Midjourney", timestamp: new Date(), dataAiHint: "dragon lair" },
      { id: "fan2", prompt: "Elven city", imageUrl: "https://placehold.co/300x200.png", model: "OpenAI", timestamp: new Date(), dataAiHint: "elven city" },
      { id: "fan3", prompt: "Mystical forest", imageUrl: "https://placehold.co/300x200.png", model: "Stable Diffusion", timestamp: new Date(), dataAiHint: "mystical forest" },
    ],
  },
   { 
    name: "Comics", 
    images: [
      { id: "com1", prompt: "Superhero action", imageUrl: "https://placehold.co/300x200.png", model: "Midjourney", timestamp: new Date(), dataAiHint: "superhero action" },
      { id: "com2", prompt: "Comic panel", imageUrl: "https://placehold.co/300x200.png", model: "OpenAI", timestamp: new Date(), dataAiHint: "comic panel" },
      { id: "com3", prompt: "Graphic novel style", imageUrl: "https://placehold.co/300x200.png", model: "Stable Diffusion", timestamp: new Date(), dataAiHint: "graphic novel" },
    ],
  },
];

const allExploreImages: GeneratedImage[] = categories.flatMap(cat => cat.images).slice(0,9); // Show a mix for main gallery

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for inspiration..."
          className="pl-10 bg-input border-border focus:ring-primary h-12 text-base"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      </div>

      {categories.map((category) => (
        <section key={category.name}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <Link href={`/explore/${category.name.toLowerCase()}`} legacyBehavior>
              <a className="text-sm text-primary hover:underline flex items-center">
                See All <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </Link>
          </div>
          <div className="flex overflow-x-auto space-x-3 pb-2 -mx-4 px-4">
            {category.images.map((image) => (
              <div key={image.id} className="min-w-[180px] sm:min-w-[220px]">
                <ImageCard image={image} variant="medium" />
              </div>
            ))}
          </div>
        </section>
      ))}
      
      <section>
        <h2 className="text-xl font-semibold mb-3">Discover More</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
           {allExploreImages.map((image) => (
            <ImageCard key={image.id} image={image} variant="medium" />
          ))}
        </div>
      </section>
    </div>
  );
}
