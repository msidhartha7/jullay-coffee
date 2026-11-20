import { gsap } from 'gsap';
import { mugSVG, LIQUID } from '../lib/mugs';
import type { Drink } from '../data/cafe';
import { mugState, reducedMotion } from './state';
import { sound } from './sound';

const RIM_CY = 30, OPEN_RY = 5.5;
const cyFor = (level: number) => RIM_CY + OPEN_RY * 2.2 * (1 - level) + 0.6;
type Temp = 'hot' | 'iced';

export function initPour() {
  const drinks: Drink[] = JSON.parse(document.getElementById('drinks-data')?.textContent ?? '[]');
  const holder = document.querySelector<SVGGElement>('[data-bar-mug]');
  const streams = document.querySelector<SVGGElement>('[data-streams]');
  const pitcher = document.querySelector<SVGGElement>('[data-pitcher]');
  const stream = document.querySelector<SVGPathElement>('[data-pour-stream]');
  const ice = document.querySelector<SVGGElement>('[data-ice]');
  const t = {
    name: document.querySelector('[data-ticket-name]')!,
    note: document.querySelector<HTMLElement>('[data-ticket-note]')!,
    temp: document.querySelector('[data-ticket-temp]')!,
    mug: document.querySelector('[data-ticket-mug]')!,
    price: document.querySelector('[data-ticket-price]')!,
  };
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-drink]'));
  const temps = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-temp]'));
  if (!holder || !streams || !pitcher || !stream || !ice) return;

  const x = holder.dataset.x!, y = holder.dataset.y!, s = Number(holder.dataset.s);
  let last: Drink | null = null;
  let temp: Temp = 'hot';
  let tl: gsap.core.Timeline | null = null;

  const renderMug = (level = 0, liquid?: string) => {
    holder.innerHTML = mugSVG(mugState.get(), { uid: 'bar', steam: true, level, liquid })
      .replace('<svg ', `<svg x="${x}" y="${y}" width="${140 * s}" height="${156 * s}" `);
  };
  const pitcherAt = (p: { x: number; y: number; r: number }) =>
    pitcher.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${p.r})`);
  const canServe = (d: Drink, m: Temp) => (m === 'hot' ? d.hot : d.iced);

  // Hot / Iced
  function setTemp(m: Temp, focus = false) {
    temp = m;
    temps.forEach((b) => {
      const on = b.dataset.temp === m;
      b.setAttribute('aria-checked', String(on));
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
    buttons.forEach((b) => {
      const d = drinks.find((x) => x.id === b.dataset.drink)!;
      const ok = canServe(d, m);
      b.setAttribute('aria-disabled', String(!ok));
      b.title = ok ? '' : m === 'hot' ? 'Iced only' : 'Hot only';
    });
    if (last && canServe(last, m)) pour(last, false);
  }
  temps.forEach((b, i) => {
    b.addEventListener('click', () => setTemp(b.dataset.temp as Temp));
    b.addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
      e.preventDefault();
      setTemp(temps[(i + 1) % temps.length].dataset.temp as Temp, true);
    });
  });

  // a mug change shows the last drink in the new mug, without replaying it
  mugState.on((m) => {
    renderMug(0);
    t.mug.textContent = `In ${m.name.replace(/^The /, 'the ')}.`;
    if (last) pour(last, false);
  });

  function pour(d: Drink, animate = true) {
    // a drink that only comes one way switches the mode for you
    if (!canServe(d, temp)) setTemp(d.hot ? 'hot' : 'iced');
    last = d;
    const iced = temp === 'iced';
    const P = d.pour;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.drink === d.id)));
    t.name.textContent = d.name;
    t.note.textContent = d.note;
    if (d.noteDraft) t.note.dataset.draft = ''; else delete t.note.dataset.draft;
    t.temp.textContent = iced ? 'Iced. ' : 'Hot. ';
    t.price.textContent = `₹${d.price}`;

    tl?.kill();
    renderMug(0);
    const svg = holder.querySelector('svg')!;
    const liquid = svg.querySelector<SVGEllipseElement>('.liquid')!;
    const foam = svg.querySelector<SVGGElement>('.foam')!;
    const steam = svg.querySelector<SVGGElement>('.steam')!;

    const finalColour =
      P.base === 'chocolate' ? LIQUID.mocha
      : P.base === 'condensed' ? LIQUID.vietnamese
      : P.milky ? LIQUID.milky
      : P.brewed ? (iced ? LIQUID.cold : LIQUID.water)
      : P.top === 'water' ? LIQUID.water
      : LIQUID.espresso;
    const baseLevel = P.base ? 0.2 : 0;
    const shotLevel = P.shots ? Math.min(0.5, baseLevel + 0.22 * P.shots) : baseLevel;
    const finalLevel = P.top === 'none' && !P.brewed ? (iced && !P.base ? 0.8 : shotLevel) : 0.94;

    if (reducedMotion() || !animate) {
      liquid.setAttribute('opacity', '1');
      liquid.setAttribute('cy', String(cyFor(finalLevel)));
      liquid.setAttribute('fill', finalColour);
      if (P.milky && !iced) foam.setAttribute('opacity', '1');
      if (!iced) steam.classList.add('on');
      return;
    }

    const lv = { level: 0 };
    const setLevel = () => liquid.setAttribute('cy', String(cyFor(lv.level)));
    const p = { x: 380, y: 160, r: 0 };
    pitcherAt(p);
    gsap.set([streams, pitcher, stream, ice], { opacity: 0 });
    gsap.set(liquid, { attr: { opacity: 0, fill: LIQUID.espresso } });
    setLevel();

    // pour from the jug: milk, water, or brewed coffee from the server
    const jug = (kind: 'milk' | 'water' | 'brew', to: number, colourTo?: string, dur = 1.6) => {
      const body = pitcher.querySelector('path')!;
      body.setAttribute('fill', kind === 'milk' ? '#e0cfbc' : kind === 'brew' ? '#576544' : '#b49a7c');
      stream.setAttribute('stroke', kind === 'milk' ? '#fefdfb' : kind === 'water' ? '#e0cfbc' : '#3a2f22');
      tl!.to(pitcher, { opacity: 1, duration: 0.2 })
        .to(p, { x: 279, y: 256, r: -50, duration: 0.6, ease: 'power2.out', onUpdate: () => pitcherAt(p) }, '<')
        .call(() => sound.pour())
        .call(() => { liquid.setAttribute('opacity', '1'); })
        .fromTo(stream, { opacity: 0, strokeDasharray: 120, strokeDashoffset: 120 }, { opacity: 1, strokeDashoffset: 0, duration: 0.35, ease: 'power1.in' })
        .to(lv, { level: to, duration: dur, ease: 'sine.inOut', onUpdate: setLevel });
      if (colourTo) tl!.to(liquid, { attr: { fill: colourTo }, duration: dur * 0.75 }, '<0.2');
      tl!.to(stream, { opacity: 0, duration: 0.2 })
        .to(p, { x: 380, y: 160, r: 0, duration: 0.5, ease: 'power2.in', onUpdate: () => pitcherAt(p) })
        .to(pitcher, { opacity: 0, duration: 0.2 }, '<0.3');
    };

    tl = gsap.timeline();

    // 1. what goes in first: ice, then a base
    if (iced) {
      tl.to(ice, { opacity: 1, duration: 0.1 })
        .fromTo(ice, { y: -120 }, { y: 70, duration: 0.5, ease: 'bounce.out' })
        .to(ice, { opacity: 0, duration: 0.2 });
    }
    if (P.base) {
      const c = P.base === 'condensed' ? LIQUID.condensed : '#3a2a1c';
      tl.call(() => { liquid.setAttribute('fill', c); liquid.setAttribute('opacity', '1'); })
        .to(lv, { level: baseLevel, duration: 0.6, ease: 'sine.out', onUpdate: setLevel });
    }

    // 2. the coffee
    if (P.shots) {
      tl.call(() => sound.grind())
        .to({}, { duration: 0.9 })
        .call(() => sound.pour())
        .call(() => { liquid.setAttribute('opacity', '1'); })
        .to(streams, { opacity: 1, duration: 0.15 })
        .fromTo(streams.querySelectorAll('line'), { scaleY: 0 }, { scaleY: 1, duration: 0.25, ease: 'power1.in' }, '<')
        .to(lv, { level: shotLevel, duration: 0.9 + P.shots * 0.35, ease: 'sine.inOut', onUpdate: setLevel })
        .to(liquid, { attr: { fill: P.base ? finalColour : LIQUID.espresso }, duration: 0.8 }, '<0.3')
        .to(streams, { opacity: 0, duration: 0.2 });
    }
    if (P.brewed) jug('brew', finalLevel, finalColour, 2);

    // 3. what goes on top
    if (P.top === 'milk') {
      if (!iced) tl.call(() => sound.steam()).to({}, { duration: 0.8 });
      jug('milk', finalLevel, finalColour);
      if (!iced) tl.to(foam, { opacity: 1, duration: 0.4 }, '-=0.6');
    } else if (P.top === 'water') {
      jug('water', finalLevel, finalColour);
    } else if (iced && P.shots && !P.base) {
      // iced and nothing on top: a splash of water over the ice
      jug('water', finalLevel, finalColour, 1);
    }
    if (!iced) tl.call(() => steam.classList.add('on'));
  }

  buttons.forEach((b) => b.addEventListener('click', () => {
    const d = drinks.find((x) => x.id === b.dataset.drink);
    if (d) pour(d);
  }));

  setTemp('hot');
}
