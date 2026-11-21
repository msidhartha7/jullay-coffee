import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { reducedMotion } from './state';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/** Where the doorway centre sits on screen, as a % of the stage, for a slice-fit 1600x1000 view. */
function doorOrigin(stage: HTMLElement) {
  const w = stage.clientWidth, h = stage.clientHeight;
  const s = Math.max(w / 1600, h / 1000);
  const y = h / 2 + (655 - 500) * s;
  return `50% ${(y / h) * 100}%`;
}

export function initCamera() {
  const stage = document.querySelector<HTMLElement>('.outside-stage')!;
  const cam = document.querySelector<HTMLElement>('[data-cam]')!;
  const hello = document.querySelector<HTMLElement>('[data-hello]')!;
  const room = document.querySelector<HTMLElement>('#room')!;
  const track = document.querySelector<HTMLElement>('[data-track]')!;
  const panels = Array.from(track.children) as HTMLElement[];
  const doors = { l: document.querySelector('#shopfront .door-l'), r: document.querySelector('#shopfront .door-r') };
  const fades = document.querySelectorAll('.outside-overline, .scroll-hint, .walk-in');

  let outsideST: ScrollTrigger | null = null;
  let roomST: ScrollTrigger | null = null;
  const mm = gsap.matchMedia();

  mm.add({ desktop: '(min-width: 861px)', motion: '(prefers-reduced-motion: no-preference)' }, (c) => {
    const { desktop, motion } = c.conditions as { desktop: boolean; motion: boolean };

    if (!motion) {
      // no camera: doors already open, hello shown in place
      gsap.set([doors.l, doors.r], { opacity: 0 });
      gsap.set(hello, { position: 'relative', opacity: 1, pointerEvents: 'auto', minHeight: '60svh' });
      gsap.set(stage, { height: 'auto' });
      gsap.set(cam, { position: 'relative', height: '100svh' });
      return;
    }

    // 1. Outside: walk up, doors open, through, Jullay.
    cam.style.transformOrigin = doorOrigin(stage);
    const tl = gsap.timeline({ defaults: { ease: 'none' } });
    tl.to(fades, { opacity: 0, duration: 0.12 }, 0)
      .to(cam, { scale: 1.6, duration: 0.35, ease: 'power1.in' }, 0)
      .to(doors.l, { x: -240, duration: 0.25, ease: 'power2.inOut' }, 0.22)
      .to(doors.r, { x: 240, duration: 0.25, ease: 'power2.inOut' }, 0.22)
      .to(cam, { scale: desktop ? 5.2 : 3, duration: 0.4, ease: 'power2.in' }, 0.35)
      .set(document.querySelector('[data-walk-in]'), { pointerEvents: 'none' }, 0.12)
      .to(hello, { opacity: 1, duration: 0.14 }, 0.66)
      .set(hello, { pointerEvents: 'auto' }, 0.7)
      .from(hello.children, { y: 30, opacity: 0, stagger: 0.04, duration: 0.14 }, 0.68)
      .to({}, { duration: desktop ? 0.18 : 0.6 }); // mobile: hold Jullay longer so a flick doesn't skip it

    // hello now covers the shopfront: stop compositing the fully zoomed SVG under it
    tl.call(() => { cam.style.visibility = 'hidden'; stage.classList.add('is-through'); }, undefined, 0.82)
      .call(() => { cam.style.visibility = ''; stage.classList.remove('is-through'); }, undefined, 0.81);

    outsideST = ScrollTrigger.create({
      trigger: stage, start: 'top top', end: () => `+=${window.innerHeight * (desktop ? 2.2 : 3.2)}`,
      pin: true, scrub: 0.25, animation: tl, invalidateOnRefresh: true,
      onRefresh: () => { cam.style.transformOrigin = doorOrigin(stage); },
      // keep the zoom on the GPU only while it's actually zooming
      onToggle: (self) => { cam.style.willChange = self.isActive ? 'transform' : 'auto'; },
      onUpdate: (self) => { stage.classList.toggle('is-walking', self.progress > 0.12); },
    });

    // 2. Inside: pan across the room
    if (desktop) {
      const distance = () => track.scrollWidth - window.innerWidth;
      const pan = gsap.to(track, { x: () => -distance(), ease: 'none' });
      roomST = ScrollTrigger.create({
        trigger: room, start: 'top top', end: () => `+=${distance()}`,
        pin: true, scrub: 0.2, animation: pan, invalidateOnRefresh: true,
        snap: { snapTo: 1 / (panels.length - 1), inertia: false, directional: false, duration: { min: 0.15, max: 0.4 }, delay: 0.35, ease: 'power1.inOut' },
      });
    }

    // 3. The wall: words land one at a time
    gsap.from('[data-word]', {
      yPercent: 60, opacity: 0, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.works', start: 'top 70%', end: 'center 55%', scrub: true },
    });

    return () => { outsideST = null; roomST = null; cam.style.visibility = ''; cam.style.willChange = ''; stage.classList.remove('is-through', 'is-walking'); };
  });

  /** Scroll to a panel by id, in whichever layout is live. */
  function goTo(id: string, instant = false) {
    const el = document.getElementById(id);
    if (!el) return;
    const rm = reducedMotion();
    const scrollTo = (y: number) => {
      const dist = Math.abs(window.scrollY - y);
      if (rm || instant) window.scrollTo(0, y);
      else gsap.to(window, { scrollTo: { y, autoKill: false }, duration: Math.min(1.0, 0.4 + dist / 4000), ease: 'power2.inOut' });
    };
    if (roomST && track.contains(el)) {
      const dist = track.scrollWidth - window.innerWidth;
      scrollTo(roomST.start + (el.offsetLeft / dist) * (roomST.end - roomST.start));
    } else if (id === 'room' && roomST) {
      scrollTo(roomST.start + 1);
    } else {
      scrollTo(el.getBoundingClientRect().top + window.scrollY);
    }
    // move focus for keyboard users without jumping the view
    const heading = el.querySelector<HTMLElement>('h2') ?? el;
    heading.setAttribute('tabindex', '-1');
    setTimeout(() => heading.focus({ preventScroll: true }), reducedMotion() ? 0 : 700);
  }

  /** Which panel is in view, for the nav. */
  function current(): HTMLElement | null {
    if (roomST) {
      if (window.scrollY < roomST.start - window.innerHeight * 0.5) return null;
      if (window.scrollY > roomST.end + 10) return panels[panels.length - 1];
      const i = Math.round(roomST.progress * (panels.length - 1));
      return panels[i];
    }
    const mid = window.innerHeight / 2;
    return panels.find((p) => { const r = p.getBoundingClientRect(); return r.top <= mid && r.bottom >= mid; }) ?? null;
  }

  return { goTo, current, outsideEnd: () => outsideST?.end ?? (room.offsetTop - 1) };
}
