// src/app/(app)/generate/page.tsx (Redesigned Generate Page - Screen 7 & 8 elements)
"use client";

import { useState, useTransition, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Wand2, Sparkles, RefreshCw, Loader2, Info, ChevronLeft, Download, Share2, Image as ImageIcon, Square, Settings2 } from "lucide-react";
import { handleImprovePromptAction, handleGenerateVariationsAction } from "@/lib/actions";
import type { GeneratedImage } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ImageGallery from "@/components/ImageGallery";
import NextImage from "next/image";
import SegmentedControl from "@/components/ui/SegmentedControl";

const styleOptions = [
  { name: "Note", hint: "illustration", imageUrl: "https://placehold.co/80x80.png?text=Note" , dataAiHint: "illustration style" },
  { name: "Photo", hint: "photorealistic", imageUrl: "https://placehold.co/80x80.png?text=Photo", dataAiHint: "photo style"  },
  { name: "Anime", hint: "anime style", imageUrl: "https://placehold.co/80x80.png?text=Anime", dataAiHint: "anime style"  },
  { name: "Fantasy", hint: "fantasy art", imageUrl: "https://placehold.co/80x80.png?text=Fantasy", dataAiHint: "fantasy style"  },
  { name: "Abstract", hint: "abstract", imageUrl: "https://placehold.co/80x80.png?text=Abstract", dataAiHint: "abstract style"  },
  { name: "Comics", hint: "comic book style", imageUrl: "https://placehold.co/80x80.png?text=Comics", dataAiHint: "comic style"  },
];

const shapeOptions = [
  { value: "1:1", label: "Square", icon: <Square className="w-5 h-5" /> },
  { value: "3:4", label: "Portrait", icon: <div className="w-4 h-5 border-2 border-current rounded-sm"></div> },
  { value: "4:3", label: "Landscape", icon: <div className="w-5 h-4 border-2 border-current rounded-sm"></div> },
];

