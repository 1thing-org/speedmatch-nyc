import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import QuizMobileRoutes from "./QuizMobileRoutes";
import QuizDesktop from "./QuizDesktop";
import styles from "../styles/QuizPage.module.css";
import { QuizProvider } from "../state/QuizContext";
import { useLocation } from "react-router";
import QuizResult from "./QuizResult";



function QuizPage() {
    const isLargeScreen = useIsLargeScreen();
    const location = useLocation();
    const inResult = location.pathname.endsWith("/quiz/result");
    return (
        <div className={styles.quizPage}>
            <header>
                <Navbar forceHamburger />
            </header>
            <main>
                <div className={styles.container}>
                    <QuizProvider>
                        {inResult ? (
                            <QuizResult />
                        ) : (
                            isLargeScreen ? <QuizDesktop /> : <QuizMobileRoutes />
                        )}
                    </QuizProvider>
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