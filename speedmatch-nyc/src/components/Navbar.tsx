import styles from '../styles/Navbar.module.css';
import logo from '../assets/logo.svg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router'; 

import Menu from './Menu';

type NavBarProps = {

	buttons?: React.ReactNode;
};

function Navbar({ buttons }: NavBarProps) {
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

  	const handleLogoClick = () => {
		if (menuOpen) {
			setMenuOpen(false);
		}
	};

	return (
		<nav className={`${styles.navbar}`}>
			<div className={styles.logo}>
				<Link to="/" onClick={handleLogoClick}>
				<img src={logo} alt="Speed Matching logo" height={40} />
				</Link>
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