export default function GeneratePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt") || "";

  const [originalPrompt, setOriginalPrompt] = useState<string>(initialPrompt);
  const [displayPrompt, setDisplayPrompt] = useState<string>(initialPrompt);
  
  const [improvedPromptText, setImprovedPromptText] = useState<string | null>(null);
  const [promptVariationsList, setPromptVariationsList] = useState<string[]>([]);
  
  const [isImproving, startImproveTransition] = useTransition();
  const [isGeneratingVariations, startVariationsTransition] = useTransition();
  const [isGeneratingImages, startImageGenerationTransition] = useTransition();

  const [errorImprove, setErrorImprove] = useState<string | null>(null);
  const [errorVariations, setErrorVariations] = useState<string | null>(null);
  
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState<string>(shapeOptions[0].value);

  const { toast } = useToast();

  useEffect(() => {
    setOriginalPrompt(initialPrompt);
    setDisplayPrompt(initialPrompt);
  }, [initialPrompt]);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompt = e.target.value;
    setOriginalPrompt(newPrompt);
    if (!improvedPromptText && promptVariationsList.length === 0) {
      setDisplayPrompt(newPrompt);
    }
  };

  const onImprovePrompt = async () => {
    if (!originalPrompt.trim()) {
      setErrorImprove("Prompt cannot be empty.");
      return;
    }
    setErrorImprove(null);
    startImproveTransition(async () => {
      try {
        const result = await handleImprovePromptAction(originalPrompt);
        if (result.improvedPrompt.startsWith("Error:")) {
            setErrorImprove(result.improvedPrompt)
            setImprovedPromptText(null);
        } else {
            setImprovedPromptText(result.improvedPrompt);
            toast({ title: "Prompt Improved!", description: "Suggestion applied to the display prompt." });
        }
      } catch (err) {
        const error = err as Error;
        setErrorImprove(error.message || "Failed to improve prompt.");
        setImprovedPromptText(null);
      }
    });
  };

  const onGenerateVariations = async () => {
    if (!originalPrompt.trim()) {
      setErrorVariations("Prompt cannot be empty.");
      return;
    }
    setErrorVariations(null);
    startVariationsTransition(async () => {
      try {
        const result = await handleGenerateVariationsAction(originalPrompt, 3);
         if (result.variations.length > 0 && result.variations[0].startsWith("Error:")) {
            setErrorVariations(result.variations[0]);
            setPromptVariationsList([]);
        } else {
            setPromptVariationsList(result.variations);
            toast({ title: "Variations Generated!", description: "Suggestions are available below." });
        }
      } catch (err) {
        const error = err as Error;
        setErrorVariations(error.message || "Failed to generate variations.");
        setPromptVariationsList([]);
      }
    });
  };
  
  const handleUseImprovedPrompt = () => {
    if (improvedPromptText) {
      setDisplayPrompt(improvedPromptText);
      toast({ title: "Using Improved Prompt", description: "The improved prompt is now set for generation." });
    }
  };
  
  const handleUseVariation = (variation: string) => {
    setDisplayPrompt(variation);
    toast({ title: "Using Variation", description: "The selected variation is now set for generation." });
  };
  
  const handleActualGenerateImages = () => {
    if (!displayPrompt.trim()) {
      toast({ title: "Prompt is empty", description: "Please enter or select a prompt to generate images.", variant: "destructive" });
      return;
    }
    startImageGenerationTransition(async () => {
      toast({ title: "Generating Images...", description: `Using prompt: "${displayPrompt.substring(0,30)}..."` });
      await new Promise(resolve => setTimeout(resolve, 3000));
      const mockImages: GeneratedImage[] = Array.from({ length: 2 }, (_, i) => ({
        id: `gen-${Date.now()}-${i}`,
        prompt: displayPrompt,
        imageUrl: `https://placehold.co/600x400.png?text=Generated+Image+${i+1}`,
        model: "Artifex AI",
        timestamp: new Date(),
        dataAiHint: "ai generated"
      }));
      setGeneratedImages(mockImages);
      toast({ title: "Images Generated! (Mock)", description: "Your mock images are ready." });
    });
  };

  const handleRandomPrompt = () => {
    const prompts = ["A serene landscape at sunset", "A futuristic city with flying cars", "A portrait of a wise old wizard", "An abstract representation of joy"];
    const random = prompts[Math.floor(Math.random() * prompts.length)];
    setOriginalPrompt(random);
    setDisplayPrompt(random);
    setImprovedPromptText(null);
    setPromptVariationsList([]);
  }

  if (generatedImages.length > 0) {
    return (
      <div className="container mx-auto px-0 sm:px-4 py-0 sm:py-6 space-y-4">
        <header className="flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md py-3 px-4 z-10 border-b border-border">
          <Button variant="ghost" size="icon" onClick={() => setGeneratedImages([])} className="text-muted-foreground hover:text-primary -ml-2">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-semibold">Generated Images</h1>
          <div className="w-8"></div> {/* Placeholder for right side balance */}
        </header>
        <div className="px-4">
            <NextImage 
                src={generatedImages[0].imageUrl} 
                alt={generatedImages[0].prompt} 
                width={600} height={400} 
                className="w-full aspect-video object-contain rounded-xl bg-card shadow-lg"
                data-ai-hint={generatedImages[0].dataAiHint}
            />
        </div>
        <div className="px-4 grid grid-cols-2 gap-3 mt-3">
             <Button variant="outline" className="h-11 rounded-lg border-muted text-muted-foreground hover:text-primary hover:border-primary">
                <Share2 className="w-4 h-4 mr-2"/> Share
            </Button>
            <Button variant="primary" className="h-11 rounded-lg bg-primary text-primary-foreground shadow-primary-glow">
                <Download className="w-4 h-4 mr-2"/> Download
            </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center px-4 pt-2">
          {generatedImages.length} of 4 images generated. Generated on {new Date().toLocaleDateString()}
        </p>
        {/* Thumbnails can be added here */}
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <header className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-muted-foreground hover:text-primary -ml-2">
            <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold text-center">Prompt</h1>
        <Button variant="ghost" size="icon" onClick={() => { /* Open settings modal */}} className="text-muted-foreground hover:text-primary -mr-2">
            <Settings2 className="w-5 h-5" />
        </Button>
      </header>

      <Card className="shadow-lg rounded-xl">
        <CardContent className="pt-6 space-y-3">
          <Label htmlFor="prompt-input" className="form-label">Describe what you’d like to create</Label>
          <Textarea
            id="prompt-input"
            placeholder="e.g., A hyperrealistic portrait of a knight in golden armor, sunset background, dramatic lighting..."
            value={originalPrompt}
            onChange={handlePromptChange}
            rows={4}
            className="text-sm !rounded-lg bg-input border-border focus:border-primary focus:ring-primary"
          />
          <Button onClick={handleRandomPrompt} variant="link" className="p-0 h-auto text-xs text-primary">
            <Sparkles className="w-3 h-3 mr-1" /> Random Prompt
          </Button>
        </CardContent>
      </Card>
      
       {/* AI Assist Card */}
       {(originalPrompt.trim() || improvedPromptText || promptVariationsList.length > 0 || errorImprove || errorVariations) && (
        <Card className="shadow-md rounded-xl">
          <CardHeader>
            <CardTitle className="text-base flex items-center"><Sparkles className="w-4 h-4 mr-2 text-primary" /> AI Assistance</CardTitle>
            <CardDescription className="text-xs">Let AI help you craft the perfect prompt.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                onClick={onImprovePrompt} 
                disabled={isImproving || !originalPrompt.trim()}
                variant="outline"
                className="w-full justify-start text-left border-dashed border-primary/50 text-primary hover:bg-primary/10 hover:text-primary"
              >
                {isImproving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Improve Prompt
              </Button>
              {errorImprove && <p className="text-xs text-destructive px-1">{errorImprove}</p>}
              {improvedPromptText && (
                <Alert variant="default" className="bg-primary/5 border-primary/30">
                  <AlertTitle className="text-xs font-semibold text-primary">Improved Suggestion:</AlertTitle>
                  <AlertDescription className="text-xs text-foreground/80">{improvedPromptText}</AlertDescription>
                  <Button onClick={handleUseImprovedPrompt} size="sm" variant="link" className="p-0 h-auto text-xs text-primary mt-1">Use this prompt</Button>
                </Alert>
              )}
            </div>
            <Separator />
            <div className="space-y-2">
               <Button 
                onClick={onGenerateVariations} 
                disabled={isGeneratingVariations || !originalPrompt.trim()}
                variant="outline"
                className="w-full justify-start text-left border-dashed border-primary/50 text-primary hover:bg-primary/10 hover:text-primary"
              >
                {isGeneratingVariations ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                Generate Variations
              </Button>
              {errorVariations && <p className="text-xs text-destructive px-1">{errorVariations}</p>}
              {promptVariationsList.length > 0 && (
                <div className="space-y-1.5">
                  {promptVariationsList.map((variation, index) => (
                    <Alert key={index} variant="default" className="bg-card border-border">
                      <AlertDescription className="text-xs text-foreground/80">{variation}</AlertDescription>
                      <Button onClick={() => handleUseVariation(variation)} size="sm" variant="link" className="p-0 h-auto text-xs text-primary mt-1">Use this variation</Button>
                    </Alert>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}


      <section>
        <Label className="form-label mb-2">Choose a style</Label>
        <div className="flex overflow-x-auto space-x-2 pb-2 -mx-1 px-1 hide-scrollbar">
          {styleOptions.map((style) => (
            <div 
              key={style.name} 
              onClick={() => setSelectedStyle(style.name)}
              className={`cursor-pointer p-1 border-2 rounded-lg ${selectedStyle === style.name ? 'border-primary' : 'border-transparent'}`}
            >
              <div className="w-20 h-20 rounded-md overflow-hidden relative bg-card">
                <NextImage src={style.imageUrl} alt={style.name} layout="fill" objectFit="cover" data-ai-hint={style.dataAiHint}/>
              </div>
              <p className={`text-2xs mt-1 text-center ${selectedStyle === style.name ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{style.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Label className="form-label mb-2">Choose Shape</Label>
        <SegmentedControl
            name="shape"
            options={shapeOptions}
            value={selectedShape}
            onChange={(val) => setSelectedShape(val)}
            itemClassName="flex-1" 
            className="!rounded-xl"
        />
      </section>
      
      <div className="pt-4">
        <Button 
            size="lg" 
            onClick={handleActualGenerateImages} 
            disabled={isGeneratingImages || !displayPrompt.trim()} 
            className="w-full h-14 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-primary-glow"
        >
          {isGeneratingImages ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
          Generate Images
        </Button>
      </div>
      <p className="text-xs text-center text-muted-foreground">You have 8 free generations left.</p>
    </div>
  );
}
