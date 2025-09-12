import PageHeader from "../../../components/PageHeader";
import styles from "../../styles/QuizMobile.module.css"
import { Link, useLocation } from "react-router";
import { useMemo, useState } from "react";
import { PRIORITIES, PRIORITY_LABEL_BY_ID } from "../../content/priorities";
import type { PriorityId } from "../../scoring/priorities";

// dnd-kit
import { DndContext, closestCenter, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

function QuizRank() {
    const location = useLocation() as any;
    const passed: PriorityId[] | undefined = location?.state?.selected;

    const initialOrder = useMemo<PriorityId[]>(() => {
        if (Array.isArray(passed) && passed.length === 5) return passed as PriorityId[];
        return PRIORITIES.slice(0, 5).map(p => p.id as PriorityId);
    }, [passed]);

    const [order, setOrder] = useState<PriorityId[]>(initialOrder);
    const [activeId, setActiveId] = useState<PriorityId | null>(null);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } })
    );

    function handleDragStart(event: any) {
        setActiveId(event.active.id as PriorityId);
        // Lock page scroll during drag to avoid accidental scroll on mobile
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
    }

    function handleDragEnd(event: any) {
        const { active, over } = event;
        setActiveId(null);
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        if (!over || active.id === over.id) return;
        setOrder(prev => {
            const oldIndex = prev.indexOf(active.id as PriorityId);
            const newIndex = prev.indexOf(over.id as PriorityId);
            return arrayMove(prev, oldIndex, newIndex);
        });
    }

    function handleDragCancel() {
        setActiveId(null);
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
    }

    const isReady = order.length === 5;

    return (
        <div className={styles.wrapper}>
            <PageHeader title="Rank Your Priorities" />

            <section className={styles.rankContent}>
                <p className={styles.rankHint}>Drag And Drop Your Priorities In Order, From Most Important To Least Important.</p>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                >
                    <SortableContext items={order} strategy={verticalListSortingStrategy}>
                        <ul className={styles.rankList}>
                            {order.map((id, idx) => (
                                <SortableRow key={id} id={id} index={idx} label={PRIORITY_LABEL_BY_ID[id]} />
                            ))}
                        </ul>
                    </SortableContext>

                    <DragOverlay>
                        {activeId ? (
                            <DraggedPreview index={order.indexOf(activeId)} label={PRIORITY_LABEL_BY_ID[activeId]} />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </section>

            <div className={styles.pickActions}>
                <Link
                    to="/quiz/result"
                    className={`${styles.pickNextButton} ${!isReady ? styles.buttonDisabled : ''}`}
                    aria-disabled={!isReady}
                    onClick={(e) => { if (!isReady) e.preventDefault(); }}
                >
                    Submit And See Result
                </Link>
                <Link to="/quiz/pick" className={styles.pickBackButton}>Back</Link>
            </div>
        </div>
    )
}

function SortableRow({ id, index, label }: { id: PriorityId; index: number; label: string }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: isDragging ? 'none' as const : undefined,
    } as React.CSSProperties;

    return (
        <li ref={setNodeRef} style={style} className={styles.rankItem} {...attributes} {...listeners}>
            <div className={styles.rankBadge}>{index + 1}</div>
            <div className={styles.rankCard}>
                <span className={styles.rankHandle} aria-label="Drag handle" role="button" tabIndex={0}>⋮⋮</span>
                <span className={styles.rankLabel}>{label}</span>
            </div>
        </li>
    );
}

function DraggedPreview({ index, label }: { index: number; label: string }) {
    return (
        <li className={styles.rankItem}>
            <div className={styles.rankBadge}>{index + 1}</div>
            <div className={styles.rankCard}>
                <span className={styles.rankHandle} aria-hidden>⋮⋮</span>
                <span className={styles.rankLabel}>{label}</span>
            </div>
        </li>
    );
}

export default QuizRank