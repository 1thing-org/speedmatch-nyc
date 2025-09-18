import PageHeader from "../../../components/PageHeader";
import styles from "../../styles/QuizMobile.module.css"
import { Link } from "react-router";
import BeforeStartContent from "../../components/BeforeStartContent";

function QuizStart() {
    return (
        <div className={styles.wrapper}>
            <PageHeader title="Before You Start" />

            <section className={styles.content}>
                <BeforeStartContent />
            </section>

            <div className={styles.startQuiz}>
                <Link to="/quiz/questions" className={styles.startButton}>Start The Quiz</Link>
            </div>
        </div>
    )
}

export default QuizStart