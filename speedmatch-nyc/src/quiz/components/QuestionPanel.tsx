import type { VM } from "../hooks/useQuestionVM";
import m from "../styles/QuizMobileQuestions.module.css";
import d from "../styles/QuizDesktopQuestions.module.css";


type Props = {
  vm: VM;
  variant?: "mobile" | "desktop";
  onBack?: () => void;
  onNext?: () => void;
  undeclaredCount?: number;
  noticeText?: string | null;
  primaryLabel?: string;
  primaryWide?: boolean;
};

export default function QuestionPanel({
  vm,
  variant = "mobile",
  onBack,
  onNext,
  undeclaredCount,
  noticeText,
  primaryLabel,
  primaryWide,
}: Props) {
  const { q, order, selectedId, onSelect, idx, total, isFirst, isLast } = vm;

  
  const C = variant === "mobile"
    ? {
        section: m.qSection,
        meta: m.qMeta,
        title: m.qTitle,
        sub: m.qSub,
        options: m.options,
        option: m.option,
        optionSelected: m.optionSelected,
        optIndex: m.optIndex,
        optLabel: m.optLabel,
        actions: `${m.actions} ${isLast ? m.actionsStack : ""} ${isFirst ? m.actionsSingle : ""}`,
        btnPri: m.btnPrimary,
        btnSec: m.btnSecondary,
        notice: m.notice,
        btnWide: "",
      }
    : {
       
        section: `${m.qSection} ${d.qSection}`,
        meta: undefined, 
        title: m.qTitle,
        sub: m.qSub,
        options: m.options,
        option: m.option,
        optionSelected: m.optionSelected,
        optIndex: m.optIndex,
        optLabel: m.optLabel,
        actions: `${d.actions}`,
        btnPri: `${m.btnPrimary} ${d.btnPrimary}`,
        btnSec: `${m.btnSecondary} ${d.btnSecondary}`,
        notice: `${m.notice} ${d.notice ?? ""}`,
        btnWide: d.btnWide,
      };

  const nextLabel = primaryLabel ?? (isLast ? "Next: Pick Your Priorities" : "Next");
  const priClass = `${C.btnPri} ${primaryWide ? C.btnWide : ""}`.trim();

  return (
    <div className={C.section} id={`q-${idx + 1}`}>
      {variant === "mobile" && (
        <div className={C.meta}>Question {idx + 1}/{total}</div>
      )}

      <h2 className={C.title}>{q.prompt}</h2>

      {typeof undeclaredCount === "number" && (
        <div className={C.sub}>
          ({undeclaredCount} candidates have not declared a stance on this issue.)
        </div>
      )}

      <ul className={C.options} role="radiogroup" aria-label={q.prompt}>
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
                className={`${C.option} ${selected ? C.optionSelected : ""}`}
              >
                <span className={C.optIndex}>{displayIndex + 1}.</span>
                <span className={C.optLabel}>{opt.label}</span>
              </button>
            </li>
          );
        })}
      </ul>


      {noticeText ? <div className={C.notice}>{noticeText}</div> : null}

      <div className={C.actions}>
        {variant === "mobile" && isLast ? (
          <>
            <button className={priClass} onClick={onNext}>{nextLabel}</button>
            {!isFirst && (
              <button className={C.btnSec} onClick={onBack}>Back</button>
            )}
          </>
        ) : (
          <>
            {!isFirst && (
              <button className={C.btnSec} onClick={onBack}>Back</button>
            )}
            <button className={priClass} onClick={onNext}>{nextLabel}</button>
          </>
        )}
      </div>
    </div>
  );
}
