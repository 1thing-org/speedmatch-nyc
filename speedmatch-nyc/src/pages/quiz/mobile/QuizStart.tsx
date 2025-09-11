import PageHeader from "../../../components/PageHeader";
import styles from "../../../styles/quiz/QuizMobile.module.css"
import { Link } from "react-router";

function QuizStart() {
    return (
        <div className={styles.wrapper}>
            <PageHeader title="Before You Start" />

            <section className={styles.content}>
                <p>
                    This quiz has <strong>13</strong> questions and takes approximately <strong>5-8</strong> minutes to complete.
                </p>

                <p>
                    Each answer comes from a real candidate's proposal. Pick the one you agree with.<br/>
                    If you choose Skip this question, that question won't count toward your final match.
                </p>
            </section>

            <div className={styles.startQuiz}>
                <Link to="/quiz/questions" className={styles.startButton}>
                    Start The Quiz
                </Link>
            </div>
        </div>
    )
}

export default QuizStart