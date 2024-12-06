"use client";

import { useState } from "react";
import { Copy, Info, Check } from "lucide-react"; 
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ColorInfo } from "@/lib/color-utils";
import { motion } from "framer-motion";

interface ColorCardProps {
  color: ColorInfo;
  index: number;
}

export function ColorCard({ color, index }: ColorCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      setIsLoading(true);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(`${label} copied to clipboard`);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    } finally {
      setIsLoading(false);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setShowDetails(true);
        }
      }}
      aria-label={`Color: ${color.name}, HEX: ${color.hex}`}
    >
      <div
        className="aspect-square w-full transition-all duration-300 group-hover:scale-[1.02]"
        style={{ backgroundColor: color.hex }}
      >
        <div 
          className="absolute inset-0 p-4 flex flex-col justify-between backdrop-blur-[2px] backdrop-brightness-[0.98] opacity-0 group-hover:opacity-100 transition-all duration-200"
          style={{ color: color.contrast }}
        >
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg leading-tight max-w-[80%] drop-shadow-sm">
              {color.name}
            </h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="link"
                    size="icon"
                    className="h-8 w-8 transition-transform hover:scale-110 focus:scale-110"
                    onClick={() => setShowDetails(true)}
                    aria-label="View color details"
                  >
                    <Info className="h-4 w-4" style={{ color: color.contrast }} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View color details</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-medium drop-shadow-sm">{color.hex}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="link"
                      size="icon"
                      className="h-7 w-7 transition-transform hover:scale-110 focus:scale-110 disabled:opacity-50"
                      onClick={() => copyToClipboard(color.hex, "HEX code")}
                      disabled={isLoading}
                      aria-label="Copy HEX code"
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5" style={{ color: color.contrast }} />
                      ) : (
                        <Copy className="h-3.5 w-3.5" style={{ color: color.contrast }} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isLoading ? "Copying..." : copied ? "Copied!" : "Copy HEX code"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-xs opacity-90 font-medium drop-shadow-sm">{color.rgb}</div>
          </div>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full shadow-inner border-2" 
                style={{ backgroundColor: color.hex, borderColor: color.contrast }}
                role="img"
                aria-label={`Color preview: ${color.name}`}
              />
              <div className="space-y-1">
                <span className="text-xl font-bold">{color.name}</span>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-muted-foreground">{color.hex}</code>
                  <Button
                    variant="ghost" 
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => {
                      navigator.clipboard.writeText(color.hex);
                      toast.success("Color code copied!");
                    }}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <ColorValue label="RGB" value={color.rgb} />
              <ColorValue label="HSL" value={color.hsl} />
              <ColorValue label="CMYK" value={color.cmyk} />
              <ColorValue label="Contrast" value={color.contrast} />
            </div>

            {color.psychology && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg border-b pb-2">Color Psychology</h4>
                <div className="grid gap-6">
                  <PsychologySection 
                    label="Emotions" 
                    items={color.psychology.emotions}
                  />
                  <PsychologySection 
                    label="Meanings" 
                    items={color.psychology.meanings}
                  />
                  <PsychologySection 
                    label="Industries" 
                    items={color.psychology.industries}
                  />
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

function ColorValue({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="space-y-2 p-3 rounded-lg bg-muted/50">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="flex items-center justify-between">
        <code className="text-sm font-semibold">{value}</code>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => {
            navigator.clipboard.writeText(value);
            setCopied(true);
            toast.success(`${label} value copied`);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
    </div>
  );
}

function ColorSwatch({ color, label }: { color: string; label: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="w-full aspect-square rounded-lg shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
            style={{ backgroundColor: color }}
            onClick={() => {
              navigator.clipboard.writeText(color);
              setCopied(true);
              toast.success(`${label} color copied`);
              setTimeout(() => setCopied(false), 2000);
            }}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{label}</p>
          <p className="font-mono text-xs">{color}</p>
          {copied && <p className="text-xs text-green-500">Copied!</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function PsychologySection({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="space-y-1.5">
      <h5 className="text-sm font-medium text-muted-foreground">{label}</h5>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}