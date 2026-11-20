import { mugSVG } from '../lib/mugs';
import { mugState } from './state';

export function initMugs(onPicked: (id: string) => void) {
  const picks = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-mug]'));
  const name = document.querySelector('[data-picked-name]');
  const line = document.querySelector('[data-picked-line]');
  const companion = document.querySelector<HTMLButtonElement>('[data-companion]');
  const companionMug = document.querySelector<HTMLElement>('[data-companion-mug]');

  const choose = (btn: HTMLButtonElement, focus = false) => {
    mugState.set(btn.dataset.mug!);
    onPicked(btn.dataset.mug!);
    if (focus) btn.focus();
  };

  picks.forEach((btn, i) => {
    btn.addEventListener('click', () => choose(btn));
    // radio-group arrow keys
    btn.addEventListener('keydown', (e) => {
      const cols = window.matchMedia('(max-width: 860px)').matches ? 3 : 4;
      const step: Record<string, number> = { ArrowRight: 1, ArrowDown: cols, ArrowLeft: -1, ArrowUp: -cols };
      if (!(e.key in step)) return;
      e.preventDefault();
      const next = picks[(i + step[e.key] + picks.length) % picks.length];
      choose(next, true);
    });
  });

  mugState.on((m) => {
    picks.forEach((b) => {
      const on = b.dataset.mug === m.id;
      b.setAttribute('aria-checked', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    if (name) name.textContent = m.name;
    if (line) line.textContent = m.line;
    if (companionMug) companionMug.innerHTML = mugSVG(m, { uid: 'companion', steam: true });
    companion?.setAttribute('aria-label', `Your mug: ${m.name}. Go back to the mug wall.`);
  });

  return { companion };
}
