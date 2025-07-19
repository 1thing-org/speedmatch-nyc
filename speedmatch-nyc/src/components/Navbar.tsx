import styles from '../styles/Navbar.module.css';
import logo from '../assets/logo.svg';
import { useState, useEffect } from 'react';
import Menu from './Menu';

type NavBarProps = {
	bgColor?: 'blue' | 'white';
	buttons?: React.ReactNode;
};

function Navbar({ bgColor = 'blue', buttons }: NavBarProps) {
	const [menuOpen, setMenuOpen] = useState(false);

	// Close menu when screen size is desktop
	useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) {
        setMenuOpen(false);
      }
    };
	window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]); 

	return (
		<nav className={`${styles.navbar} ${styles[bgColor]}`}>
			<div className={styles.logo}>
				<img src={logo} alt="Speed Matching logo" height={40} />
			</div>

			{/* Right buttons are visible on desktop (hidden on mobile via CSS) */}
			<div className={styles.rightButtons}>{buttons}</div>

			{/* Hamburger menu */}
			<div
				className={styles.menuToggle}
				onClick={() => setMenuOpen(!menuOpen)}
			>
				☰
			</div>
			{/* Fullscreen menu */}
			{menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
		</nav>
	);
}

export default Navbar;
