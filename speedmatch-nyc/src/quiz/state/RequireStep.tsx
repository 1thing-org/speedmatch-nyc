import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useQuizState } from "./QuizContext";


const REQUIRED_ANSWERS = 8;
const REQUIRED_PRIORITIES = 5;

export default function RequireStep({ children }: { children: React.ReactNode }) {
    const { pathname } = useLocation();
    const nav = useNavigate();
    const { answers, selectedPriorities, optionOrders } = useQuizState();

    const questionsDone = Object.keys(answers).length >= REQUIRED_ANSWERS;
    const pickDone = selectedPriorities.length >= REQUIRED_PRIORITIES;
    const rankTouched = Object.keys(optionOrders).length > 0;

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isSocialCrawler = userAgent.includes('facebookexternalhit') || 
                              userAgent.includes('facebookcatalog') ||
                              userAgent.includes('twitterbot') || 
                              userAgent.includes('linkedinbot') ||
                              userAgent.includes('slackbot') ||
                              userAgent.includes('whatsapp');
        
        
        if (isSocialCrawler) return;
        
        if (pathname.endsWith("/pick") && !questionsDone) nav("/quiz", { replace: true });
        if (pathname.endsWith("/rank") && !pickDone) nav("/quiz", { replace: true });
        if (pathname.endsWith("/result") && !rankTouched) nav("/quiz", { replace: true });
    }, [pathname, questionsDone, pickDone, rankTouched, nav]);

    return <>{children}</>;
}