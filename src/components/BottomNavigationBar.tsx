// src/components/BottomNavigationBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusSquare, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Home", icon: Home }, // Changed default / to /home
  { href: "/explore", label: "Explore", icon: Search },
  { href: "/generate", label: "Generate", icon: PlusSquare, isCentral: true },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-14 bg-background border-t border-border/50 shadow-top-md z-50"> {/* h-16 to h-14 */}
      <div className="container mx-auto h-full">
        <ul className="flex justify-around items-center h-full">
          {navItems.map((item) => {
            const isActive = item.isCentral ? false : (pathname === item.href || (item.href !== "/home" && pathname.startsWith(item.href)));
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex-1">
                <Link href={item.href} className="flex flex-col items-center justify-center h-full p-1"> {/* Added p-1 for touch target */}
                  {item.isCentral ? (
                    <div className="flex items-center justify-center w-11 h-11 bg-primary rounded-lg -mt-5 shadow-lg"> {/* w-12h-12 to w-11h-11, rounded-xl to lg, -mt-6 to -mt-5 */}
                      <Icon
                        className={cn(
                          "w-5 h-5", // w-6h-6 to w-5h-5
                          "text-primary-foreground"
                        )}
                      />
                    </div>
                  ) : (
                    <Icon
                      className={cn(
                        "w-5 h-5 mb-0.5", // w-6h-6 to w-5h-5, mb-1 to mb-0.5
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  )}
                  {!item.isCentral && (
                    <span
                      className={cn(
                        "text-xs", // Kept text-xs, as halving would be too small
                        isActive ? "text-primary font-medium" : "text-muted-foreground" // Added font-medium for active
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
