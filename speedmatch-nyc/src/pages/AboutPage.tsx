import { Link } from 'react-router';
import styles from "../styles/AboutPage.module.css";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import SocialMedia from '../components/SocialMedia';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

function Aboutpage() {
	// Structured data for About page
	const organizationSchema = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Speed Matching NYC",
		"description": "Independent organization helping NYC voters find their ideal mayoral candidate through political matching",
		"url": "https://speedmatching.nyc",
		"foundingDate": "2025",
		"areaServed": {
			"@type": "City",
			"name": "New York City",
			"addressRegion": "NY",
			"addressCountry": "US"
		},
		"mission": "To make civic participation easier and transparent by helping voters quickly understand which local candidates align with their values",
		"ethicalPolicy": "This website does not endorse any candidate. All candidates are presented equally."
	};
	return (
		<>
			<SEOHead
				title="About This Project"
				description="Learn about Speed Matching NYC, our mission to help voters find their ideal mayoral candidate, and our commitment to political neutrality in the 2025 NYC election."
				keywords="about speed matching, NYC election project, political neutrality, voter education"
				canonical="https://speedmatching.nyc/about"
				ogImages={{
					twitter: "/images/OG/OG_Twitter.jpg",
					linkedin: "/images/OG/OG_Linkedin.jpg",
					facebook: "/images/OG/OG_Facebook.jpg"
				}}
			/>
			<StructuredData data={organizationSchema} />
			<div className={styles.aboutPage}>
				<header>
					<Navbar
						buttons={
							<>
								<Link to="/" className="navButton">
									Homepage
								</Link>
								<Link to="/explore" className="navButton">
									Explore Candidates
								</Link>
								<Link to="/contact" className="navButton">
									Contact Us
								</Link>
							</>
						}
					/>

					<PageHeader title="About This Project" />
				</header>
				<main>
					<div className={styles.container}>
						<div className={styles.aboutPageTabletWrapper}>
							<div className={styles.leftColumn}>
								<section className={`${styles.section} ${styles.whySection}`}>
									{/* Why This Project Was Created */}
									<h2 className={styles.sectionTitle}>Why This Project Was Created</h2>
									<p className={styles.sectionText}>
										Speed Matching was created to help voters quickly understand which local candidates align
										with their values. Time is precious, and so is voting. I want to simplify this time-consuming task
										and make it more effortless.
									</p>
									<div className={styles.divider}></div>
								</section>

								{/* Who Created This */}
								<section className={`${styles.section} ${styles.whoSection}`}>
									<h2 className={styles.sectionTitle}>Who Created This</h2>
									<p className={styles.sectionText}>
										This website was created by a group of independent UX designers and programmers, who
										has no affiliation to any political party, campaign, and there is no outside sponsorship or influence.
										The sole goal is to make civic participation easier and transparent.
									</p>
									<div className={styles.divider}></div>
								</section>

								{/* Thank You For Visiting */}
								<section className={`${styles.section} ${styles.thanksSection}`}>
									<h2 className={styles.sectionTitle}>Thank You For Visiting Our Website</h2>
									<p className={styles.sectionText}>
										Our team is currently updating the website for the upcoming November General Election. In the
										meantime, you can view information from the recent Primary Election on our website.
									</p>
									<a
										href="https://speedmatchnyc.github.io/index/index.html"
										className={styles.githubButton}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="View Speed Matching NYC's previous project for the primary election"
									>
										View Our Previous Project
									</a>
									<div className={styles.divider}></div>
								</section>

								{/* How To Support Us */}
								<section className={`${styles.section} ${styles.supportSection}`}>
									<h2 className={styles.sectionTitle}>How To Support Us</h2>
									<p className={styles.sectionText}>
										To maintain neutrality, this project does not receive financial support from any parties or
										individuals. If you find our project helpful you can support us on GoFundMe.
									</p>

									<a
										href=""
										className={styles.supportButton}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Support Speed Matching NYC on GoFundMe"
									>
										Support Us On GoFundMe
									</a>
									<div className={styles.divider}></div>
								</section>

								{/* Our Commitment To Neutrality */}
								<section className={`${styles.section} ${styles.neutralSection}`}>
									<h2 className={styles.sectionTitle}>Our Commitment To Neutrality</h2>
									<p className={styles.sectionText}>
										This website does not endorse any candidate. All candidates are presented equally.
									</p>
									<div className={styles.divider}></div>
								</section>
							</div>

							<div className={styles.rightColumn}>
								{/* Follow Us On Social Media */}
								<section className={`${styles.section} ${styles.followSection}`}>
									<h2 className={styles.sectionTitle}>Follow Us On Social Media</h2>
									<SocialMedia />
								</section>

							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}

export default Aboutpage;