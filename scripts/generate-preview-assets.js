const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public');
fs.mkdirSync(outDir, { recursive: true });

function svgEscape(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
}

const splashSvg = `
<svg width="630" height="630" viewBox="0 0 630 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="630" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#031640"/>
      <stop offset="0.48" stop-color="#06102c"/>
      <stop offset="1" stop-color="#32106d"/>
    </linearGradient>
    <linearGradient id="base" x1="112" y1="96" x2="512" y2="514" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00e5ff"/>
      <stop offset="0.5" stop-color="#3772ff"/>
      <stop offset="1" stop-color="#8b5cf6"/>
    </linearGradient>
    <linearGradient id="card" x1="96" y1="100" x2="534" y2="500" gradientUnits="userSpaceOnUse">
      <stop stop-color="#08275f" stop-opacity="0.96"/>
      <stop offset="1" stop-color="#05091d" stop-opacity="0.96"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#57d9ff" stroke-opacity="0.08" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="630" height="630" rx="54" fill="url(#bg)"/>
  <rect width="630" height="630" rx="54" fill="url(#grid)"/>
  <circle cx="98" cy="528" r="190" fill="#00d5ff" opacity="0.18"/>
  <circle cx="540" cy="534" r="200" fill="#7c3aed" opacity="0.22"/>

  <!-- Keep all important content away from Farcaster close/refresh overlay corners -->
  <rect x="82" y="100" width="466" height="420" rx="42" fill="url(#card)" stroke="url(#base)" stroke-width="4" filter="url(#glow)"/>
  <rect x="104" y="122" width="422" height="376" rx="34" stroke="#7dd3fc" stroke-opacity="0.18" stroke-width="1"/>

  <g filter="url(#glow)">
    <rect x="247" y="138" width="136" height="136" rx="34" fill="url(#base)"/>
    <rect x="259" y="150" width="112" height="112" rx="27" fill="#1d4ed8" opacity="0.78"/>
    <text x="315" y="229" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="45" font-weight="900" fill="#ffffff" letter-spacing="2">BSA</text>
  </g>

  <text x="315" y="320" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="800" fill="#67e8f9" letter-spacing="8">MINI APP</text>
  <text x="315" y="374" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="950" fill="#ffffff" letter-spacing="1.5">BASE STREAK</text>
  <text x="315" y="431" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="950" fill="#38dfff" letter-spacing="1.5">ARENA</text>

  <rect x="163" y="456" width="146" height="42" rx="21" fill="#071029" stroke="#facc15" stroke-width="3"/>
  <text x="236" y="484" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="900" fill="#fef08a" letter-spacing="1.5">OG BADGE</text>

  <rect x="321" y="456" width="146" height="42" rx="21" fill="#071029" stroke="#60a5fa" stroke-width="3"/>
  <text x="394" y="484" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="900" fill="#dbeafe" letter-spacing="1.5">ON BASE</text>
</svg>`;

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#031640"/>
      <stop offset="0.52" stop-color="#06102c"/>
      <stop offset="1" stop-color="#32106d"/>
    </linearGradient>
    <linearGradient id="base" x1="128" y1="82" x2="1080" y2="556" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00e5ff"/>
      <stop offset="0.5" stop-color="#3772ff"/>
      <stop offset="1" stop-color="#8b5cf6"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M 42 0 L 0 0 0 42" fill="none" stroke="#57d9ff" stroke-opacity="0.08" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" rx="48" fill="url(#bg)"/>
  <rect width="1200" height="630" rx="48" fill="url(#grid)"/>
  <circle cx="140" cy="575" r="260" fill="#00d5ff" opacity="0.18"/>
  <circle cx="1050" cy="545" r="280" fill="#7c3aed" opacity="0.24"/>
  <rect x="86" y="74" width="1028" height="482" rx="54" fill="#06102c" fill-opacity="0.86" stroke="url(#base)" stroke-width="5" filter="url(#glow)"/>

  <g transform="translate(872 156)" filter="url(#glow)">
    <rect width="148" height="148" rx="36" fill="url(#base)"/>
    <rect x="13" y="13" width="122" height="122" rx="29" fill="#1d4ed8" opacity="0.78"/>
    <text x="74" y="93" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="49" font-weight="900" fill="#ffffff" letter-spacing="2">BSA</text>
  </g>

  <text x="218" y="186" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="800" fill="#67e8f9" letter-spacing="12">FARCASTER MINI APP</text>
  <text x="218" y="284" font-family="Inter, Arial, sans-serif" font-size="86" font-weight="950" fill="#ffffff" letter-spacing="1">BASE STREAK</text>
  <text x="218" y="382" font-family="Inter, Arial, sans-serif" font-size="90" font-weight="950" fill="#38dfff" letter-spacing="1">ARENA</text>
  <text x="220" y="440" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="850" fill="#e5e7eb" letter-spacing="7">DAILY STREAKS • XP • OG BADGE</text>

  <rect x="220" y="476" width="224" height="54" rx="27" fill="#071029" stroke="#facc15" stroke-width="3"/>
  <text x="332" y="512" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="#fef08a" letter-spacing="2">BASE ARENA OG</text>
  <rect x="466" y="476" width="158" height="54" rx="27" fill="#071029" stroke="#60a5fa" stroke-width="3"/>
  <text x="545" y="512" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="900" fill="#dbeafe" letter-spacing="2">ON BASE</text>
</svg>`;

async function render(name, svg, width, height) {
  await sharp(Buffer.from(svg)).png().resize(width, height).toFile(path.join(outDir, name));
  console.log(`${name} written`);
}

(async () => {
  await render('splash.png', splashSvg, 630, 630);
  await render('og-image.png', ogSvg, 1200, 630);
})();
