import { mugById, type Mug } from '../lib/mugs';

const KEY = 'jullay:mug';
type Listener = (m: Mug) => void;
const listeners = new Set<Listener>();

function read(): string | null {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

let current: Mug = mugById(read());

export const mugState = {
  get: () => current,
  set(id: string) {
    current = mugById(id);
    try { localStorage.setItem(KEY, current.id); } catch { /* private mode: keep it for this visit */ }
    listeners.forEach((l) => l(current));
  },
  on(l: Listener) { listeners.add(l); l(current); return () => listeners.delete(l); },
};

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isDesktop = () => window.matchMedia('(min-width: 861px)').matches;
