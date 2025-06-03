import type { GeneratedImage } from "@/types";
import ImageCard from "./ImageCard";
import { ImageIcon } from "lucide-react";

interface ImageGalleryProps {
  images: GeneratedImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-muted rounded-lg h-full min-h-[250px]"> {/* p-10 to p-8, min-h-300 to 250 */}
        <ImageIcon className="w-12 h-12 text-muted-foreground mb-3" /> {/* w-16h-16 to w-12h-12, mb-4 to mb-3 */}
        <h3 className="text-lg font-semibold text-foreground mb-1.5">Your gallery is empty</h3> {/* text-xl to text-lg, mb-2 to mb-1.5 */}
        <p className="text-xs text-muted-foreground">Start generating images to see them appear here.</p> {/* text-sm to text-xs */}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"> {/* gap-4 md:gap-6 to gap-3 md:gap-4 */}
      {images.map((image) => (
        <ImageCard key={image.id} image={image} variant="medium"/> // Defaulting to medium for gallery items
      ))}
    </div>
  );
}
