import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import styles from "../../styles/QuizResults.module.css";

import { useLocation } from "react-router";
import { useMemo } from "react";
import { useQuizState } from "../../state/QuizContext";
import { FixedQuestions } from "../../content/questions";
import { PrioritiesMap, DefaultRankWeights } from "../../scoring/priorities";
import { addPointsFromAnswers, addWeightedPriorityScoresWithBaseline, rankScores } from "../../scoring/scoreEngine";
import type { PriorityId } from "../../scoring/priorities";
import { candidateById } from "../../../data/candidates";

function QuizResult() {
	const location = useLocation() as any;
	const rankedFive: PriorityId[] | undefined = location?.state?.rankedFive;
	const { answers } = useQuizState();

	const results = useMemo(() => {
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
				const baseScore = (baseSnapshot as any)[idStr] ?? 0;
				const finalScore = (base as any)[idStr] ?? 0;
				const delta = Number((finalScore - baseScore).toFixed(2));
				return { id: idNum, name: candidateById[idNum]?.name ?? String(idNum), base: baseScore, final: finalScore, delta };
			});
			rows.sort((a, b) => b.final - a.final);
			// eslint-disable-next-line no-console
			console.table(rows);
			// eslint-disable-next-line no-console
			console.log("Ranked priorities:", Array.isArray(rankedFive) ? rankedFive : []);
		} catch (_) {}

		return rankScores(base);
	}, [answers, rankedFive]);

	const topFive = results.slice(0, 5);

	return (
		<div className={styles.resultWrapper}>
			<PageHeader title="Your Matching Results" />
			<section className={styles.resultContent}>
				<ul className={styles.resultList}>
					{topFive.map((r) => {
						const c = candidateById[r.id];
						return (
							<li key={r.id} className={styles.resultItem}>
								<div className={styles.resultCard}>
									<img className={styles.resultPhoto} src={c?.image} alt={c?.name} />
									<div className={styles.resultMeta}>
										<div className={styles.resultName}>{c?.name}</div>
										<div className={styles.resultParty}>{c?.party}</div>
										<div className={styles.resultScore}>{r.score.toFixed(2)}</div>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</section>

            <footer>
					<Footer />
			</footer>
		</div>
	);
}

export default QuizResult 