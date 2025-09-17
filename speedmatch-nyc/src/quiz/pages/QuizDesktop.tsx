import PageHeader from "../../components/PageHeader";
import { QuizProvider } from "../state/QuizContext";
import styles from "../styles/QuizDesktop.module.css";
import QuizSidebar from "../components/QuizSidebar";
import { FixedQuestions } from "../content/questions";
import dqStyles from "../styles/QuizMobileQuestions.module.css";
import dqDesktop from "../styles/QuizDesktopQuestions.module.css";
import { useEffect, useRef, useState, useMemo } from "react";
import { useQuizActions, useQuizState } from "../state/QuizContext";
import { candidates } from "../../data/candidates";
import { Link } from "react-router";

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

    const questions = FixedQuestions as readonly any[];
    const total = questions.length;
    const { answers: persisted } = useQuizState();
    const { setAnswer, setLastQ8OptionId } = useQuizActions();
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showNotice, setShowNotice] = useState(false);

    useEffect(() => {
        setAnswers(persisted as Record<string, string>);
    }, [persisted]);

    const orders = useMemo(() => {
        return questions.map(q => shuffleArray((q.options as readonly any[]).map((_: any, i: number) => i)));
    }, [questions]);

    function onSelect(qid: string, oid: string) {
        setAnswers(prev => ({ ...prev, [qid]: oid }));
        setAnswer(qid as any, oid as any);
        if (qid === 'Q8') setLastQ8OptionId(oid as any);
    }

    function scrollToHeader(idx: number) {
        const el = document.getElementById(`q-header-${idx + 1}`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const allAnswered = Object.keys(answers).length === total;

    function goToQ1() {
        scrollToHeader(0);
    }

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
                const selected = (answers as any)[q.id];
                const isLast = idx === total - 1;
                const order = orders[idx];

                const declared = new Set<number>();
                (q.options as any[]).forEach(o => declared.add((o as any).candidateId));
                const undeclared = Math.max(0, candidates.length - declared.size);

                return (
                    <div key={q.id}>
                        {/* Per-question sticky page header */}
                        <div id={`q-header-${current}`} ref={idx === 0 ? headerRef : undefined} className={`${styles.pageHeaderBar} ${styles.stickyHeader} ${styles.questionHeader} ${styles.q1Anchor}`}>
                            <PageHeader title={`Question ${current} ${q.title}`} />
                        </div>

                        {/* Columns under header */}
                        <div className={styles.columns}>
                            <aside className={styles.sidebar}>
                                <QuizSidebar includeStart={false} />
                            </aside>
                            <main className={styles.main}>
                                <div className={`${dqStyles.qSection} ${dqDesktop.qSection}`}>
                                    <h2 className={dqStyles.qTitle}>{q.prompt}</h2>
                                    <div className={dqStyles.qSub}>
                                        ({undeclared} candidates have not declared a stance on this issue.)
                                    </div>

                                    <ul className={dqStyles.options}>
                                        {order.map((optIndex: number, displayIndex: number) => {
                                            const opt = (q.options as any[])[optIndex] as any;
                                            const isSelected = selected === opt.id;
                                            return (
                                                <li key={opt.id}>
                                                    <button
                                                        type="button"
                                                        onClick={() => onSelect(q.id, opt.id)}
                                                        className={`${dqStyles.option} ${isSelected ? dqStyles.optionSelected : ""}`}
                                                    >
                                                        <span className={dqStyles.optIndex}>{displayIndex + 1}.</span>
                                                        <span className={dqStyles.optLabel}>{opt.label}</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    <div className={`${dqStyles.actions} ${dqDesktop.actions}`} >
                                        {isLast ? (
                                            <>
                                                {/* Back first on last question */}
                                                <button className={`${dqStyles.btnSecondary} ${dqDesktop.btnSecondary}`} onClick={() => scrollToHeader(idx - 1)}>Back</button>
                                                {showNotice && (
                                                    <div className={dqStyles.notice}>You must finish all questions to proceed</div>
                                                )}
                                                <Link
                                                    to="/quiz/pick"
                                                    className={`${dqStyles.btnPrimary} ${dqDesktop.btnPrimary} ${dqDesktop.btnWide}`}
                                                    onClick={(e) => {
                                                        if (!allAnswered) {
                                                            e.preventDefault();
                                                            setShowNotice(true);
                                                            setTimeout(() => setShowNotice(false), 3000);
                                                        }
                                                    }}
                                                    state={{ fromSpecialPriorityOption: (answers as any)['Q8'] }}
                                                >
                                                    Next: Pick Your Priorities
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                {/* No Back on non-last questions */}
                                                <button className={`${dqStyles.btnPrimary} ${dqDesktop.btnPrimary}`} onClick={() => scrollToHeader(idx + 1)}>Next</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function QuizDesktop() {
    return (
        <QuizProvider>
            <DesktopQuiz />
        </QuizProvider>
    );
}

export default QuizDesktop