import { Routes, Route, Navigate } from "react-router";
import QuizStart from "./mobile/QuizStart";
import QuizQuestions from "./mobile/QuizQuestions";
import QuizPick from "./mobile/QuizPick";
import QuizRank from "./mobile/QuizRank";
import QuizResult from "./mobile/QuizResult";

function QuizMobileRoutes() {
  return (
    <Routes>
      <Route index element={<QuizStart />} />
      <Route path="questions" element={<QuizQuestions />} />
      <Route path="pick" element={<QuizPick />} />
      <Route path="rank" element={<QuizRank />} />
      <Route path="result" element={<QuizResult />} />
      {/* <Route path="*" element={<Navigate to="/quiz" replace />} /> */}
    </Routes>
  );
}

export default QuizMobileRoutes