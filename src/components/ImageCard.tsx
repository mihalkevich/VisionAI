// src/components/ImageCard.tsx
"use client";

import type { GeneratedImage } from "@/types";
import NextImage from "next/image"; 
import { Bot, Clock, UserCircle, MoreHorizontal } from "lucide-react"; // Added UserCircle, MoreHorizontal
import { Card, CardContent, CardFooter } from "@/components/ui/card"; // Added CardFooter
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import Link from "next/link"; // For linking to image detail page

interface ImageCardProps {
  image: GeneratedImage;
  variant?: "small" | "medium" | "large" | "square"; // small (portrait 3:4), medium (landscape 4:3), large (landscape 4:3 with details), square (1:1)
  className?: string;
  showDetailsOverlay?: boolean; // For medium/square variants to show prompt on hover
}

export default function ImageCard({ image, variant = "medium", className, showDetailsOverlay = true }: ImageCardProps) {
  const [formattedTime, setFormattedTime] = useState<string | null>(null);

  useEffect(() => {
    setFormattedTime(image.timestamp ? formatDistanceToNow(new Date(image.timestamp), { addSuffix: true }) : "Recently");
  }, [image.timestamp]);

  const cardStyle = cn(
    "overflow-hidden shadow-md hover:shadow-primary/20 transition-shadow duration-300 bg-card rounded-xl group", // rounded-xl
    {
      "aspect-[3/4]": variant === "small",     
      "aspect-[4/3]": variant === "medium" || variant === "large", 
      "aspect-square": variant === "square",   
    },
    className
  );
  
  const imageSizes = 
    variant === "small" ? "(max-width: 639px) 30vw, 120px" :
    variant === "square" ? "(max-width: 639px) 48vw, (max-width: 1023px) 30vw, 200px" :
    variant === "medium" ? "(max-width: 639px) 48vw, (max-width: 1023px) 30vw, 250px" :
    variant === "large" ? "(max-width: 767px) 100vw, 600px" : 
    "100vw";

  const imageContent = (
    <NextImage
      src={image.imageUrl}
      alt={image.prompt}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      data-ai-hint={image.dataAiHint || "ai generated"}
      sizes={imageSizes}
      priority={variant === "large"} 
    />
  );

  const cardLink = `/image/${image.id}`; // Example link, adjust as needed

  if (variant === "small") {
    return (
      <Link href={cardLink} legacyBehavior>
        <a className="block">
          <Card className={cardStyle}>
            <CardContent className="p-0 relative w-full h-full">
              {imageContent}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-1.5">
                  <p className="text-3xs text-primary-foreground truncate">{image.prompt}</p>
               </div>
            </CardContent>
          </Card>
        </a>
      </Link>
    );
  }

  if (variant === "medium" || variant === "square") {
     return (
      <Link href={cardLink} legacyBehavior>
        <a className="block">
          <Card className={cardStyle}>
            <CardContent className="p-0 relative w-full h-full">
              {imageContent}
              {showDetailsOverlay && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
                  <p className="text-xs text-primary-foreground truncate">{image.prompt}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <Badge variant="secondary" className="text-3xs bg-black/30 text-white/80 px-1.5 py-0.5 backdrop-blur-sm">
                      <Bot className="w-2.5 h-2.5 mr-0.5" /> {image.model}
                    </Badge>
                    {/* <span className="text-3xs text-white/80">{formattedTime || "..."}</span> */}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </a>
      </Link>
    );
  }

  // Large card variant (for community feed on home page)
  if (variant === "large") {
    return (
      <Link href={cardLink} legacyBehavior>
        <a className="block">
          <Card className={cardStyle}>
            <CardContent className="p-0 relative w-full aspect-[4/3]"> {/* Ensure aspect ratio for image part */}
              {imageContent}
            </CardContent>
            <CardFooter className="p-3 space-y-1 flex flex-col items-start"> {/* Adjusted padding and layout */}
              <p className="text-sm font-medium text-foreground line-clamp-2" title={image.prompt}>
                  {image.prompt}
              </p>
              <div className="flex items-center justify-between w-full text-xs text-muted-foreground pt-1">
                <div className="flex items-center">
                    {image.creatorAvatar ? (
                        <NextImage src={image.creatorAvatar} alt={image.creatorName || "User"} width={20} height={20} className="rounded-full mr-1.5" data-ai-hint="creator avatar small"/>
                    ) : (
                        <UserCircle className="w-4 h-4 mr-1.5" />
                    )}
                    <span>{image.creatorName || "Community Artist"}</span>
                </div>
                <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {formattedTime || "..."}
                </div>
              </div>
            </CardFooter>
          </Card>
        </a>
      </Link>
    );
  }
  
  return null; // Should not happen if variant is always one of the above
}
