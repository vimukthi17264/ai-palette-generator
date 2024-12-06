"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Palette, Sparkles, ArrowRight } from "lucide-react";
import { ColorPreview } from "@/components/ui/color-preview";

export function HeroSection() {
  return (
    <section 
      className="relative min-h-[90vh] flex items-center py-12 sm:py-16 lg:py-20"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 backdrop-blur-3xl bg-gradient-to-b from-transparent to-background/5" />
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8 text-center max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <div 
                className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm hover:border-blue-500 transition-colors duration-300"
                role="banner"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 animate-pulse text-blue-500" aria-hidden="true" />
                  <span>Powered by AI</span>
                </span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight"
            >
              Stunning <span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Color Palettes</span> in Seconds
            </motion.h1>
          
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Transform your creative vision into beautiful color harmonies. Our AI-powered
              tool generates perfect color combinations for any project, brand, or design.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center"
            >
              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg group bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                <Link href="/create" className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto text-base sm:text-lg hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-300 hover:scale-105" 
                asChild
              >
                <Link href="/explore" className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Explore Palettes
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-sm text-muted-foreground justify-center pt-4"
            >
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + (i * 0.1) }}
                    className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800"
                  />
                ))}
              </div>
              <p className="font-medium">Join 10,000+ designers & developers</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}