'use server';

/**
 * @fileOverview A flow to improve user prompts for image generation using GenAI.
 *
 * - improvePrompt - A function that enhances the user's prompt for better image generation results.
 * - ImprovePromptInput - The input type for the improvePrompt function, containing the user's original prompt.
 * - ImprovePromptOutput - The return type for the improvePrompt function, providing the improved prompt.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImprovePromptInputSchema = z.object({
  originalPrompt: z
    .string()
    .describe('The original text prompt provided by the user.'),
});
export type ImprovePromptInput = z.infer<typeof ImprovePromptInputSchema>;

const ImprovePromptOutputSchema = z.object({
  improvedPrompt: z
    .string()
    .describe('The improved text prompt optimized for AI image generation.'),
});
export type ImprovePromptOutput = z.infer<typeof ImprovePromptOutputSchema>;

export async function improvePrompt(input: ImprovePromptInput): Promise<ImprovePromptOutput> {
  return improvePromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improvePromptPrompt',
  input: {schema: ImprovePromptInputSchema},
  output: {schema: ImprovePromptOutputSchema},
  prompt: `You are an AI prompt engineer. Your job is to improve user prompts for image generation.

  Original Prompt: {{{originalPrompt}}}

  Improved Prompt:`, // The model will complete this.
});

const improvePromptFlow = ai.defineFlow(
  {
    name: 'improvePromptFlow',
    inputSchema: ImprovePromptInputSchema,
    outputSchema: ImprovePromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
