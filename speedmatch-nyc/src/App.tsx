import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import HomePage from './pages/HomePage';
import CandidatesPage from './pages/CandidatesPage';
import Aboutpage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import QuizRoutes from './quiz/pages/QuizRoutes';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/explore",
    element: <CandidatesPage />
  },
  {
    path: "/about",
    element: <Aboutpage />
  },
  {
    path: "/contact",
    element: <ContactPage />
  },
  {
    path: "/quiz/*",
    element: <QuizRoutes />
  },
  // {
  //   path: "/about/index.html",
  //   element: <Navigate to="/about" replace />
  // },
  // {
  //   path: "/explore/index.html",
  //   element: <Navigate to="/explore" replace />
  // },
  // {
  //   path: "/contact/index.html",
  //   element: <Navigate to="/contact" replace />
  // }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;