import type { CandidateId, CandidateScoreMap } from './candidates';
import { createEmptyScores, addPoints } from './candidates';
import type { FixedQuestion, QuestionId, OptionId } from './questions';
import type { PrioritiesToCandidates, RankWeights } from './priorities';
import { candidateIds } from '../../data/candidates';
import { PRIORITIES, type PriorityId } from '../content/priorities';
import { FixedQuestions } from '../content/questions';

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
    const option = q.options.find(o => o.id === chosenOptionId) as any;
    if (!option) continue;
    const cid = option.candidateId as CandidateId | undefined;
    if (cid !== undefined) addPoints(scores, [cid] as const, 1);
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

function getSpecialPriorityFromAnswers(answers: AnswersMap): PriorityId | undefined {
  const special = FixedQuestions.find((q: any) => q.kind === 'special');
  if (!special) return undefined;
  const optId = answers[special.id as QuestionId];
  if (!optId) return undefined;
  const opt = (special.options as readonly any[]).find(o => o.id === optId);
  return (opt?.priorityId as PriorityId) || undefined;
}

export function addWeightedPriorityScoresWithBaseline(
  scores: CandidateScoreMap,
  prioritiesMap: PrioritiesToCandidates,
  rankedFive: PriorityId[],
  answers: AnswersMap,
  weights: RankWeights,
) {
  // 1) Apply ranked weights for the 5 selected priorities
  const topFive = rankedFive.slice(0, 5);
  topFive.forEach((pid, idx) => {
    const position = (idx + 1) as 1 | 2 | 3 | 4 | 5;
    const weight = weights[position] ?? 0;
    const cands = prioritiesMap[pid] || [];
    if (cands.length > 0 && weight > 0) addPoints(scores, cands, weight);
  });

  // 2) Baseline +1 for unselected priorities, with Q8 rule
  const selectedSet = new Set(topFive);
  const allPriorityIds = PRIORITIES.map(p => p.id as PriorityId);
  const specialIds = new Set<PriorityId>(['antisemitism','equity','efficiency'] as unknown as PriorityId[]);
  const chosenSpecial = getSpecialPriorityFromAnswers(answers);

  for (const pid of allPriorityIds) {
    if (selectedSet.has(pid)) continue;

    // Exclude special priorities except the one chosen in Q8
    if (specialIds.has(pid)) {
      if (!chosenSpecial || pid !== chosenSpecial) continue;
    }

    const cands = prioritiesMap[pid] || [];
    if (cands.length > 0) addPoints(scores, cands, 1);
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
