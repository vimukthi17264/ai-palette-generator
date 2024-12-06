"use client";

import { useState } from "react";
import { ColorCard } from "./ui/color-card";
import { SearchPrompt } from "./search-prompt";
import { generatePalette } from "@/lib/gemini";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle, Download, Share2, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { getColorInfo, ColorInfo } from "@/lib/color-utils";
import { toast } from "sonner";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PaletteGeneratorProps {
  onPaletteGenerated: (colors: ColorInfo[]) => void;
}

export function PaletteGenerator({ onPaletteGenerated }: PaletteGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [palette, setPalette] = useState<ColorInfo[]>([]);
  const [lastPrompt, setLastPrompt] = useState<string>("");

  const handleGenerate = async (prompt: string) => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    setLastPrompt(prompt);
    
    try {
      const result = await generatePalette(prompt);
      const enhancedColors = result.colors.map((color: { 
        hex: string; 
        name: string;
        psychology: {
          emotions: string[];
          meanings: string[];
          industries: string[];
        }
      }) => ({
        ...getColorInfo(color.hex),
        name: color.name,
        psychology: {
          emotions: color.psychology.emotions,
          meanings: color.psychology.meanings,
          industries: color.psychology.industries
        }
      }));
      setPalette(enhancedColors);
    } catch (error) {
      console.error(error);
      setError("Failed to generate palette. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateCSSVariables = () => {
    return `:root {\n${palette.map((color, i) => 
      `  --color-${i + 1}: ${color.hex};  /* ${color.name} */`
    ).join('\n')}\n}`;
  };

  const generateSCSS = () => {
    return palette.map((color, i) => 
      `$color-${i + 1}: ${color.hex};  // ${color.name}`
    ).join('\n');
  };

  const downloadAs = (format: 'json' | 'css' | 'scss') => {
    let content: string;
    let filename: string;
    let type: string;

    switch (format) {
      case 'json':
        content = JSON.stringify({
          name: lastPrompt,
          colors: palette.map(color => ({
            name: color.name,
            hex: color.hex,
            rgb: color.rgb,
            hsl: color.hsl,
            psychology: color.psychology
          }))
        }, null, 2);
        filename = `palette-${Date.now()}.json`;
        type = 'application/json';
        break;
      case 'css':
        content = generateCSSVariables();
        filename = `palette-${Date.now()}.css`;
        type = 'text/css';
        break;
      case 'scss':
        content = generateSCSS();
        filename = `palette-${Date.now()}.scss`;
        type = 'text/x-scss';
        break;
    }

    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Palette downloaded as ${format.toUpperCase()}`);
  };

  const sharePalette = async () => {
    const shareData = {
      title: 'Color Palette',
      text: `Check out this color palette inspired by "${lastPrompt}": ${palette.map(c => `${c.name} (${c.hex})`).join(', ')}`,
      url: window.location.href
    };

    try {
      await navigator.share(shareData);
      toast.success("Palette shared successfully!");
    } catch (err) {
      // Fallback to clipboard if Web Share API is not available
      try {
        await navigator.clipboard.writeText(shareData.text);
        toast.success("Palette copied to clipboard!");
      } catch {
        toast.error("Failed to share palette");
      }
    }
  };

  const copyToClipboard = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success(`${type} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <SearchPrompt onGenerate={handleGenerate} loading={loading} />
      
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-sm text-muted-foreground">Generating your palette...</p>
          </div>
        </div>
      )}
      
      {palette.length > 0 && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Generated Palette</h2>
              <p className="text-sm text-muted-foreground">
                Inspired by: <span className="font-medium text-foreground">{lastPrompt}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => downloadAs('json')}>
                    Download as JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadAs('css')}>
                    Download as CSS
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => downloadAs('scss')}>
                    Download as SCSS
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" onClick={sharePalette}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="palette" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="palette">Color Palette</TabsTrigger>
              <TabsTrigger value="preview">Code & Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="palette" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {palette.map((color, index) => (
                  <motion.div
                    key={`${color.hex}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ColorCard 
                      color={color}
                      index={index}
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <div className="space-y-8 p-6 border rounded-lg bg-card">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">CSS Variables</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(generateCSSVariables(), 'CSS')}
                    >
                      Copy CSS
                    </Button>
                  </div>
                  <pre className={cn(
                    "p-4 rounded-lg overflow-x-auto",
                    "bg-muted/50 border border-border/50"
                  )}>
                    <code>{generateCSSVariables()}</code>
                  </pre>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">SCSS Variables</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(generateSCSS(), 'SCSS')}
                    >
                      Copy SCSS
                    </Button>
                  </div>
                  <pre className={cn(
                    "p-4 rounded-lg overflow-x-auto",
                    "bg-muted/50 border border-border/50"
                  )}>
                    <code>{generateSCSS()}</code>
                  </pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </div>
  );
}