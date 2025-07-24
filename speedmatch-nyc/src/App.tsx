import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import CandidatesPage from './pages/CandidatesPage';


function App() {

  return (
    
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<CandidatesPage />} />
      </Routes>
    </Router>
  )
}

export default App
