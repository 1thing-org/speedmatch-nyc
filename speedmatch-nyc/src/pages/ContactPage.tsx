import { Link } from 'react-router';
import styles from "../styles/ContactPage.module.css";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import SocialMedia from '../components/SocialMedia';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { useState } from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';

function ContactPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		const form = e.currentTarget;
		const formData = new FormData(form);

		try {
			// Submit to Mailchimp contact form
			const response = await fetch(form.action, {
				method: 'POST',
				body: formData,
				mode: 'no-cors'
			});

			// Show success state
			setIsSuccess(true);
			setIsSubmitting(false);
			
			// Clear the form
			form.reset();

			// Reset success state after 5 seconds
			setTimeout(() => {
				setIsSuccess(false);
			}, 5000);

		} catch (error) {
			console.error('Submission error:', error);
			setIsSubmitting(false);
		}
	};

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
								<form
									action="https://nyc.us15.list-manage.com/subscribe/post?u=9f86caf1fafffd2860920ac8f&amp;id=3b7590f171&amp;f_id=00ffa6e1f0"
									method="post"
									className={styles.contactForm}
									onSubmit={handleFormSubmit}
									>
									{/* Hidden fields for Mailchimp */}
									<div hidden={true}>
										<input type="hidden" name="tags" value="1498581" />
									</div>
									
									<div aria-hidden={true} style={{ position: 'absolute', left: '-5000px' }}>
										<input type="text" name="b_9f86caf1fafffd2860920ac8f_3b7590f171" tabIndex={-1} defaultValue="" />
									</div>
									<div className={styles.formGroup}>
										<label htmlFor="mce-NAME" className={styles.label}>Name</label>
										<input
											type="text"
											id="mce-NAME"
											name="NAME"
											className={styles.input}
											required
											aria-describedby="name-help"
											disabled={isSubmitting}
										/>

									</div>

									<div className={styles.formGroup}>
										<label htmlFor="mce-EMAIL" className={styles.label}>Email Address</label>
										<input
											type="email"
											id="mce-EMAIL"
											name="EMAIL"
											className={styles.input}
											required
											aria-describedby="email-help"
											disabled={isSubmitting}
										/>
									</div>

									<div className={styles.formGroup}>
										<label htmlFor="mce-SUBJECT" className={styles.label}>Subject</label>
										<input
											type="text"
											id="mce-SUBJECT"
											name="SUBJECT"
											className={styles.input}
											required
											aria-describedby="subject-help"
											disabled={isSubmitting}
										/>
									</div>

									<div className={styles.formGroup}>
										<label htmlFor="mce-MESSAGE" className={styles.label}>Message</label>
										<textarea
											id="mce-MESSAGE"
											name="MESSAGE"
											rows={10}
											maxLength={1000}
											className={styles.textarea}
											required
											disabled={isSubmitting}
											aria-describedby="message-help"
										></textarea>
									</div>

									<button
										type="submit"
										name="subscribe"
										id="mc-embedded-subscribe" 
										className={`${styles.sendButton} ${isSuccess ? styles.successButton : ''}`}
										aria-label="Send message to Speed Matching NYC team"
										disabled={isSubmitting}
									>
										{isSubmitting ? 'Sending...' : isSuccess ? (
											<>
												Sent! <FaRegCircleCheck style={{ marginLeft: '8px' }} />
											</>
										) : 'Send Message'}
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