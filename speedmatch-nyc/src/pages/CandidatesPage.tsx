import { Link } from 'react-router';
import styles from "../styles/CandidatesPage.module.css";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import { candidates } from "../data/candidates";

function CandidatesPage() {
	return (
		<div className={styles.candidatesPage}>
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

			<PageHeader title="Explore Candidates"/>

			{/* Candidates Grid */}
				<div className={styles.candidates}>
					{candidates.map(candidate => {
						const [firstName, ...lastNameParts] = candidate.name.split(' ');
						const lastName = lastNameParts.join(' ');
						
						return (
							<div key={candidate.id} className={styles.candidateCard}>
								<img 
									src={candidate.image} 
									alt={candidate.name}
									className={styles.candidateImage}
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
									>
										Visit Website
									</a>
								</div>
							</div>
						);
					})}
				</div>
			</div>

	)
}

export default CandidatesPage