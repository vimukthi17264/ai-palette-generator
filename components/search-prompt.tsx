"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Wand2 } from "lucide-react";
import { useRef } from "react";

interface SearchPromptProps {
  onGenerate: (prompt: string) => void;
  loading: boolean;
}

const EXAMPLE_PROMPTS = [
  "Sunset over tropical beach",
  "Modern tech startup", 
  "Cozy autumn vibes",
  "Cyberpunk neon city",
  "Cafe vibe"
];

export function SearchPrompt({ onGenerate, loading }: SearchPromptProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExampleClick = (prompt: string) => {
    if (inputRef.current) {
      inputRef.current.value = prompt;
      onGenerate(prompt);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          placeholder="Describe your perfect color palette..."
          className="flex-1"
          maxLength={100}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) {
              onGenerate(e.currentTarget.value);
            }
          }}
        />
        <Button onClick={() => onGenerate(inputRef.current?.value || "")} disabled={loading}>
          <Wand2 className="mr-2 h-4 w-4" />
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {EXAMPLE_PROMPTS.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => handleExampleClick(prompt)}
            disabled={loading}
          >
            {prompt}
          </Button>
        ))}
      </div>
    </div>
  );
}