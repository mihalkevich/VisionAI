// src/app/(app)/profile/page.tsx (Redesigned Profile Page)
"use client";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageCard from "@/components/ImageCard";
import type { GeneratedImage } from "@/types";
import { Settings, Edit2, Grid3X3, Heart, Bookmark, ChevronLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


// Mock data
const userGeneratedImages: GeneratedImage[] = [
  { id: "user1", prompt: "Mystical Cat in a Neon Forest", imageUrl: "https://placehold.co/400x400.png", model: "Artifex AI", timestamp: new Date(), dataAiHint: "mystical cat" },
  { id: "user2", prompt: "Space Explorer discovering new galaxy", imageUrl: "https://placehold.co/400x400.png", model: "Artifex AI", timestamp: new Date(), dataAiHint: "space explorer" },
  { id: "user3", prompt: "Abstract representation of City Sounds", imageUrl: "https://placehold.co/400x400.png", model: "Artifex AI", timestamp: new Date(), dataAiHint: "abstract city" },
  { id: "user4", prompt: "Cute Robot Companion with a flower", imageUrl: "https://placehold.co/400x400.png", model: "Artifex AI", timestamp: new Date(), dataAiHint: "robot flower" },
  { id: "user5", prompt: "Enchanted Forest with glowing mushrooms", imageUrl: "https://placehold.co/400x400.png", model: "Artifex AI", timestamp: new Date(), dataAiHint: "enchanted forest" },
  { id: "user6", prompt: "Retro Neon Dreams of the 80s", imageUrl: "https://placehold.co/400x400.png", model: "Artifex AI", timestamp: new Date(), dataAiHint: "neon dreams" },
];

const userLikedImages: GeneratedImage[] = [
    { id: "liked1", prompt: "Liked Artwork: Serene Mountain Peak", imageUrl: "https://placehold.co/400x400.png", model: "Artifex AI", timestamp: new Date(), dataAiHint: "mountain peak" },
    { id: "liked2", prompt: "Liked Artwork: Underwater Coral City", imageUrl: "https://placehold.co/400x400.png", model: "Artifex AI", timestamp: new Date(), dataAiHint: "coral city" },
];


export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/auth');
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <header className="flex items-center justify-between relative">
         <Button variant="ghost" size="icon" className="absolute left-0 -ml-2 text-muted-foreground hover:text-primary" onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
         <h1 className="text-xl font-semibold text-center flex-grow">Profile</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary -mr-2">
              <Settings className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <section className="flex flex-col items-center text-center space-y-3 p-4 bg-card rounded-xl shadow-lg">
        <Avatar className="w-24 h-24 border-4 border-primary ring-4 ring-primary/20">
          <AvatarImage src="https://placehold.co/100x100.png?text=TW" alt="Tara Wilson" data-ai-hint="profile avatar" />
          <AvatarFallback>TW</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">Tara Wilson</h2>
        <p className="text-sm text-muted-foreground">@tarawilson</p>
        <p className="text-xs max-w-md mx-auto text-muted-foreground">
          Digital artist exploring the frontiers of AI creativity. Lover of pixels and possibilities. Turning imagination into visuals.
        </p>
        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 text-xs !rounded-lg px-4 py-2">
          <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit Profile
        </Button>
      </section>

      <section className="grid grid-cols-3 gap-2 text-center bg-card p-3 rounded-xl shadow-sm">
        <div>
          <p className="text-lg font-bold">{userGeneratedImages.length}</p>
          <p className="text-2xs text-muted-foreground uppercase">Creations</p>
        </div>
        <div>
          <p className="text-lg font-bold">1.2K</p>
          <p className="text-2xs text-muted-foreground uppercase">Followers</p>
        </div>
        <div>
          <p className="text-lg font-bold">340</p>
          <p className="text-2xs text-muted-foreground uppercase">Following</p>
        </div>
      </section>
      

      <Tabs defaultValue="creations" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-card p-1 h-auto rounded-xl">
          <TabsTrigger value="creations" className="py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-lg">
            <Grid3X3 className="w-4 h-4 mr-1.5 sm:mr-2" />
            My Creations
          </TabsTrigger>
          <TabsTrigger value="liked" className="py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-lg">
            <Heart className="w-4 h-4 mr-1.5 sm:mr-2" />
            Liked
          </TabsTrigger>
          <TabsTrigger value="saved" className="py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md rounded-lg">
            <Bookmark className="w-4 h-4 mr-1.5 sm:mr-2"/>
            Saved
          </TabsTrigger>
        </TabsList>
        <TabsContent value="creations" className="mt-4">
          {userGeneratedImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {userGeneratedImages.map((image) => (
                <ImageCard key={image.id} image={image} variant="square"/>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-10">No creations yet. Start generating!</p>
          )}
        </TabsContent>
        <TabsContent value="liked" className="mt-4">
           {userLikedImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {userLikedImages.map((image) => (
                <ImageCard key={image.id} image={image} variant="square" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-10">You haven't liked any images yet.</p>
          )}
        </TabsContent>
         <TabsContent value="saved" className="mt-4">
            <p className="text-sm text-muted-foreground text-center py-10">You haven't saved any collections yet.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
