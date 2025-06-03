// src/app/(app)/home/page.tsx (Redesigned Home Screen)
"use client";

import { useState, useEffect } from "react";
import type { GeneratedImage } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageCard from "@/components/ImageCard";
import { Sparkles, Wand2, Users, Image as ImageIcon, ChevronRight, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock data (adjust image URLs and dataAiHint as needed for new design)
const trendStyles: GeneratedImage[] = [
  { id: "trend1", prompt: "Photo Realism Portrait", imageUrl: "https://placehold.co/300x400.png", model: "Artifex", timestamp: new Date(), dataAiHint: "photo portrait" },
  { id: "trend2", prompt: "Anime Character Design", imageUrl: "https://placehold.co/300x400.png", model: "Artifex", timestamp: new Date(), dataAiHint: "anime character" },
  { id: "trend3", prompt: "Fantasy Landscape Art", imageUrl: "https://placehold.co/300x400.png", model: "Artifex", timestamp: new Date(), dataAiHint: "fantasy landscape" },
  { id: "trend4", prompt: "Abstract Fluid", imageUrl: "https://placehold.co/300x400.png", model: "Artifex", timestamp: new Date(), dataAiHint: "abstract fluid" },
];

const imageTemplates: GeneratedImage[] = [
  { id: "template1", prompt: "Cyberpunk City Alley", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "cyberpunk city" },
  { id: "template2", prompt: "Enchanted Forest Path", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "enchanted forest" },
  { id: "template3", prompt: "Steampunk Contraption", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "steampunk device" },
  { id: "template4", prompt: "Minimalist Abstract", imageUrl: "https://placehold.co/400x300.png", model: "Artifex", timestamp: new Date(), dataAiHint: "minimalist abstract" },
];

const communityInspirations: GeneratedImage[] = [
  { id: "community1", prompt: "Cosmic Nebula by @StarGazer", imageUrl: "https://placehold.co/600x400.png", model: "Artifex", timestamp: new Date(), dataAiHint: "cosmic nebula", creatorName: "@StarGazer" },
  { id: "community2", prompt: "Mystical Creature by @DreamWeaver", imageUrl: "https://placehold.co/600x400.png", model: "Artifex", timestamp: new Date(), dataAiHint: "mystical creature", creatorName: "@DreamWeaver" },
];


export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const handleGenerateClick = () => {
    if (prompt.trim()) {
      router.push(`/generate?prompt=${encodeURIComponent(prompt)}`);
    } else {
      router.push('/generate'); 
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <header className="mb-2">
        <h1 className="text-2xl font-medium">{greeting}, User!</h1>
        <p className="text-sm text-muted-foreground">Ready to create something amazing?</p>
      </header>

      {/* Image Generator Section */}
      <section className="bg-card p-4 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-1 flex items-center"><Wand2 className="w-5 h-5 mr-2 text-primary" /> Image Generator</h2>
        <p className="text-xs text-muted-foreground mb-3">Turn your ideas into stunning visuals.</p>
        <div className="flex space-x-2 items-center">
          <Input
            type="text"
            placeholder="Describe what you want to create..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="form-input flex-grow !h-11"
          />
          <Button onClick={handleGenerateClick} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg !h-11 px-4 shadow-primary-glow">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Try Trend Styles Section */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold flex items-center"><Sparkles className="w-5 h-5 mr-2 text-primary" /> Try Trend Styles</h2>
          <Link href="/explore/trends" legacyBehavior><a className="text-xs text-primary hover:underline flex items-center">See All <ChevronRight className="w-3 h-3 ml-0.5" /></a></Link>
        </div>
        <div className="flex overflow-x-auto space-x-3 pb-2 -mx-4 px-4 hide-scrollbar">
          {trendStyles.map((image) => (
            <div key={image.id} className="min-w-[120px] sm:min-w-[140px]">
             <ImageCard image={image} variant="small" />
            </div>
          ))}
        </div>
      </section>

      {/* Image Template Section */}
      <section>
         <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold flex items-center"><ImageIcon className="w-5 h-5 mr-2 text-primary" /> Image Template</h2>
           <Link href="/explore/templates" legacyBehavior><a className="text-xs text-primary hover:underline flex items-center">See All <ChevronRight className="w-3 h-3 ml-0.5" /></a></Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {imageTemplates.slice(0,2).map((image) => ( // Show 2 for a cleaner look, can be 4
            <ImageCard key={image.id} image={image} variant="medium" />
          ))}
        </div>
      </section>

      {/* Get Inspired from Community Section */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold flex items-center"><Users className="w-5 h-5 mr-2 text-primary" /> Get Inspired from Community</h2>
          <Link href="/explore/community" legacyBehavior><a className="text-xs text-primary hover:underline flex items-center">See All <ChevronRight className="w-3 h-3 ml-0.5" /></a></Link>
        </div>
        <div className="space-y-4">
          {communityInspirations.map((image) => (
            <ImageCard key={image.id} image={image} variant="large" />
          ))}
        </div>
      </section>
    </div>
  );
}

// Helper to hide scrollbar
// Add this to your globals.css or a utility CSS file if preferred:
// .hide-scrollbar::-webkit-scrollbar { display: none; }
// .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
