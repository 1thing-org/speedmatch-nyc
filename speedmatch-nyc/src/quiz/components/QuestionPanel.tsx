import type { VM } from "../hooks/useQuestionVM";
import m from "../styles/QuizQuestions.module.css";


type Props = {
  vm: VM;
  onBack?: () => void;
  onNext?: () => void;
  undeclaredCount?: number;
  noticeText?: string | null;
  primaryLabel?: string;
  primaryWide?: boolean;
};

export default function QuestionPanel({
  vm,

  onBack,
  onNext,
  undeclaredCount,
  noticeText,
  primaryLabel,
  primaryWide,
}: Props) {
  const { q, order, selectedId, onSelect, idx, total, isFirst, isLast } = vm;

  const nextLabel = primaryLabel ?? (isLast ? "Next: Pick Your Priorities" : "Next");
  const priClass = `${m.btnPrimary} ${primaryWide ? m.btnWide : ""}`.trim();

   return (
    <div className={m.qSection} id={`q-${idx + 1}`}>
      <div className={m.qMeta}>Question {idx + 1}/{total}</div>

      <h2 className={m.qTitle}>{q.prompt}</h2>

      {typeof undeclaredCount === "number" && (
        <div className={m.qSub}>
          ({undeclaredCount} candidates have not declared a stance on this issue.)
        </div>
      )}

      <ul className={m.options} role="radiogroup" aria-label={q.prompt}>
        {order.map((optIndex, displayIndex) => {
          const opt = q.options[optIndex];
          const selected = selectedId === opt.id;
          return (
            <li key={opt.id}>
              <button
                role="radio"
                aria-checked={selected}
                type="button"
                onClick={() => onSelect(opt.id)}
                className={`${m.option} ${selected ? m.optionSelected : ""}`}
              >
                <span className={m.optIndex}>{displayIndex + 1}.</span>
                <span className={m.optLabel}>{opt.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {noticeText ? <div className={m.notice}>{noticeText}</div> : null}

      <div className={m.actions}>
        {!isFirst && (
          <button className={m.btnSecondary} onClick={onBack}>Back</button>
        )}
        <button className={priClass} onClick={onNext}>{nextLabel}</button>
      </div>
    </div>
  );
}
