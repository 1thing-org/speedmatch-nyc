import styles from '../styles/SocialMedia.module.css';
import { FaTiktok, FaInstagram, FaSquareXTwitter } from 'react-icons/fa6';

function SocialMedia() {
  return (
    <div className={styles.socialMedia}>
      <div className={styles.socialRow}>
        <div className={styles.socialItem}>
          <FaTiktok className={styles.socialIcon} />
          <a 
            href="https://www.tiktok.com/@speedmatchnyc" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            @speedmatchnyc
          </a>
        </div>
      
        <div className={styles.socialItem}>
          <FaInstagram className={styles.socialIcon} />
          <a 
            href="https://www.instagram.com/speedmatchnyc" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            @speedmatchnyc
          </a>
        </div>
        </div>
        <div className={styles.socialRow}>
        <div className={styles.socialItem}>
          <FaSquareXTwitter className={styles.socialIcon} />
          <a 
            href="https://x.com/speedmatchelect" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >@SpeedMatchElect
          </a>
        </div>
      </div>
    </div>
  );
}

export default SocialMedia;