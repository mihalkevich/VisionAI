// src/app/(app)/layout.tsx
import BottomNavigationBar from "@/components/BottomNavigationBar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-16"> {/* Add padding-bottom to avoid overlap with nav bar */}
        {children}
      </main>
      <BottomNavigationBar />
    </div>
  );
}
