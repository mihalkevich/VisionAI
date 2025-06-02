"use client";

import { useState, useEffect } from "react";
import type { AiModel, GeneratedImage } from "@/types";
import Header from "@/components/Header";
import PromptInputForm from "@/components/PromptInputForm";
import ImageGallery from "@/components/ImageGallery";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Load images from localStorage on component mount
  useEffect(() => {
    const storedImages = localStorage.getItem("generatedImages");
    if (storedImages) {
      try {
        const parsedImages = JSON.parse(storedImages) as GeneratedImage[];
        // Ensure timestamps are Date objects
        const imagesWithDateObjects = parsedImages.map(img => ({
          ...img,
          timestamp: new Date(img.timestamp) 
        }));
        setGeneratedImages(imagesWithDateObjects);
      } catch (error) {
        console.error("Failed to parse images from localStorage", error);
        localStorage.removeItem("generatedImages"); // Clear corrupted data
      }
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (generatedImages.length > 0) {
      localStorage.setItem("generatedImages", JSON.stringify(generatedImages));
    } else {
      // If all images are cleared, remove the item from localStorage
      const storedImages = localStorage.getItem("generatedImages");
      if (storedImages) {
         localStorage.removeItem("generatedImages");
      }
    }
  }, [generatedImages]);


  const handleGenerateImage = async (prompt: string, model: AiModel) => {
    setIsGenerating(true);
    toast({ title: "Generating Image...", description: `Using ${model} with prompt: "${prompt.substring(0,30)}..."` });

    // Simulate AI image generation
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    const randomWidth = 400 + Math.floor(Math.random() * 200);
    const randomHeight = 300 + Math.floor(Math.random() * 200);
    
    // Create a data AI hint from the prompt (first two words)
    const promptWords = prompt.trim().split(/\s+/);
    const dataAiHint = promptWords.slice(0, 2).join(' ') || "creative";

    const newImage: GeneratedImage = {
      id: new Date().toISOString() + Math.random().toString(36).substring(2,9),
      prompt,
      // Using a placeholder that might reflect aspect ratio.
      // For actual dynamic text/content on placeholder, a server-side service or more complex client-side canvas manipulation would be needed.
      // This placeholder service does not directly support text overlay via URL parameters for <img> tags.
      imageUrl: `https://placehold.co/${randomWidth}x${randomHeight}.png`, 
      model,
      timestamp: new Date(),
      dataAiHint: dataAiHint,
    };

    setGeneratedImages(prevImages => [newImage, ...prevImages]);
    setIsGenerating(false);
    toast({ title: "Image Generated!", description: "Your new image has been added to the gallery.", variant: "default" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 sm:px-6 md:px-8">
        <div className="grid md:grid-cols-12 gap-6 lg:gap-8">
          <div className="md:col-span-12 lg:col-span-4 xl:col-span-3">
            <PromptInputForm onGenerateImage={handleGenerateImage} isGenerating={isGenerating} />
          </div>
          <div className="md:col-span-12 lg:col-span-8 xl:col-span-9">
            <ImageGallery images={generatedImages} />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} VisionAI Studio. All rights reserved.</p>
      </footer>
    </div>
  );
}
