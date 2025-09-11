import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import QuizSidebar from '../../components/quiz/QuizSidebar';
import SEOHead from '../../components/SEOHead';
import StructuredData from '../../components/StructuredData';
import QuizMobileRoutes from "./QuizMobileRoutes";
import QuizDesktop from "./QuizDesktop";
import styles from "../../styles/quiz/QuizPage.module.css";



function QuizPage() {
    const isLargeScreen = useIsLargeScreen();
    return (
        <div className={styles.quizPage}>
            <header>
                <Navbar forceHamburger />
            </header>
            <main>
                <div className={styles.container}>
                    {isLargeScreen ? <QuizDesktop /> : <QuizMobileRoutes />}
                </div>
            </main>
        </div>
    )
}

function useIsLargeScreen() {
    const [flag, setFlag] = useState(() => window.innerWidth >= 744);
    useEffect(() => {
    const onResize = () => setFlag(window.innerWidth >= 744);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return flag;
}



export default QuizPage