// src/components/ImageCard.tsx
"use client";

import type { GeneratedImage } from "@/types";
import NextImage from "next/image"; // Renamed to avoid conflict with local Image component
import { Download, Bot, Clock, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"; // Remove unused Card parts
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';
import { cn } from "@/lib/utils";

interface ImageCardProps {
  image: GeneratedImage;
  variant?: "small" | "medium" | "large" | "square"; // For different contexts
  className?: string;
}

export default function ImageCard({ image, variant = "medium", className }: ImageCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if any
    const link = document.createElement('a');
    link.href = image.imageUrl;
    const filename = `${image.model.toLowerCase()}_${image.prompt.substring(0, 20).replace(/\s+/g, '_') || 'image'}.png`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cardStyle = cn(
    "overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300 bg-card rounded-lg group",
    {
      "aspect-[3/4]": variant === "small",     // Portrait (longer) - e.g., for trend styles
      "aspect-[4/3]": variant === "medium" || variant === "large", // Standard 4:3
      "aspect-square": variant === "square",   // Square - e.g., for profile grid
    },
    className
  );
  
  // On Home page, "Image Template" are larger than "Try Trend Styles" cards
  // "Get Inspired from Community" cards are full width on mobile.
  // Explore page category images are medium, discover more images are medium.
  // Profile page images are square.

  const imageSizes = 
    variant === "small" ? "(max-width: 639px) 30vw, 150px" :
    variant === "square" ? "(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 200px" :
    variant === "medium" ? "(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 250px" : // Will adapt to 4:3
    variant === "large" ? "100vw" : // Will adapt to 4:3, for full-width community posts for example
    "100vw";


  // Simplified card for most grid views, more details could be shown on hover or on a detail page
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
          />
          {/* Optional overlay for prompt on hover for small/medium cards */}
          {(variant === "small" || variant === "medium") && (
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
                <p className="text-xs text-primary-foreground truncate">{image.prompt}</p>
             </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Larger card variant (e.g., for community inspiration list on Home)
  return (
    <Card className={cardStyle}>
      <CardContent className="p-0">
        {/* The div below will now also be aspect-[4/3] due to cardStyle applying to parent */}
        <div className="relative w-full h-full overflow-hidden"> 
            <NextImage
            src={image.imageUrl}
            alt={image.prompt}
            fill
            className="object-cover"
            data-ai-hint={image.dataAiHint || "community art"}
            sizes={imageSizes}
            />
        </div>
        <div className="p-3 space-y-1">
            <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-foreground truncate pr-2" title={image.prompt}>
                    {image.prompt.length > 60 ? `${image.prompt.substring(0, 57)}...` : image.prompt}
                </p>
                <Button variant="ghost" size="icon" className="w-6 h-6 text-muted-foreground hover:text-primary">
                    <MoreHorizontal className="w-4 h-4"/>
                </Button>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                    <Bot className="w-3 h-3 mr-1" />
                    {image.model}
                </Badge>
                <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {formatDistanceToNow(new Date(image.timestamp), { addSuffix: true })}
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
