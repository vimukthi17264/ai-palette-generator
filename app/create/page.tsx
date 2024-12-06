"use client";

import { PaletteGenerator } from "@/components/palette-generator";
import { ColorTools } from "@/components/color-tools";
import { useState } from "react";
import { ColorInfo } from "@/lib/types";
import { motion } from "framer-motion";

export default function CreatePage() {
  const [currentPalette, setCurrentPalette] = useState<ColorInfo[]>([]);

  return (
    <main className="min-h-screen place-content-center">
      <div className="container">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-extrabold">Create Palette</h1>
              <p className="text-muted-foreground mt-2">
                Describe your vision and let AI generate the perfect color combination.
              </p>
            </div>

            <PaletteGenerator onPaletteGenerated={(colors) => {
              setCurrentPalette(colors.map(color => ({ ...color, tetradic: [] })));
            }} />
            
            {currentPalette.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <ColorTools colors={currentPalette} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </main>
  );
}