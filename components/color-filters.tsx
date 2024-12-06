"use client";

import { Button } from "./ui/button";
import { 
  Palette, 
  Sparkles, 
  Heart, 
  TrendingUp, 
  Clock 
} from "lucide-react";

interface ColorFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "All Palettes", icon: Palette },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "new", label: "New", icon: Clock },
  { id: "ai", label: "AI Generated", icon: Sparkles },
  { id: "favorites", label: "Favorites", icon: Heart },
];

export function ColorFilters({ activeFilter, onFilterChange }: ColorFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            onClick={() => onFilterChange(filter.id)}
            className="gap-2"
          >
            <Icon className="h-4 w-4" />
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
} 