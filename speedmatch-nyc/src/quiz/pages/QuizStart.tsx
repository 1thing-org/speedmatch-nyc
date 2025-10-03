import PageHeader from "../../components/PageHeader";
import styles from "../styles/QuizStart.module.css"
import { Link } from "react-router";
import Navbar from "../../components/Navbar";
import { useScrollToTop } from '../../useScrollToTop';

function QuizStart() {
  useScrollToTop();
  return (
    <div className={styles.startPage}>
      <header>
        <Navbar forceHamburger />
      </header>

      <div className={styles.wrapper}>
        <PageHeader title="Before You Start" />

        <section className={styles.content}>
          <div className={styles.quickNote}>
            A Quick Note Before The Quiz.
          </div>
          <ul>
            <li>
              This quiz consists of <strong>8</strong> questions and takes approximately <strong>5–8</strong> minutes to complete.
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
          <div className={styles.startQuiz}>
            <p>Your progress will be lost if you quit the quiz</p>
          <Link to="/quiz/questions" className={styles.startButton}>Start The Quiz</Link>
        </div>
        </section>

        
      </div>
    </div>
  )
}

export default QuizStart