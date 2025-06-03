// src/app/(app)/home/page.tsx (Redesigned Home Screen based on new image)
"use client";

import { useState } from "react";
import type { GeneratedImage } from "@/types";
import { Button } from "@/components/ui/button";
import ImageCard from "@/components/ImageCard";
import { Sparkles, Wand2, Users, Image as ImageIcon, ChevronRight, Camera, Palette, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NextImage from "next/image"; // For the Image Generator card background
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const trendStylesData = [
  { id: "trend1", name: "Photo", imageUrl: "https://placehold.co/150x150.png", dataAiHint: "photo realistic" },
  { id: "trend2", name: "Illustration", imageUrl: "https://placehold.co/150x150.png", dataAiHint: "illustration art" },
  { id: "trend3", name: "Comic", imageUrl: "https://placehold.co/150x150.png", dataAiHint: "comic book" },
  { id: "trend4", name: "Abstract", imageUrl: "https://placehold.co/150x150.png", dataAiHint: "abstract art" },
  { id: "trend5", name: "Fantasy", imageUrl: "https://placehold.co/150x150.png", dataAiHint: "fantasy art" },
];

const imageTemplatesData: GeneratedImage[] = [
  { id: "template1", prompt: "Cyberpunk City Alley", imageUrl: "https://placehold.co/300x400.png", model: "Artifex", timestamp: new Date(), dataAiHint: "cyberpunk city" },
  { id: "template2", prompt: "Enchanted Forest Path", imageUrl: "https://placehold.co/300x400.png", model: "Artifex", timestamp: new Date(), dataAiHint: "enchanted forest" },
  { id: "template3", prompt: "Steampunk Contraption", imageUrl: "https://placehold.co/300x400.png", model: "Artifex", timestamp: new Date(), dataAiHint: "steampunk device" },
  { id: "template4", prompt: "Minimalist Abstract Shapes", imageUrl: "https://placehold.co/300x400.png", model: "Artifex", timestamp: new Date(), dataAiHint: "minimalist abstract" },
];

const communityInspirationsData: GeneratedImage[] = [
  { id: "community1", prompt: "Cosmic Nebula by @StarGazer", imageUrl: "https://placehold.co/600x400.png", model: "Artifex", timestamp: new Date(), dataAiHint: "cosmic nebula space", creatorName: "@StarGazer" },
  { id: "community2", prompt: "Mystical Creature by @DreamWeaver", imageUrl: "https://placehold.co/600x400.png", model: "Artifex", timestamp: new Date(), dataAiHint: "mystical creature fantasy", creatorName: "@DreamWeaver" },
];

const communityFilters = [
    { label: "All", icon: LayoutGrid, value: "all" },
    { label: "Characters", icon: Users, value: "characters" },
    { label: "Photography", icon: Camera, value: "photography" },
    { label: "Illustrations", icon: Palette, value: "illustrations" },
]

export default function HomePage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Image Generator Card Section */}
      <Card className="shadow-xl rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-card to-card border-border relative">
        <NextImage 
            src="https://placehold.co/600x300.png?text=Generator+BG" // Placeholder for subtle background
            alt="Generator Background"
            layout="fill"
            objectFit="cover"
            className="opacity-10 absolute inset-0 z-0"
            data-ai-hint="abstract gradient"
        />
        <div className="relative z-10 p-5 sm:p-6">
            <h2 className="text-xl font-semibold mb-1 text-foreground">Image Generator</h2>
            <p className="text-xs text-muted-foreground mb-4">Turn your ideas into stunning images</p>
            <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10 hover:text-primary h-10 px-5 text-sm rounded-lg"
                onClick={() => router.push('/generate')}
            >
                Generate
            </Button>
        </div>
      </Card>

      {/* Try Trend Styles Section */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Try Trend Styles</h2>
          <Link href="/explore/trends" legacyBehavior>
            <a className="text-xs text-primary hover:underline flex items-center">
              See All <ChevronRight className="w-3 h-3 ml-0.5" />
            </a>
          </Link>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-2 -mx-4 px-4 hide-scrollbar">
          {trendStylesData.map((style) => (
            <Link key={style.id} href={`/generate?style=${style.name.toLowerCase()}`} legacyBehavior>
              <a className="flex flex-col items-center space-y-1.5 min-w-[80px] sm:min-w-[90px] group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shadow-md hover:shadow-primary/20 transition-all transform group-hover:scale-105 bg-card">
                  <NextImage src={style.imageUrl} alt={style.name} width={100} height={100} className="object-cover w-full h-full" data-ai-hint={style.dataAiHint}/>
                </div>
                <p className="text-2xs text-muted-foreground group-hover:text-primary">{style.name}</p>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* Image Template Section */}
      <section>
         <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Image Template</h2>
           <Link href="/explore/templates" legacyBehavior>
            <a className="text-xs text-primary hover:underline flex items-center">
              See All <ChevronRight className="w-3 h-3 ml-0.5" />
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {imageTemplatesData.slice(0, 2).map((image) => ( // Show 2, can be more
            <ImageCard key={image.id} image={image} variant="square" />
          ))}
        </div>
      </section>

      {/* Get Inspired from Community Section */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Get Inspired from Community</h2>
          {/* "See All" link could be added here if needed */}
        </div>
        <div className="flex overflow-x-auto space-x-2 mb-4 pb-1 hide-scrollbar -mx-2 px-2">
            {communityFilters.map(filter => {
                const Icon = filter.icon;
                return (
                    <Button 
                        key={filter.value}
                        variant={activeFilter === filter.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveFilter(filter.value)}
                        className={`h-9 px-3 text-xs rounded-lg ${activeFilter === filter.value ? 'bg-primary text-primary-foreground shadow-primary-glow' : 'border-muted text-muted-foreground hover:border-primary hover:text-primary'}`}
                    >
                        <Icon className="w-3.5 h-3.5 mr-1.5"/>
                        {filter.label}
                    </Button>
                )
            })}
        </div>
        <div className="space-y-4">
          {communityInspirationsData.map((image) => (
            <ImageCard key={image.id} image={image} variant="large" />
          ))}
        </div>
      </section>
    </div>
  );
}
