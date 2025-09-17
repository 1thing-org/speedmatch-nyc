import { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { fixedQuestions } from "../../content/questions";
import styles from "../../styles/QuizMobileQuestions.module.css";
import { useQuizActions, useQuizState } from "../../state/QuizContext";
import { candidates } from '../../../data/candidates';

function shuffleArray<T>(input: readonly T[]): T[] {
  const arr = input.slice() as T[];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function QuizQuestions() {
  const questions = fixedQuestions;
  const total = questions.length;
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const { answers: persisted } = useQuizState();
  const { setAnswer, setLastQ8OptionId } = useQuizActions();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    setAnswers(persisted as Record<string, string>);
  }, [persisted]);

  // For each question, compute a shuffled array of option indices once
  const orders = useMemo(() => {
    return questions.map(q => shuffleArray(q.options.map((_, i) => i)));
  }, [questions]);

  const setRef = (idx: number) => (el: HTMLDivElement | null) => {
    if (!el) return;
    sectionRefs.current[idx] = el;
  };

  function onSelect(qid: string, oid: string) {
    setAnswers(prev => ({ ...prev, [qid]: oid }));
    setAnswer(qid as any, oid as any);
    if (qid === 'Q8') setLastQ8OptionId(oid as any);
  }

  function scrollToIdx(idx: number) {
    const el = sectionRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const allAnswered = Object.keys(answers).length === total;

  return (
    <div className={styles.page}>
      {questions.map((q, idx) => {
        const current = idx + 1;
        const selected = answers[q.id];
        const isLast = idx === total - 1;
        const order = orders[idx];

        const declared = new Set<number>();
        q.options.forEach(o => declared.add((o as any).candidateId));
        const undeclared = Math.max(0, candidates.length - declared.size);

        const actionsClass = `${styles.actions} ${isLast ? styles.actionsStack : ''} ${idx === 0 ? styles.actionsSingle : ''}`;

        return (
          <div key={q.id} ref={setRef(idx)} id={`q-${current}`} className={styles.qSection}>
            <div className={styles.qMeta}>Question {current}/{total}</div>
            <h2 className={styles.qTitle}>{q.prompt}</h2>
            
            <div className={styles.qSub}>
              ({undeclared} candidates have not declared a stance on this issue.)
            </div>

            <ul className={styles.options}>
              {order.map((optIndex, displayIndex) => {
                const opt = q.options[optIndex] as any;
                const isSelected = selected === opt.id;
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(q.id, opt.id)}
                      className={`${styles.option} ${isSelected ? styles.optionSelected : ""}`}
                    >
                      <span className={styles.optIndex}>{displayIndex + 1}.</span>
                      <span className={styles.optLabel}>{opt.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className={actionsClass}>
              {isLast ? (
                <>
                  {showNotice && (
                    <div className={styles.notice}>You must finish all questions to proceed</div>
                  )}
                  <Link
                    to="/quiz/pick"
                    className={styles.btnPrimary}
                    onClick={(e) => {
                      if (!allAnswered) {
                        e.preventDefault();
                        setShowNotice(true);
                        setTimeout(() => setShowNotice(false), 3000);
                      }
                    }}
                    state={{ fromSpecialPriorityOption: answers['Q8'] }}
                  >
                    Next: Pick Your Priorities
                  </Link>
                  {idx > 0 ? (
                    <button className={styles.btnSecondary} onClick={() => scrollToIdx(idx - 1)}>Back</button>
                  ) : null}
                </>
              ) : (
                <>
                  {idx > 0 ? (
                    <button className={styles.btnSecondary} onClick={() => scrollToIdx(idx - 1)}>Back</button>
                  ) : null}
                  <button className={styles.btnPrimary} onClick={() => scrollToIdx(idx + 1)}>Next</button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default QuizQuestions