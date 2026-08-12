import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, canonical, type = 'website', image }) {
  const siteTitle = "Delhi Music Society | DMS Aarohi";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  
  const defaultDescription = "Delhi Music Society (DMS Aarohi) promotes music, emerging talent, cultural events and community initiatives across Delhi NCR. Join Voice of Delhi NCR.";
  const metaDescription = description || defaultDescription;
  
  const siteUrl = "https://dmsaarohi.com"; // Change this if different in production
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/legacy/tal_logo1.png`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
