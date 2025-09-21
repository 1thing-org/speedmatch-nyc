import PageHeader from "../../components/PageHeader";
import styles from "../styles/QuizPickRank.module.css"
import { Link, useLocation } from "react-router";
import Navbar from "../../components/Navbar";
import { useMemo } from "react";
import { type PriorityId } from "../content/priorities";
import PickPanel from "../components/PickPanel";
import { usePickVM } from "../hooks/usePickVM";
import { useScrollToTop } from '../../useScrollToTop';

function QuizPick() {
  useScrollToTop('smooth');
  const location = useLocation() as any;
  const initial: PriorityId[] | undefined = location?.state?.selected;

  const vm = usePickVM(initial);

  const classes = useMemo(() => ({
    wrap: styles.pickContent,
    hint: styles.pickHint,
    chipList: styles.pickChipList,
    chip: styles.pickChip,
    chipSelected: styles.pickChipSelected,
    chipDisabled: styles.pickChipDisabled,
    notice: styles.notice,
  }), []);

  return (
    <div className={styles.pickPage}>
      <header>
        <Navbar forceHamburger />
      </header>

      <div className={styles.wrapper}>
        <PageHeader title="Pick Your Priorities" />

        <PickPanel
          vm={vm}
          classes={classes}
          renderActions={(_isReady, selected) => (
            <div className={styles.pickActions}>
              <Link
                to="/quiz/rank"
                state={{ selected }}
                className={styles.pickNextButton}
                onClick={(e) => {
                  if (!vm.commitBeforeRank()) {
                    e.preventDefault();
                    vm.showTempNotice('Pick 5 to proceed');
                  }
                }}
              >
                Next: Rank Your Priorities
              </Link>

              <Link to="/quiz/questions" className={styles.pickBackButton}>Back</Link>
            </div>
          )}
        />
      </div>
    </div>
  )
}

export default QuizPick;