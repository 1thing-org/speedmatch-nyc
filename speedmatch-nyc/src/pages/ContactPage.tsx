import { Link } from 'react-router';
import styles from "../styles/ContactPage.module.css";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import SocialMedia from '../components/SocialMedia';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

function ContactPage() {
	// Structured data for Contact page
	const contactSchema = {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		"name": "Contact Speed Matching NYC",
		"description": "Get in touch with the Speed Matching NYC team for collaboration, support, or outreach opportunities",
		"url": "https://speedmatching.nyc/contact",
		"mainEntity": {
			"@type": "Organization",
			"name": "Speed Matching NYC",
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
				description="Get in touch with the Speed Matching NYC team. We're a grassroots group dedicated to making civic participation more accessible and inclusive. Contact us for collaboration opportunities."
				keywords="contact speed matching, NYC election contact, civic participation, grassroots organization, voter education contact"
				canonical="https://speedmatching.nyc/contact"
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

								<SocialMedia />
								<div className={styles.divider}></div>
							</section>

							{/* Right side - Contact Form */}
							<section className={styles.rightSection} aria-label="Contact form">
								<form className={styles.contactForm}>
									<div className={styles.formGroup}>
										<label htmlFor="name" className={styles.label}>Name</label>
										<input
											type="text"
											id="name"
											name="name"
											className={styles.input}
											required
											aria-describedby="name-help"
										/>

									</div>

									<div className={styles.formGroup}>
										<label htmlFor="email" className={styles.label}>Email Address</label>
										<input
											type="email"
											id="email"
											name="email"
											className={styles.input}
											required
											aria-describedby="email-help"
										/>
									</div>

									<div className={styles.formGroup}>
										<label htmlFor="subject" className={styles.label}>Subject</label>
										<input
											type="text"
											id="subject"
											name="subject"
											className={styles.input}
											required
											aria-describedby="subject-help"
										/>
									</div>

									<div className={styles.formGroup}>
										<label htmlFor="message" className={styles.label}>Message</label>
										<textarea
											id="message"
											name="message"
											rows={10}
											className={styles.textarea}
											required
											aria-describedby="message-help"
										></textarea>
									</div>

									<button
										type="submit"
										className={styles.sendButton}
										aria-label="Send message to Speed Matching NYC team"
									>
										Send
									</button>
								</form>
							</section>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}

export default ContactPage