"use client";

import { motion } from "framer-motion";
import { 
  Wand2, 
  Save, 
  Share2, 
  Palette,
  EyeIcon,
  PaintBucket,
  Sparkles,
  Download,
  Zap,
  Layout,
  RefreshCw,
  Shield
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI-Powered Generation",
    description: "Generate infinite color combinations using advanced AI technology"
  },
  {
    icon: EyeIcon,
    title: "Accessibility First",
    description: "Ensure WCAG 2.1 compliance with built-in contrast checking"
  },
  {
    icon: Layout,
    title: "Export Ready",
    description: "Download palettes in multiple formats (CSS, SCSS, Figma, Sketch)"
  },
  {
    icon: Shield,
    title: "Color Psychology",
    description: "Get insights into the emotional impact of your color choices"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate and iterate on palettes in milliseconds"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary">Features</span>
          <h2 className="text-3xl font-bold mt-2 mb-4">
            Everything You Need for Perfect Color Harmony
          </h2>
          <p className="text-muted-foreground">
            Professional-grade tools that make color selection a breeze. Perfect for
            designers, developers, and creatives of all skill levels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-lg bg-background border hover:border-primary/50 transition-colors"
            >
              <div className="relative">
                <div className="bg-primary/5 rounded-lg p-3 w-fit group-hover:bg-primary/10 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}