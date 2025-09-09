import { FaSquareXTwitter, FaTiktok, FaInstagram, FaSquareFacebook, FaSquareEnvelope
 } from 'react-icons/fa6';
import styles from '../styles/SocialMedia.module.css';

type Variant = "hero" | "about" | "footer";

interface SocialMediaProps {
  variant?: Variant;
  showLabel?: boolean;
  labelText?: string;
  isDesktop?: boolean;
}

const baseLinks = [
  {
      platform: 'Twitter',
      url: 'https://x.com/speedmatchelect',
      icon: <FaSquareXTwitter />,
      ariaLabel: 'Follow Speed Matching NYC on Twitter'
    },
    {
      platform: 'TikTok',
      url: 'https://www.tiktok.com/@speedmatchnyc',
      icon: <FaTiktok />,
      ariaLabel: 'Follow Speed Matching NYC on TikTok'
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/speedmatchnyc',
      icon: <FaInstagram />,
      ariaLabel: 'Follow Speed Matching NYC on Instagram'
    },
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com/people/Speed-Match-NYC/61578917033976/',
      icon: <FaSquareFacebook />,
      ariaLabel: 'Follow Speed Matching NYC on Facebook'
    },
];

const SocialMedia = ({
  variant = 'hero',
  showLabel = false,
  labelText = 'Follow us on',
  isDesktop
}: SocialMediaProps) => {
  const links =
    variant === "footer"
      ? [
          ...baseLinks,
          {
            platform: "Email",
            url: "mailto:info@speedmatch.nyc",
            icon: <FaSquareEnvelope />,
            ariaLabel: "Email Speed Matching NYC",
          },
        ]
      : baseLinks;


  const shouldShowLabel = () => {
    if (variant === 'hero') {

      return showLabel && isDesktop;
    }
    if (variant === 'about') {

      return false;
    }
    if (variant === "footer") return false;

    return showLabel && isDesktop;
  };

  return (
    <div className={`${styles.socialMedia} ${styles[variant]}`}>
      {shouldShowLabel() && (
        <p className={styles.label}>{labelText}</p>
      )}
      <div className={`${styles.socialIcon} ${styles[`${variant}Icon`]}`}>
        {links.map(({ platform, url, icon, ariaLabel }) => (
          <a
            key={platform}
            href={url}
            aria-label={ariaLabel}
            target="_blank"
            rel="noopener noreferrer"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;