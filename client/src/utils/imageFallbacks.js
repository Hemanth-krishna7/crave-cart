// High-quality, lightweight inline SVG placeholders for fallbacks
export const RESTAURANT_FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffedd5" />
      <stop offset="100%" stop-color="#fed7aa" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <circle cx="400" cy="200" r="70" fill="#ffffff" opacity="0.6"/>
  <path d="M375 180h50v40h-50zM385 220h30v20h-30z" fill="#ea580c" stroke="#ea580c" stroke-width="4" stroke-linejoin="round" opacity="0.8"/>
  <text x="50%" y="330" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#c2410c" text-anchor="middle" letter-spacing="1">CRAVECART</text>
  <text x="50%" y="370" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#ea580c" text-anchor="middle">Premium Dining Experience</text>
</svg>
`.trim());

export const FOOD_FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
  <defs>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#f1f5f9" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g2)"/>
  <circle cx="150" cy="130" r="50" fill="#ffedd5" stroke="#fed7aa" stroke-width="3"/>
  <path d="M135 125c5-10 25-10 30 0M125 140h50" stroke="#ea580c" stroke-width="4" stroke-linecap="round"/>
  <text x="50%" y="220" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#475569" text-anchor="middle">Delicious Plate</text>
  <text x="50%" y="245" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#94a3b8" text-anchor="middle">CraveCart Selection</text>
</svg>
`.trim());
