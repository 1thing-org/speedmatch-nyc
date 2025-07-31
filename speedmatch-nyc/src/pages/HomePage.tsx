import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import styles from '../styles/HomePage.module.css';
import NavBar from '../components/Navbar';
import HeroWrapper from '../components/HeroWrapper';
import heroStyles from '../styles/HeroWrapper.module.css';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { FaSquareXTwitter, FaTiktok, FaInstagram, FaSquareFacebook } from 'react-icons/fa6';

function HomePage() {
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const handleResize = () => setIsDesktop(window.innerWidth >= 768);
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "Speed Matching NYC",
		"alternateName": "NYC Mayoral Candidate Matcher",
		"url": "https://speedmatching.nyc",
		"description": "Find your ideal NYC mayoral candidate for the 2025 election. Compare candidate positions and get matched based on your values."
	};

	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Speed Matching NYC",
		"description": "Helping NYC voters find their ideal mayoral candidate through political matching",
		"url": "https://speedmatching.nyc",
		"foundingDate": "2025",
		"areaServed": {
			"@type": "City",
			"name": "New York City",
			"addressRegion": "NY",
			"addressCountry": "US"
		}
	};

	return (
		<>
			<SEOHead
				title="Speed Matching NYC - Find Your Ideal 2025 Mayoral Candidate"
				description="Match with your ideal NYC mayoral candidate for the 2025 election. Compare positions on key issues and find candidates who align with your values. Free political matching tool."
				keywords="NYC mayor 2025, mayoral election, candidate matching, NYC politics, political quiz, voter guide, New York City election"
				canonical="https://speedmatching.nyc/"
				ogImages={{
					twitter: "/images/OG/OG_Twitter.jpg",
					linkedin: "/images/OG/OG_Linkedin.jpg",
					facebook: "/images/OG/OG_Facebook.jpg"
				}}
			/>
			<StructuredData data={websiteSchema} />
			<StructuredData data={organizationSchema} />
			<div className={styles.homePage}>
				{/* Navbar */}
				<NavBar
					buttons={
						<>
							<Link to="/explore" className="navButton">
								Explore Candidates
							</Link>
							<Link to="/about" className="navButton">
								About This Project
							</Link>
							<Link to="/contact" className="navButton">
								Contact Us
							</Link>
						</>
					}
				/>

				<main>
					<section aria-label="Hero section">
						{/* Hero Section */}
						<HeroWrapper>
							<p style={{ color: 'white' }}>Updated: July 25, 2025</p>
								<div className={heroStyles.socialMedia}>
									{isDesktop && <p>Follow us on</p>}
									<div className={heroStyles.socialIcon}>
										<a href="#" aria-label="Follow Speed Matching NYC on Twitter">
										<FaSquareXTwitter />
									</a>
									<a href="#" aria-label="Follow Speed Matching NYC on TikTok">
										<FaTiktok />
									</a>
									<a href="#" aria-label="Follow Speed Matching NYC on Instagram">
										<FaInstagram />
									</a>
										{/* <FaSquareFacebook /> */}
									</div>
								</div>
						</HeroWrapper>
					</section>

					{/* Cover image */}
					<section aria-label="Featured candidates">
						<div className={styles.coverImageWrapper}>
							<picture>
								<source
									media="(min-width: 1024px) and (orientation: landscape)"
									srcSet="/images/key-visual/desktop-all-candidates.webp"
								/>
								<source
									media="(min-width: 768px)"
									srcSet="/images/key-visual/tablet-all-candidates.webp"
								/>
								<source
									media="(min-width: 744px) and (min-height: 1000px)"
									srcSet="/images/key-visual/tablet-all-candidates.webp"
								/>
								<img
									src="/images/key-visual/mobile-all-candidates.webp"
									alt="Homepage Cover"
									className={styles.coverImage}
									loading="eager"
								/>
							</picture>
						</div>
					</section>

					{/* Headline section */}
					<section aria-label="Election information and signup">
						<div className={styles.headline}>
							<div className={styles.headlineText}>
							<h1>
								Speed Matching for the <span className={styles.highlight}>2025 NYC Mayoral General Election</span> is coming soon. Join the waitlist to get notified when it's released.
							</h1>
							<p className={styles.primaryElectionText}>
								See our website for the primary election.
							</p>
						</div>
							<form className={styles.signup} aria-label="Email signup form">
								<label htmlFor="email-signup" className="sr-only">
									Email address for election updates
								</label>
								<input
									id="email-signup"
									type="email"
									placeholder="Enter your email..."
									required
									aria-describedby="signup-description"
								/>
								<button className={styles.signupButton}>Sign Up</button>
							</form>
						</div>
					</section>
				</main>

				{/* Social media follow */}
				<footer></footer>
			</div>
		</>
	)
}

export default HomePage;