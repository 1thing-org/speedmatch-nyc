import PageHeader from "../../../components/PageHeader";
import styles from "../../styles/QuizMobile.module.css"
import { Link, useLocation } from "react-router";
import { PRIORITIES } from "../../content/priorities";
import type { PriorityId } from "../../scoring/priorities";
import { useState, useEffect } from "react";
import { useQuizActions, useQuizState } from "../../state/QuizContext";

function QuizPick() {
    const location = useLocation() as any;
    const { selectedPriorities } = useQuizState();
    const { setSelectedPriorities } = useQuizActions();
    const [selected, setSelected] = useState<PriorityId[]>(() => {
        const incoming = location?.state?.selected;
        if (Array.isArray(incoming)) return incoming as PriorityId[];
        return selectedPriorities as PriorityId[];
    });
    const [showNotice, setShowNotice] = useState(false);

    useEffect(() => {
        // keep context in sync when navigating back
        setSelectedPriorities(selected);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    function toggle(id: PriorityId) {
        const isSelected = selected.includes(id);
        if (isSelected) {
            setSelected(prev => prev.filter(x => x !== id));
            return;
        }
        if (selected.length >= 5) return; // hard cap
        setSelected(prev => [...prev, id]);
    }

    const isReady = selected.length === 5;

    return (
        <div className={styles.wrapper}>
            <PageHeader title="Pick Your Priorities" />

            <section className={styles.pickContent}>
                <p className={styles.pickHint}>Pick The 5 Topics That Matter Most To You.</p>

                <div className={styles.pickChipList}>
                    {PRIORITIES.map(p => {
                        const active = selected.includes(p.id as PriorityId);
                        const reachedCap = !active && selected.length >= 5;
                        return (
                            <button
                                key={p.id}
                                type="button"
                                className={`${styles.pickChip} ${active ? styles.pickChipSelected : ''} ${reachedCap ? styles.pickChipDisabled : ''}`}
                                onClick={() => toggle(p.id as PriorityId)}
                                aria-pressed={active}
                                disabled={reachedCap}
                            >
                                {p.label}
                            </button>
                        );
                    })}
                </div>
            </section>

            <div className={styles.pickActions}>
                {showNotice && (
                    <div className={styles.notice}>Choose 5 priorities to proceed.</div>
                )}
                <Link
                    to="/quiz/rank"
                    state={{ selected }}
                    className={styles.pickNextButton}
                    onClick={(e) => {
                        if (!isReady) {
                            e.preventDefault();
                            setShowNotice(true);
                            setTimeout(() => setShowNotice(false), 3000);
                        } else {
                            setSelectedPriorities(selected);
                        }
                    }}
                >
                    Next: Rank Your Priorities
                </Link>

                <Link to="/quiz/questions" className={styles.pickBackButton}>Back</Link>
            </div>
        </div>
    )
}

export default QuizPick