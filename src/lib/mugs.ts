/**
 * The mug wall. Each mug is drawn as engraved line art from a few parts that
 * share one rim, so any mug can be filled at the bar.
 * Rendered as a string so both Astro (server) and the browser can use it.
 */

const INK = '#1c1a14';
const C = {
  cream: '#f8eacf', milk: '#fefdfb', oat: '#e0cfbc', olive: '#6b7830',
  moss: '#576544', forest: '#3c4128', chili: '#c23129', stone: '#b49a7c', ink: INK,
};

type Shape = 'straight' | 'tapered' | 'belly' | 'cup' | 'tumbler';
type Handle = 'loop' | 'd' | 'ear' | 'none';
type Deco = 'chips' | 'stripe' | 'mountain' | 'dot' | 'double' | 'flags' | 'speckle' | 'hatch' | 'plain' | 'rings' | 'sun' | 'peak';

export type Mug = {
  id: string;
  name: string;
  line: string;
  shape: Shape;
  handle: Handle;
  body: keyof typeof C;
  rim: keyof typeof C;
  deco: Deco;
};

export const mugs: Mug[] = [
  { id: 'camp', name: 'The camp mug', line: 'Chipped. Still the favourite.', shape: 'straight', handle: 'loop', body: 'cream', rim: 'ink', deco: 'chips' },
  { id: 'pass', name: 'The pass', line: 'For the long way round.', shape: 'straight', handle: 'd', body: 'cream', rim: 'forest', deco: 'mountain' },
  { id: 'flags', name: 'Prayer flags', line: 'Five colours on a line.', shape: 'tapered', handle: 'loop', body: 'milk', rim: 'moss', deco: 'flags' },
  { id: 'dot', name: 'The dot', line: 'Borrowed from the j.', shape: 'belly', handle: 'ear', body: 'olive', rim: 'cream', deco: 'dot' },
  { id: 'stripe', name: 'Forest stripe', line: 'One band. Nothing else.', shape: 'straight', handle: 'loop', body: 'cream', rim: 'moss', deco: 'stripe' },
  { id: 'oat', name: 'Oat speckle', line: 'Like the lid of a cup.', shape: 'belly', handle: 'loop', body: 'oat', rim: 'oat', deco: 'speckle' },
  { id: 'rule', name: 'Double rule', line: 'Two lines, like the poster.', shape: 'tapered', handle: 'd', body: 'milk', rim: 'ink', deco: 'double' },
  { id: 'cup', name: 'Cup and saucer', line: 'For sitting in.', shape: 'cup', handle: 'ear', body: 'milk', rim: 'milk', deco: 'rings' },
  { id: 'sun', name: 'High sun', line: 'Bright and early.', shape: 'straight', handle: 'ear', body: 'cream', rim: 'olive', deco: 'sun' },
  { id: 'forest', name: 'The cup green', line: 'Same as the takeaway.', shape: 'tapered', handle: 'loop', body: 'forest', rim: 'cream', deco: 'plain' },
  { id: 'hatch', name: 'Engraved', line: 'Every line by hand.', shape: 'belly', handle: 'd', body: 'cream', rim: 'cream', deco: 'hatch' },
  { id: 'tumbler', name: 'The tumbler', line: 'No handle. Hold it warm.', shape: 'tumbler', handle: 'none', body: 'stone', rim: 'oat', deco: 'peak' },
];

export const mugById = (id: string | null | undefined) => mugs.find((m) => m.id === id) ?? mugs[0];

// Shared geometry: rim at (62, 30), 72 wide.
const RIM = { cx: 62, cy: 30, rx: 36, ry: 8 };
const OPEN = { rx: 31, ry: 5.5 };

const bodies: Record<Shape, string> = {
  straight: 'M26 30 V108 C26 123 98 123 98 108 V30 Z',
  tapered: 'M26 30 L33 108 C35 122 89 122 91 108 L98 30 Z',
  belly: 'M26 30 C18 66 24 114 62 117 C100 114 106 66 98 30 Z',
  cup: 'M26 30 C26 74 40 94 62 94 C84 94 98 74 98 30 Z',
  tumbler: 'M26 30 L31 114 C32 122 92 122 93 114 L98 30 Z',
};

