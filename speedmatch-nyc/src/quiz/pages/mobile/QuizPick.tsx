import PageHeader from "../../../components/PageHeader";
import styles from "../../styles/QuizMobile.module.css"
import { Link, useLocation } from "react-router";
import { PRIORITIES } from "../../content/priorities";
import type { PriorityId } from "../../scoring/priorities";
import { useState, useEffect, useMemo } from "react";
import { useQuizActions, useQuizState } from "../../state/QuizContext";
import { FixedQuestions } from "../../content/questions";

function QuizPick() {
    const location = useLocation() as any;
    const { selectedPriorities, answers, lastQ8OptionId, q8UsedForPriorities } = useQuizState();
    const { setSelectedPriorities, setQ8UsedForPriorities } = useQuizActions();
    const [selected, setSelected] = useState<PriorityId[]>(() => {
        const incoming = location?.state?.selected;
        if (Array.isArray(incoming)) return incoming as PriorityId[];
        return selectedPriorities as PriorityId[];
    });
    const [showNotice, setShowNotice] = useState(false);
    const [noticeText, setNoticeText] = useState<string>('');

    // Determine special choice from Q8
    const filteredPriorities = useMemo(() => {
        const specialIds = new Set<PriorityId>(['antisemitism','equity','efficiency'] as unknown as PriorityId[]);
        let chosenSpecial: PriorityId | undefined;
        const q8 = FixedQuestions.find(q => q.id === 'Q8');
        const chosenOptId = (answers as any)['Q8'];
        if (q8 && chosenOptId) {
            const opt: any = q8.options.find((o: any) => o.id === chosenOptId);
            chosenSpecial = opt?.priorityId as PriorityId | undefined;
        }
        return PRIORITIES.filter(p => !specialIds.has(p.id as PriorityId) || p.id === chosenSpecial);
    }, [answers]);

    // Capture baseline Q8 on first visit; reset all selections if Q8 changed afterwards
    useEffect(() => {
        const currentQ8 = lastQ8OptionId as any;
        const usedQ8 = q8UsedForPriorities as any;
        if (!usedQ8 && currentQ8) {
            setQ8UsedForPriorities(currentQ8);
            return;
        }
        if (currentQ8 && usedQ8 && currentQ8 !== usedQ8) {
            setSelected([]);
            setSelectedPriorities([]);
            setQ8UsedForPriorities(currentQ8);
            setNoticeText('Your last answer changed. Please pick 5 priorities again.');
            setShowNotice(true);
            const t = setTimeout(() => setShowNotice(false), 3000);
            return () => clearTimeout(t);
        }
    }, [lastQ8OptionId, q8UsedForPriorities]);

    useEffect(() => {
        setSelectedPriorities(selected);
    }, [selected]);

    function toggle(id: PriorityId) {
        const isSelected = selected.includes(id);
        if (isSelected) {
            setSelected(prev => prev.filter(x => x !== id));
            return;
        }
        if (selected.length >= 5) return;
        setSelected(prev => [...prev, id]);
    }

    const isReady = selected.length === 5;

    return (
        <div className={styles.wrapper}>
            <PageHeader title="Pick Your Priorities" />

            <section className={styles.pickContent}>
                <p className={styles.pickHint}>Pick The 5 Topics That Matter Most To You.</p>

                <div className={styles.pickChipList}>
                    {filteredPriorities.map(p => {
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
                    <div className={styles.notice}>{noticeText || 'Choose 5 priorities to proceed.'}</div>
                )}
                <Link
                    to="/quiz/rank"
                    state={{ selected }}
                    className={styles.pickNextButton}
                    onClick={(e) => {
                        if (!isReady) {
                            e.preventDefault();
                            setNoticeText('Pick 5 to proceed');
                            setShowNotice(true);
                            setTimeout(() => setShowNotice(false), 3000);
                        } else {
                            setSelectedPriorities(selected);
                            setQ8UsedForPriorities(lastQ8OptionId as any);
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