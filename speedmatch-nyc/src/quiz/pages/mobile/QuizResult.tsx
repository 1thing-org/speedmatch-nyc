import PageHeader from "../../../components/PageHeader";
import styles from "../../styles/QuizResults.module.css";

import { useLocation } from "react-router";
import { useMemo } from "react";
import { useQuizState } from "../../state/QuizContext";
import { FixedQuestions } from "../../content/questions";
import { PrioritiesMap, DefaultRankWeights } from "../../scoring/priorities";
import { addPointsFromAnswers, addWeightedPriorityScoresWithBaseline, rankScores } from "../../scoring/scoreEngine";
import type { PriorityId } from "../../scoring/priorities";
import { getCandidateName } from "../../../data/candidates";

function QuizResult() {
    const location = useLocation() as any;
    const rankedFive: PriorityId[] | undefined = location?.state?.rankedFive;
    const { answers } = useQuizState();

    useMemo(() => {
        const base = addPointsFromAnswers(FixedQuestions as any, answers as any);
        const baseSnapshot: Record<string, number> = { ...base } as any;

        addWeightedPriorityScoresWithBaseline(
            base,
            PrioritiesMap,
            Array.isArray(rankedFive) ? rankedFive.slice(0, 5) : [],
            answers as any,
            DefaultRankWeights,
        );

        try {
            const rows = Object.keys(base as any).map(idStr => {
                const idNum = Number(idStr);
                const name = getCandidateName(idNum as any);
                const baseScore = (baseSnapshot as any)[idStr] ?? 0;
                const finalScore = (base as any)[idStr] ?? 0;
                const delta = Number((finalScore - baseScore).toFixed(2));
                return { id: idNum, name, base: baseScore, final: finalScore, delta };
            });
            rows.sort((a, b) => b.final - a.final);
            // eslint-disable-next-line no-console
            console.table(rows);
        } catch (_) {
            // ignore logging errors
        }

        // also log the ranked list
        try {
            // eslint-disable-next-line no-console
            console.log("Ranked priorities:", Array.isArray(rankedFive) ? rankedFive : []);
        } catch (_) {}

        // return ranked results (not used in UI)
        return rankScores(base);
    }, [answers, rankedFive]);

    return (
        <div className={styles.resultWrapper}>
            <PageHeader title="Your Matching Results" />
        </div>
    );
}

export default QuizResult 