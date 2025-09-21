import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import type { PriorityId } from "../content/priorities";

type VM = ReturnType<typeof import("../hooks/useRankVM").useRankVM>;

type ClassMap = {
  wrap: string;
  hint: string;
  list: string;
  item: string;
  badge: string;
  card: string;
  handle: string;
  label: string;
};

export default function RankPanel({
  vm,
  classes,
  renderActions,
  hintText = "Drag And Drop Your Priorities In Order, From Most Important To Least Important.",
}: {
  vm: VM;
  classes: ClassMap;
 
  renderActions: (isReady: boolean, order: PriorityId[]) => React.ReactNode;
  hintText?: string;
}) {
  const { order, activeId, getLabel, dnd } = vm;

  return (
    <section className={classes.wrap}>
      <p className={classes.hint}>{hintText}</p>

      <DndContext {...dnd} modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <ul className={classes.list}>
            {order.map((id, idx) => (
              <Row key={id} id={id} index={idx} label={getLabel(id)} classes={classes} />
            ))}
          </ul>
        </SortableContext>

        <DragOverlay>
          {activeId ? (
            <Preview index={order.indexOf(activeId)} label={getLabel(activeId)} classes={classes} />
          ) : null}
        </DragOverlay>
      </DndContext>

      {renderActions(vm.isReady, order)}
    </section>
  );
}

function Row({
  id, index, label, classes,
}: { id: PriorityId; index: number; label: string; classes: ClassMap }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: isDragging ? "none" : undefined,
  };

  return (
    <li ref={setNodeRef} style={style} className={classes.item} {...attributes} {...listeners}>
      <div className={classes.badge}>{index + 1}</div>
      <div className={classes.card}>
        <span className={classes.handle} aria-label="Drag handle" role="button" tabIndex={0}>⋮⋮</span>
        <span className={classes.label}>{label}</span>
      </div>
    </li>
  );
}

function Preview({ index, label, classes }: { index: number; label: string; classes: ClassMap }) {
  return (
    <li className={classes.item}>
      <div className={classes.badge}>{index + 1}</div>
      <div className={classes.card}>
        <span className={classes.handle} aria-hidden>⋮⋮</span>
        <span className={classes.label}>{label}</span>
      </div>
    </li>
  );
}
