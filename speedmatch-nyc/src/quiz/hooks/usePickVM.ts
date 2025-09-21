import { useEffect, useMemo, useState, useCallback } from "react";
import { PRIORITIES, type PriorityId } from "../content/priorities";
import { fixedQuestions } from "../content/questions";
import { useQuizActions, useQuizState } from "../state/QuizContext";


export function usePickVM(initialSelected?: PriorityId[]) {
  const { selectedPriorities, answers, lastQ8OptionId, q8UsedForPriorities } = useQuizState();
  const { setSelectedPriorities, setQ8UsedForPriorities } = useQuizActions();

  // Based on q8's choice, show priorities in one of the three
  const filteredPriorities = useMemo(() => {
    const special = new Set<PriorityId>(["antisemitism", "equity", "efficiency"] as any);
    const q8 = fixedQuestions.find(q => q.id === "Q8");
    const chosenOptId = (answers as any)["Q8"];
    let chosenSpecial: PriorityId | undefined;
    if (q8 && chosenOptId) {
      const opt: any = q8.options.find((o: any) => o.id === chosenOptId);
      chosenSpecial = opt?.priorityId as PriorityId | undefined;
    }
    return PRIORITIES.filter(p => !special.has(p.id as PriorityId) || p.id === chosenSpecial);
  }, [answers]);


  const [selected, setSelected] = useState<PriorityId[]>(
    Array.isArray(initialSelected) ? initialSelected : (selectedPriorities as PriorityId[])
  );


  useEffect(() => { 
    setSelectedPriorities(selected); 
  }, [selected, setSelectedPriorities]);


  const [showNotice, setShowNotice] = useState(false);
  const [noticeText, setNoticeText] = useState("");

  // If q8 answer changes, reset to choose priorities again
  useEffect(() => {
    const currentQ8 = lastQ8OptionId as any;
    const usedQ8 = q8UsedForPriorities as any;

    if (!usedQ8 && currentQ8) {
      setQ8UsedForPriorities(currentQ8);
      return;
    }
    if (currentQ8 && usedQ8 && currentQ8 !== usedQ8) {
      setSelected([]);
      setSelectedPriorities([]);
      setQ8UsedForPriorities(currentQ8);
      setNoticeText("Your last answer changed. Please pick 5 priorities again.");
      setShowNotice(true);
      const t = setTimeout(() => setShowNotice(false), 3000);
      return () => clearTimeout(t);
    }
  }, [lastQ8OptionId, q8UsedForPriorities, setQ8UsedForPriorities, setSelectedPriorities]);


  const toggle = useCallback((id: PriorityId) => {
    setSelected(prev => {
      const has = prev.includes(id);
      if (has) return prev.filter(x => x !== id);
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  }, []);


  const isReady = selected.length === 5;


  const showTempNotice = useCallback((text: string, ms = 3000) => {
    setNoticeText(text);
    setShowNotice(true);
    const t = setTimeout(() => setShowNotice(false), ms);
    return () => clearTimeout(t);
  }, []);

  const commitBeforeRank = useCallback(() => {
    if (!isReady) return false;
    setQ8UsedForPriorities(lastQ8OptionId as any);
    setSelectedPriorities(selected);
    return true;
  }, [isReady, lastQ8OptionId, selected, setQ8UsedForPriorities, setSelectedPriorities]);

  return {
    filteredPriorities,
    selected,
    toggle,
    isReady,
    showNotice, noticeText, setShowNotice, setNoticeText, showTempNotice,
    commitBeforeRank,
  };
}
