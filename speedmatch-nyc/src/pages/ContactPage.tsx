import { Link } from 'react-router';
import styles from "../styles/ContactPage.module.css";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import SocialMedia from '../components/SocialMedia';

function ContactPage() {
	return (
		<div className={styles.contactPage}>
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

			{/* Main Content */}
			<div className={styles.container}>
				{/* Mobile: Single column, Desktop: Two columns */}
				<div className={styles.contentWrapper}>
					{/* Left side - Description and Social Media */}
					<div className={styles.leftSection}>
						<p className={styles.description}>
							We're a grassroots group of people, no big connections, just a shared belief in the power of 
							civic participation. That's why we truly value any collaboration, support, or outreach that helps us 
							spread the message. If you believe in making participation more accessible and inclusive, 
							we'd love to hear from you.
						</p>
						
						<SocialMedia />
						<div className={styles.divider}></div>
					</div>

					{/* Right side - Contact Form */}
					<div className={styles.rightSection}>
						<form className={styles.contactForm}>
							<div className={styles.formGroup}>
								<label htmlFor="name" className={styles.label}>Name</label>
								<input 
									type="text" 
									id="name" 
									name="name" 
									className={styles.input}
									required
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
								></textarea>
							</div>

							<button type="submit" className={styles.sendButton}>
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactPage