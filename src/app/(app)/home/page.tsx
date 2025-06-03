// src/app/(app)/home/page.tsx (New Home Screen)
"use client";

import { useState } from "react";
import type { AiModel, GeneratedImage } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageCard from "@/components/ImageCard";
import { Sparkles, Wand2, Users, Image as ImageIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


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
  const router = useRouter();

  const handleGenerateClick = () => {
    // Navigate to generate page with prompt.
    // For now, a simple navigation. Later, this could pass the prompt via query params or state management.
    router.push('/generate'); 
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6"> {/* space-y-8 to space-y-6 */}
      {/* Image Terminator Section */}
      <section className="bg-card p-3 rounded-lg shadow-md"> {/* p-4 to p-3, shadow-lg to shadow-md */}
        <h2 className="text-lg font-semibold mb-2 flex items-center"><Wand2 className="w-4 h-4 mr-1.5 text-primary" /> Image Terminator</h2> {/* text-xl to text-lg, w-5h-5 to w-4h-4, mr-2 to mr-1.5, mb-3 to mb-2 */}
        <p className="text-xs text-muted-foreground mb-2.5">Turn your ideas into stunning visuals.</p> {/* text-sm to text-xs, mb-3 to mb-2.5 */}
        <div className="flex space-x-1.5"> {/* space-x-2 to space-x-1.5 */}
          <Input
            type="text"
            placeholder="Describe what you want to create..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-input border-border focus:ring-primary text-sm h-9" // Added text-sm and h-9
          />
          <Button onClick={handleGenerateClick} className="bg-primary hover:bg-primary/90 text-primary-foreground" size="default"> {/* Ensured default size (h-9) */}
            Generate
          </Button>
        </div>
      </section>

      {/* Try Trend Styles Section */}
      <section>
        <div className="flex justify-between items-center mb-2.5"> {/* mb-3 to mb-2.5 */}
          <h2 className="text-lg font-semibold flex items-center"><Sparkles className="w-4 h-4 mr-1.5 text-primary" /> Try Trend Styles</h2> {/* text-xl to text-lg, w-5h-5 to w-4h-4, mr-2 to mr-1.5 */}
          <Link href="/explore/trends" legacyBehavior><a className="text-xs text-primary hover:underline flex items-center">See All <ChevronRight className="w-3 h-3 ml-1" /></a></Link> {/* text-sm to text-xs, w-4h-4 to w-3h-3 */}
        </div>
        <div className="flex overflow-x-auto space-x-3 pb-1.5 -mx-4 px-4"> {/* space-x-4 to space-x-3, pb-2 to pb-1.5 */}
          {trendStyles.map((image) => (
            <div key={image.id} className="min-w-[110px] sm:min-w-[140px]"> {/* Reduced min-w */}
             <ImageCard image={image} variant="small" />
            </div>
          ))}
        </div>
      </section>

      {/* Image Template Section */}
      <section>
         <div className="flex justify-between items-center mb-2.5"> {/* mb-3 to mb-2.5 */}
          <h2 className="text-lg font-semibold flex items-center"><ImageIcon className="w-4 h-4 mr-1.5 text-primary" /> Image Template</h2> {/* text-xl to text-lg, w-5h-5 to w-4h-4, mr-2 to mr-1.5 */}
           <Link href="/explore/templates" legacyBehavior><a className="text-xs text-primary hover:underline flex items-center">See All <ChevronRight className="w-3 h-3 ml-1" /></a></Link> {/* text-sm to text-xs, w-4h-4 to w-3h-3 */}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3"> {/* gap-4 to gap-3 */}
          {imageTemplates.map((image) => (
            <ImageCard key={image.id} image={image} variant="medium" />
          ))}
        </div>
      </section>

      {/* Get Inspired from Community Section */}
      <section>
        <div className="flex justify-between items-center mb-2.5"> {/* mb-3 to mb-2.5 */}
          <h2 className="text-lg font-semibold flex items-center"><Users className="w-4 h-4 mr-1.5 text-primary" /> Get Inspired from Community</h2> {/* text-xl to text-lg, w-5h-5 to w-4h-4, mr-2 to mr-1.5 */}
          <Link href="/explore/community" legacyBehavior><a className="text-xs text-primary hover:underline flex items-center">See All <ChevronRight className="w-3 h-3 ml-1" /></a></Link> {/* text-sm to text-xs, w-4h-4 to w-3h-3 */}
        </div>
        <div className="space-y-3"> {/* space-y-4 to space-y-3 */}
          {communityInspirations.map((image) => (
            <ImageCard key={image.id} image={image} variant="large" />
          ))}
        </div>
      </section>
       <footer className="text-center py-4 text-muted-foreground text-xs"> {/* py-6 to py-4, text-sm to text-xs */}
        <p>&copy; {new Date().getFullYear()} Artifex. All rights reserved.</p>
      </footer>
    </div>
  );
}
