// src/app/(app)/pricing/page.tsx (Redesigned Pricing Page)
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Sparkles, ChevronLeft, ShieldCheck, CreditCard, Bitcoin } from "lucide-react";
import SegmentedControl from "@/components/ui/SegmentedControl";
import { useState } from "react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Basic",
    priceMonthly: "$0",
    priceYearly: "$0",
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
    borderColor: "border-muted",
  },
  {
    name: "Premium",
    priceMonthly: "$15",
    priceYearly: "$12", // Example yearly discount
    frequency: "/month",
    description: "For individuals and small teams.",
    features: [
      "Unlimited image generations",
      "Advanced AI prompt assistance",
      "Priority support",
      "No watermarks",
      "Access to premium models",
      "Faster image processing",
    ],
    cta: "Start 1 Month Free Trial",
    variant: "default",
    popular: true,
    borderColor: "border-primary",
  },
  {
    name: "Creator",
    priceMonthly: "$45",
    priceYearly: "$38", // Example yearly discount
    frequency: "/month",
    description: "For power users and creative agencies.",
    features: [
      "All Premium features",
      "Early access to new features",
      "API access (coming soon)",
      "Dedicated support channel",
      "Higher generation concurrency",
    ],
    cta: "Choose Creator",
    variant: "outline",
    borderColor: "border-muted",
  },
];

const paymentMethods = [
    { name: "Credit/Debit Card", icon: CreditCard },
    { name: "Cryptocurrency", icon: Bitcoin },
    { name: "Stars", icon: Sparkles }, // Assuming "Stars" is a platform currency
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"yearly" | "monthly">("yearly");
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <header className="flex items-center justify-center relative">
         <Button variant="ghost" size="icon" className="absolute left-0 text-muted-foreground hover:text-primary" onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
        <h1 className="text-xl font-semibold text-center">Artifex Premium</h1>
      </header>

      <div className="relative w-full aspect-[16/7] rounded-xl overflow-hidden shadow-lg">
        <NextImage src="https://placehold.co/800x350.png" alt="Artifex Premium Benefits" layout="fill" objectFit="cover" data-ai-hint="premium benefits abstract" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h2 className="text-2xl font-bold text-white mb-1">Unlock Premium</h2>
          <p className="text-sm text-neutral-300">Elevate your creative workflow with exclusive features.</p>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Start your free trial by selecting a plan</p>
        <SegmentedControl
          name="billingCycle"
          options={[
            { label: "YEARLY (Save 20%)", value: "yearly" },
            { label: "MONTHLY", value: "monthly" },
          ]}
          value={billingCycle}
          onChange={(val) => setBillingCycle(val as "yearly" | "monthly")}
          className="max-w-xs mx-auto !rounded-xl"
          itemClassName="text-xs"
        />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col rounded-xl shadow-lg ${plan.popular ? plan.borderColor + ' border-2 shadow-primary/20' : 'border-card'}`}>
            {plan.popular && (
              <div className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold text-center rounded-t-lg -mb-px">
                Most Popular
              </div>
            )}
            <CardHeader className="items-center text-center pt-6">
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <div className="flex items-baseline mt-1">
                <span className="text-3xl font-extrabold text-foreground">
                  {billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">{plan.frequency}</span>
              </div>
              <CardDescription className="text-xs mt-1">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-2 pt-2 pb-4">
              <ul className="space-y-1.5">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 mr-2 mt-0.5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-4">
              <Button className="w-full h-11 rounded-lg text-sm font-semibold shadow-primary-glow" variant={plan.variant as "default" | "outline"}>
                {plan.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground pt-2">
        You can cancel or change your plan anytime.
      </p>

      <section>
        <h3 className="text-base font-semibold mb-3 text-center">Accepted Payment Methods</h3>
        <div className="flex flex-wrap justify-center gap-4">
            {paymentMethods.map(method => {
                const Icon = method.icon;
                return (
                    <div key={method.name} className="flex items-center p-3 bg-card rounded-lg shadow-sm min-w-[160px]">
                        <Icon className="w-5 h-5 mr-2.5 text-primary"/>
                        <span className="text-xs text-foreground">{method.name}</span>
                    </div>
                );
            })}
        </div>
      </section>

    </div>
  );
}

