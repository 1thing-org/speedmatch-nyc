import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import CandidatesPage from './pages/CandidatesPage';
import Aboutpage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';


function App() {

  return (
    
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<CandidatesPage />} />
      <Route path="/about" element={<Aboutpage />} />
      <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  )
}

export default App
