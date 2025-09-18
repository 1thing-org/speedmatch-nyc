import PageHeader from "../../components/PageHeader";
import styles from "../styles/QuizDesktop.module.css";
import QuizSidebar from "../components/QuizSidebar";
import { fixedQuestions } from "../content/questions";
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

    const questions = fixedQuestions as readonly any[];
    const total = questions.length;
    const { answers: persisted, optionOrders } = useQuizState();
    const { setAnswer, setLastQ8OptionId, setOptionOrder } = useQuizActions();
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showNotice, setShowNotice] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState<number>(0);

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

    function onSelect(qid: string, oid: string) {
        setAnswers(prev => ({ ...prev, [qid]: oid }));
        setAnswer(qid as any, oid as any);
        if (qid === 'Q8') setLastQ8OptionId(oid as any);
    }

    function scrollToHeader(idx: number) {
        const target = idx + 1;
        const el = document.getElementById(`q-header-${target}`);
        if (el) {
            setActiveQuestion(target);
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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

    useEffect(() => {
        const headers = questions
            .map((_, idx) => document.getElementById(`q-header-${idx + 1}`))
            .filter((node): node is HTMLElement => Boolean(node));

        if (!headers.length) return;

        const updateActive = () => {
            const offset = qHeaderHeight + 16;
            const scrollPosition = window.scrollY + offset;
            let activeIdx = 0;

            for (let i = headers.length - 1; i >= 0; i--) {
                const el = headers[i];
                if (scrollPosition >= el.offsetTop) {
                    activeIdx = i + 1;
                    break;
                }
            }

            setActiveQuestion(prev => (prev === activeIdx ? prev : activeIdx));
        };

        updateActive();
        window.addEventListener('scroll', updateActive, { passive: true });
        window.addEventListener('resize', updateActive);

        return () => {
            window.removeEventListener('scroll', updateActive);
            window.removeEventListener('resize', updateActive);
        };
    }, [questions, qHeaderHeight]);

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
                                <QuizSidebar includeStart={false} activeQuestion={activeQuestion} />
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

                                    {/* Notice above actions for last question */}
                                    {isLast && showNotice ? (
                                        <div className={`${dqStyles.notice} ${dqDesktop.notice}`}>You must finish all questions to proceed</div>
                                    ) : null}

                                    <div className={`${dqStyles.actions} ${dqDesktop.actions}`} >
                                        {isLast ? (
                                            <>
                                                {/* Back first on last question */}
                                                <button className={`${dqStyles.btnSecondary} ${dqDesktop.btnSecondary}`} onClick={() => scrollToHeader(idx - 1)}>Back</button>
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
                                                {/* Show Back on non-first questions */}
                                                {idx > 0 ? (
                                                    <button className={`${dqStyles.btnSecondary} ${dqDesktop.btnSecondary}`} onClick={() => scrollToHeader(idx - 1)}>Back</button>
                                                ) : null}
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

export default DesktopQuiz
