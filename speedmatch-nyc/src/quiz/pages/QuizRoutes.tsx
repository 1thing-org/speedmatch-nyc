import { Routes, Route } from "react-router";
import QuizStart from "./QuizStart";
import QuizQuestions from "./QuizQuestions";
import QuizPick from "./QuizPick";
import QuizRank from "./QuizRank";
import QuizResult from "./QuizResult";
import { QuizProvider } from "../state/QuizContext";
import QuizGuard from "../components/QuizGuard";
import RequireStep from "../state/RequireStep";

function QuizRoutes() {
  return (
    <QuizProvider>
      <Routes>
        <Route element={<QuizGuard />}>
          <Route index element={<QuizStart />} />
          <Route path="questions" element={<RequireStep><QuizQuestions /></RequireStep>} />
          <Route path="pick" element={<RequireStep><QuizPick /></RequireStep>} />
          <Route path="rank" element={<RequireStep><QuizRank /></RequireStep>} />
          <Route path="result" element={<RequireStep><QuizResult /></RequireStep>} />
        </Route>
      </Routes>
    </QuizProvider>
  );
}

export default QuizRoutes;