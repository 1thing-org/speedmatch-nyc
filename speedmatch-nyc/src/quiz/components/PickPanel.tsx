import React from "react";
import type { PriorityId } from "../content/priorities";

type VM = ReturnType<typeof import("../hooks/usePickVM").usePickVM>;

type ClassMap = {
  wrap: string;
  hint: string;
  chipList: string;
  chip: string;
  chipSelected: string;
  chipDisabled: string;
  notice: string;
  chipListExtra?: string;
  chipExtra?: string;
};

export default function PickPanel({
  vm,
  classes,
  renderActions,
  hintText = "Pick The 5 Topics That Matter Most To You.",
  ariaLabel = "Pick your priorities",
}: {
  vm: VM;
  classes: ClassMap;

  renderActions: (isReady: boolean, selected: PriorityId[]) => React.ReactNode;
  hintText?: string;
  ariaLabel?: string;
}) {
  const { filteredPriorities, selected, toggle, isReady, showNotice, noticeText } = vm;

  return (
    <section className={classes.wrap} aria-label={ariaLabel}>
      <p className={classes.hint}>{hintText}</p>

      <div className={`${classes.chipList} ${classes.chipListExtra ?? ""}`}>
        {filteredPriorities.map(p => {
          const active = selected.includes(p.id as PriorityId);
          const reachedCap = !active && selected.length >= 5;
          return (
            <button
              key={p.id}
              type="button"
              className={[
                classes.chip,
                active ? classes.chipSelected : "",
                reachedCap ? classes.chipDisabled : "",
                classes.chipExtra ?? "",
              ].join(" ").trim()}
              onClick={() => toggle(p.id as PriorityId)}
              aria-pressed={active}
              disabled={reachedCap}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {showNotice ? <div className={classes.notice}>{noticeText || "Choose 5 priorities to proceed."}</div> : null}

      {renderActions(isReady, selected)}
    </section>
  );
}
