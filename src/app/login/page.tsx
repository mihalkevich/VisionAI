// src/app/login/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add actual login logic here
    // For now, just navigate to home
    router.push('/home');
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="relative flex items-center justify-center">
           <Button variant="ghost" size="icon" className="absolute left-0 text-muted-foreground hover:text-primary" onClick={() => router.push('/auth')}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-semibold text-center">Log In to Your Account</h1>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Complete the fields to log in and explore your Artifex account.
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <Label htmlFor="email" className="form-label">Email</Label>
            <Input id="email" type="email" placeholder="tarawilson@gmail.com" className="form-input" />
          </div>
          <div>
            <div className="flex justify-between items-baseline">
                <Label htmlFor="password" className="form-label">Password</Label>
                <Link href="/forgot-password" legacyBehavior>
                    <a className="text-xs text-primary hover:underline">Forgot Password?</a>
                </Link>
            </div>
            <Input id="password" type="password" placeholder="**********" className="form-input" />
          </div>
          
          <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-primary-glow text-sm font-semibold">
            Login
          </Button>
        </form>
        
        <p className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" legacyBehavior>
            <a className="font-semibold text-primary hover:underline">Sign Up</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
