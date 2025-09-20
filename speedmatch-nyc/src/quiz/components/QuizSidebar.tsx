import styles from "../styles/QuizSidebar.module.css";
import { fixedQuestions } from "../content/questions";

type QuizSidebarProps = {
    activeQuestion?: number;
    completedQuestions?: Set<number>;
    onPickClick?: () => void;
    onRankClick?: () => void;
};

function QuizSidebar({  activeQuestion, completedQuestions }: QuizSidebarProps) {
    function scrollToId(questionNumber: number) {
        // Sidebar only show in Desktop
        const headerEl = document.getElementById(`q-header-${questionNumber}`);
        if (headerEl) {
            const navbarHeight = 80;
            const targetPosition = headerEl.offsetTop - navbarHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    }

    return (
        <nav className={styles.sidebarNav} aria-label="Quiz navigation">

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
                                 onClick={() => scrollToId(questionNumber)}
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