const handles: Record<Handle, string> = {
  loop: 'M96 46 C126 44 126 94 94 92',
  d: 'M97 44 H112 Q120 44 120 52 V82 Q120 90 112 90 H96',
  ear: 'M97 42 C116 40 116 70 95 70',
  none: '',
};

const darkBody = (b: keyof typeof C) => b === 'forest' || b === 'olive' || b === 'ink' || b === 'moss';

function deco(d: Deco, body: keyof typeof C): string {
  const line = darkBody(body) ? C.cream : INK;
  switch (d) {
    case 'chips':
      return `<g fill="${INK}"><path d="M34 52c2-1 4 0 3 2s-4 1-3-2z"/><path d="M80 94c3-1 5 1 3 3s-5 0-3-3z"/><circle cx="46" cy="104" r="1.6"/><path d="M90 60c1.5 0 2 2 .5 2.4s-2-1.6-.5-2.4z"/></g>`;
    case 'stripe':
      return `<rect x="0" y="62" width="140" height="13" fill="${C.moss}"/><line x1="0" y1="62" x2="140" y2="62" stroke="${INK}" stroke-width=".8"/><line x1="0" y1="75" x2="140" y2="75" stroke="${INK}" stroke-width=".8"/>`;
    case 'mountain':
      return `<path d="M24 92 L40 72 L48 80 L62 60 L74 76 L82 68 L100 92" fill="none" stroke="${line}" stroke-width="1.6" stroke-linejoin="round"/><path d="M58 66 L62 60 L66 66" fill="none" stroke="${line}" stroke-width="1"/>`;
    case 'dot':
      return `<circle cx="58" cy="72" r="14" fill="${C.cream}" stroke="${INK}" stroke-width="1"/>`;
    case 'double':
      return `<g stroke="${C.chili}" stroke-width="3"><line x1="0" y1="86" x2="140" y2="86"/><line x1="0" y1="93" x2="140" y2="93"/></g>`;
    case 'flags': {
      const cols = [C.olive, C.milk, C.chili, C.oat, C.forest];
      const fl = cols.map((c, i) => `<path d="M${32 + i * 13} ${56 + (i % 2)} h10 v12 l-5 -3 l-5 3 z" fill="${c}" stroke="${INK}" stroke-width=".8"/>`).join('');
      return `<path d="M26 56 Q62 62 98 56" fill="none" stroke="${INK}" stroke-width=".8"/>${fl}`;
    }
    case 'speckle': {
      let s = '';
      for (let i = 0; i < 46; i++) {
        const x = 24 + ((i * 37) % 76), y = 38 + ((i * 53) % 78);
        s += `<circle cx="${x}" cy="${y}" r="${(i % 3) * 0.35 + 0.6}"/>`;
      }
      return `<g fill="${C.moss}">${s}</g>`;
    }
    case 'hatch':
      return `<rect x="0" y="40" width="140" height="80" fill="url(#jh-fine)" opacity=".7"/>`;
    case 'rings':
      return `<g stroke="${C.olive}" stroke-width="2"><line x1="0" y1="44" x2="140" y2="44"/><line x1="0" y1="49" x2="140" y2="49"/></g>`;
    case 'sun': {
      let r = '';
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        r += `<line x1="${(58 + Math.cos(a) * 13).toFixed(1)}" y1="${(74 + Math.sin(a) * 13).toFixed(1)}" x2="${(58 + Math.cos(a) * 19).toFixed(1)}" y2="${(74 + Math.sin(a) * 19).toFixed(1)}"/>`;
      }
      return `<g stroke="${INK}" stroke-width="1.2"><circle cx="58" cy="74" r="9" fill="${C.olive}"/>${r}</g>`;
    }
    case 'peak':
      return `<path d="M26 112 L50 76 L60 88 L74 66 L98 112 Z" fill="${C.cream}" stroke="${INK}" stroke-width="1"/><path d="M68 74 L74 66 L80 76 L76 74 L72 78 Z" fill="${C.milk}" stroke="${INK}" stroke-width=".8"/>`;
    default:
      return '';
  }
}

export type MugOpts = {
  /** unique id prefix, needed when the same mug is on the page twice */
  uid?: string;
  /** 0..1 fill level; omit for an empty mug */
  level?: number;
  liquid?: string;
  steam?: boolean;
  label?: string;
  className?: string;
};

