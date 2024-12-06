"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-4xl font-bold">
            Ready to Transform Your Design Process?
          </h2>
          <p className="text-xl text-primary-foreground/80">
            Join thousands of designers and developers who are creating beautiful
            color palettes with our AI-powered tool.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/create" className="text-lg group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/60">
            No credit card required • Free plan available
          </p>
        </motion.div>
      </div>
    </section>
  );
}