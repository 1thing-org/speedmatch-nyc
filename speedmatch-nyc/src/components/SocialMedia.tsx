import styles from '../styles/SocialMedia.module.css';
import envelopeIcon from "../assets/envelop.svg";
import twitterIcon from "../assets/twitter.svg";
import tiktokIcon from "../assets/tiktok.svg";
import insIcon from "../assets/ins.svg";
import fbIcon from "../assets/fb.svg";


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
      icon: <img src={twitterIcon} alt="twitter" />,
      ariaLabel: 'Follow Speed Matching NYC on Twitter'
    },
    {
      platform: 'TikTok',
      url: 'https://www.tiktok.com/@speedmatchnyc',
      icon: <img src={tiktokIcon} alt="tiktok" />,
      ariaLabel: 'Follow Speed Matching NYC on TikTok'
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/speedmatchnyc',
      icon: <img src={insIcon} alt="instagram" />,
      ariaLabel: 'Follow Speed Matching NYC on Instagram'
    },
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com/people/Speed-Match-NYC/61578917033976/',
      icon: <img src={fbIcon} alt="facebook" className={styles.iconFix} />,
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
            icon: <img src={envelopeIcon} alt="Email" />,
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