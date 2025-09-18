// useQuestionVM.ts
import { useMemo } from "react";
import { useQuizActions, useQuizState } from "../state/QuizContext";
import type { FixedQuestion as Question, OptionId, QuestionId } from "../content/questions";


export type VM = {
  q: Question;
  idx: number;
  total: number;
  order: number[];
  selectedId: OptionId | undefined;
  onSelect: (optId: OptionId) => void;
  isFirst: boolean;
  isLast: boolean;
  canNext: boolean;
};

export function useQuestionVM(q: Question, idx: number, total: number, order: number[]): VM {
  const { answers } = useQuizState();
  const { setAnswer, setLastQ8OptionId } = useQuizActions();

  const selectedId = (answers as Record<QuestionId, OptionId | undefined>)[q.id];

  const onSelect = (optId: OptionId) => {
    setAnswer(q.id as QuestionId, optId); 
    if (q.id === "Q8") setLastQ8OptionId(optId); 
  };

  return useMemo(() => ({
    q, idx, total, order,
    selectedId,
    onSelect,
    isFirst: idx === 0,
    isLast: idx === total - 1,
    canNext: Boolean(selectedId),
  }), [q, idx, total, order, selectedId]);
}
