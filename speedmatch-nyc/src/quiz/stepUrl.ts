export type Step = 'start' | 'questions' | 'pick' | 'rank' | 'result';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function readStepFromUrl(totalQuestions = 1, loc: Location = window.location): { step: Step; idx?: number } {
  const p = new URLSearchParams(loc.search);
  const raw = p.get('step');
  const step: Step = (raw === 'start' || raw === 'questions' || raw === 'pick' || raw === 'rank' || raw === 'result') ? raw : 'start';
  if (step === 'questions') {
    const rawIdx = parseInt(p.get('idx') || '1', 10);
    const idx = clamp(isFinite(rawIdx) ? rawIdx : 1, 1, Math.max(1, totalQuestions));
    return { step, idx };
  }
  return { step };
}

export function writeStepToUrl(step: Step, idx?: number, replace = true) {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.set('step', step);
  if (step === 'questions') {
    const n = clamp(typeof idx === 'number' ? idx : 1, 1, 9999);
    url.searchParams.set('idx', String(n));
  } else {
    url.searchParams.delete('idx');
  }
  const fn = replace ? 'replaceState' : 'pushState';
  window.history?.[fn]?.call(window.history, null, '', url.toString());
} 