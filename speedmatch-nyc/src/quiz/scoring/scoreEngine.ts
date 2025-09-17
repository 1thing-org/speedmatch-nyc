import { candidateIds } from '../../data/candidates';
import { type PriorityId } from '../content/priorities';
import { type QuestionId, type OptionId, fixedQuestions  } from '../content/questions';
 
export type AnswersMap = Record<QuestionId, OptionId>;
export type CandidateScoreMap = Record<number, number>;
export type RankWeights = Record<1 | 2 | 3 | 4 | 5, number>;

export const DefaultRankWeights: RankWeights = { 1: 2, 2: 1.6, 3: 1.3, 4: 1.15, 5: 1.05 };

export function addPoints(
  scores: CandidateScoreMap,
  candidateId: number,
  points: number = 1,
) {
  scores[candidateId]  = (scores[candidateId] ?? 0) + points;
}

export function addPointsFromAnswers(
  answers: AnswersMap
): CandidateScoreMap {
  const scores = {} as CandidateScoreMap;
  for (const id of candidateIds) {
    scores[id] = 0;
  }
  for (const q of fixedQuestions) {
    const option = q.options.find(o => o.id === answers[q.id]);
    if (option) {
      addPoints(scores, option.candidateId, 1);
    }
  }
  return scores;
}

// key: priorityId, value: candidateId,  size is 8. 
function buildPriorityToChosenCandidate(
  answers: AnswersMap,
): Partial<Record<PriorityId, number>> {
  const map: Partial<Record<PriorityId, number>> = {};
  for (const q of fixedQuestions) {
    const chosen = answers[q.id as QuestionId];

    // Special Question 
    if ((q as any).kind === 'special') {
      const opt = (q.options as readonly any[]).find(o => (o as any).id === chosen) as any;
      const pid = opt?.priorityId as PriorityId | undefined;
      const cid = opt?.candidateId as number | undefined;
      if (pid !== undefined && cid !== undefined) map[pid] = cid;
      continue;
    }

    // Normal Question 
    const pid = (q as any).priorityId as PriorityId | undefined;
    const opt = (q.options as readonly any[]).find(o => (o as any).id === chosen) as any;
    const cid = opt?.candidateId as number | undefined;
    if (pid !== undefined && cid !== undefined) map[pid] = cid;
  }
  return map;
}

export function addPriorityScoresFromAnswersByRank(
  scores: CandidateScoreMap,
  answers: AnswersMap,
  rankedFive: PriorityId[],
  weights: RankWeights,
) {
  const chosenByPriority = buildPriorityToChosenCandidate(answers);
  const topFive = rankedFive.slice(0, 5);

  // Top 5 add more points based on ranking
  topFive.forEach((pid, idx) => {
    const position = (idx + 1) as 1 | 2 | 3 | 4 | 5;
    const weight = weights[position] ?? 0;
    const cid = chosenByPriority[pid];
    if (cid !== undefined && weight > 0) addPoints(scores, cid, weight);
  });

  // Others add 1 point
  for (const [pid, cid] of Object.entries(chosenByPriority) as Array<[PriorityId, number]>) {
    if (topFive.includes(pid)) continue;
    addPoints(scores, cid, 1);
  }
}

export function rankScores(scores: CandidateScoreMap): Array<{ id: number; score: number }> {
  return Object.entries(scores)
    .map(([id, score]) => ({ id: Number(id) as number, score: score as number }))
    .sort((a, b) => b.score - a.score);
}

