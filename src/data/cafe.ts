/**
 * Everything the site says lives here.
 *
 * Source: the official Jullay menu (Jullay_Coffee_Menu_Reordered.pdf) and the
 * Google Maps listing. Drink notes marked `noteDraft: true` were drafted for the
 * site and need the owner's review (open the site with ?drafts to see them).
 */

export type Pour = {
  /** espresso shots from the machine */
  shots: number;
  /** what goes in after the shots */
  top: 'milk' | 'water' | 'none';
  milky?: boolean;
  /** something in the mug before anything else */
  base?: 'condensed' | 'chocolate';
  /** brewed coffee poured from a server instead of the machine */
  brewed?: boolean;
};

export type Drink = {
  id: string;
  name: string;
  price: number; // rupees
  hot: boolean;
  iced: boolean;
  note: string;
  noteDraft?: boolean;
  pour: Pour;
};

export type MenuSection = { id: string; title: string; items: Drink[] };

export type Book = {
  id: string;
  spine: string;
  title: string;
  body: string[];
  colour: 'cream' | 'oat' | 'olive' | 'moss' | 'forest' | 'ink' | 'stone' | 'milk';
  height: number; // % of shelf height
  width: number; // px
  list?: boolean; // render the body as a compact list
};

const coffee: MenuSection[] = [
  {
    id: 'espresso',
    title: 'Espresso bar',
    items: [
      { id: 'americano', name: 'Americano', price: 180, hot: true, iced: true, note: 'Espresso, lengthened with water.', noteDraft: true, pour: { shots: 2, top: 'water' } },
      { id: 'cortado', name: 'Cortado', price: 190, hot: true, iced: true, note: 'Espresso cut with a little warm milk.', noteDraft: true, pour: { shots: 2, top: 'milk', milky: true } },
      { id: 'flat-white', name: 'Flat white', price: 200, hot: true, iced: true, note: 'Espresso and silky milk, with a thin layer of foam.', noteDraft: true, pour: { shots: 2, top: 'milk', milky: true } },
      { id: 'cappuccino', name: 'Cappuccino', price: 190, hot: true, iced: true, note: 'Espresso, steamed milk and a cap of foam.', noteDraft: true, pour: { shots: 2, top: 'milk', milky: true } },
      { id: 'latte', name: 'Cafe latte', price: 190, hot: true, iced: true, note: 'Espresso with plenty of steamed milk.', noteDraft: true, pour: { shots: 1, top: 'milk', milky: true } },
      { id: 'mocha', name: 'Cafe mocha', price: 230, hot: true, iced: true, note: 'Espresso, chocolate and steamed milk.', noteDraft: true, pour: { shots: 2, top: 'milk', milky: true, base: 'chocolate' } },
      { id: 'vietnamese', name: 'Vietnamese', price: 220, hot: true, iced: true, note: 'Strong coffee over sweet condensed milk.', noteDraft: true, pour: { shots: 2, top: 'none', base: 'condensed' } },
      { id: 'pumpkin-spice', name: 'Pumpkin spice latte', price: 220, hot: true, iced: false, note: 'A latte with pumpkin spice.', noteDraft: true, pour: { shots: 1, top: 'milk', milky: true } },
    ],
  },
  {
    id: 'slow',
    title: 'Slow coffee',
    items: [
      { id: 'pour-over', name: 'Pour over', price: 220, hot: true, iced: true, note: 'Brewed slowly by hand, one cup at a time.', noteDraft: true, pour: { shots: 0, top: 'none', brewed: true } },
      // TODO: the menu prints "220*". Ask what the asterisk means.
      { id: 'cold-brew', name: 'Cold brew', price: 220, hot: false, iced: true, note: 'Steeped cold, served over ice.', noteDraft: true, pour: { shots: 0, top: 'none', brewed: true } },
    ],
  },
];

export type FoodItem = { name: string; sub?: string; price: number; note?: string };
export type FoodSection = { id: string; title: string; intro?: string; note?: string; groups: { title?: string; items: FoodItem[] }[] };

