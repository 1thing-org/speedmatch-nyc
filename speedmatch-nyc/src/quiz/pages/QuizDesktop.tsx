import PageHeader from "../../components/PageHeader";
import { QuizProvider } from "../state/QuizContext";
import styles from "../styles/QuizDesktop.module.css";
import QuizSidebar from "../components/QuizSidebar";
import { FixedQuestions } from "../content/questions";
import { useEffect, useRef, useState } from "react";

function QuizDesktop() {
    const q1 = FixedQuestions[0] as any;
    const headerRef = useRef<HTMLDivElement | null>(null);
    const [qHeaderHeight, setQHeaderHeight] = useState<number>(120);

    function goToQ1() {
        const el = document.getElementById('q1-header');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        <QuizProvider>
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

                {/* Q1 header (sticky) */}
                <div id="q1-header" ref={headerRef} className={`${styles.pageHeaderBar} ${styles.stickyHeader} ${styles.q1HeaderBorder} ${styles.q1Anchor}`}>
                    <PageHeader title={`Question 1 ${q1?.title ?? ''}`} />
                </div>

                {/* Questions area (with sidebar) */}
                <div className={styles.columns}>
                    <aside className={styles.sidebar}>
                        <QuizSidebar includeStart={false} />
                    </aside>
                    <main className={styles.main}>
                        <section id="q-1" className={styles.section}>
                            <h2 className={styles.placeholder}>{q1?.prompt || 'Question 1'}</h2>
                            <div className={styles.placeholderText}>
                                <ol>
                                    {(q1?.options || []).map((o: any) => (
                                        <li key={o.id} style={{ marginBottom: 8 }}>{o.label}</li>
                                    ))}
                                </ol>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </QuizProvider>
    )
}

export default QuizDesktop