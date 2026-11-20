/**
 * Everything the site says lives here.
 *
 * PLACEHOLDER: anything marked `// TODO` is stand-in copy until the real
 * menu, prices, hours, address and links arrive. Edit this file only;
 * every scene and the /menu page render from it.
 */

export type Drink = {
  id: string;
  name: string;
  price: number; // rupees
  note: string;
  /** How it pours at the bar: espresso shots, then optional milk or water. */
  pour: { shots: number; top?: 'milk' | 'water' | 'ice' | 'none'; milky?: boolean };
  tags?: string[];
};

export type Food = {
  id: string;
  name: string;
  price: number;
  note: string;
  art: 'croissant' | 'loaf' | 'sandwich' | 'cookie';
  tags?: string[];
};

export type Book = {
  id: string;
  spine: string;
  title: string;
  body: string[];
  colour: 'cream' | 'oat' | 'olive' | 'moss' | 'forest' | 'ink' | 'stone' | 'milk';
  height: number; // % of shelf height
  width: number; // px
};

export const cafe = {
  name: 'Jullay Coffee',
  tagline: 'No hype. Just coffee.',
  greeting: {
    word: 'Jullay.',
    meaning: 'In Ladakh it means hello. Also thank you, and goodbye.',
    short: 'Hello, in Ladakhi.',
  },

  // TODO: real address, map link and socials
  address: ['Jullay Coffee', 'Street address, Area', 'City 560000'],
  mapUrl: 'https://maps.google.com/?q=Jullay+Coffee',
  instagram: { handle: '@jullay.coffee', url: 'https://instagram.com/jullay.coffee' },
  email: 'hello@jullay.coffee',

  // TODO: real hours. 24h clock, in the cafe's time zone.
  timeZone: 'Asia/Kolkata',
  hours: [
    { days: 'Mon to Fri', open: '08:00', close: '22:00', dow: [1, 2, 3, 4, 5] },
    { days: 'Sat and Sun', open: '09:00', close: '23:00', dow: [0, 6] },
  ],

  // TODO: real drinks and prices
  drinks: [
    { id: 'espresso', name: 'Espresso', price: 140, note: 'A double. Short and dark.', pour: { shots: 2, top: 'none' } },
    { id: 'americano', name: 'Americano', price: 160, note: 'Espresso, long with hot water.', pour: { shots: 2, top: 'water' } },
    { id: 'cortado', name: 'Cortado', price: 180, note: 'Equal parts espresso and warm milk.', pour: { shots: 2, top: 'milk', milky: true } },
    { id: 'cappuccino', name: 'Cappuccino', price: 200, note: 'Espresso, milk, a thick cap of foam.', pour: { shots: 2, top: 'milk', milky: true }, tags: ['Oat +₹40'] },
    { id: 'flat-white', name: 'Flat white', price: 210, note: 'Less foam, more coffee.', pour: { shots: 2, top: 'milk', milky: true }, tags: ['Oat +₹40'] },
    { id: 'latte', name: 'Latte', price: 210, note: 'Mostly milk. Soft and easy.', pour: { shots: 1, top: 'milk', milky: true }, tags: ['Oat +₹40'] },
    { id: 'cold-brew', name: 'Cold brew', price: 220, note: 'Steeped overnight. Served on ice.', pour: { shots: 0, top: 'ice' } },
    { id: 'pour-over', name: 'Pour over', price: 240, note: 'Single origin, brewed by hand. Ask what is on.', pour: { shots: 0, top: 'water' } },
  ] satisfies Drink[],

  // TODO: real food and prices
  food: [
    { id: 'croissant', name: 'Butter croissant', price: 160, note: 'Baked this morning. Gone by noon.', art: 'croissant' },
    { id: 'banana-bread', name: 'Banana bread', price: 140, note: 'A thick slice. Toasted if you like.', art: 'loaf' },
    { id: 'sandwich', name: 'Pesto sandwich', price: 260, note: 'Sourdough, pesto, tomato, cheese.', art: 'sandwich' },
    { id: 'cookie', name: 'Chocolate cookie', price: 120, note: 'Big, soft in the middle.', art: 'cookie' },
  ] satisfies Food[],

  houseRules: ['Pay.', 'Order.', 'Pick up.'],

  books: [
    {
      id: 'name', spine: 'The name', title: 'Jullay.', colour: 'olive', height: 86, width: 46,
      body: ['In Ladakh, one word does a lot of work.', 'Jullay is hello when you walk in, thank you when your cup arrives, and goodbye on your way out.', 'That is the whole visit. We named the place after it.'],
    },
    {
      id: 'rules', spine: 'House rules', title: 'Pay. Order. Pick up.', colour: 'cream', height: 74, width: 38,
      body: ['Pay at the counter.', 'Order what you like.', 'We call your name. You pick up.', 'Stay as long as you want.'],
    },
    {
      id: 'simple', spine: 'Stay simple', title: 'Stay Jullay. Stay simple.', colour: 'forest', height: 92, width: 52,
      body: ['Good beans. Clean water. A machine looked after daily.', 'That is most of it.'],
    },
    {
      id: 'hours', spine: 'Hours', title: 'When we are open.', colour: 'oat', height: 68, width: 34,
      body: [], // filled from `hours`
    },
    {
      id: 'shelf', spine: 'This shelf', title: 'Take one. Leave one.', colour: 'moss', height: 80, width: 44,
      // TODO: confirm the book-swap rule
      body: ['These are not for sale.', 'Read here, or take one home and bring back another.'],
    },
    {
      id: 'beans', spine: 'Beans', title: 'Take some home.', colour: 'stone', height: 88, width: 40,
      // TODO: real bags and prices
      body: ['Whole beans or ground for your brewer.', 'Ask at the counter for what is on the shelf this week.'],
    },
    {
      id: 'find', spine: 'Find us', title: 'Find us.', colour: 'ink', height: 78, width: 42,
      body: [], // filled from `address`
    },
    {
      id: 'works-out', spine: 'What if', title: 'What if it all works out?', colour: 'milk', height: 70, width: 30,
      body: ['It is on the wall by the bar.', 'A good question to sit with over a second cup.'],
    },
  ] satisfies Book[],
};

/** Is the cafe open right now, in its own time zone? */
export function openState(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: cafe.timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  const mins = Number(get('hour')) * 60 + Number(get('minute'));
  const toMin = (s: string) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  const today = cafe.hours.find((h) => h.dow.includes(dow));
  const open = !!today && mins >= toMin(today.open) && mins < toMin(today.close);
  return { open, mins, today, hourFraction: mins / 1440 };
}

export const rupees = (n: number) => `₹${n}`;