/** The food pages of the official menu. Shown only in the whole menu (menu book and /menu). */
const food: FoodSection[] = [
  {
    id: 'food', title: 'Food',
    groups: [{ items: [
      { name: 'Date banana toast', price: 200 },
      { name: 'Basil pesto toast', price: 200 },
      { name: 'Peanut butter toast', price: 200 },
      { name: 'Egg Kezriwal', sub: 'Indian egg benedict', price: 200 },
      { name: 'Cheese omelette', price: 200 },
      { name: 'Pesto omelette', price: 220 },
      { name: 'Chicken omelette', price: 270 },
      { name: 'Paneer omelette', price: 270 },
      { name: 'Chicken sauté', sub: 'Fried salad', price: 270 },
      { name: 'Paneer sauté', price: 270 },
      { name: 'Paneer rice bowl', price: 300 },
      { name: 'Chicken rice bowl', price: 300 },
      { name: 'Watermelon feta salad', price: 180 },
      { name: 'Tofu sauté', price: 270 },
      { name: 'Prawns sauté', sub: 'Weekend', price: 300 },
      { name: 'Prawns omelette', sub: 'Weekend', price: 325 },
    ] }],
  },
  {
    id: 'sandwich', title: 'Sandwich',
    note: 'Ask for no mayo. Spicy or non-spicy.',
    groups: [{ items: [
      { name: 'Nutella banana sandwich', price: 225 },
      { name: 'Paneer sandwich', price: 250 },
      { name: 'Cheesy corn sandwich', price: 250 },
      { name: 'Tofu sandwich', price: 250 },
      { name: 'Tempeh sandwich', sub: 'Fermented soy bean', price: 250 },
      { name: 'Mushroom sandwich', price: 250 },
      { name: 'Egg (omelette) sandwich', price: 220 },
      { name: 'Chicken sandwich', price: 250 },
    ] }],
  },
  {
    id: 'bakery', title: 'Bakery & cookies',
    intro: 'Small-batch bakes, simple flavours.',
    groups: [
      { title: 'Bakery', items: [
        { name: 'Korean bun', price: 180 },
        { name: 'Brownie with Nutella', sub: 'Contains egg', price: 150 },
        { name: 'Brownie', sub: 'Veg', price: 150 },
        { name: 'Lamington', price: 150, note: 'A classic Australian bake. Soft vanilla sponge, dipped in chocolate and rolled in desiccated coconut.' },
      ] },
      { title: 'Cookies', items: [
        { name: 'Jeera twin', price: 80 },
        { name: 'Choco cookies', price: 80 },
        { name: 'Almond jaggery twin', price: 80 },
      ] },
    ],
  },
];

