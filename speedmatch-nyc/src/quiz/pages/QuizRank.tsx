import PageHeader from "../../components/PageHeader";
import styles from "../styles/QuizPickRank.module.css"
import { Link, useLocation } from "react-router";
import Navbar from "../../components/Navbar";
import { useMemo } from "react";
import { type PriorityId } from "../content/priorities";
import RankPanel from "../components/RankPanel";
import { useRankVM } from "../hooks/useRankVM";


function QuizRank() {
    const location = useLocation() as any;
    const passed: PriorityId[] | undefined = location?.state?.selected;

    const vm = useRankVM(passed);

    const classes = useMemo(() => ({
        wrap: styles.rankContent,
        hint: styles.rankHint,
        list: styles.rankList,
        item: styles.rankItem,
        badge: styles.rankBadge,
        card: styles.rankCard,
        handle: styles.rankHandle,
        label: styles.rankLabel,
    }), []);

  return (
    <div className={styles.rankPage}>
      <header>
        <Navbar forceHamburger />
      </header>

      <div className={styles.wrapper}>
        <PageHeader title="Rank Your Priorities" />
        <RankPanel
                vm={vm}
                classes={classes}
                renderActions={(isReady, order) => (
                    <div className={styles.pickActions}>
                        <Link
                            to="/quiz/result"
                            className={`${styles.pickNextButton} ${!isReady ? styles.buttonDisabled : ''}`}
                            aria-disabled={!isReady}
                            onClick={(e) => { if (!isReady) e.preventDefault(); }}
                            state={{ rankedFive: order }}
                        >
                            Submit And See Result
                        </Link>
                        <Link to="/quiz/pick" state={{ selected: order }} className={styles.pickBackButton}>Back</Link>
                    </div>
                )}
            />

      </div>
    </div>
  )
}

export default QuizRank;