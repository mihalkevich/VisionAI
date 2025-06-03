// src/app/(app)/generate/page.tsx
"use client";

import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Wand2, Sparkles, RefreshCw, Loader2, Info } from "lucide-react";
import { handleImprovePromptAction, handleGenerateVariationsAction } from "@/lib/actions";
import type { GeneratedImage } from "@/types"; // For future use
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ImageGallery from "@/components/ImageGallery"; // Assuming you want to display images later

export default function GeneratePage() {
  const [originalPrompt, setOriginalPrompt] = useState<string>("");
  const [displayPrompt, setDisplayPrompt] = useState<string>("");
  
  const [improvedPromptText, setImprovedPromptText] = useState<string | null>(null);
  const [promptVariationsList, setPromptVariationsList] = useState<string[]>([]);
  
  const [isImproving, startImproveTransition] = useTransition();
  const [isGeneratingVariations, startVariationsTransition] = useTransition();
  const [isGeneratingImages, startImageGenerationTransition] = useTransition();

  const [errorImprove, setErrorImprove] = useState<string | null>(null);
  const [errorVariations, setErrorVariations] = useState<string | null>(null);
  
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]); // State for generated images

  const { toast } = useToast();

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newPrompt = e.target.value;
    setOriginalPrompt(newPrompt);
    if (!improvedPromptText && promptVariationsList.length === 0) {
      setDisplayPrompt(newPrompt);
    }
  };

  const onImprovePrompt = async () => {
    if (!originalPrompt.trim()) {
      toast({ title: "Prompt is empty", description: "Please enter a prompt to improve.", variant: "destructive" });
      return;
    }
    setErrorImprove(null);
    setImprovedPromptText(null);
    startImproveTransition(async () => {
      try {
        const result = await handleImprovePromptAction(originalPrompt);
        if (result.improvedPrompt.startsWith("Error:")) {
          setErrorImprove(result.improvedPrompt);
          toast({ title: "Improvement Failed", description: result.improvedPrompt, variant: "destructive" });
        } else {
          setImprovedPromptText(result.improvedPrompt);
          setDisplayPrompt(result.improvedPrompt); 
          toast({ title: "Prompt Improved!", description: "The improved prompt is now ready for generation." });
        }
      } catch (e) {
        const errorMsg = e instanceof Error ? e.message : "An unknown error occurred.";
        setErrorImprove(errorMsg);
        toast({ title: "Error", description: `Failed to improve prompt: ${errorMsg}`, variant: "destructive" });
      }
    });
  };

  const onGenerateVariations = async () => {
    if (!originalPrompt.trim()) {
      toast({ title: "Prompt is empty", description: "Please enter a prompt to generate variations.", variant: "destructive" });
      return;
    }
    setErrorVariations(null);
    setPromptVariationsList([]);
    startVariationsTransition(async () => {
      try {
        const result = await handleGenerateVariationsAction(originalPrompt, 3);
         if (result.variations.length > 0 && result.variations[0].startsWith("Error:")) {
          setErrorVariations(result.variations[0]);
          toast({ title: "Variations Failed", description: result.variations[0], variant: "destructive" });
        } else {
          setPromptVariationsList(result.variations);
          toast({ title: "Variations Generated!", description: "Select a variation to use it for generation." });
        }
      } catch (e) {
        const errorMsg = e instanceof Error ? e.message : "An unknown error occurred.";
        setErrorVariations(errorMsg);
        toast({ title: "Error", description: `Failed to generate variations: ${errorMsg}`, variant: "destructive" });
      }
    });
  };

  const handleUseImprovedPrompt = () => {
    if (improvedPromptText) {
      setDisplayPrompt(improvedPromptText);
      toast({ title: "Prompt Updated", description: "Using the improved prompt for generation." });
    }
  };

  const handleUseVariation = (variation: string) => {
    setDisplayPrompt(variation);
    toast({ title: "Prompt Updated", description: "Using selected variation for generation." });
  };
  
  const handleGenerateImages = () => {
    if (!displayPrompt.trim()) {
      toast({ title: "Prompt is empty", description: "Please enter or select a prompt to generate images.", variant: "destructive" });
      return;
    }
    startImageGenerationTransition(async () => {
      toast({ title: "Generating Images...", description: `Using prompt: "${displayPrompt.substring(0,30)}..."` });
      // Simulate API call for image generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      // Mock generated images
      const mockImages: GeneratedImage[] = Array.from({ length: 2 }, (_, i) => ({
        id: `gen-${Date.now()}-${i}`,
        prompt: displayPrompt,
        imageUrl: `https://placehold.co/400x300.png?text=Generated+${i+1}`,
        model: "Artifex AI",
        timestamp: new Date(),
        dataAiHint: "ai generated"
      }));
      setGeneratedImages(mockImages);
      toast({ title: "Images Generated! (Mock)", description: "Your mock images are ready." });
    });
  };


  return (
    <div className="container mx-auto px-4 py-6 space-y-6"> {/* Reduced space-y-8 to space-y-6 */}
      <header className="text-center">
        <h1 className="text-xl font-bold flex items-center justify-center"> {/* Reduced from text-3xl */}
          <Wand2 className="w-6 h-6 mr-2 text-primary" /> {/* Reduced from w-8 h-8 mr-3 */}
          Image Generation Hub
        </h1>
        <p className="text-muted-foreground mt-1 text-xs">Craft your vision with AI-powered tools.</p> {/* text-sm to text-xs */}
      </header>

      <Card className="shadow-lg"> {/* Reduced shadow-xl */}
        <CardHeader>
          <CardTitle className="text-base">Describe Your Image</CardTitle> {/* Reduced text size */}
          <CardDescription className="text-xs">Enter your prompt below. You can then improve it or generate variations.</CardDescription> {/* Reduced text size */}
        </CardHeader>
        <CardContent className="space-y-3"> {/* space-y-4 to space-y-3 */}
          <Textarea
            placeholder="e.g., A futuristic cityscape at sunset, neon lights..."
            value={originalPrompt}
            onChange={handlePromptChange}
            rows={3} // rows 4 to 3
            className="text-sm" // text-base to text-sm
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={onImprovePrompt} disabled={isImproving || !originalPrompt.trim()} className="flex-1" size="sm"> {/* Added size="sm" */}
              {isImproving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Improve Prompt
            </Button>
            <Button onClick={onGenerateVariations} disabled={isGeneratingVariations || !originalPrompt.trim()} variant="outline" className="flex-1" size="sm"> {/* Added size="sm" */}
              {isGeneratingVariations ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Generate Variations
            </Button>
          </div>
        </CardContent>
      </Card>

      {errorImprove && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-sm">Improvement Error</AlertTitle> {/* Reduced text size */}
          <AlertDescription className="text-xs">{errorImprove}</AlertDescription> {/* Reduced text size */}
        </Alert>
      )}

      {improvedPromptText && !errorImprove && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Suggested Improvement</CardTitle> {/* Reduced text size */}
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground italic p-2.5 bg-muted rounded-md">{improvedPromptText}</p> {/* Reduced text, padding */}
          </CardContent>
          <CardFooter>
             <Button onClick={handleUseImprovedPrompt} variant="link" className="p-0 h-auto text-xs">Use this improved prompt</Button> {/* Reduced text size */}
          </CardFooter>
        </Card>
      )}
      
      {errorVariations && (
         <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-sm">Variation Error</AlertTitle> {/* Reduced text size */}
          <AlertDescription className="text-xs">{errorVariations}</AlertDescription> {/* Reduced text size */}
        </Alert>
      )}

      {promptVariationsList.length > 0 && !errorVariations && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Prompt Variations</CardTitle> {/* Reduced text size */}
          </CardHeader>
          <CardContent className="space-y-1.5"> {/* space-y-2 to space-y-1.5 */}
            {promptVariationsList.map((variation, index) => (
              <div key={index} className="p-2.5 bg-muted rounded-md flex justify-between items-center"> {/* p-3 to p-2.5 */}
                <p className="text-xs italic flex-1">{variation}</p> {/* text-sm to text-xs */}
                <Button onClick={() => handleUseVariation(variation)} size="sm" variant="outline" className="ml-2 text-xs">Use</Button> {/* Added text-xs */}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      <Separator />

      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">Final Prompt for Generation</CardTitle> {/* Reduced text size */}
           <CardDescription className="text-xs">This is the prompt that will be used to generate images. You can edit it directly if needed.</CardDescription> {/* Reduced text size */}
        </CardHeader>
        <CardContent>
           <Textarea
            placeholder="Your final prompt will appear here..."
            value={displayPrompt}
            onChange={(e) => setDisplayPrompt(e.target.value)}
            rows={2} // rows 3 to 2
            className="text-sm bg-background" // text-base to text-sm
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Generation Settings</CardTitle> {/* Reduced text size */}
          <CardDescription className="text-xs">Configure your image generation options. (Coming Soon)</CardDescription> {/* Reduced text size */}
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground text-xs"> {/* space-y-3 to space-y-2, added text-xs */}
          <p>[Aspect Ratio Controls]</p>
          <p>[Style Selection]</p>
          <p>[Number of Images]</p>
          <p>[Advanced Options like Negative Prompts, Seed, etc.]</p>
        </CardContent>
      </Card>
      
      <div className="mt-4 text-center"> {/* mt-6 to mt-4 */}
        <Button size="default" onClick={handleGenerateImages} disabled={isGeneratingImages || !displayPrompt.trim()} className="w-full max-w-sm h-10 text-base"> {/* size lg to default, max-w-md to sm, h-12 to h-10, text-lg to text-base */}
          {isGeneratingImages ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />} {/* h-5 w-5 to h-4 w-4 */}
          Generate Images
        </Button>
      </div>

      <div className="mt-6"> {/* mt-8 to mt-6 */}
        <h2 className="text-lg font-semibold mb-3 text-center">Your Generated Masterpieces</h2> {/* text-xl to text-lg, mb-4 to mb-3 */}
        <ImageGallery images={generatedImages} />
      </div>
    </div>
  );
}
