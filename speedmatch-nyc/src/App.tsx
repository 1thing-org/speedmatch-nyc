import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage';
import CandidatesPage from './pages/CandidatesPage';
import Aboutpage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import QuizPage from './pages/quiz/QuizPage';


function App() {

  return (
    
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<CandidatesPage />} />
      <Route path="/about" element={<Aboutpage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/quiz/*" element={<QuizPage />} />


      <Route path="/about/index.html" element={<Navigate to="/about" replace />} />
      <Route path="/explore/index.html" element={<Navigate to="/explore" replace />} />
      <Route path="/contact/index.html" element={<Navigate to="/contact" replace />} />
      </Routes>
    </Router>
  )
}

export default App
