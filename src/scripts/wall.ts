type M = { id: string; race: string; km?: number; distance?: string; when?: string; where?: string; note?: string; kind: string };

const KIND: Record<string, string> = { ultra: 'Ultra or trail', half: 'Marathon or half', short: '10K or shorter', other: 'Not a run' };

/** Every medal rail on the page: tap a medal, read it on that rail's card. */
export function initWall() {
  const el = document.getElementById('wall-data');
  if (!el) return;
  const medals: M[] = JSON.parse(el.textContent!);
  document.querySelectorAll<HTMLElement>('[data-rail-scope]').forEach((scope) => {
    const btns = Array.from(scope.querySelectorAll<HTMLButtonElement>('[data-medal]'));
    const card = {
      kind: scope.querySelector('[data-mc-kind]')!, race: scope.querySelector('[data-mc-race]')!,
      meta: scope.querySelector('[data-mc-meta]')!, note: scope.querySelector('[data-mc-note]')!,
    };
    btns.forEach((b) => b.addEventListener('click', () => {
      const m = medals.find((x) => x.id === b.dataset.medal);
      if (!m) return;
      btns.forEach((x) => x.setAttribute('aria-pressed', 'false'));
      void b.offsetWidth;
      b.setAttribute('aria-pressed', 'true');
      card.kind.textContent = KIND[m.kind];
      card.race.textContent = m.race;
      card.meta.textContent = [m.distance ?? (m.km ? `${m.km} km` : ''), m.where, m.when].filter(Boolean).join(' · ') || 'Details to come.';
      card.note.textContent = m.note ?? '';
    }));
  });

  // filters on the full wall
  const chips = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-kind-filter]'));
  chips.forEach((c) => c.addEventListener('click', () => {
    const k = c.dataset.kindFilter!;
    chips.forEach((x) => x.setAttribute('aria-pressed', String(x === c)));
    document.querySelectorAll<HTMLElement>('[data-rail-section]').forEach((s) => { s.hidden = k !== 'all' && s.dataset.railSection !== k; });
  }));
}
