import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import CandidatesPage from './pages/CandidatesPage';
import Aboutpage from './pages/AboutPage';


function App() {

  return (
    
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<CandidatesPage />} />
      <Route path="/about" element={<Aboutpage />} />
      </Routes>
    </Router>
  )
}

export default App
