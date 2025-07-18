import styles from '../styles/HomePage.module.css';
import NavBar from '../components/NavBar';
import HeroWrapper from '../components/HeroWrapper';
import { FaSquareXTwitter, FaTiktok, FaInstagram, FaSquareFacebook } from 'react-icons/fa6';



function HomePage() {
	return (
		<div className={styles.homePage}>
			{/* Navbar */}
			<NavBar
				bgColor="blue"
				buttons={
					<>
						<a className={styles.navButton} href="">
							Explore Candidates
						</a>
						<a className={styles.navButton} href="">
							About This Project
						</a>
					</>
				}
			/>

			<HeroWrapper>
				<p style={{ color: 'white' }}>Updated: July 17, 2025</p>
			</HeroWrapper>
			<div className={styles.coverImageWrapper}>
				<picture>
					<source
						media="(min-width: 1024px)"
						srcSet="/images/candidates/desktop-all-candidates.png"
					/>
					<img
						src="/images/candidates/mobile-all-candidates.png"
						alt="Homepage Cover"
						className={styles.coverImage}
					/>
				</picture>
			</div>
			<div className={styles.headline}>
				<p>
					Speed Matching for the <span className={styles.highlight}>2025 NYC Mayoral General Election</span> is coming soon. Join the waitlist to get notified when it's released.
				</p>
				<div className={styles.signup}>
					<input type="email" placeholder="Enter your email..." />
					<button className={styles.signupButton}>Sign Up</button>
				</div>
			</div>
			<div className={styles.socialMedia}>
				<p>Follow us on</p>
				<div className={styles.socialIcon}>
				<FaSquareXTwitter />
				<FaTiktok />
				<FaInstagram />
				<FaSquareFacebook />
				</div>
			</div>
		</div>
	)
}

export default HomePage;