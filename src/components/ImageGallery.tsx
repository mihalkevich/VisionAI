import type { GeneratedImage } from "@/types";
import ImageCard from "./ImageCard";
import { ImageIcon } from "lucide-react";

interface ImageGalleryProps {
  images: GeneratedImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-muted rounded-lg h-full min-h-[300px]">
        <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Your gallery is empty</h3>
        <p className="text-muted-foreground">Start generating images to see them appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
}
