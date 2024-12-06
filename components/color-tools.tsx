"use client";

import { ColorInfo } from "@/lib/types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Copy, Download, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ColorToolsProps {
  colors: ColorInfo[];
}

export function ColorTools({ colors }: ColorToolsProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const downloadPalette = () => {
    const data = {
      colors: colors.map(color => ({
        hex: color.hex,
        rgb: color.rgb,
        hsl: color.hsl,
        name: color.name
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Palette downloaded!");
  };

  const sharePalette = async () => {
    try {
      await navigator.share({
        title: 'Color Palette',
        text: `Check out this color palette: ${colors.map(c => c.hex).join(', ')}`,
        url: window.location.href
      });
      toast.success("Palette shared successfully!");
    } catch (err) {
      toast.error("Failed to share palette");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Button onClick={downloadPalette} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Palette
        </Button>
        <Button onClick={sharePalette} variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share Palette
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {colors.map((color, index) => (
          <Card key={`${color.hex}-${index}`} className="p-4 space-y-4">
            <div
              className="h-24 rounded-md"
              style={{ backgroundColor: color.hex }}
            />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{color.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(color.hex)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>HEX: {color.hex}</p>
                <p>RGB: {color.rgb}</p>
                <p>HSL: {color.hsl}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}