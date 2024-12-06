import chroma from 'chroma-js';

export interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
  name: string;
  contrast: string;
  cmyk: string;
  complementary: string;
  analogous: string[];
  triadic: string[];
  psychology?: {
    emotions: string[];
    meanings: string[];
    industries: string[];
  };
}

export function getColorInfo(hex: string): ColorInfo {
  const color = chroma(hex);
  const rgb = color.css();
  const hsl = color.css('hsl');
  
  // Calculate contrasting text color
  const contrast = chroma.contrast(hex, 'white') > 4.5 ? '#ffffff' : '#000000';
  
  // Generate CMYK values
  const [c, m, y, k] = color.cmyk();
  const cmyk = `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
  
  // Generate color harmonies
  const complementary = color.set('hsl.h', (color.get('hsl.h') + 180) % 360).hex();
  
  const analogous = [
    color.set('hsl.h', (color.get('hsl.h') + 30) % 360).hex(),
    color.set('hsl.h', (color.get('hsl.h') - 30) % 360).hex(),
  ];
  
  const triadic = [
    color.set('hsl.h', (color.get('hsl.h') + 120) % 360).hex(),
    color.set('hsl.h', (color.get('hsl.h') + 240) % 360).hex(),
  ];
  
  return {
    hex,
    name: '',  // Will be filled by AI
    rgb,
    hsl,
    contrast,
    cmyk,
    complementary,
    analogous,
    triadic,
    psychology: {
      emotions: [],
      meanings: [],
      industries: [],
    },
  };
}