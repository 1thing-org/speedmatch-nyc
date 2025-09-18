import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { fixedQuestions } from "../../content/questions";
import styles from "../../styles/QuizMobileQuestions.module.css";
import { useQuizActions, useQuizState } from "../../state/QuizContext";
import { candidates } from '../../../data/candidates';
import QuestionPanel from "../../components/QuestionPanel";
import { useQuestionVM } from "../../hooks/useQuestionVM";

function shuffleArray<T>(input: readonly T[]): T[] {
  const arr = input.slice() as T[];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function QuizQuestions() {
  const questions = fixedQuestions as readonly any[];
  const total = questions.length;
  const navigate = useNavigate();

  const { optionOrders, answers } = useQuizState();
  const { setOptionOrder } = useQuizActions();

  // Stable order per question stored in context
  const orders = useMemo(() => {
    return questions.map(q => {
      const existing = (optionOrders as any)[q.id] as number[] | undefined;
      if (existing && existing.length === (q.options as any[]).length) return existing;
      const order = shuffleArray((q.options as readonly any[]).map((_: any, i: number) => i));
      setOptionOrder(q.id as any, order);
      return order;
    });
  }, [questions, optionOrders, setOptionOrder]);

  function scrollToIdx(idx: number) {
    const el = document.getElementById(`q-${idx + 1}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const allAnswered = Object.keys(answers as Record<string, unknown>).length === total;
  const [showNotice, setShowNotice] = useState(false);

  return (
    <div className={styles.page}>
      {questions.map((q: any, idx: number) => {
        const order = orders[idx];
        const vm = useQuestionVM(q, idx, total, order);

        const declared = new Set<number>();
        (q.options as any[]).forEach(o => declared.add((o as any).candidateId));
        const undeclared = Math.max(0, candidates.length - declared.size);

        const onBack = () => {
          if (!vm.isFirst) scrollToIdx(idx - 1);
        };
        const onNext = () => {
          if (vm.isLast) {
            if (!allAnswered) {
              setShowNotice(true);
              setTimeout(() => setShowNotice(false), 3000);
              return;
            }
            navigate('/quiz/pick', { state: { fromSpecialPriorityOption: (answers as any)['Q8'] } });
            return;
          }
          scrollToIdx(idx + 1);
        };

        const noticeText = vm.isLast && showNotice && !allAnswered ? 'You must finish all questions to proceed' : null;

        return (
          <QuestionPanel
            key={q.id}
            vm={vm}
            variant="mobile"
            onBack={onBack}
            onNext={onNext}
            undeclaredCount={undeclared}
            noticeText={noticeText}
          />
        );
      })}
    </div>
  );
}

export default QuizQuestions