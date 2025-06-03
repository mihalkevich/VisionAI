// src/app/(app)/explore/page.tsx (Redesigned Explore Page)
"use client";

import { Input } from "@/components/ui/input";
import ImageCard from "@/components/ImageCard";
import type { GeneratedImage } from "@/types";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock data - adjust to match new design's visual style
const categories = [
  { 
    name: "Abstract", 
    images: [
      { id: "abs1", prompt: "Flowing metallic waves", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "abstract waves" },
      { id: "abs2", prompt: "Geometric patterns in vibrant colors", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "geometric patterns" },
      { id: "abs3", prompt: "Nebula cloud formations", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "nebula clouds" },
    ],
  },
  { 
    name: "Fantasy", 
    images: [
      { id: "fan1", prompt: "Dragon overlooking a medieval castle", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "dragon castle" },
      { id: "fan2", prompt: "Elven city hidden in a bioluminescent forest", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "elven city" },
      { id: "fan3", prompt: "Mystical portal in an ancient ruin", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "mystical portal" },
    ],
  },
   { 
    name: "Comics", 
    images: [
      { id: "com1", prompt: "Dynamic superhero landing pose", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "superhero landing" },
      { id: "com2", prompt: "Gritty noir detective scene", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "noir detective" },
      { id: "com3", prompt: "Manga style character close-up", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "manga character" },
    ],
  },
];

const allExploreImages: GeneratedImage[] = categories.flatMap(cat => cat.images).sort(() => 0.5 - Math.random()).slice(0, 9); // Shuffle and take 9 for main gallery

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Explore</h1>
        {/* Optional: Add filters or sort button here */}
      </header>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search e.g. 'Cyberpunk City'"
          className="pl-10 form-input !h-11"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      </div>

      {categories.map((category) => (
        <section key={category.name}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">{category.name}</h2>
            <Link href={`/explore/${category.name.toLowerCase()}`} legacyBehavior>
              <a className="text-xs text-primary hover:underline flex items-center">
                See All <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </Link>
          </div>
          <div className="flex overflow-x-auto space-x-3 pb-2 -mx-4 px-4 hide-scrollbar">
            {category.images.map((image) => (
              <div key={image.id} className="min-w-[180px] sm:min-w-[220px]">
                <ImageCard image={image} variant="medium" />
              </div>
            ))}
          </div>
        </section>
      ))}
      
      <section>
        <h2 className="text-lg font-semibold mb-3">Discover More</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
           {allExploreImages.map((image) => (
            <ImageCard key={image.id} image={image} variant="medium" />
          ))}
        </div>
      </section>
    </div>
  );
}
