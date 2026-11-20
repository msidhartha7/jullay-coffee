/**
 * The founder's wall: medals on the peg rail and bibs on strings, in the cafe.
 * Transcribed from photos of the wall. Entries with `check: true` were only
 * partly legible and need Ayaan to confirm the name, distance or date.
 */

export type Kind = 'ultra' | 'half' | 'short' | 'other';
export type Shape = 'round' | 'octagon' | 'heart' | 'square' | 'cog' | 'tag' | 'ring';
export type Metal = 'gold' | 'silver' | 'bronze' | 'wood' | 'black';
export type Colour = 'cream' | 'oat' | 'olive' | 'moss' | 'forest' | 'ink' | 'stone' | 'milk';

export type Medal = {
  id: string;
  race: string;
  km?: number;
  distance?: string; // how the medal says it, when not plain km
  when?: string;
  where?: string;
  note?: string;
  kind: Kind;
  shape: Shape;
  metal: Metal;
  ribbon: [Colour, Colour];
  highlight?: boolean;
  check?: boolean;
};

export const founder = {
  name: 'Ayaan',
  // Ayaan's own words, verbatim.
  bio: ['Coffee, food, books.', 'A neighbourhood cafe.', 'No hype. Just coffee.'] as string[],
  line: 'Everything on this wall was run by Ayaan, who started Jullay.',
};

export const medals: Medal[] = [
  // Ultras and trail
  { id: 'buddha-trail', race: 'The Buddha Trail', where: 'Rimbick to Darjeeling', km: 65, when: '4 Apr 2026', kind: 'ultra', shape: 'ring', metal: 'silver', ribbon: ['olive', 'cream'], highlight: true },
  { id: 'jarakabande', race: 'Jarakabande Eco Ultra', km: 80, when: '2026', where: 'Bengaluru', kind: 'ultra', shape: 'octagon', metal: 'bronze', ribbon: ['moss', 'milk'], highlight: true },
  { id: 'skyultra', race: 'SkyUltra, Solang Valley', km: 60, when: '12 Oct 2025', kind: 'ultra', shape: 'round', metal: 'gold', ribbon: ['forest', 'oat'], highlight: true, check: true },
  { id: 'kgf', race: 'KGF Ultra', km: 70, when: '2026', kind: 'ultra', shape: 'tag', metal: 'bronze', ribbon: ['cream', 'olive'], highlight: true, check: true },
  { id: 'chiang-mai', race: 'Chiang Mai, by UTMB', km: 50, where: 'Thailand', kind: 'ultra', shape: 'cog', metal: 'wood', ribbon: ['oat', 'moss'], highlight: true, check: true },
  { id: 'beyond-win', race: 'Beyond 42.195, 5th edition', distance: '50 km team relay', km: 50, when: '27 Oct 2024', note: 'Winner, relay mixed.', kind: 'ultra', shape: 'tag', metal: 'black', ribbon: ['milk', 'stone'], highlight: true },
  { id: 'beyond', race: 'Beyond 42.195, 5th edition', distance: '50 km team relay', km: 50, when: '27 Oct 2024', note: 'We did it.', kind: 'ultra', shape: 'tag', metal: 'black', ribbon: ['milk', 'oat'] },
  { id: 'bmf-30', race: 'BMF Ultra', where: 'Avathi Hills', km: 30, when: '2025', kind: 'ultra', shape: 'octagon', metal: 'bronze', ribbon: ['milk', 'ink'], highlight: true },
  { id: 'bmf-25', race: 'BMF Ultra', km: 25, kind: 'ultra', shape: 'square', metal: 'bronze', ribbon: ['ink', 'forest'], check: true },
  { id: 'fifty', race: '50 km run', km: 50, note: 'Footprint medal.', kind: 'ultra', shape: 'square', metal: 'gold', ribbon: ['stone', 'cream'], check: true },

  // Marathons and halves
  { id: 'tbhm', race: 'Bengaluru Half Marathon', km: 21.1, kind: 'half', shape: 'round', metal: 'gold', ribbon: ['forest', 'cream'], highlight: true },
  { id: 'goa', race: 'SKF Goa River Marathon', km: 21.097, when: '2024', kind: 'half', shape: 'round', metal: 'black', ribbon: ['olive', 'milk'], highlight: true },
  { id: 'mountain-festival', race: 'Bengaluru Mountain Festival', km: 21, kind: 'half', shape: 'tag', metal: 'bronze', ribbon: ['ink', 'milk'], check: true },
  { id: 'life-calling', race: '21.1K Run, Life is Calling', km: 21.1, kind: 'half', shape: 'round', metal: 'silver', ribbon: ['cream', 'oat'] },
  { id: 'plankathon', race: 'Plankathon', km: 21.097, kind: 'half', shape: 'square', metal: 'bronze', ribbon: ['milk', 'olive'], check: true },
  { id: 'mysuru', race: 'Mysuru Half Marathon', km: 21.1, when: '22 Sept', kind: 'half', shape: 'tag', metal: 'bronze', ribbon: ['milk', 'moss'], check: true },
  { id: 'hyderabad', race: 'Hyderabad Marathon', when: '2025', kind: 'half', shape: 'round', metal: 'bronze', ribbon: ['forest', 'milk'], check: true },
  { id: 'canara', race: 'Canara Bank Marathon', when: '2023', kind: 'half', shape: 'round', metal: 'bronze', ribbon: ['oat', 'forest'], check: true },
  { id: 'ranga', race: 'Ranga Run Marathon', where: 'La Motte, Sarigehalli', kind: 'half', shape: 'square', metal: 'black', ribbon: ['forest', 'stone'], check: true },
  { id: 'tuffman', race: 'Tuffman', kind: 'half', shape: 'round', metal: 'gold', ribbon: ['olive', 'forest'], check: true },
  { id: 'nandi', race: 'Nandi Hills Monsoon Run', kind: 'half', shape: 'square', metal: 'silver', ribbon: ['moss', 'cream'], check: true },

  // 10K and shorter
  { id: 'heartathon-25', race: 'Heartathon, World Heart Day Run', distance: '7.2 miles', km: 11.6, when: '2025', kind: 'short', shape: 'heart', metal: 'gold', ribbon: ['milk', 'moss'], highlight: true },
  { id: 'heartathon-24', race: 'Heartathon, World Heart Day Run', distance: '7.2 miles', km: 11.6, when: '2024', kind: 'short', shape: 'heart', metal: 'gold', ribbon: ['milk', 'olive'] },
  { id: 'nitro', race: 'Puma Nitro 10K', km: 10, kind: 'short', shape: 'round', metal: 'bronze', ribbon: ['ink', 'milk'], highlight: true },
  { id: 'pink', race: 'Pink 10K Challenge', km: 10, kind: 'short', shape: 'octagon', metal: 'silver', ribbon: ['oat', 'milk'], highlight: true },
  { id: 'police', race: 'Karnataka State Police Run', km: 10, kind: 'short', shape: 'cog', metal: 'bronze', ribbon: ['stone', 'oat'] },
  { id: 'kalki', race: 'Kalki Sports 10K, Bengaluru', km: 10, kind: 'short', shape: 'octagon', metal: 'bronze', ribbon: ['forest', 'olive'] },
  { id: 'jatre', race: 'Bengaluru Runners Jatre', km: 10, when: '11 June 2023', kind: 'short', shape: 'cog', metal: 'gold', ribbon: ['cream', 'stone'] },
  { id: 'bsf-10k', race: 'Bengaluru Sports Foundation 10K', km: 10, kind: 'short', shape: 'square', metal: 'bronze', ribbon: ['cream', 'forest'] },
  { id: 'neerathon', race: 'IPA Neerathon', km: 10, kind: 'short', shape: 'round', metal: 'silver', ribbon: ['moss', 'oat'] },
  { id: 'rotary', race: 'Rotary 10K', km: 10, kind: 'short', shape: 'round', metal: 'gold', ribbon: ['oat', 'olive'] },
  { id: 'freedom', race: 'Freedom Run', when: '15 Aug 2024', kind: 'short', shape: 'round', metal: 'gold', ribbon: ['milk', 'stone'], check: true },
  { id: 'intentionality', race: 'Intentionality Run', when: '2025', kind: 'short', shape: 'round', metal: 'bronze', ribbon: ['stone', 'milk'], check: true },

  // Other
  { id: 'badminton', race: 'Intermediate badminton tournament', when: '2021', note: 'Not every medal is a run.', kind: 'other', shape: 'round', metal: 'silver', ribbon: ['forest', 'milk'], highlight: true },
];

