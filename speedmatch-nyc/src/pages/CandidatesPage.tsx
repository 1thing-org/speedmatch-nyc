import { Link } from 'react-router';
import styles from "../styles/CandidatesPage.module.css";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import { candidates } from "../data/candidates";
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

function CandidatesPage() {
	// Generate structured data for all candidates
	const candidatesSchema = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		"name": "2025 NYC Mayoral Candidates",
		"description": "Complete list of candidates running for NYC Mayor in 2025",
		"url": "https://speedmatching.nyc/explore",
		"numberOfItems": candidates.length,
		"itemListElement": candidates.map((candidate, index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"item": {
				"@type": "Person",
				"name": candidate.name,
				"description": candidate.altText || `${candidate.party} candidate for NYC Mayor 2025`,
				"url": candidate.website,
				"image": `https://speedmatching.nyc${candidate.image}`,
				"jobTitle": "Mayoral Candidate",
        "memberOf": {
          "@type": "PoliticalParty",
          "name": candidate.party
				},
				"affiliation": {
        "@type": "PoliticalParty",
        "name": candidate.party
      },
      "sameAs": candidate.website
			}
		}))
	};

	return (
		<>
			<SEOHead
				title="2025 NYC Mayoral Candidates - Complete Guide"
				description="Explore all candidates running for NYC Mayor in 2025. View profiles, party affiliations, and official websites for Eric Adams, Andrew Cuomo, and other mayoral candidates."
				keywords="NYC mayoral candidates 2025, Eric Adams, Andrew Cuomo, Jean Anglade, Irene Estrada, NYC election candidates, mayoral race"
				canonical="https://speedmatching.nyc/explore"
				ogImages={{
					twitter: "/images/OG/OG_Twitter.jpg",
					linkedin: "/images/OG/OG_Linkedin.jpg",
					facebook: "/images/OG/OG_Facebook.jpg"
				}}
			/>
			<StructuredData data={candidatesSchema} />
			<div className={styles.candidatesPage}>
				<header>
					{/* Navbar */}
					<Navbar
						buttons={
							<>
								<Link to="/" className="navButton">
									Homepage
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
					<PageHeader title="Explore Candidates" />
				</header>

				<main>
					<section aria-label="2025 NYC Mayoral Candidates" className={styles.container}>
						{/* Candidates Grid */}
						<div className={styles.candidates}>
							{candidates.map(candidate => {
								const [firstName, ...lastNameParts] = candidate.name.split(' ');
								const lastName = lastNameParts.join(' ');

								return (
									<article key={candidate.id} className={styles.candidateCard}>
										<img
											src={candidate.image}
											alt={candidate.altText || `${candidate.name}, ${candidate.party} candidate for NYC Mayor 2025`}
											className={styles.candidateImage}
											loading="lazy"
										/>
										<div className={styles.candidateInfo}>
											<h3 className={styles.candidateName}>
												{firstName}
												<br />
												{lastName}
											</h3>
											<p className={styles.party}>{candidate.party}</p>
											<a
												href={candidate.website}
												className={styles.visitLink}
												target="_blank"
												rel="noopener noreferrer"
												aria-label={`Visit ${candidate.name}'s official campaign website`}
											>
												Visit Website
											</a>
										</div>
									</article>
								);
							})}
						</div>
					</section>
				</main>
			</div>
		</>
	)
}

export default CandidatesPage