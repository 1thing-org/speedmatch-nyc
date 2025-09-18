import styles from "../styles/QuizSidebar.module.css";
import { fixedQuestions } from "../content/questions";

type QuizSidebarProps = {
    includeStart?: boolean;
    activeQuestion?: number;
    completedQuestions?: Set<number>;
};

function QuizSidebar({ includeStart = true, activeQuestion, completedQuestions }: QuizSidebarProps) {
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
            </ul>
        </nav>
    );
}

export default QuizSidebar;
