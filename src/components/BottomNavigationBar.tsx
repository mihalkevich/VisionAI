// src/components/BottomNavigationBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusSquare, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Search },
  { href: "/generate", label: "Generate", icon: PlusSquare, isCentral: true },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background border-t border-border/50 shadow-top-md z-50">
      <div className="container mx-auto h-full">
        <ul className="flex justify-around items-center h-full">
          {navItems.map((item) => {
            const isActive = item.isCentral ? false : (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)));
            const Icon = item.icon;
            return (
              <li key={item.label} className="flex-1">
                <Link href={item.href} className="flex flex-col items-center justify-center h-full">
                  {item.isCentral ? (
                    <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl -mt-6 shadow-lg">
                      <Icon
                        className={cn(
                          "w-6 h-6",
                          "text-primary-foreground"
                        )}
                      />
                    </div>
                  ) : (
                    <Icon
                      className={cn(
                        "w-6 h-6 mb-1",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  )}
                  {!item.isCentral && (
                    <span
                      className={cn(
                        "text-xs",
                        isActive ? "text-primary" : "text-muted-foreground"
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
