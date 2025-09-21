import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router";
import { useMemo, useState, useEffect } from "react";
import styles from "../styles/QuizQuestions.module.css"
import Navbar from "../../components/Navbar";
import QuizSidebar from "../components/QuizSidebar"
import { useQuizActions, useQuizState } from "../state/QuizContext";
import { fixedQuestions } from "../content/questions";
import { candidates } from '../../data/candidates';
import QuestionPanel from "../components/QuestionPanel";
import { useQuestionVM } from "../hooks/useQuestionVM";
import { useScrollToTop } from '../../useScrollToTop';

function shuffleArray<T>(input: readonly T[]): T[] {
  const arr = input.slice() as T[];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
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

function QuizQuestions() {
  useScrollToTop('smooth');
  const questions = fixedQuestions as readonly any[];
  const total = questions.length;
  const navigate = useNavigate();
  const isLargeScreen = useIsLargeScreen();

  const { optionOrders, answers } = useQuizState();
  const { setOptionOrder } = useQuizActions();

  // states for desktop sidebar functionality
  const [activeQuestion, setActiveQuestion] = useState(1);
  const completedQuestions = useMemo(() => {
    const set = new Set<number>();
    questions.forEach((q, idx) => {
      if ((answers as Record<string, unknown>)[q.id]) set.add(idx + 1);
    });
    return set;
  }, [answers, questions]);

  // Stable order per question stored in context
  const orders = useMemo(() => {
    return questions.map(q => {
      const existing = (optionOrders as any)[q.id] as number[] | undefined;
      if (existing && existing.length === (q.options as any[]).length) return existing;
      const order = shuffleArray((q.options as readonly any[]).map((_: any, i: number) => i));
      setOptionOrder(q.id as any, order);
      return order;
    });
  }, [questions, optionOrders, setOptionOrder]);

  

  function scrollToIdx(idx: number) {
    if (isLargeScreen) {
    // Desktop, scroll to header
    const headerEl = document.getElementById(`q-header-${idx + 1}`);
    if (headerEl) {
      const navbarHeight = 80;
      const targetPosition = headerEl.offsetTop - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  } else {
    // Mobile: scroll to question
    const contentEl = document.getElementById(`q-${idx + 1}`);
    if (contentEl) {
      contentEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  }

  // Track active question for desktop sidebar
  useEffect(() => {
    const updateActive = () => {
      const scrollPosition = window.scrollY + 100; // Offset for header
      let activeKey = 1;

      questions.forEach((_, idx) => {
        const el = document.getElementById(`q-header-${idx + 1}`);
        if (el && scrollPosition >= el.offsetTop) {
          activeKey = idx + 1;
        }
      });

      setActiveQuestion(activeKey);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive); 
    return () => {
      window.removeEventListener('scroll', updateActive);
    window.removeEventListener('resize', updateActive);
    }
  }, [questions, isLargeScreen]);

  const allAnswered = Object.keys(answers as Record<string, unknown>).length === total;
  const [showNotice, setShowNotice] = useState(false);

  return (
    <div className={styles.questionPage}>
      <header>
        <Navbar forceHamburger />
      </header>
      <main>
        <div className={styles.questionWrapper}>
          {questions.map((q: any, idx: number) => {
            const order = orders[idx];
            const vm = useQuestionVM(q, idx, total, order);

            const declared = new Set<number>();
            (q.options as any[]).forEach(o => declared.add((o as any).candidateId));
            const undeclared = Math.max(0, candidates.length - declared.size);

            const onBack = () => {
              if (!vm.isFirst) scrollToIdx(idx - 1);
            };
            const onNext = () => {
              if (vm.isLast) {
                if (!allAnswered) {
                  setShowNotice(true);
                  setTimeout(() => setShowNotice(false), 3000);
                  return;
                }
                navigate('/quiz/pick', { state: { fromSpecialPriorityOption: (answers as any)['Q8'] } });
                return;
              }
              scrollToIdx(idx + 1);
            };

            const noticeText = vm.isLast && showNotice && !allAnswered ? 'You must finish all questions to proceed' : null;

            return (
              <div key={q.id}>
                {/* Desktop header - hidden by default, shown on desktop */}
                <div id={`q-header-${idx + 1}`}
                  className={`${styles.desktopHeader} ${idx === 0 ? styles.firstDesktopHeader : ''}`}
                >
                  <PageHeader title={`Question ${idx + 1} ${q.title}`} />
                </div>

                <div className={styles.contentArea}>

                  <aside className={styles.desktopSidebar}>
                    <QuizSidebar
                      activeQuestion={activeQuestion}
                      completedQuestions={completedQuestions}
                    />
                  </aside>

                  <QuestionPanel
                    vm={vm}
                    onBack={onBack}
                    onNext={onNext}
                    undeclaredCount={undeclared}
                    noticeText={noticeText}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  )
}

export default QuizQuestions;