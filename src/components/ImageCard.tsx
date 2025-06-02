"use client";

import type { GeneratedImage } from "@/types";
import Image from "next/image";
import { Download, Bot, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';

interface ImageCardProps {
  image: GeneratedImage;
}

export default function ImageCard({ image }: ImageCardProps) {
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = image.imageUrl;
    // Suggest a filename for the download
    const filename = `${image.model.toLowerCase()}_${image.prompt.substring(0, 20).replace(/\s+/g, '_') || 'image'}.png`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold truncate" title={image.prompt}>
          {image.prompt.length > 50 ? `${image.prompt.substring(0, 47)}...` : image.prompt}
        </CardTitle>
        <CardDescription className="text-xs flex items-center">
          <Clock className="w-3 h-3 mr-1" /> {formatDistanceToNow(new Date(image.timestamp), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent className="aspect-[4/3] relative overflow-hidden flex-grow">
        <Image
          src={image.imageUrl}
          alt={image.prompt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={image.dataAiHint || "abstract art"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-4">
        <Badge variant="secondary" className="flex items-center gap-1 text-xs">
          <Bot className="w-3 h-3" />
          {image.model}
        </Badge>
        <Button variant="outline" size="sm" onClick={handleDownload} aria-label="Download image">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}
