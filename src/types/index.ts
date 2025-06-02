export type AiModel = "Midjourney" | "OpenAI" | "Stable Diffusion";

export interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  model: AiModel;
  timestamp: Date;
  dataAiHint?: string;
}
