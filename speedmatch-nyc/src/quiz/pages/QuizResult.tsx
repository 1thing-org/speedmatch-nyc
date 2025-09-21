import PageHeader from "../../components/PageHeader";
import Footer from "../../components/Footer";
import styles from "../styles/QuizResults.module.css";
import Navbar from "../../components/Navbar";
import ShareAndChatbot from "../components/ShareAndChatbot";
import { useLocation } from "react-router";
import { useMemo, useEffect } from "react";
import { useQuizState } from "../state/QuizContext";
import { fixedQuestions } from "../content/questions";
import { addPointsFromAnswers, addPriorityScoresFromAnswersByRank, rankScores, DefaultRankWeights } from "../scoring/scoreEngine";
import { candidateById } from "../../data/candidates";
import { PRIORITY_LABEL_BY_ID, type PriorityId } from "../content/priorities";
import Calculation from "../components/Calculation";

function QuizResult() {
	const location = useLocation() as any;
	const rankedFive: PriorityId[] | undefined = location?.state?.rankedFive;
	const { answers } = useQuizState();

	useEffect(() => {
		localStorage.setItem('quiz-completed', 'true');
	}, []);

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
			
			console.table(rows);

			console.log("Ranked priorities:", Array.isArray(rankedFive) ? rankedFive : []);
		} catch (_) { }

		return rankScores(base);
	}, [answers, rankedFive]);

	// Only show candidates with positive final score; do not force 5
	const positive = results.filter(r => (r.score ?? 0) > 0);
	const list = positive.slice(0, 5);

	function getRankLabel(index: number) {
		if (index === 0) return 'Top Match';
		if (index === 1) return '2nd Match';
		if (index === 2) return '3rd Match';
		if (index === 3) return '4th Match';
		return '5th Match';
	}

	function splitName(full?: string): { first: string; last: string } {
		if (!full) return { first: '', last: '' };
		const parts = full.trim().split(/\s+/);
		if (parts.length <= 1) return { first: full, last: '' };
		return { first: parts[0], last: parts.slice(1).join(' ') };
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
		    <div className={styles.resultPage}>
      <header>
        <Navbar forceHamburger />
      </header>

		<div className={styles.resultWrapper}>
			<PageHeader title="Your Matching Results" />

			{/* Tablet/Desktop explainer under header */}
			<Calculation className={styles.calcTop} />

			<section className={styles.resultContent}>
				<ul className={styles.resultList}>
					{list.map((r, idx) => {
						const c = candidateById[r.id];
						const label = getRankLabel(idx);
						const matches = getMatchesForCandidate(r.id);
						const name = splitName(c?.name);
						return (
							<li key={r.id} className={styles.resultItem}>
								<div className={styles.resultCard}>
									<div className={styles.resultCandidate}>
										<img className={styles.resultPhoto} src={c?.image} alt={c?.name} />
										<div className={styles.resultMeta}>
											<div className={styles.resultScore}>{label}</div>
											<div className={styles.resultName}>
												<span className={styles.nameFirst}>{name.first}</span>{name.last ? ' ' : ''}<span className={styles.nameLast}>{name.last}</span>
											</div>
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
			{/* Mobile explainer under list */}
				<Calculation className={styles.calcBottom} />
			<div className={styles.shareWrapper}>
			<ShareAndChatbot />
			</div>
			<footer>
				<Footer />		
			</footer>
		</div>
		</div>
	);
}

export default QuizResult 