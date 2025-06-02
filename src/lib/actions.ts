"use server";
import type { ImprovePromptInput, ImprovePromptOutput } from "@/ai/flows/improve-prompt";
import { improvePrompt as improvePromptFlow } from "@/ai/flows/improve-prompt";
import type { GenerateVariationsInput, GenerateVariationsOutput } from "@/ai/flows/generate-variations";
import { generateVariations as generateVariationsFlow } from "@/ai/flows/generate-variations";

export async function handleImprovePromptAction(originalPrompt: string): Promise<ImprovePromptOutput> {
  if (!originalPrompt.trim()) {
    // Return a structure that matches ImprovePromptOutput but indicates no action or error
    return { improvedPrompt: originalPrompt };
  }
  try {
    const result = await improvePromptFlow({ originalPrompt } as ImprovePromptInput);
    return result;
  } catch (error) {
    console.error("Error improving prompt:", error);
    // Consider how to inform the user. For now, re-throw or return specific error structure.
    // For simplicity with current setup, returning original prompt on error.
    // A more robust solution would involve specific error handling in the UI.
    return { improvedPrompt: `Error: Could not improve prompt. Original: ${originalPrompt}` };
  }
}

export async function handleGenerateVariationsAction(originalPrompt: string, numberOfVariations: number = 3): Promise<GenerateVariationsOutput> {
   if (!originalPrompt.trim()) {
    return { variations: [] };
  }
  try {
    const result = await generateVariationsFlow({ originalPrompt, numberOfVariations } as GenerateVariationsInput);
    return result;
  } catch (error) {
    console.error("Error generating variations:", error);
    return { variations: [`Error: Could not generate variations for: ${originalPrompt}`] };
  }
}
