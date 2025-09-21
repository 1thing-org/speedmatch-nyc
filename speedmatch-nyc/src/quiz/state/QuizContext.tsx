import { createContext, useContext, useMemo, useState } from 'react';
import type { OptionId, QuestionId } from '../content/questions';
import type { PriorityId } from '../content/priorities';

export type Answers = Record<QuestionId, OptionId>;
export type OptionOrders = Partial<Record<QuestionId, number[]>>;

type QuizState = {
  answers: Answers;
  selectedPriorities: PriorityId[];
  lastQ8OptionId?: OptionId;
  q8UsedForPriorities?: OptionId;
  optionOrders: OptionOrders;
};

type QuizActions = {
  setAnswer: (q: QuestionId, option: OptionId) => void;
  setSelectedPriorities: (p: PriorityId[]) => void;
  setLastQ8OptionId: (opt?: OptionId) => void;
  setQ8UsedForPriorities: (opt?: OptionId) => void;
  setOptionOrder: (q: QuestionId, order: number[]) => void;
  reset: () => void;
};

const StateCtx = createContext<QuizState | undefined>(undefined);
const ActionsCtx = createContext<QuizActions | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Answers>({} as Answers);
  const [selectedPriorities, setSelectedPriorities] = useState<PriorityId[]>([]);
  const [lastQ8OptionId, setLastQ8OptionId] = useState<OptionId | undefined>(undefined);
  const [q8UsedForPriorities, setQ8UsedForPriorities] = useState<OptionId | undefined>(undefined);
  const [optionOrders, setOptionOrders] = useState<OptionOrders>({});

  const actions = useMemo<QuizActions>(() => ({
    setAnswer(q, option) {
      setAnswers(prev => ({ ...prev, [q]: option }));
    },
    setSelectedPriorities(p) {
      setSelectedPriorities(p);
    },
    setLastQ8OptionId(opt) {
      setLastQ8OptionId(opt);
    },
    setQ8UsedForPriorities(opt) {
      setQ8UsedForPriorities(opt);
    },
    setOptionOrder(q, order) {
      setOptionOrders(prev => ({ ...prev, [q]: order }));
    },
    reset() {
      setAnswers({} as Answers);
      setSelectedPriorities([]);
      setLastQ8OptionId(undefined);
      setQ8UsedForPriorities(undefined);
      setOptionOrders({});
    },
  }), []);

  return (
    <StateCtx.Provider value={{ answers, selectedPriorities, lastQ8OptionId, q8UsedForPriorities, optionOrders }}>
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
