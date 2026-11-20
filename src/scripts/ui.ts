import { openState, cafe, clock, span } from '../data/cafe';

/** Carbs: lift the glass. No menu under it, just a nudge to ask. */
export function initCloche(drinksOnly: boolean) {
  const b = document.querySelector<HTMLButtonElement>('[data-cloche]');
  const cap = document.querySelector('[data-cloche-caption]');
  if (!b || !cap) return;
  b.addEventListener('click', () => {
    const open = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', String(open));
    b.setAttribute('aria-label', open ? 'Put the glass back' : 'Lift the glass');
    cap.textContent = !open ? 'Lift the glass.'
      : drinksOnly ? 'Nothing under here today. Tuesdays are drinks only.'
      : 'Fresh from the kitchen. Ask what is on today.';
  });
}

/** Chapters: pull a book off the shelf. */
export function initBooks() {
  const data: { id: string; spine: string; title: string; body: string[]; list: boolean }[] =
    JSON.parse(document.getElementById('books-data')?.textContent ?? '[]');
  const spines = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-book]'));
  const book = document.querySelector<HTMLElement>('[data-open-book]');
  const title = document.querySelector('[data-book-title]');
  const spine = document.querySelector('[data-book-spine]');
  const body = document.querySelector('[data-book-body]');
  if (!book || !title || !spine || !body) return;

  const open = (btn: HTMLButtonElement, focus = false) => {
    const b = data.find((x) => x.id === btn.dataset.book);
    if (!b) return;
    spines.forEach((s) => { const on = s === btn; s.setAttribute('aria-selected', String(on)); s.tabIndex = on ? 0 : -1; });
    book.setAttribute('aria-labelledby', btn.id);
    title.textContent = b.title;
    spine.textContent = b.spine;
    body.classList.toggle('is-list', b.list);
    body.replaceChildren(...b.body.map((t) => { const p = document.createElement('p'); p.className = 't-body'; p.textContent = t; return p; }));
    book.classList.remove('is-turning'); void book.offsetWidth; book.classList.add('is-turning');
    if (focus) btn.focus();
  };

  spines.forEach((btn, i) => {
    btn.addEventListener('click', () => open(btn));
    btn.addEventListener('keydown', (e) => {
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      open(spines[(i + step + spines.length) % spines.length], true);
    });
  });
}

/**
 * The hour, as the cafe sees it: open sign, and sun through the window.
 * Add ?hour=21 and/or ?day=tue to the URL to see another time.
 */
export function initDaylight() {
  const params = new URLSearchParams(location.search);
  const q = params.get('hour');
  const day = params.get('day');
  let now = new Date();
  if (day) {
    const want = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(day.slice(0, 3).toLowerCase());
    if (want >= 0) now = new Date(now.getTime() + ((want - openState(now).dow + 7) % 7) * 86400000);
  }
  if (q !== null && !Number.isNaN(Number(q))) {
    // build a time that reads as `hour` in the cafe's zone
    const st = openState(now);
    now = new Date(now.getTime() + (Number(q) * 60 - st.mins) * 60000);
  }
  const st = openState(now);
  document.documentElement.dataset.drinksOnly = String(st.drinksOnly);

  const tag = document.querySelector<HTMLElement>('[data-open-tag]');
  if (tag) {
    tag.textContent = !st.open ? 'Closed now' : st.drinksOnly ? 'Open. Drinks only today' : 'Open now';
    tag.dataset.state = st.open ? 'open' : 'closed';
  }
  if (st.drinksOnly) document.querySelectorAll('[data-food-line]').forEach((el) => { el.textContent = cafe.food.tuesday; });
  document.querySelectorAll('[data-open-sign]').forEach((s) => { s.textContent = st.open ? 'Open' : 'Closed'; });
  const line = document.querySelector('[data-open-line]');
  if (line) line.textContent = st.open
    ? `Open now, until ${st.today ? clock(st.today.close) : ''}.`
    : `Closed now. ${st.today ? `Today: ${span(st.today)}.` : ''}`.trim();

  const room = document.querySelector<HTMLElement>('#room');
  const light = document.querySelector<HTMLElement>('[data-light]');
  const h = st.mins / 60;
  const night = h < 6.5 || h >= 18.75;
  room?.setAttribute('data-night', String(night));
  if (light && !night) {
    // morning light leans one way, afternoon the other
    const t = (h - 6.5) / (18.75 - 6.5); // 0..1 across the day
    light.style.setProperty('--lean', `${(-35 + t * 70).toFixed(1)}deg`);
    light.style.setProperty('--shift', `${(t * 40).toFixed(1)}vw`);
    light.style.setProperty('--sun', (0.05 + Math.sin(t * Math.PI) * 0.07).toFixed(2));
  }
  return { open: st.open, drinksOnly: st.drinksOnly };
}
