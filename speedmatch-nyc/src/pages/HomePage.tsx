import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import styles from '../styles/HomePage.module.css';
import NavBar from '../components/Navbar';
import SocialMedia from '../components/SocialMedia';
import HeroWrapper from '../components/HeroWrapper';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import DonationSec from '../components/DonationSec';

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
		"url": "https://speedmatch.nyc",
		"description": "Take Speed Match NYC's 8 minute quiz to find the 2025 Mayoral Candidate you align with."
	};

	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Speed Matching NYC",
		"description": "Take Speed Match NYC's 8 minute quiz to find the 2025 Mayoral Candidate you align with.",
		"url": "https://speedmatch.nyc",
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
				title="Speed Match NYC - Find Your Ideal 2025 Mayoral Candidate"
				description="Take Speed Match NYC's 8 minute quiz to find the 2025 Mayoral Candidate you align with."
				keywords="NYC mayor 2025, mayoral election, candidate matching, NYC politics, political quiz, voter guide, New York City election"
				canonical="https://speedmatch.nyc/"
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
							<SocialMedia
								variant="hero"
								showLabel={true}
								isDesktop={isDesktop}
							/>
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
									srcSet="/images/key-visual/key-visual-tablet2.webp"
								/>
								<source
									media="(min-width: 744px) and (min-height: 1000px)"
									srcSet="/images/key-visual/key-visual-tablet2.webp"
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
									Spend <span className={styles.highlight}>8</span> minutes to find the candidate who best aligns with your values in the <span className={styles.highlight}>2025 NYC Mayoral General Election</span>.
								</h1>
							</div>
							<div className={styles.takeQuiz}>
								<a href="/quiz" className={styles.takeQuizButton}>
									Take Quiz
								</a>
							</div>
					
						</div>
					</section>
				</main>
				<DonationSec />

	
				<footer></footer>
			</div>
		</>
	)
}

export default HomePage;