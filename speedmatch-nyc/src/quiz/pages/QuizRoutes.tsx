import { Routes, Route, useNavigate, useLocation } from "react-router";
import QuizStart from "./QuizStart";
import QuizQuestions from "./QuizQuestions";
import QuizPick from "./QuizPick";
import QuizRank from "./QuizRank";
import QuizResult from "./QuizResult";
import { QuizProvider } from "../state/QuizContext";

function QuizRoutes() {
  return (
    <QuizProvider>
    <Routes>
      <Route index element={<QuizStart />} />
      <Route path="questions" element={<QuizQuestions />} />
      <Route path="pick" element={<QuizPick />} />
      <Route path="rank" element={<QuizRank />} />
      <Route path="result" element={<QuizResult />} />
    </Routes>
    </QuizProvider>
  );
}

export default QuizRoutes;