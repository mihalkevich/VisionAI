// Summarize the differences between images generated from different prompts.
'use server';
/**
 * @fileOverview Summarizes the differences between images generated from different prompts.
 *
 * - summarizeGenerationDifferences - A function that summarizes the differences between images.
 * - SummarizeGenerationDifferencesInput - The input type for the summarizeGenerationDifferences function.
 * - SummarizeGenerationDifferencesOutput - The return type for the summarizeGenerationDifferences function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeGenerationDifferencesInputSchema = z.object({
  prompt1: z.string().describe('The first prompt used to generate an image.'),
  prompt2: z.string().describe('The second prompt used to generate an image.'),
  image1DataUri: z
    .string()
    .describe(
      "The first image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  image2DataUri: z
    .string()
    .describe(
      "The second image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizeGenerationDifferencesInput = z.infer<typeof SummarizeGenerationDifferencesInputSchema>;

const SummarizeGenerationDifferencesOutputSchema = z.object({
  summary: z.string().describe('A summary of the differences between the images generated from the two prompts.'),
});
export type SummarizeGenerationDifferencesOutput = z.infer<typeof SummarizeGenerationDifferencesOutputSchema>;

export async function summarizeGenerationDifferences(
  input: SummarizeGenerationDifferencesInput
): Promise<SummarizeGenerationDifferencesOutput> {
  return summarizeGenerationDifferencesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeGenerationDifferencesPrompt',
  input: {schema: SummarizeGenerationDifferencesInputSchema},
  output: {schema: SummarizeGenerationDifferencesOutputSchema},
  prompt: `You are an expert in image analysis and prompt understanding.

You are provided with two prompts and two images generated from those prompts.
Your task is to summarize the key differences between the images, based on the differences in the prompts.

Prompt 1: {{{prompt1}}}
Image 1: {{media url=image1DataUri}}

Prompt 2: {{{prompt2}}}
Image 2: {{media url=image2DataUri}}

Summary:`,
});

const summarizeGenerationDifferencesFlow = ai.defineFlow(
  {
    name: 'summarizeGenerationDifferencesFlow',
    inputSchema: SummarizeGenerationDifferencesInputSchema,
    outputSchema: SummarizeGenerationDifferencesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
