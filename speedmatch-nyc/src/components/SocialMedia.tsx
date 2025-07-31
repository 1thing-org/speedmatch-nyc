import styles from '../styles/SocialMedia.module.css';
import { FaSquareFacebook, FaTiktok, FaInstagram, FaSquareXTwitter } from 'react-icons/fa6';

function SocialMedia() {
  return (
    <div className={styles.socialMedia}>
      <div className={styles.socialRow}>
        <div className={styles.socialItem}>
          <FaTiktok className={styles.socialIcon} />
          <span>@speedmatchnyc</span>
        </div>
      
        <div className={styles.socialItem}>
          <FaInstagram className={styles.socialIcon} />
          <span>@speedmatchnyc</span>
        </div>
        </div>
        <div className={styles.socialRow}>
        <div className={styles.socialItem}>
          <FaSquareXTwitter className={styles.socialIcon} />
          <span>@SpeedMatchElect</span>
        </div>
      </div>
    </div>
  );
}

export default SocialMedia;