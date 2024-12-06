"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ColorExplorer } from "@/components/color-explorer";
import { ColorFilters } from "@/components/color-filters";

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  return (
    <main className="min-h-screen py-8">
      <div className="container">
        <div className="max-w-6xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-7xl font-extrabold">Explore Color Palettes</h1>
              <p className="text-muted-foreground mt-2">
                Browse through our collection of curated color palettes and find inspiration for your next project.
              </p>
            </div>
            
            <ColorExplorer 
              activeFilter={activeFilter}
            />
          </motion.div>
        </div>
      </div>
    </main>
  );
} 