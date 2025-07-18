import styles from '../styles/HomePage.module.css';
import logo from '../assets/logo.svg'
import HeroWrapper from '../components/HeroWrapper';


function HomePage() {
	return (
		<div className={styles.homePage}>
			{/* Navbar */}
			<nav className={styles.navbar}>
				<div className={styles.logo}>
					<img src={logo} alt="Speed Matching logo" height={40} />
				</div>
				<div className={styles.navLinks}>
					<a href="">Explore Candidates</a>
					<a href="">About This Project</a>
				</div>
			</nav>

			<HeroWrapper>
				<p style={{ color: 'white' }}>Updated: July 17, 2025</p>
			</HeroWrapper>
			<div className={styles.coverImageWrapper}>
				<img
					src="/images/candidates/homepage-cover.png"
					alt="Homepage Cover"
					className={styles.coverImage}
				/>
			</div>
			<div className={styles.headline}>
          <p>
            Speed Matching for the <span className={styles.highlight}>2025 NYC Mayoral General Election</span> is coming soon. Join the waitlist to get notified when it's released.
          </p>
          <div className={styles.signup}>
            <input type="email" placeholder="Enter your email..." />
            <button className={styles.startButton}>Start</button>
          </div>
        </div>
		</div>
	)
}

export default HomePage;