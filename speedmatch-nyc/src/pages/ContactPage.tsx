import { Link } from 'react-router';
import styles from "../styles/ContactPage.module.css";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import SocialMedia from '../components/SocialMedia';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { useScrollToTop } from '../useScrollToTop';

function ContactPage() {
	useScrollToTop(); 
	// Structured data for Contact page
	const contactSchema = {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		"name": "Contact Speed Match NYC",
		"description": "Get in touch with the Speed Matching NYC team for collaboration, support, or outreach opportunities",
		"url": "https://speedmatch.nyc/contact",
		"mainEntity": {
			"@type": "Organization",
			"name": "Speed Match NYC",
			"description": "Grassroots group dedicated to making civic participation more accessible and inclusive",
			"areaServed": {
				"@type": "City",
				"name": "New York City",
				"addressRegion": "NY",
				"addressCountry": "US"
			},
			"contactPoint": {
				"@type": "ContactPoint",
				"contactType": "General Inquiry",
				"availableLanguage": "English"
			}
		}
	};

	return (
		<>
			<SEOHead
				title="Contact Us"
				description="Get in touch with the Speed Match NYC team."
				keywords="contact speed match, NYC election contact, voter education contact"
				canonical="https://speedmatch.nyc/contact"
				ogImages={{
					twitter: "/images/OG/OG_Twitter.jpg",
					linkedin: "/images/OG/OG_Linkedin.jpg",
					facebook: "/images/OG/OG_Facebook.jpg"
				}}
			/>
			<StructuredData data={contactSchema} />

			<div className={styles.contactPage}>
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
								<Link to="/about" className="navButton">
									About This Project
								</Link>
							</>
						}
					/>
					<PageHeader title="Contact Us" />
				</header>

				{/* Main Content */}
				<main>
					<div className={styles.container}>
						{/* Mobile: Single column, Desktop: Two columns */}
						<div className={styles.contentWrapper}>
							{/* Left side - Description and Social Media */}
							<section className={styles.leftSection} aria-label="About our team">
								<p className={styles.description}>
									We're a grassroots group of people, no big connections, just a shared belief in the power of
									civic participation. That's why we truly value any collaboration, support, or outreach that helps us
									spread the message. If you believe in making participation more accessible and inclusive,
									we'd love to hear from you.
								</p>
								<div className={styles.emailContainer}>
									<a href="mailto:info@speedmatch.nyc" className={styles.emailLink}>
										info@speedmatch.nyc
									</a>
								</div>
								
								<SocialMedia
									variant="about" />
								<div className={styles.divider}></div>
							</section>
						</div>
					</div>
				</main>

				<footer>
					<Footer />
				</footer>
			</div>
		</>
	)
}

export default ContactPage