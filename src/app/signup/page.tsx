// src/app/signup/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Add actual sign up logic here
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
          <h1 className="text-xl font-semibold text-center">Create Your Account</h1>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          Fill the details below to create your Artifex account.
        </p>

        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <Label htmlFor="fullname" className="form-label">Fullname</Label>
            <Input id="fullname" type="text" placeholder="Tara Wilson" className="form-input" />
          </div>
          <div>
            <Label htmlFor="email" className="form-label">Email</Label>
            <Input id="email" type="email" placeholder="tarawilson@gmail.com" className="form-input" />
          </div>
          <div>
            <Label htmlFor="password"className="form-label">Password</Label>
            <Input id="password" type="password" placeholder="**********" className="form-input" />
          </div>
          <div>
            <Label htmlFor="confirm-password" className="form-label">Confirm Password</Label>
            <Input id="confirm-password" type="password" placeholder="**********" className="form-input" />
          </div>
          <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-primary-glow text-sm font-semibold">
            Create Account
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          By signing up you agree to our{" "}
          <Link href="/terms" legacyBehavior><a className="text-primary hover:underline">Terms of Service</a></Link> and{" "}
          <Link href="/privacy" legacyBehavior><a className="text-primary hover:underline">Privacy Policy</a></Link>.
        </p>
        
        <p className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" legacyBehavior>
            <a className="font-semibold text-primary hover:underline">Log In</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
