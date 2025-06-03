// src/components/ImageCard.tsx
"use client";

import type { GeneratedImage } from "@/types";
import NextImage from "next/image"; 
import { Download, Bot, Clock, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';
import { cn } from "@/lib/utils";

interface ImageCardProps {
  image: GeneratedImage;
  variant?: "small" | "medium" | "large" | "square"; 
  className?: string;
}

export default function ImageCard({ image, variant = "medium", className }: ImageCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    const link = document.createElement('a');
    link.href = image.imageUrl;
    const filename = `${image.model.toLowerCase()}_${image.prompt.substring(0, 20).replace(/\s+/g, '_') || 'image'}.png`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cardStyle = cn(
    "overflow-hidden shadow-md hover:shadow-primary/20 transition-shadow duration-300 bg-card rounded-md group", // shadow-lg to shadow-md, rounded-lg to rounded-md
    {
      "aspect-[3/4]": variant === "small",     
      "aspect-[4/3]": variant === "medium" || variant === "large", 
      "aspect-square": variant === "square",   
    },
    className
  );
  
  const imageSizes = 
    variant === "small" ? "(max-width: 639px) 30vw, 120px" : // 150px to 120px
    variant === "square" ? "(max-width: 639px) 48vw, (max-width: 1023px) 30vw, 180px" : // 50vw to 48vw, 33vw to 30vw, 200px to 180px
    variant === "medium" ? "(max-width: 639px) 48vw, (max-width: 1023px) 30vw, 220px" : // 50vw to 48vw, 33vw to 30vw, 250px to 220px
    variant === "large" ? "100vw" : 
    "100vw";

  if (variant === "small" || variant === "medium" || variant === "square") {
    return (
      <Card className={cardStyle}>
        <CardContent className="p-0 relative w-full h-full">
          <NextImage
            src={image.imageUrl}
            alt={image.prompt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={image.dataAiHint || "ai generated"}
            sizes={imageSizes}
            priority={variant === "large"} // Add priority for large images
          />
          {(variant === "small" || variant === "medium") && (
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-1.5"> {/* from-black/70 to /60, p-2 to p-1.5 */}
                <p className="text-2xs text-primary-foreground truncate">{image.prompt}</p> {/* text-xs to text-2xs */}
             </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Larger card variant
  return (
    <Card className={cardStyle}>
      <CardContent className="p-0">
        <div className="relative w-full h-full overflow-hidden"> 
            <NextImage
            src={image.imageUrl}
            alt={image.prompt}
            fill
            className="object-cover"
            data-ai-hint={image.dataAiHint || "community art"}
            sizes={imageSizes}
            priority // Add priority for large variant images
            />
        </div>
        <div className="p-2.5 space-y-0.5"> {/* p-3 to p-2.5, space-y-1 to space-y-0.5 */}
            <div className="flex justify-between items-start">
                <p className="text-xs font-medium text-foreground truncate pr-1.5" title={image.prompt}> {/* text-sm to text-xs, pr-2 to pr-1.5 */}
                    {image.prompt.length > 50 ? `${image.prompt.substring(0, 47)}...` : image.prompt} {/* Shortened length */}
                </p>
                <Button variant="ghost" size="icon" className="w-5 h-5 text-muted-foreground hover:text-primary"> {/* w-6h-6 to w-5h-5 */}
                    <MoreHorizontal className="w-3.5 h-3.5"/> {/* w-4h-4 to w-3.5h-3.5 */}
                </Button>
            </div>
            <div className="flex items-center justify-between text-2xs text-muted-foreground"> {/* text-xs to text-2xs */}
                <Badge variant="secondary" className="text-2xs bg-muted text-muted-foreground px-1.5 py-0.5"> {/* text-xs to text-2xs, adjusted padding */}
                    <Bot className="w-2.5 h-2.5 mr-0.5" /> {/* w-3h-3 to w-2.5h-2.5, mr-1 to mr-0.5 */}
                    {image.model}
                </Badge>
                <div className="flex items-center">
                    <Clock className="w-2.5 h-2.5 mr-0.5" /> {formatDistanceToNow(new Date(image.timestamp), { addSuffix: true })} {/* w-3h-3 to w-2.5h-2.5, mr-1 to mr-0.5 */}
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
