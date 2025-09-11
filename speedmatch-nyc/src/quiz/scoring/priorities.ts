import type { CandidateId } from './candidates';
import type { PriorityId } from '../content/priorities';
export type { PriorityId } from '../content/priorities';

export type PrioritiesToCandidates = Record<PriorityId, CandidateId[]>;

export const PrioritiesMap: PrioritiesToCandidates = {
  economy: [1, 3] as CandidateId[],
  accountability: [],
  safety: [2] as CandidateId[],
  housing: [],
  transport: [],
  education: [],
  childcare: [],
  sustainability: [],
  rights: [],
  prek: [],
};

export type RankWeights = Record<1 | 2 | 3 | 4 | 5, number>;

export const DefaultRankWeights: RankWeights = { 1: 5, 2: 4, 3: 3, 4: 2, 5: 1 };
