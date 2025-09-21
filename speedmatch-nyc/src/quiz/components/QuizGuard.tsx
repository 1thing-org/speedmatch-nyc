// QuizGuard.tsx
import { useEffect, useState } from "react";
import { Outlet, useLocation, useBlocker } from "react-router"; 
import { useQuizState } from "../state/QuizContext";
import styles from "../styles/QuizGuard.module.css"

function LeaveModal({ open, onStay, onLeave }: { open: boolean; onStay: () => void; onLeave: () => void }) {
    if (!open) return null;
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBackdrop} />
            <div className={styles.modalContent}>
                <h3 className={styles.modalTitle}>Leave Quiz?</h3>
                <p className={styles.modalText}>
                    Your progress will be lost. Leave anyway?
                </p>
                <div className={styles.modalButtons}>
                    <button onClick={onStay} className={styles.stayButton}>Go Back</button>
                    <button onClick={onLeave} className={styles.leaveButton}>
                        Yes, Leave
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function QuizGuard() {
    const loc = useLocation();
    const { answers, selectedPriorities, optionOrders } = useQuizState();

    const hasProgress =
        Object.keys(answers).length > 0 ||
        selectedPriorities.length > 0 ||
        Object.keys(optionOrders).length > 0;

    const inQuiz = loc.pathname.startsWith("/quiz/questions");
    const onResult = loc.pathname.endsWith("/result");

    // Block only when in quiz, has progress, and not on result page
    const shouldBlock = inQuiz && hasProgress && !onResult;

    // Block only when leaving /quiz (not for internal quiz navigation)
    const blocker = useBlocker(({ currentLocation, nextLocation }) => {
        const leavingQuiz =
            currentLocation.pathname.startsWith("/quiz") &&
            !nextLocation.pathname.startsWith("/quiz");
        return shouldBlock && leavingQuiz;
    });

    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (blocker.state === "blocked") setOpen(true);
    }, [blocker.state]);

    // Reload guard
    useEffect(() => {
        const onBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!shouldBlock) return;
            e.preventDefault();
            e.returnValue = "";
        };
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => window.removeEventListener("beforeunload", onBeforeUnload);
    }, [shouldBlock]);

    return (
        <>
            <LeaveModal
                open={open}
                onStay={() => { setOpen(false); blocker.reset?.(); }}
                onLeave={() => { setOpen(false); blocker.proceed?.(); }}
            />
            <Outlet />
        </>
    );
}