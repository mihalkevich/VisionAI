// src/app/(app)/generate/page.tsx (Placeholder)
"use client";

import { Wand2 } from "lucide-react";

export default function GeneratePage() {
  return (
    <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <Wand2 className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-3xl font-bold mb-4 text-center">Image Generation Hub</h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        This is where the magic happens! Create stunning visuals from your prompts.
        The full generation interface will be built here.
      </p>
      <div className="p-6 bg-card rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-3 text-center">Coming Soon</h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Detailed prompt input</li>
          <li>Style selection</li>
          <li>Aspect ratio choices</li>
          <li>Real-time generation preview (hopefully!)</li>
        </ul>
      </div>
    </div>
  );
}