export function mugSVG(m: Mug, o: MugOpts = {}): string {
  const u = o.uid ?? m.id;
  const body = bodies[m.shape];
  const h = handles[m.handle];
  const bodyFill = C[m.body];
  const rimFill = C[m.rim];
  const level = o.level ?? 0;
  // liquid surface rises from below the opening to just under the rim
  const lcy = RIM.cy + OPEN.ry * 2.2 * (1 - level) + 0.6;
  const saucer = m.shape === 'cup'
    ? `<ellipse cx="62" cy="102" rx="52" ry="10" fill="${C.milk}" stroke="${INK}" stroke-width="1.4"/><ellipse cx="62" cy="100" rx="30" ry="5" fill="none" stroke="${INK}" stroke-width=".8"/>`
    : `<g stroke="${INK}" stroke-width=".7" opacity=".8"><path d="M18 120 H106"/><path d="M24 123 H100"/><path d="M34 126 H92"/></g>`;
  const steam = o.steam
    ? `<g class="steam" fill="none" stroke="${C.cream}" stroke-width="1.1" stroke-linecap="round"><path class="s1" d="M52 22 C46 14 58 8 52 -2 C48 -8 54 -14 52 -20"/><path class="s2" d="M62 20 C58 12 68 6 62 -4 C58 -10 64 -16 62 -24"/><path class="s3" d="M72 22 C68 14 78 8 72 0 C68 -6 74 -12 72 -18"/></g>`
    : '';
  const handleSvg = h
    ? `<path d="${h}" fill="none" stroke="${INK}" stroke-width="11" stroke-linecap="butt"/><path d="${h}" fill="none" stroke="${bodyFill}" stroke-width="7.6"/><path d="${h}" fill="none" stroke="url(#jh-fine)" stroke-width="7.6" opacity=".6"/>`
    : '';
  return `<svg class="mug ${o.className ?? ''}" viewBox="0 -26 140 156" role="img" aria-label="${o.label ?? m.name}" overflow="visible">
  <defs>
    <clipPath id="${u}-b"><path d="${body}"/></clipPath>
    <clipPath id="${u}-o"><ellipse cx="${RIM.cx}" cy="${RIM.cy}" rx="${OPEN.rx}" ry="${OPEN.ry}"/></clipPath>
  </defs>
  ${saucer}
  ${handleSvg}
  <path d="${body}" fill="${bodyFill}"/>
  <g clip-path="url(#${u}-b)">
    ${deco(m.deco, m.body)}
    <rect x="72" y="20" width="40" height="110" fill="url(#jh)" opacity="${darkBody(m.body) ? 0.9 : 0.75}"/>
    <rect x="86" y="20" width="20" height="110" fill="url(#jh-x)" opacity=".55"/>
    <g stroke="${darkBody(m.body) ? C.cream : C.milk}" stroke-width="1.4" opacity=".75"><line x1="36" y1="42" x2="36" y2="96"/><line x1="40" y1="46" x2="40" y2="70"/></g>
  </g>
  <path d="${body}" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
  <ellipse cx="${RIM.cx}" cy="${RIM.cy}" rx="${RIM.rx}" ry="${RIM.ry}" fill="${rimFill}" stroke="${INK}" stroke-width="1.8"/>
  <ellipse cx="${RIM.cx}" cy="${RIM.cy}" rx="${OPEN.rx}" ry="${OPEN.ry}" fill="${C.forest}" stroke="${INK}" stroke-width="1"/>
  <g clip-path="url(#${u}-o)">
    <rect x="20" y="20" width="90" height="20" fill="url(#jh-x)" opacity=".7"/>
    <ellipse class="liquid" cx="${RIM.cx}" cy="${lcy.toFixed(2)}" rx="${OPEN.rx}" ry="${OPEN.ry}" fill="${o.liquid ?? INK}" ${level > 0 ? '' : 'opacity="0"'}/>
    <g class="foam" opacity="0" fill="${C.milk}" stroke="${INK}" stroke-width=".5"><circle cx="52" cy="${RIM.cy}" r="1.2"/><circle cx="66" cy="${RIM.cy - 1}" r="1"/><circle cx="74" cy="${RIM.cy + 1}" r="1.4"/></g>
  </g>
  ${steam}
</svg>`;
}

export const LIQUID = { espresso: INK, milky: C.stone, water: '#2a2519', cold: '#3a2f22' };
