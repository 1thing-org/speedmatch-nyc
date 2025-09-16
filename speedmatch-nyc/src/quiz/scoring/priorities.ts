import { PRIORITIES, type PriorityId } from '../content/priorities';
import { FixedQuestions } from '../content/questions';
import type { CandidateId } from './candidates';

export type { PriorityId } from '../content/priorities';

export type PrioritiesToCandidates = Record<PriorityId, CandidateId[]>;

export function buildPrioritiesMap(): PrioritiesToCandidates {
  const base = Object.fromEntries(
    PRIORITIES.map(p => [p.id, [] as CandidateId[]])
  ) as PrioritiesToCandidates;

  for (const q of FixedQuestions) {
    // For regular questions, use the question-level priorityId
    if ((q as any).kind !== 'special') {
      const pid = (q as any).priorityId as PriorityId;
      if (!pid) continue;
      const bag = new Set(base[pid]);
      // Cast to readonly then iterate, keeping TS happy about immutability
      for (const opt of (q.options as readonly any[])) {
        bag.add(opt.candidateId as CandidateId);
      }
      base[pid] = Array.from(bag);
      continue;
    }

    // For Q8 (special), options carry their own priorityId
    for (const opt of (q.options as readonly any[])) {
      const pid = (opt as any).priorityId as PriorityId | undefined;
      if (!pid) continue;
      const bag = new Set(base[pid]);
      bag.add((opt as any).candidateId as CandidateId);
      base[pid] = Array.from(bag);
    }
  }
  return base;
}

export const PrioritiesMap = buildPrioritiesMap();

export type RankWeights = Record<1 | 2 | 3 | 4 | 5, number>;

export const DefaultRankWeights: RankWeights = { 1: 2, 2: 1.6, 3: 1.3, 4: 1.15, 5: 1.05 };
