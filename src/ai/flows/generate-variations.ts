// src/ai/flows/generate-variations.ts
'use server';

/**
 * @fileOverview A flow to generate variations of a text prompt using GenAI.
 *
 * - generateVariations - A function that generates prompt variations.
 * - GenerateVariationsInput - The input type for the generateVariations function.
 * - GenerateVariationsOutput - The return type for the generateVariations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVariationsInputSchema = z.object({
  originalPrompt: z.string().describe('The original text prompt.'),
  numberOfVariations: z.number().min(1).max(5).default(3).describe('The number of prompt variations to generate.'),
});
export type GenerateVariationsInput = z.infer<typeof GenerateVariationsInputSchema>;

const GenerateVariationsOutputSchema = z.object({
  variations: z.array(z.string()).describe('An array of text prompt variations.'),
});
export type GenerateVariationsOutput = z.infer<typeof GenerateVariationsOutputSchema>;

export async function generateVariations(input: GenerateVariationsInput): Promise<GenerateVariationsOutput> {
  return generateVariationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateVariationsPrompt',
  input: {schema: GenerateVariationsInputSchema},
  output: {schema: GenerateVariationsOutputSchema},
  prompt: `You are a prompt engineer. Generate {{numberOfVariations}} variations of the following text prompt, aimed at generating diverse and creative images. Return the variations as a JSON array of strings.

Original Prompt: {{{originalPrompt}}}`,
});

const generateVariationsFlow = ai.defineFlow(
  {
    name: 'generateVariationsFlow',
    inputSchema: GenerateVariationsInputSchema,
    outputSchema: GenerateVariationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
