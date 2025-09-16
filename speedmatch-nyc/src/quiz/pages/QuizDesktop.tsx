import PageHeader from "../../components/PageHeader";
import { QuizProvider } from "../state/QuizContext";
import styles from "../styles/QuizDesktop.module.css";
import QuizSidebar from "../components/QuizSidebar";

function QuizDesktop() {
    return (
        <QuizProvider>
            <div className={styles.desktopPage}>
                <div className={styles.pageHeaderBar}>
                    <PageHeader title="Before You Start" />
                </div>
                <div className={styles.columns}>
                    <aside className={styles.sidebar}>
                        <QuizSidebar />
                    </aside>
                    <main className={styles.main}>
                        {/* Content sections will be implemented in subsequent steps */}
                        <section id="before-start" className={styles.section}>
                            <h2 className={styles.placeholder}>text</h2>
                            <p className={styles.placeholderText}>placeholder.</p>
                        </section>
                        <section id="q-1" className={styles.section}>
                            <h2 className={styles.placeholder}>Question 1</h2>
                            <p className={styles.placeholderText}>placeholder.</p>
                        </section>
                    </main>
                </div>
            </div>
        </QuizProvider>
    )
}

export default QuizDesktop