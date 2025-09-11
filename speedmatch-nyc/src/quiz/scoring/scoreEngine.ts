import type { CandidateId, CandidateScoreMap } from './candidates';
import { createEmptyScores, addPoints } from './candidates';
import type { FixedQuestion, QuestionId, OptionId } from './questions';
import type { PrioritiesToCandidates, RankWeights } from './priorities';
import { candidateIds } from '../../data/candidates';

export type AnswersMap = Record<QuestionId, OptionId>;

export function addPointsFromAnswers(
  questions: FixedQuestion[],
  answers: AnswersMap,
  allCandidateIds: CandidateId[] = candidateIds as unknown as CandidateId[],
): CandidateScoreMap {
  const scores = createEmptyScores(allCandidateIds);
  for (const q of questions) {
    const chosenOptionId = answers[q.id];
    if (!chosenOptionId) continue;
    const option = q.options.find(o => o.id === chosenOptionId);
    if (!option) continue;
    addPoints(scores, option.candidateIds, 1);
  }
  return scores;
}

export function addPointsFromPriorityPicks(
  scores: CandidateScoreMap,
  picks: PrioritiesToCandidates,
) {
  for (const key of Object.keys(picks) as Array<keyof PrioritiesToCandidates>) {
    const cands = picks[key] || [];
    addPoints(scores, cands, 1);
  }
}

export type RankEntry = {
  priority: string;
  position: 1 | 2 | 3 | 4 | 5;
  candidates: CandidateId[];
};

export function addPointsFromPriorityRanks(
  scores: CandidateScoreMap,
  ranks: RankEntry[],
  weights: RankWeights,
) {
  for (const r of ranks) {
    const weight = weights[r.position] ?? 0;
    addPoints(scores, r.candidates, weight);
  }
}

export function mergeScores(a: CandidateScoreMap, b: CandidateScoreMap): CandidateScoreMap {
  const out: CandidateScoreMap = { ...a } as CandidateScoreMap;
  for (const [id, value] of Object.entries(b)) {
    const cid = Number(id) as CandidateId;
    const pts = value as number;
    out[cid] = (out[cid] ?? 0) + pts;
  }
  return out;
}

export function rankScores(scores: CandidateScoreMap): Array<{ id: CandidateId; score: number }> {
  return Object.entries(scores)
    .map(([id, score]) => ({ id: Number(id) as CandidateId, score: score as number }))
    .sort((a, b) => b.score - a.score);
}
