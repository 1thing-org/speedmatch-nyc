import styles from "../styles/QuizSidebar.module.css";
import { fixedQuestions } from "../content/questions";

type QuizSidebarProps = {
    includeStart?: boolean;
    activeQuestion?: number;
};

function QuizSidebar({ includeStart = true, activeQuestion }: QuizSidebarProps) {
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
                {fixedQuestions.map((q, idx) => (
                    <li key={q.id}>
                        <button
                            className={`${styles.item} ${activeQuestion === idx + 1 ? styles.itemActive : ""}`}
                            onClick={() => scrollToId(`q-header-${idx + 1}`)}
                            aria-current={activeQuestion === idx + 1 ? "location" : undefined}
                        >
                            <span className={styles.qNumber}>Question {idx + 1}</span>
                            <span className={styles.qTitle}>{q.title}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default QuizSidebar;
