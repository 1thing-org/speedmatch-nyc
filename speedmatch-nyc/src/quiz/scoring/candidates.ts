import type { Candidate } from '../../types/candidate';

export type CandidateId = Candidate['id'];
export type CandidateScoreMap = Record<CandidateId, number>;

export function createEmptyScores(candidateIds: CandidateId[]): CandidateScoreMap {
  const scores = {} as CandidateScoreMap;
  for (const id of candidateIds) scores[id] = 0;
  return scores;
}

export function addPoints(
  scores: CandidateScoreMap,
  candidateIds: readonly CandidateId[],
  points: number = 1,
) {
  for (const id of candidateIds) {
    scores[id] = (scores[id] ?? 0) + points;
  }
}
