import PageHeader from "../../../components/PageHeader";
import styles from "../../styles/QuizMobile.module.css";
import { Link } from "react-router";
import { useEffect } from "react";
import { useQuizActions } from "../../state/QuizContext";

function QuizStart() {
    const { reset } = useQuizActions();

    useEffect(() => {
        reset();
    }, [reset]);

    return (
        <div className={styles.wrapper}>
            <PageHeader title="Before You Start" />

            <section className={styles.content}>
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