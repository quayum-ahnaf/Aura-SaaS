"use client";

import React from "react";
import { Check, Info, Sparkles } from "lucide-react";
import { useToast } from "@/components/toast";
import { motion } from "framer-motion";

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular: boolean;
  color: string;
}

const plans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for hobbyists and individual portfolios.",
    features: [
      "1 Active Project",
      "Up to 3 Team Members",
      "5 GB Cloud Storage",
      "Community Forum Access",
      "Basic Analytics Dashboard",
    ],
    buttonText: "Get Started",
    popular: false,
    color: "zinc",
  },
  {
    name: "Pro",
    price: "$29",
    description: "Great for freelancers and small growing startups.",
    features: [
      "Unlimited Projects",
      "Up to 15 Team Members",
      "100 GB Cloud Storage",
      "Priority Email Support (24h)",
      "Advanced Growth Analytics",
      "Custom Domain Setup",
      "Aura Branding Removal",
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
    color: "indigo",
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For scaling businesses needing robust features.",
    features: [
      "Everything in Pro Plan",
      "Unlimited Team Members",
      "1 TB Dedicated Storage",
      "24/7 Phone & Slack Support",
      "Dedicated Account Manager",
      "SAML SSO Authentication",
      "Custom Service Level Agreement (SLA)",
    ],
    buttonText: "Contact Enterprise",
    popular: false,
    color: "violet",
  },
];

export default function PricingPage() {
  const { toast } = useToast();

  const handleUpgrade = (planName: string) => {
    toast({
      title: "Demo Billing Mode",
      description: `Upgrade action to "${planName}" is simulated. Payments and Stripe connections are disabled in this portfolio sandbox.`,
      type: "warning",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-2">
        <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-500/20 px-3 py-1 rounded-full">
          Flexible Pricing
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-950 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent mt-1">
          Plans for Every Developer
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">
          Start building for free or choose a premium subscription plan that scales dynamically with your user traffic.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid gap-8 lg:grid-cols-3 items-stretch pt-4">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className={`flex flex-col relative rounded-2xl p-6 bg-white dark:bg-zinc-900 border shadow-sm transition-all group ${
              plan.popular
                ? "border-zinc-900 dark:border-zinc-100 ring-2 ring-zinc-900 dark:ring-zinc-100/30 scale-100 lg:scale-[1.03] z-10"
                : "border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700"
            }`}
          >
            {/* Ambient background light for the cards */}
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none transition-all group-hover:opacity-15 ${
              plan.color === "indigo" ? "bg-indigo-500" :
              plan.color === "violet" ? "bg-violet-500" : "bg-zinc-500"
            }`} />

            {/* Popular Badge */}
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 px-3.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-md">
                <Sparkles className="h-3 w-3" />
                Most Popular
              </span>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                {plan.name}
              </h3>
              <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-1 min-h-[32px]">
                {plan.description}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {plan.price}
                </span>
                <span className="text-zinc-400 dark:text-zinc-500 text-xs font-semibold">
                  /month
                </span>
              </div>
            </div>

            <button
              onClick={() => handleUpgrade(plan.name)}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all mb-8 shadow-sm hover:shadow ${
                plan.popular
                  ? "bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-100"
                  : "bg-zinc-50 text-zinc-900 hover:bg-zinc-150 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-850"
              }`}
            >
              {plan.buttonText}
            </button>

            <ul className="space-y-3.5 mt-auto">
              <span className="text-[10px] font-bold text-zinc-450 dark:text-zinc-500 uppercase tracking-widest">
                Features Included:
              </span>
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <div className={`p-0.5 rounded-full mt-0.5 flex-shrink-0 ${
                    plan.popular 
                      ? "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400" 
                      : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}>
                    <Check className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-sm text-zinc-650 dark:text-zinc-350 font-medium leading-tight">
                    {feat}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      
      {/* Disclaimer */}
      <div className="flex gap-3 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 p-4 rounded-xl max-w-xl mx-auto">
        <Info className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-555 dark:text-zinc-450 leading-relaxed font-medium">
          <strong>Sandbox Notice</strong>: All billing options on this page are non-functional mock triggers for demo presentation. No Stripe checkouts will occur and your profile information remains strictly local.
        </p>
      </div>
    </div>
  );
}