/** Bibs on the strings, as printed. */
export const bibs: { no: string; race: string; colour: Colour }[] = [
  { no: '81', race: 'Trail run', colour: 'milk' },
  { no: '507', race: '50 km', colour: 'milk' },
  { no: '6023', race: 'Ultra', colour: 'cream' },
  { no: '7361', race: 'Heartathon, 7.2 miles', colour: 'moss' },
  { no: '1240', race: 'Bengaluru 10K', colour: 'ink' },
  { no: '2243', race: 'Half marathon', colour: 'oat' },
  { no: '46124', race: 'Marathon', colour: 'milk' },
  { no: '700', race: 'KGF Ultra, 70K', colour: 'forest' },
  { no: '2202', race: 'Half marathon', colour: 'cream' },
  { no: '795', race: 'Puma Nitro 10K', colour: 'ink' },
];

export const kinds: { id: Kind; label: string }[] = [
  { id: 'ultra', label: 'Ultras and trails' },
  { id: 'half', label: 'Marathons and halves' },
  { id: 'short', label: '10K and shorter' },
  { id: 'other', label: 'Everything else' },
];

export const wallPhotos = [
  { src: '/wall/wall-wide.jpg', alt: 'The full medal rail along the top of the olive wall, with bookshelves at both ends.', w: 1600, h: 1200 },
  { src: '/wall/medals-2.jpg', alt: 'Close up of medals: The Buddha Trail 65 km, BMF Ultra 30 km, the heart-shaped Heartathon medal and more.', w: 1600, h: 1200 },
  { src: '/wall/medals-4.jpg', alt: 'Medals including Jarakabande Eco Ultra 80K, the SkyUltra and Nandi Hills Monsoon Run.', w: 1600, h: 1200 },
  { src: '/wall/medals-1.jpg', alt: 'Medals including Puma Nitro 10K, Bengaluru Half Marathon and a badminton medal.', w: 1600, h: 1200 },
  { src: '/wall/medals-3.jpg', alt: 'Medals including Karnataka State Police Run, Beyond 42.195 relay and KGF Ultra.', w: 1600, h: 1200 },
  { src: '/wall/bibs.jpg', alt: 'Three strings of race bibs pinned across the wall.', w: 1600, h: 404 },
];
