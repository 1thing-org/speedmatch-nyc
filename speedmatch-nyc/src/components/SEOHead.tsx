import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImages?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
  };
}

function SEOHead({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImages
}: SEOHeadProps) {
  const siteTitle = 'Speed Matching NYC';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />

      {/* Facebook Open Graph */}
      {ogImages?.facebook && (
        <>
          <meta property="og:image" content={ogImages.facebook} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}

      {/* LinkedIn Open Graph */}
      {ogImages?.linkedin && (
        <>
          <meta property="og:image" content={ogImages.linkedin} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="627" />
        </>
      )}
      
      {/* Twitter Open Graph */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImages?.twitter && (
        <>
          <meta name="twitter:image" content={ogImages.twitter} />
          <meta name="twitter:image:width" content="1000" />
          <meta name="twitter:image:height" content="523" />
        </>
      )}
    </Helmet>
  );
}

export default SEOHead;