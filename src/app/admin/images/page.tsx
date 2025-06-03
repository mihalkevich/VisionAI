// src/app/admin/images/page.tsx
"use client";

import { useState, useEffect } from "react";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit, ImageOff, PlusCircle } from "lucide-react";
import type { GeneratedImage } from "@/types";
import { useToast } from "@/hooks/use-toast";

const initialMockImages: GeneratedImage[] = [
  { id: "admin-img-1", prompt: "A futuristic cityscape at dawn", imageUrl: "https://placehold.co/300x200.png?text=City+Dawn", model: "Artifex AI", timestamp: new Date(Date.now() - 100000), dataAiHint: "futuristic city" },
  { id: "admin-img-2", prompt: "Enchanted forest creature", imageUrl: "https://placehold.co/300x200.png?text=Forest+Creature", model: "Artifex AI", timestamp: new Date(Date.now() - 200000), dataAiHint: "fantasy creature" },
  { id: "admin-img-3", prompt: "Abstract geometric patterns, vibrant colors", imageUrl: "https://placehold.co/300x200.png?text=Abstract+Geo", model: "Artifex AI", timestamp: new Date(Date.now() - 300000), dataAiHint: "abstract pattern" },
  { id: "admin-img-4", prompt: "Steampunk inventor's workshop", imageUrl: "https://placehold.co/300x200.png?text=Steampunk+Shop", model: "Artifex AI", timestamp: new Date(Date.now() - 400000), dataAiHint: "steampunk workshop" },
];

export default function AdminImagesPage() {
  const [images, setImages] = useState<GeneratedImage[]>(initialMockImages);
  const [selectedImage, setSelectedImage] = useState<GeneratedImage | null>(null);
  const [editPrompt, setEditPrompt] = useState<string>("");
  const { toast } = useToast();

  const openEditDialog = (image: GeneratedImage) => {
    setSelectedImage(image);
    setEditPrompt(image.prompt);
  };

  const handleEditSave = () => {
    if (selectedImage && editPrompt.trim() !== "") {
      setImages(prevImages =>
        prevImages.map(img =>
          img.id === selectedImage.id ? { ...img, prompt: editPrompt } : img
        )
      );
      toast({ title: "Prompt Updated", description: `Prompt for image ${selectedImage.id} has been updated.` });
      setSelectedImage(null); // Close dialog by resetting selectedImage
    } else {
      toast({ title: "Error", description: "Prompt cannot be empty.", variant: "destructive" });
    }
  };

  const handleDeleteImage = (imageId: string) => {
    setImages(prevImages => prevImages.filter(img => img.id !== imageId));
    toast({ title: "Image Deleted", description: `Image ${imageId} has been removed.` });
  };
  
  const handleAddNewImage = () => {
    const newId = `admin-img-${Date.now()}`;
    const newImage: GeneratedImage = {
      id: newId,
      prompt: "New Image - Please Edit Prompt",
      imageUrl: `https://placehold.co/300x200.png?text=New+Image`,
      model: "Artifex AI",
      timestamp: new Date(),
      dataAiHint: "new placeholder",
    };
    setImages(prevImages => [newImage, ...prevImages]);
    toast({ title: "New Image Added", description: `A new placeholder image has been added. Please edit its details.`});
    // Optional: scroll to the new image or open edit dialog for it
    // openEditDialog(newImage); 
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-6 pb-4 border-b">
        <h1 className="text-2xl font-semibold text-foreground">Image Management</h1>
        <Button onClick={handleAddNewImage}>
          <PlusCircle className="w-4 h-4 mr-2" /> Add New Image
        </Button>
      </header>

      {images.length === 0 ? (
        <Card className="text-center py-12">
          <CardHeader>
            <ImageOff className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <CardTitle>No Images Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">There are no images to display in the admin panel yet.</p>
             <Button onClick={handleAddNewImage} className="mt-4">
              <PlusCircle className="w-4 h-4 mr-2" /> Add First Image
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(image => (
            <Card key={image.id} className="flex flex-col">
              <CardHeader className="p-0 relative aspect-[3/2] w-full">
                <NextImage
                  src={image.imageUrl}
                  alt={image.prompt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                  data-ai-hint={image.dataAiHint}
                />
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <p className="text-xs text-muted-foreground mb-1">ID: {image.id}</p>
                <p className="text-sm font-medium text-foreground line-clamp-3" title={image.prompt}>
                  {image.prompt}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Model: {image.model}</p>
                <p className="text-xs text-muted-foreground">Created: {new Date(image.timestamp).toLocaleDateString()}</p>
              </CardContent>
              <CardFooter className="p-3 border-t flex space-x-2">
                <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedImage(null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditDialog(image)}>
                      <Edit className="w-3.5 h-3.5 mr-1.5" /> Edit
                    </Button>
                  </DialogTrigger>
                  {selectedImage && selectedImage.id === image.id && (
                     <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Image Prompt</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-prompt-input">Prompt</Label>
                          <Textarea
                            id="edit-prompt-input"
                            value={editPrompt}
                            onChange={(e) => setEditPrompt(e.target.value)}
                            rows={4}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Current Image:</p>
                            <NextImage src={selectedImage.imageUrl} alt="Selected image" width={100} height={66} className="rounded border" data-ai-hint={selectedImage.dataAiHint}/>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="button" onClick={handleEditSave}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="flex-1">
                      <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the image
                        data from this mock list.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteImage(image.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
