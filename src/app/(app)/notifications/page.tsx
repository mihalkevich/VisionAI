// src/app/(app)/notifications/page.tsx (Placeholder)
"use client";

import { BellRing, MessageSquare, Sparkles } from "lucide-react";

const mockNotifications = [
  { id: "1", icon: BellRing, title: "New Follower!", message: "CreativeGuru started following you.", time: "2m ago", read: false },
  { id: "2", icon: Sparkles, title: "Image Ready", message: "Your 'Cosmic Landscape' image is generated.", time: "1h ago", read: false },
  { id: "3", icon: MessageSquare, title: "Comment on Your Art", message: "ArtLover commented: 'Amazing work!'", time: "3h ago", read: true },
  { id: "4", icon: BellRing, title: "Trending Prompt", message: "Try out the new 'Retro Future' prompt.", time: "1d ago", read: true },
];


export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
      </header>
      
      {mockNotifications.length === 0 ? (
         <div className="flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-muted rounded-lg h-full min-h-[300px]">
            <Bell className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No notifications yet</h3>
            <p className="text-muted-foreground">We'll let you know when something new happens.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockNotifications.map(notification => {
            const IconComponent = notification.icon;
            return (
              <div key={notification.id} className={`p-4 rounded-lg shadow-md flex items-start space-x-3 ${notification.read ? 'bg-card/50' : 'bg-card border-l-4 border-primary'}`}>
                <div className={`p-2 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary/20'}`}>
                   <IconComponent className={`w-5 h-5 ${notification.read ? 'text-muted-foreground' : 'text-primary'}`} />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-foreground">{notification.title}</h2>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{notification.time}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
