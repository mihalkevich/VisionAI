
// src/app/page.tsx (New Authentication Screen)
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator'; // Using ShadCN Separator

// SVG for Apple Icon
const AppleIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 mr-2">
    <path d="M12.061 18.073c-.779.262-1.572.413-2.43.438-.982 0-2.008-.209-2.982-.626a4.737 4.737 0 0 1-2.071-1.949c-.929-1.275-1.469-2.961-1.469-4.648s.464-3.261 1.339-4.435c.929-1.175 2.117-1.937 3.397-1.937.422 0 .911.105 1.409.287.464.182.895.438 1.26.756l-.053.026c-.211-.156-.448-.287-.725-.391-.277-.105-.531-.182-.811-.235a3.04 3.04 0 0 0-.92-.105c-1.546 0-2.818.861-3.694 2.244-.849 1.351-1.233 2.908-1.18 4.355.026 1.549.602 2.988 1.495 3.914.818.81 1.844 1.224 3.102 1.224.681 0 1.31-.129 1.892-.391l.026.026zm5.328-5.619c-.053-1.832-.938-3.377-2.404-4.461.818-1.07 1.339-2.355 1.339-3.653 0-.21-.026-.421-.053-.632a4.146 4.146 0 0 0-3.155-2.054c-1.286-.157-2.713.392-3.917 1.41.955.807 1.572 1.924 1.572 3.208 0 1.937-1.036 3.533-2.66 4.514-.981.603-2.008.943-3.076.943-.236 0-.5-.026-.79-.079-.026 0-.026 0 0 0a8.28 8.28 0 0 0 4.23 1.991c1.102.288 2.21.41 3.343.41.315 0 .603-.026.866-.053a4.6 4.6 0 0 0 2.66-1.047c.026 0 .026-.027.026-.027s-.026-.026-.026-.026a4.07 4.07 0 0 0 1.732-2.913zm-2.151-1.964c.262-.288.42-.63.42-.996a.914.914 0 0 0-.956-.942.863.863 0 0 0-.955.942c0 .392.184.733.448.996.262.262.602.41 1.01.41.382 0 .721-.148.981-.41z"/>
  </svg>
);

// SVG for Google Icon
const GoogleIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    <path d="M1 1h22v22H1z" fill="none"/>
  </svg>
);

export default function WelcomePage() {
  return (
    <div className="relative flex flex-col items-center justify-end min-h-screen bg-background text-foreground p-4 pb-0 overflow-hidden">
      {/* Background Image Grid */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-1.5 opacity-25 transform scale-105 blur-xs">
          {[...Array(49)].map((_, i) => (
            <div key={i} className="aspect-square bg-card rounded-sm overflow-hidden">
              <Image
                src={`https://placehold.co/200x200.png?text=Art${i}`}
                alt={`Placeholder art ${i}`}
                width={200}
                height={200}
                className="object-cover w-full h-full"
                data-ai-hint="abstract art"
                priority={i < 10}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-transparent"></div>
      </div>

      {/* Auth Panel */}
      <div className="relative z-10 bg-card rounded-t-3xl sm:rounded-xl p-6 sm:p-8 shadow-2xl w-full max-w-sm mb-0 mt-auto"> {/* Adjusted for bottom sheet appearance */}
        <div className="flex flex-col space-y-4">
          <Link href="/signup" passHref legacyBehavior>
            <Button asChild className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
              <a>Sign Up</a>
            </Button>
          </Link>
          
          <Link href="/login" passHref legacyBehavior>
            <Button asChild variant="outline" className="w-full h-12 text-base border-primary text-primary hover:bg-primary/10 hover:border-primary rounded-xl">
              <a>Login</a>
            </Button>
          </Link>

          <div className="relative my-2"> {/* Reduced margin for "or" separator */}
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-2 text-xs text-muted-foreground">or</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-12 text-base text-foreground hover:bg-muted rounded-xl justify-start pl-4">
            <AppleIcon />
            Continue with Apple
          </Button>

          <Button variant="outline" className="w-full h-12 text-base text-foreground hover:bg-muted rounded-xl justify-start pl-4">
            <GoogleIcon />
            Continue with Google
          </Button>
        </div>
      </div>
      {/* Removed footer text to match design more closely */}
    </div>
  );
}

    