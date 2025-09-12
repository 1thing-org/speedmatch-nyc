import { useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { FixedQuestions } from "../../content/questions";
import styles from "../../styles/QuizMobileQuestions.module.css";

function QuizQuestions() {
  const questions = FixedQuestions;
  const total = questions.length;
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const setRef = (idx: number) => (el: HTMLDivElement | null) => {
    if (!el) return;
    sectionRefs.current[idx] = el;
  };

  function onSelect(qid: string, oid: string) {
    setAnswers(prev => ({ ...prev, [qid]: oid }));
  }

  function scrollToIdx(idx: number) {
    const el = sectionRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className={styles.page}>
      {questions.map((q, idx) => {
        const current = idx + 1;
        const selected = answers[q.id];
        const isLast = idx === total - 1;
        return (
          <div key={q.id} ref={setRef(idx)} id={`q-${current}`} className={styles.qSection}>
            <div className={styles.qMeta}>Question {current}/{total}</div>
            <h2 className={styles.qTitle}>{q.prompt}</h2>
    
            <div className={styles.qSub}>(2 candidates have not declared a stance on this issue.)</div>

            <ul className={styles.options}>
              {q.options.map((opt, oidx) => {
                const isSelected = selected === opt.id;
                return (
                  <li key={opt.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(q.id, opt.id)}
                      className={`${styles.option} ${isSelected ? styles.optionSelected : ""}`}
                    >
                      <span className={styles.optIndex}>{oidx + 1}.</span>
                      <span className={styles.optLabel}>{opt.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className={`${styles.actions} ${isLast ? styles.actionsStack : ""}`}>
              {isLast ? (
                <>
                  <Link to="/quiz/pick" className={styles.btnPrimary}>Next: Pick Your Priorities</Link>
                  {idx > 0 ? (
                    <button className={styles.btnSecondary} onClick={() => scrollToIdx(idx - 1)}>Back</button>
                  ) : null}
                </>
              ) : (
                <>
                  {idx > 0 ? (
                    <button className={styles.btnSecondary} onClick={() => scrollToIdx(idx - 1)}>Back</button>
                  ) : (
                    <span />
                  )}
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