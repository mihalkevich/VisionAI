// src/app/(app)/notifications/page.tsx (Redesigned Notifications Page)
"use client";

import { BellRing, MessageSquare, Sparkles, Bell, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const mockNotifications = [
  { id: "1", icon: BellRing, title: "People love your artwork!", message: "Check out the latest likes on your AI creation.", time: "2m ago", read: false, type: "social" },
  { id: "2", icon: Sparkles, title: "Faster image generation!", message: "Enjoy even faster rendering results. Try the new optimization.", time: "1h ago", read: false, type: "system" },
  { id: "3", icon: MessageSquare, title: "Your AI image is ready!", message: "'Cosmic Landscape' has been generated. Tap to view and download.", time: "3h ago", read: true, type: "generation" },
  { id: "4", icon: BellRing, title: "Trending Prompt: Retro Future", message: "Try out the new 'Retro Future' prompt for amazing results.", time: "1d ago", read: true, type: "prompt" },
];


export default function NotificationsPage() {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex items-center justify-center relative mb-6">
         <Button variant="ghost" size="icon" className="absolute left-0 text-muted-foreground hover:text-primary" onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
        <h1 className="text-xl font-semibold">Notifications</h1>
      </header>
      
      {mockNotifications.length === 0 ? (
         <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-muted rounded-xl h-full min-h-[300px] mt-10">
            <Bell className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No notifications yet</h3>
            <p className="text-sm text-muted-foreground">We'll let you know when something new happens.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mockNotifications.map(notification => {
            const IconComponent = notification.icon;
            return (
              <div 
                key={notification.id} 
                className={`p-4 rounded-xl shadow-sm flex items-start space-x-3 cursor-pointer hover:bg-card/60 transition-colors
                            ${notification.read ? 'bg-card/80' : 'bg-card border-l-4 border-primary'}`}
              >
                <div className={`p-2 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary/10'}`}>
                   <IconComponent className={`w-5 h-5 ${notification.read ? 'text-muted-foreground' : 'text-primary'}`} />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-sm text-foreground">{notification.title}</h2>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                </div>
                <span className="text-3xs text-muted-foreground whitespace-nowrap pt-1">{notification.time}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
