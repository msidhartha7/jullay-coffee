/**
 * Cafe sound, made in the browser: no files to license or load.
 * Room tone, the odd cup, the grinder and the steam wand. Off until asked for.
 */
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let on = false;
let clinkTimer: number | undefined;

function noiseBuffer(c: AudioContext, seconds = 2, brown = false) {
  const buf = c.createBuffer(1, c.sampleRate * seconds, c.sampleRate);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < d.length; i++) {
    const w = Math.random() * 2 - 1;
    if (brown) { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w;
  }
  return buf;
}

function start() {
  ctx = new AudioContext();
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // room tone: low murmur
  const room = ctx.createBufferSource();
  room.buffer = noiseBuffer(ctx, 4, true);
  room.loop = true;
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass'; lp.frequency.value = 520;
  const g = ctx.createGain(); g.gain.value = 0.5;
  room.connect(lp).connect(g).connect(master);
  room.start();
}

function clink() {
  if (!ctx || !master || !on) return;
  const t = ctx.currentTime;
  [2350 + Math.random() * 900, 3900 + Math.random() * 700].forEach((f, i) => {
    const o = ctx!.createOscillator();
    const g = ctx!.createGain();
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.05 / (i + 1), t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    o.connect(g).connect(master!);
    o.start(t); o.stop(t + 0.55);
  });
  clinkTimer = window.setTimeout(clink, 3500 + Math.random() * 7000);
}

function burst(kind: 'grind' | 'steam' | 'pour', seconds: number) {
  if (!ctx || !master || !on) return;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, seconds + 0.2);
  const f = ctx.createBiquadFilter();
  const g = ctx.createGain();
  if (kind === 'grind') { f.type = 'bandpass'; f.frequency.value = 1300; f.Q.value = 1.4; }
  if (kind === 'steam') { f.type = 'highpass'; f.frequency.value = 3200; }
  if (kind === 'pour') { f.type = 'lowpass'; f.frequency.value = 700; }
  const peak = kind === 'grind' ? 0.35 : kind === 'steam' ? 0.18 : 0.25;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + 0.08);
  g.gain.setValueAtTime(peak, t + seconds - 0.2);
  g.gain.exponentialRampToValueAtTime(0.0001, t + seconds);
  if (kind === 'grind') {
    // the burr's rattle
    const lfo = ctx.createOscillator(); const lg = ctx.createGain();
    lfo.frequency.value = 38; lg.gain.value = peak * 0.4;
    lfo.connect(lg).connect(g.gain); lfo.start(t); lfo.stop(t + seconds);
  }
  src.connect(f).connect(g).connect(master);
  src.start(t); src.stop(t + seconds + 0.1);
}

export const sound = {
  get on() { return on; },
  toggle() {
    on = !on;
    if (on && !ctx) start();
    if (!ctx || !master) return on;
    if (on) { ctx.resume(); master.gain.setTargetAtTime(0.6, ctx.currentTime, 0.4); clinkTimer = window.setTimeout(clink, 1500); }
    else { master.gain.setTargetAtTime(0, ctx.currentTime, 0.2); window.clearTimeout(clinkTimer); }
    return on;
  },
  grind: () => burst('grind', 1.4),
  steam: () => burst('steam', 1.8),
  pour: () => burst('pour', 1.2),
};

export function initSound() {
  const btn = document.querySelector<HTMLButtonElement>('[data-sound]');
  btn?.addEventListener('click', () => {
    const now = sound.toggle();
    btn.setAttribute('aria-pressed', String(now));
    btn.textContent = now ? 'Sound on' : 'Sound off';
  });
}
