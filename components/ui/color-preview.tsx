"use client";

import { motion } from "framer-motion";
import { Card } from "./card";

export function ColorPreview() {
  const previewColors = [
    { hex: "#FF6B6B", name: "Coral Red" },
    { hex: "#4ECDC4", name: "Medium Turquoise" },
    { hex: "#45B7D1", name: "Summer Sky" },
    { hex: "#96CEB4", name: "Celadon" },
    { hex: "#FFEEAD", name: "Cream" }
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-pink-500/20 to-orange-500/20 blur-3xl" />
      <Card className="relative overflow-hidden border-2">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="h-8 w-32 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-64 rounded bg-muted animate-pulse" />
              <div className="h-4 w-48 rounded bg-muted animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {previewColors.map((color, index) => (
              <motion.div
                key={color.hex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div
                  className="aspect-square rounded-lg shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="space-y-1">
                  <div className="h-3 w-12 rounded bg-muted animate-pulse" />
                  <div className="h-2 w-16 rounded bg-muted animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="h-9 w-24 rounded bg-primary animate-pulse" />
            <div className="h-9 w-24 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </Card>
    </div>
  );
}