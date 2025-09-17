import styles from "../styles/QuizSidebar.module.css";
import { FixedQuestions } from "../content/questions";

function QuizSidebar({ includeStart = true }: { includeStart?: boolean }) {
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
                {FixedQuestions.map((q, idx) => (
                    <li key={q.id}>
                        <button className={styles.item} onClick={() => scrollToId(`q-${idx + 1}`)}>
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