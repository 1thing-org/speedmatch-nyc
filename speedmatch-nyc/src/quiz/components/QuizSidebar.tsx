import styles from "../styles/QuizSidebar.module.css";
import { fixedQuestions } from "../content/questions";

type QuizSidebarProps = {
    includeStart?: boolean;
    activeQuestion?: number;
    completedQuestions?: Set<number>;
    onPickClick?: () => void;
    onRankClick?: () => void;
};

function QuizSidebar({ includeStart = true, activeQuestion, completedQuestions, onPickClick, onRankClick }: QuizSidebarProps) {
    function scrollToId(id: string) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <nav className={styles.sidebarNav} aria-label="Quiz navigation">
            {includeStart && (
                <button className={`${styles.item} ${styles.sectionHeader}`} onClick={() => scrollToId('before-start')}>
                    Before You Start
                </button>
            )}

            <ul className={styles.list}>
                {fixedQuestions.map((q, idx) => {
                    const questionNumber = idx + 1;
                    const isActive = activeQuestion === questionNumber;
                    const isCompleted = completedQuestions?.has(questionNumber);
                    const itemClass = [
                        styles.item,
                        isActive ? styles.itemActive : "",
                        isCompleted ? styles.itemCompleted : "",
                    ]
                        .filter(Boolean)
                        .join(" ");

                    return (
                        <li key={q.id}>
                            <button
                                className={itemClass}
                                onClick={() => scrollToId(`q-header-${questionNumber}`)}
                                aria-current={isActive ? "location" : undefined}
                            >
                                <span className={styles.metaRow}>
                                    <span className={styles.qNumber}>Question {questionNumber}</span>
                                    {isCompleted ? <span className={styles.completedTag}>Completed</span> : null}
                                </span>
                                <span className={styles.qTitle}>{q.title}</span>
                            </button>
                        </li>
                    );
                })}

                {/* Desktop-only sections after questions */}
                <li>
                    <button
                        className={`${styles.item} ${activeQuestion === 100 ? styles.itemActive : ''}`}
                        onClick={() => (onPickClick ? onPickClick() : scrollToId('pick-header'))}
                        aria-current={activeQuestion === 100 ? 'location' : undefined}
                    >
                        <span className={styles.qTitle}>Pick Your Priorities</span>
                    </button>
                </li>
                <li>
                    <button
                        className={`${styles.item} ${activeQuestion === 101 ? styles.itemActive : ''}`}
                        onClick={() => (onRankClick ? onRankClick() : scrollToId('rank-header'))}
                        aria-current={activeQuestion === 101 ? 'location' : undefined}
                    >
                        <span className={styles.qTitle}>Rank Your Priorities</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default QuizSidebar;
