import { openState, cafe } from '../data/cafe';

/** Carbs: lift the glass to see what is in it. */
export function initFood() {
  document.querySelectorAll<HTMLButtonElement>('[data-food]').forEach((b) => {
    b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(open));
      const note = document.getElementById(b.getAttribute('aria-controls')!);
      if (note) note.hidden = !open;
    });
  });
}

/** Chapters: pull a book off the shelf. */
export function initBooks() {
  const data: { id: string; spine: string; title: string; body: string[] }[] =
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
 * Add ?hour=21 to the URL to see another time of day.
 */
export function initDaylight() {
  const q = new URLSearchParams(location.search).get('hour');
  let now = new Date();
  if (q !== null && !Number.isNaN(Number(q))) {
    // build a time that reads as `hour` in the cafe's zone
    const st = openState(now);
    now = new Date(now.getTime() + (Number(q) * 60 - st.mins) * 60000);
  }
  const st = openState(now);

  const tag = document.querySelector<HTMLElement>('[data-open-tag]');
  if (tag) { tag.textContent = st.open ? 'Open now' : 'Closed now'; tag.dataset.state = st.open ? 'open' : 'closed'; }
  document.querySelectorAll('[data-open-sign]').forEach((s) => { s.textContent = st.open ? 'Open' : 'Closed'; });
  const line = document.querySelector('[data-open-line]');
  if (line) line.textContent = st.open
    ? `Open now, until ${st.today?.close}.`
    : `Closed now. ${st.today ? `Today: ${st.today.open} to ${st.today.close}.` : ''}`.trim();

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
  return { open: st.open, timeZone: cafe.timeZone };
}
