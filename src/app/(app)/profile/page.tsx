// src/app/(app)/profile/page.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageCard from "@/components/ImageCard";
import type { GeneratedImage } from "@/types";
import { Settings, Edit2, Grid3X3, Heart, Bookmark, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";


// Mock data
const userGeneratedImages: GeneratedImage[] = [
  { id: "user1", prompt: "Mystical Cat", imageUrl: "https://placehold.co/400x400.png", model: "Midjourney", timestamp: new Date(), dataAiHint: "mystical cat" },
  { id: "user2", prompt: "Space Explorer", imageUrl: "https://placehold.co/400x400.png", model: "OpenAI", timestamp: new Date(), dataAiHint: "space explorer" },
  { id: "user3", prompt: "Abstract City", imageUrl: "https://placehold.co/400x400.png", model: "Stable Diffusion", timestamp: new Date(), dataAiHint: "abstract city" },
  { id: "user4", prompt: "Robot Companion", imageUrl: "https://placehold.co/400x400.png", model: "Midjourney", timestamp: new Date(), dataAiHint: "robot companion" },
  { id: "user5", prompt: "Enchanted Forest", imageUrl: "https://placehold.co/400x400.png", model: "OpenAI", timestamp: new Date(), dataAiHint: "enchanted forest" },
  { id: "user6", prompt: "Neon Dreams", imageUrl: "https://placehold.co/400x400.png", model: "Stable Diffusion", timestamp: new Date(), dataAiHint: "neon dreams" },
];

const userLikedImages: GeneratedImage[] = [
    { id: "liked1", prompt: "Liked Art 1", imageUrl: "https://placehold.co/400x400.png", model: "Midjourney", timestamp: new Date(), dataAiHint: "liked art" },
    { id: "liked2", prompt: "Liked Art 2", imageUrl: "https://placehold.co/400x400.png", model: "OpenAI", timestamp: new Date(), dataAiHint: "liked art" },
];


export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-5">
      <header className="flex items-center justify-between">
         <h1 className="text-xl font-bold">Profile</h1>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      <section className="flex flex-col items-center text-center space-y-2.5 p-3 bg-card rounded-lg shadow-md">
        <Avatar className="w-20 h-20 border-2 border-primary">
          <AvatarImage src="https://placehold.co/100x100.png" alt="User Name" data-ai-hint="profile avatar" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">Tara Wilson</h2>
        <p className="text-xs text-muted-foreground">@tarawilson</p>
        <p className="text-xs max-w-sm">
          Digital artist exploring the frontiers of AI creativity. Lover of pixels and possibilities.
        </p>
        <Button variant="outline" size="sm" className="bg-primary/10 border-primary text-primary hover:bg-primary/20 text-xs">
          <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit Profile
        </Button>
      </section>

      <section className="grid grid-cols-3 gap-1.5 text-center bg-card p-2.5 rounded-lg shadow-sm">
        <div>
          <p className="text-lg font-semibold">{userGeneratedImages.length}</p>
          <p className="text-2xs text-muted-foreground">Creations</p>
        </div>
        <div>
          <p className="text-lg font-semibold">1.2K</p>
          <p className="text-2xs text-muted-foreground">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold">340</p>
          <p className="text-2xs text-muted-foreground">Following</p>
        </div>
      </section>
      
      <Link href="/pricing" legacyBehavior passHref>
          <Button variant="outline" className="w-full bg-primary/10 border-primary text-primary hover:bg-primary/20 text-sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Pricing Plans / Upgrade
          </Button>
      </Link>

      <Tabs defaultValue="creations" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card p-0.5 h-auto">
          <TabsTrigger value="creations" className="py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Grid3X3 className="w-3.5 h-3.5 mr-1.5 sm:hidden" />
            <span className="hidden sm:inline">My Creations</span>
             <span className="sm:hidden">Creations</span>
          </TabsTrigger>
          <TabsTrigger value="liked" className="py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Heart className="w-3.5 h-3.5 mr-1.5 sm:hidden" />
            <span className="hidden sm:inline">Liked</span>
             <span className="sm:hidden">Liked</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="py-1.5 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Bookmark className="w-3.5 h-3.5 mr-1.5 sm:hidden"/>
            <span className="hidden sm:inline">Saved</span>
            <span className="sm:hidden">Saved</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="creations" className="mt-3">
          {userGeneratedImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2.5">
              {userGeneratedImages.map((image) => (
                <ImageCard key={image.id} image={image} variant="square"/>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-6">No creations yet.</p>
          )}
        </TabsContent>
        <TabsContent value="liked" className="mt-3">
           {userLikedImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2.5">
              {userLikedImages.map((image) => (
                <ImageCard key={image.id} image={image} variant="square" />
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-6">You haven't liked any images yet.</p>
          )}
        </TabsContent>
         <TabsContent value="saved" className="mt-3">
            <p className="text-xs text-muted-foreground text-center py-6">You haven't saved any images yet.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
