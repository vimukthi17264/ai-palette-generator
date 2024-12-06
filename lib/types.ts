export interface ColorInfo {
  hex: string;
  name: string;
  rgb: string;
  hsl: string;
  cmyk: string;
  contrast: string;
  complementary: string;
  analogous: string[];
  triadic: string[];
  tetradic: string[];
  psychology?: {
    emotions: string[];
    meanings: string[];
    industries: string[];
  };
}