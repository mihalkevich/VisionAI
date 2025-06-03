// src/app/(app)/layout.tsx
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-20 md:pb-0"> {/* Adjust padding for bottom nav only on mobile */}
        {children}
      </main>
      <BottomNavigationBar />
    </div>
  );
}
