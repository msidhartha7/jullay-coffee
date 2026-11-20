import { initCamera } from './camera';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initMugs } from './mug';
import { initPour } from './pour';
import { initSound } from './sound';
import { initBooks, initDaylight, initFood } from './ui';

const camera = initCamera();
initSound();
initDaylight();
initFood();
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
