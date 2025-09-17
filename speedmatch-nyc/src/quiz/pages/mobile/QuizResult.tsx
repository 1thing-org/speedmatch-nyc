import PageHeader from "../../../components/PageHeader";
import Footer from "../../../components/Footer";
import styles from "../../styles/QuizResults.module.css";

import { useLocation } from "react-router";
import { useMemo } from "react";
import { useQuizState } from "../../state/QuizContext";
import { fixedQuestions } from "../../content/questions";
import { addPointsFromAnswers, addPriorityScoresFromAnswersByRank, rankScores, DefaultRankWeights } from "../../scoring/scoreEngine";
import { candidateById } from "../../../data/candidates";
import { PRIORITY_LABEL_BY_ID, type PriorityId } from "../../content/priorities";

function QuizResult() {
	const location = useLocation() as any;
	const rankedFive: PriorityId[] | undefined = location?.state?.rankedFive;
	const { answers } = useQuizState();

	const results = useMemo(() => {
		const base = addPointsFromAnswers(answers as any);
		const baseSnapshot: Record<string, number> = { ...base } as any;

		addPriorityScoresFromAnswersByRank(
			base,
			answers as any,
			Array.isArray(rankedFive) ? rankedFive.slice(0, 5) : [],
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
		} catch (_) { }

		return rankScores(base);
	}, [answers, rankedFive]);

	const topFive = results.slice(0, 5);

	function getRankLabel(index: number) {
		if (index === 0) return 'Top Match';
		if (index === 1) return '2nd Match';
		if (index === 2) return '3rd Match';
		if (index === 3) return '4th Match';
		return '5th Match';
	}

	function getMatchesForCandidate(candidateId: number) {
		const out: { label: string; pid?: PriorityId }[] = [];
		(fixedQuestions as readonly unknown[]).forEach((qUnknown: unknown) => {
			const q = qUnknown as any;
			const oid = (answers as any)[q.id];
			if (!oid) return;
			const opt = (q.options as readonly any[]).find(o => (o as any).id === oid) as any;
			if (!opt) return;
			if (opt.candidateId === candidateId) {
				const pid = (q.kind === 'special') ? (opt.priorityId as PriorityId | undefined) : (q.priorityId as PriorityId | undefined);
				const labelText = (q.kind === 'special' && pid) ? (PRIORITY_LABEL_BY_ID as any)[pid] : (q.title as string);
				out.push({ label: labelText, pid });
			}
		});
		return out;
	}

	const rankedSet = new Set(Array.isArray(rankedFive) ? rankedFive : []);

	return (
		<div className={styles.resultWrapper}>
			<PageHeader title="Your Matching Results" />
			<section className={styles.resultContent}>
				<ul className={styles.resultList}>
					{topFive.map((r, idx) => {
						const c = candidateById[r.id];
						const label = getRankLabel(idx);
						const matches = getMatchesForCandidate(r.id);
						return (
							<li key={r.id} className={styles.resultItem}>
								<div className={styles.resultCard}>
									<div className={styles.resultCandidate}>
										<img className={styles.resultPhoto} src={c?.image} alt={c?.name} />
										<div className={styles.resultMeta}>
											<div className={styles.resultScore}>{label}</div>
											<div className={styles.resultName}>{c?.name}</div>
											<div className={styles.resultParty}>{c?.party}</div>

										</div>
									</div>
									<div className={styles.issuesAligned}>
										<div className={styles.issuesHeading}>Aligned With The Following Issues:</div>
										<div className={styles.issueChips}>
											{matches.map((m, i) => (
												<span key={i} className={`${styles.issueChip} ${m.pid && rankedSet.has(m.pid) ? styles.issueChipSelected : ''}`}>{m.label}</span>
											))}
										</div>
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