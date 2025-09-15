import { createContext, useContext, useMemo, useState } from 'react';
import type { QuestionId, OptionId } from '../scoring/questions';
import type { PriorityId } from '../scoring/priorities';

export type Answers = Record<QuestionId, OptionId>;

type QuizState = {
  answers: Answers;
  selectedPriorities: PriorityId[];
};

type QuizActions = {
  setAnswer: (q: QuestionId, option: OptionId) => void;
  setSelectedPriorities: (p: PriorityId[]) => void;
  reset: () => void;
};

const StateCtx = createContext<QuizState | undefined>(undefined);
const ActionsCtx = createContext<QuizActions | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Answers>({} as Answers);
  const [selectedPriorities, setSelectedPriorities] = useState<PriorityId[]>([]);

  const actions = useMemo<QuizActions>(() => ({
    setAnswer(q, option) {
      setAnswers(prev => ({ ...prev, [q]: option }));
    },
    setSelectedPriorities(p) {
      setSelectedPriorities(p);
    },
    reset() {
      setAnswers({} as Answers);
      setSelectedPriorities([]);
    },
  }), []);

  return (
    <StateCtx.Provider value={{ answers, selectedPriorities }}>
      <ActionsCtx.Provider value={actions}>{children}</ActionsCtx.Provider>
    </StateCtx.Provider>
  );
}

export function useQuizState() {
  const ctx = useContext(StateCtx);
  if (!ctx) throw new Error('useQuizState must be used within QuizProvider');
  return ctx;
}

export function useQuizActions() {
  const ctx = useContext(ActionsCtx);
  if (!ctx) throw new Error('useQuizActions must be used within QuizProvider');
  return ctx;
}
