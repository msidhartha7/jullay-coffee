import { gsap } from 'gsap';
import { mugSVG, LIQUID } from '../lib/mugs';
import type { Drink } from '../data/cafe';
import { mugState, reducedMotion } from './state';
import { sound } from './sound';

const RIM_CY = 30, OPEN_RY = 5.5;
const cyFor = (level: number) => RIM_CY + OPEN_RY * 2.2 * (1 - level) + 0.6;

export function initPour() {
  const drinks: Drink[] = JSON.parse(document.getElementById('drinks-data')?.textContent ?? '[]');
  const holder = document.querySelector<SVGGElement>('[data-bar-mug]');
  const streams = document.querySelector<SVGGElement>('[data-streams]');
  const pitcher = document.querySelector<SVGGElement>('[data-pitcher]');
  const stream = document.querySelector<SVGPathElement>('[data-pour-stream]');
  const ice = document.querySelector<SVGGElement>('[data-ice]');
  const t = {
    name: document.querySelector('[data-ticket-name]')!,
    note: document.querySelector('[data-ticket-note]')!,
    mug: document.querySelector('[data-ticket-mug]')!,
    price: document.querySelector('[data-ticket-price]')!,
    tags: document.querySelector('[data-ticket-tags]')!,
  };
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-drink]'));
  if (!holder || !streams || !pitcher || !stream || !ice) return;

  const x = holder.dataset.x!, y = holder.dataset.y!, s = Number(holder.dataset.s);
  let last: Drink | null = null;
  let tl: gsap.core.Timeline | null = null;

  const renderMug = (level = 0, liquid?: string) => {
    holder.innerHTML = mugSVG(mugState.get(), { uid: 'bar', steam: true, level, liquid })
      .replace('<svg ', `<svg x="${x}" y="${y}" width="${140 * s}" height="${156 * s}" `);
  };

  const pitcherAt = (p: { x: number; y: number; r: number }) =>
    pitcher.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${p.r})`);

  // a mug change resets the bar
  mugState.on((m) => {
    renderMug(0);
    t.mug.textContent = `In ${m.name.replace(/^The /, 'the ')}.`;
    if (last) pour(last, false);
  });

  function pour(d: Drink, animate = true) {
    last = d;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.drink === d.id)));
    t.name.textContent = d.name;
    t.note.textContent = d.note;
    t.price.textContent = `₹${d.price}`;
    t.tags.innerHTML = (d.tags ?? []).map((x) => `<span class="tag">${x}</span>`).join('');

    tl?.kill();
    renderMug(0);
    const svg = holder.querySelector('svg')!;
    const liquid = svg.querySelector<SVGEllipseElement>('.liquid')!;
    const foam = svg.querySelector<SVGGElement>('.foam')!;
    const steam = svg.querySelector<SVGGElement>('.steam')!;
    const cold = d.pour.top === 'ice';
    const finalColour = d.pour.milky ? LIQUID.milky : cold ? LIQUID.cold : d.pour.top === 'water' ? LIQUID.water : LIQUID.espresso;
    const shotLevel = d.pour.shots ? Math.min(0.45, 0.22 * d.pour.shots) : 0;
    const finalLevel = d.pour.top === 'none' ? shotLevel : 0.94;

    if (reducedMotion() || !animate) {
      liquid.setAttribute('opacity', '1');
      liquid.setAttribute('cy', String(cyFor(finalLevel)));
      liquid.setAttribute('fill', finalColour);
      if (d.pour.milky) foam.setAttribute('opacity', '1');
      if (!cold) steam.classList.add('on');
      return;
    }

    const lv = { level: 0 };
    const setLevel = () => liquid.setAttribute('cy', String(cyFor(lv.level)));
    const p = { x: 380, y: 160, r: 0 };
    pitcherAt(p);
    pitcher.querySelector('path')!.setAttribute('fill', d.pour.top === 'milk' ? '#e0cfbc' : '#b49a7c');
    stream.setAttribute('stroke', d.pour.top === 'milk' ? '#fefdfb' : d.pour.top === 'water' ? '#e0cfbc' : '#3a2f22');

    tl = gsap.timeline();
    gsap.set([streams, pitcher, stream, ice], { opacity: 0 });
    gsap.set(liquid, { attr: { opacity: 1, fill: d.pour.shots ? LIQUID.espresso : finalColour } });
    setLevel();

    if (d.pour.shots) {
      tl.call(() => sound.grind())
        .to({}, { duration: 0.9 })
        .call(() => sound.pour())
        .to(streams, { opacity: 1, duration: 0.15 })
        .fromTo(streams.querySelectorAll('line'), { scaleY: 0 }, { scaleY: 1, duration: 0.25, ease: 'power1.in' }, '<')
        .to(lv, { level: shotLevel, duration: 0.9 + d.pour.shots * 0.35, ease: 'sine.inOut', onUpdate: setLevel })
        .to(streams, { opacity: 0, duration: 0.2 });
    }
    if (cold) {
      tl.to(ice, { opacity: 1, duration: 0.1 })
        .fromTo(ice, { y: -120 }, { y: 70, duration: 0.5, ease: 'bounce.out' })
        .to(ice, { opacity: 0, duration: 0.2 });
    }
    if (d.pour.top && d.pour.top !== 'none') {
      const milky = d.pour.milky;
      tl.call(() => { if (milky) sound.steam(); })
        .to({}, { duration: milky ? 0.8 : 0.1 })
        .to(pitcher, { opacity: 1, duration: 0.2 })
        .to(p, { x: 279, y: 256, r: -50, duration: 0.6, ease: 'power2.out', onUpdate: () => pitcherAt(p) }, '<')
        .call(() => sound.pour())
        .fromTo(stream, { opacity: 0, strokeDasharray: 120, strokeDashoffset: 120 }, { opacity: 1, strokeDashoffset: 0, duration: 0.35, ease: 'power1.in' })
        .to(lv, { level: finalLevel, duration: 1.6, ease: 'sine.inOut', onUpdate: setLevel })
        .to(liquid, { attr: { fill: finalColour }, duration: 1.2 }, '<0.2')
        .to(stream, { opacity: 0, duration: 0.2 })
        .to(p, { x: 380, y: 160, r: 0, duration: 0.5, ease: 'power2.in', onUpdate: () => pitcherAt(p) })
        .to(pitcher, { opacity: 0, duration: 0.2 }, '<0.3');
      if (milky) tl.to(foam, { opacity: 1, duration: 0.4 }, '-=0.6');
    }
    if (!cold) tl.call(() => steam.classList.add('on'));
  }

  buttons.forEach((b) => b.addEventListener('click', () => {
    const d = drinks.find((x) => x.id === b.dataset.drink);
    if (d) pour(d);
  }));
}
