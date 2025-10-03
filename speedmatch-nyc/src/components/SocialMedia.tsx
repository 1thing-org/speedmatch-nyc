import styles from '../styles/SocialMedia.module.css';
import {
  FaSquareXTwitter, FaTiktok, FaInstagram, FaSquareFacebook, FaSquareEnvelope
} from 'react-icons/fa6';

type Variant = "hero" | "about" | "footer" | "results";

interface SocialMediaProps {
  variant?: Variant;
  showLabel?: boolean;
  labelText?: string;
  isDesktop?: boolean;
  shareData?: {
    title: string;
    description: string;
    url: string;
    image?: string;
  };
}

function isMobileDevice() {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /Android|iPhone|iPad|iPod/i.test(ua);
}


async function shareViaWebAPI(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  url: string,
  description?: string
): Promise<boolean> {
  const canWebShare =
    isMobileDevice() && typeof navigator !== 'undefined' && 'share' in navigator;

  if (canWebShare) {

    e.preventDefault();
    try {
      await (navigator as any).share({
        title: 'Speed Match NYC',
        text: description || '',
        url,
      });
    } catch (err) {
    }
    return true;
  }
  return false;
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
  isDesktop,
  shareData
}: SocialMediaProps) => {

  const getLinks = () => {
    // For results variant with shareData, create share links
    if (variant === "results" && shareData) {
      const { description, url } = shareData;
      const encodedUrl = encodeURIComponent(url);
      const encodedDescription = encodeURIComponent(description);

      return [
        {
          platform: 'Twitter',
          url: `https://twitter.com/intent/tweet?text=${encodedDescription}&url=${encodedUrl}`,
          icon: <FaSquareXTwitter />,
          ariaLabel: 'Share your Speed Match NYC results on Twitter'
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
          url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedDescription}`,
          icon: <FaSquareFacebook />,
          ariaLabel: 'Share your Speed Match NYC results on Facebook'
        },
      ];
    }

    if (variant === "footer") {
      return [
        ...baseLinks,
        {
          platform: "Email",
          url: "mailto:info@speedmatch.nyc",
          icon: <FaSquareEnvelope />,
          ariaLabel: "Email Speed Matching NYC",
        },
      ];
    }

    // For all other variants, use base links
    return baseLinks;
  };

  const links = getLinks();

  const shouldShowLabel = () => {
    if (variant === 'hero') {

      return showLabel && isDesktop;
    }
    if (variant === 'about') {

      return false;
    }
    if (variant === "footer") return false;
    if (variant === "results") return false;

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
            onClick={(e) => {
              if (variant === 'results' && shareData) {
                if (platform === 'Facebook' || platform === 'Instagram') {
                  void shareViaWebAPI(e, shareData.url, shareData.description);
                }
              }
            }}
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;