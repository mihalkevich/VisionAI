// src/app/admin/layout.tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      {/* Potentially a simple admin header here if needed in the future */}
      {/* <header className="bg-card border-b p-4 shadow-sm">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
      </header> */}
      <main className="flex-grow">
        {children}
      </main>
      {/* Potentially a simple admin footer here */}
    </div>
  );
}
