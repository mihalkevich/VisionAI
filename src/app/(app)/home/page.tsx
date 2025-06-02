// src/app/(app)/home/page.tsx (New Home Screen)
"use client";

import { useState } from "react";
import type { AiModel, GeneratedImage } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageCard from "@/components/ImageCard";
import { Sparkles, Wand2, Users, Image as ImageIcon, ChevronRight } from "lucide-react";
import Link from "next/link";

// Mock data - replace with actual data fetching
const trendStyles: GeneratedImage[] = [
  { id: "trend1", prompt: "Cyberpunk Portrait", imageUrl: "https://placehold.co/300x400.png", model: "Midjourney", timestamp: new Date(), dataAiHint: "cyberpunk portrait" },
  { id: "trend2", prompt: "Vintage Photo Effect", imageUrl: "https://placehold.co/300x400.png", model: "OpenAI", timestamp: new Date(), dataAiHint: "vintage photo" },
  { id: "trend3", prompt: "Anime Character", imageUrl: "https://placehold.co/300x400.png", model: "Stable Diffusion", timestamp: new Date(), dataAiHint: "anime character" },
  { id: "trend4", prompt: "Fantasy Landscape Art", imageUrl: "https://placehold.co/300x400.png", model: "Midjourney", timestamp: new Date(), dataAiHint: "fantasy landscape" },
];

const imageTemplates: GeneratedImage[] = [
  { id: "template1", prompt: "Ocean Sunset", imageUrl: "https://placehold.co/400x300.png", model: "Midjourney", timestamp: new Date(), dataAiHint: "ocean sunset" },
  { id: "template2", prompt: "Forest Path", imageUrl: "https://placehold.co/400x300.png", model: "OpenAI", timestamp: new Date(), dataAiHint: "forest path" },
  { id: "template3", prompt: "City Skyline", imageUrl: "https://placehold.co/400x300.png", model: "Stable Diffusion", timestamp: new Date(), dataAiHint: "city skyline" },
  { id: "template4", prompt: "Abstract Swirls", imageUrl: "https://placehold.co/400x300.png", model: "Midjourney", timestamp: new Date(), dataAiHint: "abstract swirls" },
];

const communityInspirations: GeneratedImage[] = [
  { id: "community1", prompt: "User generated art 1", imageUrl: "https://placehold.co/600x400.png", model: "Midjourney", timestamp: new Date(), dataAiHint: "community art" },
  { id: "community2", prompt: "User generated art 2", imageUrl: "https://placehold.co/600x400.png", model: "OpenAI", timestamp: new Date(), dataAiHint: "creative design" },
];


export default function HomePage() {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    // Navigate to generate page with prompt, or handle generation here
    console.log("Generating image for prompt:", prompt);
    // For now, just log. Navigation or modal would go here.
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Image Terminator Section */}
      <section className="bg-card p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-3 flex items-center"><Wand2 className="w-5 h-5 mr-2 text-primary" /> Image Terminator</h2>
        <p className="text-sm text-muted-foreground mb-3">Turn your ideas into stunning visuals.</p>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Describe what you want to create..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-input border-border focus:ring-primary"
          />
          <Button onClick={handleGenerate} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Generate
          </Button>
        </div>
      </section>

      {/* Try Trend Styles Section */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold flex items-center"><Sparkles className="w-5 h-5 mr-2 text-primary" /> Try Trend Styles</h2>
          <Link href="/explore/trends" legacyBehavior><a className="text-sm text-primary hover:underline flex items-center">See All <ChevronRight className="w-4 h-4 ml-1" /></a></Link>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-2 -mx-4 px-4">
          {trendStyles.map((image) => (
            <div key={image.id} className="min-w-[120px] sm:min-w-[150px]">
             <ImageCard image={image} variant="small" />
            </div>
          ))}
        </div>
      </section>

      {/* Image Template Section */}
      <section>
         <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold flex items-center"><ImageIcon className="w-5 h-5 mr-2 text-primary" /> Image Template</h2>
           <Link href="/explore/templates" legacyBehavior><a className="text-sm text-primary hover:underline flex items-center">See All <ChevronRight className="w-4 h-4 ml-1" /></a></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {imageTemplates.map((image) => (
            <ImageCard key={image.id} image={image} variant="medium" />
          ))}
        </div>
      </section>

      {/* Get Inspired from Community Section */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold flex items-center"><Users className="w-5 h-5 mr-2 text-primary" /> Get Inspired from Community</h2>
          <Link href="/explore/community" legacyBehavior><a className="text-sm text-primary hover:underline flex items-center">See All <ChevronRight className="w-4 h-4 ml-1" /></a></Link>
        </div>
        <div className="space-y-4">
          {communityInspirations.map((image) => (
            <ImageCard key={image.id} image={image} variant="large" />
          ))}
        </div>
      </section>
       <footer className="text-center py-6 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Artifex. All rights reserved.</p>
      </footer>
    </div>
  );
}
