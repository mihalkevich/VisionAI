// src/app/(app)/notifications/page.tsx (Placeholder)
"use client";

import { BellRing, MessageSquare, Sparkles, Bell } from "lucide-react"; // Added Bell for empty state

const mockNotifications = [
  { id: "1", icon: BellRing, title: "New Follower!", message: "CreativeGuru started following you.", time: "2m ago", read: false },
  { id: "2", icon: Sparkles, title: "Image Ready", message: "Your 'Cosmic Landscape' image is generated.", time: "1h ago", read: false },
  { id: "3", icon: MessageSquare, title: "Comment on Your Art", message: "ArtLover commented: 'Amazing work!'", time: "3h ago", read: true },
  { id: "4", icon: BellRing, title: "Trending Prompt", message: "Try out the new 'Retro Future' prompt.", time: "1d ago", read: true },
];


export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-4"> {/* mb-6 to mb-4 */}
        <h1 className="text-xl font-bold">Notifications</h1> {/* text-3xl to text-xl */}
      </header>
      
      {mockNotifications.length === 0 ? (
         <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-muted rounded-lg h-full min-h-[250px]"> {/* p-10 to p-8, min-h-[300px] to min-h-[250px] */}
            <Bell className="w-12 h-12 text-muted-foreground mb-3" /> {/* w-16h-16 to w-12h-12, mb-4 to mb-3 */}
            <h3 className="text-lg font-semibold text-foreground mb-1.5">No notifications yet</h3> {/* text-xl to text-lg, mb-2 to mb-1.5 */}
            <p className="text-xs text-muted-foreground">We'll let you know when something new happens.</p> {/* text-sm to text-xs */}
        </div>
      ) : (
        <div className="space-y-3"> {/* space-y-4 to space-y-3 */}
          {mockNotifications.map(notification => {
            const IconComponent = notification.icon;
            return (
              <div key={notification.id} className={`p-3 rounded-lg shadow-md flex items-start space-x-2.5 ${notification.read ? 'bg-card/50' : 'bg-card border-l-2 border-primary'}`}> {/* p-4 to p-3, space-x-3 to space-x-2.5, border-l-4 to border-l-2 */}
                <div className={`p-1.5 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary/20'}`}> {/* p-2 to p-1.5 */}
                   <IconComponent className={`w-4 h-4 ${notification.read ? 'text-muted-foreground' : 'text-primary'}`} /> {/* w-5h-5 to w-4h-4 */}
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-sm text-foreground">{notification.title}</h2> {/* text-base to text-sm */}
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                </div>
                <span className="text-2xs text-muted-foreground whitespace-nowrap">{notification.time}</span> {/* text-xs to text-2xs (may need custom tailwind class) */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