export const cafe = {
  name: 'Jullay Coffee',
  tagline: 'No hype. Just coffee.',
  greeting: {
    word: 'Jullay.',
    devanagari: 'जुल्ले',
    meaning: 'A warm Ladakhi greeting. It means hi, hello, namaste, and how are you?',
  },

  concept: {
    values: ['Honest', 'Transparent', 'Coffee', 'Food', 'Vibes'],
    lines: [
      'We don’t sell so-called aesthetic and experience.',
      'We serve simple and good things.',
      'Have a slow time.',
      'Jullay is a neighbourhood coffee shop.',
    ],
  },

  address: ['Jullay Coffee', '1062, 22nd B Main Rd, Parangi Palaya', 'Sector 2, HSR Layout', 'Bengaluru, Karnataka 560102'],
  addressNote: 'In Independence Park.',
  mapUrl: 'https://maps.google.com/?cid=15052274554513737358',
  instagram: { handle: '@jullaycoffee', url: 'https://instagram.com/jullaycoffee' },

  // From "A few things to know". 24h clock, in the cafe's time zone.
  timeZone: 'Asia/Kolkata',
  hours: [{ days: 'Every day', open: '07:30', close: '20:30', dow: [0, 1, 2, 3, 4, 5, 6] }],
  /** days with no kitchen: only beverages (0 = Sunday) */
  drinksOnlyDays: [2],

  menu: { coffee, food },
  get drinks(): Drink[] { return coffee.flatMap((s) => s.items); },

  food: {
    line: 'We make food too. Toast, eggs, sandwiches and small-batch bakes.',
    ask: 'Ask at the counter for what is on today.',
    tuesday: 'Tuesdays are drinks only.',
  },

  houseRules: ['Pay.', 'Order.', 'Pick up.'],

  thingsToKnow: [
    'Free Wi-Fi.',
    'The front area is laptop-free. There is a designated workspace inside.',
    'Keep an eye on your little ones.',
    'The owner has a bit of OCD. Help us keep the space neat and tidy.',
    'Good food takes a little time. Please be patient.',
    'Something not right? Tell us on the spot. We will try to fix it.',
    'We would love your honest reviews.',
    'We’re all learners. So are we.',
  ],

  rules: [
    'Don’t be a D**k.',
    'Tell your mum you love her.',
    'Don’t forget to smile.',
    'Buy ur friend a coffee.',
    'Love your friends.',
    'Stay Jullay. Stay simple.',
  ],

  books: [
    { id: 'concept', spine: 'Our concept', title: 'Simple and good things.', colour: 'olive', height: 88, width: 48, body: [] },
    { id: 'name', spine: 'The name', title: 'Jullay. जुल्ले', colour: 'cream', height: 76, width: 40, body: [] },
    { id: 'know', spine: 'Things to know', title: 'A few things to know.', colour: 'forest', height: 94, width: 54, body: [], list: true },
    { id: 'rules', spine: 'Jullay rules', title: 'Jullay rules.', colour: 'oat', height: 82, width: 44, body: [], list: true },
    { id: 'simple', spine: 'Stay simple', title: 'Stay Jullay. Stay simple.', colour: 'moss', height: 72, width: 36, body: ['Rule six, and the whole idea.', 'Good coffee. A neighbourhood room. A slow time.'] },
    { id: 'find', spine: 'Find us', title: 'Find us.', colour: 'ink', height: 80, width: 42, body: [] },
    { id: 'works-out', spine: 'What if', title: 'What if it all works out?', colour: 'milk', height: 68, width: 30, body: ['It is on the wall by the bar.', 'A good question to sit with over a second cup.'] },
  ] satisfies Book[],
};

/** Opening hours as one line, e.g. "Every day: 10:00 to 19:00." */
/** '20:30' -> '8:30 pm' */
export function clock(hm: string) {
  const [h, m] = hm.split(':').map(Number);
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, '0')}` : ''} ${h < 12 ? 'am' : 'pm'}`;
}
/** e.g. '7:30 am to 8:30 pm' */
export const span = (h: { open: string; close: string }) => `${clock(h.open)} to ${clock(h.close)}`;
export const hoursLines = () => cafe.hours.map((h) => `${h.days}: ${span(h)}.`);

/** Book bodies that come from other data. */
export function bookBody(b: Book): string[] {
  switch (b.id) {
    case 'concept': return [cafe.concept.values.join(' · '), ...cafe.concept.lines];
    case 'name': return [cafe.greeting.meaning, 'One word for walking in. We named the place after it.'];
    case 'know': return [`Timings: ${cafe.hours.map(span).join(', ')}.`, cafe.food.tuesday, ...cafe.thingsToKnow];
    case 'rules': return cafe.rules.map((r, i) => `${i + 1}. ${r}`);
    case 'find': return [...cafe.address.slice(1), cafe.addressNote, cafe.instagram.handle];
    default: return b.body;
  }
}

/** Is the cafe open right now, in its own time zone? */
export function openState(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: cafe.timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const mins = (Number(get('hour')) % 24) * 60 + Number(get('minute'));
  const toMin = (s: string) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  const today = cafe.hours.find((h) => h.dow.includes(dow));
  const open = !!today && mins >= toMin(today.open) && mins < toMin(today.close);
  const drinksOnly = cafe.drinksOnlyDays.includes(dow);
  return { open, mins, dow, today, drinksOnly };
}

export const rupees = (n: number) => `₹${n}`;
