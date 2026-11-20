type B = { id: string; title: string; author: string; shelf: string; about: string };

/** The library: find a book, filter by shelf, pull one out to read about it. */
export function initLibrary() {
  const data: { shelves: Record<string, string>; books: B[] } = JSON.parse(document.getElementById('library-data')!.textContent!);
  const q = document.querySelector<HTMLInputElement>('[data-q]')!;
  const chips = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-shelf]'));
  const views = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-view]'));
  const count = document.querySelector('[data-count]')!;
  const empty = document.querySelector<HTMLElement>('[data-empty]')!;
  const spines = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-book]'));
  const rows = Array.from(document.querySelectorAll<HTMLElement>('[data-book-row]'));
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-shelf-section]'));
  let shelf = 'all';

  // view: shelves or list (remembered for this visitor)
  const setView = (v: string) => {
    document.documentElement.dataset.view = v;
    views.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === v)));
    try { localStorage.setItem('jullay:library-view', v); } catch { /* fine */ }
  };
  views.forEach((b) => b.addEventListener('click', () => setView(b.dataset.view!)));
  try { const v = localStorage.getItem('jullay:library-view'); if (v) setView(v); } catch { /* fine */ }

  function filter() {
    const term = q.value.trim().toLowerCase();
    const match = (el: HTMLElement) => {
      const b = data.books.find((x) => x.id === (el.dataset.book ?? el.dataset.bookRow));
      return !!b && (shelf === 'all' || b.shelf === shelf) && (!term || el.dataset.text!.includes(term));
    };
    let n = 0;
    spines.forEach((s) => { const ok = match(s); s.hidden = !ok; if (ok) n++; });
    rows.forEach((r) => { r.hidden = !match(r); });
    sections.forEach((sec) => {
      const any = sec.querySelector('[data-book]:not([hidden]), [data-book-row]:not([hidden])');
      sec.hidden = !any;
    });
    count.textContent = n === data.books.length ? `${n} books` : `${n} of ${data.books.length} books`;
    empty.hidden = n > 0;
  }
  q.addEventListener('input', filter);
  chips.forEach((c) => c.addEventListener('click', () => {
    shelf = c.dataset.shelf!;
    chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c)));
    filter();
  }));

  // the open book
  const dlg = document.querySelector<HTMLDialogElement>('[data-dialog]')!;
  const pages = dlg.querySelector<HTMLElement>('.lb-pages')!;
  const f = {
    shelf: dlg.querySelector('[data-lb-shelf]')!, title: dlg.querySelector('[data-lb-title]')!,
    author: dlg.querySelector('[data-lb-author]')!, about: dlg.querySelector('[data-lb-about]')!, where: dlg.querySelector('[data-lb-where]')!,
  };
  let current: HTMLButtonElement | null = null;
  const visible = () => spines.filter((s) => !s.hidden);

  function show(spine: HTMLButtonElement) {
    const b = data.books.find((x) => x.id === spine.dataset.book);
    if (!b) return;
    current?.classList.remove('is-out');
    current = spine;
    spine.classList.add('is-out');
    f.shelf.textContent = data.shelves[b.shelf];
    f.title.textContent = b.title;
    f.author.textContent = b.author;
    f.about.textContent = b.about;
    f.where.textContent = `Find it on the ${data.shelves[b.shelf].toLowerCase()} at the cafe. Read it over a coffee.`;
    pages.classList.remove('is-turning'); void pages.offsetWidth; pages.classList.add('is-turning');
    if (!dlg.open) dlg.showModal();
  }
  const step = (d: number) => {
    const v = visible();
    if (!current || !v.length) return;
    const i = v.indexOf(current);
    show(v[(i + d + v.length) % v.length]);
  };
  spines.forEach((s) => s.addEventListener('click', () => show(s)));
  dlg.querySelector('[data-lb-close]')!.addEventListener('click', () => dlg.close());
  dlg.querySelector('[data-lb-prev]')!.addEventListener('click', () => step(-1));
  dlg.querySelector('[data-lb-next]')!.addEventListener('click', () => step(1));
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  });
  dlg.addEventListener('close', () => {
    current?.classList.remove('is-out');
    current?.focus({ preventScroll: true });
  });
}
