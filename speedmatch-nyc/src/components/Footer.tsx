import styles from "../styles/Footer.module.css";
import logo from '../assets/logo.svg';
import SocialMedia from "./SocialMedia";


function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
            <div className={styles.footerLeft}>
            <div className={styles.logo}>
				<img src={logo} alt="Speed Matching logo" height={40} />
			</div>
            <p className={styles.copy}>
            1thing.org © 2025 All rights reserved.
            </p>
            </div>

            {/* Right side: icons */}
            <div className={styles.footerRight}>
        <SocialMedia variant="footer" />
        </div>
            </div>
        </footer>
    )
}

export default Footer;