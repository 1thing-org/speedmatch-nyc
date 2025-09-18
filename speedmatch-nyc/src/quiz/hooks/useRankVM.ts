import { useEffect, useMemo, useState, useCallback } from "react";
import { useSensor, useSensors, MouseSensor, TouchSensor, type DndContextProps } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { PRIORITIES, type PriorityId } from "../content/priorities";
import { fixedQuestions } from "../content/questions";
import { useQuizState } from "../state/QuizContext";

export function useRankVM(passed?: PriorityId[]) {
  const { answers } = useQuizState();

  const filtered = useMemo(() => {
    const special = new Set<PriorityId>(["antisemitism","equity","efficiency"] as any);
    const q8 = (fixedQuestions as ReadonlyArray<any>).find((q: any) => q.id === "Q8");
    const chosenOptId = (answers as any)["Q8"];
    const chosenSpecial = q8 && chosenOptId
      ? (q8.options as ReadonlyArray<any>).find((o: any) => o.id === chosenOptId)?.priorityId as PriorityId | undefined
      : undefined;
    return PRIORITIES.filter(p => !special.has(p.id as PriorityId) || p.id === chosenSpecial);
  }, [answers]);

  const initialOrder = useMemo<PriorityId[]>(() => {
    const defaults = filtered.map(p => p.id as PriorityId);
    return Array.isArray(passed) && passed.length === 5 ? passed : defaults.slice(0, 5);
  }, [filtered, passed]);

  const [order, setOrder] = useState<PriorityId[]>(initialOrder);
  const [activeId, setActiveId] = useState<PriorityId | null>(null);

  useEffect(() => {
    setOrder(prev =>
      prev.length !== initialOrder.length || prev.some((v, i) => v !== initialOrder[i])
        ? initialOrder : prev
    );
  }, [initialOrder]);

  // Stable sensors/handlers
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } })
  );

  const onDragStart = useCallback((event: any) => {
    setActiveId(event.active.id as PriorityId);
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  }, []);

  const onDragEnd = useCallback((event: any) => {
    const { active, over } = event;
    setActiveId(null);
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
    if (!over || active.id === over.id) return;
    setOrder(prev => arrayMove(prev, prev.indexOf(active.id as PriorityId), prev.indexOf(over.id as PriorityId)));
  }, []);

  const onDragCancel = useCallback(() => {
    setActiveId(null);
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }, []);

  const dnd: Pick<DndContextProps,"sensors"|"onDragStart"|"onDragEnd"|"onDragCancel"> =
    useMemo(() => ({ sensors, onDragStart, onDragEnd, onDragCancel }), [sensors, onDragStart, onDragEnd, onDragCancel]);

  const isReady = order.length === 5;
  const getLabel = (id: PriorityId) => filtered.find(p => p.id === id)?.label || "";

  return { filtered, order, setOrder, activeId, isReady, getLabel, dnd };
}


