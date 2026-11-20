import { reducedMotion } from './state';

/** The menu book: a notebook in a dialog, one page at a time. */
export function initMenuBook() {
  const dlg = document.querySelector<HTMLDialogElement>('[data-menubook]');
  if (!dlg) return;
  const pages = Array.from(dlg.querySelectorAll<HTMLElement>('[data-nb-page]'));
  const tabs = dlg.querySelector<HTMLElement>('[data-mb-tabs]')!;
  const prev = dlg.querySelector<HTMLButtonElement>('[data-mb-prev]')!;
  const next = dlg.querySelector<HTMLButtonElement>('[data-mb-next]')!;
  const count = dlg.querySelector('[data-mb-count]')!;
  const scroller = dlg.querySelector<HTMLElement>('[data-mb-pages]')!;
  let i = 0;
  let opener: HTMLElement | null = null;

  const tabButtons = pages.map((p, n) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = p.dataset.title ?? `Page ${n + 1}`;
    b.addEventListener('click', () => show(n));
    tabs.append(b);
    return b;
  });

  function show(n: number, dir = n >= i ? 1 : -1) {
    i = Math.max(0, Math.min(pages.length - 1, n));
    pages.forEach((p, k) => p.classList.toggle('is-current', k === i));
    tabButtons.forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
    const page = pages[i];
    if (!reducedMotion()) {
      page.style.setProperty('--from', `${dir * 16}px`);
      page.classList.remove('is-turning'); void page.offsetWidth; page.classList.add('is-turning');
    }
    scroller.scrollTop = 0;
    prev.disabled = i === 0;
    next.disabled = i === pages.length - 1;
    next.textContent = i === pages.length - 1 ? 'Last page' : 'Next page';
    count.textContent = `${i + 1} of ${pages.length}`;
  }

  function open(start = 0, from?: HTMLElement | null) {
    opener = from ?? (document.activeElement as HTMLElement | null);
    show(start, 1);
    dlg.showModal();
    document.documentElement.style.overflow = 'hidden';
    dlg.querySelector<HTMLElement>('[data-mb-close]')?.focus();
  }

  dlg.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    opener?.focus({ preventScroll: true });
  });
  dlg.querySelector('[data-mb-close]')?.addEventListener('click', () => dlg.close());
  // click on the backdrop closes
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  prev.addEventListener('click', () => show(i - 1, -1));
  next.addEventListener('click', () => show(i + 1, 1));
  dlg.addEventListener('keydown', (e) => {
    if ((e.target as HTMLElement).closest('input, textarea')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1, 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1, -1); }
  });

  // swipe between pages
  let sx = 0, sy = 0;
  scroller.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  scroller.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) show(i + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  }, { passive: true });

  // openers: the topbar Menu link, and anything marked data-open-menu (opens on Coffee)
  document.querySelectorAll<HTMLElement>('[data-open-menu]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      open(Number(el.dataset.openMenu || 1), el);
    });
  });
}
