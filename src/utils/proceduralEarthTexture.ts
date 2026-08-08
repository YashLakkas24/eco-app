/**
 * Generates high-definition procedural texture maps for the 3D Earth Globe canvas.
 * Supports Satellite View, Night City Lights View, Bio-Sync Health Heatmap, and Global AQI Grid.
 */

export function createEarthTextureCanvas(
  healthPercentage: number = 72,
  mode: 'satellite' | 'night' | 'health' | 'aqi' = 'satellite'
): HTMLCanvasElement {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return canvas;

  const h = Math.max(0, Math.min(100, healthPercentage)) / 100;

  if (mode === 'night') {
    return createEarthEmissiveNightCanvas(width, height);
  }

  if (mode === 'aqi') {
    return createAQIMapCanvas(width, height);
  }

  // 1. Base Ocean Rendering with Depth Gradients
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
  if (mode === 'health') {
    oceanGrad.addColorStop(0, '#020617');
    oceanGrad.addColorStop(0.5, '#0f172a');
    oceanGrad.addColorStop(1, '#020617');
  } else {
    // Deep vibrant ocean blue matching reference image
    oceanGrad.addColorStop(0, '#041d38');
    oceanGrad.addColorStop(0.3, '#0b3c6d');
    oceanGrad.addColorStop(0.5, '#0e4a80');
    oceanGrad.addColorStop(0.7, '#08325a');
    oceanGrad.addColorStop(1, '#021329');
  }

  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, width, height);

  // Helper to draw realistic detailed continent contours
  const drawContinent = (
    pathPoints: Array<[number, number]>,
    colorLow: string,
    colorHigh: string,
    strokeColor = 'rgba(56, 189, 248, 0.4)'
  ) => {
    ctx.beginPath();
    pathPoints.forEach(([xPct, yPct], index) => {
      const x = (xPct / 100) * width;
      const y = (yPct / 100) * height;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();

    if (mode === 'health') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, interpolateColor('#15803d', '#84cc16', h));
      grad.addColorStop(1, interpolateColor('#065f46', '#10b981', h));
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = interpolateColor(colorLow, colorHigh, h);
    }

    ctx.fill();

    // Shallow Coastal Shelf Glow
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  };

  // Detailed Equirectangular Continent Coordinates
  // North America
  drawContinent(
    [
      [8, 15], [18, 12], [28, 18], [34, 28], [36, 42],
      [28, 50], [22, 46], [16, 38], [10, 30], [6, 22]
    ],
    '#2d3b2f', '#22c55e'
  );

  // South America
  drawContinent(
    [
      [28, 56], [36, 58], [40, 70], [35, 88], [28, 82],
      [24, 66], [26, 60]
    ],
    '#2a3d2e', '#16a34a'
  );

  // Europe & Mediterranean
  drawContinent(
    [
      [46, 18], [56, 15], [60, 22], [62, 32], [52, 35], [45, 28]
    ],
    '#324031', '#4ade80'
  );

  // Africa (Sahara ochre & rainforest green)
  drawContinent(
    [
      [44, 38], [60, 40], [64, 52], [58, 80], [50, 78], [44, 54]
    ],
    '#5c4a2a', '#84cc16'
  );

  // Asia / Eurasia
  drawContinent(
    [
      [58, 15], [82, 14], [88, 28], [92, 42], [82, 52], [68, 48], [62, 32]
    ],
    '#374233', '#22c55e'
  );

  // India (distinct triangle peninsula matching the center view in reference!)
  drawContinent(
    [[65, 38], [73, 38], [72, 53], [67, 51]],
    '#4a422d', '#10b981'
  );

  // Himalaya Snow Mountains Range
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  ctx.ellipse(0.69 * width, 0.36 * height, 60, 16, -0.1, 0, Math.PI * 2);
  ctx.fill();

  // Australia
  drawContinent(
    [
      [78, 62], [88, 60], [92, 72], [86, 84], [76, 78]
    ],
    '#5c452e', '#a3e635'
  );

  // Antarctica & Arctic Ice Caps
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(0, 0, width, height * 0.08);
  ctx.fillRect(0, height * 0.9, width, height * 0.1);

  // 2. Realistic Cloud Swirls Overlay
  const cloudCount = 140;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
  for (let i = 0; i < cloudCount; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * height * 0.8 + height * 0.1;
    const rx = 30 + Math.random() * 80;
    const ry = 10 + Math.random() * 30;
    const angle = (Math.random() - 0.5) * 0.4;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // 3. Latitude Tech Grid Overlay
  ctx.strokeStyle = mode === 'health' ? 'rgba(132, 204, 22, 0.25)' : 'rgba(255, 255, 255, 0.06)';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 128) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 128) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  return canvas;
}

