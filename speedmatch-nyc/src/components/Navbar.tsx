import styles from '../styles/NavBar.module.css';
import logo from '../assets/logo.svg';
import { useState } from 'react';
import Menu from './Menu';

type NavBarProps = {
	bgColor?: 'blue' | 'white';
	buttons?: React.ReactNode;
};

function NavBar({ bgColor = 'blue', buttons }: NavBarProps) {
	const [menuOpen, setMenuOpen] = useState(false);

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

export default NavBar;
