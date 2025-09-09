import styles from "../styles/DonationSec.module.css";
import logo from '../assets/donation_logo.svg';

function DonationSec() {
    return (
        <div className={styles.donationSec}>
        <section className={styles.section} >
            <p className={styles.sectionText}>
                Speed Matching is a <u>volunteer-run</u> project created by a team of designers and engineers working to make <u>civic participation 
                more accessible</u> through technology. If you love what we're doing, you can support us on <u>GoFundMe</u>.
            </p>

            <a
                href="https://gofund.me/d433391c"
                className={styles.supportButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Support Speed Match NYC on GoFundMe"
            >
                Support Us On GoFundMe <img src={logo} alt="donation_logo" />
            </a>

        </section>
        </div>
    )
}

export default DonationSec