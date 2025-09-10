import { Link } from 'react-router';
import styles from "../styles/QuizPage.module.css";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";

import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';


function QuizPage() {
    return (
        <div className={styles.QuizPage}>
            <header>
                <Navbar forceHamburger />
            </header>
        </div>
    )
}

export default QuizPage