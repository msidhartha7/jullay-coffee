/**
 * A medal on its ribbon, drawn in the site's engraved style: ink lines,
 * brand-palette fills, hatching for metal. viewBox 0 0 64 250, hanging from (32, 0).
 */
import type { Medal } from '../data/wall';

const INK = '#1c1a14';
const C: Record<string, string> = {
  cream: '#f8eacf', oat: '#e0cfbc', olive: '#6b7830', moss: '#576544', forest: '#3c4128',
  ink: INK, stone: '#b49a7c', milk: '#fefdfb',
};
const METAL: Record<Medal['metal'], { fill: string; hatch: string; line: string }> = {
  gold: { fill: C.cream, hatch: 'url(#jh)', line: INK },
  silver: { fill: C.milk, hatch: 'url(#jh-fine)', line: INK },
  bronze: { fill: C.stone, hatch: 'url(#jh)', line: INK },
  wood: { fill: C.oat, hatch: 'url(#jh-wood)', line: INK },
  black: { fill: INK, hatch: 'url(#jh-cream)', line: C.cream },
};

const CY = 196; // medal centre

function shapePath(s: Medal['shape']): string {
  switch (s) {
    case 'octagon': {
      const r = 27, pts: string[] = [];
      for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + (i * Math.PI) / 4; pts.push(`${(32 + Math.cos(a) * r).toFixed(1)} ${(CY + Math.sin(a) * r).toFixed(1)}`); }
      return `M${pts.join(' L')} Z`;
    }
    case 'heart':
      return `M32 ${CY + 26} C6 ${CY + 6} 4 ${CY - 20} 20 ${CY - 22} C27 ${CY - 23} 31 ${CY - 18} 32 ${CY - 13} C33 ${CY - 18} 37 ${CY - 23} 44 ${CY - 22} C60 ${CY - 20} 58 ${CY + 6} 32 ${CY + 26} Z`;
    case 'square':
      return `M8 ${CY - 26} H56 V${CY + 26} H8 Z`;
    case 'tag':
      return `M9 ${CY - 30} H55 V${CY + 32} H9 Z`;
    case 'cog': {
      const teeth = 16; let d = '';
      for (let i = 0; i < teeth * 2; i++) {
        const a = (i / (teeth * 2)) * Math.PI * 2, r = i % 2 ? 24 : 28;
        d += `${i ? 'L' : 'M'}${(32 + Math.cos(a) * r).toFixed(1)} ${(CY + Math.sin(a) * r).toFixed(1)} `;
      }
      return d + 'Z';
    }
    case 'ring':
      return `M32 ${CY - 28} A28 28 0 1 1 31.9 ${CY - 28} Z M32 ${CY - 14} A14 14 0 1 0 32.1 ${CY - 14} Z`;
    default:
      return `M32 ${CY - 27} A27 27 0 1 1 31.9 ${CY - 27} Z`;
  }
}

function face(m: Medal, line: string): string {
  const km = m.km ? (Number.isInteger(m.km) ? `${m.km}` : `${m.km}`.slice(0, 4)) : '';
  const label = km ? `<text x="32" y="${CY + 5}" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="${km.length > 3 ? 11 : 15}" fill="${line}">${km}</text><text x="32" y="${CY + 15}" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="600" font-size="6" letter-spacing="1.5" fill="${line}">KM</text>` : '';
  switch (m.shape) {
    case 'round':
    case 'octagon':
    case 'cog':
      return `<circle cx="32" cy="${CY}" r="18" fill="none" stroke="${line}" stroke-width=".8"/>${label}`;
    case 'heart':
      return `<path d="M24 ${CY - 8} q8 -6 16 0" fill="none" stroke="${line}" stroke-width=".8"/>${label}`;
    case 'ring':
      return '';
    default:
      return `<rect x="14" y="${CY - 20}" width="36" height="${m.shape === 'tag' ? 46 : 40}" fill="none" stroke="${line}" stroke-width=".8"/>${label}`;
  }
}

export function medalSVG(m: Medal, uid = m.id): string {
  const [a, b] = m.ribbon;
  const metal = METAL[m.metal];
  const d = shapePath(m.shape);
  // two ribbon strips from the peg, crossing into a clasp
  const ribbon = `
    <path d="M18 0 L26 ${CY - 38} L38 ${CY - 38} L30 0 Z" fill="${C[a]}" stroke="${INK}" stroke-width="1"/>
    <path d="M22 0 L30 ${CY - 38} L33 ${CY - 38} L25 0 Z" fill="${C[b]}"/>
    <path d="M46 0 L38 ${CY - 38} L26 ${CY - 38} L34 0 Z" fill="${C[a]}" stroke="${INK}" stroke-width="1"/>
    <path d="M42 0 L34 ${CY - 38} L31 ${CY - 38} L39 0 Z" fill="${C[b]}"/>
    <path d="M34 0 L38 ${CY - 38} L26 ${CY - 38} Z" fill="url(#jh)" opacity=".35"/>`;
  return `<svg class="medal" viewBox="0 0 64 250" aria-hidden="true" focusable="false" overflow="visible">
  <defs><clipPath id="m-${uid}"><path d="${d}" fill-rule="evenodd"/></clipPath></defs>
  ${ribbon}
  <rect x="24" y="${CY - 40}" width="16" height="10" fill="${C.oat}" stroke="${INK}" stroke-width="1"/>
  <path d="M32 ${CY - 30} V${CY - 26}" stroke="${INK}" stroke-width="2"/>
  <ellipse cx="34" cy="${CY + 34}" rx="20" ry="3" fill="${INK}" opacity=".12"/>
  <path d="${d}" fill="${metal.fill}" fill-rule="evenodd"/>
  <g clip-path="url(#m-${uid})">
    <rect x="34" y="${CY - 34}" width="30" height="70" fill="${metal.hatch}" opacity=".55"/>
    <path d="M14 ${CY - 10} q4 -14 16 -18" stroke="${m.metal === 'black' ? C.cream : C.milk}" stroke-width="2" fill="none" opacity=".8"/>
  </g>
  <path d="${d}" fill="none" fill-rule="evenodd" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/>
  ${face(m, metal.line)}
</svg>`;
}
