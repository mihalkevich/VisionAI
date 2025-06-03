// src/app/(app)/explore/[categoryName]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import ImageCard from "@/components/ImageCard";
import type { GeneratedImage } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Filter } from "lucide-react";
import { useEffect, useState } from "react";

// Mock data fetching function
const fetchCategoryImages = async (categoryName: string): Promise<GeneratedImage[]> => {
  // In a real app, you'd fetch this from an API
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  const basePrompt = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  return Array.from({ length: 12 }, (_, i) => ({
    id: `${categoryName}-${i}`,
    prompt: `${basePrompt} style image ${i + 1}`,
    imageUrl: `https://placehold.co/400x400.png?text=${basePrompt}+${i+1}`,
    model: "Artifex",
    timestamp: new Date(Date.now() - Math.random() * 1000000000),
    dataAiHint: `${categoryName.toLowerCase()} art`,
  }));
};


export default function CategoryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const categoryName = typeof params.categoryName === 'string' ? params.categoryName : '';
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categoryName) {
      setIsLoading(true);
      fetchCategoryImages(categoryName)
        .then(setImages)
        .finally(() => setIsLoading(false));
    }
  }, [categoryName]);

  const pageTitle = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <header className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md py-3 -mx-4 px-4 z-10 border-b border-border">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-muted-foreground hover:text-primary">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-semibold">{pageTitle}</h1>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Filter className="w-5 h-5" />
        </Button>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Array.from({length: 6}).map((_, i) => (
            <div key={i} className="aspect-square bg-card rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} variant="square" />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">No images found in this category.</p>
      )}
    </div>
  );
}
