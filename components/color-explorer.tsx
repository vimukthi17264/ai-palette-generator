"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { ColorInfo } from "@/lib/types";
import { getColorInfo } from "@/lib/color-utils";
import { Button } from "./ui/button";
import { Heart, Download, Share2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { toast, useToast } from "@/hooks/use-toast";

interface ColorExplorerProps {
  activeFilter: string;
}

interface Palette {
  id: number;
  name: string;
  likes: number;
  colors: {
    hex: string;
    name: string;
  }[];
}

const PaletteCard = memo(({ 
  palette, 
  onLike, 
  onShare, 
  onDownload, 
  isLiked, 
  actionLoading 
}: {
  palette: Palette;
  onLike: (id: number) => void;
  onShare: (palette: Palette) => void;
  onDownload: (palette: Palette) => void;
  isLiked: boolean;
  actionLoading: { [key: string]: boolean };
}) => (
  <div className="group bg-background border rounded-lg p-6 hover:shadow-lg transition-all duration-200 animate-fade-up">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-foreground hover:text-blue-600 transition-colors cursor-pointer">
          {palette.name}
        </h3>
        <span className="text-sm text-muted-foreground flex items-center gap-1 bg-muted/30 px-2 py-1 rounded-full">
          <Heart className="h-4 w-4" />
          {palette.likes}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2 h-24 rounded-lg overflow-hidden shadow-sm">
        {palette.colors.map((color, index) => {
          const colorInfo = {
            ...getColorInfo(color.hex),
            name: color.name,
            tetradic: []
          };
          return (
            <div 
              key={`${color.hex}-${index}`}
              className="relative cursor-pointer group/color hover:scale-105 hover:z-10 transition-all duration-200 ease-out"
              style={{ backgroundColor: color.hex }}
              onClick={() => {
                navigator.clipboard.writeText(color.hex);
                toast({
                  title: "Color copied!",
                  description: `${color.name} (${color.hex}) has been copied to your clipboard`,
                  duration: 2000
                });
              }}
              role="button"
              tabIndex={0}
              aria-label={`Copy color ${color.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigator.clipboard.writeText(color.hex);
                  toast({
                    title: "Color copied!",
                    description: `${color.name} (${color.hex}) has been copied to your clipboard`,
                    duration: 2000
                  });
                }
              }}
            >
              <div 
                className="absolute inset-0 p-2 text-xs opacity-0 group-hover/color:opacity-100 transition-all duration-200 flex flex-col justify-end backdrop-blur-[2px]"
                style={{ 
                  color: colorInfo.contrast,
                  background: `linear-gradient(to top, ${color.hex}EE, ${color.hex}00)`
                }}
              >
                <div className="font-medium truncate">{color.name}</div>
                <div className="opacity-90 font-mono text-[10px]">{color.hex}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-3 border-t">
        <Button 
          variant={isLiked ? "secondary" : "ghost"}
          size="sm"
          className={cn(
            "transition-all duration-200",
            isLiked ? "text-red-500 hover:text-red-600 hover:bg-red-50/50" : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => onLike(palette.id)}
          disabled={actionLoading[`like-${palette.id}`]}
          aria-label={isLiked ? "Unlike palette" : "Like palette"}
        >
          {actionLoading[`like-${palette.id}`] ? (
            <Loader2 className="h-4 w-4 animate-spin mr-1" />
          ) : (
            <Heart className={cn(
              "h-4 w-4 mr-1 transition-transform duration-200 hover:scale-110",
              isLiked && "fill-current"
            )} />
          )}
          {isLiked ? 'Liked' : 'Like'}
        </Button>
        <div className="flex gap-1.5">
          <Button 
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => {
              const colors = palette.colors.map(c => c.hex).join(', ');
              navigator.clipboard.writeText(colors);
              toast({
                title: "Colors copied!",
                description: "All hex codes have been copied to your clipboard",
                duration: 2000
              });
            }}
            aria-label="Copy all colors"
          >
            <Download className="h-4 w-4 mr-1 transition-transform hover:scale-110" />
            Copy
          </Button>
          <Button
            variant="ghost"
            size="sm" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => onDownload(palette)}
            aria-label="Download CSV"
          >
            <Download className="h-4 w-4 mr-1 transition-transform hover:scale-110" />
            CSV
          </Button>
          <Button
            variant="ghost"
            size="sm" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => onShare(palette)}
            disabled={actionLoading[`share-${palette.id}`]}
            aria-label="Share palette"
          >
            {actionLoading[`share-${palette.id}`] ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <Share2 className="h-4 w-4 mr-1 transition-transform hover:scale-110" />
            )}
            Share
          </Button>
        </div>
      </div>
    </div>
  </div>
));

PaletteCard.displayName = 'PaletteCard';

export function ColorExplorer({ activeFilter }: ColorExplorerProps) {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPalettes, setLikedPalettes] = useState<number[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 20;
  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const fetchPalettes = async (pageNumber: number) => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      
      let query = supabase
        .from('palettes')
        .select('*')
        .order('created_at', { ascending: false })
        .range(pageNumber * ITEMS_PER_PAGE, (pageNumber + 1) * ITEMS_PER_PAGE - 1);

      if (activeFilter === 'popular') {
        query = query.order('likes', { ascending: false });
      }
      
      const { data, error } = await query;

      if (error) throw error;

      if (data) {
        if (data.length < ITEMS_PER_PAGE) {
          setHasMore(false);
        }
        
        setPalettes(prev => pageNumber === 0 ? data : [...prev, ...data]);
      }
    } catch (error) {
      console.error('Error fetching palettes:', error);
      setError('Failed to load palettes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    fetchPalettes(0);
  }, [activeFilter]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPalettes(nextPage);
    }
  };

  const handleLike = async (paletteId: number) => {
    try {
      setActionLoading(prev => ({ ...prev, [`like-${paletteId}`]: true }));
      const supabase = createClient();
      const isLiked = likedPalettes.includes(paletteId);
      const newLikes = isLiked 
        ? palettes.find(p => p.id === paletteId)?.likes! - 1 
        : palettes.find(p => p.id === paletteId)?.likes! + 1;
      
      const { error } = await supabase
        .from('palettes')
        .update({ likes: newLikes })
        .eq('id', paletteId)
        .select();

      if (error) throw error;

      // Update local state
      setPalettes(prev => prev.map(palette => 
        palette.id === paletteId 
          ? { ...palette, likes: isLiked ? palette.likes - 1 : palette.likes + 1 }
          : palette
      ));
      
      setLikedPalettes(prev => 
        isLiked 
          ? prev.filter(id => id !== paletteId)
          : [...prev, paletteId]
      );

      toast({
        title: isLiked ? "Removed from likes" : "Added to likes",
        description: `Successfully ${isLiked ? "unliked" : "liked"} the palette`,
      });
    } catch (error) {
      console.error('Error updating likes:', error);
      toast({
        title: "Error",
        description: "Failed to update likes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(prev => ({ ...prev, [`like-${paletteId}`]: false }));
    }
  };

  const downloadCSV = (palette: Palette) => {
    const csvContent = [
      ['Name', 'Hex', 'RGB'],
      ...palette.colors.map(color => {
        const { rgb } = getColorInfo(color.hex);
        const [r, g, b] = rgb.split(',').map(Number);
        return [color.name, color.hex, `rgb(${r},${g},${b})`];
      })
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${palette.name.toLowerCase().replace(/\s+/g, '-')}-palette.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sharePalette = async (palette: Palette) => {
    try {
      setActionLoading(prev => ({ ...prev, [`share-${palette.id}`]: true }));
      const shareData = {
        title: palette.name,
        text: `Check out this color palette: ${palette.colors.map(c => c.hex).join(', ')}`,
        url: window.location.href
      };

      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully",
          description: "The palette has been shared.",
        });
      } else {
        await navigator.clipboard.writeText(shareData.text);
        toast({
          title: "Copied to clipboard",
          description: "The palette details have been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error('Error sharing palette:', error);
      toast({
        title: "Error",
        description: "Failed to share the palette. Please try again.",
        variant: "destructive",
      });
    } finally {
      setActionLoading(prev => ({ ...prev, [`share-${palette.id}`]: false }));
    }
  };

  if (loading && page === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 min-h-[400px] flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {palettes.length === 0 ? (
        <div className="text-center text-muted-foreground min-h-[400px] flex items-center justify-center">
          <p>No palettes found. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {palettes.map((palette) => (
            <PaletteCard
              key={palette.id}
              palette={palette}
              onLike={handleLike}
              onShare={sharePalette}
              onDownload={(p) => {
                downloadCSV(p);
                toast({
                  title: "Download started",
                  description: "The CSV file is being downloaded.",
                });
              }}
              isLiked={likedPalettes.includes(palette.id)}
              actionLoading={actionLoading}
            />
          ))}
        </div>
      )}
      
      {hasMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={loadMore}
            disabled={loading}
            className="min-w-[200px]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}