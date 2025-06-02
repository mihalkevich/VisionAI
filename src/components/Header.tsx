import { Palette } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-transparent py-4 sm:py-6">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 flex items-center">
        <Palette className="h-8 w-8 mr-3 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-headline font-bold text-foreground">
          VisionAI <span className="text-primary">Studio</span>
        </h1>
      </div>
    </header>
  );
}