// Night City Lights Emissive Map (Golden amber lights on dark background)
export function createEarthEmissiveNightCanvas(
  width: number = 2048,
  height: number = 1024
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Pure dark background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  // Major global urban centers (exact coordinates matching landmasses)
  const cityClusters = [
    // India & South Asia (dense glowing clusters as seen in reference image!)
    { x: 0.69 * width, y: 0.42 * height, r: 80, intensity: 1.0 }, // New Delhi & North India
    { x: 0.67 * width, y: 0.47 * height, r: 60, intensity: 0.9 }, // Mumbai / West India
    { x: 0.71 * width, y: 0.48 * height, r: 50, intensity: 0.85 }, // South India / Bengaluru
    { x: 0.72 * width, y: 0.43 * height, r: 50, intensity: 0.8 }, // East India / Kolkata

    // China & East Asia
    { x: 0.80 * width, y: 0.41 * height, r: 90, intensity: 0.95 }, // Beijing / East Coast China
    { x: 0.81 * width, y: 0.46 * height, r: 85, intensity: 1.0 }, // Shanghai
    { x: 0.80 * width, y: 0.50 * height, r: 70, intensity: 0.9 }, // Guangzhou / Hong Kong
    { x: 0.85 * width, y: 0.38 * height, r: 70, intensity: 1.0 }, // Tokyo / Japan

    // Europe & Middle East
    { x: 0.50 * width, y: 0.26 * height, r: 80, intensity: 0.9 }, // Western Europe
    { x: 0.60 * width, y: 0.40 * height, r: 65, intensity: 0.85 }, // Middle East / Dubai

    // USA & Americas
    { x: 0.24 * width, y: 0.33 * height, r: 95, intensity: 0.95 }, // US East Coast
    { x: 0.16 * width, y: 0.37 * height, r: 75, intensity: 0.85 }, // US West Coast
    { x: 0.31 * width, y: 0.68 * height, r: 60, intensity: 0.75 }, // Sao Paulo / Brazil

    // Australia
    { x: 0.85 * width, y: 0.72 * height, r: 55, intensity: 0.8 }, // Sydney / Melbourne
  ];

  cityClusters.forEach(city => {
    // Glowing golden amber radial light halo
    const grad = ctx.createRadialGradient(city.x, city.y, 2, city.x, city.y, city.r);
    grad.addColorStop(0, 'rgba(255, 220, 100, 1.0)');
    grad.addColorStop(0.2, 'rgba(245, 158, 11, 0.85)');
    grad.addColorStop(0.6, 'rgba(217, 119, 6, 0.4)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(city.x, city.y, city.r, 0, Math.PI * 2);
    ctx.fill();

    // Fine city light specks inside cluster
    for (let i = 0; i < 40; i++) {
      const sx = city.x + (Math.random() - 0.5) * city.r * 1.2;
      const sy = city.y + (Math.random() - 0.5) * city.r * 1.2;
      ctx.fillStyle = Math.random() > 0.3 ? '#fef08a' : '#f97316';
      ctx.fillRect(sx, sy, 1.5, 1.5);
    }
  });

  return canvas;
}

// Specular reflection map (White oceans for glossy light reflection, Black land for matte finish)
export function createEarthSpecularCanvas(width = 1024, height = 512): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Ocean is highly specular (white)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Land is low specular (dark gray / black)
  const drawLandMask = (points: Array<[number, number]>) => {
    ctx.beginPath();
    points.forEach(([xPct, yPct], index) => {
      const x = (xPct / 100) * width;
      const y = (yPct / 100) * height;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = '#111111';
    ctx.fill();
  };

  // Land shapes
  drawLandMask([[8, 15], [36, 42], [28, 50], [10, 30]]); // N America
  drawLandMask([[28, 56], [40, 70], [28, 82], [24, 66]]); // S America
  drawLandMask([[46, 18], [62, 32], [52, 35], [45, 28]]); // Europe
  drawLandMask([[44, 38], [64, 52], [58, 80], [44, 54]]); // Africa
  drawLandMask([[58, 15], [92, 42], [82, 52], [62, 32]]); // Asia
  drawLandMask([[65, 38], [73, 38], [72, 53], [67, 51]]); // India
  drawLandMask([[78, 62], [92, 72], [76, 78]]); // Australia

  return canvas;
}

// Global Air Quality Index Heatmap Canvas
function createAQIMapCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#060a12';
  ctx.fillRect(0, 0, width, height);

  const zones = [
    { x: 0.69 * width, y: 0.42 * height, r: 140, color: 'rgba(239, 68, 68, 0.7)' },
    { x: 0.80 * width, y: 0.45 * height, r: 160, color: 'rgba(245, 158, 11, 0.6)' },
    { x: 0.22 * width, y: 0.32 * height, r: 120, color: 'rgba(16, 185, 129, 0.6)' },
    { x: 0.50 * width, y: 0.25 * height, r: 110, color: 'rgba(59, 130, 246, 0.6)' },
    { x: 0.84 * width, y: 0.72 * height, r: 100, color: 'rgba(132, 204, 22, 0.7)' },
  ];

  zones.forEach(z => {
    const grad = ctx.createRadialGradient(z.x, z.y, 5, z.x, z.y, z.r);
    grad.addColorStop(0, z.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(z.x, z.y, z.r, 0, Math.PI * 2);
    ctx.fill();
  });

  return canvas;
}

// Create Bump map for realistic 3D topography depth
export function createEarthBumpCanvas(): HTMLCanvasElement {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 300; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 10 + Math.random() * 40;
    const grad = ctx.createRadialGradient(x, y, 1, x, y, r);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(1, '#808080');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}

function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  const r = Math.round(c1.r + factor * (c2.r - c1.r));
  const g = Math.round(c1.g + factor * (c2.g - c1.g));
  const b = Math.round(c1.b + factor * (c2.b - c1.b));

  return `rgb(${r}, ${g}, ${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(x => x + x).join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

