export type AiModel = "Midjourney" | "OpenAI" | "Stable Diffusion" | "Artifex AI"; // Added Artifex AI

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  model: AiModel;
  timestamp: Date;
  dataAiHint?: string; // for placeholder image generation
  creatorName?: string; // Optional: for community/user images
  creatorAvatar?: string; // Optional: for community/user images
}
