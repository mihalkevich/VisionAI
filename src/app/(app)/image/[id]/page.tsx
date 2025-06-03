// src/app/(app)/image/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, Share2, Copy, Heart, Bookmark, MoreHorizontal, Bot, UserCircle } from "lucide-react";
import type { GeneratedImage } from "@/types";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock data fetching function
const fetchImageDetails = async (id: string): Promise<GeneratedImage | null> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
  if (id === "placeholder") { // Example ID
    return {
      id: "placeholder",
      prompt: "A majestic cyberpunk cityscape at dusk, bathed in neon glow, with flying vehicles and towering skyscrapers. Dramatic, cinematic, highly detailed.",
      imageUrl: "https://placehold.co/800x600.png?text=Cyberpunk+City",
      model: "Artifex XL 3.0",
      timestamp: new Date(),
      dataAiHint: "cyberpunk city",
      creatorName: "AI Visionary",
      creatorAvatar: "https://placehold.co/100x100.png?text=AV"
    };
  }
  return null;
};


export default function ImageDetailPage() {
  const router = useRouter();
  const params = useParams();
  const imageId = typeof params.id === 'string' ? params.id : 'placeholder'; // Fallback to placeholder for example
  const [image, setImage] = useState<GeneratedImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (imageId) {
      setIsLoading(true);
      fetchImageDetails(imageId)
        .then(setImage)
        .finally(() => setIsLoading(false));
    }
  }, [imageId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6 space-y-4">
        <div className="relative flex items-center justify-center py-3 border-b border-border">
            <div className="absolute left-0 w-8 h-8 bg-muted rounded-full animate-pulse"></div>
            <div className="w-24 h-6 bg-muted rounded-md animate-pulse mx-auto"></div>
            <div className="absolute right-0 w-8 h-8 bg-muted rounded-full animate-pulse"></div>
        </div>
        <div className="aspect-video bg-card rounded-xl animate-pulse"></div>
        <div className="h-6 w-3/4 bg-muted rounded-md animate-pulse mt-4"></div>
        <div className="h-4 w-1/2 bg-muted rounded-md animate-pulse"></div>
        <div className="h-10 w-full bg-muted rounded-xl animate-pulse mt-6"></div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
         <Button variant="ghost" onClick={() => router.back()} className="absolute top-4 left-4 text-muted-foreground hover:text-primary">
          <ChevronLeft className="w-6 h-6 mr-1" /> Back
        </Button>
        <p className="text-xl mt-20">Image not found.</p>
      </div>
    );
  }

  const copyPrompt = () => {
    navigator.clipboard.writeText(image.prompt);
    toast({ title: "Prompt Copied!", description: "The image prompt has been copied to your clipboard." });
  };

  return (
    <div className="container mx-auto px-0 sm:px-4 py-0 sm:py-6 space-y-4">
      <header className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md py-3 px-4 z-10 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-muted-foreground hover:text-primary -ml-2">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-semibold truncate px-2">Details</h1>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary -mr-2">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </header>

      <div className="px-4">
        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-card">
          <NextImage src={image.imageUrl} alt={image.prompt} layout="fill" objectFit="contain" data-ai-hint={image.dataAiHint} />
        </div>
      </div>
      
      <div className="px-4 space-y-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                    <AvatarImage src={image.creatorAvatar} alt={image.creatorName} data-ai-hint="creator avatar" />
                    <AvatarFallback>{image.creatorName?.substring(0,1) || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-semibold">{image.creatorName || "Unknown Creator"}</p>
                    {/* <p className="text-xs text-muted-foreground">@{image.creatorName?.toLowerCase().replace(' ','') || "user"}</p> */}
                </div>
            </div>
            {/* <Button variant="outline" size="sm" className="text-xs rounded-full">Follow</Button> */}
        </div>

        <div>
          <h2 className="text-sm font-medium mb-1">Prompt</h2>
          <p className="text-xs text-muted-foreground bg-card p-3 rounded-md">{image.prompt}</p>
        </div>

        <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={copyPrompt} className="flex-1 rounded-lg">
                <Copy className="w-3.5 h-3.5 mr-1.5"/> Copy Prompt
            </Button>
             <Button variant="outline" size="icon" className="rounded-lg text-muted-foreground hover:text-primary">
                <Heart className="w-4 h-4"/>
            </Button>
            <Button variant="outline" size="icon" className="rounded-lg text-muted-foreground hover:text-primary">
                <Bookmark className="w-4 h-4"/>
            </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="bg-card p-2 rounded-md">Model: <Badge variant="secondary" className="ml-1">{image.model}</Badge></div>
            <div className="bg-card p-2 rounded-md">Date: {new Date(image.timestamp).toLocaleDateString()}</div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-primary-glow text-sm font-semibold">
                <Download className="w-4 h-4 mr-2" /> Download Image
            </Button>
            <Button variant="outline" className="w-full h-12 border-primary text-primary hover:bg-primary/10 rounded-xl text-sm font-semibold">
                Use as Template
            </Button>
        </div>
      </div>

    </div>
  );
}
