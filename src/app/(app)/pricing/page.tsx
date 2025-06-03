// src/app/(app)/pricing/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Zap } from "lucide-react"; // Using Zap for a "power" icon

const plans = [
  {
    name: "Free",
    price: "$0",
    frequency: "/month",
    description: "Get started and explore basic features.",
    features: [
      "Limited image generations",
      "Basic AI prompt assistance",
      "Community access",
      "Watermarked images",
    ],
    cta: "Start for Free",
    variant: "outline",
  },
  {
    name: "Pro",
    price: "$15",
    frequency: "/month",
    description: "For individuals and small teams.",
    features: [
      "Unlimited image generations",
      "Advanced AI prompt assistance",
      "Priority support",
      "No watermarks",
      "Access to premium models",
    ],
    cta: "Get Pro",
    variant: "default",
    popular: true,
  },
  {
    name: "Creator",
    price: "$45",
    frequency: "/month",
    description: "For power users and creative agencies.",
    features: [
      "All Pro features",
      "Early access to new features",
      "API access (coming soon)",
      "Dedicated support channel",
      "Higher generation concurrency",
    ],
    cta: "Choose Creator",
    variant: "outline",
  },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <header className="text-center">
        <h1 className="text-2xl font-bold flex items-center justify-center"> {/* Reduced from text-3xl */}
          <Zap className="w-7 h-7 mr-2 text-primary" /> {/* Reduced from w-8 h-8 */}
          Pricing Plans
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">Choose the plan that's right for your creative needs.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary border-2 shadow-primary/20' : 'shadow-lg'}`}>
            {plan.popular && (
              <div className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold text-center rounded-t-md -mb-px">
                Most Popular
              </div>
            )}
            <CardHeader className="items-center text-center">
              <CardTitle className="text-lg">{plan.name}</CardTitle> {/* Reduced from text-xl or text-2xl */}
              <div className="flex items-baseline">
                <span className="text-3xl font-extrabold text-foreground">{plan.price}</span> {/* Reduced from text-4xl */}
                <span className="ml-1 text-sm text-muted-foreground">{plan.frequency}</span>
              </div>
              <CardDescription className="text-xs">{plan.description}</CardDescription> {/* Ensured smaller text */}
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
              <ul className="space-y-1.5">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-xs"> {/* Ensured smaller text */}
                    <CheckCircle2 className="w-3.5 h-3.5 mr-2 mt-0.5 text-green-500 shrink-0" /> {/* Reduced icon size */}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.variant as "default" | "outline"}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground pt-4">
        Prices are in USD. You can cancel or change your plan anytime.
      </p>
    </div>
  );
}
