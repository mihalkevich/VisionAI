// src/components/BottomNavigationBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusSquare, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Search },
  { href: "/generate", label: "Generate", icon: PlusSquare, isCentral: true },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border/70 shadow-top-md z-50 md:hidden">
      <div className="container mx-auto h-full">
        <ul className="flex justify-around items-center h-full">
          {navItems.map((item) => {
            const isActive = item.isCentral ? false : (pathname === item.href || (item.href !== "/home" && pathname.startsWith(item.href) && item.href !== "/"));
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex-1">
                <Link href={item.href} className="flex flex-col items-center justify-center h-full p-1 group">
                  {item.isCentral ? (
                    <div className={cn(
                      "flex items-center justify-center w-12 h-12 bg-primary rounded-xl -mt-5 shadow-lg shadow-primary/30",
                      "group-hover:bg-primary/90 transition-all"
                    )}>
                      <Icon
                        className="w-6 h-6 text-primary-foreground"
                      />
                    </div>
                  ) : (
                    <>
                      <Icon
                        className={cn(
                          "w-5 h-5 mb-0.5 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs transition-colors",
                          isActive ? "text-primary font-medium" : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </span>
                    </>
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
