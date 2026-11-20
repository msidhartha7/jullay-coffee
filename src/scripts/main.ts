import { initCamera } from './camera';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initMugs } from './mug';
import { initPour } from './pour';
import { initSound } from './sound';
import { initBooks, initCloche, initDaylight } from './ui';
import { initMenuBook } from './menubook';
import { initWall } from './wall';

if (new URLSearchParams(location.search).has('drafts')) document.documentElement.classList.add('show-drafts');
const camera = initCamera();
initSound();
const day = initDaylight();
initCloche(day.drinksOnly);
initMenuBook();
initWall();
initBooks();
initPour();
const { companion } = initMugs(() => {});

// walk in: the door, and the skip link
document.querySelector('[data-walk-in]')?.addEventListener('click', () => camera.goTo('room'));
document.querySelector('.skip')?.addEventListener('click', (e) => { e.preventDefault(); camera.goTo('mugs'); });
companion?.addEventListener('click', () => camera.goTo('mugs'));

// any in-page link to a panel goes through the camera
document.querySelectorAll<HTMLAnchorElement>('a[data-target], a[data-jump]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    camera.goTo(a.dataset.target ?? a.dataset.jump!);
  });
});
document.querySelector<HTMLAnchorElement>('.topbar-logo')?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// keep the nav and the companion in step with where you are
const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-zone-link]'));
let ticking = false;
const update = () => {
  ticking = false;
  const p = camera.current();
  const zone = p?.dataset.zone;
  links.forEach((l) => l.setAttribute('aria-current', String(l.dataset.zoneLink === zone)));
  companion?.classList.toggle('is-visible', window.scrollY > camera.outsideEnd() - window.innerHeight * 0.3);
};
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
ScrollTrigger.addEventListener('refresh', update);
update();

// The room pans with transforms; never let the browser scroll it sideways (anchor jumps do).
const roomEl = document.getElementById('room');
roomEl?.addEventListener('scroll', () => { if (roomEl.scrollLeft) roomEl.scrollLeft = 0; });

// #panel links (e.g. back from the library, or a shared link): walk there through the camera
function followHash(instant: boolean) {
  const hash = location.hash.slice(1);
  if (!hash || !document.getElementById(hash)?.closest('[data-track]')) return;
  if (roomEl) roomEl.scrollLeft = 0;
  history.replaceState(null, '', location.pathname + location.search);
  camera.goTo(hash, instant);
}
window.addEventListener('hashchange', () => followHash(false));
if (location.hash) {
  ScrollTrigger.addEventListener('refresh', function once() {
    ScrollTrigger.removeEventListener('refresh', once);
    followHash(true);
  });
  ScrollTrigger.refresh();
}
