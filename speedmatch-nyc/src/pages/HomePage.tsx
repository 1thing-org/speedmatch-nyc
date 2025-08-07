import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import styles from '../styles/HomePage.module.css';
import NavBar from '../components/Navbar';
import SocialMedia from '../components/SocialMedia';
import HeroWrapper from '../components/HeroWrapper';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { FaRegCircleCheck } from 'react-icons/fa6';

function HomePage() {
	const [isDesktop, setIsDesktop] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		const form = e.currentTarget;
		const formData = new FormData(form);

		try {
			// Submit to Mailchimp using fetch
			await fetch(form.action, {
				method: 'POST',
				body: formData,
				mode: 'no-cors' // Required for Mailchimp
			});

			// Show success state
			setIsSuccess(true);

			// Clear the form
			const emailInput = form.querySelector('#mce-EMAIL') as HTMLInputElement;
			if (emailInput) emailInput.value = '';

			// Reset button after 5 seconds
			setTimeout(() => {
				setIsSuccess(false);
			}, 5000);

		} catch (error) {
			console.error('Submission error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};


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
									Speed Matching for the <span className={styles.highlight}>2025 NYC Mayoral General Election</span> is coming soon. Join the waitlist to get notified when it's released.
								</h1>
								<a
									href="https://speedmatchnyc.github.io/index/index.html"
									target="_blank"
									rel="noopener noreferrer"
									className={styles.primaryElectionText}
								>
									See our website for the primary election.
								</a>
							</div>
							<form
								action="https://nyc.us15.list-manage.com/subscribe/post?u=9f86caf1fafffd2860920ac8f&amp;id=3b7590f171&amp;f_id=00fba6e1f0"
								method="post"
								id="mc-embedded-subscribe-form"
								name="mc-embedded-subscribe-form"
								className={styles.signup}
								onSubmit={handleFormSubmit}
								aria-label="Email signup form">
								<label htmlFor="email-signup" className="sr-only">
									Email address for election updates
								</label>
								<input
									id="mce-EMAIL"
									name="EMAIL"
									type="email"
									placeholder="Enter your email..."
									required
									defaultValue=""
									aria-describedby="signup-description"
								/>
								<div hidden={true}>
									<input type="hidden" name="tags" value="1498578" />
								</div>

								{/* Response messages container - simplified */}
								<div id="mce-responses" style={{ display: 'none' }}>
									<div id="mce-error-response"></div>
									<div id="mce-success-response"></div>
								</div>

								{/* Honeypot field - EXACT from your Mailchimp code */}
								<div aria-hidden={true} style={{ position: 'absolute', left: '-5000px' }}>
									<input type="text" name="b_9f86caf1fafffd2860920ac8f_3b7590f171" tabIndex={-1} defaultValue="" />
								</div>
								<button
									type="submit"
									name="subscribe"
									id="mc-embedded-subscribe"
									className={`${styles.signupButton} ${isSuccess ? styles.successButton : ''}`}
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Signing Up...' : isSuccess ? (
										<>
											You're In! <FaRegCircleCheck style={{ marginLeft: '8px' }} />
										</>
									) : 'Sign Up'}
								</button>
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