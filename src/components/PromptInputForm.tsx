"use client";

import type { AiModel, GeneratedImage } from "@/types";
import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Brain, Layers, Loader2, Wand2, Lightbulb } from "lucide-react";
import { handleImprovePromptAction, handleGenerateVariationsAction } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const formSchema = z.object({
  prompt: z.string().min(3, "Prompt must be at least 3 characters long."),
  model: z.enum(["Midjourney", "OpenAI", "Stable Diffusion"]),
});

type FormData = z.infer<typeof formSchema>;

interface PromptInputFormProps {
  onGenerateImage: (prompt: string, model: AiModel) => Promise<void>;
  isGenerating: boolean;
}

const modelOptions: { value: AiModel; label: string; icon: React.ElementType }[] = [
  { value: "Midjourney", label: "Midjourney", icon: Sparkles },
  { value: "OpenAI", label: "OpenAI DALL-E", icon: Brain },
  { value: "Stable Diffusion", label: "Stable Diffusion", icon: Layers },
];

export default function PromptInputForm({ onGenerateImage, isGenerating }: PromptInputFormProps) {
  const { toast } = useToast();
  const [isImproving, startImproveTransition] = useTransition();
  const [isGeneratingVariations, startVariationsTransition] = useTransition();
  const [promptVariations, setPromptVariations] = useState<string[]>([]);

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      model: "Midjourney",
    },
  });

  const currentPrompt = watch("prompt");

  const onSubmit = (data: FormData) => {
    onGenerateImage(data.prompt, data.model);
  };

  const handleImprovePrompt = async () => {
    if (!currentPrompt.trim()) {
      toast({ title: "Cannot improve empty prompt", variant: "destructive" });
      return;
    }
    startImproveTransition(async () => {
      try {
        const result = await handleImprovePromptAction(currentPrompt);
        if (result.improvedPrompt && !result.improvedPrompt.startsWith("Error:")) {
          setValue("prompt", result.improvedPrompt, { shouldValidate: true });
          toast({ title: "Prompt Improved!", description: "Your prompt has been enhanced." });
        } else {
          toast({ title: "Improvement Failed", description: result.improvedPrompt, variant: "destructive" });
        }
      } catch (error) {
        toast({ title: "Error", description: "Could not improve prompt.", variant: "destructive" });
      }
    });
  };

  const handleGenerateVariations = async () => {
     if (!currentPrompt.trim()) {
      toast({ title: "Cannot generate variations for empty prompt", variant: "destructive" });
      return;
    }
    startVariationsTransition(async () => {
      try {
        const result = await handleGenerateVariationsAction(currentPrompt);
         if (result.variations.length > 0 && !result.variations[0].startsWith("Error:")) {
          setPromptVariations(result.variations);
          toast({ title: "Variations Generated!", description: "Suggestions are available." });
        } else {
          setPromptVariations([]);
          toast({ title: "Variation Generation Failed", description: result.variations[0], variant: "destructive" });
        }
      } catch (error) {
        setPromptVariations([]);
        toast({ title: "Error", description: "Could not generate variations.", variant: "destructive" });
      }
    });
  };
  
  const applyVariation = (variation: string) => {
    setValue("prompt", variation, { shouldValidate: true });
    setPromptVariations([]); // Close popover by clearing variations
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-headline">
          <Wand2 className="w-6 h-6 mr-2 text-primary" />
          Create Your Vision
        </CardTitle>
        <CardDescription>Enter a prompt and select an AI model to generate an image.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-base">Your Prompt</Label>
            <Controller
              name="prompt"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="prompt"
                  placeholder="e.g., A futuristic cityscape at sunset, cyberpunk style"
                  className="min-h-[120px] text-base focus:ring-accent"
                  {...field}
                />
              )}
            />
            {errors.prompt && <p className="text-sm text-destructive">{errors.prompt.message}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={handleImprovePrompt} disabled={isImproving || isGenerating || !currentPrompt.trim()} className="flex-1">
              {isImproving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Lightbulb className="w-4 h-4 mr-2" />}
              Improve Prompt
            </Button>
             <Popover open={promptVariations.length > 0} onOpenChange={(isOpen) => !isOpen && setPromptVariations([])}>
              <PopoverTrigger asChild>
                <Button type="button" variant="outline" onClick={handleGenerateVariations} disabled={isGeneratingVariations || isGenerating || !currentPrompt.trim()} className="flex-1">
                  {isGeneratingVariations ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                  Suggest Variations
                </Button>
              </PopoverTrigger>
              {promptVariations.length > 0 && (
              <PopoverContent className="w-[--radix-popover-trigger-width] p-2 max-h-60 overflow-y-auto">
                <ul className="space-y-1">
                  {promptVariations.map((variation, index) => (
                    <li key={index}>
                      <Button variant="ghost" size="sm" className="w-full justify-start text-left h-auto py-1.5 px-2" onClick={() => applyVariation(variation)}>
                        {variation}
                      </Button>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
              )}
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-base">Choose AI Model</Label>
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {modelOptions.map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={`flex flex-col items-center justify-center p-3 border rounded-md cursor-pointer transition-all hover:border-primary hover:shadow-md ${field.value === option.value ? "border-primary ring-2 ring-primary bg-primary/10" : "border-border"}`}
                    >
                      <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                      <option.icon className={`w-7 h-7 mb-1.5 ${field.value === option.value ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-medium ${field.value === option.value ? "text-primary" : "text-foreground"}`}>{option.label}</span>
                    </Label>
                  ))}
                </RadioGroup>
              )}
            />
             {errors.model && <p className="text-sm text-destructive">{errors.model.message}</p>}
          </div>

          <Button type="submit" disabled={isGenerating || isImproving || isGeneratingVariations} className="w-full text-base py-3 bg-accent hover:bg-accent/90">
            {isGenerating ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Wand2 className="w-5 h-5 mr-2" />
            )}
            Generate Image
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
