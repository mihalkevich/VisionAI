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

export default function GeneratePage() {
  const [originalPrompt, setOriginalPrompt] = useState<string>("");
  const [displayPrompt, setDisplayPrompt] = useState<string>("");
  
  const [improvedPromptText, setImprovedPromptText] = useState<string | null>(null);
  const [promptVariationsList, setPromptVariationsList] = useState<string[]>([]);
  
  const [isImproving, startImproveTransition] = useTransition();
  const [isGeneratingVariations, startVariationsTransition] = useTransition();
  const [isGeneratingImages, startImageGenerationTransition] = useTransition(); // For future use

  const [errorImprove, setErrorImprove] = useState<string | null>(null);
  const [errorVariations, setErrorVariations] = useState<string | null>(null);

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
          setDisplayPrompt(result.improvedPrompt); // Automatically use the improved prompt
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
    // Placeholder for actual image generation logic
    startImageGenerationTransition(async () => {
      toast({ title: "Generating Images...", description: `Using prompt: "${displayPrompt.substring(0,50)}..."` });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // In a real scenario, you would call an image generation flow here
      // and update a state variable with the generated images.
      toast({ title: "Image Generation Started (Mock)", description: "This is a placeholder action." });
    });
  };


  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center">
          <Wand2 className="w-8 h-8 mr-3 text-primary" />
          Image Generation Hub
        </h1>
        <p className="text-muted-foreground mt-1">Craft your vision with AI-powered tools.</p>
      </header>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle>Describe Your Image</CardTitle>
          <CardDescription>Enter your prompt below. You can then improve it or generate variations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="e.g., A futuristic cityscape at sunset, neon lights reflecting on wet streets, cinematic lighting..."
            value={originalPrompt}
            onChange={handlePromptChange}
            rows={4}
            className="text-base"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={onImprovePrompt} disabled={isImproving || !originalPrompt.trim()} className="flex-1">
              {isImproving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Improve Prompt
            </Button>
            <Button onClick={onGenerateVariations} disabled={isGeneratingVariations || !originalPrompt.trim()} variant="outline" className="flex-1">
              {isGeneratingVariations ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              Generate Variations
            </Button>
          </div>
        </CardContent>
      </Card>

      {errorImprove && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle>Improvement Error</AlertTitle>
          <AlertDescription>{errorImprove}</AlertDescription>
        </Alert>
      )}

      {improvedPromptText && !errorImprove && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Suggested Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground italic p-3 bg-muted rounded-md">{improvedPromptText}</p>
          </CardContent>
          <CardFooter>
             <Button onClick={handleUseImprovedPrompt} variant="link" className="p-0 h-auto">Use this improved prompt</Button>
          </CardFooter>
        </Card>
      )}
      
      {errorVariations && (
         <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle>Variation Error</AlertTitle>
          <AlertDescription>{errorVariations}</AlertDescription>
        </Alert>
      )}

      {promptVariationsList.length > 0 && !errorVariations && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Prompt Variations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {promptVariationsList.map((variation, index) => (
              <div key={index} className="p-3 bg-muted rounded-md flex justify-between items-center">
                <p className="text-sm italic flex-1">{variation}</p>
                <Button onClick={() => handleUseVariation(variation)} size="sm" variant="outline" className="ml-2">Use</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      <Separator />

      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle>Final Prompt for Generation</CardTitle>
           <CardDescription>This is the prompt that will be used to generate images. You can edit it directly if needed.</CardDescription>
        </CardHeader>
        <CardContent>
           <Textarea
            placeholder="Your final prompt will appear here..."
            value={displayPrompt}
            onChange={(e) => setDisplayPrompt(e.target.value)}
            rows={3}
            className="text-base bg-background"
          />
        </CardContent>
      </Card>

      {/* Placeholder for Generation Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Generation Settings</CardTitle>
          <CardDescription>Configure your image generation options. (Coming Soon)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>[Aspect Ratio Controls]</p>
          <p>[Style Selection]</p>
          <p>[Number of Images]</p>
          <p>[Advanced Options like Negative Prompts, Seed, etc.]</p>
        </CardContent>
      </Card>
      
      <div className="mt-6 text-center">
        <Button size="lg" onClick={handleGenerateImages} disabled={isGeneratingImages || !displayPrompt.trim()} className="w-full max-w-md h-12 text-lg">
          {isGeneratingImages ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
          Generate Images
        </Button>
      </div>

      {/* Placeholder for Generated Images */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Your Generated Masterpieces</h2>
        <div className="p-8 bg-card rounded-lg shadow text-center text-muted-foreground min-h-[200px] flex items-center justify-center">
          Your generated images will appear here.
        </div>
        {/* Later: <ImageGallery images={generatedImages} /> */}
      </div>
    </div>
  );
}
