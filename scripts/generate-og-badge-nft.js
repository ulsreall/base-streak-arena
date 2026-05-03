const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'nft');
fs.mkdirSync(outDir, { recursive: true });

const svg = `
<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="1200" gradientUnits="userSpaceOnUse">
      <stop stop-color="#020617"/>
      <stop offset="0.42" stop-color="#04194a"/>
      <stop offset="0.78" stop-color="#0b102f"/>
      <stop offset="1" stop-color="#35106b"/>
    </linearGradient>
    <linearGradient id="base" x1="183" y1="150" x2="1018" y2="1042" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00e5ff"/>
      <stop offset="0.45" stop-color="#3772ff"/>
      <stop offset="1" stop-color="#a855f7"/>
    </linearGradient>
    <linearGradient id="gold" x1="256" y1="790" x2="944" y2="910" gradientUnits="userSpaceOnUse">
      <stop stop-color="#fef08a"/>
      <stop offset="0.42" stop-color="#facc15"/>
      <stop offset="1" stop-color="#fb923c"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="14" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <pattern id="grid" width="52" height="52" patternUnits="userSpaceOnUse">
      <path d="M 52 0 L 0 0 0 52" fill="none" stroke="#67e8f9" stroke-opacity="0.075" stroke-width="1.4"/>
    </pattern>
  </defs>

  <rect width="1200" height="1200" rx="84" fill="url(#bg)"/>
  <rect width="1200" height="1200" rx="84" fill="url(#grid)"/>
  <circle cx="156" cy="1010" r="360" fill="#00d5ff" opacity="0.17"/>
  <circle cx="1050" cy="1050" r="390" fill="#7c3aed" opacity="0.25"/>
  <circle cx="988" cy="180" r="260" fill="#3772ff" opacity="0.15"/>

  <rect x="116" y="116" width="968" height="968" rx="76" fill="#06102c" fill-opacity="0.86" stroke="url(#base)" stroke-width="7" filter="url(#glow)"/>
  <rect x="158" y="158" width="884" height="884" rx="58" stroke="#7dd3fc" stroke-opacity="0.15" stroke-width="2"/>

  <g filter="url(#glow)">
    <circle cx="600" cy="382" r="174" fill="url(#base)" opacity="0.9"/>
    <circle cx="600" cy="382" r="132" fill="#1d4ed8" opacity="0.82"/>
    <text x="600" y="426" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="122" font-weight="950" fill="#ffffff" letter-spacing="4">BSA</text>
  </g>

  <text x="600" y="633" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="850" fill="#67e8f9" letter-spacing="9">BASE STREAK ARENA</text>
  <text x="600" y="745" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="112" font-weight="950" fill="#ffffff" letter-spacing="2">OG BADGE</text>

  <rect x="244" y="804" width="712" height="84" rx="42" fill="#071029" stroke="url(#gold)" stroke-width="5" filter="url(#soft)"/>
  <text x="600" y="859" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="950" fill="#fef3c7" letter-spacing="5">EARLY ARENA MEMBER</text>

  <g opacity="0.95">
    <rect x="268" y="934" width="198" height="58" rx="29" fill="#0b1437" stroke="#60a5fa" stroke-width="3"/>
    <text x="367" y="974" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="900" fill="#dbeafe" letter-spacing="1.5">ON BASE</text>
    <rect x="501" y="934" width="198" height="58" rx="29" fill="#0b1437" stroke="#22d3ee" stroke-width="3"/>
    <text x="600" y="974" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="25" font-weight="900" fill="#cffafe" letter-spacing="1.5">SOULBOUND</text>
    <rect x="734" y="934" width="198" height="58" rx="29" fill="#0b1437" stroke="#facc15" stroke-width="3"/>
    <text x="833" y="974" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="900" fill="#fef08a" letter-spacing="1.5">SEASON 0</text>
  </g>

  <text x="600" y="1052" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="800" fill="#cbd5e1" letter-spacing="2.5">EARLY PLAYER PROOF ON BASE</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(outDir, 'base-arena-og.png'))
  .then(() => console.log('public/nft/base-arena-og.png written'));
