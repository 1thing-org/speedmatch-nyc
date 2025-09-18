import PageHeader from "../../components/PageHeader";
import styles from "../styles/QuizDesktop.module.css";
import QuizSidebar from "../components/QuizSidebar";
import { fixedQuestions } from "../content/questions";
import dqStyles from "../styles/QuizMobileQuestions.module.css";
import dqDesktop from "../styles/QuizDesktopQuestions.module.css";
import pickRankStyles from "../styles/QuizMobile.module.css";
import desktopPickRank from "../styles/QuizDesktopPickRank.module.css";
import { useEffect, useRef, useState, useMemo } from "react";
import { useQuizActions, useQuizState } from "../state/QuizContext";
import { candidates } from "../../data/candidates";
import { Link } from "react-router";
import { PRIORITIES, type PriorityId } from "../content/priorities";
import QuestionPanel from "../components/QuestionPanel";
import { useQuestionVM } from "../hooks/useQuestionVM";
import RankPanel from "../components/RankPanel";
import { useRankVM } from "../hooks/useRankVM";

function shuffleArray<T>(input: readonly T[]): T[] {
    const arr = input.slice() as T[];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function DesktopQuiz() {
    const headerRef = useRef<HTMLDivElement | null>(null);
    const [qHeaderHeight, setQHeaderHeight] = useState<number>(120);

    const questions = fixedQuestions as readonly any[];
    const total = questions.length;
    const { answers: persisted, optionOrders } = useQuizState();
    const { setOptionOrder, setSelectedPriorities, setQ8UsedForPriorities } = useQuizActions();
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showNotice, setShowNotice] = useState(false);
    const [noticeAt, setNoticeAt] = useState<number | null>(null);
    const [activeQuestion, setActiveQuestion] = useState<number>(0); // 1..N, 100=Pick, 101=Rank

    const completedQuestions = useMemo(() => {
        const set = new Set<number>();
        questions.forEach((q, idx) => {
            if ((answers as Record<string, string>)[q.id]) set.add(idx + 1);
        });
        return set;
    }, [answers, questions]);

    // ----- Pick Your Priorities state (desktop inline) -----
    const { selectedPriorities, lastQ8OptionId, q8UsedForPriorities } = useQuizState();
    const [selected, setSelected] = useState<PriorityId[]>(() => selectedPriorities as PriorityId[]);
    const [pickNotice, setPickNotice] = useState<string>("");
    const [showPickNotice, setShowPickNotice] = useState(false);
    const [pickVisible, setPickVisible] = useState(false);
    const [rankVisible, setRankVisible] = useState(false);

    const filteredPriorities = useMemo(() => {
        const specialIds = new Set<PriorityId>(['antisemitism','equity','efficiency'] as unknown as PriorityId[]);
        let chosenSpecial: PriorityId | undefined;
        const q8 = (fixedQuestions).find(q => q.id === 'Q8');
        const chosenOptId = (answers as any)['Q8'];
        if (q8 && chosenOptId) {
            const opt: any = (q8.options).find((o: any) => o.id === chosenOptId);
            chosenSpecial = opt?.priorityId as PriorityId | undefined;
        }
        return PRIORITIES.filter(p => !specialIds.has(p.id as PriorityId) || p.id === chosenSpecial);
    }, [answers]);

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
            setPickNotice('Your last answer changed. Please pick 5 priorities again.');
            setShowPickNotice(true);
            const t = setTimeout(() => setShowPickNotice(false), 3000);
            return () => clearTimeout(t);
        }
    }, [lastQ8OptionId, q8UsedForPriorities]);

    useEffect(() => { setSelectedPriorities(selected); }, [selected]);

    function togglePriority(id: PriorityId) {
        const isSelected = selected.includes(id);
        if (isSelected) {
            setSelected(prev => prev.filter(x => x !== id));
            return;
        }
        if (selected.length >= 5) return;
        setSelected(prev => [...prev, id]);
    }

    const pickReady = selected.length === 5;

    // ----- Rank VM for desktop inline rank -----
    const rankVM = useRankVM(selected);
    const rankClasses = useMemo(() => ({
        wrap: pickRankStyles.rankContent,
        hint: pickRankStyles.rankHint,
        list: pickRankStyles.rankList,
        item: pickRankStyles.rankItem,
        badge: pickRankStyles.rankBadge,
        card: pickRankStyles.rankCard,
        handle: pickRankStyles.rankHandle,
        label: pickRankStyles.rankLabel,
    }), []);

    // ----- Rank Your Priorities state (desktop inline) -----
    const initialOrder = useMemo<PriorityId[]>(() => {
        const defaults = filteredPriorities.map(p => p.id as PriorityId);
        if (Array.isArray(selected) && selected.length === 5) return selected as PriorityId[];
        return defaults.slice(0, 5);
    }, [selected, filteredPriorities]);

    const [rankOrder, setRankOrder] = useState<PriorityId[]>(initialOrder);
    useEffect(() => {
        setRankOrder(prev => {
            if (prev.length !== initialOrder.length || prev.some((v, i) => v !== initialOrder[i])) {
                return initialOrder;
            }
            return prev;
        });
    }, [initialOrder]);



    useEffect(() => {
        setAnswers(persisted as Record<string, string>);
    }, [persisted]);

    // Stable order per question stored in context
    const orders = useMemo(() => {
        return questions.map(q => {
            const existing = (optionOrders as any)[q.id] as number[] | undefined;
            if (existing && existing.length === (q.options as any[]).length) return existing;
            const order = shuffleArray((q.options as readonly any[]).map((_: any, i: number) => i));
            setOptionOrder(q.id as any, order);
            return order;
        });
    }, [questions, optionOrders, setOptionOrder]);

    function scrollToKey(key: number) {
        let el: HTMLElement | null = null;
        if (key === 100) el = document.getElementById('pick-header');
        else if (key === 101) el = document.getElementById('rank-header');
        else el = document.getElementById(`q-header-${key}`);
        if (el) {
            setActiveQuestion(key);
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function requireAllAnsweredThen(targetKey: number) {
        if (Object.keys(answers).length === total) {
            scrollToKey(targetKey);
            return;
        }
        const firstUnansweredIdx = questions.findIndex(q => !(answers as any)[q.id]);
        const currentIdx = activeQuestion >= 1 && activeQuestion <= total ? activeQuestion - 1 : -1;
        const currentIsUnanswered = currentIdx >= 0 ? !(answers as any)[(questions[currentIdx] as any).id] : false;
        const target = currentIsUnanswered ? (currentIdx + 1) : (firstUnansweredIdx >= 0 ? firstUnansweredIdx + 1 : total);
        setNoticeAt(target);
        setShowNotice(true);
        scrollToKey(target);
        setTimeout(() => setShowNotice(false), 3000);
    }

    function handlePickFromSidebar() {
        if (!allAnswered) {
            requireAllAnsweredThen(100);
            return;
        }
        if (!pickVisible) {
            // Guide user to last question to click Next
            scrollToKey(total);
            return;
        }
        scrollToKey(100);
    }

    function handleRankFromSidebar() {
        if (!allAnswered) {
            requireAllAnsweredThen(101);
            return;
        }
        if (!pickVisible) {
            // Must enter Pick via Next first
            scrollToKey(total);
            return;
        }
        if (!rankVisible) {
            // Show hint in Pick if not ready yet
            setPickNotice(selected.length < 5 ? 'Pick 5 to proceed' : 'Click Next to continue');
            setShowPickNotice(true);
            scrollToKey(100);
            setTimeout(() => setShowPickNotice(false), 3000);
            return;
        }
        scrollToKey(101);
    }

    const allAnswered = Object.keys(answers).length === total;

    function goToQ1() { scrollToKey(1); }

    useEffect(() => {
        if (!headerRef.current) return;
        const node = headerRef.current;
        const ro = new ResizeObserver(() => {
            setQHeaderHeight(node.getBoundingClientRect().height);
        });
        ro.observe(node);
        setQHeaderHeight(node.getBoundingClientRect().height);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const headers = [
            ...questions.map((_, idx) => ({ el: document.getElementById(`q-header-${idx + 1}`), key: idx + 1 })),
            ...(pickVisible ? [{ el: document.getElementById('pick-header'), key: 100 } as const] : []),
            ...(rankVisible ? [{ el: document.getElementById('rank-header'), key: 101 } as const] : []),
        ].filter((x): x is { el: HTMLElement; key: number } => Boolean(x.el));

        if (!headers.length) return;

        const updateActive = () => {
            const offset = qHeaderHeight + 16;
            const scrollPosition = window.scrollY + offset;
            let activeKey = 0;
            for (let i = headers.length - 1; i >= 0; i--) {
                const { el, key } = headers[i];
                if (scrollPosition >= el.offsetTop) { activeKey = key; break; }
            }
            setActiveQuestion(prev => (prev === activeKey ? prev : activeKey));
        };

        updateActive();
        window.addEventListener('scroll', updateActive, { passive: true });
        window.addEventListener('resize', updateActive);

        return () => {
            window.removeEventListener('scroll', updateActive);
            window.removeEventListener('resize', updateActive);
        };
    }, [questions, qHeaderHeight, pickVisible, rankVisible]);

    return (
        <div className={styles.desktopPage} style={{ ['--page-header-offset' as any]: `${qHeaderHeight}px` }}>
            {/* First screen header (non-sticky) */}
            <div className={styles.pageHeaderBar}>
                <PageHeader title="Before You Start" />
            </div>

            {/* Before Start section (no sidebar) */}
            <section id="before-start" className={styles.startContainer}>
                <div className={styles.startContent}>
                    <h2 className={styles.startHeading}>A Quick Note Before The Quiz.</h2>
                    <ul>
                        <li>
                            This quiz consists of <strong>8</strong> questions and takes approximately <strong>5–8</strong> minutes to complete.
                        </li>
                        <li>
                            Each answer option is drawn directly from a candidate’s official campaign proposals. Please select the option you most agree with.
                        </li>
                        <li>
                            The quiz uses only <strong>candidates’ official campaign websites</strong> its source of information.
                        </li>
                        <li>
                            The following candidates are not included:
                            <ul>
                                <li>Candidates without a campaign website or without published policy positions on their website.</li>
                                <li>Candidates with non-functional websites.</li>
                                <li>Candidates whose names will not appear on the ballot (e.g., write-in candidates).</li>
                                <li>Candidates who have withdrawn from the race.</li>
                            </ul>
                        </li>
                    </ul>
                    <button className={styles.startButton} onClick={goToQ1}>Next: Question 1</button>
                </div>
            </section>

            {/* All questions rendered as desktop sections */}
            {questions.map((q: any, idx: number) => {
                const current = idx + 1;
                const isLast = idx === total - 1;
                const order = orders[idx];

                const declared = new Set<number>();
                (q.options as any[]).forEach(o => declared.add((o as any).candidateId));
                const undeclared = Math.max(0, candidates.length - declared.size);

                const vm = useQuestionVM(q, idx, total, order);
                const noticeText = showNotice && noticeAt === current ? 'You must finish all questions to proceed' : null;

                return (
                    <div key={q.id}>
                        {/* Per-question sticky page header */}
                        <div id={`q-header-${current}`} ref={idx === 0 ? headerRef : undefined} className={`${styles.pageHeaderBar} ${styles.stickyHeader} ${styles.questionHeader} ${styles.q1Anchor}`}>
                            <PageHeader title={`Question ${current} ${q.title}`} />
                        </div>

                        {/* Columns under header */}
                        <div className={styles.columns}>
                            <aside className={styles.sidebar}>
                                <QuizSidebar
                                    includeStart={false}
                                    activeQuestion={activeQuestion}
                                    completedQuestions={completedQuestions}
                                    onPickClick={handlePickFromSidebar}
                                    onRankClick={handleRankFromSidebar}
                                />
                            </aside>
                            <main className={styles.main}>
                                <QuestionPanel
                                    vm={vm}
                                    variant="desktop"
                                    onBack={() => scrollToKey(idx)}
                                    onNext={() => {
                                        if (isLast) {
                                            if (!allAnswered) {
                                                requireAllAnsweredThen(100);
                                                return;
                                            }
                                            if (!pickVisible) setPickVisible(true);
                                            setTimeout(() => scrollToKey(100), 0);
                                            return;
                                        }
                                        scrollToKey(idx + 2);
                                    }}
                                    undeclaredCount={undeclared}
                                    noticeText={noticeText}
                                    primaryLabel={isLast ? 'Next: Pick Your Priorities' : 'Next'}
                                    primaryWide={isLast}
                                />
                            </main>
                        </div>
                    </div>
                );
            })}

            {/* Pick Your Priorities section (desktop inline) */}
            {pickVisible && (
            <>
            <div id="pick-header" className={`${styles.pageHeaderBar} ${styles.stickyHeader} ${styles.questionHeader}`}>
                <PageHeader title="Pick Your Priorities" />
            </div>
            <div className={styles.columns}>
                <aside className={styles.sidebar}>
                    <QuizSidebar
                        includeStart={false}
                        activeQuestion={activeQuestion}
                        completedQuestions={completedQuestions}
                        onPickClick={handlePickFromSidebar}
                        onRankClick={handleRankFromSidebar}
                    />
                </aside>
                <main className={styles.main}>
                    <section className={`${dqStyles.qSection} ${dqDesktop.qSection}`}>
                        <p className={pickRankStyles.pickHint}>Pick The 5 Topics That Matter Most To You.</p>
                        <div className={`${pickRankStyles.pickChipList} ${desktopPickRank.pickTwoCol}`}>
                            {filteredPriorities.map(p => {
                                const active = selected.includes(p.id as PriorityId);
                                const reachedCap = !active && selected.length >= 5;
                                return (
                                    <button
                                        key={p.id}
                                        type="button"
                                        className={`${pickRankStyles.pickChip} ${desktopPickRank.pickChipWide} ${active ? pickRankStyles.pickChipSelected : ''} ${reachedCap ? pickRankStyles.pickChipDisabled : ''}`}
                                        onClick={() => togglePriority(p.id as PriorityId)}
                                        aria-pressed={active}
                                        disabled={reachedCap}
                                    >
                                        {p.label}
                                    </button>
                                );
                            })}
                        </div>
                        
                        {showPickNotice ? (<div className={`${pickRankStyles.notice} ${desktopPickRank.notice}`}>{pickNotice || 'Choose 5 priorities to proceed.'}</div>) : null}
                        <div className={`${dqDesktop.actions}`}>
                            <button className={`${dqStyles.btnSecondary} ${dqDesktop.btnSecondary}`} onClick={() => scrollToKey(questions.length)}>Back</button>
                            <button
                                className={`${dqStyles.btnPrimary} ${dqDesktop.btnPrimary} ${dqDesktop.btnWide}`}
                                onClick={() => {
                                    if (!pickReady) {
                                        setPickNotice('Pick 5 to proceed');
                                        setShowPickNotice(true);
                                        setTimeout(() => setShowPickNotice(false), 3000);
                                        return;
                                    }
                                    setSelectedPriorities(selected);
                                    setQ8UsedForPriorities(lastQ8OptionId as any);
                                    if (!rankVisible) setRankVisible(true);
                                    setTimeout(() => scrollToKey(101), 0);
                                }}
                            >
                                Next: Rank Your Priorities
                            </button>
                        </div>
                        
                    </section>
                </main>
            </div>
            </>
            )}

            {/* Rank Your Priorities section (desktop inline) */}
            {rankVisible && (
            <>
            <div id="rank-header" className={`${styles.pageHeaderBar} ${styles.stickyHeader} ${styles.questionHeader}`}>
                <PageHeader title="Rank Your Priorities" />
            </div>
            <div className={styles.columns}>
                <aside className={styles.sidebar}>
                    <QuizSidebar
                        includeStart={false}
                        activeQuestion={activeQuestion}
                        completedQuestions={completedQuestions}
                        onPickClick={handlePickFromSidebar}
                        onRankClick={handleRankFromSidebar}
                    />
                </aside>
                <main className={styles.main}>
                    <section className={`${dqStyles.qSection} ${dqDesktop.qSection}`}>
                        <RankPanel
                            vm={rankVM}
                            classes={rankClasses}
                            renderActions={(isReady, order) => (
                                <div className={`${dqDesktop.actions}`}>
                                    <button className={`${dqStyles.btnSecondary} ${dqDesktop.btnSecondary}`} onClick={() => scrollToKey(100)}>Back</button>
                                    <Link
                                        to="/quiz/result"
                                        className={`${dqStyles.btnPrimary} ${dqDesktop.btnPrimary} ${dqDesktop.btnWide} ${!isReady ? pickRankStyles.buttonDisabled : ''}`}
                                        aria-disabled={!isReady}
                                        onClick={(e) => { if (!isReady) e.preventDefault(); }}
                                        state={{ rankedFive: order }}
                                    >
                                        Submit And See Result
                                    </Link>
                                </div>
                            )}
                        />
                    </section>
                </main>
            </div>
            </>
            )}
        </div>
    );
}


export default DesktopQuiz
