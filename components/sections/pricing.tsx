"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for personal projects",
    features: [
      "5 palettes per day",
      "Basic color formats",
      "Community templates",
      "Email support"
    ]
  },
  {
    name: "Pro",
    price: "$12",
    description: "For professional designers",
    features: [
      "Unlimited palettes",
      "All color formats",
      "Custom templates",
      "Priority support",
      "Team sharing",
      "API access"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Advanced analytics",
      "24/7 support",
      "SLA guarantee",
      "Dedicated account manager"
    ]
  }
];

export function PricingSection() {
  return (
    <section className="py-24">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary">Pricing</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground">
            Choose the perfect plan for your needs. All plans include our core features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-lg border bg-background p-8 ${
                plan.popular ? "border-primary shadow-lg" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm">
                  Most Popular
                </div>
              )}
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div>
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
                
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                  <Link href="/create">Get Started</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}